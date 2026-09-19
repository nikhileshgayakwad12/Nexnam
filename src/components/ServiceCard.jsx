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
    navigate("/contact", { state: { selectedService: service.title } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const stepNumber = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={playHover}
      className="bg-white dark:bg-[#111318] rounded-2xl p-7 md:p-8 flex flex-col justify-between h-full relative overflow-hidden group border border-slate-900/[0.08] dark:border-white/[0.08] shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_16px_40px_rgba(15,23,42,0.07)] hover:border-[#5B5CF6]/30 dark:hover:border-[#7C7DFF]/40 hover:-translate-y-1 transition-all duration-300"
    >
      <div>
        {/* Header with Icon and Step Number */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-11 h-11 rounded-xl bg-slate-50 dark:bg-[#15171D] border border-slate-200/90 dark:border-white/[0.08] flex items-center justify-center text-[#5B5CF6] dark:text-[#7C7DFF] group-hover:bg-[#5B5CF6] dark:group-hover:bg-[#7C7DFF] group-hover:text-white dark:group-hover:text-white group-hover:border-[#5B5CF6] dark:group-hover:border-[#7C7DFF] transition-all duration-300">
            <IconComponent className="w-5 h-5 transition-colors" />
          </div>
          <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
            {stepNumber}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold tracking-tight text-[#0B0D12] dark:text-[#F8FAFC] mb-3 group-hover:text-[#5B5CF6] dark:group-hover:text-[#7C7DFF] transition-colors duration-200">
          {service.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-[#5F6470] dark:text-[#9CA3AF] leading-relaxed mb-6">
          {service.shortDesc}
        </p>

        {/* Features List */}
        <ul className="space-y-2.5 mb-8">
          {service.features &&
            service.features.slice(0, 3).map((feature, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-[#5F6470] dark:text-[#9CA3AF]">
                <Icons.Check className="w-3.5 h-3.5 text-[#5B5CF6] dark:text-[#7C7DFF] shrink-0 mt-0.5" />
                <span className="leading-normal">{feature}</span>
              </li>
            ))}
        </ul>
      </div>

      {/* Button */}
      <button
        onClick={handleGetStarted}
        className="w-full py-3 rounded-xl border border-slate-200 dark:border-white/[0.12] group-hover:border-[#0B0D12] dark:group-hover:border-[#7C7DFF] group-hover:bg-[#0B0D12] dark:group-hover:bg-[#7C7DFF] group-hover:text-white text-xs font-semibold text-[#0B0D12] dark:text-[#F8FAFC] transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 group/btn"
      >
        Get This Service
        <Icons.ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
      </button>
    </motion.div>
  );
}

