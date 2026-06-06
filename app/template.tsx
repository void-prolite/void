"use client";

import { motion } from "framer-motion";
import useIsMobile from "../hooks/useIsMobile";

export default function Template({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  return (
    <motion.div
      initial={{ opacity: 0, filter: isMobile ? "none" : "blur(16px)", y: isMobile ? 0 : 15, scale: isMobile ? 1 : 0.99 }}
      animate={{ opacity: 1, filter: isMobile ? "none" : "blur(0px)", y: 0, scale: 1 }}
      transition={{
        ease: [0.16, 1, 0.3, 1],
        opacity: { delay: 0.1, duration: 0.55 },
        y: { delay: 0.1, duration: 0.55 },
        scale: { delay: 0.1, duration: 0.55 },
        filter: { delay: 0.2, duration: 0.6 }
      }}
    >
      {children}
    </motion.div>
  );
}
