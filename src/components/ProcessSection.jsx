import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, ClipboardList, PenTool, Code2, ShieldCheck, Rocket, ArrowRight } from "lucide-react";
import { playHover } from "../utils/soundManager";

export default function ProcessSection() {
  const processSteps = [
    {
      num: "01",
      name: "Understand",
      desc: "We deep-dive into your core startup idea and target customers.",
      icon: Lightbulb
    },
    {
      num: "02",
      name: "Plan",
      desc: "We structure modern architectures, budgets, and milestones.",
      icon: ClipboardList
    },
    {
      num: "03",
      name: "Design",
      desc: "We craft custom Figma visual flows focused on user psychology.",
      icon: PenTool
    },
    {
      num: "04",
      name: "Build",
      desc: "We write clean, high-performance, responsive codebase.",
      icon: Code2
    },
    {
      num: "05",
      name: "Test",
      desc: "We execute meticulous quality audits to eliminate issues.",
      icon: ShieldCheck
    },
    {
      num: "06",
      name: "Launch",
      desc: "We publish products and provide active post-launch support.",
      icon: Rocket
    }
  ];

  return (
    <section className="py-24 px-6 sm:px-8 bg-[#FAFAFA] relative overflow-hidden">
      {/* Subtle radial wash for premium depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 30%, rgba(91, 92, 246, 0.04), transparent 60%)"
        }}
      />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold tracking-widest text-[#5B5CF6] uppercase mb-3 block"
          >
            How We Work
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B0D12] mb-4 font-sans"
          >
            Our Process
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-[#5F6470] leading-relaxed font-normal"
          >
            We break down custom software development into reliable milestones.
          </motion.p>
        </div>

        {/* DESKTOP CONNECTED TIMELINE WORKFLOW (Hidden on Mobile) */}
        <div className="hidden lg:block relative">
          {/* Continuous Connecting Line Background */}
          <div className="absolute top-[130px] left-[10%] right-[10%] h-[2px] bg-slate-200/80 pointer-events-none z-0">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full bg-gradient-to-r from-[#5B5CF6]/30 via-[#5B5CF6] to-[#5B5CF6]/30 origin-left"
            />
          </div>

          <div className="grid grid-cols-3 gap-8 relative z-10 mb-12">
            {processSteps.slice(0, 3).map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={playHover}
                  className={`p-7 sm:p-8 rounded-[22px] bg-white border border-slate-900/[0.08] shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_36px_rgba(15,23,42,0.08)] hover:border-[#5B5CF6]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden ${
                    idx === 1 ? "lg:translate-y-3" : ""
                  }`}
                >
                  {/* Large Subtle Background Step Number */}
                  <span className="absolute top-4 right-5 text-[40px] font-extrabold text-[#5B5CF6]/12 group-hover:text-[#5B5CF6]/25 transition-colors pointer-events-none select-none font-sans leading-none">
                    {step.num}
                  </span>

                  <div>
                    {/* Top Icon & Connector Dot */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#5B5CF6]/8 border border-[#5B5CF6]/15 group-hover:bg-[#5B5CF6] group-hover:border-[#5B5CF6] flex items-center justify-center transition-all duration-300 shadow-2xs">
                        <Icon className="w-5 h-5 text-[#5B5CF6] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="w-3 h-3 rounded-full bg-white border-2 border-[#5B5CF6]/40 group-hover:border-[#5B5CF6] group-hover:scale-125 transition-all duration-300" />
                    </div>

                    {/* Step Badge & Name */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-semibold text-[#5B5CF6] bg-[#5B5CF6]/8 px-2.5 py-0.5 rounded-full">
                        Step {step.num}
                      </span>
                      <h3 className="text-lg font-bold text-[#0B0D12] tracking-tight font-sans">
                        {step.name}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] text-[#5F6470] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Row 2 Timeline Line */}
          <div className="absolute bottom-[130px] left-[10%] right-[10%] h-[2px] bg-slate-200/80 pointer-events-none z-0">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full bg-gradient-to-r from-[#5B5CF6]/30 via-[#5B5CF6] to-[#5B5CF6]/30 origin-left"
            />
          </div>

          <div className="grid grid-cols-3 gap-8 relative z-10">
            {processSteps.slice(3, 6).map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (idx + 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={playHover}
                  className={`p-7 sm:p-8 rounded-[22px] bg-white border border-slate-900/[0.08] shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_36px_rgba(15,23,42,0.08)] hover:border-[#5B5CF6]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden ${
                    idx === 1 ? "lg:translate-y-3" : ""
                  }`}
                >
                  {/* Large Subtle Background Step Number */}
                  <span className="absolute top-4 right-5 text-[40px] font-extrabold text-[#5B5CF6]/12 group-hover:text-[#5B5CF6]/25 transition-colors pointer-events-none select-none font-sans leading-none">
                    {step.num}
                  </span>

                  <div>
                    {/* Top Icon & Connector Dot */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#5B5CF6]/8 border border-[#5B5CF6]/15 group-hover:bg-[#5B5CF6] group-hover:border-[#5B5CF6] flex items-center justify-center transition-all duration-300 shadow-2xs">
                        <Icon className="w-5 h-5 text-[#5B5CF6] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="w-3 h-3 rounded-full bg-white border-2 border-[#5B5CF6]/40 group-hover:border-[#5B5CF6] group-hover:scale-125 transition-all duration-300" />
                    </div>

                    {/* Step Badge & Name */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-semibold text-[#5B5CF6] bg-[#5B5CF6]/8 px-2.5 py-0.5 rounded-full">
                        Step {step.num}
                      </span>
                      <h3 className="text-lg font-bold text-[#0B0D12] tracking-tight font-sans">
                        {step.name}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] text-[#5F6470] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* TABLET RESPONSIVE LAYOUT (2 Columns) */}
        <div className="hidden sm:grid lg:hidden grid-cols-2 gap-6 relative z-10">
          {processSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onMouseEnter={playHover}
                className="p-7 rounded-[22px] bg-white border border-slate-900/[0.08] shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_36px_rgba(15,23,42,0.08)] hover:border-[#5B5CF6]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                <span className="absolute top-4 right-5 text-[38px] font-extrabold text-[#5B5CF6]/12 group-hover:text-[#5B5CF6]/25 transition-colors pointer-events-none select-none font-sans leading-none">
                  {step.num}
                </span>

                <div>
                  <div className="w-11 h-11 rounded-2xl bg-[#5B5CF6]/8 border border-[#5B5CF6]/15 group-hover:bg-[#5B5CF6] group-hover:border-[#5B5CF6] flex items-center justify-center mb-5 transition-all duration-300">
                    <Icon className="w-5 h-5 text-[#5B5CF6] group-hover:text-white transition-colors duration-300" />
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-semibold text-[#5B5CF6] bg-[#5B5CF6]/8 px-2.5 py-0.5 rounded-full">
                      Step {step.num}
                    </span>
                    <h3 className="text-base font-bold text-[#0B0D12] font-sans">
                      {step.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#5F6470] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* MOBILE VERTICAL CONNECTED TIMELINE (Stacked with continuous vertical line) */}
        <div className="sm:hidden relative pl-6 space-y-6">
          {/* Vertical Connecting Line */}
          <div className="absolute left-[11px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#5B5CF6] via-[#5B5CF6]/40 to-[#5B5CF6]/20 pointer-events-none" />

          {processSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                className="relative pl-6"
              >
                {/* Node dot on vertical timeline */}
                <div className="absolute -left-[19px] top-5 w-4 h-4 rounded-full bg-white border-2 border-[#5B5CF6] flex items-center justify-center shadow-2xs z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5B5CF6]" />
                </div>

                <div className="p-6 rounded-[20px] bg-white border border-slate-900/[0.08] shadow-[0_4px_16px_rgba(15,23,42,0.03)] active:border-[#5B5CF6]/40 transition-all relative overflow-hidden">
                  <span className="absolute top-3 right-4 text-[32px] font-extrabold text-[#5B5CF6]/12 pointer-events-none select-none font-sans leading-none">
                    {step.num}
                  </span>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-[#5B5CF6]/8 border border-[#5B5CF6]/15 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#5B5CF6]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-[#5B5CF6] block uppercase tracking-wider">
                        Step {step.num}
                      </span>
                      <h3 className="text-base font-bold text-[#0B0D12] font-sans">
                        {step.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-[#5F6470] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
