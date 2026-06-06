"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import useIsMobile from "../../hooks/useIsMobile";

interface HoverGifImageProps {
  staticImg: string;
  gifImg: string;
  alt: string;
  isHovered: boolean;
}

function HoverGifImage({ staticImg, gifImg, alt, isHovered }: HoverGifImageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch((err) => console.log("Video play failed:", err));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isHovered]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Static Image */}
      <img
        src={staticImg}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover z-10 pointer-events-none ${alt === "Void.Pro" ? "object-left" : ""
          }`}
        style={{
          opacity: isHovered ? 0 : 1,
          transform: isHovered ? "scale(1.02)" : "scale(1)",
          transition: "opacity 0.4s ease-in-out, transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* WebM Video loop preview preloaded & absolutely positioned to crossfade instantly on hover */}
      <video
        ref={videoRef}
        src={gifImg}
        preload="auto"
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover ${alt === "Void.Pro" ? "object-left" : ""
          }`}
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
  const isMobile = useIsMobile();

  const tiers = [
    {
      id: "lite" as const,
      title: "Void.Lite",
      tagline: "Static Showcase Website",
      desc: "A clean, static website. Designed for portfolios, landing pages, and marketing sites that need fast performance, structured grids, and clean responsive layouts.",
      accent: "#ffffff",
      glowColor: "rgba(255, 255, 255, 0.1)",
      staticImg: "/images/void-lite.webp",
      gifImg: "/images/void-lite.webm",
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
      tagline: "Custom Web Application",
      desc: "A custom web application with interactive interfaces. Designed for businesses requiring advanced state management, interactive user experiences, dynamic data integrations, and functional dashboards.",
      accent: "#ffffff",
      glowColor: "rgba(255, 255, 255, 0.1)",
      staticImg: "/images/void-pro.webp",
      gifImg: "/images/void-pro.webm",
      url: "https://void-pro-portfolio.vercel.app/",
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
    <main className="min-h-screen bg-transparent text-zinc-800 relative overflow-hidden py-24 px-6">
      {/* Background ambient flows */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] hidden md:block"
        style={{
          background: "rgba(0, 0, 0, 0.01)"
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Navigation / Back element */}
        <div className="mb-16">
          <Link href="/">
            <motion.div
              whileHover={{ x: -4 }}
              className="inline-flex items-center gap-2 text-zinc-500 hover:text-black text-sm font-semibold tracking-wider cursor-pointer"
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
          <span className="text-xs font-bold tracking-[0.3em] text-zinc-500 uppercase block mb-4">
            Project Initiation
          </span>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] text-ink mb-6">
            Choose your <span className="font-serif italic font-light text-[#8B6F47]">platform</span>
          </h1>
          <p className="text-zinc-600 text-lg md:text-xl font-medium leading-relaxed">
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
                whileHover={isMobile ? {} : { y: -8 }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                className="relative flex flex-col h-full rounded-3xl border bg-white overflow-hidden group transition-all duration-500 hover:bg-[#faf8f5]"
                style={{
                  borderColor: isHovered
                    ? (tier.id === "pro" ? "#c084fc" : "#71717a")
                    : "rgba(0,0,0,0.08)",
                  boxShadow: isHovered
                    ? (tier.id === "pro" ? "0 20px 40px -15px rgba(168,85,247,0.12)" : "0 20px 40px -15px rgba(0,0,0,0.06)")
                    : "none"
                }}
              >


                {/* Media Showcase Block */}
                <div className="relative w-full aspect-[16/10] bg-zinc-100 overflow-hidden border-b border-zinc-200">
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
                      className="text-xs font-bold tracking-[0.2em] uppercase mb-2 block text-zinc-500"
                    >
                      {tier.tagline}
                    </span>
                    <h2 className="text-3xl font-black text-black transition-all duration-300 relative w-fit pb-1">
                      <span>
                        {tier.title}
                      </span>
                      {(tier.title === "Void.Lite" || tier.title === "Void.Pro") && (
                        <svg
                          className="absolute left-0 bottom-[-4px] w-full h-[7px] text-black opacity-90"
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

                  <p className="text-zinc-600 text-sm md:text-base leading-relaxed mb-8">
                    {tier.desc}
                  </p>

                  {/* Highlights Bullet Grid */}
                  <div className="mt-auto mb-8 border-t border-zinc-200 pt-6">
                    <h3 className="text-xs font-bold tracking-wider text-zinc-550 uppercase mb-4">
                      Core Features Include
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-xs text-zinc-600 font-medium">
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-black"
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
                    whileHover={isMobile ? {} : { scale: 1.02 }}
                    whileTap={isMobile ? {} : { scale: 0.98 }}
                    className="w-full text-center py-4 rounded-xl text-white font-extrabold text-sm tracking-wider uppercase cursor-pointer transition-colors duration-300 block bg-black hover:bg-zinc-800 text-white"
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
