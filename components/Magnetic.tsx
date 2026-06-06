"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import useIsMobile from "../hooks/useIsMobile";

export default function Magnetic({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Max displacement of 12px for a subtle, high-end feel
    const maxMovement = 12;
    const moveX = (distanceX / (width / 2)) * maxMovement;
    const moveY = (distanceY / (height / 2)) * maxMovement;
    setPosition({ x: moveX, y: moveY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={isMobile ? { x: 0, y: 0 } : { x: position.x, y: position.y }}
      transition={isMobile ? { duration: 0.1 } : { type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
