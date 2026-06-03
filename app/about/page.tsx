"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";

export default function AboutPage() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Scroll parallax effects
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const [hasMounted, setHasMounted] = useState(false);
  const [activeMethodology, setActiveMethodology] = useState<"vision" | "design" | "performance">("vision");

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const methodologies = {
    vision: {
      title: "01 / Planning",
      tagline: "We design custom layouts tailored specifically to your goals.",
      desc: "We start by analyzing your brand and objectives. Instead of using generic templates, we plan custom layouts from the ground up to ensure your website meets your exact requirements.",
      color: "text-white",
      glowColor: "transparent"
    },
    design: {
      title: "02 / Clean Interface",
      tagline: "Clear, responsive layouts that work on all screens.",
      desc: "We design highly structured, intuitive interfaces. Utilizing clean grids, consistent spacing, and simple navigation, we make it easy for users to find the information they need.",
      color: "text-white",
      glowColor: "transparent"
    },
    performance: {
      title: "03 / Solid Code",
      tagline: "Fast loading speeds and clean engineering standards.",
      desc: "We build websites with modern web frameworks. Our clean, structured codebase ensures that pages load instantly, are secure, and are easy to maintain over time.",
      color: "text-white",
      glowColor: "transparent"
    }
  };

  const values = [
    {
      title: "Custom Design",
      desc: "We build custom websites from scratch to match your specific business goals.",
      icon: (
        <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Attention to Detail",
      desc: "We ensure every layout is properly aligned and functions correctly on all device sizes.",
      icon: (
        <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
    },
    {
      title: "Functional Motion",
      desc: "We use simple, subtle animations only where they help guide the user's attention.",
      icon: (
        <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      )
    },
    {
      title: "Modern Code",
      desc: "We use modern coding standards to make your website performant, accessible, and secure.",
      icon: (
        <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    }
  ];

  const departments = [
    {
      name: "Design Studio",
      focus: ["Interface Layout", "Branding Assets", "Typography System", "Interactive Prototyping"],
      desc: "We focus on creating clean visual layouts, consistent branding assets, and logical page hierarchies."
    },
    {
      name: "Development Team",
      focus: ["Frontend Development", "Framework Integration", "Performance Optimization", "Clean Codebase"],
      desc: "We translate layouts into clean, high-performance code that is responsive and accessible."
    },
    {
      name: "Project Strategy",
      focus: ["SEO Optimization", "User Analytics", "Content Strategy", "Performance Audit"],
      desc: "We optimize your website structure for search engines and set up tools to analyze user engagement."
    }
  ];

  return (
    <main ref={containerRef} className="min-h-screen bg-transparent overflow-hidden relative">
      <Navigation transparent={true} />

      {/* Background Parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none select-none z-0 bg-transparent" />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-20 px-6 z-10">
        <motion.div style={{ y: contentY }} className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-zinc-500 text-xs font-bold tracking-[0.3em] uppercase mb-8 block"
          >
            ABOUT US
          </motion.span>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-semibold leading-[1.1] tracking-[-0.03em] mb-8 max-w-4xl select-none text-ink">
            <motion.span
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0, y: 25 },
                visible: {
                  clipPath: "inset(0 0% 0 0)",
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }
                }
              }}
              className="block text-ink"
            >
              We <span className="font-serif italic font-light text-[#8B6F47]">design</span> & build
            </motion.span>
            <motion.span
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0, y: 25 },
                visible: {
                  clipPath: "inset(0 0% 0 0)",
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1.3, delay: 0.4, ease: [0.16, 1, 0.3, 1] }
                }
              }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-ink via-accent-sepia to-ink relative"
            >
              clean <span className="font-serif italic font-light">websites</span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-zinc-650 max-w-2xl mx-auto font-medium leading-relaxed tracking-wide px-4"
          >
            Void is a design and development studio. We build custom websites that are clean, fast, and easy to use.
          </motion.p>
        </motion.div>
      </section>

      {/* Story & Interactive Methodology Section */}
      <section className="py-24 px-6 relative z-10 border-t border-zinc-200 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* Story Text (Left Side) */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <ScrollReveal direction="up">
                <span className="text-zinc-500 text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-4 block">
                  HOW WE CREATE
                </span>
                <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter text-black leading-none">
                  Custom Digital Solutions
                </h2>
                <div className="space-y-6 text-zinc-650 font-medium text-base leading-relaxed">
                  <p>
                    We believe that a website should be clear, performant, and directly serve your business needs. We avoid templates and generic designs, choosing instead to focus on clean grid alignments, readable typography, and straightforward user navigation.
                  </p>
                  <p>
                    By combining visual design with reliable software development, we build custom sites that help establish your company's presence online without any unnecessary distractions.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Interactive Methodology (Right Side) */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <ScrollReveal direction="up" delay={0.2}>
                <div className="relative w-full max-w-lg aspect-square bg-white border border-zinc-200 rounded-[2.5rem] p-8 md:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col justify-between group">

                  {/* Core Selector Tabs */}
                  <div className="flex justify-between items-center bg-zinc-100 border border-zinc-200 rounded-full p-1.5 z-10">
                    {(Object.keys(methodologies) as Array<keyof typeof methodologies>).map((key) => {
                      const isActive = activeMethodology === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setActiveMethodology(key)}
                          className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 relative ${isActive ? "text-white" : "text-zinc-500 hover:text-black"
                            }`}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="methodology-pill"
                              className="absolute inset-0 bg-black rounded-full z-0"
                              transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            />
                          )}
                          <span className="relative z-10">{key}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Methodology Detail Block */}
                  <div className="my-8 md:my-10 z-10 flex-grow flex flex-col justify-center">
                    <span className="text-xs font-extrabold tracking-widest text-zinc-500 uppercase block mb-3">
                      METHODOLOGY
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-black mb-4">
                      {methodologies[activeMethodology].title}
                    </h3>
                    <p className="text-black text-sm font-semibold tracking-wide leading-relaxed mb-4">
                      {methodologies[activeMethodology].tagline}
                    </p>
                    <p className="text-zinc-600 text-xs md:text-sm font-medium leading-relaxed">
                      {methodologies[activeMethodology].desc}
                    </p>
                  </div>

                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 md:py-36 px-6 relative z-10 border-t border-zinc-200 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-20">
              <span className="text-zinc-500 text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-3 block">
                OUR PILLARS
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-black">
                Our Core Pillars
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, i) => (
              <ScrollReveal key={val.title} direction="up" delay={i * 0.1}>
                <motion.div
                  whileHover={{
                    y: -10,
                    borderColor: "#d97706",
                    backgroundColor: "#faf8f5"
                  }}
                  transition={{ type: "spring", stiffness: 150, damping: 20 }}
                  className="group p-8 md:p-10 border border-zinc-200 rounded-[2rem] bg-white hover:border-amber-300 hover:shadow-[0_20px_40px_-15px_rgba(217,119,6,0.1)] transition-all duration-500 flex flex-col items-start cursor-pointer"
                >
                  <div className="p-4 bg-zinc-100 border border-zinc-200 rounded-2xl mb-8 group-hover:border-zinc-350 transition-all duration-500 text-black">
                    {val.icon}
                  </div>
                  <h3 className="text-xl font-black text-black mb-4 transition-colors duration-300">
                    {val.title}
                  </h3>
                  <p className="text-zinc-650 text-xs md:text-sm leading-relaxed font-medium group-hover:text-zinc-900 transition-colors duration-300">
                    {val.desc}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-24 md:py-36 px-6 relative z-10 border-t border-zinc-200 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-20">
              <span className="text-zinc-500 text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-3 block">
                ORGANIZATIONAL FLOW
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-black">
                Studio Departments
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {departments.map((dept, i) => (
              <ScrollReveal key={dept.name} direction="up" delay={i * 0.12}>
                <div className="h-full flex flex-col justify-between p-10 bg-white border border-zinc-200 rounded-[2.2rem] shadow-[0_15px_35px_rgba(0,0,0,0.02)] hover:bg-[#faf8f5] hover:border-zinc-400 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 group">
                  <div>
                    <h3 className="text-2xl font-black text-black mb-4 transition-colors duration-300">
                      {dept.name}
                    </h3>
                    <p className="text-zinc-600 text-sm font-medium leading-relaxed mb-8">
                      {dept.desc}
                    </p>
                  </div>

                  <div className="border-t border-zinc-200 pt-6 mt-auto">
                    <span className="text-[10px] font-extrabold tracking-widest text-zinc-400 uppercase block mb-4">
                      OPERATIONAL FOCUS
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {dept.focus.map((item) => (
                        <span
                          key={item}
                          className="px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-[10px] font-bold text-zinc-600 group-hover:border-zinc-350 group-hover:text-black transition-all duration-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
