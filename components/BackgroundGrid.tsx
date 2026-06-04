"use client";

import { useEffect, useState } from "react";

export default function BackgroundGrid() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isActive, setIsActive] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsActive(true);
    };

    const handleMouseLeave = () => {
      setIsActive(false);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        setIsActive(true);
      }
    };

    const handleTouchEnd = () => {
      setIsActive(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {/* Dynamic Cursor Spotlight Overlay (mix-blend-mode: soft-light for page illumination) */}
      <div
        className="fixed inset-0 pointer-events-none z-[50] transition-opacity duration-700 ease-out"
        style={{
          opacity: isActive ? 0.95 : 0,
          background: `radial-gradient(circle 300px at ${mousePos.x}px ${mousePos.y}px, rgba(245, 230, 195, 0.22) 0%, rgba(245, 230, 195, 0.08) 45%, transparent 100%)`,
          mixBlendMode: "soft-light"
        }}
      />

      {/* Dynamic Ambient Background Glows */}
      <div 
        className="fixed inset-0 pointer-events-none z-[-2] transition-opacity duration-[1200ms] ease-out"
        style={{
          opacity: isActive ? 0.35 : 0.15,
          background: `
            radial-gradient(circle 600px at calc(var(--mouse-x, -1000px) - 250px) calc(var(--mouse-y, -1000px) - 250px), rgba(168, 85, 247, 0.05), transparent 85%),
            radial-gradient(circle 600px at calc(var(--mouse-x, -1000px) + 250px) calc(var(--mouse-y, -1000px) + 250px), rgba(217, 119, 6, 0.06), transparent 85%)
          `,
          transform: "translate3d(0,0,0)",
          // @ts-ignore
          "--mouse-x": `${mousePos.x}px`,
          // @ts-ignore
          "--mouse-y": `${mousePos.y}px`,
        }}
      />

      {/* Spotlight-Masked Grid Background with base idle opacity */}
      <div
        className="fixed inset-0 pointer-events-none z-[-1] transition-opacity duration-700 ease-out"
        style={{
          opacity: isActive ? 1 : 0.18,
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(15, 12, 8, 0.08) 1.5px, transparent 1.5px),
            linear-gradient(to right, rgba(15, 12, 8, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 12, 8, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px, 50px 50px, 50px 50px",
          maskImage: isActive 
            ? `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, black 15%, rgba(0,0,0,0.3) 55%, transparent 100%)`
            : "none",
          WebkitMaskImage: isActive 
            ? `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, black 15%, rgba(0,0,0,0.3) 55%, transparent 100%)`
            : "none",
        }}
      />
    </>
  );
}
