"use client";

import { motion } from "framer-motion";
import { ReactNode, forwardRef } from "react";
import useIsMobile from "../hooks/useIsMobile";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  blur?: boolean;
  scale?: boolean;
  duration?: number;
}

const ScrollReveal = forwardRef<HTMLDivElement, ScrollRevealProps>(
  ({ children, direction = "up", delay = 0, blur = true, scale = true, duration = 0.95 }, ref) => {
    const isMobile = useIsMobile();
    
    const directionOffset = {
      up: { y: isMobile ? 0 : 40, x: 0 },
      down: { y: isMobile ? 0 : -40, x: 0 },
      left: { x: isMobile ? 0 : 40, y: 0 },
      right: { x: isMobile ? 0 : -40, y: 0 },
      none: { x: 0, y: 0 }
    };

    return (
      <motion.div
        ref={ref}
        initial={{ 
          opacity: 0, 
          ...directionOffset[direction],
          ...(blur && !isMobile ? { filter: "blur(4px)" } : {}),
          scale: scale && !isMobile ? 0.98 : 1
        }}
        whileInView={{ 
          opacity: 1, 
          x: 0, 
          y: 0,
          ...(blur && !isMobile ? { filter: "blur(0px)" } : {}),
          scale: 1
        }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: isMobile ? 0.4 : 0.7, delay: isMobile ? delay * 0.5 : delay, ease: [0.25, 0.1, 0.25, 1] }}
        onAnimationComplete={() => {
          if (blur && !isMobile && ref && typeof ref !== 'function' && ref.current) {
            ref.current.style.filter = '';
          }
        }}
      >
        {children}
      </motion.div>
    );
  }
);

ScrollReveal.displayName = "ScrollReveal";

export default ScrollReveal;
