import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, CheckCircle2, TrendingUp, Users, ShieldCheck, Zap } from "lucide-react";

export default function Hero3D() {
  return (
    <div className="w-full h-full min-h-[360px] md:min-h-[440px] relative flex items-center justify-center pointer-events-auto">
      {/* Background Subtle Glow Anchor */}
      <div className="absolute w-[280px] h-[280px] rounded-full bg-[#5B5CF6]/10 blur-[90px] pointer-events-none z-0" />

      {/* Container for Layered Cards */}
      <div className="relative w-full max-w-md mx-auto z-10 flex flex-col items-center justify-center">

        {/* Main Product Window Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-white rounded-2xl border border-slate-900/[0.09] shadow-[0_20px_50px_rgba(15,23,42,0.08)] overflow-hidden"
        >
          {/* Browser Window Header */}
          <div className="h-9 w-full bg-slate-50/90 border-b border-slate-200/80 px-4 flex items-center justify-between select-none">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            </div>
            <div className="bg-white border border-slate-200 rounded-md px-3 py-0.5 text-[10px] text-slate-500 font-mono w-44 text-center truncate shadow-2xs">
              nexnam.com/work/kirayapro
            </div>
            <div className="w-3" />
          </div>

          {/* Product Dashboard Surface */}
          <div className="p-5 bg-[#FAFAFA]">
            {/* Top Bar inside app */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/70">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#5B5CF6]/10 text-[#5B5CF6] flex items-center justify-center font-bold text-xs">
                  K
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0B0D12] leading-tight">KirayaPro Workspace</h4>
                  <p className="text-[10px] text-[#8A8F98]">Property Operations OS</p>
                </div>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Product
              </span>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <span className="text-[9px] text-[#8A8F98] block">Occupancy Rate</span>
                <span className="text-xs font-bold text-[#0B0D12]">98.4%</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <span className="text-[9px] text-[#8A8F98] block">Rent Collection</span>
                <span className="text-xs font-bold text-emerald-600">On Track</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <span className="text-[9px] text-[#8A8F98] block">Active Tenants</span>
                <span className="text-xs font-bold text-[#0B0D12]">142</span>
              </div>
            </div>

            {/* Table Mockup Rows */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-2.5 space-y-2">
              <div className="flex items-center justify-between text-[10px] py-1 border-b border-slate-100">
                <span className="font-semibold text-[#0B0D12]">Unit #402 — Lease Renewed</span>
                <span className="text-emerald-600 font-medium">Completed</span>
              </div>
              <div className="flex items-center justify-between text-[10px] py-1">
                <span className="font-semibold text-[#0B0D12]">Unit #208 — Automated Invoice</span>
                <span className="text-[#5B5CF6] font-medium">Sent</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Overlapping Card 1 — CodeMaster Performance */}
        <motion.div
          initial={{ opacity: 0, x: -20, y: 10 }}
          animate={{ opacity: 1, x: -15, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -bottom-6 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-900/[0.09] shadow-[0_12px_30px_rgba(0,0,0,0.08)] flex items-center gap-3 z-20"
        >
          <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#0B0D12]">CodeMaster Leaderboard</div>
            <div className="text-[9px] text-[#5F6470]">EdTech Engine • Fast Response</div>
          </div>
        </motion.div>

        {/* Floating Overlapping Card 2 — Conversion Badge */}
        <motion.div
          initial={{ opacity: 0, x: 20, y: -10 }}
          animate={{ opacity: 1, x: 15, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -top-5 -right-4 sm:-right-6 bg-[#0B0D12] text-white p-3 rounded-xl border border-slate-800 shadow-[0_12px_30px_rgba(0,0,0,0.15)] flex items-center gap-2.5 z-20"
        >
          <ShieldCheck className="w-4 h-4 text-[#5B5CF6]" />
          <div>
            <div className="text-[10px] font-semibold text-white">Production Ready</div>
            <div className="text-[8px] text-slate-400">99.9% Uptime Guarantee</div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

