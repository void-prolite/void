"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface HeroProps { }

export default function Hero({ }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Scroll parallax for content background
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  // Mouse Parallax Effect
  const mouseX = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const width = window.innerWidth;
      const height = window.innerHeight;
      mouseX.set((clientX / width) - 0.5);
      mouseY.set((clientY / height) - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // map mouse coordinate shifts to background items
  const pX = useTransform(mouseX, [-0.5, 0.5], [-40, 40]);
  const pY = useTransform(mouseY, [-0.5, 0.5], [-40, 40]);
  const deepPX = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const deepPY = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-6 bg-black"
    >
      {/* Background Parallax and Glows */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/10 via-black to-pink-950/10" />

        {/* Animated ambient gas/nebula blobs */}
        <motion.div
          style={{ x: pX, y: pY }}
          animate={{
            scale: [1, 1.15, 0.95, 1.1, 1],
            opacity: [0.12, 0.22, 0.15, 0.2, 0.12]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[140px]"
        />
        <motion.div
          style={{ x: deepPX, y: deepPY }}
          animate={{
            scale: [1, 0.9, 1.12, 0.95, 1],
            opacity: [0.1, 0.18, 0.12, 0.16, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[160px]"
        />
      </motion.div>

      {/* Floating Micro-Star / Particle System */}
      {hasMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {Array.from({ length: 35 }).map((_, i) => {
            const size = Math.random() * 3 + 1; // 1px to 4px
            const initialX = Math.random() * 100;
            const initialY = Math.random() * 100;
            const duration = Math.random() * 25 + 15; // 15s to 40s
            const delay = Math.random() * -20;

            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/20"
                style={{
                  width: size,
                  height: size,
                  left: `${initialX}%`,
                  top: `${initialY}%`,
                }}
                animate={{
                  y: ["0px", "-180px", "0px"],
                  x: ["0px", Math.random() > 0.5 ? "60px" : "-60px", "0px"],
                  opacity: [0.1, 0.8, 0.1],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: delay,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Hero Content */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center"
      >



        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black leading-[0.9] tracking-tighter mb-8 select-none">
          <motion.span
            initial={{ opacity: 0, y: 40, filter: "blur(8px)", scale: 0.96 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="block text-zinc-100 bg-gradient-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent"
          >
            WE CREATE
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40, filter: "blur(8px)", scale: 0.96 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="block bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-clip-text text-transparent relative drop-shadow-[0_0_40px_rgba(168,85,247,0.25)]"
          >
            DIGITAL MAGIC
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.5, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed tracking-wide px-4"
        >
          Bold design meets cutting-edge technology to craft cinematic digital experiences that captivate, convert, and push visual boundaries.
        </motion.p>
      </motion.div>
    </section>
  );
}