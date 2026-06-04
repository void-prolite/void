"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface HeroProps { }

export default function Hero({ }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Scroll parallax for content background
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-36 pb-20 px-6 bg-transparent"
    >
      {/* Background Parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none select-none z-0 bg-transparent" />

      {/* Hero Content */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center translate-y-8"
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[1.15] tracking-[-0.03em] mb-8 select-none text-ink">
          <motion.span
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0, y: 25 },
              visible: {
                clipPath: "inset(0 0% 0 0)",
                opacity: 1,
                y: 0,
                transition: { duration: 1.3, delay: 0.15, ease: [0.16, 1, 0.3, 1] }
              }
            }}
            className="block text-ink"
          >
            We <span className="font-serif italic font-light text-[#8B6F47]">design</span> & build
          </motion.span>
          <motion.span
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0, y: 25 },
              visible: {
                clipPath: "inset(0 0% 0 0)",
                opacity: 1,
                y: 0,
                transition: { duration: 1.3, delay: 0.38, ease: [0.16, 1, 0.3, 1] }
              }
            }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-ink via-accent-sepia to-ink relative"
          >
            clean <span className="font-serif italic font-light">websites</span>
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.5, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm md:text-base text-zinc-650 max-w-2xl mx-auto mb-12 font-medium leading-relaxed tracking-normal word-spacing-tight px-4"
        >
          We design and build fast, clean, and reliable websites for creative brands and modern businesses.
        </motion.p>
      </motion.div>
    </section>
  );
}