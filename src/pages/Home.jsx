import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Flame, Compass, HeartHandshake, DollarSign, Laptop, TrendingUp, Zap, HelpCircle, Sliders } from "lucide-react";
import { playHover, playClick } from "../utils/soundManager";
import SEO from "../components/SEO";
import ServicesCarousel from "../components/ui/ServicesCarousel";
import CardStack from "../components/ui/CardStack";
import SplineScene from "../components/ui/SplineScene";
import CTASection from "../components/CTASection";
import ProcessSection from "../components/ProcessSection";
import { defaultServices } from "../data/servicesData";
import { defaultProjects } from "../data/projectsData";
import { supabase } from "../lib/supabaseClient";

// Helper mapper to normalize Supabase columns to ProjectCard keys
const mapProject = (p) => {
  const toArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (typeof val === "string") {
      if (val.trim().startsWith("[")) {
        try {
          const parsed = JSON.parse(val);
          if (Array.isArray(parsed)) return parsed;
        } catch (e) {}
      }
      return val.split(",").map((s) => s.trim()).filter((s) => s.length > 0);
    }
    return [];
  };

  return {
    id: p.id,
    title: p.title,
    category: p.category,
    shortDesc: p.description,
    longDesc: p.description,
    features: toArray(p.features),
    technologies: toArray(p.tech_stack),
    demoUrl: p.live_demo,
    caseStudyUrl: "#",
    gradientClass: p.image_url && p.image_url.startsWith("from-") ? p.image_url : "from-slate-900 via-indigo-950 to-slate-900",
    imageUrl: p.image_url && !p.image_url.startsWith("from-") ? p.image_url : null,
    created_at: p.created_at
  };
};

