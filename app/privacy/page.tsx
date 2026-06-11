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
              Privacy Policy
            </h1>
            <p className="text-zinc-500 text-sm font-semibold mb-12">
              Last updated: June 11, 2026
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="bg-zinc-50 border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] space-y-10 leading-relaxed text-sm md:text-base font-medium">
              <div >
                <h2 className="text-xl font-bold text-black mb-4">1. Overview</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">Void ("Void," "we," "us," or "our"), a sole-proprietor creative studio operating at void-prolite.online, is committed to protecting the privacy of individuals who interact with this website. This policy explains what personal data we collect, how we use it, and your rights in relation to it. Void acts as the data controller for all personal data processed under this policy.</p>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">2. Data Collected</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">We may collect the following categories of personal data when you contact us or submit a project enquiry:</p><ul className="list-disc list-outside ml-5 text-zinc-600 space-y-2 mt-4"><li className="text-zinc-600">Identification data: name and organisation name</li><li className="text-zinc-600">Contact data: email address</li><li className="text-zinc-600">Project data: requirements, scope details, and budget tier selections</li><li className="text-zinc-600">Technical data: browser type, device type, IP address, and session metadata collected automatically via analytics tools</li></ul>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">3. How Data Is Used</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">Personal data is collected and used solely for the following purposes:</p><ul className="list-disc list-outside ml-5 text-zinc-600 space-y-2 mt-4"><li className="text-zinc-600">To respond to enquiries and scope potential projects</li><li className="text-zinc-600">To deliver agreed services and manage the client relationship</li><li className="text-zinc-600">To comply with applicable legal obligations</li></ul><p className="text-zinc-600">We do not sell, rent, or share your personal data with third parties for marketing or commercial purposes.</p>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">4. Lawful Basis for Processing</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">We process personal data under the following lawful bases as defined under applicable data protection law (including GDPR and India's Digital Personal Data Protection Act 2023):</p><ul className="list-disc list-outside ml-5 text-zinc-600 space-y-2 mt-4"><li className="text-zinc-600">Legitimate interest: responding to inbound enquiries and scoping projects from individuals who have voluntarily contacted us</li><li className="text-zinc-600">Consent: where you have explicitly opted in to communications or use of non-essential cookies</li><li className="text-zinc-600">Contractual necessity: processing required to perform a service agreement with you</li><li className="text-zinc-600">Legal obligation: where processing is required to comply with applicable law</li></ul>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">5. Third-Party Processors</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">We use the following third-party tools that may independently process data in connection with our service. We recommend reviewing each provider's privacy policy:</p><ul className="list-disc list-outside ml-5 text-zinc-600 space-y-2 mt-4"><li className="text-zinc-600">Google Analytics (analytics.google.com/analytics) — page view, session, and interaction tracking</li><li className="text-zinc-600">Vercel (vercel.com/legal/privacy-policy) — website hosting and edge delivery; may log IP addresses and request metadata</li><li className="text-zinc-600">Google Fonts via CDN — loading fonts from Google's servers transmits your IP address to Google; we self-host where feasible to mitigate this</li><li className="text-zinc-600">Web3Forms (web3forms.com/privacy) — contact form processing and email routing</li><li className="text-zinc-600">Any form or contact tool in use at time of enquiry — disclosed in the contact form interface</li></ul><p className="text-zinc-600">Where third-party processors act as data processors on our behalf, we take reasonable steps to ensure they maintain appropriate safeguards.</p>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">6. Cookies</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">Please refer to our Cookie Policy for full detail on the cookies we use, their purpose, and how to manage them.</p>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">7. Data Retention</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">We retain personal data only for as long as necessary to fulfil the purpose for which it was collected, or as required by applicable law. Enquiry data from non-converting contacts is deleted within 12 months. Client project data is retained for a minimum of 3 years for accounting and legal compliance purposes, after which it is securely deleted.</p>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">8. Your Rights</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">Subject to applicable law (including GDPR Articles 15–21 and India's DPDP Act 2023), you have the following rights regarding your personal data:</p><ul className="list-disc list-outside ml-5 text-zinc-600 space-y-2 mt-4"><li className="text-zinc-600">Right of access — to obtain a copy of the personal data we hold about you</li><li className="text-zinc-600">Right to rectification — to correct inaccurate or incomplete data</li><li className="text-zinc-600">Right to erasure — to request deletion of your data where no legal basis for retention exists</li><li className="text-zinc-600">Right to restrict processing — to limit how we use your data in certain circumstances</li><li className="text-zinc-600">Right to data portability — to receive your data in a structured, machine-readable format</li><li className="text-zinc-600">Right to object — to object to processing based on legitimate interest</li></ul><p className="text-zinc-600">To exercise any of these rights, contact us at void.prolite@gmail.com. We will respond within 30 days of receiving a valid request. We may ask you to verify your identity before processing the request.</p>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">9. Grievance Officer</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">In accordance with India's Digital Personal Data Protection Act 2023 and the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules 2021, our designated Grievance Officer can be reached at:</p><p className="text-zinc-600">Email: void.prolite@gmail.com</p><p className="text-zinc-600">Response time: within 30 days of receipt of grievance.</p>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">10. Data Breach Notification</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">In the event of a personal data breach that poses a risk to your rights and freedoms, we will notify the relevant supervisory authority within 72 hours of becoming aware of the breach, in accordance with GDPR Article 33. Where the breach is likely to result in a high risk to individuals, we will also notify affected individuals without undue delay.</p>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">11. Children's Data</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">This website is not directed at individuals under the age of 18. We do not knowingly collect personal data from minors. If you believe a minor has submitted personal data to us, please contact us at void.prolite@gmail.com and we will delete it promptly. Where required under India's DPDP Act 2023, verifiable parental or guardian consent will be obtained before processing data of a minor.</p>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">12. Secure Transmission</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">All data transmitted to and from this website is encrypted in transit using TLS (Transport Layer Security). We implement reasonable technical and organisational measures to protect personal data against unauthorised access, loss, or disclosure. No method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">13. Policy Updates</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">We may update this policy from time to time. Where changes are material, we will update the "Last updated" date at the top of this page. We recommend reviewing this page periodically. Continued use of the site following an update constitutes acknowledgement of the revised policy; however, where applicable law requires renewed consent, we will seek it explicitly.</p>
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
