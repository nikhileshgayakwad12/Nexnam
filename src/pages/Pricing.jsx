import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, CheckCircle2, MessageSquare, Sparkles, Smartphone, 
  Laptop, Globe, Sliders, Zap, TrendingUp, HelpCircle, 
  ArrowRight, Phone, ShieldCheck, Star, Activity, School, Coffee
} from "lucide-react";
import SEO from "../components/SEO";
import { playHover, playClick } from "../utils/soundManager";

// Mockup Icons depending on category
const getCategoryIcon = (category) => {
  const lower = category.toLowerCase();
  if (lower.includes("salon")) return Star;
  if (lower.includes("coach") || lower.includes("education")) return Activity;
  if (lower.includes("cafe") || lower.includes("restaurant")) return Coffee;
  if (lower.includes("school")) return School;
  if (lower.includes("clinic") || lower.includes("health")) return ShieldCheck;
  if (lower.includes("gym") || lower.includes("fitness")) return Zap;
  return Globe;
};

// Reusable FAQ Item Sub-component
function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="rounded-2xl glass-card border border-white/5 overflow-hidden transition-all duration-300">
      <button
        type="button"
        onClick={() => {
          playClick();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={playHover}
        className="w-full px-6 py-5 flex items-center justify-between text-left text-white hover:text-brand-cyan transition-colors font-mono font-semibold text-sm cursor-pointer"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <span className="text-xs transition-transform duration-300 ml-4 shrink-0">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-5 pt-1 text-xs text-white/50 leading-relaxed border-t border-white/5">
          {answer}
        </p>
      </motion.div>
    </div>
  );
}

