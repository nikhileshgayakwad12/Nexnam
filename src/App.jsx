import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminPanel from "./pages/AdminPanel";
import TechBackground3D from "./components/TechBackground3D";
import AIAssistant from "./components/AIAssistant";
import SkeletonLoader from "./components/SkeletonLoader";
import { playTransition } from "./utils/soundManager";
import { ThemeProvider } from "./context/ThemeContext";

// Scroll To Top on route change helper
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Play page transition sound trigger
    playTransition();
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const isAdminPath = location.pathname === "/admin-nexnam-panel";
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Premium loading transition timer to allow 3D canvas and components to settle
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {initialLoading && <SkeletonLoader key="initial-loader" />}
      </AnimatePresence>

      <ScrollToTop />
      <TechBackground3D />
      
      {/* Hide navbar on hidden admin panel */}
      {!isAdminPath && <Navbar />}

      <main className="flex-grow flex flex-col justify-start">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin-nexnam-panel" element={<AdminPanel />} />
        </Routes>
      </main>

      {/* Hide footer and floating actions on hidden admin panel */}
      {!isAdminPath && <Footer />}
      {!isAdminPath && <AIAssistant />}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}




