import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { playHover, playClick } from "../utils/soundManager";

export default function ServiceCard({ service, index }) {
  const navigate = useNavigate();
  const IconComponent = Icons[service.iconName] || Icons.HelpCircle;

  const handleGetStarted = () => {
    playClick();
    // Redirect to contact page, passing selected service in navigation state
    navigate("/contact", { state: { selectedService: service.title } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={playHover}
      className="glass-card glass-card-hover rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full relative overflow-hidden group"
    >
      {/* Glow highlight background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 rounded-full blur-2xl group-hover:bg-brand-cyan/15 transition-all duration-500" />
      
      <div>
        {/* Service Icon Container */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-cyan/20 to-brand-blue/20 border border-brand-cyan/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all duration-300">
          <IconComponent className="w-6 h-6 text-brand-cyan" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold tracking-tight text-white mb-3 group-hover:text-brand-cyan transition-colors duration-300">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/60 leading-relaxed mb-6">
          {service.shortDesc}
        </p>

        {/* Features List */}
        <ul className="space-y-2.5 mb-8">
          {service.features &&
            service.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-white/50">
                <Icons.CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                <span className="leading-normal">{feature}</span>
              </li>
            ))}
        </ul>
      </div>

      {/* Button */}
      <button
        onClick={handleGetStarted}
        className="w-full py-3 rounded-lg border border-white/10 group-hover:border-brand-cyan/50 hover:bg-brand-cyan hover:text-brand-black text-xs font-bold font-mono tracking-wider uppercase text-white transition-all duration-300 cursor-pointer flex items-center justify-center gap-1 group/btn"
      >
        Get This Service
        <Icons.ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
}
