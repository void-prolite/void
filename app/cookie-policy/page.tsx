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
              Cookie Policy
            </h1>
            <p className="text-zinc-500 text-sm font-semibold mb-12">
              Last updated: June 11, 2026
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="bg-zinc-50 border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] space-y-10 leading-relaxed text-sm md:text-base font-medium">
              <div >
                <h2 className="text-xl font-bold text-black mb-4">1. What Cookies Are</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">Cookies are small text files stored in your browser when you visit a website. They are used to remember information about your visit, improve functionality, and help us understand how the site is used. Some cookies are essential to the site's operation; others are optional and require your consent.</p>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">2. Consent</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">In accordance with GDPR and the ePrivacy Directive, we only set non-essential cookies after obtaining your consent via our cookie consent banner, which is displayed on your first visit. You may withdraw or adjust your consent at any time using the cookie settings link in the site footer.</p><p className="text-zinc-600">Essential cookies do not require consent as they are strictly necessary for the site to function.</p>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">3. Cookies Void Uses</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">We use the following categories of cookies:</p><p className="text-zinc-600"><strong className="text-black">Essential</strong></p><p className="text-zinc-600">Required for core site navigation, SSL session management, and security. These cookies do not collect personally identifiable information and cannot be disabled without degrading core functionality.</p><ul className="list-disc list-outside ml-5 text-zinc-600 space-y-2 mt-4"><li className="text-zinc-600">Session cookies: maintain your session as you navigate the site (expires on browser close)</li></ul><p className="text-zinc-600"><strong className="text-black">Analytics</strong></p><p className="text-zinc-600">Used to understand how visitors interact with the site. Data is aggregated and anonymised where possible. Requires consent.</p><ul className="list-disc list-outside ml-5 text-zinc-600 space-y-2 mt-4"><li className="text-zinc-600">Google Analytics (_ga, _gid): tracks page views, session duration, and navigation paths — expires after 2 years (_ga) and 24 hours (_gid)</li></ul><p className="text-zinc-600"><strong className="text-black">Functional</strong></p><p className="text-zinc-600">Used to remember choices you make on the site, such as selected service tier or diagnostic inputs. Requires consent.</p><ul className="list-disc list-outside ml-5 text-zinc-600 space-y-2 mt-4"><li className="text-zinc-600">Preference cookies: store UI state between page loads — session-scoped or up to 30 days</li></ul><p className="text-zinc-600"><strong className="text-black">Interaction &amp; Performance</strong></p><p className="text-zinc-600">Where we use client-side scripts to track mouse movement or UI engagement for the purpose of optimising animations and interface performance, this data is processed locally within your browser session and is not transmitted to external servers or stored beyond the session. No cookies are set for this purpose. Requires consent where any external processing occurs.</p><p className="text-zinc-600"><strong className="text-black">Important:  </strong><em>This category does not include behavioural profiling or targeted advertising. If we introduce external interaction tracking in future, this policy will be updated and consent re-requested.</em></p>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">4. Third-Party Cookies</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">Third-party scripts used on this site (including Google Analytics and font providers) may set their own cookies independently. We do not control these cookies. The relevant third-party privacy and cookie policies are:</p><ul className="list-disc list-outside ml-5 text-zinc-600 space-y-2 mt-4"><li className="text-zinc-600">Google: policies.google.com/privacy</li><li className="text-zinc-600">Vercel: vercel.com/legal/privacy-policy</li></ul><p className="text-zinc-600">If we load fonts or other assets from third-party CDNs, your IP address may be transmitted to those providers as part of the HTTP request. Where feasible, we self-host these assets to eliminate this transfer.</p>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">5. Cookie Durations Summary</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">Essential session cookies: expire when the browser is closed. Analytics cookies (_ga): up to 2 years. Analytics cookies (_gid): 24 hours. Functional preference cookies: up to 30 days. Interaction/performance data: not stored; session-scoped browser memory only.</p>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">6. Managing Cookies</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">You can manage, block, or delete cookies at any time through your browser settings. The following links provide instructions for common browsers:</p><ul className="list-disc list-outside ml-5 text-zinc-600 space-y-2 mt-4"><li className="text-zinc-600">Google Chrome: support.google.com/chrome/answer/95647</li><li className="text-zinc-600">Mozilla Firefox: support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer</li><li className="text-zinc-600">Safari: support.apple.com/guide/safari/manage-cookies-sfri11471/mac</li><li className="text-zinc-600">Microsoft Edge: support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge</li></ul><p className="text-zinc-600">Disabling essential cookies may impair core site functionality. Disabling analytics or functional cookies will not affect your ability to use the site.</p>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-black mb-4">7. Updates</h2>
                <div className="space-y-4">
                  <p className="text-zinc-600">Cookie usage may evolve as the site develops. We will update this policy and, where required, re-request consent when material changes are made. The "Last updated" date at the top of this page reflects the most recent revision. For questions or to exercise your data rights, contact us at void.prolite@gmail.com.</p>
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
