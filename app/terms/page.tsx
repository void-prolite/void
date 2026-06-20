"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";

export default function LegalPage() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <main ref={containerRef} className="min-h-screen bg-transparent overflow-hidden relative text-zinc-700">

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
              Last updated: June 11, 2026
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="bg-zinc-50 border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] space-y-10 leading-relaxed text-sm md:text-base font-medium">
              <div >
                <h2 className="text-xl font-bold text-black mb-4">1. Agreement to Terms</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">By accessing or using this website (void-prolite.online), you confirm that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, you must not use this site. These terms constitute a legally binding agreement between you and Void.prolite</p>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">2. Intellectual Property — Site Content</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">All design systems, code, layouts, visual assets, copy, and branding on this website are the exclusive intellectual property of Void.prolite No part of this site may be reproduced, distributed, or used in any form without prior written permission from Void.prolite</p>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">3. Project Scoping &amp; Initiation</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">Consultation requests submitted via the diagnostic panel (Lite or Pro) are exploratory in nature and do not constitute a binding engagement. Void.prolite reserves the right to accept or decline any project based on workload, fit, or scope. A project is formally initiated only upon execution of a written agreement or acceptance of a formal proposal and receipt of the agreed deposit.</p>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">4. Payments &amp; Refunds</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">All project fees are agreed in writing prior to commencement of work. The following payment terms apply:</p><ul className="list-disc list-outside ml-5 text-zinc-600 space-y-2 mt-4"><li className="text-zinc-600">A non-refundable deposit (as specified in the project proposal) is required to initiate work</li><li className="text-zinc-600">Remaining balances are due on the schedule set out in the project agreement</li><li className="text-zinc-600">If a client cancels a project after work has commenced, they will be invoiced for all work completed to the date of cancellation, calculated at a pro-rated daily rate based on the agreed project fee</li><li className="text-zinc-600">Invoices not settled within 14 days of the due date may incur a late payment charge of 1.5% per month on the outstanding balance</li><li className="text-zinc-600">Void.prolite reserves the right to pause or suspend work on any project where payment is overdue by more than 14 days</li></ul><p className="text-zinc-600"><strong className="text-black">Dispute note:  </strong><em>If you dispute any invoice, notify us in writing within 7 days of receipt. Disputes not raised within this window are deemed accepted.</em></p>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">5. Intellectual Property Transfer</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">All intellectual property rights in final deliverables (including design files and compiled code) transfer to the client only upon receipt of full and final payment. Until that point, all work-in-progress materials remain the property of Void.prolite</p><p className="text-zinc-600">The following are explicitly excluded from IP transfer and remain the property of Void.prolite regardless of payment status:</p><ul className="list-disc list-outside ml-5 text-zinc-600 space-y-2 mt-4"><li className="text-zinc-600">Proprietary frameworks, utility libraries, or reusable components developed independently by Void.prolite</li><li className="text-zinc-600">Internal tooling, processes, or scaffolding used in delivery</li></ul><p className="text-zinc-600">Void.prolite retains the right to display final deliverables in its portfolio and marketing materials unless the client submits a written opt-out request within 14 days of project completion.</p>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">6. Revisions &amp; Change Orders</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">Each project tier includes a defined number of revision rounds as specified in the project proposal. Requests for changes or additions that fall outside the agreed scope will be treated as change orders and quoted separately before work proceeds. Void.prolite is not obligated to begin out-of-scope work without a written change order agreement and any applicable additional deposit.</p>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">7. Acceptable Use</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">You agree not to use this website or any Void.prolite service to:</p><ul className="list-disc list-outside ml-5 text-zinc-600 space-y-2 mt-4"><li className="text-zinc-600">Submit false, misleading, or fraudulent information</li><li className="text-zinc-600">Attempt any form of injection, exploit, or disruption of site infrastructure</li><li className="text-zinc-600">Engage in spam, unsolicited communications, or abusive conduct toward Void.prolite personnel</li><li className="text-zinc-600">Violate any applicable local, national, or international law or regulation</li></ul>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">8. Force Majeure</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">Void.prolite shall not be liable for any delay or failure in performance resulting from circumstances beyond our reasonable control, including but not limited to illness, platform or infrastructure outages, acts of government, natural disasters, or internet service disruptions. In such cases, we will notify you promptly and make reasonable efforts to resume work as soon as practicable.</p>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">9. Limitation of Liability</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">To the fullest extent permitted by applicable law, Void.prolite shall not be liable for any indirect, incidental, special, or consequential damages arising from or related to the use of our services or this website. Our total aggregate liability for any claim arising from a specific project shall not exceed the total fees paid by the client for that project.</p><p className="text-zinc-600"><strong className="text-black">Note for Indian clients:  </strong><em>Where the Consumer Protection Act 2019 (India) applies to the client relationship, statutory rights are not excluded or limited by this clause.</em></p>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">10. Disclaimer of Warranties</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">This website and all associated services are provided on an "as-is" basis without warranties of any kind, express or implied. Void.prolite makes no guarantee of 100% rendering fidelity across all browsers, devices, or third-party platforms. We do not warrant that the site will be available without interruption or free from error at all times.</p>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">11. Governing Law &amp; Jurisdiction</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">These Terms are governed by and construed in accordance with the laws of India, with jurisdiction in the courts of Bengaluru, Karnataka. In the event of a dispute, both parties agree to first attempt resolution in good faith through direct negotiation before initiating formal legal proceedings. All legal notices should be directed to: Void.prolite@gmail.com.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
