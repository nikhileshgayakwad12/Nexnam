import React from "react";
import { motion } from "framer-motion";

export default function SkeletonLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 w-full h-full bg-[#FAFAFA] z-[999] flex flex-col items-center justify-start overflow-y-auto select-none"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Navbar Skeleton */}
      <div className="w-full h-20 border-b border-slate-900/[0.08] bg-white/90 backdrop-blur-md flex items-center justify-between px-6 sm:px-8 shrink-0 z-10">
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="Nexnam Logo"
            className="h-8 w-auto object-contain opacity-70"
          />
        </div>

        <div className="hidden md:flex items-center gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="w-14 h-3 bg-slate-200/80 rounded animate-pulse" />
          ))}
        </div>

        <div className="w-28 h-10 bg-[#111318]/10 border border-slate-200 rounded-[10px] animate-pulse hidden md:block" />
        
        <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-xl animate-pulse block md:hidden" />
      </div>

      {/* Hero Section Skeleton */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 pt-16 md:pt-24 flex-grow flex items-center justify-center z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center">
          
          {/* Hero Left: Text & Action Blocks */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 animate-pulse mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-[#5B5CF6]/50" />
              <div className="w-36 h-2 bg-slate-300 rounded" />
            </div>

            <div className="w-full space-y-3 mb-6">
              <div className="w-[85%] h-12 bg-slate-200/80 rounded-xl animate-pulse" />
              <div className="w-[60%] h-12 bg-slate-200/80 rounded-xl animate-pulse" />
            </div>

            <div className="w-full space-y-2.5 mb-8 max-w-lg">
              <div className="w-full h-3.5 bg-slate-200/50 rounded animate-pulse" />
              <div className="w-11/12 h-3.5 bg-slate-200/50 rounded animate-pulse" />
              <div className="w-3/4 h-3.5 bg-slate-200/50 rounded animate-pulse" />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <div className="w-full sm:w-44 h-12 bg-[#111318]/90 rounded-xl animate-pulse" />
              <div className="w-full sm:w-36 h-12 bg-white border border-slate-200 rounded-xl animate-pulse" />
            </div>
          </div>

          {/* Hero Right: Product showcase skeleton */}
          <div className="lg:col-span-5 flex items-center justify-center relative w-full h-[320px] md:h-[400px]">
            <div className="w-full max-w-md h-72 bg-white border border-slate-200 rounded-2xl shadow-sm animate-pulse p-4 flex flex-col justify-between">
              <div className="h-6 w-full bg-slate-100 rounded" />
              <div className="h-32 w-full bg-slate-100 rounded" />
              <div className="h-10 w-full bg-slate-100 rounded" />
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

