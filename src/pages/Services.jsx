import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion as m } from "framer-motion";
import { Sparkles, Grid } from "lucide-react";
import { updateSEO } from "../utils/seoHelper";
import ServiceCard from "../components/ServiceCard";
import { defaultServices } from "../data/servicesData";
import { playClick } from "../utils/soundManager";

export default function Services() {
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    updateSEO(
      "Our Digital Services | Nexnam",
      "Explore Nexnam's digital solutions: Website Development, Landing Pages, Web Apps, Mobile Apps, UI/UX Design, Startup MVPs, Business Automation, Custom Software, and SEO.",
      "website development, app development, startup mvp, automation, UI UX, SEO optimization"
    );

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
            Futuristic{" "}
            <span className="bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple bg-clip-text text-transparent">
              Digital Services
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