export default function Pricing() {
  const navigate = useNavigate();

  const packages = [
    {
      name: "Landing Page",
      price: "₹3,999",
      bestFor: "Small businesses, cafes, salons, coaching classes, personal brands, events and campaigns.",
      description: "A modern one-page website designed to present your business clearly and generate inquiries through WhatsApp or contact form.",
      features: [
        "One-page modern website",
        "Mobile responsive design",
        "Hero section",
        "Services section",
        "About section",
        "Contact section",
        "WhatsApp inquiry button",
        "Basic SEO setup",
        "Fast loading structure",
        "Delivery in 3–5 days"
      ],
      ctaText: "Choose Landing Page",
      gradient: "from-cyan-500/20 to-blue-600/10 border-brand-cyan/20",
      accentColor: "text-brand-cyan",
      badge: null
    },
    {
      name: "Business Website",
      price: "₹7,999",
      bestFor: "Local businesses, startups, institutes, salons, clinics, gyms and service providers.",
      description: "A professional multi-page business website that builds trust and helps customers understand your services, location and contact options.",
      features: [
        "4–6 pages",
        "Home page",
        "Services page",
        "About page",
        "Gallery/Projects page",
        "Contact page",
        "WhatsApp CTA",
        "Contact form",
        "Google Maps section",
        "Basic SEO setup",
        "Responsive design",
        "Delivery in 7–10 days"
      ],
      ctaText: "Choose Business Website",
      gradient: "from-brand-purple/20 via-brand-blue/15 to-indigo-950/10 border-brand-purple/35",
      accentColor: "text-brand-purple",
      badge: "Most Popular"
    },
    {
      name: "Portfolio Website",
      price: "₹4,999",
      bestFor: "Students, developers, freelancers, creators, designers, job seekers and personal brands.",
      description: "A clean and modern personal portfolio website to showcase skills, projects, achievements and contact details professionally.",
      features: [
        "Hero profile section",
        "About section",
        "Skills section",
        "Projects section",
        "Resume download button",
        "Contact section",
        "Social profile links",
        "Responsive design",
        "Basic SEO setup",
        "Delivery in 4–6 days"
      ],
      ctaText: "Choose Portfolio",
      gradient: "from-brand-blue/20 to-indigo-900/10 border-brand-blue/20",
      accentColor: "text-brand-blue",
      badge: null
    },
    {
      name: "Web App / Dashboard",
      price: "₹15,000",
      bestFor: "Businesses that need custom features, login systems, dashboards, database and workflow management.",
      description: "A custom web application or dashboard designed around your business process, users and data management needs.",
      features: [
        "Custom UI design",
        "Login system",
        "Admin dashboard",
        "Database integration",
        "CRUD features",
        "Contact/message management",
        "Role-based flow if needed",
        "Responsive dashboard",
        "Deployment support",
        "Timeline based on features"
      ],
      ctaText: "Discuss Web App",
      gradient: "from-pink-500/20 to-purple-600/10 border-pink-500/20",
      accentColor: "text-pink-400",
      badge: null
    }
  ];

  const concepts = [
    {
      name: "Glow Studio Salon",
      category: "Salon / Beauty Business",
      desc: "A premium salon website concept with services, bridal makeup section, gallery, reviews, location and WhatsApp appointment booking.",
      bestFor: "Salons, beauty parlours, makeup artists, hair studios",
      sections: ["Hero section", "Services", "Bridal packages", "Gallery", "Reviews", "Location", "WhatsApp booking"],
      accentClass: "from-brand-cyan to-brand-blue"
    },
    {
      name: "BrightFuture Coaching",
      category: "Education / Coaching Institute",
      desc: "A professional coaching website concept with courses, batches, faculty details, results, admission inquiry and WhatsApp contact.",
      bestFor: "Coaching classes, tuition centers, computer institutes, spoken English classes",
      sections: ["Courses", "Batches", "Faculty", "Results", "Admission inquiry", "Contact", "Google Maps"],
      accentClass: "from-brand-blue to-brand-purple"
    },
    {
      name: "Urban Brew Cafe",
      category: "Cafe / Restaurant",
      desc: "A modern cafe website concept with menu, offers, gallery, opening hours, location and WhatsApp/table booking.",
      bestFor: "Cafes, restaurants, cloud kitchens, bakeries, food businesses",
      sections: ["Menu", "Offers", "Gallery", "About", "Opening hours", "Location", "WhatsApp booking"],
      accentClass: "from-emerald-400 to-teal-500"
    },
    {
      name: "Green Valley School",
      category: "School / Education",
      desc: "A clean school website concept with admissions, classes, facilities, achievements, gallery, notices and parent inquiry section.",
      bestFor: "Schools, play schools, academies, education institutions",
      sections: ["Admissions", "Facilities", "Classes", "Achievements", "Gallery", "Notices", "Inquiry form"],
      accentClass: "from-brand-purple to-pink-500"
    },
    {
      name: "CarePlus Clinic",
      category: "Clinic / Healthcare",
      desc: "A trustworthy clinic website concept with doctor profile, services, timing, appointment form, location and patient-friendly information.",
      bestFor: "Clinics, dentists, physiotherapists, skin clinics, ayurvedic clinics",
      sections: ["Doctor profile", "Services", "Appointment form", "Timing", "Reviews", "Location", "WhatsApp appointment"],
      accentClass: "from-teal-400 to-cyan-500"
    },
    {
      name: "FitZone Gym",
      category: "Fitness / Gym",
      desc: "A bold fitness website concept with membership plans, trainers, transformation gallery, trial booking and WhatsApp inquiry.",
      bestFor: "Gyms, yoga studios, fitness trainers, dance studios, sports academies",
      sections: ["Membership plans", "Trainers", "Gallery", "Trial booking", "Offers", "Contact", "WhatsApp CTA"],
      accentClass: "from-amber-400 to-red-500"
    }
  ];

  const addons = [
    { name: "SEO Setup", price: "₹2,999", desc: "Includes meta tags, sitemap, robots.txt, headings and basic search-friendly structure." },
    { name: "Website Maintenance", price: "₹999/month", desc: "Includes small content updates, bug fixes and basic support." },
    { name: "Extra Page", price: "₹999/page", desc: "For additional pages like Blog, Team, FAQ, Gallery or Case Study." },
    { name: "Contact Form Setup", price: "₹999", desc: "Includes inquiry form, email/WhatsApp integration or database setup if required." },
    { name: "WhatsApp Business Setup", price: "₹999", desc: "Includes WhatsApp CTA, prefilled messages, business profile guidance and inquiry flow." },
    { name: "Admin Panel", price: "₹5,999", desc: "For managing projects, services, messages or website content from a dashboard." }
  ];

  const comparison = {
    features: [
      { name: "Pages", landing: "1 Page", business: "4–6 Pages", portfolio: "1–3 Pages", webapp: "Custom" },
      { name: "Timeline", landing: "3–5 days", business: "7–10 days", portfolio: "4–6 days", webapp: "Feature-based" },
      { name: "Responsive Design", landing: "Yes", business: "Yes", portfolio: "Yes", webapp: "Yes" },
      { name: "WhatsApp Button", landing: "Yes", business: "Yes", portfolio: "Optional", webapp: "Optional" },
      { name: "Contact Form", landing: "Basic", business: "Yes", portfolio: "Yes", webapp: "Yes" },
      { name: "SEO Setup", landing: "Basic", business: "Basic", portfolio: "Basic", webapp: "Optional" },
      { name: "Admin Dashboard", landing: "No", business: "Optional", portfolio: "No", webapp: "Yes" },
      { name: "Database", landing: "No", business: "Optional", portfolio: "No", webapp: "Yes" },
      { name: "Best For", landing: "Small businesses/campaigns", business: "Local businesses/startups", portfolio: "Students/freelancers", webapp: "Business systems" },
      { name: "Starting Price", landing: "₹3,999", business: "₹7,999", portfolio: "₹4,999", webapp: "₹15,000+" }
    ]
  };

  const whatsAppUrl = "https://wa.me/919329584097?text=Hello%20Nexnam%21%20I%27d%20like%20to%20inquire%20about%20starting%20a%20project%20with%20you.";

  const handleChoosePackage = (packageName) => {
    playClick();
    navigate("/contact", { state: { selectedService: packageName } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex-grow z-10 w-full pt-32 pb-20 px-6 sm:px-8">
      <SEO
        title="Pricing | Nexnam Website & Digital Solution Packages"
        description="Explore Nexnam pricing for landing pages, business websites, portfolios, web apps, SEO setup and digital solutions."
        keywords="Nexnam pricing, website pricing India, landing page price, business website package, portfolio website price, web app development price"
      />

      <div className="mx-auto max-w-7xl">
        {/* HERO SECTION */}
        <section className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-xs text-brand-cyan font-bold tracking-wider uppercase font-mono mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Flexible Packages
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-6"
          >
            Simple Pricing for{" "}
            <span className="bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple bg-clip-text text-transparent">
              Modern Digital Solutions
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-white/60 leading-relaxed mb-8"
          >
            Choose a package that fits your business needs. Nexnam builds websites, landing pages, portfolios, dashboards and digital solutions that help businesses grow online.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <button
              onClick={() => {
                playClick();
                navigate("/contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onMouseEnter={playHover}
              className="w-full sm:w-auto px-8 py-4 text-xs font-bold tracking-wider uppercase text-brand-black rounded-lg bg-gradient-to-r from-brand-cyan to-brand-blue hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all duration-300 cursor-pointer font-mono font-black animate-pulse"
            >
              Start Your Project
            </button>
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              className="w-full sm:w-auto text-center px-8 py-4 text-xs font-bold tracking-wider uppercase rounded-lg border border-green-500/30 bg-green-500/5 hover:bg-green-500/10 text-green-400 hover:border-green-500/60 transition-all duration-300 font-mono"
            >
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* Trust points line */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-6 border-t border-white/5">
            {[
              "Mobile Responsive",
              "WhatsApp Integration",
              "SEO-Friendly Structure",
              "Fast Delivery",
              "Support After Launch"
            ].map((pt, idx) => (
              <span key={idx} className="flex items-center gap-1.5 text-xs text-white/40 font-mono">
                <Check className="w-3.5 h-3.5 text-brand-cyan" />
                {pt}
              </span>
            ))}
          </div>
        </section>

        {/* PRICING MATRIX SECTION */}
        <section className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {packages.map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={playHover}
                className={`relative rounded-3xl p-6 md:p-8 border glass-card flex flex-col justify-between h-full bg-gradient-to-b ${pkg.gradient} hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 group`}
              >
                {pkg.badge && (
                  <span className="absolute top-4 right-4 bg-brand-cyan text-brand-black text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full font-mono shadow-[0_0_10px_rgba(0,245,255,0.3)]">
                    {pkg.badge}
                  </span>
                )}

                <div>
                  {/* Category Name */}
                  <span className="text-[10px] font-mono font-bold tracking-widest text-white/40 uppercase block mb-1">
                    Package
                  </span>
                  <h2 className="text-xl font-bold text-white mb-4 group-hover:text-brand-cyan transition-colors">
                    {pkg.name}
                  </h2>

                  {/* Pricing block */}
                  <div className="mb-4">
                    <span className="text-xs text-white/40 block font-mono">Starting From</span>
                    <span className={`text-3xl font-black font-mono tracking-tight ${pkg.accentColor}`}>
                      {pkg.price}
                    </span>
                  </div>

                  {/* Best for */}
                  <div className="mb-6 pb-4 border-b border-white/5">
                    <span className="text-[9px] font-mono font-bold text-white/40 tracking-wider uppercase block mb-1">
                      Best For:
                    </span>
                    <p className="text-[11px] text-white/60 leading-relaxed">
                      {pkg.bestFor}
                    </p>
                  </div>

                  {/* Brief description */}
                  <p className="text-xs text-white/50 leading-relaxed mb-6 font-medium">
                    {pkg.description}
                  </p>

                  {/* List of features */}
                  <span className="text-[9px] font-mono font-bold text-white/40 tracking-wider uppercase block mb-3">
                    Includes:
                  </span>
                  <ul className="space-y-2 mb-8">
                    {pkg.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-start gap-2 text-xs text-white/70">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.accentColor}`} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleChoosePackage(pkg.name)}
                  className={`w-full py-3 rounded-lg border text-xs font-bold font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 ${
                    pkg.badge 
                      ? "bg-brand-cyan border-brand-cyan text-brand-black hover:bg-transparent hover:text-white" 
                      : "border-white/10 hover:border-brand-cyan/40 bg-white/5 hover:bg-brand-cyan/5 text-white"
                  }`}
                >
                  {pkg.ctaText}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* COMPARISON GRID TABLE */}
        <section className="mb-32">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-brand-cyan uppercase mb-3 block">
              Feature Matrix
            </span>
            <h2 className="text-3xl font-extrabold text-white">Compare Packages</h2>
          </div>

          <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-white/40 uppercase">
                    <th className="py-4 px-6 font-bold tracking-wider">Feature</th>
                    <th className="py-4 px-6 font-bold tracking-wider text-brand-cyan">Landing Page</th>
                    <th className="py-4 px-6 font-bold tracking-wider text-brand-purple">Business Website</th>
                    <th className="py-4 px-6 font-bold tracking-wider text-brand-blue">Portfolio</th>
                    <th className="py-4 px-6 font-bold tracking-wider text-pink-400">Web App / Dashboard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {comparison.features.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                      <td className="py-4 px-6 text-white font-semibold">{row.name}</td>
                      <td className="py-4 px-6 text-white/60">{row.landing}</td>
                      <td className="py-4 px-6 text-white/60">{row.business}</td>
                      <td className="py-4 px-6 text-white/60">{row.portfolio}</td>
                      <td className="py-4 px-6 text-white/60">{row.webapp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SAMPLE WEBSITE CONCEPTS SECTION */}
        <section className="mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-brand-purple uppercase mb-3 block">
              Inspiration Catalog
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Sample Website Concepts
            </h2>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed">
              Explore sample website ideas designed for local businesses, startups, creators and professionals. These demo concepts show the type of digital presence Nexnam can create for your brand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {concepts.map((concept, idx) => {
              const CategoryIcon = getCategoryIcon(concept.category);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  onMouseEnter={playHover}
                  className="glass-card rounded-3xl overflow-hidden flex flex-col h-full border border-white/5 hover:border-brand-purple/20 transition-all duration-300 group"
                >
                  {/* Tailwind Drawn Mini Browser Preview Mockup */}
                  <div className="relative w-full h-44 bg-brand-dark/80 border-b border-white/5 overflow-hidden flex flex-col">
                    {/* Browser top-bar */}
                    <div className="h-6 w-full bg-brand-black/90 border-b border-white/5 flex items-center px-3 gap-1.5 shrink-0 select-none">
                      <div className="w-2 h-2 rounded-full bg-red-500/80" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                      <div className="w-2 h-2 rounded-full bg-green-500/80" />
                      <div className="ml-4 bg-white/5 rounded-md px-2 py-0.5 text-[8px] text-white/30 font-mono w-40 text-center truncate">
                        {concept.name.toLowerCase().replace(/\s+/g, "")}.demo
                      </div>
                    </div>

                    {/* Mini browser screen content mockup */}
                    <div className="p-3 flex-grow flex flex-col justify-start relative overflow-hidden bg-[#0a0a0e]">
                      {/* Grid background inside preview */}
                      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                      <div className={`absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-tr ${concept.accentClass} opacity-10 rounded-full blur-xl`} />

                      {/* Mini navigation header */}
                      <div className="flex items-center justify-between border-b border-white/5 pb-1.5 mb-2 relative z-10 shrink-0">
                        <div className="flex items-center gap-1">
                          <CategoryIcon className="w-2.5 h-2.5 text-brand-cyan" />
                          <span className="text-[8px] font-bold text-white font-mono">{concept.name}</span>
                        </div>
                        <div className="flex gap-1.5 text-[5px] text-white/40">
                          <span>Home</span>
                          <span>Services</span>
                          <span>Contact</span>
                        </div>
                      </div>

                      {/* Mini hero section block */}
                      <div className="flex flex-col items-start text-left gap-1 mb-2 relative z-10">
                        <span className="text-[5px] px-1 py-0.5 rounded bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan font-mono font-bold tracking-wide uppercase">
                          CONCEPT v1.0
                        </span>
                        <h4 className="text-[10px] font-black text-white leading-tight">
                          Modern Digital Presence for {concept.category.split("/")[0]}
                        </h4>
                        <p className="text-[6px] text-white/45 max-w-[170px] leading-tight truncate">
                          High performance setups built with fast layout operations.
                        </p>
                      </div>

                      {/* Mini services grid section */}
                      <div className="grid grid-cols-3 gap-1 relative z-10 mt-auto pb-1 select-none">
                        <div className="bg-white/5 border border-white/5 rounded p-1 flex flex-col gap-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan/20 flex items-center justify-center shrink-0">
                            <span className="w-0.5 h-0.5 rounded-full bg-brand-cyan" />
                          </div>
                          <span className="text-[5px] text-white font-mono truncate">Responsive</span>
                        </div>
                        <div className="bg-white/5 border border-white/5 rounded p-1 flex flex-col gap-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-blue/20 flex items-center justify-center shrink-0">
                            <span className="w-0.5 h-0.5 rounded-full bg-brand-blue" />
                          </div>
                          <span className="text-[5px] text-white font-mono truncate">Optimized</span>
                        </div>
                        <div className="bg-white/5 border border-white/5 rounded p-1 flex flex-col gap-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-purple/20 flex items-center justify-center shrink-0">
                            <span className="w-0.5 h-0.5 rounded-full bg-brand-purple" />
                          </div>
                          <span className="text-[5px] text-white font-mono truncate">Inquiries</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow justify-between text-left">
                    <div>
                      {/* Category tag */}
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-purple" />
                        <span className="text-xs font-mono font-bold tracking-wider text-brand-purple uppercase">
                          {concept.category}
                        </span>
                      </div>

                      {/* Demo Name */}
                      <h3 className="text-xl font-bold tracking-tight text-white mb-3 group-hover:text-brand-purple transition-colors">
                        {concept.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-white/60 leading-relaxed mb-4">
                        {concept.desc}
                      </p>

                      {/* Best For */}
                      <div className="mb-4 pt-2 border-t border-white/5">
                        <span className="text-[9px] font-mono font-bold text-white/40 tracking-wider uppercase block mb-1">
                          Best For:
                        </span>
                        <p className="text-[11px] text-white/60 leading-relaxed italic">
                          {concept.bestFor}
                        </p>
                      </div>

                      {/* Sections included */}
                      <span className="text-[9px] font-mono font-bold text-white/40 tracking-wider uppercase block mb-2">
                        Sections Included:
                      </span>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {concept.sections.map((sect, sidx) => (
                          <span
                            key={sidx}
                            className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[9px] font-mono text-white/60"
                          >
                            {sect}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => handleChoosePackage(concept.name + " Concept")}
                      className="w-full mt-auto py-3 rounded-lg border border-white/10 hover:border-brand-purple/40 bg-white/5 hover:bg-brand-purple/5 text-xs font-bold text-white tracking-wider uppercase font-mono transition-all duration-300 cursor-pointer flex items-center justify-center gap-1 group/btn"
                    >
                      View Sample Style
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ADD-ON SERVICES SECTION */}
        <section className="mb-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-brand-cyan uppercase mb-3 block">
              Enhance Your Site
            </span>
            <h2 className="text-3xl font-extrabold text-white">Add-On Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addons.map((add, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="glass-card rounded-2xl p-6 border border-white/5 hover:border-brand-cyan/20 transition-all duration-300 text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <h3 className="text-base font-bold text-white font-mono">{add.name}</h3>
                    <span className="text-xs font-bold font-mono text-brand-cyan whitespace-nowrap bg-brand-cyan/10 border border-brand-cyan/20 px-2 py-0.5 rounded">
                      {add.price}
                    </span>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed mb-4">
                    {add.desc}
                  </p>
                </div>
                <button
                  onClick={() => handleChoosePackage(add.name + " Add-on")}
                  className="text-xs font-mono font-bold text-brand-cyan hover:underline text-left cursor-pointer inline-flex items-center gap-1 mt-2"
                >
                  Add to Brief <PlusIcon className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section className="mb-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-brand-purple uppercase mb-3 block">
              Need Answers?
            </span>
            <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4 text-left">
            <FAQItem
              question="What is the starting price for a website?"
              answer="Our landing page package starts from ₹3,999. Final pricing depends on pages, design, content and required features."
            />
            <FAQItem
              question="How long does it take to build a website?"
              answer="A landing page usually takes 3–5 days, while a business website takes around 7–10 days depending on content and features."
            />
            <FAQItem
              question="Do you provide WhatsApp integration?"
              answer="Yes, we add WhatsApp buttons and prefilled inquiry messages so customers can contact you easily."
            />
            <FAQItem
              question="Do you build websites for salons, cafes, schools and coaching institutes?"
              answer="Yes, Nexnam builds websites for local businesses including salons, cafes, schools, coaching classes, gyms, clinics and startups."
            />
            <FAQItem
              question="Do you provide SEO setup?"
              answer="Yes, we include basic SEO setup like page titles, meta descriptions, headings, sitemap and search-friendly structure."
            />
            <FAQItem
              question="Can I upgrade my website later?"
              answer="Yes, you can start with a landing page and later upgrade it into a full business website or web app."
            />
            <FAQItem
              question="Do you provide admin panel and database?"
              answer="Yes, admin panel and database features are available in custom web app or dashboard packages."
            />
          </div>
        </section>

        {/* BOTTOM CTA SECTION */}
        <section className="relative overflow-hidden z-10 w-full">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl p-8 md:p-14 glass-card border border-white/5 bg-gradient-to-br from-indigo-950/20 to-slate-900/30 overflow-hidden group hover:border-brand-purple/20 transition-colors duration-500 text-center"
            >
              <div className="absolute top-[-50%] left-[-20%] w-[350px] h-[350px] rounded-full bg-brand-cyan/10 blur-[100px] pointer-events-none" />
              <div className="absolute bottom-[-50%] right-[-20%] w-[350px] h-[350px] rounded-full bg-brand-purple/10 blur-[100px] pointer-events-none" />
              <div className="absolute inset-0 bg-grid-pattern opacity-30 mix-blend-overlay pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-xs text-brand-purple font-semibold tracking-wider uppercase font-mono mb-6">
                  <Sparkles className="w-3.5 h-3.5" />
                  Free Consultation
                </div>

                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6 max-w-2xl leading-tight">
                  Not Sure Which Package Is{" "}
                  <span className="bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple bg-clip-text text-transparent">
                    Right for You?
                  </span>
                </h2>

                <p className="text-base text-white/60 mb-8 max-w-xl leading-relaxed">
                  Tell us about your business and we’ll suggest the best website or digital solution based on your goals, budget and timeline.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className="w-full sm:w-auto relative inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-wider uppercase text-brand-black rounded-lg bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] transition-all duration-300 font-mono font-black"
                  >
                    Chat on WhatsApp
                  </a>

                  <button
                    onClick={() => {
                      playClick();
                      navigate("/contact");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    onMouseEnter={playHover}
                    className="w-full sm:w-auto px-8 py-4 text-sm font-bold tracking-wider uppercase rounded-lg border border-white/10 hover:border-brand-cyan/40 bg-white/5 hover:bg-brand-cyan/5 text-white transition-all duration-300 font-mono"
                  >
                    Contact Nexnam
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Plus Icon sub-component
function PlusIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
