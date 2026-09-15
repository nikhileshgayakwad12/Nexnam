import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, CheckCircle, ExternalLink, Globe } from "lucide-react";
import SEO from "../components/SEO";
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
    gradientClass: p.image_url && p.image_url.startsWith("from-") ? p.image_url : "from-slate-900 via-indigo-950 to-slate-900",
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

  const featuredProducts = filteredProjects.filter(p => 
    p.category.toLowerCase().includes("property") || 
    p.category.toLowerCase().includes("ai") ||
    p.category.toLowerCase().includes("management") ||
    p.id === "kirayapro" ||
    p.id === "leftover-chef-ai"
  );
  
  const websiteConcepts = filteredProjects.filter(p => 
    !p.category.toLowerCase().includes("property") && 
    !p.category.toLowerCase().includes("ai") &&
    !p.category.toLowerCase().includes("management") &&
    p.id !== "kirayapro" &&
    p.id !== "leftover-chef-ai"
  );

  return (
    <div className="flex-grow z-10 w-full pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-8 bg-[#FAFAFA]">
      <SEO
        title="Projects Built with Nexnam Vision | Nexnam"
        description="View Nexnam projects, website concepts, apps and digital solutions built for businesses, learning and productivity."
      />
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs text-[#0B0D12] font-semibold mb-6 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#5B5CF6]" />
            Launch Gallery
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0B0D12] mb-6"
          >
            Projects Built with{" "}
            <span className="bg-gradient-to-r from-[#0B0D12] via-[#5B5CF6] to-[#7C3AED] bg-clip-text text-transparent">
              Nexnam Vision
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg text-[#5F6470] leading-relaxed"
          >
            Explore digital product concepts and web solutions designed for learning, business, productivity, and smart user experiences.
          </motion.p>
        </div>

        {/* Filter Categories Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playClick();
                setSelectedCategory(cat);
              }}
              onMouseEnter={playHover}
              className={`px-5 py-2 rounded-xl border text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#111318] border-[#111318] text-white shadow-sm"
                  : "bg-white border-slate-900/[0.08] text-[#5F6470] hover:border-slate-400 hover:text-[#0B0D12] shadow-2xs"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-[#5B5CF6] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-[#5F6470] font-mono text-sm">Syncing projects with Supabase...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-10 max-w-md mx-auto bg-red-50 border border-red-200 rounded-2xl p-6 mb-10 shadow-2xs">
            <p className="text-red-600 font-mono text-sm mb-4">{error}</p>
            <button
              onClick={() => {
                playClick();
                setLoading(true);
                fetchProjects();
              }}
              className="px-4 py-2 bg-white border border-slate-200 hover:border-slate-300 text-[#0B0D12] text-xs font-mono rounded-lg transition-all cursor-pointer shadow-2xs"
            >
              Try Reconnecting
            </button>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          selectedCategory === "All" ? (
            <div className="space-y-16">
              {/* Featured Digital Products Section */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B0D12] mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#5B5CF6]" />
                  Featured Digital Products
                </h2>
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
                >
                  <AnimatePresence mode="popLayout">
                    {featuredProducts.map((project, idx) => (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.3 }}
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
              </div>

              {/* Client-Ready Website Concepts Section */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B0D12] mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
                  Client-Ready Website Concepts
                </h2>
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
                >
                  <AnimatePresence mode="popLayout">
                    {websiteConcepts.map((project, idx) => (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.3 }}
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
              </div>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
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
          )
        )}

        {/* Empty state */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-2xs">
            <p className="text-[#8A8F98] text-sm font-medium">
              No matching case studies found.
            </p>
          </div>
        )}

        {/* Case Study Detailed Modal */}
        <AnimatePresence>
          {activeCaseStudy && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0D12]/70 backdrop-blur-md">
              <div
                className="absolute inset-0 cursor-default"
                onClick={() => {
                  playClick();
                  setActiveCaseStudy(null);
                }}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 15 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl border border-slate-200 p-6 md:p-10 z-10 shadow-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={() => {
                    playClick();
                    setActiveCaseStudy(null);
                  }}
                  onMouseEnter={playHover}
                  className="absolute top-6 right-6 p-2 rounded-xl border border-slate-200 hover:border-slate-400 bg-slate-50 text-[#0B0D12] transition-all cursor-pointer shadow-2xs"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Banner Browser Mockup */}
                <div className="w-full aspect-[16/7] rounded-2xl bg-slate-950 mb-8 flex flex-col overflow-hidden border border-slate-800">
                  <div className="h-7 w-full bg-slate-900 px-3 flex items-center justify-between shrink-0 select-none border-b border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">nexnam.app/{activeCaseStudy.id}</span>
                    <div className="w-4" />
                  </div>
                  <div className="flex-grow flex items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-center">
                    <h4 className="text-2xl font-bold text-white tracking-tight">{activeCaseStudy.title}</h4>
                  </div>
                </div>

                {/* Category & Title */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#5B5CF6]" />
                  <span className="text-xs font-semibold text-[#5B5CF6] uppercase">
                    {activeCaseStudy.category}
                  </span>
                </div>
                <h2 className="text-3xl font-extrabold text-[#0B0D12] mb-4">
                  {activeCaseStudy.title}
                </h2>

                <p className="text-sm text-[#5F6470] leading-relaxed mb-8">
                  {activeCaseStudy.longDesc || activeCaseStudy.shortDesc}
                </p>

                {/* Features List */}
                <h3 className="text-xs font-bold text-[#0B0D12] uppercase tracking-wider mb-4 font-mono">
                  Core Engineering Milestones
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {activeCaseStudy.features &&
                    activeCaseStudy.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[#5F6470]">
                        <CheckCircle className="w-4 h-4 text-[#5B5CF6] mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                </ul>

                {/* Tech Stack */}
                <h3 className="text-xs font-bold text-[#0B0D12] uppercase tracking-wider mb-4 font-mono">
                  System Architecture Stack
                </h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {activeCaseStudy.technologies &&
                    activeCaseStudy.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 border border-slate-200 text-[#0B0D12]"
                      >
                        {tech}
                      </span>
                    ))}
                </div>

                {/* Modal CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 border-t border-slate-100">
                  <a
                    href={activeCaseStudy.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    className="w-full sm:w-auto relative inline-flex items-center justify-center px-6 py-3.5 text-xs font-semibold text-white rounded-xl bg-[#5B5CF6] hover:bg-[#4F50E2] transition-all duration-200 cursor-pointer shadow-sm"
                  >
                    Open Live Deployment
                    <ExternalLink className="ml-2 w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => {
                      playClick();
                      setActiveCaseStudy(null);
                      navigate("/contact");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-200 hover:border-[#0B0D12] bg-white text-xs font-semibold text-[#0B0D12] transition-all duration-200 cursor-pointer shadow-2xs"
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
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 p-8 md:p-12 bg-[#111318] text-white rounded-3xl border border-slate-800 text-center max-w-4xl mx-auto relative overflow-hidden shadow-xl"
        >
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
            Have an Idea Like This?
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed mb-8 max-w-xl mx-auto">
            Nexnam can help you turn your idea into a modern website, app, dashboard, or digital product.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                playClick();
                navigate("/contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onMouseEnter={playHover}
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold text-[#0B0D12] rounded-xl bg-white hover:bg-slate-100 transition-all duration-200 cursor-pointer shadow-md"
            >
              Start Your Project
            </button>
            <button
              onClick={() => {
                playClick();
                navigate("/services");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onMouseEnter={playHover}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-slate-700 hover:border-slate-500 bg-slate-900 text-white text-xs font-semibold transition-all duration-200 cursor-pointer shadow-2xs"
            >
              Explore Our Services
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

