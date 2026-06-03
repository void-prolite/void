"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";

export default function CookiePolicyPage() {
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
              Cookie Policy
            </h1>
            <p className="text-zinc-500 text-sm font-semibold mb-12">
              Last updated: May 29, 2026
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="bg-zinc-50 border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] space-y-10 leading-relaxed text-sm md:text-base font-medium">
              <div>
                <h2 className="text-xl font-bold text-black mb-4">1. What Cookies Are</h2>
                <p className="text-zinc-600">
                  Cookies are small files stored in the browser used to improve performance and experience.
                </p>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">2. Cookies Void Uses</h2>
                <ul className="list-disc pl-5 space-y-3 text-zinc-600">
                  <li>
                    <strong className="text-black">Essential:</strong> Required for navigation, SSL, and core site function.
                  </li>
                  <li>
                    <strong className="text-black">Analytics:</strong> Tools like Google Analytics tracking page views, session duration, and interaction patterns.
                  </li>
                  <li>
                    <strong className="text-black">Functional:</strong> Remembering user preferences such as selected service tier or diagnostic inputs.
                  </li>
                  <li>
                    <strong className="text-black">Performance/Parallax:</strong> Tracking mouse movement and UI engagement to optimise animations.
                  </li>
                </ul>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">3. Third-Party Cookies</h2>
                <p className="text-zinc-600">
                  We use third-party scripts (such as analytics, fonts, embeds) that may set their own cookies.
                </p>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">4. Managing Cookies</h2>
                <p className="text-zinc-600">
                  Users can block or delete cookies via browser settings; disabling essential cookies may degrade the visual experience.
                </p>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">5. Updates</h2>
                <p className="text-zinc-600">
                  Cookie usage may evolve as the site develops; check back for updates or contact <a href="mailto:void.prolite@gmail.com" className="text-black hover:text-zinc-700 transition-colors font-bold underline">void.prolite@gmail.com</a>.
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
