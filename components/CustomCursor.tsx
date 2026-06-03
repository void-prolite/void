"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const hasLabelEl = target.closest("[data-cursor-label]");
      const interactiveEl = target.closest("a, button, [role='button'], .cursor-pointer");

      if (hasLabelEl) {
        const label = hasLabelEl.getAttribute("data-cursor-label");
        setCursorLabel(label);
        setIsHovering(true);
      } else if (interactiveEl || window.getComputedStyle(target).cursor === "pointer") {
        setCursorLabel(null);
        setIsHovering(true);
      } else {
        setCursorLabel(null);
        setIsHovering(false);
      }
    };

    // Periodic glitch flicker trigger (lasts 200ms, triggers every 4.5s)
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => {
        setIsGlitching(false);
      }, 200);
    }, 4500);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", checkHover);

    return () => {
      clearInterval(glitchInterval);
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", checkHover);
    };
  }, [isVisible]);

  if (typeof window === "undefined" || !isVisible) return null;

  return (
    <>
      {/* Precision Ink Dot - keyframed jitter during glitch */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#0f0c08] rounded-full pointer-events-none z-[99999]"
        animate={{
          scale: cursorLabel ? 0 : (isGlitching ? [1, 2, 0.5, 1.5, 1] : 1),
          x: isGlitching ? [0, -3, 3, -1, 0] : 0,
          y: isGlitching ? [0, 2, -2, 1, 0] : 0,
          opacity: isGlitching ? [1, 0.3, 0.9, 0.1, 1] : 1,
        }}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Expanded Spring Ring / Solid Label Pill - keyframed skew and opacity strobe during glitch */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99998] flex items-center justify-center text-center overflow-hidden"
        animate={{
          width: cursorLabel ? 80 : (isHovering ? 46 : 26),
          height: cursorLabel ? 80 : (isHovering ? 46 : 26),
          backgroundColor: cursorLabel 
            ? "#0f0c08" 
            : (isHovering ? "rgba(139, 111, 71, 0.05)" : "rgba(0, 0, 0, 0)"),
          borderColor: cursorLabel 
            ? "transparent" 
            : (isHovering ? "#8B6F47" : "rgba(15, 12, 8, 0.3)"),
          borderWidth: cursorLabel ? 0 : 1,
          // Glitch offsets
          x: isGlitching ? [0, 5, -4, 2, 0] : 0,
          y: isGlitching ? [0, -3, 4, -1, 0] : 0,
          skewX: isGlitching ? [0, 15, -15, 5, 0] : 0,
          opacity: isGlitching ? [0.9, 0.2, 0.8, 0.1, 0.9] : 1,
          scale: isGlitching ? [1, 1.05, 0.95, 1.02, 1] : 1,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {/* Grain effect overlay shown during glitch */}
        {isGlitching && (
          <div 
            className="absolute inset-0 pointer-events-none opacity-25 bg-repeat bg-center"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          />
        )}

        {cursorLabel && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: isGlitching ? [0, -2, 2, 0] : 0,
              y: isGlitching ? [0, 1, -1, 0] : 0,
            }}
            transition={{ delay: 0.08, duration: 0.2 }}
            className="text-white font-mono text-[9px] font-bold tracking-widest pointer-events-none select-none block"
          >
            {cursorLabel}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
