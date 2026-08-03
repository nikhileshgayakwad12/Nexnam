import React from "react";
import { motion } from "framer-motion";

export default function SkeletonLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 w-full h-full bg-[#030303] z-[999] flex flex-col items-center justify-start overflow-y-auto select-none"
    >
      {/* Background ambient glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Navbar Skeleton */}
      <div className="w-full h-20 border-b border-white/5 bg-brand-black/40 backdrop-blur-md flex items-center justify-between px-6 sm:px-8 shrink-0 z-10">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="Nexnam Logo"
            className="h-8 w-auto object-contain opacity-40"
          />
        </div>

        {/* Center navigation links mock (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="w-14 h-3 bg-white/[0.04] rounded animate-pulse" />
          ))}
        </div>

        {/* CTA Button mock */}
        <div className="w-28 h-10 bg-gradient-to-r from-brand-cyan/10 to-brand-blue/10 border border-brand-cyan/20 rounded-lg animate-pulse hidden md:block" />
        
        {/* Mobile menu button mock */}
        <div className="w-10 h-10 bg-white/[0.02] border border-white/5 rounded-lg animate-pulse block md:hidden flex flex-col justify-center items-center gap-1">
          <div className="w-4 h-0.5 bg-white/20 rounded" />
          <div className="w-4 h-0.5 bg-white/20 rounded" />
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 pt-16 md:pt-24 flex-grow flex items-center justify-center z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center">
          
          {/* Hero Left: Text & Action Blocks */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Small glowing tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/5 border border-brand-cyan/15 animate-pulse mb-6 relative overflow-hidden">
              <div className="w-3 h-3 rounded-full bg-brand-cyan/20" />
              <div className="w-36 h-2 bg-brand-cyan/20 rounded" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
            </div>

            {/* Main title lines */}
            <div className="w-full space-y-3 mb-6">
              <div className="w-[85%] h-12 bg-white/[0.03] rounded-lg animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
              </div>
              <div className="w-[60%] h-12 bg-white/[0.03] rounded-lg animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
              </div>
            </div>

            {/* Subtitle text blocks */}
            <div className="w-full space-y-2.5 mb-8 max-w-lg">
              <div className="w-full h-3.5 bg-white/[0.02] rounded animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
              </div>
              <div className="w-11/12 h-3.5 bg-white/[0.02] rounded animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
              </div>
              <div className="w-3/4 h-3.5 bg-white/[0.02] rounded animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <div className="w-full sm:w-44 h-12 bg-gradient-to-r from-brand-cyan/20 to-brand-blue/20 border border-brand-cyan/25 rounded-lg animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
              </div>
              <div className="w-full sm:w-36 h-12 bg-white/[0.03] border border-white/5 rounded-lg animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
              </div>
            </div>
          </div>

          {/* Hero Right: Pulsing / spinning orb mock for 3D elements */}
          <div className="lg:col-span-5 flex items-center justify-center relative w-full h-[320px] md:h-[400px]">
            {/* Spinning decorative frame */}
            <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-dashed border-white/5 animate-[spin_30s_linear_infinite] flex items-center justify-center bg-white/[0.005]">
              {/* Pulsing inner rings */}
              <div className="w-48 h-48 rounded-full border border-white/5 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border border-dashed border-brand-cyan/10 animate-[spin_15s_linear_infinite_reverse] flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-brand-cyan/5 border border-brand-cyan/20 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Mini floating elements placeholder */}
            <div className="absolute top-10 left-10 w-16 h-6 rounded-full border border-white/5 bg-white/[0.02] animate-bounce" style={{ animationDuration: "3s" }} />
            <div className="absolute bottom-10 right-10 w-20 h-6 rounded-full border border-brand-purple/10 bg-white/[0.02] animate-bounce" style={{ animationDuration: "4s" }} />
          </div>

        </div>
      </div>

      {/* Stats Bar Skeleton */}
      <div className="w-full border-t border-white/5 bg-brand-black/25 py-12 px-6 sm:px-8 mt-16 shrink-0 z-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center justify-center text-center">
                <div className="w-20 h-9 bg-gradient-to-r from-brand-cyan/15 to-brand-blue/15 rounded-lg animate-pulse mb-3" />
                <div className="w-28 h-3 bg-white/[0.02] rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>

    </motion.div>
  );
}
