import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, Send, CheckCircle2, Sparkles, AlertCircle, ArrowUpRight, Clock } from "lucide-react";
import SEO from "../components/SEO";
import { playHover, playClick, playSuccess } from "../utils/soundManager";
import { supabase } from "../lib/supabaseClient";
import emailjs from "@emailjs/browser";

// Reusable FAQ Item Sub-component for Accessibility & Clean Code
function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="rounded-2xl bg-white border border-slate-900/[0.08] shadow-[0_2px_10px_rgba(15,23,42,0.02)] hover:border-[#5B5CF6]/30 transition-all duration-300 overflow-hidden">
      <button
        type="button"
        onClick={() => {
          playClick();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={playHover}
        className="w-full px-6 py-4 flex items-center justify-between text-left text-[#0B0D12] hover:text-[#5B5CF6] transition-colors font-sans font-semibold text-sm cursor-pointer"
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
        <p className="px-6 pb-5 pt-1 text-xs text-[#5F6470] leading-relaxed border-t border-slate-100">
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

      // Send auto-reply thank-you email via EmailJS (non-blocking)
      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            to_email: formData.email,
            to_name: formData.name,
            from_name: "Nexnam",
            service: formData.service,
            budget: formData.budget,
            message: formData.message,
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
        console.log("Auto-reply email sent to:", formData.email);
      } catch (emailErr) {
        console.warn("Auto-reply email failed (non-blocking):", emailErr);
      }

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
    <div className="flex-grow z-10 w-full bg-gradient-to-b from-[#FAFAFA] to-[#F4F5F7] min-h-screen pt-28 pb-20 px-6 sm:px-8">
      <SEO
        title="Start Your Project with Nexnam | Contact"
        description="Contact Nexnam to build your website, app, landing page, dashboard or digital solution."
      />
      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5B5CF6]/8 border border-[#5B5CF6]/15 text-xs text-[#5B5CF6] font-semibold tracking-widest uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#5B5CF6]" />
            Launch Sync
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0B0D12] mb-4 font-sans leading-tight"
          >
            Start Your Project{" "}
            <span className="text-[#5B5CF6]">
              with Nexnam
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-[#5F6470] leading-relaxed font-normal"
          >
            Fill out the technical details of your startup MVP, website, or workflow design, and we'll reply with a comprehensive quote within 12 hours.
          </motion.p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          {/* Left Column: Cohesive Contact Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="bg-white border border-slate-900/[0.08] rounded-3xl p-7 sm:p-8 shadow-[0_8px_30px_rgba(15,23,42,0.03)] flex flex-col justify-between gap-8">
              <div>
                <h2 className="text-xl font-bold text-[#0B0D12] mb-6 font-sans">Contact Nexnam</h2>
                
                <div className="flex flex-col gap-6">
                  {/* Email Direct link */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#5B5CF6]/8 border border-[#5B5CF6]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-4.5 h-4.5 text-[#5B5CF6]" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#5F6470] uppercase tracking-wider block mb-0.5">
                        Direct Email
                      </span>
                      <a
                        href="mailto:nexnam49@gmail.com"
                        onMouseEnter={playHover}
                        onClick={playClick}
                        className="text-sm font-semibold text-[#0B0D12] hover:text-[#5B5CF6] transition-colors"
                      >
                        nexnam49@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Response time block */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#5B5CF6]/8 border border-[#5B5CF6]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4.5 h-4.5 text-[#5B5CF6]" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#5F6470] uppercase tracking-wider block mb-0.5">
                        Response Time
                      </span>
                      <p className="text-sm font-semibold text-[#0B0D12]">
                        Under 12 Hours // 24/7 Mindset
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Refined Premium WhatsApp Block */}
              <div className="bg-[#FAFAFA] border border-slate-900/[0.08] rounded-2xl p-6 flex flex-col gap-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366]">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.057 5.284 5.349 0 11.859 0c3.15.001 6.113 1.23 8.344 3.463 2.23 2.233 3.458 5.196 3.458 8.351 0 6.549-5.292 11.833-11.802 11.833-2.008-.002-3.978-.517-5.719-1.498L0 24zm6.49-4.731c1.656.982 3.28 1.499 4.887 1.5 5.413 0 9.817-4.394 9.821-9.794 0-2.615-1.02-5.074-2.871-6.928C16.48 2.193 14.03 1.171 11.84 1.172c-5.417 0-9.821 4.397-9.825 9.8.001 1.95.51 3.85 1.474 5.534l-.973 3.56 3.641-.954zm11.378-5.328c-.287-.144-1.701-.84-1.967-.936-.266-.096-.46-.144-.652.144-.192.288-.744.936-.912 1.129-.168.193-.336.216-.624.072-1.359-.684-2.281-1.208-3.21-2.802-.246-.423.246-.393.704-1.306.079-.159.039-.3-.02-.444-.059-.144-.46-1.104-.63-1.512-.165-.396-.333-.342-.46-.349-.12-.007-.257-.008-.393-.008-.137 0-.36.051-.548.257-.188.206-.72.703-.72 1.714 0 1.011.736 1.986.837 2.122.101.136 1.448 2.21 3.507 3.097.49.212.873.339 1.171.433.493.156.942.134 1.297.081.395-.058 1.701-.696 1.943-1.368.242-.672.242-1.25.17-1.368-.073-.118-.266-.192-.553-.336z" />
                    </svg>
                    <h3 className="text-base font-bold text-[#0B0D12] font-sans">
                      WhatsApp
                    </h3>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#25D366]" aria-label="Online status" />
                </div>

                <p className="text-xs text-[#5F6470] leading-relaxed">
                  Direct chat with our technical team. Connect instantly to discuss project specifications.
                </p>

                <a
                  href="https://wa.me/919329584097?text=Hello%20Nexnam%21%20I%27d%20like%20to%20inquire%20about%20starting%20a%20project%20with%20you."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="w-full py-3 px-4 rounded-xl bg-[#111318] hover:bg-[#1f222a] text-white text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-2xs hover:-translate-y-0.5"
                >
                  Launch Chat in WhatsApp
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#25D366]" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="bg-white border border-slate-900/[0.08] rounded-3xl p-7 sm:p-10 shadow-[0_8px_30px_rgba(15,23,42,0.03)] relative overflow-hidden">
              <h2 className="text-xl font-bold text-[#0B0D12] mb-6 font-sans">Tell Us About Your Project</h2>
              <AnimatePresence mode="wait">
                {!submitSuccess ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                  >
                    {/* Row 1: Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name input */}
                      <div className="flex flex-col">
                        <label htmlFor="name" className="text-[13px] font-semibold text-slate-800 font-sans mb-1.5">
                          Full Name <span className="text-[#5B5CF6]">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onMouseEnter={playHover}
                          placeholder="e.g. Naman Sable"
                          className={`h-12 w-full px-4 rounded-xl bg-slate-50 border text-sm text-[#0B0D12] placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#5B5CF6] focus:ring-4 focus:ring-[#5B5CF6]/10 transition-colors ${
                            errors.name ? "border-red-500" : "border-slate-200"
                          }`}
                        />
                        {errors.name && (
                          <span className="text-[11px] text-red-500 font-sans flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3 h-3" /> {errors.name}
                          </span>
                        )}
                      </div>

                      {/* Email input */}
                      <div className="flex flex-col">
                        <label htmlFor="email" className="text-[13px] font-semibold text-slate-800 font-sans mb-1.5">
                          Email Address <span className="text-[#5B5CF6]">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onMouseEnter={playHover}
                          placeholder="e.g. client@company.com"
                          className={`h-12 w-full px-4 rounded-xl bg-slate-50 border text-sm text-[#0B0D12] placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#5B5CF6] focus:ring-4 focus:ring-[#5B5CF6]/10 transition-colors ${
                            errors.email ? "border-red-500" : "border-slate-200"
                          }`}
                        />
                        {errors.email && (
                          <span className="text-[11px] text-red-500 font-sans flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3 h-3" /> {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Phone & Service */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Phone input */}
                      <div className="flex flex-col">
                        <label htmlFor="phone" className="text-[13px] font-semibold text-slate-800 font-sans mb-1.5">
                          Phone Number <span className="text-[#5B5CF6]">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onMouseEnter={playHover}
                          placeholder="e.g. +91 98765 43210"
                          className={`h-12 w-full px-4 rounded-xl bg-slate-50 border text-sm text-[#0B0D12] placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#5B5CF6] focus:ring-4 focus:ring-[#5B5CF6]/10 transition-colors ${
                            errors.phone ? "border-red-500" : "border-slate-200"
                          }`}
                        />
                        {errors.phone && (
                          <span className="text-[11px] text-red-500 font-sans flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3 h-3" /> {errors.phone}
                          </span>
                        )}
                      </div>

                      {/* Service Dropdown */}
                      <div className="flex flex-col">
                        <label htmlFor="service" className="text-[13px] font-semibold text-slate-800 font-sans mb-1.5">
                          Service Needed <span className="text-[#5B5CF6]">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            onMouseEnter={playHover}
                            className={`h-12 w-full px-4 rounded-xl bg-slate-50 border text-sm text-[#0B0D12] focus:bg-white focus:outline-none focus:border-[#5B5CF6] focus:ring-4 focus:ring-[#5B5CF6]/10 transition-colors appearance-none cursor-pointer ${
                              errors.service ? "border-red-500" : "border-slate-200"
                            }`}
                          >
                            <option value="" className="bg-white text-[#0B0D12]">-- Choose Category --</option>
                            {serviceOptions.map((opt) => (
                              <option key={opt} value={opt} className="bg-white text-[#0B0D12]">
                                {opt}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 text-xs">
                            ▼
                          </div>
                        </div>
                        {errors.service && (
                          <span className="text-[11px] text-red-500 font-sans flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3 h-3" /> {errors.service}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Row 3: Budget Dropdown */}
                    <div className="flex flex-col">
                      <label htmlFor="budget" className="text-[13px] font-semibold text-slate-800 font-sans mb-1.5">
                        Project Budget Range <span className="text-[#5B5CF6]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          onMouseEnter={playHover}
                          className={`h-12 w-full px-4 rounded-xl bg-slate-50 border text-sm text-[#0B0D12] focus:bg-white focus:outline-none focus:border-[#5B5CF6] focus:ring-4 focus:ring-[#5B5CF6]/10 transition-colors appearance-none cursor-pointer ${
                            errors.budget ? "border-red-500" : "border-slate-200"
                          }`}
                        >
                          <option value="" className="bg-white text-[#0B0D12]">-- Choose Budget Range --</option>
                          {budgetOptions.map((opt) => (
                            <option key={opt} value={opt} className="bg-white text-[#0B0D12]">
                              {opt}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 text-xs">
                          ▼
                        </div>
                      </div>
                      {errors.budget && (
                        <span className="text-[11px] text-red-500 font-sans flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" /> {errors.budget}
                        </span>
                      )}
                    </div>

                    {/* Row 4: Message textarea */}
                    <div className="flex flex-col">
                      <label htmlFor="message" className="text-[13px] font-semibold text-slate-800 font-sans mb-1.5">
                        Project Details / Message <span className="text-[#5B5CF6]">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onMouseEnter={playHover}
                        rows={4}
                        placeholder="Tell us about your project features, integrations, and ideal launch timeline..."
                        className={`min-h-[130px] p-4 rounded-xl bg-slate-50 border text-sm text-[#0B0D12] placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#5B5CF6] focus:ring-4 focus:ring-[#5B5CF6]/10 transition-colors resize-none ${
                          errors.message ? "border-red-500" : "border-slate-200"
                        }`}
                      />
                      {errors.message && (
                        <span className="text-[11px] text-red-500 font-sans flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" /> {errors.message}
                        </span>
                      )}
                    </div>

                    {errors.submit && (
                      <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-sans flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errors.submit}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      onMouseEnter={playHover}
                      className="w-full h-13 py-3.5 rounded-xl bg-[#111318] hover:bg-[#1f222a] text-white text-xs font-semibold tracking-wide font-sans shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 mt-1"
                    >
                      {isSubmitting ? (
                        <>Sending Project Inquiry...</>
                      ) : (
                        <>
                          Send Project Inquiry
                          <ArrowUpRight className="w-4 h-4" />
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
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-6">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#0B0D12] mb-2 font-sans">
                      Thank you!
                    </h2>
                    <p className="text-sm text-[#5F6470] max-w-md leading-relaxed mb-8">
                      Nexnam team will contact you soon.
                    </p>
                    <button
                      onClick={() => {
                        playClick();
                        setSubmitSuccess(false);
                      }}
                      onMouseEnter={playHover}
                      className="px-6 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-all cursor-pointer"
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
        <section className="mt-20 py-16 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-violet-600 uppercase mb-3 block">
              Common Questions
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
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
            <p className="text-xs text-slate-500 mb-4 font-mono">
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
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold tracking-wider uppercase font-mono shadow-sm hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 cursor-pointer"
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
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:border-indigo-300 shadow-xs text-xs font-bold tracking-wider uppercase font-mono transition-all duration-300 cursor-pointer"
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
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:border-violet-300 shadow-xs text-xs font-bold tracking-wider uppercase font-mono transition-all duration-300 cursor-pointer"
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

