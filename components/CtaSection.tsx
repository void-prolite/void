"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useRef } from "react";
import Link from "next/link";

interface CtaProps {}

export default function CtaSection({}: CtaProps) {
  const revealRef = useRef(null);

  return (
    <section id="contact" className="py-40 md:py-48 px-6 relative overflow-hidden bg-black">
      {/* Background ambient glow blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <ScrollReveal ref={revealRef} direction="up">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-12 tracking-tighter text-zinc-100">
            Ready to <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(168,85,247,0.25)]">stand out</span>?
          </h2>
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={0.2}>
          <Link href="/start" className="inline-block">
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 50px rgba(255, 255, 255, 0.25)" 
              }}
              whileTap={{ scale: 0.98 }}
              className="relative px-12 py-5 bg-white text-black font-extrabold text-lg rounded-full overflow-hidden group shadow-[0_4px_30px_rgba(255,255,255,0.1)]"
            >
              {/* Shimmer element */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.75, ease: "easeInOut" }}
              />
              <span className="relative z-10">Start a Project</span>
            </motion.button>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}