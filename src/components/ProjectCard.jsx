import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, Layers, Globe } from "lucide-react";
import { playHover, playClick } from "../utils/soundManager";

export default function ProjectCard({ project, onOpenCaseStudy, index, isDark = false }) {
  // Format demo URL display for browser bar mockup
  const displayUrl = project.demoUrl
    ? project.demoUrl.replace("https://", "").replace("http://", "").replace("/#/", "/").split("/")[0]
    : `${project.id}.nexnam.app`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={playHover}
      className={`rounded-2xl overflow-hidden flex flex-col h-full border transition-all duration-300 group ${
        isDark
          ? "bg-[#111318] border-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:border-slate-700 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          : "bg-white dark:bg-[#111318] border-slate-900/[0.08] dark:border-white/[0.08] shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_16px_40px_rgba(15,23,42,0.07)] hover:border-[#5B5CF6]/30 dark:hover:border-[#7C7DFF]/40"
      }`}
    >
      {/* Browser Frame Preview Mockup (16:10 ratio) */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-950 flex flex-col">
        {/* Top Browser Bar */}
        <div className={`h-8 w-full px-3.5 flex items-center justify-between shrink-0 select-none border-b ${
          isDark ? "bg-slate-900 border-slate-800" : "bg-slate-900/95 border-slate-800"
        }`}>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="bg-slate-800/90 text-slate-300 rounded px-2.5 py-0.5 text-[10px] font-mono w-44 text-center truncate flex items-center justify-center gap-1">
            <Globe className="w-2.5 h-2.5 text-slate-400 shrink-0" />
            <span className="truncate">{displayUrl}</span>
          </div>
          <div className="w-4" />
        </div>

        {/* Preview Screen Body */}
        <div className="relative flex-grow overflow-hidden flex items-center justify-center p-4">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover object-top rounded-t group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className={`w-full h-full rounded-t p-4 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br ${
              project.gradientClass || "from-slate-900 via-indigo-950 to-slate-900"
            }`}>
              <div className="absolute inset-0 bg-grid-pattern opacity-25" />
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/80 px-2 py-0.5 rounded bg-white/10 backdrop-blur-xs">
                  {project.category}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="relative z-10 my-auto text-center py-2">
                <h4 className="text-xl font-bold text-white tracking-tight drop-shadow-xs mb-1">
                  {project.title}
                </h4>
                <p className="text-xs text-white/80 max-w-[240px] mx-auto line-clamp-2">
                  {project.shortDesc}
                </p>
              </div>
              <div className="relative z-10 flex items-center justify-between text-[10px] text-white/70 border-t border-white/15 pt-2">
                <span>Nexnam Studio</span>
                <span className="font-mono">Live Build</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          {/* Category */}
          <div className="flex items-center gap-1.5 mb-2">
            <span className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-[#5B5CF6]" : "bg-[#5B5CF6] dark:bg-[#7C7DFF]"}`} />
            <span className={`text-xs font-semibold tracking-wide uppercase ${
              isDark ? "text-slate-400" : "text-[#5B5CF6] dark:text-[#7C7DFF]"
            }`}>
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3 className={`text-xl font-bold tracking-tight mb-2 transition-colors duration-200 ${
            isDark ? "text-white group-hover:text-[#5B5CF6]" : "text-[#0B0D12] dark:text-[#F8FAFC] group-hover:text-[#5B5CF6] dark:group-hover:text-[#7C7DFF]"
          }`}>
            {project.title}
          </h3>

          {/* Short description */}
          <p className={`text-xs leading-relaxed mb-5 ${
            isDark ? "text-slate-400" : "text-[#5F6470] dark:text-[#9CA3AF]"
          }`}>
            {project.shortDesc}
          </p>

          {/* Key Technologies Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.technologies &&
              project.technologies.map((tech) => (
                <span
                  key={tech}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-medium ${
                    isDark
                      ? "bg-slate-800/80 border border-slate-700/60 text-slate-300"
                      : "bg-slate-100 dark:bg-[#15171D] border border-slate-200/70 dark:border-white/[0.08] text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {tech}
                </span>
              ))}
          </div>
        </div>

        {/* Card CTA Actions */}
        <div className="grid grid-cols-2 gap-3 mt-auto pt-2">
          {/* Case study trigger */}
          <button
            onClick={() => {
              playClick();
              onOpenCaseStudy(project);
            }}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer ${
              isDark
                ? "border-slate-700 hover:border-slate-500 bg-slate-900 text-slate-200"
                : "border-slate-200 dark:border-white/[0.12] hover:border-[#0B0D12] dark:hover:border-[#7C7DFF] bg-white dark:bg-[#15171D] text-[#0B0D12] dark:text-[#F8FAFC]"
            }`}
          >
            Case Study
            <Layers className="w-3.5 h-3.5" />
          </button>

          {/* External Live Demo */}
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#5B5CF6] dark:bg-[#7C7DFF] hover:bg-[#4F50E2] dark:hover:bg-[#6869E8] text-white text-xs font-semibold transition-all duration-200 cursor-pointer shadow-xs"
          >
            Live Demo
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

