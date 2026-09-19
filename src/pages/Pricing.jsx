import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import NumberFlow from "@number-flow/react";
import confetti from "canvas-confetti";
import { 
  Check, CheckCircle2, Sparkles, Star, ArrowRight, ShieldCheck, Activity, School, Coffee, Globe, Zap, Plus as PlusIcon
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
    <div className="rounded-2xl bg-white dark:bg-[#111318] border border-slate-900/[0.08] dark:border-white/10 shadow-2xs overflow-hidden transition-all duration-300">
      <button
        type="button"
        onClick={() => {
          playClick();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={playHover}
        className="w-full px-6 py-5 flex items-center justify-between text-left text-[#0B0D12] dark:text-white hover:text-[#5B5CF6] dark:hover:text-[#7C7DFF] transition-colors font-mono font-semibold text-sm cursor-pointer"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <span className="text-xs transition-transform duration-300 ml-4 shrink-0 text-slate-400">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-5 pt-1 text-xs text-[#5F6470] dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/10">
          {answer}
        </p>
      </motion.div>
    </div>
  );
}

export default function Pricing() {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);

  // 3 Primary Pricing Cards (Landing Page, Business Website [POPULAR], Web App / Dashboard)
  const packages = [
    {
      id: "landing-page",
      name: "Landing Page",
      numericPriceOneTime: 3999,
      numericPriceAnnual: 3199, // 20% bundle discount
      bestFor: "Small businesses, cafes, salons, coaching classes, personal brands, events and campaigns.",
      description: "A modern one-page website designed to present your business clearly and generate inquiries through WhatsApp or contact form.",
      features: [
        "One-page modern website",
        "Mobile responsive design",
        "Hero section & Services",
        "WhatsApp inquiry button",
        "Basic SEO setup",
        "Fast loading structure",
        "Delivery in 3–5 days"
      ],
      ctaText: "Choose Landing Page",
      isPopular: false
    },
    {
      id: "business-website",
      name: "Business Website",
      numericPriceOneTime: 7999,
      numericPriceAnnual: 6399, // 20% bundle discount
      bestFor: "Local businesses, startups, institutes, salons, clinics, gyms and service providers.",
      description: "A professional multi-page business website that builds trust and helps customers understand your services, location and contact options.",
      features: [
        "4–6 multi-page architecture",
        "Home, Services, About, Projects",
        "Contact form & WhatsApp CTA",
        "Google Maps location setup",
        "Basic SEO optimization",
        "Mobile responsive design",
        "Delivery in 7–10 days"
      ],
      ctaText: "Choose Business Website",
      isPopular: true,
      badgeText: "Most Popular"
    },
    {
      id: "web-app",
      name: "Web App / Dashboard",
      numericPriceOneTime: 15000,
      numericPriceAnnual: 12000, // 20% bundle discount
      bestFor: "Businesses that need custom features, login systems, dashboards, database and workflow management.",
      description: "A custom web application or dashboard designed around your business process, users and data management needs.",
      features: [
        "Custom UI design & components",
        "Secure login system",
        "Admin control dashboard",
        "Database integration (Supabase)",
        "CRUD workflow features",
        "Deployment & hosting support",
        "Feature-based timeline"
      ],
      ctaText: "Discuss Web App",
      isPopular: false
    }
  ];

  const concepts = [
    {
      name: "Glow Studio Salon",
      category: "Salon / Beauty Business",
      desc: "A premium salon website concept with services, bridal makeup section, gallery, reviews, location and WhatsApp appointment booking.",
      bestFor: "Salons, beauty parlours, makeup artists, hair studios",
      sections: ["Hero section", "Services", "Bridal packages", "Gallery", "Reviews", "Location", "WhatsApp booking"]
    },
    {
      name: "BrightFuture Coaching",
      category: "Education / Coaching Institute",
      desc: "A professional coaching website concept with courses, batches, faculty details, results, admission inquiry and WhatsApp contact.",
      bestFor: "Coaching classes, tuition centers, computer institutes, spoken English classes",
      sections: ["Courses", "Batches", "Faculty", "Results", "Admission inquiry", "Contact", "Google Maps"]
    },
    {
      name: "Urban Brew Cafe",
      category: "Cafe / Restaurant",
      desc: "A modern cafe website concept with menu, offers, gallery, opening hours, location and WhatsApp/table booking.",
      bestFor: "Cafes, restaurants, cloud kitchens, bakeries, food businesses",
      sections: ["Menu", "Offers", "Gallery", "About", "Opening hours", "Location", "WhatsApp booking"]
    },
    {
      name: "Green Valley School",
      category: "School / Education",
      desc: "A clean school website concept with admissions, classes, facilities, achievements, gallery, notices and parent inquiry section.",
      bestFor: "Schools, play schools, academies, education institutions",
      sections: ["Admissions", "Facilities", "Classes", "Achievements", "Gallery", "Notices", "Inquiry form"]
    },
    {
      name: "CarePlus Clinic",
      category: "Clinic / Healthcare",
      desc: "A trustworthy clinic website concept with doctor profile, services, timing, appointment form, location and patient-friendly information.",
      bestFor: "Clinics, dentists, physiotherapists, skin clinics, ayurvedic clinics",
      sections: ["Doctor profile", "Services", "Appointment form", "Timing", "Reviews", "Location", "WhatsApp appointment"]
    },
    {
      name: "FitZone Gym",
      category: "Fitness / Gym",
      desc: "A bold fitness website concept with membership plans, trainers, transformation gallery, trial booking and WhatsApp inquiry.",
      bestFor: "Gyms, yoga studios, fitness trainers, dance studios, sports academies",
      sections: ["Membership plans", "Trainers", "Gallery", "Trial booking", "Offers", "Contact", "WhatsApp CTA"]
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

  const handleToggleBilling = (checked) => {
    playClick();
    setIsAnnual(checked);
    if (checked) {
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.3 },
        colors: ["#5B5CF6", "#7C3AED", "#6366F1"]
      });
    }
  };

  return (
    <div className="flex-grow z-10 w-full pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-8 bg-[#FAFAFA] dark:bg-[#090A0D] transition-colors duration-250">
      <SEO
        title="Pricing | Nexnam"
        description="Transparent pricing packages for landing pages, custom websites, web apps, and digital solutions with no hidden fees."
        keywords="Nexnam pricing, website pricing India, landing page price, business website package, portfolio website price, web app development price"
      />

      <div className="mx-auto max-w-7xl">
        {/* HERO SECTION */}
        <section className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(91,92,246,0.08)] dark:bg-[rgba(124,125,255,0.12)] border border-[rgba(91,92,246,0.16)] dark:border-[rgba(124,125,255,0.25)] text-xs text-[#5B5CF6] dark:text-[#7C7DFF] font-semibold tracking-wide uppercase font-mono mb-4 sm:mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#5B5CF6] dark:text-[#7C7DFF]" />
            Transparent Pricing
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B0D12] dark:text-white mb-4 sm:mb-6 leading-tight font-sans"
          >
            Simple Pricing for{" "}
            <span className="text-[#5B5CF6] dark:text-[#7C7DFF]">
              Modern Digital Products
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-lg text-[#5F6470] dark:text-slate-400 leading-relaxed mb-6 sm:mb-8 font-normal"
          >
            Choose a package that fits your business needs. Nexnam builds websites, landing pages, portfolios, dashboards and digital solutions that help businesses scale online.
          </motion.p>

          {/* BILLING TOGGLE SWITCH (Standard vs Annual Support Bundle) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-2 sm:p-1.5 rounded-2xl bg-white dark:bg-[#111318] border border-slate-900/[0.08] dark:border-white/10 shadow-2xs mb-8 sm:mb-10 max-w-full select-none cursor-pointer"
            onClick={() => handleToggleBilling(!isAnnual)}
          >
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors ${
              !isAnnual ? "bg-[#111318] dark:bg-white text-white dark:text-[#090A0D]" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}>
              Standard Project
            </span>
            
            {/* Custom Toggle Pill */}
            <div className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 flex items-center ${
              isAnnual ? "bg-[#5B5CF6] dark:bg-[#7C7DFF]" : "bg-slate-200 dark:bg-slate-800"
            }`}>
              <motion.div
                className="w-5 h-5 rounded-full bg-white shadow-xs"
                animate={{ x: isAnnual ? 20 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            </div>

            <span className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 ${
              isAnnual ? "bg-[#5B5CF6] dark:bg-[#7C7DFF] text-white" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}>
              Annual Support Bundle
              <span className="bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full font-mono uppercase">
                Save 20%
              </span>
            </span>
          </motion.div>

          {/* Trust points line */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-2.5 pt-6 border-t border-slate-900/[0.07] dark:border-white/10">
            {[
              "Mobile Responsive",
              "WhatsApp Integration",
              "SEO-Friendly Structure",
              "Fast Delivery",
              "Support After Launch"
            ].map((pt, idx) => (
              <span key={idx} className="flex items-center gap-1.5 text-xs text-[#5F6470] dark:text-slate-400 font-mono font-medium">
                <Check className="w-3.5 h-3.5 text-[#5B5CF6] dark:text-[#7C7DFF]" />
                {pt}
              </span>
            ))}
          </div>
        </section>

        {/* 21.DEV INSPIRED 3-CARD PRICING MATRIX */}
        <section className="mb-20 sm:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-6xl mx-auto">
            {packages.map((pkg, idx) => {
              const currentPrice = isAnnual ? pkg.numericPriceAnnual : pkg.numericPriceOneTime;

              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  onMouseEnter={playHover}
                  className={`relative rounded-3xl p-6 sm:p-8 md:p-9 bg-white dark:bg-[#111318] flex flex-col justify-between transition-all duration-300 group ${
                    pkg.isPopular
                      ? "border-2 border-[#5B5CF6] dark:border-[#7C7DFF] shadow-[0_16px_40px_rgba(91,92,246,0.12)] lg:-translate-y-4 lg:scale-[1.02] z-20"
                      : "border border-slate-900/[0.08] dark:border-white/10 hover:border-slate-900/[0.18] dark:hover:border-white/20 shadow-2xs lg:scale-[0.98] z-10"
                  }`}
                >
                  {/* Popular Badge */}
                  {pkg.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#5B5CF6] dark:bg-[#7C7DFF] text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full font-mono flex items-center gap-1 shadow-2xs">
                      <Star className="w-3 h-3 fill-current text-white" />
                      {pkg.badgeText}
                    </div>
                  )}

                  <div>
                    {/* Category Label */}
                    <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase block mb-1">
                      Package
                    </span>
                    <h2 className="text-2xl font-bold text-[#0B0D12] dark:text-white mb-4 group-hover:text-[#5B5CF6] dark:group-hover:text-[#7C7DFF] transition-colors">
                      {pkg.name}
                    </h2>

                    {/* Animated NumberFlow Price block */}
                    <div className="mb-5 pb-4 border-b border-slate-100 dark:border-white/10 flex items-baseline gap-1">
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-mono self-start mt-1">Starting</span>
                      <div className="text-4xl font-black font-mono tracking-tight text-[#0B0D12] dark:text-white">
                        <NumberFlow
                          value={currentPrice}
                          format={{
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 0
                          }}
                        />
                      </div>
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                        {isAnnual ? "/yr bundle" : "one-time"}
                      </span>
                    </div>

                    {/* Best for */}
                    <div className="mb-5">
                      <span className="text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase block mb-1">
                        Best For:
                      </span>
                      <p className="text-xs text-[#5F6470] dark:text-[#B4BAC4] leading-relaxed font-normal">
                        {pkg.bestFor}
                      </p>
                    </div>

                    {/* Brief description */}
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-normal">
                      {pkg.description}
                    </p>

                    {/* List of features */}
                    <span className="text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase block mb-3">
                      Includes:
                    </span>
                    <ul className="space-y-2.5 mb-8">
                      {pkg.features.map((feat, fidx) => (
                        <li key={fidx} className="flex items-start gap-2 text-xs text-[#5F6470] dark:text-[#B4BAC4]">
                          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#5B5CF6] dark:text-[#7C7DFF]" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleChoosePackage(pkg.name)}
                    className={`w-full py-3.5 rounded-xl border text-xs font-bold font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs hover:-translate-y-[1px] ${
                      pkg.isPopular 
                        ? "bg-[#111318] dark:bg-white border-[#111318] dark:border-white text-white dark:text-[#090A0D] hover:bg-[#1E222B] dark:hover:bg-slate-100" 
                        : "border-slate-200 dark:border-white/10 hover:border-slate-900 dark:hover:border-white bg-white dark:bg-[#15171D] hover:bg-slate-50 dark:hover:bg-[#1C1F27] text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    {pkg.ctaText}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* COMPARISON GRID TABLE */}
        <section className="mb-32">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-[#5B5CF6] dark:text-[#7C7DFF] uppercase mb-3 block">
              Feature Matrix
            </span>
            <h2 className="text-3xl font-bold text-[#0B0D12] dark:text-white">Compare Packages</h2>
          </div>

          <div className="bg-white dark:bg-[#111318] rounded-2xl border border-slate-900/[0.08] dark:border-white/10 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-[#15171D] text-slate-500 dark:text-slate-400 uppercase">
                    <th className="py-4 px-6 font-bold tracking-wider">Feature</th>
                    <th className="py-4 px-6 font-bold tracking-wider text-[#0B0D12] dark:text-white">Landing Page</th>
                    <th className="py-4 px-6 font-bold tracking-wider text-[#5B5CF6] dark:text-[#7C7DFF]">Business Website</th>
                    <th className="py-4 px-6 font-bold tracking-wider text-[#0B0D12] dark:text-white">Portfolio</th>
                    <th className="py-4 px-6 font-bold tracking-wider text-[#0B0D12] dark:text-white">Web App / Dashboard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {comparison.features.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 text-[#0B0D12] dark:text-white font-semibold">{row.name}</td>
                      <td className="py-4 px-6 text-slate-600 dark:text-slate-300">{row.landing}</td>
                      <td className="py-4 px-6 text-slate-600 dark:text-slate-300 font-medium">{row.business}</td>
                      <td className="py-4 px-6 text-slate-600 dark:text-slate-300">{row.portfolio}</td>
                      <td className="py-4 px-6 text-slate-600 dark:text-slate-300">{row.webapp}</td>
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
            <span className="text-xs font-mono font-bold tracking-widest text-[#5B5CF6] dark:text-[#7C7DFF] uppercase mb-3 block">
              Inspiration Catalog
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B0D12] dark:text-white mb-4">
              Sample Website Concepts
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
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
                  className="bg-white dark:bg-[#111318] rounded-2xl overflow-hidden flex flex-col h-full border border-slate-900/[0.08] dark:border-white/10 shadow-2xs hover:border-slate-900/[0.2] dark:hover:border-white/20 transition-all duration-300 group"
                >
                  {/* Mini Browser Preview Mockup */}
                  <div className="relative w-full h-44 bg-slate-100 dark:bg-[#15171D] border-b border-slate-200/80 dark:border-white/10 overflow-hidden flex flex-col">
                    <div className="h-6 w-full bg-slate-200/60 dark:bg-[#1A1D24] border-b border-slate-300/40 dark:border-white/5 flex items-center px-3 gap-1.5 shrink-0 select-none">
                      <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                      <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                      <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                      <div className="ml-4 bg-white dark:bg-[#111318] rounded px-2 py-0.5 text-[8px] text-slate-500 dark:text-slate-400 font-mono w-40 text-center truncate shadow-2xs">
                        {concept.name.toLowerCase().replace(/\s+/g, "")}.demo
                      </div>
                    </div>

                    <div className="p-3 flex-grow flex flex-col justify-start relative overflow-hidden bg-slate-50 dark:bg-[#111318]">
                      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-1.5 mb-2 relative z-10 shrink-0">
                        <div className="flex items-center gap-1">
                          <CategoryIcon className="w-2.5 h-2.5 text-[#5B5CF6] dark:text-[#7C7DFF]" />
                          <span className="text-[8px] font-bold text-slate-900 dark:text-white font-mono">{concept.name}</span>
                        </div>
                        <div className="flex gap-1.5 text-[5px] text-slate-500 dark:text-slate-400">
                          <span>Home</span>
                          <span>Services</span>
                          <span>Contact</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-start text-left gap-1 mb-2 relative z-10">
                        <span className="text-[5px] px-1 py-0.5 rounded bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-bold tracking-wide uppercase">
                          CONCEPT v1.0
                        </span>
                        <h4 className="text-[10px] font-black text-slate-900 dark:text-white leading-tight">
                          Modern Digital Presence for {concept.category.split("/")[0]}
                        </h4>
                      </div>

                      <div className="grid grid-cols-3 gap-1 relative z-10 mt-auto pb-1 select-none">
                        <div className="bg-white dark:bg-[#1A1D24] border border-slate-200 dark:border-white/10 rounded p-1 flex flex-col gap-0.5 shadow-2xs">
                          <span className="text-[5px] text-slate-700 dark:text-slate-300 font-mono truncate">Responsive</span>
                        </div>
                        <div className="bg-white dark:bg-[#1A1D24] border border-slate-200 dark:border-white/10 rounded p-1 flex flex-col gap-0.5 shadow-2xs">
                          <span className="text-[5px] text-slate-700 dark:text-slate-300 font-mono truncate">Optimized</span>
                        </div>
                        <div className="bg-white dark:bg-[#1A1D24] border border-slate-200 dark:border-white/10 rounded p-1 flex flex-col gap-0.5 shadow-2xs">
                          <span className="text-[5px] text-slate-700 dark:text-slate-300 font-mono truncate">Inquiries</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 flex flex-col flex-grow justify-between text-left">
                    <div>
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5B5CF6] dark:bg-[#7C7DFF]" />
                        <span className="text-xs font-mono font-bold tracking-wider text-[#5B5CF6] dark:text-[#7C7DFF] uppercase">
                          {concept.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold tracking-tight text-[#0B0D12] dark:text-white mb-3 group-hover:text-[#5B5CF6] dark:group-hover:text-[#7C7DFF] transition-colors">
                        {concept.name}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                        {concept.desc}
                      </p>

                      <div className="mb-4 pt-2 border-t border-slate-100 dark:border-white/10">
                        <span className="text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase block mb-1">
                          Best For:
                        </span>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed italic">
                          {concept.bestFor}
                        </p>
                      </div>

                      <span className="text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase block mb-2">
                        Sections Included:
                      </span>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {concept.sections.map((sect, sidx) => (
                          <span
                            key={sidx}
                            className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-white/10 text-[9px] font-mono text-slate-600 dark:text-slate-300"
                          >
                            {sect}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleChoosePackage(concept.name + " Concept")}
                      className="w-full mt-auto py-3 rounded-xl border border-slate-200 dark:border-white/10 hover:border-slate-900 dark:hover:border-white bg-white dark:bg-[#15171D] hover:bg-slate-50 dark:hover:bg-[#1C1F27] text-xs font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-mono transition-all duration-300 cursor-pointer flex items-center justify-center gap-1 group/btn shadow-2xs"
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
            <span className="text-xs font-mono font-bold tracking-widest text-[#5B5CF6] dark:text-[#7C7DFF] uppercase mb-3 block">
              Enhance Your Site
            </span>
            <h2 className="text-3xl font-bold text-[#0B0D12] dark:text-white">Add-On Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addons.map((add, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white dark:bg-[#111318] rounded-2xl p-6 border border-slate-900/[0.08] dark:border-white/10 hover:border-slate-900/[0.18] dark:hover:border-white/20 transition-all duration-300 text-left flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <h3 className="text-base font-bold text-[#0B0D12] dark:text-white font-mono">{add.name}</h3>
                    <span className="text-xs font-bold font-mono text-[#5B5CF6] dark:text-[#7C7DFF] bg-[rgba(91,92,246,0.08)] dark:bg-[rgba(124,125,255,0.12)] border border-[rgba(91,92,246,0.16)] dark:border-[rgba(124,125,255,0.25)] px-2 py-0.5 rounded">
                      {add.price}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                    {add.desc}
                  </p>
                </div>
                <button
                  onClick={() => handleChoosePackage(add.name + " Add-on")}
                  className="text-xs font-mono font-bold text-[#5B5CF6] dark:text-[#7C7DFF] hover:underline text-left cursor-pointer inline-flex items-center gap-1 mt-2"
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
            <span className="text-xs font-mono font-bold tracking-widest text-[#5B5CF6] dark:text-[#7C7DFF] uppercase mb-3 block">
              Need Answers?
            </span>
            <h2 className="text-3xl font-bold text-[#0B0D12] dark:text-white">Frequently Asked Questions</h2>
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
              className="relative rounded-3xl p-8 md:p-14 bg-[#111318] dark:bg-[#15171D] text-white shadow-xl text-center overflow-hidden border border-slate-800 dark:border-white/10"
            >
              <div className="relative z-10 flex flex-col items-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-white font-semibold tracking-wider uppercase font-mono mb-6">
                  <Sparkles className="w-3.5 h-3.5 text-[#5B5CF6] dark:text-[#7C7DFF]" />
                  Free Consultation
                </div>

                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 max-w-2xl leading-tight">
                  Not Sure Which Package Is{" "}
                  <span className="text-[#5B5CF6] dark:text-[#7C7DFF]">
                    Right for You?
                  </span>
                </h2>

                <p className="text-base text-slate-400 mb-8 max-w-xl leading-relaxed">
                  Tell us about your business and we’ll suggest the best website or digital solution based on your goals, budget and timeline.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className="w-full sm:w-auto relative inline-flex items-center justify-center px-8 py-4 text-xs font-bold tracking-wider uppercase text-slate-900 rounded-xl bg-white hover:bg-slate-100 transition-all duration-300 font-mono"
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
                    className="w-full sm:w-auto px-8 py-4 text-xs font-bold tracking-wider uppercase rounded-xl border border-white/20 hover:border-white text-white bg-transparent transition-all duration-300 font-mono"
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

