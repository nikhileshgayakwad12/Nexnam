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
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-40 w-full border-b border-white/5 bg-brand-black/60 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-6 sm:px-8">
          {/* Logo */}
          <Link
            to="/"
            onClick={handleNavClick}
            onMouseEnter={playHover}
            className="flex items-center group"
          >
            <img
              src="/logo.png"
              alt="Nexnam Logo"
              className="h-8 w-auto rounded object-contain group-hover:opacity-90 transition-opacity"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onMouseEnter={playHover}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `relative py-2 text-sm font-medium tracking-wide transition-all duration-300 hover:text-white ${
                    isActive ? "text-brand-cyan" : "text-white/60"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-brand-cyan to-brand-blue"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
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
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-brand-black rounded-lg bg-gradient-to-r from-brand-cyan to-brand-blue hover:shadow-[0_0_25px_rgba(0,245,255,0.4)] transition-all duration-300 active:scale-95 cursor-pointer font-mono group"
            >
              Get Started
              <ArrowUpRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            onMouseEnter={playHover}
            className="flex p-2 md:hidden text-white/80 hover:text-brand-cyan transition-colors cursor-pointer"
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
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-20 left-0 w-full z-30 border-b border-white/10 bg-brand-black/95 backdrop-blur-xl"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onMouseEnter={playHover}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `text-lg font-medium tracking-wider transition-colors py-1 border-b border-white/5 ${
                      isActive ? "text-brand-cyan" : "text-white/70"
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
                className="w-full mt-4 flex items-center justify-center py-4 rounded-lg bg-gradient-to-r from-brand-cyan to-brand-purple text-brand-black font-bold uppercase tracking-wider text-sm font-mono hover:opacity-90 active:scale-[0.98] cursor-pointer"
              >
                Get Started
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
