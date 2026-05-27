"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useRef } from "react";
import Link from "next/link";

interface Project {
  title: string;
  client: string;
  size: "large" | "normal";
  href?: string;
  image?: string;
  accentColor?: string;
  hoverBorderColor?: string;
}

interface WorkSectionProps {
  projects: Project[];
}

export default function WorkSection({ projects }: WorkSectionProps) {
  const revealRef = useRef(null);

  return (
    <section id="projects" className="py-40 md:py-48 px-6 bg-black relative">
      {/* Background visual element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <ScrollReveal ref={revealRef} direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-6">
            <div>
              <span className="text-purple-500 text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-3 block">
                Selected Work
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mt-2 tracking-tighter bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
                Our Projects
              </h2>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, i) => {
            const hasLink = !!project.href;
            const isExternal = project.href?.startsWith("http");
            const isVoidLite = project.title === "Void.Lite";
            
            const accentTextClass = isVoidLite ? "text-[#ff4b3e]" : "text-purple-400";
            const hoverBorderClass = isVoidLite ? "hover:border-[#ff4b3e]/30" : "hover:border-purple-500/30";
            
            const cardContent = (
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                className={`relative group overflow-hidden rounded-3xl border border-white/5 bg-zinc-950/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] aspect-[16/11] cursor-pointer transition-colors duration-300 ${hoverBorderClass}`}
              >
                {/* Image scaling with slight fade on hover */}
                <img
                  src={project.image || `https://picsum.photos/1200/800?random=${i + 22}`}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105 group-hover:opacity-90"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
                
                {/* Soft custom shadow corner glow on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
                  style={{
                    background: `radial-gradient(circle at bottom left, ${isVoidLite ? 'rgba(255,75,62,0.18)' : 'rgba(168,85,247,0.15)'}, transparent 60%)`
                  }}
                />

                {/* Content details */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-10 flex flex-col justify-end translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <p className={`${accentTextClass} text-xs font-bold tracking-[0.2em] uppercase mb-2`}>
                    {project.client}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-black text-white transition-all duration-300 relative w-fit pb-1">
                    <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all duration-300">
                      {project.title}
                    </span>
                    {(project.title === "Void.Lite" || project.title === "Void.Pro") && (
                      <svg 
                        className={`absolute left-0 bottom-[-4px] w-full h-[7px] ${project.title === "Void.Lite" ? "text-[#ff4b3e]" : "text-[#a855f7]"} opacity-90`} 
                        viewBox="0 0 100 10" 
                        preserveAspectRatio="none"
                      >
                        <path 
                          d="M 3,8 C 15,3 45,1 97,7 C 65,4 25,5 3,8 Z" 
                          fill="currentColor"
                        />
                      </svg>
                    )}
                  </h3>
                  
                  {/* Subtle reveal explore link */}
                  <div className={`mt-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 ${accentTextClass} text-xs font-bold tracking-widest transition-all duration-500 transform translate-y-2 group-hover:translate-y-0`}>
                    EXPLORE PROJECT
                    <svg 
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            );

            return (
              <ScrollReveal key={i} direction="up" delay={i * 0.15}>
                {hasLink ? (
                  isExternal ? (
                    <a href={project.href} target="_blank" rel="noopener noreferrer" className="block">
                      {cardContent}
                    </a>
                  ) : (
                    <Link href={project.href!} className="block">
                      {cardContent}
                    </Link>
                  )
                ) : (
                  cardContent
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}