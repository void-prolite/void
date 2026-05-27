"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useRef } from "react";

interface Service {
  num: string;
  title: string;
  desc: string;
}

interface ServicesSectionProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const revealRef = useRef(null);

  return (
    <section id="services" className="py-40 md:py-48 px-6 bg-gradient-to-b from-black via-zinc-950/60 to-black relative overflow-hidden">
      {/* Soft background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-950/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal ref={revealRef} direction="up">
          <div className="text-center mb-24">
            <span className="text-purple-500 text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-3 block">
              What We Do
            </span>
            <h2 className="text-4xl md:text-6xl font-black mt-2 tracking-tighter bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
              Our Services
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.12}>
              <motion.div
                whileHover={{ 
                  y: -10, 
                  borderColor: "rgba(168, 85, 247, 0.3)", 
                  backgroundColor: "rgba(20, 20, 25, 0.45)" 
                }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                className="group p-10 border border-white/5 rounded-[2rem] bg-zinc-950/20 backdrop-blur-md shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_40px_rgba(168,85,247,0.04)] transition-all duration-500 flex flex-col items-start cursor-pointer"
              >
                <span className="text-purple-500/70 group-hover:text-purple-400 text-5xl font-black transition-colors duration-300 block mb-6 transform group-hover:scale-105 origin-left">
                  {service.num}
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white mb-4 group-hover:text-purple-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-medium group-hover:text-zinc-300 transition-colors duration-300">
                  {service.desc}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}