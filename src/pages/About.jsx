import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Compass, Rocket, ShieldCheck, HeartHandshake, Eye, Award, ArrowUpRight } from "lucide-react";
import SEO from "../components/SEO";
import ProcessSection from "../components/ProcessSection";
import { playHover, playClick } from "../utils/soundManager";

import namanImage from "../assets/team/naman-sable.jpg";
import nikhileshImage from "../assets/team/nikhilesh-gayakwad.jpg";

function LinkedinIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function About() {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top
  }, []);

  const founders = [
    {
      name: "Naman Sable",
      role: "Founder",
      linkedin: "https://www.linkedin.com/in/naman-sable-69085b307/",
      description: "Founder of Nexnam, focused on building modern websites, applications, SaaS products, and digital solutions for startups and businesses.",
      image: namanImage,
      alt: "Naman Sable, Founder of Nexnam"
    },
    {
      name: "Nikhilesh Gayakwad",
      role: "Co-Founder",
      linkedin: "https://www.linkedin.com/in/nikhilesh-gayakwad-39523b31b",
      description: "Co-Founder of Nexnam with a computer science background, contributing to development, technology execution, and building practical digital products.",
      image: nikhileshImage,
      alt: "Nikhilesh Gayakwad, Co-Founder of Nexnam"
    }
  ];

  const values = [
    { title: "Innovation", icon: Rocket, desc: "We continually research modern visual design languages and codebase paradigms.", color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
    { title: "Trust", icon: ShieldCheck, desc: "We maintain absolute transparency regarding engineering benchmarks and deployment logs.", color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { title: "Quality", icon: Award, desc: "We deploy clean, lightweight, semantic codebase frameworks optimized for audits.", color: "text-blue-600 bg-blue-50 border-blue-100" },
    { title: "Speed", icon: Compass, desc: "We execute structured agile milestones to launch startup MVPs within brief sprints.", color: "text-rose-600 bg-rose-50 border-rose-100" },
    { title: "Creativity", icon: Sparkles, desc: "We design memorable premium UI micro-interactions matching client branding.", color: "text-violet-600 bg-violet-50 border-violet-100" },
    { title: "Long-term Support", icon: HeartHandshake, desc: "We provide solid post-launch maintenance, troubleshooting, and cloud analytics.", color: "text-amber-600 bg-amber-50 border-amber-100" }
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
    <div className="flex-grow z-10 w-full pt-32 pb-20 px-6 sm:px-8 bg-[#FAFAFA] dark:bg-[#090A0D] transition-colors duration-250">
      <SEO
        title="About Nexnam | Digital Product Studio"
        description="Learn about Nexnam, our engineering mission, company values, leadership team, and focus on building high-performance web products."
      />
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(91,92,246,0.08)] dark:bg-[rgba(124,125,255,0.12)] border border-[rgba(91,92,246,0.16)] dark:border-[rgba(124,125,255,0.25)] text-xs text-[#5B5CF6] dark:text-[#7C7DFF] font-semibold tracking-wide uppercase font-mono mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#5B5CF6] dark:text-[#7C7DFF]" />
            Who We Are
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0B0D12] dark:text-white mb-6 leading-tight"
          >
            About{" "}
            <span className="text-[#5B5CF6] dark:text-[#7C7DFF]">
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
            className="rounded-2xl p-8 md:p-12 border border-slate-900/[0.08] dark:border-white/10 bg-white dark:bg-[#111318] shadow-xs"
          >
            <h2 className="text-2xl font-bold text-[#0B0D12] dark:text-white mb-4">Who We Are</h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Nexnam is a modern tech startup focused on building creative, scalable, affordable, and impactful digital solutions for startups, creators, students, small businesses, shops, and local businesses.
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
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
              className="glass-card rounded-2xl p-8 border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#111318]/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center mb-6">
                  <Rocket className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Our Mission</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium italic">
                  “To make high-quality digital solutions accessible, affordable, and impactful for businesses, creators, and startups.”
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8 border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#111318]/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/50 border border-violet-100 dark:border-violet-900/50 flex items-center justify-center mb-6">
                  <Eye className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Our Vision</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium italic">
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
            className="glass-card rounded-2xl p-8 border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#111318]/80 hover:border-violet-200 dark:hover:border-violet-800/50 hover:shadow-md transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-violet-600 dark:bg-violet-400" />
              Why Nexnam Exists
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              We observed a massive gap in the tech ecosystem: startups, local businesses, and creators were forced to choose between overpriced enterprise agencies or low-quality template builders. Nexnam was born to bridge this gap. We leverage custom automations, rapid development sprints, and top-tier custom designs to deliver production-grade websites and apps that are both elite and accessible.
            </p>
          </motion.div>

          {/* Why Choose Nexnam */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#111318]/80 hover:border-indigo-200 dark:hover:border-indigo-800/50 hover:shadow-md transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              Why Choose Nexnam
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              We operate with a client-first mindset, focusing strictly on business growth and conversion design. By combining high-performance frameworks, modern responsive designs, technical SEO optimization, rapid delivery cycles, and dedicated post-launch support, we serve as your trusted technology partner helping you scale in the digital world.
            </p>
          </motion.div>
        </div>

        {/* Meet the Founders Section */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-[#5B5CF6] dark:text-[#7C7DFF] uppercase mb-3 block">
              THE PEOPLE BEHIND NEXNAM
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B0D12] dark:text-white tracking-tight mb-4">
              Meet the Founders
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto">
              Building Nexnam with a focus on technology, design, and practical digital solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto">
            {founders.map((founder, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                onMouseEnter={playHover}
                className="bg-white dark:bg-[#111318] border border-[rgba(15,23,42,0.08)] dark:border-[rgba(255,255,255,0.08)] rounded-[24px] p-6 sm:p-7 shadow-[0_14px_40px_rgba(15,23,42,0.05)] dark:shadow-[0_14px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1 hover:border-[rgba(91,92,246,0.20)] dark:hover:border-[rgba(124,125,255,0.30)] hover:shadow-[0_22px_55px_rgba(15,23,42,0.08)] dark:hover:shadow-[0_22px_55px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out flex flex-col justify-between group"
              >
                <div>
                  {/* Editorial Portrait Block */}
                  <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 mb-6">
                    <img
                      src={founder.image}
                      alt={founder.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>

                  {/* Role & Name */}
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-[#5B5CF6] dark:text-[#7C7DFF] bg-[rgba(91,92,246,0.08)] dark:bg-[rgba(124,125,255,0.12)] border border-[rgba(91,92,246,0.16)] dark:border-[rgba(124,125,255,0.25)] mb-2.5">
                      {founder.role}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0B0D12] dark:text-white tracking-tight">
                      {founder.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-[#9CA3AF] leading-relaxed">
                    {founder.description}
                  </p>
                </div>

                {/* LinkedIn Link CTA */}
                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/10">
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`LinkedIn profile for ${founder.name}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#5B5CF6] dark:hover:text-[#7C7DFF] transition-colors group/link"
                  >
                    <LinkedinIcon className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover/link:text-[#5B5CF6] dark:group-hover/link:text-[#7C7DFF] transition-colors" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover/link:text-[#5B5CF6] dark:group-hover/link:text-[#7C7DFF] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 dark:text-[#7C7DFF] uppercase mb-3 block">
              Our Compass
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Our Values</h2>
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
                className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#111318]/80 shadow-xs group hover:border-indigo-200 dark:hover:border-indigo-800/50 hover:shadow-md transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border ${v.color}`}>
                  <v.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-[#7C7DFF] transition-colors">{v.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detailed Timeline Process */}
        <ProcessSection />

        {/* Bottom CTA Section with Internal Links */}
        <div className="mt-24 text-center p-8 md:p-12 rounded-3xl bg-gradient-to-br from-indigo-50/80 via-white to-violet-50/80 dark:from-[#111318] dark:via-[#15171D] dark:to-[#111318] border border-indigo-100 dark:border-white/10 shadow-md">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-mono">Ready to Collaborate with Nexnam?</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
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
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#15171D] hover:bg-slate-50 dark:hover:bg-[#1C1F27] text-slate-700 dark:text-slate-200 hover:border-indigo-300 shadow-xs text-xs font-bold tracking-wider uppercase font-mono transition-all duration-300 cursor-pointer"
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
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#15171D] hover:bg-slate-50 dark:hover:bg-[#1C1F27] text-slate-700 dark:text-slate-200 hover:border-violet-300 shadow-xs text-xs font-bold tracking-wider uppercase font-mono transition-all duration-300 cursor-pointer"
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
              className="w-full sm:w-auto relative inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold tracking-wider uppercase font-mono shadow-sm hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

