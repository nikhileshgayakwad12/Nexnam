import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock, Mail, KeyRound, LayoutDashboard, Briefcase, Settings, 
  MessageSquare, Users, Database, LogOut, Plus, Trash2, Edit, X, Sparkles, Check
} from "lucide-react";
import { updateSEO } from "../utils/seoHelper";
import { playHover, playClick, playSuccess } from "../utils/soundManager";
import { defaultServices } from "../data/servicesData";
import { defaultProjects } from "../data/projectsData";
import { supabase } from "../lib/supabaseClient";

// Date formatting helper
const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  try {
    return new Date(dateStr).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch (e) {
    return dateStr;
  }
};

export default function AdminPanel() {
  // Authentication States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Tab State
  const [activeTab, setActiveTab] = useState("overview"); // overview, services, projects, inquiries

  // Data States
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [mockVisitors, setMockVisitors] = useState(1428);

  // CRUD Modals States
  const [serviceModal, setServiceModal] = useState({ open: false, mode: "add", data: null });
  const [projectModal, setProjectModal] = useState({ open: false, mode: "add", data: null });

  // Form inputs for Service Modal
  const [serviceForm, setServiceForm] = useState({
    id: "",
    title: "",
    iconName: "Globe",
    shortDesc: "",
    featuresString: ""
  });

  // Form inputs for Project Modal
  const [projectForm, setProjectForm] = useState({
    id: "",
    title: "",
    category: "",
    shortDesc: "",
    longDesc: "",
    technologiesString: "",
    featuresString: "",
    gradientClass: "from-cyan-500 via-blue-600 to-indigo-700",
    demoUrl: "",
    caseStudyUrl: "#"
  });

  // Initial Sync and Auth setups
  useEffect(() => {
    updateSEO("Secure Admin Console | Nexnam", "Secure administrative platform for managing Nexnam's startup records.");

    if (!localStorage.getItem("nexnam_services")) {
      localStorage.setItem("nexnam_services", JSON.stringify(defaultServices));
    }
    setServices(JSON.parse(localStorage.getItem("nexnam_services")));
    setMockVisitors(1428);

    // Initial check of the auth session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    // Listen for auth changes
    const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      authSub.unsubscribe();
    };
  }, []);

  // Fetch Supabase Projects & Inquiries dynamically when logged in
  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      console.error("Error loading projects from Supabase in AdminPanel:", err);
    }
  };

  const fetchInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setInquiries(data || []);
    } catch (err) {
      console.error("Error loading inquiries from Supabase in AdminPanel:", err);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;

    fetchProjects();
    fetchInquiries();

    // Subscribe to projects realtime changes
    const projectsChannel = supabase
      .channel("admin-projects-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "projects" },
        () => {
          fetchProjects();
        }
      )
      .subscribe();

    // Subscribe to messages realtime changes
    const inquiriesChannel = supabase
      .channel("admin-inquiries-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contact_messages" },
        () => {
          fetchInquiries();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(projectsChannel);
      supabase.removeChannel(inquiriesChannel);
    };
  }, [isLoggedIn]);

  // Increment mock visitors count slowly
  useEffect(() => {
    if (!isLoggedIn) return;
    const interval = setInterval(() => {
      setMockVisitors((prev) => prev + Math.floor(Math.random() * 2) + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    playClick();
    setLoginError("");

    if (!loginEmail || !loginPassword) {
      setLoginError("Please fill out all fields.");
      return;
    }

    setIsLoggingIn(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) throw error;
      playSuccess();
    } catch (err) {
      console.error("Authentication error:", err);
      setLoginError("Invalid email or password.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    playClick();
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  // Delete Inquiries
  const handleDeleteInquiry = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    playClick();
    try {
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", id);
      if (error) throw error;
      fetchInquiries();
    } catch (err) {
      console.error("Error deleting inquiry:", err);
      alert("Failed to delete message: " + err.message);
    }
  };

  // Toggle Read Inquiry status
  const handleToggleReadInquiry = async (id, currentStatus) => {
    playClick();
    try {
      const { error } = await supabase
        .from("contact_messages")
        .update({ is_read: !currentStatus })
        .eq("id", id);
      if (error) throw error;
      fetchInquiries();
    } catch (err) {
      console.error("Error toggling inquiry read status:", err);
      alert("Failed to toggle read status: " + err.message);
    }
  };

  // Delete Services
  const handleDeleteService = (id) => {
    playClick();
    const updated = services.filter((srv) => srv.id !== id);
    setServices(updated);
    localStorage.setItem("nexnam_services", JSON.stringify(updated));
  };

  // Delete Projects
  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    playClick();
    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);
      if (error) throw error;
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Failed to delete project: " + err.message);
    }
  };

  // Save Service (Create/Update)
  const handleSaveService = (e) => {
    e.preventDefault();
    playClick();

    if (!serviceForm.title.trim() || !serviceForm.shortDesc.trim() || !serviceForm.featuresString.trim()) {
      alert("All fields are required");
      return;
    }

    const featuresArray = serviceForm.featuresString
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    let updatedServices = [...services];

    if (serviceModal.mode === "add") {
      const newService = {
        id: serviceForm.title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
        title: serviceForm.title,
        iconName: serviceForm.iconName,
        shortDesc: serviceForm.shortDesc,
        features: featuresArray
      };
      updatedServices.push(newService);
    } else {
      updatedServices = services.map((srv) =>
        srv.id === serviceModal.data.id
          ? {
              ...srv,
              title: serviceForm.title,
              iconName: serviceForm.iconName,
              shortDesc: serviceForm.shortDesc,
              features: featuresArray
            }
          : srv
      );
    }

    setServices(updatedServices);
    localStorage.setItem("nexnam_services", JSON.stringify(updatedServices));
    setServiceModal({ open: false, mode: "add", data: null });
  };

  // Save Project (Create/Update)
  const handleSaveProject = async (e) => {
    e.preventDefault();
    playClick();

    if (!projectForm.title.trim() || !projectForm.category.trim() || !projectForm.shortDesc.trim()) {
      alert("Please fill out the primary fields");
      return;
    }

    const techsArray = projectForm.technologiesString
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const featuresArray = projectForm.featuresString
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const projectData = {
      title: projectForm.title,
      category: projectForm.category,
      description: projectForm.shortDesc,
      features: featuresArray,
      tech_stack: techsArray,
      image_url: projectForm.gradientClass,
      live_demo: projectForm.demoUrl || "https://nexnam.demo"
    };

    try {
      if (projectModal.mode === "add") {
        // Generate a valid UUID (v4)
        const newUuid = (typeof crypto !== "undefined" && crypto.randomUUID) 
          ? crypto.randomUUID() 
          : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
              const r = (Math.random() * 16) | 0;
              const v = c === "x" ? r : (r & 0x3) | 0x8;
              return v.toString(16);
            });

        const { error } = await supabase
          .from("projects")
          .insert([{ id: newUuid, ...projectData }]);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", projectForm.id);
        if (error) throw error;
      }

      setProjectModal({ open: false, mode: "add", data: null });
      fetchProjects();
      playSuccess();
    } catch (err) {
      console.error("Error saving project:", err);
      alert("Failed to save project. " + err.message);
    }
  };

  const openAddServiceModal = () => {
    playClick();
    setServiceForm({
      id: "",
      title: "",
      iconName: "Globe",
      shortDesc: "",
      featuresString: ""
    });
    setServiceModal({ open: true, mode: "add", data: null });
  };

  const openEditServiceModal = (srv) => {
    playClick();
    setServiceForm({
      id: srv.id,
      title: srv.title,
      iconName: srv.iconName || "Globe",
      shortDesc: srv.shortDesc,
      featuresString: srv.features ? srv.features.join(", ") : ""
    });
    setServiceModal({ open: true, mode: "edit", data: srv });
  };

  const openAddProjectModal = () => {
    playClick();
    setProjectForm({
      id: "",
      title: "",
      category: "",
      shortDesc: "",
      longDesc: "",
      technologiesString: "",
      featuresString: "",
      gradientClass: "from-cyan-500 via-blue-600 to-indigo-700",
      demoUrl: "",
      caseStudyUrl: "#"
    });
    setProjectModal({ open: true, mode: "add", data: null });
  };

  const openEditProjectModal = (proj) => {
    playClick();
    
    // Normalize features and technologies to array (if they are string/array)
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

    const techList = toArray(proj.tech_stack || proj.technologies);
    const featList = toArray(proj.features);

    setProjectForm({
      id: proj.id,
      title: proj.title,
      category: proj.category,
      shortDesc: proj.description || proj.shortDesc || "",
      longDesc: proj.description || proj.longDesc || "",
      technologiesString: techList.join(", "),
      featuresString: featList.join(", "),
      gradientClass: proj.image_url && proj.image_url.startsWith("from-") ? proj.image_url : (proj.gradientClass || "from-cyan-500 via-blue-600 to-indigo-700"),
      demoUrl: proj.live_demo || proj.demoUrl || "",
      caseStudyUrl: "#"
    });
    setProjectModal({ open: true, mode: "edit", data: proj });
  };

  return (
    <div className="flex-grow z-10 w-full min-h-screen text-white bg-[#030303]">
      {!isLoggedIn ? (
        /* Secure-Looking Login Screen */
        <div className="flex items-center justify-center min-h-[90vh] px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md p-8 rounded-3xl glass-card border border-white/5 relative overflow-hidden"
          >
            {/* Ambient gradients */}
            <div className="absolute top-[-30%] left-[-30%] w-64 h-64 bg-brand-cyan/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-[-30%] right-[-30%] w-64 h-64 bg-brand-purple/10 rounded-full blur-[80px]" />

            <div className="flex flex-col items-center mb-8 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-cyan to-brand-purple p-[1px] mb-4">
                <div className="w-full h-full rounded-[11px] bg-brand-black flex items-center justify-center">
                  <Lock className="w-5 h-5 text-brand-cyan" />
                </div>
              </div>
              <h1 className="text-xl font-bold tracking-tight">Nexnam Admin Vault</h1>
              <p className="text-xs text-white/40 mt-1.5 font-mono uppercase tracking-wider">
                Authorized Credentials Required
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5 relative z-10">
              {loginError && (
                <div className="p-3.5 rounded-lg border border-red-500/20 bg-red-500/10 text-xs text-red-400 font-mono text-center">
                  {loginError}
                </div>
              )}

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono font-bold text-white/60 tracking-wider">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-white/30" />
                  <input
                    type="email"
                    placeholder="admin@nexnam.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    onMouseEnter={playHover}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-brand-cyan transition-colors text-white"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono font-bold text-white/60 tracking-wider">
                  Vault Key
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-3.5 w-4 h-4 text-white/30" />
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    onMouseEnter={playHover}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-brand-cyan transition-colors text-white"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoggingIn}
                onMouseEnter={playHover}
                className="w-full py-3.5 rounded-lg bg-gradient-to-r from-brand-cyan to-brand-blue hover:shadow-[0_0_20px_rgba(0,245,255,0.3)] text-brand-black text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center"
              >
                {isLoggingIn ? "Authenticating Core..." : "Open Admin Portal //"}
              </button>
            </form>
          </motion.div>
        </div>
      ) : (
        /* Interactive Dashboard CRM Console */
        <div className="mx-auto max-w-7xl px-6 py-28 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Dashboard Sidebar Drawer */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 glass-card rounded-2xl p-4 border border-white/5"
          >
            {/* Logo block */}
            <div className="flex items-center gap-2 px-3 py-4 border-b border-white/5 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan" />
              <span className="font-mono font-bold text-xs tracking-widest text-brand-cyan uppercase">
                Core Console
              </span>
            </div>

            <nav className="flex flex-col gap-1.5">
              {[
                { name: "Overview", id: "overview", icon: LayoutDashboard },
                { name: "Services", id: "services", icon: Settings },
                { name: "Projects", id: "projects", icon: Briefcase },
                { name: "Inquiries", id: "inquiries", icon: MessageSquare }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    playClick();
                    setActiveTab(tab.id);
                  }}
                  onMouseEnter={playHover}
                  className={`w-full px-4 py-3 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-3 cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-brand-cyan/15 border border-brand-cyan/20 text-brand-cyan shadow-[0_0_15px_rgba(0,245,255,0.05)]"
                      : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <tab.icon className="w-4 h-4 shrink-0" />
                  {tab.name}
                </button>
              ))}

              <div className="h-[1px] bg-white/5 my-4" />

              <button
                onClick={handleLogout}
                onMouseEnter={playHover}
                className="w-full px-4 py-3 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-colors hover:bg-red-500/10 text-red-400 flex items-center gap-3 cursor-pointer"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                Sign Out
              </button>
            </nav>
          </motion.div>

          {/* Tab Viewport */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-9"
          >
            {activeTab === "overview" && (
              /* Overview Analytics Grid */
              <div className="flex flex-col gap-8">
                {/* Stats panel cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { title: "Mock Visitors", value: mockVisitors, icon: Users, color: "text-brand-cyan bg-brand-cyan/10" },
                    { title: "Client Briefs", value: inquiries.length, icon: MessageSquare, color: "text-brand-purple bg-brand-purple/10" },
                    { title: "Catalog Services", value: services.length, icon: Settings, color: "text-brand-blue bg-brand-blue/10" },
                    { title: "Portfolio Builds", value: projects.length, icon: Briefcase, color: "text-yellow-400 bg-yellow-400/10" }
                  ].map((stat, idx) => (
                    <div key={idx} className="glass-card rounded-xl p-5 border border-white/5 flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-black font-mono block text-white">{stat.value}</span>
                        <span className="text-[10px] text-white/40 font-mono tracking-wider uppercase mt-1 block">
                          {stat.title}
                        </span>
                      </div>
                      <div className={`p-2 rounded-lg ${stat.color}`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Inquiries Quick Table */}
                <div className="glass-card rounded-2xl border border-white/5 p-6">
                  <h3 className="text-sm font-bold font-mono text-brand-cyan tracking-wider uppercase mb-4 flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Incoming Client Inquiry Logs //
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-white/5 text-white/40 uppercase">
                          <th className="py-3 px-4">Date</th>
                          <th className="py-3 px-4">Client</th>
                          <th className="py-3 px-4">Service</th>
                          <th className="py-3 px-4">Budget</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inquiries.slice(0, 5).map((inq) => (
                          <tr key={inq.id} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${!inq.is_read ? "bg-white/[0.02]" : ""}`}>
                            <td className="py-3 px-4 text-white/50">{formatDate(inq.created_at)}</td>
                            <td className="py-3 px-4 font-bold text-white">
                              {inq.name} {!inq.is_read && <span className="ml-2 w-1.5 h-1.5 inline-block rounded-full bg-brand-cyan" title="New Inquiry" />}
                            </td>
                            <td className="py-3 px-4 text-brand-cyan">{inq.service}</td>
                            <td className="py-3 px-4 text-brand-purple">{inq.budget}</td>
                          </tr>
                        ))}
                        {inquiries.length === 0 && (
                          <tr>
                            <td colSpan={4} className="py-8 text-center text-white/30 uppercase tracking-widest text-[10px]">
                              Zero client submissions available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "services" && (
              /* Services CRUD Management */
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <h2 className="text-lg font-mono font-bold text-brand-cyan uppercase tracking-wider">
                    Service Catalog Matrix
                  </h2>
                  <button
                    onClick={openAddServiceModal}
                    onMouseEnter={playHover}
                    className="px-4 py-2 rounded-lg bg-brand-cyan hover:bg-brand-cyan/95 text-brand-black font-mono font-bold text-xs uppercase tracking-wider cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Add Service
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((srv) => (
                    <div
                      key={srv.id}
                      className="glass-card rounded-xl p-5 border border-white/5 flex flex-col justify-between hover:border-brand-cyan/30 transition-all duration-300"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2 py-0.5 rounded bg-brand-cyan/10 border border-brand-cyan/20 text-[10px] font-mono text-brand-cyan">
                            {srv.iconName}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEditServiceModal(srv)}
                              className="p-1.5 rounded hover:bg-white/5 text-white/60 hover:text-white transition-colors cursor-pointer"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteService(srv.id)}
                              className="p-1.5 rounded hover:bg-red-500/10 text-white/60 hover:text-red-400 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <h4 className="text-base font-bold text-white mb-2">{srv.title}</h4>
                        <p className="text-xs text-white/50 leading-relaxed mb-4">{srv.shortDesc}</p>
                      </div>

                      {/* Small badge count */}
                      <span className="text-[10px] text-white/35 font-mono uppercase">
                        {srv.features ? srv.features.length : 0} feature bullet(s)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "projects" && (
              /* Projects CRUD Management */
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <h2 className="text-lg font-mono font-bold text-brand-cyan uppercase tracking-wider">
                    Portfolio Projects Catalog
                  </h2>
                  <button
                    onClick={openAddProjectModal}
                    onMouseEnter={playHover}
                    className="px-4 py-2 rounded-lg bg-brand-cyan hover:bg-brand-cyan/95 text-brand-black font-mono font-bold text-xs uppercase tracking-wider cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Add Project
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="glass-card rounded-xl p-5 border border-white/5 flex flex-col justify-between hover:border-brand-cyan/30 transition-all duration-300"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2 py-0.5 rounded bg-brand-purple/10 border border-brand-purple/20 text-[10px] font-mono text-brand-purple">
                            {proj.category}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEditProjectModal(proj)}
                              className="p-1.5 rounded hover:bg-white/5 text-white/60 hover:text-white transition-colors cursor-pointer"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className="p-1.5 rounded hover:bg-red-500/10 text-white/60 hover:text-red-400 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <h4 className="text-base font-bold text-white mb-2">{proj.title}</h4>
                        <p className="text-xs text-white/50 leading-relaxed mb-4">{proj.shortDesc}</p>
                      </div>

                      {/* Tech badges preview */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {proj.technologies &&
                          proj.technologies.slice(0, 3).map((t) => (
                            <span key={t} className="px-1.5 py-0.5 bg-white/5 text-[9px] font-mono text-white/60">
                              {t}
                            </span>
                          ))}
                        {proj.technologies && proj.technologies.length > 3 && (
                          <span className="text-[9px] font-mono text-white/40">+{proj.technologies.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "inquiries" && (
              /* Client Inquiries Console */
              <div className="flex flex-col gap-6">
                <div className="border-b border-white/5 pb-4">
                  <h2 className="text-lg font-mono font-bold text-brand-cyan uppercase tracking-wider">
                    Client Inquiries List
                  </h2>
                </div>

                <div className="flex flex-col gap-4">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className={`glass-card rounded-2xl p-6 border transition-all duration-300 relative ${
                        !inq.is_read ? "border-brand-cyan/35 bg-brand-cyan/[0.02]" : "border-white/5 hover:border-brand-purple/30"
                      }`}
                    >
                      {/* Read/Unread toggle icon */}
                      <button
                        onClick={() => handleToggleReadInquiry(inq.id, inq.is_read)}
                        className={`absolute top-6 right-16 p-2 rounded hover:bg-white/10 transition-colors cursor-pointer ${
                          inq.is_read ? "text-emerald-400" : "text-amber-500 animate-pulse"
                        }`}
                        title={inq.is_read ? "Mark as Unread" : "Mark as Read"}
                      >
                        {inq.is_read ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                      </button>

                      {/* Delete button */}
                      <button
                        onClick={() => handleDeleteInquiry(inq.id)}
                        className="absolute top-6 right-6 p-2 rounded hover:bg-red-500/10 text-white/60 hover:text-red-400 transition-colors cursor-pointer"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex flex-wrap gap-3 items-center mb-4">
                        <span className="text-xs font-mono text-white/40">{formatDate(inq.created_at)}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-brand-cyan/15 text-brand-cyan text-[10px] font-mono font-bold uppercase">
                          {inq.service}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-brand-purple/15 text-brand-purple text-[10px] font-mono font-bold uppercase">
                          {inq.budget}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-white mb-1">
                        {inq.name} {!inq.is_read && <span className="ml-2 px-1.5 py-0.5 rounded text-[8px] bg-brand-cyan/20 text-brand-cyan uppercase tracking-wider font-mono">New</span>}
                      </h4>
                      <p className="text-xs font-mono text-white/40 mb-4">
                        Email: {inq.email} | Phone: {inq.phone}
                      </p>

                      {/* Message packet */}
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-white/70 leading-relaxed font-mono">
                        {inq.message}
                      </div>
                    </div>
                  ))}

                  {inquiries.length === 0 && (
                    <div className="text-center py-20 glass-card rounded-xl border border-white/5 uppercase tracking-widest text-xs text-white/30">
                      No customer briefings submitted yet.
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Services Modal Dialog (CRUD) */}
      <AnimatePresence>
        {serviceModal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg p-6 rounded-2xl glass-card border border-white/10 z-10"
            >
              {/* Dismiss Button */}
              <button
                onClick={() => setServiceModal({ open: false, mode: "add", data: null })}
                className="absolute top-4 right-4 p-1.5 rounded hover:bg-white/5 text-white/60 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-lg font-mono font-bold text-brand-cyan uppercase tracking-wider mb-6">
                {serviceModal.mode === "add" ? "Add Service Entry" : "Modify Service Entry"}
              </h3>

              <form onSubmit={handleSaveService} className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-white/50">Service Title</label>
                  <input
                    type="text"
                    value={serviceForm.title}
                    onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-brand-cyan text-white"
                    placeholder="e.g. Smart Automation"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-white/50">Icon Component</label>
                    <select
                      value={serviceForm.iconName}
                      onChange={(e) => setServiceForm({ ...serviceForm, iconName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-brand-dark border border-white/10 text-sm focus:outline-none focus:border-brand-cyan text-white appearance-none cursor-pointer"
                    >
                      {["Globe", "Layout", "Cpu", "Smartphone", "Figma", "User", "Rocket", "Zap", "Code2", "TrendingUp"].map(
                        (ic) => (
                          <option key={ic} value={ic}>
                            {ic}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-white/50">Short Description</label>
                  <textarea
                    value={serviceForm.shortDesc}
                    onChange={(e) => setServiceForm({ ...serviceForm, shortDesc: e.target.value })}
                    rows={3}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-brand-cyan text-white resize-none"
                    placeholder="Provide customer-focused benefit description..."
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-white/50">Features List (Comma-separated)</label>
                  <input
                    type="text"
                    value={serviceForm.featuresString}
                    onChange={(e) => setServiceForm({ ...serviceForm, featuresString: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-brand-cyan text-white"
                    placeholder="Feature 1, Feature 2, Feature 3"
                  />
                  <span className="text-[10px] text-white/30 font-mono">
                    Separate each item with a comma.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-brand-cyan hover:bg-brand-cyan/95 text-brand-black text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Save Service Record
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Projects Modal Dialog (CRUD) */}
      <AnimatePresence>
        {projectModal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl p-6 rounded-2xl glass-card border border-white/10 z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Dismiss Button */}
              <button
                onClick={() => setProjectModal({ open: false, mode: "add", data: null })}
                className="absolute top-4 right-4 p-1.5 rounded hover:bg-white/5 text-white/60 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-lg font-mono font-bold text-brand-purple uppercase tracking-wider mb-6">
                {projectModal.mode === "add" ? "Add Project Record" : "Modify Project Record"}
              </h3>

              <form onSubmit={handleSaveProject} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-white/50">Project Title</label>
                    <input
                      type="text"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-brand-cyan text-white"
                      placeholder="e.g. LocalConnect"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-white/50">Category</label>
                    <input
                      type="text"
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-brand-cyan text-white"
                      placeholder="e.g. Social Commerce Platform"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-white/50">Short Description</label>
                  <input
                    type="text"
                    value={projectForm.shortDesc}
                    onChange={(e) => setProjectForm({ ...projectForm, shortDesc: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-brand-cyan text-white"
                    placeholder="Enter short snippet..."
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-white/50">Long Case Study Description</label>
                  <textarea
                    value={projectForm.longDesc}
                    onChange={(e) => setProjectForm({ ...projectForm, longDesc: e.target.value })}
                    rows={3}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-brand-cyan text-white resize-none"
                    placeholder="Enter complete historical details..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-white/50">Technologies (Comma-separated)</label>
                    <input
                      type="text"
                      value={projectForm.technologiesString}
                      onChange={(e) => setProjectForm({ ...projectForm, technologiesString: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-brand-cyan text-white"
                      placeholder="React.js, Tailwind, MongoDB"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-white/50">Features (Comma-separated)</label>
                    <input
                      type="text"
                      value={projectForm.featuresString}
                      onChange={(e) => setProjectForm({ ...projectForm, featuresString: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-brand-cyan text-white"
                      placeholder="Radius Search, Geolocation, Socket.io"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-white/50">Gradient Accent Layout</label>
                    <select
                      value={projectForm.gradientClass}
                      onChange={(e) => setProjectForm({ ...projectForm, gradientClass: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-brand-dark border border-white/10 text-sm focus:outline-none focus:border-brand-cyan text-white appearance-none cursor-pointer"
                    >
                      <option value="from-cyan-500 via-blue-600 to-indigo-700">Space Cyan (Blue-to-Indigo)</option>
                      <option value="from-purple-500 via-pink-600 to-red-500">Neon Sunset (Purple-to-Red)</option>
                      <option value="from-indigo-600 via-purple-600 to-pink-500">Nebula (Indigo-to-Pink)</option>
                      <option value="from-emerald-500 via-teal-600 to-cyan-500">Cyber Forest (Green-to-Cyan)</option>
                      <option value="from-blue-600 via-indigo-600 to-violet-700">Blue Vector (Indigo-to-Violet)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-white/50">Demo Deployment URL</label>
                    <input
                      type="text"
                      value={projectForm.demoUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, demoUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-brand-cyan text-white"
                      placeholder="e.g. https://localconnect.nexnam.demo"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-brand-purple hover:bg-brand-purple/95 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Save Project Record
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
