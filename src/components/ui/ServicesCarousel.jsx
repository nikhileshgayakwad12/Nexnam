import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronRight, ChevronLeft, ArrowRight, Check } from "lucide-react";
import * as Icons from "lucide-react";
import { playClick, playHover } from "../../utils/soundManager";

// Card background tint variants (controlled studio palette)
const CARD_VARIANTS = [
  "bg-gradient-to-br from-[#EEF2FF] via-[#F5F4FF] to-[#FFFFFF] border-[#E0E7FF]",
  "bg-gradient-to-br from-[#F5F3FF] via-[#FAF5FF] to-[#FFFFFF] border-[#EDE9FE]",
  "bg-gradient-to-br from-[#F0F7FF] via-[#F8FAFC] to-[#FFFFFF] border-[#E2E8F0]",
  "bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#FFFFFF] border-[#E2E8F0]"
];

export default function ServicesCarousel({ services = [] }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const userTimerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false
  });

  // Pause hover-autoplay briefly if user manually drags or clicks controls
  const handleUserInteraction = useCallback(() => {
    setUserInteracted(true);
    if (userTimerRef.current) clearTimeout(userTimerRef.current);
    userTimerRef.current = setTimeout(() => {
      setUserInteracted(false);
    }, 4000);
  }, []);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    playClick();
    handleUserInteraction();
    emblaApi.scrollNext();
  }, [emblaApi, handleUserInteraction]);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    playClick();
    handleUserInteraction();
    emblaApi.scrollPrev();
  }, [emblaApi, handleUserInteraction]);

  // Hover-to-auto-slide mechanism
  useEffect(() => {
    if (!emblaApi || !isHovered || userInteracted || shouldReduceMotion) return;

    // Detect if device supports hover interactions (don't autoplay on touch mobile)
    const supportsHover = window.matchMedia("(hover: hover)").matches;
    if (!supportsHover) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 2200);

    return () => clearInterval(interval);
  }, [emblaApi, isHovered, userInteracted, shouldReduceMotion]);

  const handleServiceSelect = (serviceTitle) => {
    playClick();
    navigate("/contact", { state: { selectedService: serviceTitle } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!services || services.length === 0) return null;

  return (
    <div
      className="w-full relative select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-roledescription="carousel"
      aria-label="Digital Services Carousel"
    >
      {/* Navigation Controls Bar */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#5B5CF6]" />
          <span className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider">
            Hover to explore services ({services.length})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={scrollPrev}
            onMouseEnter={playHover}
            aria-label="Previous service"
            className="w-10 h-10 rounded-full bg-white border border-slate-900/[0.1] shadow-2xs hover:border-[#0B0D12] hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-center text-[#0B0D12]"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={scrollNext}
            onMouseEnter={playHover}
            aria-label="Next service"
            className="w-10 h-10 rounded-full bg-white border border-slate-900/[0.1] shadow-2xs hover:border-[#0B0D12] hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-center text-[#0B0D12]"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Embla Viewport Container */}
      <div className="overflow-hidden py-2" ref={emblaRef}>
        <div className="flex -ml-5">
          {services.map((service, index) => {
            const IconComponent = Icons[service.iconName] || Icons.Globe;
            const stepNumber = String(index + 1).padStart(2, "0");
            const variantClass = CARD_VARIANTS[index % CARD_VARIANTS.length];

            return (
              <div
                key={service.id || index}
                className="pl-4 sm:pl-5 shrink-0 grow-0 basis-[88%] xs:basis-[82%] sm:basis-1/2 lg:basis-1/3 min-w-0"
              >
                <motion.div
                  onMouseEnter={playHover}
                  whileHover={{ scale: 1.01, y: -4 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-[340px] sm:h-[400px] border shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition-all duration-300 relative overflow-hidden group ${variantClass}`}
                >
                  <div>
                    {/* Header: Icon badge & Step number */}
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-slate-200/70 flex items-center justify-center text-[#5B5CF6] shadow-2xs group-hover:bg-[#5B5CF6] group-hover:text-white group-hover:border-[#5B5CF6] transition-all duration-300">
                        <IconComponent className="w-4.5 h-4.5 sm:w-5 sm:h-5 transition-colors" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        {stepNumber}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#0B0D12] mb-2 sm:mb-3 group-hover:text-[#5B5CF6] transition-colors font-sans">
                      {service.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-[#5F6470] leading-relaxed mb-4 sm:mb-5 line-clamp-3 font-normal">
                      {service.shortDesc}
                    </p>

                    {/* Feature bullets */}
                    {service.features && service.features.length > 0 && (
                      <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                        {service.features.slice(0, 2).map((feat, fidx) => (
                          <li
                            key={fidx}
                            className="flex items-center gap-2 text-xs text-[#5F6470]"
                          >
                            <Check className="w-3.5 h-3.5 text-[#5B5CF6] shrink-0" />
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Bottom Action Button */}
                  <button
                    onClick={() => handleServiceSelect(service.title)}
                    className="w-full h-11 py-2.5 rounded-xl border border-slate-300 hover:border-[#0B0D12] bg-white hover:bg-[#0B0D12] text-[#0B0D12] hover:text-white text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 group/btn mt-auto shadow-2xs"
                  >
                    Get This Service
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
