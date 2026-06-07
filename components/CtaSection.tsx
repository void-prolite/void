"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useRef } from "react";
import Link from "next/link";
import useIsMobile from "../hooks/useIsMobile";

interface CtaProps { }

export default function CtaSection({ }: CtaProps) {
  const revealRef = useRef(null);
  const isMobile = useIsMobile();

  return (
    <section id="contact" className="py-20 md:py-24 px-6 relative overflow-hidden bg-transparent border-t border-zinc-200">
      {/* Decorative background radial halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#8B6F47]/5 via-amber-500/5 to-transparent blur-3xl pointer-events-none z-0 hidden md:block" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <ScrollReveal ref={revealRef} direction="up">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium mb-12 tracking-[-0.02em] text-black word-spacing-tight">
            Ready to stand out?
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <p className="text-sm text-zinc-500 font-medium mb-6">
            No commitment. Free discovery call.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/start">
              <motion.button
                whileHover={isMobile ? {} : { scale: 1.02 }}
                whileTap={isMobile ? {} : { scale: 0.98 }}
                className="px-14 py-5 bg-black text-white border border-black hover:bg-zinc-800 font-bold text-lg rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                Start a Project
              </motion.button>
            </Link>
            <Link href="/about">
              <motion.button
                whileHover={isMobile ? {} : { scale: 1.02 }}
                whileTap={isMobile ? {} : { scale: 0.98 }}
                className="px-10 py-4 bg-transparent text-zinc-600 border border-zinc-300 hover:bg-black hover:text-white font-semibold text-base rounded-full transition-all duration-300 w-full sm:w-auto"
              >
                Our Philosophy
              </motion.button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}