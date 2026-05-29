"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
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

  // Mouse Parallax for glowing overlays
  const mouseX = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });

  const [hasMounted, setHasMounted] = useState(false);
  const [activeMethodology, setActiveMethodology] = useState<"vision" | "design" | "performance">("vision");

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

  const methodologies = {
    vision: {
      title: "01 / Visionary Focus",
      tagline: "We decode standard structures to build custom ecosystems.",
      desc: "Every product starts with radical conceptualization. We don't adapt to typical design trends; we establish brand positioning that commands authority and pushes boundaries, defining custom visual spaces before the first line of code is written.",
      color: "from-purple-500 to-violet-500",
      glowColor: "rgba(168, 85, 247, 0.15)"
    },
    design: {
      title: "02 / Cinematic Design",
      tagline: "Fluid, custom-tailored interfaces that feel alive.",
      desc: "We practice obsessive styling to ensure that interfaces react flawlessly to user inputs. Leveraging custom shaders, gorgeous glassmorphism, responsive grids, and micro-interactions, we turn standard screens into breathtaking interactive playgrounds.",
      color: "from-pink-500 to-purple-500",
      glowColor: "rgba(236, 72, 153, 0.15)"
    },
    performance: {
      title: "03 / Elite Engineering",
      tagline: "Cutting-edge architecture prioritizing extreme performance.",
      desc: "Visual brilliance requires a robust platform. We engineer performant websites using optimal rendering structures, highly structured codebases, and custom state systems that load instantly, ensuring high fidelity does not compromise loading speeds.",
      color: "from-purple-500 to-pink-500",
      glowColor: "rgba(168, 85, 247, 0.15)"
    }
  };

  const values = [
    {
      title: "Bold Innovation",
      desc: "We actively reject typical structures, crafting unique digital products designed to completely revolutionize standard business landscapes.",
      icon: (
        <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Obsessive Craft",
      desc: "Details are everything. Every padding, pixel transition, grid offset, and glow parameter is carefully balanced for premium tactile feedback.",
      icon: (
        <svg className="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
    },
    {
      title: "Fluid Motion",
      desc: "Static websites belong in the past. We implement subtle parallax and fluid animations to capture user attention and maintain rich engagement.",
      icon: (
        <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      )
    },
    {
      title: "Technical Edge",
      desc: "We leverage cutting-edge frameworks, robust component layouts, and clean architecture to ensure absolute performance and high visibility.",
      icon: (
        <svg className="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    }
  ];

  const departments = [
    {
      name: "Creative Engine",
      focus: ["Interface Craft", "Fluid Interaction", "Sound & Motion Synthesis", "Immersive Visuals", "Dynamic Animations"],
      desc: "Architects of modern digital spaces who conceptualize brand identities and establish the standard for cinematic layouts."
    },
    {
      name: "Code Laboratory",
      focus: ["Platform Architecture", "Custom Shaders", "Fluid Motion Systems", "Dynamic Interaction"],
      desc: "Engineers who translate complex designs into highly-optimized, fast-loading, and responsive interactive products."
    },
    {
      name: "Synapse Strategy",
      focus: ["System Analytics", "Technical Placement", "Growth Scaling"],
      desc: "Analysts who optimize positioning, tracking dynamic metric layers, and ensuring products successfully scale visual engagement."
    }
  ];

  return (
    <main ref={containerRef} className="min-h-screen bg-black overflow-hidden relative">
      <Navigation transparent={true} />

      {/* Background Glows and Parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/10 via-black to-pink-950/10" />
        
        {/* Animated gas/nebula blobs */}
        <motion.div 
          style={{ x: pX, y: pY }}
          animate={{ 
            scale: [1, 1.12, 0.98, 1.08, 1],
            opacity: [0.15, 0.23, 0.17, 0.21, 0.15]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[140px]" 
        />
        <motion.div 
          style={{ x: pX, y: pY }}
          animate={{ 
            scale: [1, 0.92, 1.1, 0.97, 1],
            opacity: [0.12, 0.2, 0.14, 0.18, 0.12]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 left-10 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[160px]" 
        />
      </motion.div>

      {/* Floating Micro-Star / Particle System */}
      {hasMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {Array.from({ length: 30 }).map((_, i) => {
            const size = Math.random() * 2.5 + 1; // 1px to 3.5px
            const initialX = Math.random() * 100;
            const initialY = Math.random() * 100;
            const duration = Math.random() * 20 + 15; // 15s to 35s
            
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
                  y: ["0px", "-150px", "0px"],
                  x: ["0px", Math.random() > 0.5 ? "40px" : "-40px", "0px"],
                  opacity: [0.1, 0.7, 0.1],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * -15,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center justify-center pt-32 pb-20 px-6 z-10">
        <motion.div style={{ y: contentY }} className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-purple-500 text-xs font-bold tracking-[0.3em] uppercase mb-8 block"
          >
            OUR MANIFESTO
          </motion.span>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black leading-[1] tracking-tighter mb-8 max-w-4xl select-none">
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="block text-zinc-100 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent"
            >
              ARCHITECTS OF
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="block bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-clip-text text-transparent relative drop-shadow-[0_0_35px_rgba(168,85,247,0.2)]"
            >
              DIGITAL MAGIC
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed tracking-wide px-4"
          >
            Void is a creative studio operating at the absolute intersection of visual art and performance code. We don't build generic products; we create cinematic digital worlds.
          </motion.p>
        </motion.div>
      </section>

      {/* Story & Interactive Methodology Section */}
      <section className="py-24 px-6 relative z-10 border-t border-white/5 bg-zinc-950/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Story Text (Left Side) */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <ScrollReveal direction="up">
                <span className="text-purple-500 text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-4 block">
                  HOW WE CREATE
                </span>
                <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent leading-none">
                  Crafting Digital Realities
                </h2>
                <div className="space-y-6 text-zinc-400 font-medium text-base leading-relaxed">
                  <p>
                    Void was founded under a singular design belief: <span className="text-white">the internet should not be flat.</span> We believe web applications should deliver visceral experiences that draw users in, leveraging the same design depth and transitions found in premium physical interfaces.
                  </p>
                  <p>
                    By merging modular engineering with cinematic visual design, we build custom interactive storefronts, complex platform architectures, and premium design portfolios that outperform expectations.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Interactive Neon Methodology (Right Side) */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <ScrollReveal direction="up" delay={0.2}>
                <div className="relative w-full max-w-lg aspect-square bg-zinc-950/20 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col justify-between group">
                  
                  {/* Dynamic methodology backdrop glow */}
                  <div 
                    className="absolute inset-0 opacity-40 blur-[100px] transition-all duration-700 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, ${methodologies[activeMethodology].glowColor}, transparent 70%)`
                    }}
                  />

                  {/* Core Selector Tabs */}
                  <div className="flex justify-between items-center bg-white/5 border border-white/5 rounded-full p-1.5 z-10">
                    {(Object.keys(methodologies) as Array<keyof typeof methodologies>).map((key) => {
                      const isActive = activeMethodology === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setActiveMethodology(key)}
                          className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 relative ${
                            isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                          }`}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="methodology-pill"
                              className="absolute inset-0 bg-white/5 border border-white/10 rounded-full z-0"
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
                    <h3 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
                      {methodologies[activeMethodology].title}
                    </h3>
                    <p className="text-white text-sm font-semibold tracking-wide leading-relaxed mb-4">
                      {methodologies[activeMethodology].tagline}
                    </p>
                    <p className="text-zinc-400 text-xs md:text-sm font-medium leading-relaxed">
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
      <section className="py-24 md:py-36 px-6 relative z-10 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-20">
              <span className="text-purple-500 text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-3 block">
                WHAT DRIVES US
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
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
                    borderColor: "rgba(168, 85, 247, 0.3)", 
                    backgroundColor: "rgba(20, 20, 25, 0.45)" 
                  }}
                  transition={{ type: "spring", stiffness: 150, damping: 20 }}
                  className="group p-8 md:p-10 border border-white/5 rounded-[2rem] bg-zinc-950/20 backdrop-blur-md shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_45px_rgba(168,85,247,0.03)] transition-all duration-500 flex flex-col items-start cursor-pointer"
                >
                  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl mb-8 group-hover:bg-purple-500/10 group-hover:border-purple-500/20 transition-all duration-500 text-purple-400">
                    {val.icon}
                  </div>
                  <h3 className="text-xl font-black text-white mb-4 group-hover:text-purple-400 transition-colors duration-300">
                    {val.title}
                  </h3>
                  <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-medium group-hover:text-zinc-300 transition-colors duration-300">
                    {val.desc}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>



      {/* Departments Section */}
      <section className="py-24 md:py-36 px-6 relative z-10 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-20">
              <span className="text-purple-500 text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-3 block">
                ORGANIZATIONAL FLOW
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
                Studio Departments
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {departments.map((dept, i) => (
              <ScrollReveal key={dept.name} direction="up" delay={i * 0.12}>
                <div className="h-full flex flex-col justify-between p-10 bg-zinc-950/20 border border-white/5 rounded-[2.2rem] shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:border-purple-500/20 hover:bg-zinc-950/30 transition-all duration-500 group">
                  <div>
                    <h3 className="text-2xl font-black text-white mb-4 group-hover:text-purple-400 transition-colors duration-300">
                      {dept.name}
                    </h3>
                    <p className="text-zinc-400 text-sm font-medium leading-relaxed mb-8">
                      {dept.desc}
                    </p>
                  </div>
                  
                  <div className="border-t border-white/5 pt-6 mt-auto">
                    <span className="text-[10px] font-extrabold tracking-widest text-zinc-500 uppercase block mb-4">
                      OPERATIONAL FOCUS
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {dept.focus.map((item) => (
                        <span 
                          key={item} 
                          className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-zinc-400 group-hover:border-purple-500/10 group-hover:text-white transition-all duration-300"
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
