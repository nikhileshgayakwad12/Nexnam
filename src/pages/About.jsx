import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Compass, Rocket, ShieldCheck, HeartHandshake, Eye, Award } from "lucide-react";
import SEO from "../components/SEO";
import { playHover, playClick } from "../utils/soundManager";

export default function About() {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top
  }, []);

  const values = [
    { title: "Innovation", icon: Rocket, desc: "We continually research modern visual design languages and codebase paradigms.", color: "text-brand-cyan bg-brand-cyan/5 border-brand-cyan/10" },
    { title: "Trust", icon: ShieldCheck, desc: "We maintain absolute transparency regarding engineering benchmarks and deployment logs.", color: "text-green-400 bg-green-400/5 border-green-400/10" },
    { title: "Quality", icon: Award, desc: "We deploy clean, lightweight, semantic codebase frameworks optimized for audits.", color: "text-brand-blue bg-brand-blue/5 border-brand-blue/10" },
    { title: "Speed", icon: Compass, desc: "We execute structured agile milestones to launch startup MVPs within brief sprints.", color: "text-red-400 bg-red-400/5 border-red-400/10" },
    { title: "Creativity", icon: Sparkles, desc: "We design memorable premium UI micro-interactions matching client branding.", color: "text-brand-purple bg-brand-purple/5 border-brand-purple/10" },
    { title: "Long-term Support", icon: HeartHandshake, desc: "We provide solid post-launch maintenance, troubleshooting, and cloud analytics.", color: "text-yellow-400 bg-yellow-400/5 border-yellow-400/10" }
  ];

  const processSteps = [
    { num: "01", name: "Understand the Idea", desc: "We schedule technical syncs to map your business model, customer demographics, and user journeys." },
    { num: "02", name: "Plan the Solution", desc: "We define concrete timelines, choose the optimal modern software stacks, and write documentation." },
    { num: "03", name: "Design the Experience", desc: "Our creative designers construct user-centric, premium Figma visual prototypes matching your branding guidelines." },
    { num: "04", name: "Build the Product", desc: "We code custom web/mobile platforms utilizing modular frameworks, ensuring responsive UI across resolutions." },
    { num: "05", name: "Test Everything", desc: "Our quality team performs testing loops (responsiveness, browser checks, forms) to verify code health." },
    { num: "06", name: "Launch and Support", desc: "We manage server deployment, check search console indexing, and provide constant support as you grow." }
  ];

  return (
    <div className="flex-grow z-10 w-full pt-32 pb-20 px-6 sm:px-8">
      <SEO
        title="About Nexnam | Tech Startup"
        description="Learn about Nexnam, a modern tech startup building creative digital solutions for businesses and creators."
      />
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-xs text-brand-cyan font-semibold tracking-wider uppercase font-mono mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Who We Are
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-6"
          >
            About{" "}
            <span className="bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple bg-clip-text text-transparent">
              Nexnam
            </span>
          </motion.h1>
        </div>

        {/* Who We Are & Mission / Vision */}
        <div className="grid grid-cols-1 gap-12 mb-24">
          {/* Main Story Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 md:p-12 border border-white/5 bg-gradient-to-br from-indigo-950/10 to-slate-900/10"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Who We Are</h2>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6">
              Nexnam is a modern tech startup focused on building creative, scalable, affordable, and impactful digital solutions for startups, creators, students, small businesses, shops, and local businesses.
            </p>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              We believe that premium digital engineering shouldn't be gated behind enterprise pricing. By applying modern automation pipelines and agile sprint schedules, we deliver high-end, responsive products that set a new benchmark for startup velocity.
            </p>
          </motion.div>

          {/* Mission and Vision Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8 border border-white/5 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center mb-6">
                  <Rocket className="w-5 h-5 text-brand-cyan" />
                </div>
                <h2 className="text-xl font-bold text-white mb-3">Our Mission</h2>
                <p className="text-sm text-white/60 leading-relaxed font-medium italic">
                  “To make high-quality digital solutions accessible, affordable, and impactful for businesses, creators, and startups.”
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8 border border-white/5 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center mb-6">
                  <Eye className="w-5 h-5 text-brand-purple" />
                </div>
                <h2 className="text-xl font-bold text-white mb-3">Our Vision</h2>
                <p className="text-sm text-white/60 leading-relaxed font-medium italic">
                  “To become a trusted technology partner for businesses looking to grow in the digital world.”
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Why Nexnam Exists & Why Choose Nexnam Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {/* Why Nexnam Exists */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 border border-white/5 bg-gradient-to-br from-purple-950/10 to-slate-900/10 hover:border-brand-purple/20 transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded bg-brand-purple" />
              Why Nexnam Exists
            </h3>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
              We observed a massive gap in the tech ecosystem: startups, local businesses, and creators were forced to choose between overpriced enterprise agencies or low-quality template builders. Nexnam was born to bridge this gap. We leverage custom automations, rapid development sprints, and top-tier custom designs to deliver production-grade websites and apps that are both elite and accessible.
            </p>
          </motion.div>

          {/* Why Choose Nexnam */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 border border-white/5 bg-gradient-to-br from-cyan-950/10 to-slate-900/10 hover:border-brand-cyan/20 transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded bg-brand-cyan" />
              Why Choose Nexnam
            </h3>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
              We operate with a client-first mindset, focusing strictly on business growth and conversion design. By combining high-performance frameworks, modern responsive designs, technical SEO optimization, rapid delivery cycles, and dedicated post-launch support, we serve as your trusted technology partner helping you scale in the digital world.
            </p>
          </motion.div>
        </div>

        {/* Our Values */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-brand-cyan uppercase mb-3 block">
              Our Compass
            </span>
            <h2 className="text-3xl font-extrabold text-white">Our Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onMouseEnter={playHover}
                className="glass-card rounded-2xl p-6 border border-white/5 group hover:border-brand-cyan/20 transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 border ${v.color}`}>
                  <v.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-cyan transition-colors">{v.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detailed Timeline Process */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-brand-purple uppercase mb-3 block">
              Development Lifecycle
            </span>
            <h2 className="text-3xl font-extrabold text-white">Our Process</h2>
          </div>

          <div className="relative border-l border-white/5 ml-4 md:ml-32 space-y-12">
            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative pl-8 md:pl-12"
              >
                {/* Node dot icon */}
                <div className="absolute left-[-9px] top-1.5 w-4.5 h-4.5 rounded-full border border-brand-cyan bg-brand-black flex items-center justify-center shadow-[0_0_10px_rgba(0,245,255,0.4)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                </div>

                {/* Big Step Number on desktop (floats to the left of line) */}
                <div className="hidden md:block absolute left-[-120px] top-0 w-24 text-right font-mono font-black text-2xl text-white/20">
                  {step.num} //
                </div>

                {/* Card Container */}
                <div className="glass-card rounded-2xl p-6 border border-white/5 hover:border-brand-purple/20 transition-all duration-300 group">
                  <h3 className="text-lg font-bold text-white mb-2 font-mono flex items-center gap-2 group-hover:text-brand-cyan transition-colors">
                    <span className="md:hidden text-brand-cyan/40 font-mono text-sm">{step.num}.</span>
                    {step.name}
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed max-w-2xl">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Section with Internal Links */}
        <div className="mt-24 text-center p-8 md:p-10 rounded-3xl glass-card border border-white/5 bg-gradient-to-br from-indigo-950/10 to-slate-900/10">
          <h3 className="text-xl font-bold text-white mb-3 font-mono">Ready to Collaborate with Nexnam?</h3>
          <p className="text-xs text-white/50 mb-8 max-w-md mx-auto">
            Explore our comprehensive list of digital solutions or view some of our recent product launches.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                playClick();
                navigate("/services");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onMouseEnter={playHover}
              className="w-full sm:w-auto px-6 py-3 rounded-lg border border-white/10 hover:border-brand-cyan/40 bg-white/5 hover:bg-brand-cyan/5 text-xs font-bold text-white tracking-wider uppercase font-mono transition-all duration-300 cursor-pointer"
            >
              Our Services
            </button>
            <button
              onClick={() => {
                playClick();
                navigate("/projects");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onMouseEnter={playHover}
              className="w-full sm:w-auto px-6 py-3 rounded-lg border border-white/10 hover:border-brand-purple/40 bg-white/5 hover:bg-brand-purple/5 text-xs font-bold text-white tracking-wider uppercase font-mono transition-all duration-300 cursor-pointer"
            >
              Our Work
            </button>
            <button
              onClick={() => {
                playClick();
                navigate("/contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onMouseEnter={playHover}
              className="w-full sm:w-auto relative inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-brand-cyan to-brand-blue hover:shadow-[0_0_15px_rgba(0,245,255,0.25)] text-xs font-bold text-brand-black tracking-wider uppercase font-mono transition-all duration-300 cursor-pointer animate-pulse"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
