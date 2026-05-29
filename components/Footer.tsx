"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

interface FooterProps {}

export default function Footer({}: FooterProps) {
  const socialLinks = [
    { label: "Instagram", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "Dribbble", href: "#" },
    { label: "LinkedIn", href: "#" }
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookie-policy" }
  ];

  return (
    <footer className="py-12 px-6 md:px-12 border-t border-white/5 bg-zinc-950/20 backdrop-blur-md relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute bottom-0 right-10 w-60 h-60 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
        
        {/* Brand Details */}
        <div className="flex flex-col items-start gap-4 max-w-sm">
          <Link href="/" onClick={(e) => {
            if (typeof window !== "undefined" && window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="text-4xl font-bold tracking-normal cursor-pointer font-lora text-white hover:text-purple-400 transition-colors"
            >
              Void<span className="animate-dot-glow">.</span>
            </motion.div>
          </Link>
          <p className="text-zinc-400 text-sm font-medium leading-relaxed">
            Crafting bespoke digital experiences at the absolute intersection of design and technology.
          </p>
          <p className="text-zinc-600 text-xs font-bold tracking-wider mt-3">
            © 2026 Void Creative. All rights reserved.
          </p>
        </div>

        {/* Right-aligned Legal and Social Wrapper */}
        <div className="flex flex-col sm:flex-row gap-16 sm:gap-24 items-start w-full md:w-auto md:justify-end md:pr-16 lg:pr-28">
          
          {/* Legal Links Column */}
          <div className="flex flex-col items-start gap-6">
            <span className="text-purple-500 text-xs font-black tracking-[0.2em] uppercase">
              Legal
            </span>
            <div className="flex flex-col gap-3 text-sm font-semibold text-zinc-500">
              {legalLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.href}
                  className="hover:text-white transition-colors duration-300 relative group w-fit"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              ))}
            </div>
          </div>

          {/* Social Links Column */}
          <div className="flex flex-col items-start gap-6">
            <span className="text-purple-500 text-xs font-black tracking-[0.2em] uppercase">
              Social
            </span>
            <div className="flex flex-col gap-3 text-sm font-semibold text-zinc-500">
              {socialLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.href}
                  className="hover:text-white transition-colors duration-300 relative group w-fit"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              ))}
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}