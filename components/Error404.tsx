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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Dynamic Background Glows */}
      <motion.div 
        className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full blur-[120px] opacity-20 bg-purple-600 pointer-events-none"
        style={{ x: backgroundX, y: backgroundY }}
      />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/30 rounded-full blur-[100px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-900/20 rounded-full blur-[100px] animate-float pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
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
            <h1 className="text-[12rem] md:text-[20rem] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600 select-none">
              404
            </h1>
            <h1 className="absolute inset-0 text-[12rem] md:text-[20rem] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-purple-400 to-fuchsia-600 blur-[24px] opacity-40 select-none mix-blend-screen">
              404
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mt-[-2rem] md:mt-[-4rem]"
          >
            <h2 className="font-lora text-3xl md:text-5xl italic text-white font-light tracking-wide mb-6">
              Lost in the Void
            </h2>
            <p className="text-zinc-400 text-sm md:text-base font-medium tracking-[0.2em] uppercase max-w-md mx-auto mb-12">
              The signal you are looking for has been disconnected from the grid.
            </p>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#000000" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleHomeClick}
              className="group relative px-8 py-4 bg-transparent text-white font-semibold tracking-[0.15em] uppercase text-xs overflow-hidden border border-zinc-700 hover:border-white transition-colors duration-500 rounded-none"
            >
              <span className="relative z-10 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-purple-500 group-hover:bg-black transition-colors duration-300"></span>
                Return to Surface
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}