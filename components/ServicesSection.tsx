"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useRef } from "react";

interface Service {
  num: string;
  title: string;
  desc: string;
  capabilities?: string[];
}

interface ServicesSectionProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const revealRef = useRef(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const childVariants = {
    hidden: { y: 40, opacity: 0, filter: "blur(5px)", scale: 0.98 },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 16 }
    }
  };

  return (
    <section id="services" className="py-20 md:py-24 px-6 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal ref={revealRef} direction="up">
          <div className="text-center mb-12">
            <span className="text-zinc-500 text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-3 block">
              What We Do
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mt-2 tracking-[-0.02em] text-[#0f0c08] word-spacing-tight">
              Our Services
            </h2>
          </div>
        </ScrollReveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, i) => {
            const hoverColors = [
              { border: "hover:border-purple-300", shadow: "hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.12)]", text: "group-hover:text-purple-500" },
              { border: "hover:border-sky-300", shadow: "hover:shadow-[0_20px_40px_-15px_rgba(14,165,233,0.12)]", text: "group-hover:text-sky-500" },
              { border: "hover:border-rose-300", shadow: "hover:shadow-[0_20px_40px_-15px_rgba(244,63,94,0.12)]", text: "group-hover:text-rose-500" },
              { border: "hover:border-amber-300", shadow: "hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.12)]", text: "group-hover:text-amber-500" },
            ];
            const currentColors = hoverColors[i % hoverColors.length];

            return (
              <motion.div
                key={i}
                variants={childVariants}
                whileHover={{
                  y: -10,
                  backgroundColor: "#faf8f5"
                }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                className={`group p-10 border border-zinc-200 rounded-[2rem] bg-white transition-all duration-500 flex flex-col items-start cursor-pointer ${currentColors.border} ${currentColors.shadow}`}
              >
                <div className="flex justify-between items-center w-full mb-6">
                  <span className={`font-mono text-zinc-400 group-hover:text-[#8B6F47] text-4xl font-light transition-colors duration-300 block transform group-hover:scale-105 origin-left tracking-widest`}>
                    {service.num}
                  </span>
                  {/* Pivoting Arrow Icon */}
                  <svg
                    className="w-5 h-5 text-zinc-300 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" className="hidden" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-[#0f0c08] mb-4 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-zinc-650 text-sm leading-relaxed font-medium group-hover:text-zinc-800 transition-colors duration-300">
                  {service.desc}
                </p>

                {service.capabilities && (
                  <div className="mt-6 pt-6 border-t border-zinc-100 w-full flex flex-col gap-2">
                    {service.capabilities.map((cap) => (
                      <div key={cap} className="flex items-center gap-2 text-xs font-semibold text-zinc-500 group-hover:text-zinc-800 transition-colors duration-300">
                        <span className="w-1 h-1 rounded-full bg-[#8B6F47] opacity-60" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}