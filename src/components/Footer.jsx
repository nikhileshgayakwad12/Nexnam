import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Globe, MapPin, ArrowUpRight, Phone } from "lucide-react";
import { playHover, playClick } from "../utils/soundManager";

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Footer() {
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { name: "LinkedIn", icon: LinkedinIcon, href: "https://www.linkedin.com/in/nexnam-tech-2a7b643a8?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
    { name: "Instagram", icon: InstagramIcon, href: "https://www.instagram.com/nexnamtech?igsh=MWxoOXJqa3ZjNjJ5MA==" }
  ];

  return (
    <footer className="w-full border-t border-slate-800 bg-[#0B0D12] text-slate-300 pt-12 sm:pt-16 pb-8 px-4 sm:px-8 mt-auto z-10 relative">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              onClick={() => handleLinkClick("/")}
              onMouseEnter={playHover}
              className="flex items-center group self-start py-1"
              aria-label="Nexnam Home"
            >
              <span className="text-[20px] sm:text-[22px] font-[750] tracking-[-0.04em] text-white group-hover:opacity-90 transition-opacity font-sans leading-none">
                Nexnam<span className="text-[#5B5CF6]">.</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Designing and developing modern websites, landing pages, apps, and digital solutions that help startups, creators, and businesses grow online.
            </p>
            <div className="flex items-center gap-2.5 mt-2">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="p-2 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700 transition-all duration-200"
                  aria-label={s.name}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-white uppercase mb-4 font-mono">
              Services
            </h3>
            <ul className="flex flex-col gap-2.5">
              {[
                { name: "Website Development", path: "/services" },
                { name: "Web App Development", path: "/services" },
                { name: "Mobile App Development", path: "/services" },
                { name: "UI/UX Design", path: "/services" },
                { name: "Startup MVP Development", path: "/services" }
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    onClick={() => handleLinkClick(item.path)}
                    onMouseEnter={playHover}
                    className="text-xs text-slate-400 hover:text-white hover:pl-1 transition-all duration-200 flex items-center font-medium"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-white uppercase mb-4 font-mono">
              Company
            </h3>
            <ul className="flex flex-col gap-2.5">
              {[
                { name: "Home", path: "/" },
                { name: "Services", path: "/services" },
                { name: "Projects", path: "/projects" },
                { name: "Pricing", path: "/pricing" },
                { name: "About Us", path: "/about" },
                { name: "Contact Us", path: "/contact" }
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    onClick={() => handleLinkClick(item.path)}
                    onMouseEnter={playHover}
                    className="text-xs text-slate-400 hover:text-white hover:pl-1 transition-all duration-200 font-medium"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts Column */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-white uppercase mb-4 font-mono">
              Contact Info
            </h3>
            <ul className="flex flex-col gap-3.5">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#5B5CF6] mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-500 font-mono font-semibold tracking-wider">EMAIL</span>
                  <a
                    href="mailto:nexnam49@gmail.com"
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className="text-xs text-slate-300 hover:text-white transition-colors font-medium"
                  >
                    nexnam49@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-500 font-mono font-semibold tracking-wider">WHATSAPP</span>
                  <a
                    href="https://wa.me/919329584097?text=Hello%20Nexnam%21%20I%27d%20like%20to%20inquire%20about%20starting%20a%20project%20with%20you."
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className="text-xs text-slate-300 hover:text-white transition-colors font-medium"
                  >
                    +91 93295 84097
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-500 font-mono font-semibold tracking-wider">ADDRESS</span>
                  <span className="text-xs text-slate-300 font-medium">
                    Indore, Madhya Pradesh
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Globe className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-500 font-mono font-semibold tracking-wider">RESPONSE TIME</span>
                  <span className="text-xs text-slate-300 font-medium">
                    Within 12 Hours
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-slate-800 mb-8" />

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-medium">
            &copy; 2026 Nexnam. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <Link
              to="/admin-nexnam-panel"
              onMouseEnter={playHover}
              onClick={() => handleLinkClick("/admin-nexnam-panel")}
              className="hover:text-slate-300 transition-colors font-medium"
            >
              Admin Panel
            </Link>
            <a
              href="https://www.termsfeed.com/live/45ff7155-602a-4865-b44a-348da4945cd8"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="hover:text-slate-300 transition-colors font-medium"
            >
              Privacy Policy
            </a>
            <a
              href="https://www.termsfeed.com/live/a6c01320-62ab-47c6-8c12-b998c23808d2"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="hover:text-slate-300 transition-colors font-medium"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

