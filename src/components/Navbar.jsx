import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { playHover, playClick } from "../utils/soundManager";
import { useTheme } from "../context/ThemeContext";
import nexnamLogo from "../assets/brand/nexnam-logo.png";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

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
        className="sticky top-0 z-40 w-full border-b border-slate-900/[0.08] dark:border-white/[0.07] bg-white/90 dark:bg-[#090A0D]/88 backdrop-blur-[14px] shadow-[0_2px_15px_rgba(15,23,42,0.03)] transition-colors duration-250"
      >
        <div className="mx-auto flex max-w-7xl h-16 sm:h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo / Navbar Brand */}
          <Link
            to="/"
            onClick={handleNavClick}
            onMouseEnter={playHover}
            className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer select-none py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B5CF6] rounded-md"
            aria-label="Nexnam Home"
          >
            <div className="flex items-center justify-center p-1 sm:p-1.5 rounded-[9px] bg-[#111318] dark:bg-[#15171D] border border-slate-900/10 dark:border-white/10 shadow-xs transition-transform duration-200 group-hover:scale-105 shrink-0">
              <img
                src={nexnamLogo}
                alt="Nexnam"
                className="h-[24px] sm:h-[28px] w-auto object-contain"
              />
            </div>
            <span className="text-[20px] sm:text-[24px] font-[750] tracking-[-0.04em] text-[#0B0D12] dark:text-white group-hover:opacity-90 transition-opacity font-sans leading-none">
              Nexnam
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-9">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onMouseEnter={playHover}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `relative py-2 text-sm font-medium tracking-normal transition-all duration-200 ${
                    isActive
                      ? "text-[#0B0D12] dark:text-white font-semibold"
                      : "text-[#5F6470] dark:text-slate-400 hover:text-[#0B0D12] dark:hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 h-[2px] w-full bg-[#5B5CF6] dark:bg-[#7C7DFF] rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3.5">
            <button
              onClick={() => {
                playClick();
                toggleTheme();
              }}
              onMouseEnter={playHover}
              className="w-11 h-11 flex items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#15171D] text-slate-700 dark:text-slate-200 hover:border-indigo-400 dark:hover:border-[#7C7DFF]/50 shadow-xs transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B5CF6]"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-amber-400 transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600 transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            <button
              onClick={() => {
                playClick();
                navigate("/contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onMouseEnter={playHover}
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold tracking-wide text-white dark:text-[#090A0D] rounded-[10px] bg-[#111318] dark:bg-white hover:bg-[#1f222a] dark:hover:bg-slate-100 shadow-[0_4px_14px_rgba(0,0,0,0.08)] hover:-translate-y-[1px] transition-all duration-200 active:scale-[0.98] cursor-pointer group"
            >
              Get Started
              <ArrowUpRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => {
                playClick();
                toggleTheme();
              }}
              onMouseEnter={playHover}
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#15171D] text-slate-700 dark:text-slate-200 cursor-pointer"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              onMouseEnter={playHover}
              className="flex items-center justify-center w-11 h-11 text-[#0B0D12] dark:text-white hover:text-[#5B5CF6] dark:hover:text-[#7C7DFF] transition-colors cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B5CF6]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
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
            className="md:hidden fixed top-16 sm:top-20 left-0 w-full z-30 border-b border-slate-200 dark:border-white/10 bg-white/98 dark:bg-[#090A0D]/98 backdrop-blur-xl shadow-xl overflow-hidden"
          >
            <div className="px-5 py-5 sm:px-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onMouseEnter={playHover}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `text-base font-semibold tracking-normal transition-colors py-3 px-3 rounded-lg border-b border-slate-100/60 dark:border-white/5 min-h-[48px] flex items-center ${
                      isActive
                        ? "text-[#5B5CF6] dark:text-[#7C7DFF] bg-[#5B5CF6]/5 dark:bg-[#7C7DFF]/10 font-bold"
                        : "text-[#5F6470] dark:text-slate-400 hover:text-[#0B0D12] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900/50"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Appearance</span>
                <button
                  onClick={() => {
                    playClick();
                    toggleTheme();
                  }}
                  className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#15171D] text-slate-700 dark:text-slate-200 flex items-center gap-2"
                >
                  {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
                  <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
                </button>
              </div>

              <button
                onClick={() => {
                  playClick();
                  setMobileMenuOpen(false);
                  navigate("/contact");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onMouseEnter={playHover}
                className="w-full mt-3 h-12 flex items-center justify-center rounded-xl bg-[#111318] dark:bg-white text-white dark:text-[#090A0D] font-semibold tracking-wide text-xs shadow-md hover:bg-[#1f222a] dark:hover:bg-slate-100 active:scale-[0.98] cursor-pointer"
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


