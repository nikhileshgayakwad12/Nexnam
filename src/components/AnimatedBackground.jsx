import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if device supports fine hover events (desktop)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsMobile(!mediaQuery.matches);

    const handleMediaQueryChange = (e) => {
      setIsMobile(!e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (mediaQuery.matches) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Set up 15 random particles that float slowly in the background
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 20,
    delay: Math.random() * -20,
  }));

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-brand-black pointer-events-none">
      {/* Deep space ambient indigo blob */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(7,7,21,0.8)_0%,rgba(3,3,3,1)_100%)]" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />

      {/* Mouse hover glow (Only on desktop) */}
      {!isMobile && (
        <div
          className="absolute inset-0 transition-opacity duration-1000 opacity-25 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 245, 255, 0.15) 0%, rgba(184, 0, 255, 0.08) 50%, transparent 100%)`,
          }}
        />
      )}

      {/* Static ambient glowing orbs */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-blue/10 blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-purple/10 blur-[150px] animate-pulse-slow" style={{ animationDelay: "4s" }} />

      {/* Floating particles using simple Framer Motion configurations */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-brand-cyan/20 blur-[1px]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: ["0vh", "-100vh"],
            x: ["0vw", Math.random() > 0.5 ? "5vw" : "-5vw"],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
