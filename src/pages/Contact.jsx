import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MessageSquare, Send, CheckCircle2, Sparkles, AlertCircle } from "lucide-react";
import SEO from "../components/SEO";
import { playHover, playClick, playSuccess } from "../utils/soundManager";
import { supabase } from "../lib/supabaseClient";

// Reusable FAQ Item Sub-component for Accessibility & Clean Code
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
        className="w-full px-6 py-4 flex items-center justify-between text-left text-white hover:text-brand-cyan transition-colors font-mono font-semibold text-sm cursor-pointer"
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

export default function Contact() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Pre-selected service state from navigation redirects
  const preselectedService = location.state?.selectedService || "";

  useEffect(() => {
    // Scroll to top or other setups
  }, []);

  const serviceOptions = [
    "Website Development",
    "Landing Page",
    "Web App",
    "Mobile App",
    "Portfolio Website",
    "UI/UX Design",
    "SEO",
    "Business Automation",
    "Startup MVP",
    "Other"
  ];

  const budgetOptions = [
    "Below ₹5,000",
    "₹5,000 - ₹10,000",
    "₹10,000 - ₹25,000",
    "₹25,000+",
    "Not Sure Yet"
  ];

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: preselectedService || "",
    budget: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState("");

  // Sync selected service if updated via navigation redirects after initial render
  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Full Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.phone.replace(/\s/g, ""))) {
      tempErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.service) tempErrors.service = "Please select a service category";
    if (!formData.budget) tempErrors.budget = "Please select a budget range";
    if (!formData.message.trim() || formData.message.length < 10) {
      tempErrors.message = "Message must be at least 10 characters long";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playClick();
    
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const { error } = await supabase
        .from("contact_messages")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: formData.service,
            budget: formData.budget,
            message: formData.message,
            is_read: false
          }
        ]);

      if (error) throw error;

      setIsSubmitting(false);
      setSubmitSuccess(true);
      playSuccess();

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        budget: "",
        message: ""
      });
    } catch (err) {
      console.error("Error inserting inquiry in Supabase:", err);
      setErrors({ submit: err.message || "Failed to submit inquiry to database. Please check connection and try again." });
      setIsSubmitting(false);
    }
  };



  return (
    <div className="flex-grow z-10 w-full pt-32 pb-20 px-6 sm:px-8">
      <SEO
        title="Start Your Project with Nexnam | Contact"
        description="Contact Nexnam to build your website, app, landing page, dashboard or digital solution."
      />
      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-xs text-brand-cyan font-semibold tracking-wider uppercase font-mono mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Launch Sync
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-6"
          >
            Start Your Project{" "}
            <span className="bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple bg-clip-text text-transparent">
              with Nexnam
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-white/60 leading-relaxed"
          >
            Fill out the technical details of your startup MVP, website, or workflow design, and we'll reply with a comprehensive quote within 12 hours.
          </motion.p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Contact Info Info Panel */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card rounded-2xl p-6 md:p-8 border border-white/5 bg-gradient-to-br from-indigo-950/10 to-slate-900/10"
            >
              <h2 className="text-xl font-bold text-white mb-6">Contact Nexnam</h2>
              <div className="flex flex-col gap-6">
                {/* Email Direct link */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5 text-brand-cyan" />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono font-bold text-white/40 tracking-wider uppercase mb-1">
                      Direct Email
                    </h3>
                    <a
                      href="mailto:nexnam49@gmail.com"
                      onMouseEnter={playHover}
                      onClick={playClick}
                      className="text-sm text-white/80 hover:text-brand-cyan transition-colors"
                    >
                      nexnam49@gmail.com
                    </a>
                  </div>
                </div>

                {/* Response rate block */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center shrink-0 mt-0.5">
                    <MessageSquare className="w-5 h-5 text-brand-purple" />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono font-bold text-white/40 tracking-wider uppercase mb-1">
                      Average Response Rate
                    </h3>
                    <p className="text-sm text-white/80">
                      Under 12 Hours // 24/7 Mindset
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Direct Instant Messaging WhatsApp block */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card rounded-2xl p-6 md:p-8 border border-brand-cyan/20 bg-brand-cyan/5 flex flex-col gap-4"
            >
              <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
                Live WhatsApp Chat
              </h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Skip the brief form entirely and connect with our technical architect instantly via WhatsApp to chat about your project specs.
              </p>
              <a
                href="https://wa.me/919329584097?text=Hello%20Nexnam%21%20I%27d%20like%20to%20inquire%20about%20starting%20a%20project%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="w-full py-3.5 rounded-lg bg-green-500 hover:bg-green-600 text-brand-black text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer text-center block"
              >
                Launch Chat In WhatsApp //
              </a>
            </motion.div>
          </div>

          {/* Right: Contact Form Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="glass-card rounded-3xl p-8 border border-white/5 relative overflow-hidden">
              <h2 className="text-xl font-bold text-white mb-6">Tell Us About Your Project</h2>
              <AnimatePresence mode="wait">
                {!submitSuccess ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name input */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-xs font-mono font-bold text-white/60 tracking-wider">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onMouseEnter={playHover}
                          placeholder="e.g. Naman Sable"
                          className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-cyan transition-colors ${
                            errors.name ? "border-red-500/50" : "border-white/10"
                          }`}
                        />
                        {errors.name && (
                          <span className="text-[10px] text-red-400 font-mono flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.name}
                          </span>
                        )}
                      </div>

                      {/* Email input */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-xs font-mono font-bold text-white/60 tracking-wider">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onMouseEnter={playHover}
                          placeholder="e.g. client@company.com"
                          className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-cyan transition-colors ${
                            errors.email ? "border-red-500/50" : "border-white/10"
                          }`}
                        />
                        {errors.email && (
                          <span className="text-[10px] text-red-400 font-mono flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Phone input */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="text-xs font-mono font-bold text-white/60 tracking-wider">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onMouseEnter={playHover}
                          placeholder="e.g. +91 98765 43210"
                          className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-cyan transition-colors ${
                            errors.phone ? "border-red-500/50" : "border-white/10"
                          }`}
                        />
                        {errors.phone && (
                          <span className="text-[10px] text-red-400 font-mono flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.phone}
                          </span>
                        )}
                      </div>

                      {/* Service Dropdown */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="service" className="text-xs font-mono font-bold text-white/60 tracking-wider">
                          Service Needed *
                        </label>
                        <div className="relative">
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            onMouseEnter={playHover}
                            className={`w-full px-4 py-3 rounded-lg bg-brand-dark border text-sm text-white focus:outline-none focus:border-brand-cyan transition-colors appearance-none cursor-pointer ${
                              errors.service ? "border-red-500/50" : "border-white/10"
                            }`}
                          >
                            <option value="">-- Choose Category --</option>
                            {serviceOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/60">
                            ▼
                          </div>
                        </div>
                        {errors.service && (
                          <span className="text-[10px] text-red-400 font-mono flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.service}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Budget Dropdown */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="budget" className="text-xs font-mono font-bold text-white/60 tracking-wider">
                        Project Budget Range *
                      </label>
                      <div className="relative">
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          onMouseEnter={playHover}
                          className={`w-full px-4 py-3 rounded-lg bg-brand-dark border text-sm text-white focus:outline-none focus:border-brand-cyan transition-colors appearance-none cursor-pointer ${
                            errors.budget ? "border-red-500/50" : "border-white/10"
                          }`}
                        >
                          <option value="">-- Choose Budget --</option>
                          {budgetOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/60">
                          ▼
                        </div>
                      </div>
                      {errors.budget && (
                        <span className="text-[10px] text-red-400 font-mono flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.budget}
                        </span>
                      )}
                    </div>

                    {/* Message textarea */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-xs font-mono font-bold text-white/60 tracking-wider">
                        Project Details / Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onMouseEnter={playHover}
                        rows={5}
                        placeholder="Tell us about your project features, integrations, and ideal launch timeline..."
                        className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-cyan transition-colors resize-none ${
                          errors.message ? "border-red-500/50" : "border-white/10"
                        }`}
                      />
                      {errors.message && (
                        <span className="text-[10px] text-red-400 font-mono flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.message}
                        </span>
                      )}
                    </div>

                    {errors.submit && (
                      <div className="p-3 bg-red-950/15 border border-red-500/20 rounded-lg text-xs text-red-400 font-mono flex items-center gap-1.5 animate-pulse">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errors.submit}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      onMouseEnter={playHover}
                      className="w-full mt-2 py-4 rounded-lg bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple hover:shadow-[0_0_20px_rgba(0,245,255,0.35)] text-brand-black text-xs font-bold uppercase tracking-wider font-mono transition-all duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>Sending Project Inquiry...</>
                      ) : (
                        <>
                          Send Project Inquiry
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  // Success State
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-brand-cyan/10 border border-brand-cyan/35 flex items-center justify-center text-brand-cyan mb-6 animate-bounce">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">
                      Thank you!
                    </h2>
                    <p className="text-sm text-white/50 max-w-md leading-relaxed mb-8">
                      Nexnam team will contact you soon.
                    </p>
                    <button
                      onClick={() => {
                        playClick();
                        setSubmitSuccess(false);
                      }}
                      onMouseEnter={playHover}
                      className="px-6 py-2.5 rounded-lg border border-white/10 hover:border-brand-cyan/40 bg-white/5 text-xs font-mono uppercase font-bold tracking-wider text-white transition-all cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* FAQ Accordion Section */}
        <section className="mt-20 py-16 border-t border-white/5">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-brand-purple uppercase mb-3 block animate-pulse">
              Common Questions
            </span>
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-white/60">
              Clear answers regarding our technology stacks, project delivery cycles, and startup support setup.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4 mb-16">
            <FAQItem
              question="What type of websites does Nexnam build?"
              answer="Nexnam builds custom marketing websites, high-converting landing pages, portfolio sites, and interactive web applications tailored to your business needs."
            />
            <FAQItem
              question="How long does it take to build a website?"
              answer="Simple landing pages and portfolios take 1-2 weeks. More complex web applications or custom platforms are delivered within 4-6 weeks in structured sprints."
            />
            <FAQItem
              question="Can Nexnam build landing pages for local businesses?"
              answer="Yes, we create local business landing pages designed to drive calls, leads, and customer inquiries directly to your team."
            />
            <FAQItem
              question="Do you provide WhatsApp and contact form integration?"
              answer="Absolutely. All our sites come pre-integrated with WhatsApp widgets, custom inquiry forms, and email triggers to keep you connected with your visitors."
            />
            <FAQItem
              question="Can you help with SEO-friendly website structure?"
              answer="Yes, SEO is built in from day one. We implement clean HTML5 semantics, meta titles/descriptions, fast load times, and structured schemas to help your site rank."
            />
          </div>

          {/* Navigation links for Contact page */}
          <div className="text-center">
            <p className="text-xs text-white/40 mb-4 font-mono">
              Want to check our capabilities first?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  playClick();
                  navigate("/pricing");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onMouseEnter={playHover}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-brand-cyan to-brand-blue text-brand-black text-xs font-bold tracking-wider uppercase font-mono transition-all duration-300 cursor-pointer animate-pulse"
              >
                View Pricing Packages
              </button>
              <button
                onClick={() => {
                  playClick();
                  navigate("/services");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onMouseEnter={playHover}
                className="w-full sm:w-auto px-6 py-3 rounded-lg border border-white/10 hover:border-brand-cyan/40 bg-white/5 hover:bg-brand-cyan/5 text-xs font-bold text-white tracking-wider uppercase font-mono transition-all duration-300 cursor-pointer"
              >
                Explore Services
              </button>
              <button
                onClick={() => {
                  playClick();
                  navigate("/projects");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onMouseEnter={playHover}
                className="w-full sm:w-auto px-6 py-3 rounded-lg border border-white/10 hover:border-brand-purple/40 bg-white/5 hover:bg-brand-purple/5 text-xs font-bold text-white tracking-wider uppercase font-mono transition-all duration-300 cursor-pointer"
              >
                View Projects Gallery
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
