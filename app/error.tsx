"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-500, 500], [15, -15]);
  const rotateY = useTransform(smoothX, [-500, 500], [-15, 15]);

  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    console.error("Client Error Caught by Boundary:", error);
  }, [error]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX - innerWidth / 2);
      mouseY.set(e.clientY - innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white py-16">
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.05]" 
        style={{ 
          backgroundImage: 'linear-gradient(to right, #000000 1px, transparent 1px), linear-gradient(to bottom, #000000 1px, transparent 1px)',
          backgroundSize: '40px 40px' 
        }} 
      />

      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center justify-center perspective-[1000px]">
        <motion.div
          style={{ rotateX, rotateY }}
          className="flex flex-col items-center w-full max-w-2xl"
        >
          {/* Main Error Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <h1 className="text-[10rem] md:text-[16rem] font-bold leading-none tracking-tighter text-black select-none font-serif">
              500
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mt-[-1.5rem] md:mt-[-3rem] w-full"
          >
            <h2 className="text-3xl md:text-5xl text-black font-light tracking-wide mb-6 font-serif">
              There's a problem on our side
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm font-medium tracking-[0.1em] uppercase max-w-md mx-auto mb-10">
              We will get back to you soon. You can attempt to refresh the view in the meantime.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#000000", color: "#ffffff" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => reset()}
                className="group relative px-6 py-3.5 bg-transparent text-black font-bold tracking-[0.15em] uppercase text-[11px] border border-zinc-300 hover:border-black transition-colors duration-500 rounded-none cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-black group-hover:bg-white transition-colors duration-300"></span>
                  Try Again
                </span>
              </motion.button>

              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#f4f4f5" }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-6 py-3.5 bg-transparent text-zinc-500 hover:text-black font-bold tracking-[0.15em] uppercase text-[11px] border border-zinc-200 hover:border-black transition-colors duration-500 rounded-none cursor-pointer"
                >
                  <span className="relative z-10">
                    Return to Surface
                  </span>
                </motion.button>
              </Link>
            </div>

          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
