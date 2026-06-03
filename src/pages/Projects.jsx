import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, CheckCircle, ExternalLink, Box } from "lucide-react";
import { updateSEO } from "../utils/seoHelper";
import ProjectCard from "../components/ProjectCard";
import { playClick, playHover } from "../utils/soundManager";
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

export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects((data || []).map(mapProject));
      setError(null);
    } catch (err) {
      console.error("Error loading projects from Supabase:", err);
      setError("Failed to sync project records from database cluster.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateSEO(
      "Our Projects Showcase | Nexnam",
      "Discover the custom applications, platforms, systems, and MVPs built by Nexnam. Read client case studies and explore live digital builds.",
      "Nexnam projects, case studies, software developer portfolio, MVP showcase"
    );

    fetchProjects();

    // Subscribe to realtime database updates
    const channel = supabase
      .channel("public-projects")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "projects" },
        () => {
          fetchProjects();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Filter Categories list
  const categories = ["All", "Platform", "AI", "System", "Productivity"];

  // Filter projects depending on selected tag
  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === "All") return true;
    
    const cat = project.category.toLowerCase();
    if (selectedCategory === "Platform") return cat.includes("platform") || cat.includes("commerce");
    if (selectedCategory === "AI") return cat.includes("ai");
    if (selectedCategory === "System") return cat.includes("system") || cat.includes("management");
    if (selectedCategory === "Productivity") return cat.includes("productivity") || cat.includes("solution");
    
    return cat.includes(selectedCategory.toLowerCase());
  });

  return (
    <div className="flex-grow z-10 w-full pt-32 pb-20 px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-xs text-brand-purple font-semibold tracking-wider uppercase font-mono mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Launch Gallery
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-6"
          >
            Projects Built with{" "}
            <span className="bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple bg-clip-text text-transparent">
              Nexnam Vision
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-white/60 leading-relaxed"
          >
            Explore some of our digital product concepts and web solutions designed for learning, business, productivity, and smart user experiences.
          </motion.p>
        </div>

        {/* Filter Categories Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playClick();
                setSelectedCategory(cat);
              }}
              onMouseEnter={playHover}
              className={`px-5 py-2.5 rounded-lg border text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-brand-cyan border-brand-cyan text-brand-black shadow-[0_0_15px_rgba(0,245,255,0.25)]"
                  : "bg-white/5 border-white/5 text-white/70 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-white/60 font-mono text-sm">Syncing projects with Supabase...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-10 max-w-md mx-auto bg-red-950/15 border border-red-500/20 rounded-2xl p-6 mb-10">
            <p className="text-red-400 font-mono text-sm mb-4">{error}</p>
            <button
              onClick={() => {
                playClick();
                setLoading(true);
                fetchProjects();
              }}
              className="px-4 py-2 bg-white/5 border border-white/10 hover:border-white/20 text-white text-xs font-mono rounded-lg transition-all cursor-pointer"
            >
              Try Reconnecting
            </button>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProjectCard
                    project={project}
                    index={idx}
                    onOpenCaseStudy={(proj) => setActiveCaseStudy(proj)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div className="text-center py-20 glass-card rounded-2xl border border-white/5">
            <p className="text-white/40 text-sm font-mono uppercase tracking-wider">
              No matching case studies found.
            </p>
          </div>
        )}

        {/* Case Study Detailed Modal */}
        <AnimatePresence>
          {activeCaseStudy && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-black/80 backdrop-blur-md">
              {/* Dismiss Area */}
              <div
                className="absolute inset-0 cursor-default"
                onClick={() => {
                  playClick();
                  setActiveCaseStudy(null);
                }}
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, cubicBezier: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl border border-white/15 p-6 md:p-10 z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
              >
                {/* Close Button */}
                <button
                  onClick={() => {
                    playClick();
                    setActiveCaseStudy(null);
                  }}
                  onMouseEnter={playHover}
                  className="absolute top-6 right-6 p-2 rounded-lg border border-white/10 hover:border-brand-cyan/40 bg-white/5 text-white/70 hover:text-white transition-all cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Banner Gradient Mock */}
                <div className={`w-full h-36 rounded-2xl bg-gradient-to-r ${activeCaseStudy.gradientClass || "from-cyan-500 to-blue-600"} opacity-70 mb-8 flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-grid-pattern opacity-40 mix-blend-overlay" />
                  <Box className="w-10 h-10 text-white animate-bounce" />
                </div>

                {/* Category & Title */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-brand-cyan" />
                  <span className="text-xs font-mono font-bold tracking-wider text-brand-cyan uppercase">
                    {activeCaseStudy.category}
                  </span>
                </div>
                <h2 className="text-3xl font-black text-white mb-4">
                  {activeCaseStudy.title}
                </h2>

                {/* Long detailed description */}
                <p className="text-sm text-white/70 leading-relaxed mb-6">
                  {activeCaseStudy.longDesc || activeCaseStudy.shortDesc}
                </p>

                {/* Features List */}
                <h3 className="text-sm font-bold font-mono text-brand-cyan uppercase tracking-wider mb-3">
                  Core Engineering Milestones //
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {activeCaseStudy.features &&
                    activeCaseStudy.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-white/60">
                        <CheckCircle className="w-4 h-4 text-brand-cyan mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                </ul>

                {/* Tech Stacks */}
                <h3 className="text-sm font-bold font-mono text-brand-purple uppercase tracking-wider mb-3">
                  System Architecture Stack //
                </h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {activeCaseStudy.technologies &&
                    activeCaseStudy.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-white/5 border border-white/5 text-white/80"
                      >
                        {tech}
                      </span>
                    ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <a
                    href={activeCaseStudy.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    className="w-full sm:w-auto relative inline-flex items-center justify-center px-6 py-3.5 text-xs font-bold tracking-wider uppercase text-brand-black rounded-lg bg-gradient-to-r from-brand-cyan to-brand-blue hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all duration-300 font-mono cursor-pointer"
                  >
                    Open Live Deployment
                    <ExternalLink className="ml-2 w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => {
                      playClick();
                      setActiveCaseStudy(null);
                      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-lg border border-white/10 hover:border-brand-purple/40 bg-white/5 text-xs font-bold font-mono uppercase tracking-wider text-white transition-all cursor-pointer"
                  >
                    Discuss Similar Build
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 p-8 md:p-12 glass-card rounded-3xl border border-white/5 bg-gradient-to-br from-indigo-950/10 to-slate-900/10 text-center max-w-4xl mx-auto relative overflow-hidden group hover:border-brand-purple/20 transition-all duration-300"
        >
          <div className="absolute top-[-30%] left-[-30%] w-64 h-64 bg-brand-cyan/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-[-30%] right-[-30%] w-64 h-64 bg-brand-purple/5 rounded-full blur-[80px] pointer-events-none" />
          
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
            Have an idea like this?
          </h2>
          <p className="text-sm text-white/60 leading-relaxed mb-8 max-w-xl mx-auto">
            Nexnam can help you turn your idea into a modern website, app, dashboard, or digital product.
          </p>
          <button
            onClick={() => {
              playClick();
              navigate("/contact");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onMouseEnter={playHover}
            className="relative inline-flex items-center justify-center px-8 py-3.5 text-xs font-bold tracking-wider uppercase text-brand-black rounded-lg bg-gradient-to-r from-brand-cyan to-brand-blue hover:shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all duration-300 font-mono cursor-pointer"
          >
            Start Your Project
          </button>
        </motion.div>
      </div>
    </div>
  );
}
