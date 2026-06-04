"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Magnetic from "./Magnetic";

interface NavigationProps {
  transparent?: boolean;
}

export default function Navigation({ transparent = true }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const navItems = [
    { label: "OUR PROJECTS", href: "/#projects" },
    { label: "SERVICES", href: "/#services" },
    { label: "ABOUT", href: "/about" },
    { label: "CONTACT", href: "/contact" }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${isScrolled
            ? "py-4 bg-[#f5f2eb]/90 backdrop-blur-md border-b border-zinc-200"
            : "py-6 bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center w-full">
          <Link href="/" onClick={(e) => {
            if (typeof window !== "undefined" && window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}>
            <Magnetic>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="text-3xl font-semibold tracking-tight cursor-pointer text-ink font-serif"
              >
                Void<span className="text-[#8B6F47] animate-pulse">.</span>
              </motion.div>
            </Magnetic>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-2 text-xs font-bold tracking-widest">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative px-5 py-2.5 text-zinc-650 hover:text-black transition-colors duration-300 rounded-full"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {hoveredIndex === index && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 bg-black/5 rounded-full z-0 border border-black/5 shadow-[inset_0_1px_1px_rgba(0,0,0,0.02)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black hover:text-zinc-600 focus:outline-none transition-colors p-2 z-50 relative"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between items-end">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 8, width: "24px" } : { rotate: 0, y: 0, width: "24px" }}
                  transition={{ duration: 0.3 }}
                  className="h-[2px] bg-black rounded-full block"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1, width: "16px" }}
                  transition={{ duration: 0.2 }}
                  className="h-[2px] bg-black rounded-full block"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -10, width: "24px" } : { rotate: 0, y: 0, width: "20px" }}
                  transition={{ duration: 0.3 }}
                  className="h-[2px] bg-black rounded-full block"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Glassmorphic Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-white z-40 flex flex-col justify-center items-center px-8 md:hidden"
          >

            <div className="flex flex-col gap-8 text-center relative z-10 w-full max-w-sm">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-black tracking-widest text-zinc-600 hover:text-black block transition-all"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 pt-8 border-t border-zinc-200 flex justify-center gap-6 text-zinc-400 text-sm font-semibold tracking-wider"
              >
                <a href="https://www.instagram.com/void.prolite/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">INSTAGRAM</a>
                <span>•</span>
                <a href="#" className="hover:text-black transition-colors">TWITTER</a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}