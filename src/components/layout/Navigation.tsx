"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "#home", type: "scroll" },
  { name: "About", href: "#about", type: "scroll" },
  { name: "Experience", href: "#experience", type: "scroll" },
  { name: "Projects", href: "#projects", type: "scroll" },
  { name: "Contact", href: "#contact", type: "scroll" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Lock background scroll while the mobile menu is open so the page
  // behind doesn't scroll, and always restore it when the menu closes.
  useEffect(() => {
    if (!isMobileMenuOpen || typeof document === "undefined") return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isMobileMenuOpen]);

  const handleScrollSpy = useCallback(() => {
    setIsScrolled(window.scrollY > 50);

    const sections = navItems.map(item => item.href.replace("#", ""));
    const scrollPos = window.scrollY + 120;

    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el && el.offsetTop <= scrollPos) {
        setActiveSection(sections[i]);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [handleScrollSpy]);

  const handleNavigation = (item: { name?: string; href: string; type: string }) => {
    if (item.type === "scroll") {
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = item.href;
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full",
        isScrolled
          ? "glass-nav"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Hormaz
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item)}
                  className={cn(
                    "relative px-3 py-1.5 rounded-lg text-sm xl:text-base transition-colors duration-300",
                    isActive
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/[0.08] rounded-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button 
              onClick={() => handleNavigation({ href: "#contact", type: "scroll" })}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-lg transition-all duration-300 px-4 xl:px-6 py-2 text-sm xl:text-base shadow-[0_2px_12px_rgba(245,158,11,0.2)] hover:shadow-[0_4px_20px_rgba(245,158,11,0.3)]"
            >
              Let&apos;s Talk
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative w-6 h-6 flex flex-col justify-center items-center focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <span className={cn(
              "w-6 h-0.5 bg-white transition-all duration-300 absolute",
              isMobileMenuOpen ? "rotate-45" : "-translate-y-1.5"
            )} />
            <span className={cn(
              "w-6 h-0.5 bg-white transition-all duration-300 absolute",
              isMobileMenuOpen ? "opacity-0" : ""
            )} />
            <span className={cn(
              "w-6 h-0.5 bg-white transition-all duration-300 absolute",
              isMobileMenuOpen ? "-rotate-45" : "translate-y-1.5"
            )} />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:hidden overflow-hidden w-full"
            >
              <div className="py-4 space-y-3 px-2 glass-card rounded-b-2xl mx-2 mb-2">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    onClick={() => handleNavigation(item)}
                    className="block w-full text-left text-slate-400 hover:text-white transition-colors duration-300 py-3 px-4 rounded-lg hover:bg-white/5"
                  >
                    {item.name}
                  </motion.button>
                ))}
                <Button 
                  onClick={() => handleNavigation({ href: "#contact", type: "scroll" })}
                  className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-lg transition-all duration-300 py-3"
                >
                  Let&apos;s Talk
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
