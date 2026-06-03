"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";

export default function TermsPage() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <main ref={containerRef} className="min-h-screen bg-transparent overflow-hidden relative text-zinc-700">
      <Navigation transparent={true} />

      {/* Background Parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none select-none z-0 bg-transparent" />

      {/* Content Section */}
      <section className="relative pt-36 pb-24 px-6 z-10 max-w-4xl mx-auto">
        <motion.div style={{ y: contentY }}>
          <ScrollReveal direction="up">
            <span className="text-zinc-500 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
              LEGAL DOCUMENTATION
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tighter mb-12 text-black">
              Terms of Service
            </h1>
            <p className="text-zinc-500 text-sm font-semibold mb-12">
              Last updated: May 29, 2026
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="bg-zinc-50 border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] space-y-10 leading-relaxed text-sm md:text-base font-medium">
              <div>
                <h2 className="text-xl font-bold text-black mb-4">1. Agreement to Terms</h2>
                <p className="text-zinc-600">
                  By accessing the site, you mean accepting these terms.
                </p>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">2. Intellectual Property</h2>
                <p className="text-zinc-600">
                  All design systems, code, layouts, and branding belong to Void Creative; no unauthorized reproduction.
                </p>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">3. Project Scoping & Initiation</h2>
                <p className="text-zinc-600">
                  Consultation requests via the diagnostic panel (Lite/Pro) are exploratory; Void reserves the right to accept or decline based on workload and fit.
                </p>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">4. Payments & Refunds</h2>
                <p className="text-zinc-600">
                  Project fees are agreed upon before work begins; deposits are non-refundable; cancellations mid-project are billed for work completed to date.
                </p>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">5. Intellectual Property Transfer</h2>
                <p className="text-zinc-600">
                  Final deliverables transfer to the client only upon receipt of full payment; Void retains the right to display work in its portfolio unless the client opts out in writing.
                </p>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">6. Acceptable Use</h2>
                <p className="text-zinc-600">
                  No spamming, malicious injections, or platform disruption.
                </p>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">7. Limitation of Liability</h2>
                <p className="text-zinc-600">
                  Void is not liable for indirect or consequential damages; liability is capped at the total fees paid for the relevant project.
                </p>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">8. Disclaimer of Warranties</h2>
                <p className="text-zinc-600">
                  The site is provided as-is; no guarantee of 100% rendering fidelity on legacy browsers.
                </p>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">9. Jurisdiction</h2>
                <p className="text-zinc-600">
                  Governed by the laws of India/Karnataka; legal inquiries to <a href="mailto:void.prolite@gmail.com" className="text-black hover:text-zinc-700 transition-colors font-bold underline">void.prolite@gmail.com</a>.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
