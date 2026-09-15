import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { playHover, playClick } from "../utils/soundManager";

export default function CTASection() {
  const navigate = useNavigate();

  const handleCTA = () => {
    playClick();
    navigate("/contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative py-24 px-6 sm:px-8 overflow-hidden z-10 w-full">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl p-10 md:p-16 bg-[#111318] border border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden text-center"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#5B5CF6]/15 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#7C3AED]/15 blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            {/* Tag pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-slate-300 font-medium tracking-wide mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#5B5CF6]" />
              Let's Collaborate
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 max-w-2xl leading-[1.08]">
              Ready to Build Your{" "}
              <span className="bg-gradient-to-r from-white via-slate-200 to-[#5B5CF6] bg-clip-text text-transparent">
                Digital Presence?
              </span>
            </h2>

            {/* Description */}
            <p className="text-base text-slate-400 mb-9 max-w-xl leading-relaxed">
              Whether you need a custom web application, automated operations, or an MVP to secure your next funding round, Nexnam is ready to build it.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                onClick={handleCTA}
                onMouseEnter={playHover}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-xs font-semibold tracking-wide text-[#0B0D12] rounded-xl bg-white hover:bg-slate-100 shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98] cursor-pointer group"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform text-[#0B0D12]" />
              </button>

              <button
                onClick={() => {
                  playClick();
                  navigate("/services");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onMouseEnter={playHover}
                className="w-full sm:w-auto px-8 py-4 text-xs font-semibold tracking-wide rounded-xl border border-slate-700 hover:border-slate-500 bg-slate-900/80 text-white transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                Explore Services
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

