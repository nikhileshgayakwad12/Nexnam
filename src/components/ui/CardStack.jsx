import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Layers, Globe } from "lucide-react";
import { playClick, playHover } from "../../utils/soundManager";

// Helper to calculate signed offset in a cyclic list
const getSignedOffset = (index, activeIndex, length) => {
  if (length <= 1) return 0;
  let diff = (index - activeIndex) % length;
  if (diff > length / 2) diff -= length;
  if (diff < -length / 2) diff += length;
  return diff;
};

export default function CardStack({
  items = [],
  autoAdvance = true,
  interval = 4200,
  onOpenCaseStudy
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  
  const interactionTimerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Track window resize for mobile responsive adjustments
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1280;

  // Handle user interaction timeout to briefly pause auto advance
  const handleUserAction = useCallback(() => {
    setUserInteracted(true);
    if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
    interactionTimerRef.current = setTimeout(() => {
      setUserInteracted(false);
    }, 8000);
  }, []);

  const handleNext = useCallback(() => {
    if (items.length === 0) return;
    playClick();
    handleUserAction();
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length, handleUserAction]);

  const handlePrev = useCallback(() => {
    if (items.length === 0) return;
    playClick();
    handleUserAction();
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length, handleUserAction]);

  const handleCardClick = (index, offset) => {
    if (offset !== 0) {
      playClick();
      handleUserAction();
      setActiveIndex(index);
    }
  };

  // Keyboard navigation listener
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      handleNext();
    } else if (e.key === "ArrowLeft") {
      handlePrev();
    }
  };

  // Autoplay loop
  useEffect(() => {
    if (!autoAdvance || isHovered || userInteracted || items.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoAdvance, isHovered, userInteracted, items.length, interval]);

  if (!items || items.length === 0) return null;

  const activeItem = items[activeIndex] || items[0];

  return (
    <div
      className="w-full flex flex-col items-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Featured Projects Card Showcase"
    >
      {/* FAN STACK CONTAINER */}
      <div className="relative w-full max-w-5xl h-[280px] sm:h-[360px] md:h-[440px] flex items-center justify-center overflow-visible">
        {items.map((item, index) => {
          const offset = getSignedOffset(index, activeIndex, items.length);
          const absOffset = Math.abs(offset);
          const isActive = offset === 0;

          // Limit visible cards to 5 on desktop/tablet, 3 on mobile
          const maxVisible = isMobile ? 3 : 5;
          if (absOffset > Math.floor(maxVisible / 2)) {
            return null;
          }

          // Card Fan Geometry calculations
          const xOffset = offset * (isMobile ? 26 : isTablet ? 75 : 110);
          const yOffset = absOffset * (isMobile ? 6 : 14) + (isActive ? -12 : 0);
          const rotation = shouldReduceMotion
            ? 0
            : offset * (isMobile ? 3 : isTablet ? 6 : 7);
          const scale = isActive
            ? 1.02
            : Math.max(0.85, 1 - absOffset * 0.06);
          const zIndex = 50 - absOffset * 10;
          const opacity = absOffset > 2 ? 0 : 1 - absOffset * 0.18;

          const displayUrl = item.demoUrl
            ? item.demoUrl
                .replace("https://", "")
                .replace("http://", "")
                .replace("/#/", "/")
                .split("/")[0]
            : `${item.id || "project"}.nexnam.app`;

          return (
            <motion.div
              key={item.id || index}
              className={`absolute rounded-2xl border transition-shadow duration-300 overflow-hidden cursor-pointer ${
                isActive
                  ? "border-[#5B5CF6]/50 shadow-[0_30px_70px_rgba(0,0,0,0.5)] ring-1 ring-[#5B5CF6]/30"
                  : "border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:border-white/20"
              }`}
              style={{
                width: isMobile
                  ? "calc(100vw - 32px)"
                  : isTablet
                  ? "480px"
                  : "560px",
                height: isMobile ? "235px" : "340px",
                maxWidth: "560px",
                zIndex
              }}
              animate={{
                x: xOffset,
                y: yOffset,
                rotateZ: rotation,
                scale,
                opacity
              }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 28,
                mass: 0.8
              }}
              drag={isActive ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.x < -60 || info.velocity.x < -300) {
                  handleNext();
                } else if (info.offset.x > 60 || info.velocity.x > 300) {
                  handlePrev();
                }
              }}
              onClick={() => handleCardClick(index, offset)}
            >
              {/* Card Browser Top Header Bar */}
              <div className="h-8 w-full bg-[#111318] border-b border-white/10 px-3.5 flex items-center justify-between shrink-0 select-none">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="bg-slate-900/90 border border-white/10 text-slate-300 rounded px-2.5 py-0.5 text-[10px] font-mono w-44 text-center truncate flex items-center justify-center gap-1">
                  <Globe className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                  <span className="truncate">{displayUrl}</span>
                </div>
                <div className="w-4" />
              </div>

              {/* Card Surface Body */}
              <div className="relative w-full h-[calc(100%-32px)] bg-slate-950 overflow-hidden flex flex-col">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className={`w-full h-full p-6 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br ${
                      item.gradientClass ||
                      "from-slate-950 via-indigo-950 to-slate-900"
                    }`}
                  >
                    <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

                    {/* Top Tag & Live Indicator */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-white/90 px-2.5 py-1 rounded bg-white/10 backdrop-blur-md border border-white/10">
                        {item.category}
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        LIVE
                      </span>
                    </div>

                    {/* Center Title & Short Desc */}
                    <div className="relative z-10 my-auto text-left">
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2 drop-shadow-sm">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 max-w-md leading-relaxed">
                        {item.shortDesc}
                      </p>
                    </div>

                    {/* Bottom Tech Pills */}
                    <div className="relative z-10 flex items-center justify-between border-t border-white/15 pt-3">
                      <div className="flex flex-wrap gap-1.5">
                        {item.technologies &&
                          item.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-900/80 border border-white/10 text-slate-300"
                            >
                              {tech}
                            </span>
                          ))}
                      </div>
                      <span className="text-[10px] font-mono text-white/60 hidden sm:inline">
                        Nexnam Studio
                      </span>
                    </div>
                  </div>
                )}

                {/* Subtle Gradient Overlay at bottom of card */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CONTROLS & NAV DOTS */}
      <div className="flex items-center justify-center gap-4 mt-6 z-20">
        <button
          onClick={handlePrev}
          onMouseEnter={playHover}
          aria-label="Previous project"
          className="p-2 rounded-full bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white hover:border-white/30 transition-all cursor-pointer shadow-xs"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                playClick();
                handleUserAction();
                setActiveIndex(idx);
              }}
              aria-label={`Go to project ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === activeIndex
                  ? "w-7 h-2 bg-[#5B5CF6]"
                  : "w-2 h-2 bg-slate-700 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          onMouseEnter={playHover}
          aria-label="Next project"
          className="p-2 rounded-full bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white hover:border-white/30 transition-all cursor-pointer shadow-xs"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* DYNAMIC ACTIVE PROJECT INFO DETAILS */}
      <div className="mt-8 w-full max-w-xl text-center px-4 min-h-[110px] z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id || activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#5B5CF6]" />
              <span className="text-xs font-mono font-semibold text-[#5B5CF6] uppercase tracking-wider">
                {activeItem.category}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {activeItem.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4 max-w-lg">
              {activeItem.shortDesc}
            </p>

            <div className="flex items-center gap-3">
              {activeItem.demoUrl && (
                <a
                  href={activeItem.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#5B5CF6] hover:bg-[#4F50E2] text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
                >
                  Live Demo <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {onOpenCaseStudy && (
                <button
                  onClick={() => {
                    playClick();
                    onOpenCaseStudy(activeItem);
                  }}
                  onMouseEnter={playHover}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
                >
                  Case Study <Layers className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
