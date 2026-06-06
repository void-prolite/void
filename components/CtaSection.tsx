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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#8B6F47]/5 via-amber-500/5 to-transparent blur-3xl pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <ScrollReveal ref={revealRef} direction="up">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium mb-12 tracking-[-0.02em] text-black word-spacing-tight">
            Ready to stand out?
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/start">
              <motion.button
                whileHover={isMobile ? {} : { scale: 1.02 }}
                whileTap={isMobile ? {} : { scale: 0.98 }}
                className="px-12 py-5 bg-black text-white border border-black hover:bg-zinc-800 font-bold text-lg rounded-full transition-colors duration-300 w-64 sm:w-auto sm:px-10 sm:py-4.5 sm:text-base"
              >
                Start a Project
              </motion.button>
            </Link>
            <Link href="/about">
              <motion.button
                whileHover={isMobile ? {} : { scale: 1.02 }}
                whileTap={isMobile ? {} : { scale: 0.98 }}
                className="px-12 py-5 bg-transparent text-black border border-zinc-350 hover:bg-black hover:text-white font-bold text-lg rounded-full transition-all duration-300 w-64 sm:w-auto sm:px-10 sm:py-4.5 sm:text-base"
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