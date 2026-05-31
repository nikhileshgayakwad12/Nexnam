import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, Layers, Cpu } from "lucide-react";
import { playHover, playClick } from "../utils/soundManager";

export default function ProjectCard({ project, onOpenCaseStudy, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={playHover}
      className="glass-card rounded-3xl overflow-hidden flex flex-col h-full border border-white/5 hover:border-brand-cyan/20 transition-all duration-300 group"
    >
      {/* Visual Header Placeholder (Premium Tech Gradient Panel) */}
      <div className="relative w-full h-48 overflow-hidden flex items-center justify-center">
        <div className={`absolute inset-0 bg-gradient-to-tr ${project.gradientClass || "from-cyan-500 to-blue-600"} opacity-70 group-hover:scale-105 transition-transform duration-700`} />
        
        {/* Abstract futuristic grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 mix-blend-overlay" />
        
        {/* Radial blur circle inside header */}
        <div className="absolute w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none" />

        {/* Floating Code snippet / logo visual */}
        <div className="z-10 bg-brand-black/40 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 flex items-center gap-2 group-hover:scale-110 transition-transform duration-300">
          <Cpu className="w-4 h-4 text-brand-cyan animate-pulse" />
          <span className="text-xs font-mono font-bold text-white tracking-wider">
            {project.title.toUpperCase()} // SYS_v1.0
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
        <div>
          {/* Category */}
          <div className="flex items-center gap-1.5 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
            <span className="text-xs font-mono font-bold tracking-wider text-brand-cyan uppercase">
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold tracking-tight text-white mb-3 group-hover:text-brand-cyan transition-colors duration-300">
            {project.title}
          </h3>

          {/* Short description */}
          <p className="text-sm text-white/60 leading-relaxed mb-6">
            {project.shortDesc}
          </p>

          {/* Key Technologies Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies &&
              project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-[10px] font-mono font-medium tracking-wide bg-white/5 border border-white/5 text-white/70"
                >
                  {tech}
                </span>
              ))}
          </div>
        </div>

        {/* Card CTA Actions */}
        <div className="grid grid-cols-2 gap-4 mt-auto">
          {/* Case study trigger */}
          <button
            onClick={() => {
              playClick();
              onOpenCaseStudy(project);
            }}
            className="flex items-center justify-center gap-1.5 py-3 rounded-lg border border-white/10 hover:border-brand-cyan/40 bg-white/5 hover:bg-brand-cyan/5 text-xs font-bold text-white tracking-wider uppercase font-mono transition-all duration-300 cursor-pointer"
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
            className="flex items-center justify-center gap-1.5 py-3 rounded-lg bg-gradient-to-r from-brand-cyan to-brand-blue text-brand-black text-xs font-bold tracking-wider uppercase font-mono hover:opacity-95 hover:shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all duration-300 cursor-pointer"
          >
            Live Demo
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
