import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion as m } from "framer-motion";
import { Sparkles, Grid } from "lucide-react";
import SEO from "../components/SEO";
import ServiceCard from "../components/ServiceCard";
import { defaultServices } from "../data/servicesData";
import { playClick } from "../utils/soundManager";

export default function Services() {
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    // Sync with localStorage modifications from the admin panel (if any)
    const storedServices = localStorage.getItem("nexnam_services");
    if (storedServices) {
      try {
        setServices(JSON.parse(storedServices));
      } catch (e) {
        console.error("Failed to parse custom services", e);
      }
    }
  }, []);

  return (
    <div className="flex-grow z-10 w-full pt-32 pb-20 px-6 sm:px-8">
      <SEO
        title="Digital Services Built for Modern Businesses | Nexnam"
        description="Explore Nexnam services including website development, landing pages, apps, SEO, automation and digital solutions."
      />
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-xs text-brand-cyan font-semibold tracking-wider uppercase font-mono mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Empowering Ideas
          </m.div>

          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-6"
          >
            Digital Services{" "}
            <span className="bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple bg-clip-text text-transparent">
              Built for Modern Businesses
            </span>
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-white/60 leading-relaxed"
          >
            We design, develop, and optimize digital solutions crafted to give startups, creators, and local businesses a premium, competitive edge online.
          </m.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Value Proposition & Links Section */}
        <section className="mb-20 py-16 border-t border-white/5 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-12">
            <div className="p-6 rounded-2xl glass-card border border-white/5">
              <h3 className="text-lg font-bold text-white mb-3 font-mono">Why Your Business Needs a Website</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                A custom-built, fast-loading website builds immediate credibility and serves as your 24/7 digital sales pipeline. It helps turn passive social media visitors or search engine traffic into paying customers.
              </p>
            </div>
            <div className="p-6 rounded-2xl glass-card border border-white/5">
              <h3 className="text-lg font-bold text-white mb-3 font-mono">Who Nexnam Helps</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                We design high-converting platforms for early-stage startups building their MVPs, service companies seeking local leads, and creators looking to display portfolios in clean interactive visual layouts.
              </p>
            </div>
            <div className="p-6 rounded-2xl glass-card border border-white/5">
              <h3 className="text-lg font-bold text-white mb-3 font-mono">SEO & High Performance</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                We code with modern standard semantics, optimize image assets for speed, and set up metadata structures to ensure your online business ranks higher on search engines and scores highly on performance audits.
              </p>
            </div>
          </div>

          {/* Internal Outlinks buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/pricing"
              onClick={playClick}
              className="w-full sm:w-auto text-center px-6 py-3 rounded-lg bg-gradient-to-r from-brand-cyan to-brand-blue text-brand-black text-xs font-bold tracking-wider uppercase font-mono transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,245,255,0.25)] cursor-pointer"
            >
              View Pricing Packages
            </Link>
            <Link
              to="/projects"
              onClick={playClick}
              className="w-full sm:w-auto text-center px-6 py-3 rounded-lg border border-white/10 hover:border-brand-cyan/40 bg-white/5 hover:bg-brand-cyan/5 text-xs font-bold text-white tracking-wider uppercase font-mono transition-all duration-300"
            >
              Explore Our Projects
            </Link>
            <Link
              to="/about"
              onClick={playClick}
              className="w-full sm:w-auto text-center px-6 py-3 rounded-lg border border-white/10 hover:border-brand-purple/40 bg-white/5 hover:bg-brand-purple/5 text-xs font-bold text-white tracking-wider uppercase font-mono transition-all duration-300"
            >
              Learn About Nexnam
            </Link>
          </div>
        </section>

        {/* Custom Service Inquiry Alert */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full text-center p-8 rounded-2xl glass-card border border-white/5 bg-gradient-to-br from-indigo-950/10 to-slate-900/10 hover:border-brand-cyan/20 transition-all duration-300"
        >
          <p className="text-sm sm:text-base text-white/60">
            Not sure what you need?{" "}
            <Link
              to="/contact"
              onClick={playClick}
              className="text-brand-cyan font-extrabold hover:underline font-mono ml-1"
            >
              Contact Nexnam and we’ll guide you.
            </Link>
          </p>
        </m.div>
      </div>
    </div>
  );
}
