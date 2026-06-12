import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Flame, Compass, HeartHandshake, DollarSign, Laptop, TrendingUp, Zap, HelpCircle, Sliders } from "lucide-react";
import { playHover, playClick } from "../utils/soundManager";
import Hero3D from "../components/Hero3D";
import SEO from "../components/SEO";
import ServiceCard from "../components/ServiceCard";
import ProjectCard from "../components/ProjectCard";
import CTASection from "../components/CTASection";
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
    gradientClass: p.image_url && p.image_url.startsWith("from-") ? p.image_url : "from-cyan-500 via-blue-600 to-indigo-700",
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

  // Show top 3 services on home page
  const featuredServices = defaultServices.slice(0, 3);
  
  // Show top 2 projects on home page (dynamic from Supabase, fallback to defaultProjects)
  const featuredProjects = projects.length > 0 ? projects.slice(0, 2) : defaultProjects.slice(0, 2);

  const processSteps = [
    { num: "01", name: "Understand", desc: "We deep-dive into your core startup idea and target customers." },
    { num: "02", name: "Plan", desc: "We structure modern architectures, budgets, and milestones." },
    { num: "03", name: "Design", desc: "We craft custom Figma visual flows focused on user psychology." },
    { num: "04", name: "Build", desc: "We write clean, high-performance, responsive codebase." },
    { num: "05", name: "Test", desc: "We execute meticulous quality audits to eliminate issues." },
    { num: "06", name: "Launch", desc: "We publish products and provide active post-launch support." }
  ];

  return (
    <div className="flex-grow z-10 w-full overflow-hidden">
      <SEO
        title="Nexnam — Website, App & Digital Solutions Startup"
        description="Nexnam builds modern websites, apps, landing pages and digital solutions for startups, creators and businesses."
      />
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 px-6 sm:px-8">
        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Small glowing tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-xs text-brand-cyan font-bold tracking-wider uppercase font-mono mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Website • Apps • Automation • SEO
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1] mb-6"
            >
              Nexnam —{" "}
              <span className="bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple bg-clip-text text-transparent">
                Website, App & Digital Solutions
              </span>{" "}
              Startup
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-white/60 leading-relaxed mb-8 max-w-xl"
            >
              We create websites, landing pages, apps, dashboards, and digital systems that help startups, creators, and businesses grow online.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => {
                  playClick();
                  navigate("/contact");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onMouseEnter={playHover}
                className="w-full sm:w-auto relative inline-flex items-center justify-center px-8 py-4 text-xs font-bold tracking-wider uppercase text-brand-black rounded-lg bg-gradient-to-r from-brand-cyan to-brand-blue hover:shadow-[0_0_25px_rgba(0,245,255,0.4)] transition-all duration-300 active:scale-95 cursor-pointer font-mono group"
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
                className="w-full sm:w-auto px-8 py-4 text-xs font-bold tracking-wider uppercase rounded-lg border border-white/10 hover:border-brand-cyan/40 bg-white/5 hover:bg-brand-cyan/5 text-white transition-all duration-300 active:scale-95 cursor-pointer font-mono"
              >
                View Our Work
              </button>
            </motion.div>
          </div>

          {/* Hero Right Canvas 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 flex items-center justify-center relative w-full h-[400px] md:h-[450px]"
          >
            <Hero3D />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-white/5 bg-brand-black/40 backdrop-blur-sm relative px-6 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center justify-center text-center p-4"
              >
                <span className="text-3xl sm:text-4xl md:text-5xl font-black font-mono tracking-tight bg-gradient-to-r from-brand-cyan to-brand-blue bg-clip-text text-transparent mb-1">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white/50 font-mono tracking-wider uppercase">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-24 px-6 sm:px-8 relative">
        <div className="mx-auto max-w-7xl flex flex-col items-center">
          <div className="text-center max-w-2xl mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-brand-cyan uppercase mb-3 block">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
              Our Digital Services
            </h2>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed">
              We engineer custom applications, stunning visual experiences, and robust automations designed to help modern business operations grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-12">
            {featuredServices.map((service, idx) => (
              <ServiceCard key={service.id} service={service} index={idx} />
            ))}
          </div>

          <button
            onClick={() => {
              playClick();
              navigate("/services");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onMouseEnter={playHover}
            className="flex items-center gap-1.5 px-6 py-3 rounded-lg border border-white/10 hover:border-brand-cyan/40 bg-white/5 hover:bg-brand-cyan/5 text-xs font-bold text-white tracking-wider uppercase font-mono transition-all duration-300 cursor-pointer"
          >
            View All Services
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Why Choose Nexnam */}
      <section className="py-20 px-6 sm:px-8 bg-brand-black/35 relative">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-brand-purple uppercase mb-3 block">
              The Nexnam Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
              Why Choose Nexnam
            </h2>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed">
              We combine design aesthetics with clean engineering practices to build solutions that scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: DollarSign, title: "Affordable Digital Solutions", desc: "Premium custom development scaled to fit startups and local businesses without enterprise overhead.", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
              { icon: Laptop, title: "Modern Responsive Design", desc: "Stunning, fluid visual architectures engineered to look pixel-perfect on mobile, tablet, and desktop screens.", color: "text-brand-cyan bg-brand-cyan/10 border-brand-cyan/20" },
              { icon: TrendingUp, title: "SEO-Friendly Development", desc: "Technical optimizations, clean schemas, and rapid speeds built-in to rank your brand at the top of Google.", color: "text-brand-blue bg-brand-blue/10 border-brand-blue/20" },
              { icon: Zap, title: "Fast Delivery Approach", desc: "Agile, rapid MVP building pipelines designed to take your idea to market at breakneck startup velocity.", color: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
              { icon: HelpCircle, title: "Support After Launch", desc: "We don't leave after deployment. Receive constant system audits, bug fixes, and optimization help.", color: "text-brand-purple bg-brand-purple/10 border-brand-purple/20" },
              { icon: Sliders, title: "Custom Solutions for Each Client", desc: "No cookie-cutter templates. Every line of code is tailored to your business operations and conversions.", color: "text-pink-400 bg-pink-400/10 border-pink-400/20" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="glass-card rounded-2xl p-6 md:p-8 flex flex-col items-start border border-white/5"
              >
                <div className={`w-11 h-11 rounded-lg border flex items-center justify-center mb-5 ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 px-6 sm:px-8 relative">
        <div className="mx-auto max-w-7xl flex flex-col items-center">
          <div className="text-center max-w-2xl mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-brand-cyan uppercase mb-3 block">
              Case Studies
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed">
              Explore dynamic web applications and digital interfaces built for maximum usability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-12">
            {featuredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                onOpenCaseStudy={(proj) => {
                  navigate("/projects");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            ))}
          </div>

          <button
            onClick={() => {
              playClick();
              navigate("/projects");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onMouseEnter={playHover}
            className="flex items-center gap-1.5 px-6 py-3 rounded-lg border border-white/10 hover:border-brand-cyan/40 bg-white/5 hover:bg-brand-cyan/5 text-xs font-bold text-white tracking-wider uppercase font-mono transition-all duration-300 cursor-pointer"
          >
            Explore Projects Gallery
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 sm:px-8 bg-brand-black/35 relative">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-brand-purple uppercase mb-3 block">
              How We Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
              Our Process
            </h2>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed">
              We break down custom software development into reliable milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-6 rounded-2xl glass-card border border-white/5 relative group hover:border-brand-cyan/15 transition-all duration-300"
              >
                <div className="absolute top-4 right-6 text-3xl font-black font-mono text-brand-cyan/10 group-hover:text-brand-cyan/20 transition-colors">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-mono flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                  {step.name}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
