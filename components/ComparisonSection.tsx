"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useRef } from "react";

export default function ComparisonSection() {
  const revealRef = useRef(null);

  const liteFeatures = [
    "Static Website",
    "Fast Delivery",
    "Minimal Animations",
    "Basic UI",
    "Streamlined Experience",
    "Simple Interactions",
    "Quick Deployment",
    "Clean Modern Design",
    "Best For Startups"
  ];

  const proFeatures = [
    "Dynamic Website",
    "Premium Development",
    "Advanced Animations",
    "Cinematic UI/UX",
    "Premium Experience",
    "Interactive Experiences",
    "Fully Custom Built",
    "Luxury High-End Design",
    "Best For Premium Brands"
  ];

  // SVG drawing animation variants
  const checkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", stiffness: 120, damping: 15, delay: i * 0.1 },
        opacity: { duration: 0.2, delay: i * 0.1 }
      }
    })
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.8 }
    }
  };

  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="comparison" className="py-40 md:py-48 px-6 bg-black relative overflow-hidden">
      {/* Background glowing elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <ScrollReveal ref={revealRef} direction="up">
          <div className="text-center mb-28">
            <span className="text-purple-500 text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-4 block animate-pulse">
              Choose Your Experience
            </span>
            <h2 className="text-4xl md:text-6xl font-black mt-2 tracking-tighter bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent mb-6">
              Select a Path
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base font-medium leading-relaxed">
              Built for different needs. Crafted with the same meticulous attention to detail.
            </p>
          </div>
        </ScrollReveal>

        {/* 2-Column Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 max-w-5xl mx-auto">
          
          {/* VOID LITE CARD */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ y: -8 }}
            className="group relative rounded-[2.5rem] p-10 md:p-12 border border-white/5 bg-zinc-950/20 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-red-500/30 hover:shadow-[0_0_50px_rgba(239,68,68,0.06)] transition-all duration-500 flex flex-col justify-between"
          >
            {/* Soft internal gradient background glow on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2.5rem] bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.08),transparent_60%)] pointer-events-none" />

            <div>
              {/* Header inside card */}
              <div className="flex justify-between items-start mb-10 pb-8 border-b border-white/5">
                <div>
                  <h3 className="text-3xl font-black tracking-tight text-white mb-2 group-hover:text-red-500 transition-colors duration-300">
                    VOID LITE
                  </h3>
                  <p className="text-zinc-500 text-xs font-bold tracking-wider uppercase">
                    Clean, swift & structured
                  </p>
                </div>
              </div>

              {/* Feature comparison rows */}
              <motion.ul 
                variants={listContainerVariants}
                className="space-y-5"
              >
                {liteFeatures.map((feature, idx) => (
                  <motion.li 
                    key={idx}
                    variants={listItemVariants}
                    className="flex items-center gap-4 text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300 font-medium text-sm md:text-base"
                  >
                    <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                      <motion.div
                        custom={idx}
                        variants={{
                          hidden: { scale: 0, opacity: 0 },
                          visible: (i: number) => ({
                            scale: 1,
                            opacity: 1,
                            transition: { type: "spring", stiffness: 150, damping: 12, delay: i * 0.08 }
                          })
                        }}
                        className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"
                      />
                    </div>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Accent Footer line inside card */}
            <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-center text-xs font-bold tracking-widest text-zinc-500 group-hover:text-red-500/80 transition-colors duration-300">
              <span>Essential Experience</span>
            </div>
          </motion.div>


          {/* VOID PRO CARD */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ y: -8 }}
            className="group relative rounded-[2.5rem] p-10 md:p-12 border border-white/5 bg-zinc-950/20 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-purple-500/30 hover:shadow-[0_0_50px_rgba(168,85,247,0.06)] transition-all duration-500 flex flex-col justify-between"
          >
            {/* Soft gold/purple internal gradient background glow on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2.5rem] bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.08),transparent_60%)] pointer-events-none" />

            <div>
              {/* Header inside card */}
              <div className="flex justify-between items-start mb-10 pb-8 border-b border-white/5">
                <div>
                  <h3 className="text-3xl font-black tracking-tight text-white mb-2 group-hover:text-purple-500 transition-colors duration-300">
                    VOID PRO
                  </h3>
                  <p className="text-zinc-500 text-xs font-bold tracking-wider uppercase">
                    Cinematic, bespoke & high-fidelity
                  </p>
                </div>
              </div>

              {/* Feature comparison rows */}
              <motion.ul 
                variants={listContainerVariants}
                className="space-y-5"
              >
                {proFeatures.map((feature, idx) => (
                  <motion.li 
                    key={idx}
                    variants={listItemVariants}
                    className="flex items-center gap-4 text-zinc-400 group-hover:text-zinc-200 transition-colors duration-300 font-medium text-sm md:text-base"
                  >
                    <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                      <motion.div
                        custom={idx}
                        variants={{
                          hidden: { scale: 0, opacity: 0 },
                          visible: (i: number) => ({
                            scale: 1,
                            opacity: 1,
                            transition: { type: "spring", stiffness: 150, damping: 12, delay: i * 0.08 }
                          })
                        }}
                        className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                      />
                    </div>
                    <span className="bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent group-hover:from-white group-hover:to-zinc-100 transition-all duration-300">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Accent Footer line inside card */}
            <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-center text-xs font-bold tracking-widest text-zinc-500 group-hover:text-purple-400/80 transition-colors duration-300">
              <span>Cinematic Experience</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
