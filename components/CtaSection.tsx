"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useRef } from "react";
import Link from "next/link";

interface CtaProps { }

export default function CtaSection({ }: CtaProps) {
  const revealRef = useRef(null);

  return (
    <section id="contact" className="py-40 md:py-48 px-6 relative overflow-hidden bg-transparent border-t border-zinc-200">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <ScrollReveal ref={revealRef} direction="up">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium mb-12 tracking-[-0.02em] text-black word-spacing-tight">
            Ready to stand out?
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <Link href="/start" className="inline-block">
            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-5 bg-black text-white border border-black hover:bg-white hover:text-black font-bold text-lg rounded-full transition-colors duration-300"
            >
              Start a Project
            </motion.button>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}