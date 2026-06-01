"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface HoverGifImageProps {
  staticImg: string;
  gifImg: string;
  alt: string;
  isHovered: boolean;
}

function HoverGifImage({ staticImg, gifImg, alt, isHovered }: HoverGifImageProps) {
  const [currentGifSrc, setCurrentGifSrc] = useState<string>("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHovered) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setCurrentGifSrc(gifImg);
    } else {
      // Keep the GIF src set during the 400ms CSS fade-out transition, then swap to placeholder to release CPU resources
      timeoutRef.current = setTimeout(() => {
        setCurrentGifSrc("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
      }, 400);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isHovered, gifImg]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Static Image */}
      <img
        src={staticImg}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: isHovered ? 0 : 1,
          transform: isHovered ? "scale(1.02)" : "scale(1)",
          transition: "opacity 0.4s ease-in-out, transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
      
      {/* GIF preview preloaded & absolutely positioned to crossfade instantly on hover */}
      <img
        src={currentGifSrc}
        alt={`${alt} scroll preview`}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? "scale(1.02)" : "scale(1)",
          transition: "opacity 0.4s ease-in-out, transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </div>
  );
}

export default function StartProjectPage() {
  const [hoveredCard, setHoveredCard] = useState<"lite" | "pro" | null>(null);

  useEffect(() => {
    // Preload heavy scroll GIFs on mount to ensure smooth, instant playback without layout flickering
    const gifs = ["/images/void-lite.gif", "/images/void-pro.gif"];
    gifs.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const tiers = [
    {
      id: "lite" as const,
      title: "Void.Lite",
      tagline: "Clean Static Showcase",
      desc: "A robust, clean, and highly functional static visual storefront. Designed for creative portfolios, clean landing pages, and business showcases that need reliable performance, sleek default typography, and essential responsive structures.",
      accent: "#ff4b3e",
      glowColor: "rgba(255, 75, 62, 0.2)",
      staticImg: "/images/void-lite.png",
      gifImg: "/images/void-lite.gif",
      url: "https://void-lite.vercel.app/",
      ctaText: "Establish Lite Platform",
      features: [
        "Lightweight Static Architecture",
        "Clean Grid Layouts",
        "Standard Responsive Adaptations",
        "Fast Loading Speed Optimization"
      ]
    },
    {
      id: "pro" as const,
      title: "Void.Pro",
      tagline: "Premium Animated Ecosystem",
      desc: "The pinnacle of digital craftsmanship. A premium, high-performance ecosystem equipped with breathtaking CSS shaders, fluid micro-interactions, advanced custom animations, complex state management, and immersive neon user interfaces.",
      accent: "#a855f7",
      glowColor: "rgba(168, 85, 247, 0.2)",
      staticImg: "/images/void-pro.png",
      gifImg: "/images/void-pro.gif",
      url: "#",
      ctaText: "Establish Pro Platform",
      features: [
        "Advanced Custom Animations",
        "Fluid Micro-Interactions",
        "Sleek Dynamic Dashboard UI",
        "Integrated Metric Charts"
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-[#fafafa] relative overflow-hidden py-24 px-6">
      {/* Background ambient flows */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          background: hoveredCard === "lite"
            ? "rgba(255, 75, 62, 0.05)"
            : hoveredCard === "pro"
              ? "rgba(168, 85, 247, 0.05)"
              : "rgba(168, 85, 247, 0.02)"
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          background: hoveredCard === "lite"
            ? "rgba(255, 75, 62, 0.03)"
            : hoveredCard === "pro"
              ? "rgba(168, 85, 247, 0.03)"
              : "rgba(255, 255, 255, 0.01)"
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Navigation / Back element */}
        <div className="mb-16">
          <Link href="/">
            <motion.div
              whileHover={{ x: -4 }}
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-semibold tracking-wider cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              BACK TO STUDIO
            </motion.div>
          </Link>
        </div>

        {/* Header Block */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-[0.3em] text-purple-500 uppercase block mb-4">
            Project Initiation
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent mb-6">
            Choose Your Platform
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed">
            Select the digital architectural foundation for your product. Hover over each card to preview the system in action.
          </p>
        </div>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {tiers.map((tier) => {
            const isHovered = hoveredCard === tier.id;

            return (
              <motion.div
                key={tier.id}
                onMouseEnter={() => setHoveredCard(tier.id)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                className="relative flex flex-col h-full rounded-3xl border bg-zinc-950/20 shadow-[0_30px_70px_rgba(0,0,0,0.8)] overflow-hidden group transition-all duration-300"
                style={{
                  borderColor: isHovered ? `${tier.accent}40` : "rgba(255,255,255,0.05)"
                }}
              >
                {/* Custom glowing background behind active card */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at bottom left, ${tier.glowColor}, transparent 60%)`
                  }}
                />


                {/* Media Showcase Block */}
                <div className="relative w-full aspect-[16/10] bg-zinc-900 overflow-hidden border-b border-white/5">
                  <HoverGifImage
                    staticImg={tier.staticImg}
                    gifImg={tier.gifImg}
                    alt={tier.title}
                    isHovered={isHovered}
                  />
                </div>

                {/* Card Content Details */}
                <div className="p-8 flex flex-col flex-grow relative z-10">
                  <div className="mb-6">
                    <span
                      className="text-xs font-bold tracking-[0.2em] uppercase mb-2 block"
                      style={{ color: tier.accent }}
                    >
                      {tier.tagline}
                    </span>
                    <h2 className="text-3xl font-black text-white transition-all duration-300 relative w-fit pb-1">
                      <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all duration-300">
                        {tier.title}
                      </span>
                      {(tier.title === "Void.Lite" || tier.title === "Void.Pro") && (
                        <svg
                          className={`absolute left-0 bottom-[-4px] w-full h-[7px] ${tier.title === "Void.Lite" ? "text-[#ff4b3e]" : "text-[#a855f7]"} opacity-90`}
                          viewBox="0 0 100 10"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M 3,8 C 15,3 45,1 97,7 C 65,4 25,5 3,8 Z"
                            fill="currentColor"
                          />
                        </svg>
                      )}
                    </h2>
                  </div>

                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8">
                    {tier.desc}
                  </p>

                  {/* Highlights Bullet Grid */}
                  <div className="mt-auto mb-8 border-t border-white/5 pt-6">
                    <h3 className="text-xs font-bold tracking-wider text-zinc-300 uppercase mb-4">
                      Core Features Include
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: tier.accent }}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dynamic CTA Button */}
                  <motion.a
                    href={tier.url === "#" ? undefined : tier.url}
                    target={tier.url !== "#" ? "_blank" : undefined}
                    rel={tier.url !== "#" ? "noopener noreferrer" : undefined}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-center py-4 rounded-xl text-black font-extrabold text-sm tracking-wider uppercase cursor-pointer transition-shadow duration-300 block"
                    style={{
                      backgroundColor: isHovered ? tier.accent : "#fafafa",
                      color: isHovered ? "#ffffff" : "#000000",
                      boxShadow: isHovered ? `0 10px 30px ${tier.glowColor}` : "none"
                    }}
                  >
                    {tier.ctaText}
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
