import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion as m } from "framer-motion";
import { Sparkles } from "lucide-react";
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
    <div className="flex-grow z-10 w-full pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-8 bg-[#FAFAFA] dark:bg-[#090A0D] transition-colors duration-200">
      <SEO
        title="Digital Services | Nexnam"
        description="Explore Nexnam digital services including custom website development, mobile apps, UI/UX design, SEO setup, and startup MVPs."
      />
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <m.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-[#15171D] border border-slate-200 dark:border-white/[0.08] text-xs text-[#0B0D12] dark:text-[#F8FAFC] font-semibold mb-6 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#5B5CF6] dark:text-[#7C7DFF]" />
            Empowering Ideas
          </m.div>

          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0B0D12] dark:text-[#F8FAFC] mb-6"
          >
            Digital Services{" "}
            <span className="bg-gradient-to-r from-[#0B0D12] via-[#5B5CF6] to-[#7C3AED] dark:from-[#F8FAFC] dark:via-[#7C7DFF] dark:to-[#A78BFA] bg-clip-text text-transparent">
              Built for Modern Businesses
            </span>
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg text-[#5F6470] dark:text-[#9CA3AF] leading-relaxed"
          >
            We design, develop, and optimize digital solutions crafted to give startups, creators, and local businesses a premium, competitive edge online.
          </m.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Value Proposition & Links Section */}
        <section className="mb-20 py-16 border-t border-slate-900/[0.08] dark:border-white/[0.08] relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-12">
            <div className="p-7 rounded-2xl bg-white dark:bg-[#111318] border border-slate-900/[0.08] dark:border-white/[0.08] shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
              <h3 className="text-base font-bold text-[#0B0D12] dark:text-[#F8FAFC] mb-3">Why Your Business Needs a Website</h3>
              <p className="text-xs text-[#5F6470] dark:text-[#9CA3AF] leading-relaxed">
                A custom-built, fast-loading website builds immediate credibility and serves as your 24/7 digital sales pipeline. It helps turn passive social media visitors or search engine traffic into paying customers.
              </p>
            </div>
            <div className="p-7 rounded-2xl bg-white dark:bg-[#111318] border border-slate-900/[0.08] dark:border-white/[0.08] shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
              <h3 className="text-base font-bold text-[#0B0D12] dark:text-[#F8FAFC] mb-3">Who Nexnam Helps</h3>
              <p className="text-xs text-[#5F6470] dark:text-[#9CA3AF] leading-relaxed">
                We design high-converting platforms for early-stage startups building their MVPs, service companies seeking local leads, and creators looking to display portfolios in clean interactive visual layouts.
              </p>
            </div>
            <div className="p-7 rounded-2xl bg-white dark:bg-[#111318] border border-slate-900/[0.08] dark:border-white/[0.08] shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
              <h3 className="text-base font-bold text-[#0B0D12] dark:text-[#F8FAFC] mb-3">SEO & High Performance</h3>
              <p className="text-xs text-[#5F6470] dark:text-[#9CA3AF] leading-relaxed">
                We code with modern standard semantics, optimize image assets for speed, and set up metadata structures to ensure your online business ranks higher on search engines and scores highly on performance audits.
              </p>
            </div>
          </div>

          {/* Internal Outlinks buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/pricing"
              onClick={playClick}
              className="w-full sm:w-auto text-center px-6 py-3.5 rounded-xl bg-[#111318] dark:bg-[#7C7DFF] dark:hover:bg-[#6869E8] text-white text-xs font-semibold hover:bg-[#1f222a] transition-all duration-200 shadow-sm"
            >
              View Pricing Packages
            </Link>
            <Link
              to="/projects"
              onClick={playClick}
              className="w-full sm:w-auto text-center px-6 py-3.5 rounded-xl border border-slate-900/[0.12] dark:border-white/[0.08] hover:border-slate-400 dark:hover:border-white/20 bg-white dark:bg-[#111318] text-xs font-semibold text-[#0B0D12] dark:text-[#F8FAFC] transition-all duration-200 shadow-2xs"
            >
              Explore Our Projects
            </Link>
            <Link
              to="/about"
              onClick={playClick}
              className="w-full sm:w-auto text-center px-6 py-3.5 rounded-xl border border-slate-900/[0.12] dark:border-white/[0.08] hover:border-slate-400 dark:hover:border-white/20 bg-white dark:bg-[#111318] text-xs font-semibold text-[#0B0D12] dark:text-[#F8FAFC] transition-all duration-200 shadow-2xs"
            >
              Learn About Nexnam
            </Link>
          </div>
        </section>

        {/* Custom Service Inquiry Alert */}
        <m.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full text-center p-8 rounded-2xl bg-white dark:bg-[#111318] border border-slate-900/[0.08] dark:border-white/[0.08] shadow-2xs"
        >
          <p className="text-sm sm:text-base text-[#5F6470] dark:text-[#9CA3AF]">
            Not sure what you need?{" "}
            <Link
              to="/contact"
              onClick={playClick}
              className="text-[#5B5CF6] dark:text-[#7C7DFF] font-bold hover:underline ml-1"
            >
              Contact Nexnam and we’ll guide you.
            </Link>
          </p>
        </m.div>
      </div>
    </div>
  );
}

