"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";

let globalCursorX = -100;
let globalCursorY = -100;

export default function CustomCursor() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isPC, setIsPC] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [useMotionBlur, setUseMotionBlur] = useState(true);
  const isNavigatingRef = useRef(false);

  const cursorX = useMotionValue(globalCursorX);
  const cursorY = useMotionValue(globalCursorY);
  
  // Motion value for cursor speed scaling
  const cursorScale = useMotionValue(2.0);
  const scaleSpring = useSpring(cursorScale, { damping: 20, stiffness: 140 });

  // Directional stretch (true motion blur)
  const cursorAngle = useMotionValue(0);
  const cursorStretch = useMotionValue(1.0);

  // Physics rotation
  const cursorRotation = useMotionValue(0);
  const rotationVelocity = useRef(0);

  // Speed and blur
  const cursorSpeed = useMotionValue(0);
  const blurFilter = useTransform(cursorSpeed, (s) => `blur(${Math.min(s * 1.5, 5)}px)`);

  useEffect(() => {
    isNavigatingRef.current = true;
    setIsVisible(false);

    const timer = setTimeout(() => {
      isNavigatingRef.current = false;
      if (globalCursorX > -100 && globalCursorY > -100) {
        setIsVisible(true);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    // Detect dedicated graphics via WebGL
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (gl) {
        const debugInfo = (gl as WebGLRenderingContext).getExtension("WEBGL_debug_renderer_info");
        if (debugInfo) {
          const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();
          // Typical integrated / software renderers
          if (
            renderer.includes("intel") ||
            (renderer.includes("amd") && renderer.includes("radeon graphics")) ||
            renderer.includes("swiftshader") ||
            renderer.includes("llvmpipe") ||
            renderer.includes("mali") ||
            renderer.includes("adreno")
          ) {
            // Apple M-series are powerful enough to handle it despite being integrated
            if (!renderer.includes("apple")) {
              setUseMotionBlur(false);
            }
          }
        }
      }
    } catch (e) {
      // Ignore errors
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detect if device has a fine pointer (mouse/trackpad)
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    setIsPC(hasFinePointer);
    setMounted(true);

    if (!hasFinePointer) return;

    document.documentElement.classList.add("custom-cursor-active");

    let lastTime = Date.now();
    let lastX = globalCursorX;
    let lastY = globalCursorY;
    let stopTimer: NodeJS.Timeout;
    let snapTimer: NodeJS.Timeout;
    let shouldSnap = false;
    
    let animationFrameId: number;
    let currentRot = 0;

    const updatePhysics = () => {
      if (shouldSnap) {
        // Spring physics for a bouncy snap to nearest 90 degrees globally
        const currentAngle = cursorAngle.get();
        const globalRot = currentRot + currentAngle;
        const targetGlobalRot = Math.round(globalRot / 90) * 90;
        const targetRot = targetGlobalRot - currentAngle;
        const diff = targetRot - currentRot;
        
        // Smoother, floatier spring parameters
        const tension = 0.025; // Gentler pull
        const damping = 0.88; // Smoother deceleration
        
        rotationVelocity.current += diff * tension;
        rotationVelocity.current *= damping;
      } else {
        // Normal friction for a slow stop when moving
        rotationVelocity.current *= 0.92;
      }
      
      // Apply velocity to rotation
      currentRot += rotationVelocity.current;
      
      // Lock it perfectly once it has settled to prevent micro-jitters
      if (shouldSnap && Math.abs(rotationVelocity.current) < 0.01) {
        const currentAngle = cursorAngle.get();
        const globalRot = currentRot + currentAngle;
        const targetGlobalRot = Math.round(globalRot / 90) * 90;
        const targetRot = targetGlobalRot - currentAngle;
        if (Math.abs(targetRot - currentRot) < 0.1) {
          currentRot = targetRot;
          rotationVelocity.current = 0;
        }
      }
      
      cursorRotation.set(currentRot);
      
      animationFrameId = requestAnimationFrame(updatePhysics);
    };
    updatePhysics();

    const moveCursor = (e: MouseEvent) => {
      // Ignore coordinate updates of exactly (0,0) which are exit anomalies
      if (e.clientX === 0 && e.clientY === 0) return;

      // Hide cursor if it is near the window edges to prevent sticking or snapping
      if (
        e.clientX < 4 || 
        e.clientY < 4 || 
        e.clientX > window.innerWidth - 4 || 
        e.clientY > window.innerHeight - 4
      ) {
        setIsVisible(false);
        return;
      }

      // Calculate speed for scale expansion
      const now = Date.now();
      const dt = now - lastTime;
      if (dt > 0 && lastX > -100 && lastY > -100) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = distance / dt; // pixels per millisecond
        
        // Smoothly map speed to target scale (base is 2.0, max growth of +2.0 for a 4.0x scale)
        const targetScale = 2.0 + Math.min(speed * 0.4, 2.0);
        cursorScale.set(targetScale);
        cursorSpeed.set(speed);

        // Directional motion blur calculation
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        cursorAngle.set(angle);
        
        // Stretch target based on speed
        const targetStretch = 1.0 + Math.min(speed * 0.5, 1.5);
        cursorStretch.set(targetStretch);

        // Add to rotational velocity (spin direction based on horizontal movement)
        const direction = dx >= 0 ? 1 : -1;
        rotationVelocity.current += direction * speed * 1.5;
      }
      
      lastTime = now;
      lastX = e.clientX;
      lastY = e.clientY;

      globalCursorX = e.clientX;
      globalCursorY = e.clientY;
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (!isNavigatingRef.current) {
        setIsVisible(true);
      }
      
      if (isIdle) setIsIdle(false);

      // Reset snap timer
      shouldSnap = false;
      clearTimeout(snapTimer);
      snapTimer = setTimeout(() => {
        shouldSnap = true;
      }, 500);

      // Reset cursor scale when mouse stops moving
      clearTimeout(stopTimer);
      stopTimer = setTimeout(() => {
        cursorScale.set(2.0);
        cursorSpeed.set(0);
        cursorStretch.set(1.0);
        setIsIdle(true);
      }, 100);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      
      // Add velocity based on scroll direction (positive = scroll down = clockwise)
      // Cap the delta to prevent insane spinning on fast scrolls, and reduce the multiplier
      const clampedDelta = Math.max(-100, Math.min(100, deltaY));
      rotationVelocity.current += clampedDelta * 0.05;
      
      lastScrollY = currentScrollY;

      // Reset snap timer
      shouldSnap = false;
      clearTimeout(snapTimer);
      snapTimer = setTimeout(() => {
        shouldSnap = true;
      }, 500);
    };

    // Removed periodic glitch flicker trigger


    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(stopTimer);
      clearTimeout(snapTimer);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!mounted || !isPC) return null;

  return (
    <>
      {/* Precision Ink Dot - Star */}
      <motion.div
        className="fixed top-0 left-0 w-3.5 h-3.5 pointer-events-none z-[99999] flex items-center justify-center transition-opacity duration-200 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          rotate: cursorAngle,
          scaleX: useMotionBlur ? cursorStretch : 1,
          filter: useMotionBlur ? blurFilter : "none",
          willChange: "transform, filter, opacity",
        }}
      >
        <motion.div
          style={{
            scale: scaleSpring,
            rotate: cursorRotation,
            willChange: "transform",
          }}
          className="w-full h-full flex items-center justify-center"
        >
          <motion.div
            animate={{
              opacity: isIdle ? [1, 0.4, 1] : 1,
              scale: isIdle ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 1.0,
              repeat: Infinity,
              repeatDelay: 2.0,
              ease: "easeInOut",
            }}
            className="w-full h-full"
          >
            <svg viewBox="0 0 24 24" className="w-full h-full fill-white">
              <path d="M12,0 L14.5,9.5 L24,12 L14.5,14.5 L12,24 L9.5,14.5 L0,12 L9.5,9.5 Z" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
