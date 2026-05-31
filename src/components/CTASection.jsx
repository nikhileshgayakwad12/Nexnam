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
    <section className="relative py-20 px-6 sm:px-8 overflow-hidden z-10 w-full">
      <div className="mx-auto max-w-5xl">
        {/* Glow border wrap */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl p-8 md:p-14 glass-card border border-white/5 bg-gradient-to-br from-indigo-950/20 to-slate-900/30 overflow-hidden group hover:border-brand-cyan/20 transition-colors duration-500"
        >
          {/* Neon gradient background blobs */}
          <div className="absolute top-[-50%] left-[-20%] w-[350px] h-[350px] rounded-full bg-brand-cyan/10 blur-[100px] pointer-events-none group-hover:bg-brand-cyan/15 transition-colors duration-500" />
          <div className="absolute bottom-[-50%] right-[-20%] w-[350px] h-[350px] rounded-full bg-brand-purple/10 blur-[100px] pointer-events-none group-hover:bg-brand-purple/15 transition-colors duration-500" />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30 mix-blend-overlay pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Small banner */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-xs text-brand-cyan font-semibold tracking-wider uppercase font-mono mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Let's Collaborate
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6 max-w-2xl leading-tight">
              Ready to Build the{" "}
              <span className="bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple bg-clip-text text-transparent">
                Future
              </span>{" "}
              of Your Business?
            </h2>

            {/* Description */}
            <p className="text-base text-white/60 mb-8 max-w-xl leading-relaxed">
              Whether you need a custom web application, automated operations, or an MVP to secure your next funding round, Nexnam is ready to build it.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleCTA}
                onMouseEnter={playHover}
                className="relative inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-wider uppercase text-brand-black rounded-lg bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] transition-all duration-300 active:scale-95 cursor-pointer font-mono group"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  playClick();
                  navigate("/services");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onMouseEnter={playHover}
                className="px-8 py-4 text-sm font-bold tracking-wider uppercase rounded-lg border border-white/10 hover:border-brand-cyan/40 bg-white/5 hover:bg-brand-cyan/5 text-white transition-all duration-300 active:scale-95 cursor-pointer font-mono"
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
