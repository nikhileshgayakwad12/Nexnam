import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { playHover, playClick } from "../utils/soundManager";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = () => {
    playClick();
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Pricing", path: "/pricing" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-40 w-full border-b border-slate-900/[0.08] bg-white/90 backdrop-blur-[14px] shadow-[0_2px_15px_rgba(15,23,42,0.03)]"
      >
        <div className="mx-auto flex max-w-7xl h-16 sm:h-20 items-center justify-between px-4 sm:px-8">
          {/* Logo / Navbar Brand */}
          <Link
            to="/"
            onClick={handleNavClick}
            onMouseEnter={playHover}
            className="flex items-center group cursor-pointer select-none py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B5CF6] rounded-md"
            aria-label="Nexnam Home"
          >
            <span className="text-[20px] sm:text-[24px] font-[750] tracking-[-0.04em] text-[#0B0D12] group-hover:opacity-90 transition-opacity font-sans leading-none">
              Nexnam<span className="text-[#5B5CF6]">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onMouseEnter={playHover}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `relative py-2 text-sm font-medium tracking-normal transition-all duration-200 ${
                    isActive ? "text-[#0B0D12] font-semibold" : "text-[#5F6470] hover:text-[#0B0D12]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 h-[2px] w-full bg-[#5B5CF6] rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* CTA Trigger */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => {
                playClick();
                navigate("/contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onMouseEnter={playHover}
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold tracking-wide text-white rounded-[10px] bg-[#111318] hover:bg-[#1f222a] shadow-[0_4px_14px_rgba(0,0,0,0.08)] hover:-translate-y-[1px] transition-all duration-200 active:scale-[0.98] cursor-pointer group"
            >
              Get Started
              <ArrowUpRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button (44x44px touch target) */}
          <button
            onClick={() => {
              playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            onMouseEnter={playHover}
            className="flex items-center justify-center w-11 h-11 md:hidden text-[#0B0D12] hover:text-[#5B5CF6] transition-colors cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B5CF6]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed top-16 sm:top-20 left-0 w-full z-30 border-b border-slate-200 bg-white/98 backdrop-blur-xl shadow-xl overflow-hidden"
          >
            <div className="px-5 py-5 sm:px-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onMouseEnter={playHover}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `text-base font-semibold tracking-normal transition-colors py-3 px-3 rounded-lg border-b border-slate-100/60 min-h-[48px] flex items-center ${
                      isActive ? "text-[#5B5CF6] bg-[#5B5CF6]/5 font-bold" : "text-[#5F6470] hover:text-[#0B0D12] hover:bg-slate-50"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <button
                onClick={() => {
                  playClick();
                  setMobileMenuOpen(false);
                  navigate("/contact");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onMouseEnter={playHover}
                className="w-full mt-3 h-12 flex items-center justify-center rounded-xl bg-[#111318] text-white font-semibold tracking-wide text-xs shadow-md hover:bg-[#1f222a] active:scale-[0.98] cursor-pointer"
              >
                Get Started
                <ArrowUpRight className="ml-1.5 w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

