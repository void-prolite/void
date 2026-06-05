"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(16px)", y: 15, scale: 0.99 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }}
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