export default function Home() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        if (data && data.length > 0) {
          setProjects(data.map(mapProject));
        }
      } catch (err) {
        console.error("Failed to load featured projects from Supabase:", err);
      }
    };

    fetchFeaturedProjects();
  }, []);

  const stats = [
    { value: "20+", label: "Projects & Concepts Built" },
    { value: "10+", label: "Digital Services" },
    { value: "Fast", label: "Delivery Approach" },
    { value: "24/7", label: "Client-Focused Support" }
  ];

  // Projects for the interactive CardStack (dynamic from Supabase, fallback to defaultProjects)
  const displayProjects = projects.length > 0 ? projects : defaultProjects;

  const processSteps = [
    { num: "01", name: "Understand", desc: "We deep-dive into your core startup idea and target customers." },
    { num: "02", name: "Plan", desc: "We structure modern architectures, budgets, and milestones." },
    { num: "03", name: "Design", desc: "We craft custom Figma visual flows focused on user psychology." },
    { num: "04", name: "Build", desc: "We write clean, high-performance, responsive codebase." },
    { num: "05", name: "Test", desc: "We execute meticulous quality audits to eliminate issues." },
    { num: "06", name: "Launch", desc: "We publish products and provide active post-launch support." }
  ];

  return (
    <div className="flex-grow z-10 w-full overflow-hidden bg-[#FAFAFA] dark:bg-[#090A0D] transition-colors duration-250">
      <SEO
        title="Nexnam | Website, App & Digital Solutions"
        description="Nexnam builds modern websites, apps, SaaS products and digital solutions for startups, creators and growing businesses."
      />

      {/* Editorial Hero Section */}
      <section className="relative flex items-center justify-center pt-10 sm:pt-14 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-8 bg-[#FAFAFA] dark:bg-[#090A0D] transition-colors duration-250">
        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          
          {/* Hero Left Content (56% desktop width) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Nexnam Badge Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/80 dark:bg-[#15171D] border border-slate-200/80 dark:border-white/10 text-xs font-semibold text-[#0B0D12] dark:text-slate-200 mb-4 sm:mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#5B5CF6] dark:bg-[#7C7DFF]" />
              <span>Website • Apps • Automation • SEO</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] text-[#0B0D12] dark:text-white leading-[1.08] sm:leading-[1.02] mb-4 sm:mb-6 font-sans"
            >
              Nexnam — Website, App &{" "}
              <span className="text-[#5B5CF6] dark:text-[#7C7DFF]">
                Digital Solutions
              </span>{" "}
              Startup
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm sm:text-lg text-[#5F6470] dark:text-[#A7ADB8] leading-relaxed mb-6 sm:mb-8 max-w-lg font-normal"
            >
              We create websites, landing pages, apps, dashboards, and digital systems that help startups, creators, and businesses grow online.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => {
                  playClick();
                  navigate("/contact");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onMouseEnter={playHover}
                className="w-full sm:w-auto h-12 sm:h-auto px-7 py-3.5 text-xs font-semibold tracking-wide text-white dark:text-[#090A0D] rounded-xl bg-[#111318] dark:bg-white hover:bg-[#1E222B] dark:hover:bg-slate-100 shadow-xs hover:-translate-y-[1px] transition-all duration-200 active:scale-[0.98] cursor-pointer flex items-center justify-center group"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  playClick();
                  navigate("/projects");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onMouseEnter={playHover}
                className="w-full sm:w-auto h-12 sm:h-auto px-7 py-3.5 text-xs font-semibold tracking-wide rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#15171D] hover:bg-slate-50 dark:hover:bg-[#1C1F27] text-[#0B0D12] dark:text-white transition-all duration-200 active:scale-[0.98] cursor-pointer shadow-2xs flex items-center justify-center"
              >
                View Our Work
              </button>
            </motion.div>
          </div>

          {/* Hero Right Visual Showcase — Interactive Spline 3D Scene */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex items-center justify-center relative w-full mt-6 lg:mt-0"
          >
            <div className="relative w-full h-[280px] xs:h-[320px] sm:h-[380px] md:h-[460px] lg:h-[520px] overflow-hidden rounded-2xl sm:rounded-[28px] pointer-events-auto flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,92,246,0.10),rgba(124,58,237,0.04)_35%,transparent_65%)] dark:bg-[radial-gradient(circle_at_center,rgba(124,125,255,0.14),rgba(91,92,246,0.05)_35%,transparent_65%)] pointer-events-none" />
              <div className="w-full h-full transform scale-100 sm:scale-[1.02] lg:scale-[1.06] translate-x-0 lg:translate-x-5 translate-y-2 lg:translate-y-6">
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Editorial Stats Bar */}
      <section className="py-8 sm:py-12 border-y border-slate-900/[0.08] dark:border-white/10 bg-white dark:bg-[#111318] relative px-4 sm:px-8 transition-colors duration-250">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex flex-col items-center justify-center text-center p-2"
              >
                <span className="text-2xl sm:text-4xl font-extrabold font-mono tracking-tight text-[#0B0D12] dark:text-white mb-1">
                  {stat.value}
                </span>
                <span className="text-[10px] sm:text-xs font-medium text-[#5F6470] dark:text-slate-400 tracking-wide uppercase font-mono">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 relative bg-[#FAFAFA] dark:bg-[#090A0D] transition-colors duration-250">
        <div className="mx-auto max-w-7xl flex flex-col items-center">
          <div className="text-center max-w-2xl mb-16">
            <span className="text-xs font-mono font-semibold tracking-widest text-[#5B5CF6] dark:text-[#7C7DFF] uppercase mb-3 block">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B0D12] dark:text-white mb-4">
              Our Digital Services
            </h2>
            <p className="text-sm sm:text-base text-[#5F6470] dark:text-slate-400 leading-relaxed">
              We engineer custom applications, stunning visual experiences, and robust automations designed to help modern business operations grow.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full mb-12"
          >
            <ServicesCarousel services={defaultServices} />
          </motion.div>

          <button
            onClick={() => {
              playClick();
              navigate("/services");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onMouseEnter={playHover}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-900/[0.12] dark:border-white/10 hover:border-[#0B0D12] dark:hover:border-white bg-white dark:bg-[#111318] text-xs font-semibold text-[#0B0D12] dark:text-white transition-all duration-200 cursor-pointer shadow-2xs"
          >
            View All Services
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Featured Projects Section — INTERACTIVE CARD STACK SHOWCASE */}
      <section className="py-28 px-6 sm:px-8 bg-[#0B0D12] dark:bg-[#060709] text-white relative overflow-hidden transition-colors duration-250">
        <div className="mx-auto max-w-7xl flex flex-col items-center">
          <div className="text-center max-w-2xl mb-12">
            <span className="text-xs font-mono font-semibold tracking-widest text-[#5B5CF6] dark:text-[#7C7DFF] uppercase mb-3 block">
              Case Studies
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Explore dynamic web applications and digital interfaces built for maximum usability.
            </p>
          </div>

          {/* Scroll Reveal Stack Container */}
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex justify-center mb-14"
          >
            <CardStack
              items={displayProjects}
              onOpenCaseStudy={(proj) => {
                navigate("/projects");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </motion.div>

          <button
            onClick={() => {
              playClick();
              navigate("/projects");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onMouseEnter={playHover}
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-slate-700 hover:border-slate-500 bg-slate-900 text-white text-xs font-semibold transition-all duration-200 cursor-pointer shadow-md"
          >
            Explore Projects Gallery
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </section>

      {/* Why Choose Nexnam */}
      <section className="py-24 px-6 sm:px-8 bg-[#F7F7F8] dark:bg-[#0D0F13] relative border-b border-slate-900/[0.08] dark:border-white/10 transition-colors duration-250">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-semibold tracking-widest text-[#5B5CF6] dark:text-[#7C7DFF] uppercase mb-3 block">
              The Nexnam Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B0D12] dark:text-white mb-4">
              Why Choose Nexnam
            </h2>
            <p className="text-sm sm:text-base text-[#5F6470] dark:text-slate-400 leading-relaxed">
              We combine design aesthetics with clean engineering practices to build solutions that scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {[
              { num: "01", icon: DollarSign, title: "Affordable Digital Solutions", desc: "Premium custom development scaled to fit startups and local businesses without enterprise overhead." },
              { num: "02", icon: Laptop, title: "Modern Responsive Design", desc: "Stunning, fluid visual architectures engineered to look pixel-perfect on mobile, tablet, and desktop screens." },
              { num: "03", icon: TrendingUp, title: "SEO-Friendly Development", desc: "Technical optimizations, clean schemas, and rapid speeds built-in to rank your brand at the top of Google." },
              { num: "04", icon: Zap, title: "Fast Delivery Approach", desc: "Agile, rapid MVP building pipelines designed to take your idea to market at breakneck startup velocity." },
              { num: "05", icon: HelpCircle, title: "Support After Launch", desc: "We don't leave after deployment. Receive constant system audits, bug fixes, and optimization help." },
              { num: "06", icon: Sliders, title: "Custom Solutions for Each Client", desc: "No cookie-cutter templates. Every line of code is tailored to your business operations and conversions." }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="bg-white dark:bg-[#13151A] rounded-2xl p-7 flex flex-col items-start border border-slate-900/[0.08] dark:border-white/10 shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_36px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 transition-all duration-300 relative group"
              >
                <div className="w-full flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-[#1A1D24] border border-slate-200 dark:border-white/10 flex items-center justify-center text-[#5B5CF6] dark:text-[#7C7DFF]">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-300 dark:text-slate-600 group-hover:text-[#5B5CF6] dark:group-hover:text-[#7C7DFF] transition-colors">
                    {item.num}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0B0D12] dark:text-white mb-2">{item.title}</h3>
                <p className="text-xs text-[#5F6470] dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section — CONNECTED TIMELINE */}
      <ProcessSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}


