"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-zinc-500 text-sm font-semibold mb-12">
              Last updated: May 29, 2026
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="bg-zinc-50 border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] space-y-10 leading-relaxed text-sm md:text-base font-medium">
              <div>
                <h2 className="text-xl font-bold text-black mb-4">1. Overview</h2>
                <p className="text-zinc-600">
                  Void is committed to protecting user privacy; this policy explains what is collected and why.
                </p>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">2. Data Collected</h2>
                <p className="text-zinc-600">
                  Name, organisation, email, project requirements, budget tier selections, browser/device metadata.
                </p>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">3. How Data Is Used</h2>
                <p className="text-zinc-600">
                  Solely to respond to enquiries, scope projects, and deliver services; never sold or shared with third parties.
                </p>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">4. Third-Party Tools</h2>
                <p className="text-zinc-600">
                  We use tools such as Google Analytics, form providers, or hosting platforms that may process data independently; users should review their respective policies.
                </p>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">5. Cookies</h2>
                <p className="text-zinc-600">
                  Please refer to the <a href="/cookie-policy" className="text-black hover:text-zinc-700 transition-colors font-bold underline">Cookie Policy</a> page for full detail on our cookie usage.
                </p>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">6. Data Retention</h2>
                <p className="text-zinc-600">
                  Data is retained only as long as necessary for the business relationship or as required by law.
                </p>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">7. GDPR & User Rights</h2>
                <p className="text-zinc-600">
                  Users have the right to access, correct, or delete their data at any time; lawful basis for processing is legitimate interest and/or consent; contact <a href="mailto:void.prolite@gmail.com" className="text-black hover:text-zinc-700 transition-colors font-bold underline">void.prolite@gmail.com</a> to exercise rights.
                </p>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">8. Secure Transmission</h2>
                <p className="text-zinc-600">
                  All data is encrypted in transit via industry-standard protocols.
                </p>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">9. Policy Updates</h2>
                <p className="text-zinc-600">
                  Void may update this policy; continued use of the site constitutes acceptance.
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
