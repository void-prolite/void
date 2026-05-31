"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";

export default function CookiePolicyPage() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const mouseX = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const width = window.innerWidth;
      const height = window.innerHeight;
      mouseX.set((clientX / width) - 0.5);
      mouseY.set((clientY / height) - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const pX = useTransform(mouseX, [-0.5, 0.5], [-30, 30]);
  const pY = useTransform(mouseY, [-0.5, 0.5], [-30, 30]);

  return (
    <main ref={containerRef} className="min-h-screen bg-black overflow-hidden relative text-zinc-300">
      <Navigation transparent={true} />

      {/* Nebula Ambient Parallax Backgrounds */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/10 via-black to-pink-950/10" />

        {/* Soft violet glowing blob */}
        <motion.div
          style={{ x: pX, y: pY }}
          animate={{
            scale: [1, 1.15, 0.95, 1.1, 1],
            opacity: [0.12, 0.22, 0.15, 0.2, 0.12]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[140px]"
        />
        {/* Soft pink glowing blob */}
        <motion.div
          style={{ x: pX, y: pY }}
          animate={{
            scale: [1, 0.9, 1.12, 0.95, 1],
            opacity: [0.1, 0.18, 0.12, 0.16, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[160px]"
        />
      </motion.div>

      {/* Floating Micro-Star / Particle System */}
      {hasMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {Array.from({ length: 25 }).map((_, i) => {
            const size = Math.random() * 2.5 + 1;
            const initialX = Math.random() * 100;
            const initialY = Math.random() * 100;
            const duration = Math.random() * 22 + 15;

            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/20"
                style={{
                  width: size,
                  height: size,
                  left: `${initialX}%`,
                  top: `${initialY}%`,
                }}
                animate={{
                  y: ["0px", "-160px", "0px"],
                  x: ["0px", Math.random() > 0.5 ? "50px" : "-50px", "0px"],
                  opacity: [0.1, 0.7, 0.1],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * -18,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Content Section */}
      <section className="relative pt-36 pb-24 px-6 z-10 max-w-4xl mx-auto">
        <motion.div style={{ y: contentY }}>
          <ScrollReveal direction="up">
            <span className="text-purple-500 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
              LEGAL DOCUMENTATION
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tighter mb-12 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
              Cookie Policy
            </h1>
            <p className="text-zinc-400 text-sm font-semibold mb-12">
              Last updated: May 29, 2026
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="bg-zinc-950/30 border border-white/5 rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-10 leading-relaxed text-sm md:text-base font-medium">
              <div>
                <h2 className="text-xl font-bold text-white mb-4">1. What Cookies Are</h2>
                <p className="text-zinc-400">
                  Cookies are small files stored in the browser used to improve performance and experience.
                </p>
              </div>

              <div className="border-t border-white/5 pt-8">
                <h2 className="text-xl font-bold text-white mb-4">2. Cookies Void Uses</h2>
                <ul className="list-disc pl-5 space-y-3 text-zinc-400">
                  <li>
                    <strong className="text-white">Essential:</strong> Required for navigation, SSL, and core site function.
                  </li>
                  <li>
                    <strong className="text-white">Analytics:</strong> Tools like Google Analytics tracking page views, session duration, and interaction patterns.
                  </li>
                  <li>
                    <strong className="text-white">Functional:</strong> Remembering user preferences such as selected service tier or diagnostic inputs.
                  </li>
                  <li>
                    <strong className="text-white">Performance/Parallax:</strong> Tracking mouse movement and UI engagement to optimise animations.
                  </li>
                </ul>
              </div>

              <div className="border-t border-white/5 pt-8">
                <h2 className="text-xl font-bold text-white mb-4">3. Third-Party Cookies</h2>
                <p className="text-zinc-400">
                  We use third-party scripts (such as analytics, fonts, embeds) that may set their own cookies.
                </p>
              </div>

              <div className="border-t border-white/5 pt-8">
                <h2 className="text-xl font-bold text-white mb-4">4. Managing Cookies</h2>
                <p className="text-zinc-400">
                  Users can block or delete cookies via browser settings; disabling essential cookies may degrade the visual experience.
                </p>
              </div>

              <div className="border-t border-white/5 pt-8">
                <h2 className="text-xl font-bold text-white mb-4">5. Updates</h2>
                <p className="text-zinc-400">
                  Cookie usage may evolve as the site develops; check back for updates or contact <a href="mailto:void.prolite@gmail.com" className="text-purple-400 hover:text-purple-300 transition-colors font-bold">void.prolite@gmail.com</a>.
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
