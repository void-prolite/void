"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useRef, useState } from "react";
import Link from "next/link";
import useIsMobile from "../hooks/useIsMobile";

interface Project {
  title: string;
  client: string;
  size: "large" | "normal";
  href?: string;
  image?: string;
  accentColor?: string;
  hoverBorderColor?: string;
  tags?: string[];
}

interface WorkSectionProps {
  projects: Project[];
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  const hasLink = !!project.href;
  const isExternal = project.href?.startsWith("http");

  const accentColor = project.accentColor || "#18181b";
  const hoverBorderColor = project.hoverBorderColor || "rgba(24, 24, 27, 0.1)";

  const childVariants = {
    hidden: { y: isMobile ? 0 : 50, opacity: 0, filter: isMobile ? "none" : "blur(6px)", scale: isMobile ? 1 : 0.98 },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      transition: isMobile 
        ? { duration: 0.4 } 
        : { type: "spring", stiffness: 90, damping: 15 }
    }
  };

  const cardContent = (
    <motion.div
      variants={childVariants}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      whileHover={isMobile ? {} : { y: -8 }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      className="relative group overflow-hidden rounded-3xl border aspect-[16/11] cursor-pointer transition-all duration-500 bg-white"
      style={{
        borderColor: isHovered ? accentColor : "#e4e4e7",
        boxShadow: isHovered ? `0 20px 40px -15px ${hoverBorderColor}` : "none",
      }}
    >
      {/* Project tags at top left */}
      {project.tags && (
        <div className="absolute top-6 left-6 z-20 flex flex-wrap gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-[9px] font-extrabold tracking-wider uppercase text-white bg-black/30 backdrop-blur-md border border-white/10 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Image scaling with slight fade on hover */}
      <img
        src={project.image || `https://picsum.photos/1200/800?random=${index + 22}`}
        alt={project.title}
        className={`w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105 group-hover:opacity-90 ${project.title === "Void.Pro" ? "object-left" : ""
          }`}
      />

      {/* Monochromatic overlay gradient for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c08] via-[#0f0c08]/30 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-500" />

      {/* Content details */}
      <div className={`absolute bottom-0 left-0 right-0 p-8 z-10 flex flex-col justify-end transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isMobile ? "translate-y-0" : "translate-y-3 group-hover:translate-y-0"
      }`}>
        <p className="text-zinc-350 group-hover:text-zinc-150 text-xs font-bold tracking-[0.25em] uppercase mb-2 transition-colors duration-300">
          {project.client}
        </p>
        <h3 className="text-2xl md:text-3xl font-black text-white transition-all duration-300 relative w-fit pb-1">
          <span className="transition-colors duration-300" style={{ color: isHovered ? accentColor : "#ffffff" }}>
            {project.title}
          </span>
          {(project.title === "Void.Lite" || project.title === "Void.Pro") && (
            <svg
              className="absolute left-0 bottom-[-4px] w-full h-[7px] opacity-90 transition-colors duration-300"
              style={{ color: isHovered ? accentColor : "#ffffff" }}
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
        <div
          className={`mt-4 flex items-center gap-1.5 text-xs font-bold tracking-widest transition-all duration-500 transform ${
            isMobile ? "opacity-100 translate-y-0" : "opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
          }`}
          style={{ color: accentColor }}
        >
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

  return hasLink ? (
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
  );
}

export default function WorkSection({ projects }: WorkSectionProps) {
  const revealRef = useRef(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.22
      }
    }
  };

  return (
    <section id="projects" className="py-20 md:py-24 px-6 bg-transparent relative">
      {/* Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-zinc-200" />

      <div className="max-w-7xl mx-auto">
        <ScrollReveal ref={revealRef} direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-zinc-500 text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-3 block">
                Selected Work
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mt-2 tracking-[-0.02em] text-[#0f0c08] word-spacing-tight">
                Our Projects
              </h2>
            </div>
          </div>
        </ScrollReveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}