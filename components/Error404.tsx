"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error404() {
  const router = useRouter();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-500, 500], [15, -15]);
  const rotateY = useTransform(smoothX, [-500, 500], [-15, 15]);
  const backgroundX = useTransform(smoothX, [-500, 500], [-20, 20]);
  const backgroundY = useTransform(smoothY, [-500, 500], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX - innerWidth / 2);
      mouseY.set(e.clientY - innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  function handleHomeClick() {
    router.push("/");
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Monochromatic background */}

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
          className="flex flex-col items-center"
        >
          {/* Main 404 Text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <h1 className="text-[12rem] md:text-[20rem] font-bold leading-none tracking-tighter text-black select-none">
              404
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mt-[-2rem] md:mt-[-4rem]"
          >
            <h2 className="text-3xl md:text-5xl text-black font-light tracking-wide mb-6">
              Page Not Found
            </h2>
            <p className="text-zinc-500 text-sm md:text-base font-medium tracking-[0.1em] uppercase max-w-md mx-auto mb-12">
              The page you are looking for does not exist or has been moved.
            </p>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#000000", color: "#ffffff" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleHomeClick}
              className="group relative px-8 py-4 bg-transparent text-black font-semibold tracking-[0.15em] uppercase text-xs overflow-hidden border border-zinc-300 hover:border-black transition-colors duration-500 rounded-none"
            >
              <span className="relative z-10 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-black group-hover:bg-white transition-colors duration-300"></span>
                Return to Surface
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}