"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useRef } from "react";
import useIsMobile from "../hooks/useIsMobile";

export default function ComparisonSection() {
  const revealRef = useRef(null);
  const isMobile = useIsMobile();

  const liteFeatures = [
    "Static Website",
    "Fast Delivery",
    "Standard Animations",
    "Basic UI",
    "Streamlined Experience",
    "Simple Interactions",
    "Quick Deployment",
    "Clean Modern Design",
    "Best For Small Teams"
  ];

  const proFeatures = [
    "Dynamic Website",
    "Custom Integration",
    "Advanced Animations",
    "Advanced UI/UX",
    "Full-featured Development",
    "Interactive Experiences",
    "Fully Custom Built",
    "Custom Design",
    "Best For Growing Businesses"
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
    hidden: { opacity: 0, y: isMobile ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: isMobile
        ? { duration: 0.4 }
        : { type: "spring", stiffness: 100, damping: 20, duration: 0.8 }
    }
  };

  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: isMobile ? 0.04 : 0.08 }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: isMobile ? 0 : -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: isMobile
        ? { duration: 0.3 }
        : { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="comparison" className="py-20 md:py-24 px-6 bg-transparent relative overflow-hidden">
      {/* Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-zinc-200" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <ScrollReveal ref={revealRef} direction="up">
          <div className="text-center mb-14">
            <span className="text-zinc-500 text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-4 block">
              Choose Your Experience
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mt-2 tracking-[-0.02em] text-black mb-6 word-spacing-tight">
              Select a Path
            </h2>
            <p className="text-zinc-600 max-w-xl mx-auto text-xs sm:text-sm font-medium leading-relaxed tracking-normal word-spacing-tight">
              Built for different needs. Crafted with the same meticulous attention to detail.
            </p>
          </div>
        </ScrollReveal>

        {/* 2-Column Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: isMobile ? "0px" : "-100px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 max-w-5xl mx-auto"
        >

          {/* VOID LITE CARD */}
          <motion.div
            variants={cardVariants}
            whileHover={isMobile ? {} : { y: -8 }}
            className="group relative rounded-[2.5rem] p-7 md:p-12 border border-zinc-200 bg-white transition-all duration-500 flex flex-col justify-between hover:bg-[#faf8f5] hover:border-zinc-400 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)]"
          >

            <div>
              {/* Header inside card */}
              <div className="flex justify-between items-start mb-10 pb-8 border-b border-zinc-200">
                <div>
                  <h3 className="text-3xl font-black tracking-tight text-black mb-2 transition-colors duration-300">
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
                    className="flex items-center gap-4 text-zinc-600 group-hover:text-zinc-900 transition-colors duration-300 font-medium text-sm md:text-base"
                  >
                    <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-800 transition-colors duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Accent Footer line inside card */}
            <div className="mt-12 pt-8 border-t border-zinc-200 flex items-center justify-center text-xs font-bold tracking-widest text-zinc-500 group-hover:text-black transition-colors duration-300">
              <span>Essential Experience</span>
            </div>
          </motion.div>


          <motion.div
            variants={cardVariants}
            whileHover={isMobile ? {} : { y: -8 }}
            className="group relative rounded-[2.5rem] p-7 md:p-12 border border-zinc-200 bg-white transition-all duration-500 flex flex-col justify-between hover:bg-[#faf8f5] hover:border-[#8B6F47]/50 hover:shadow-[0_20px_40px_-15px_rgba(139,111,71,0.12)]"
          >
            <div>
              {/* Header inside card */}
              <div className="flex justify-between items-start mb-10 pb-8 border-b border-zinc-200">
                <div>
                  <h3 className="text-3xl font-black tracking-tight text-black mb-2 transition-colors duration-300">
                    VOID PRO
                  </h3>
                  <p className="text-zinc-500 text-xs font-bold tracking-wider uppercase">
                    Custom, advanced & interactive
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
                    className="flex items-center gap-4 text-zinc-650 group-hover:text-zinc-900 transition-colors duration-300 font-medium text-sm md:text-base"
                  >
                    <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#8B6F47] transition-colors duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-zinc-600 group-hover:text-zinc-900 transition-all duration-300">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Accent Footer line inside card */}
            <div className="mt-12 pt-8 border-t border-zinc-200 flex items-center justify-center text-xs font-bold tracking-widest text-zinc-500 group-hover:text-black transition-colors duration-300">
              <span>Custom Experience</span>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
