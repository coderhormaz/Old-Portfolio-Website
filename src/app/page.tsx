"use client";
import { useCallback, useEffect, useState } from "react";
import Navigation from "@/components/layout/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import Preloader from "@/components/ui/Preloader";
import { Linkedin, Instagram, Github, Mail } from "lucide-react";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { portfolioAnalytics, useScrollTracking } from "@/lib/analytics";

// SEO-optimized page for Hormaz Daruwala portfolio
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Lock background scroll while the preloader is visible and always
  // restore it afterwards. The failsafe guarantees the page can never get
  // stuck behind the preloader (a previous "unable to scroll" cause).
  useEffect(() => {
    if (!isLoading || typeof document === "undefined") return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const failsafe = setTimeout(() => setIsLoading(false), 4000);
    return () => {
      document.body.style.overflow = prevOverflow;
      clearTimeout(failsafe);
    };
  }, [isLoading]);

  // Set up scroll tracking for analytics
  useScrollTracking();

  return (
    <>      
      {/* Noscript fallback for accessibility */}
      <noscript>
        <div style={{padding: '20px', backgroundColor: '#f5f5f5', color: '#333'}}>
          <h1>Hormaz Daruwala - Full-Stack Developer</h1>
          <p>Welcome to the portfolio of Hormaz Daruwala, a full-stack developer specializing in React, Next.js, TypeScript, and modern web technologies.</p>
          
          <h2>Services</h2>
          <ul>
            <li>Full-Stack Web Development</li>
            <li>React &amp; Next.js Applications</li>
            <li>TypeScript Development</li>
            <li>UI/UX Design</li>
            <li>Performance Optimization</li>
          </ul>
          
          <h2>Contact</h2>
          <p>Email: hormazdaruwala86@gmail.com</p>
          <p>Website: https://hormaz.tech</p>
        </div>
      </noscript>

      {/* Preloader overlay - content remains in DOM for SEO */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      
      <main 
        className="min-h-screen text-white relative overflow-x-hidden w-full animate-in fade-in duration-1000"
        itemScope 
        itemType="https://schema.org/WebPage"
      >
        
        {/* Smooth custom cursor */}
        <SmoothCursor />
        
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
        >
          Skip to main content
        </a>
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main Content */}
        <div id="main-content">
          {/* Hero Section - Primary keyword focus */}
          <section 
            id="home" 
            className="relative z-10"
            itemScope 
            itemType="https://schema.org/Person"
            aria-label="Hormaz Daruwala - Full Stack Developer Introduction"
          >
            <meta itemProp="name" content="Hormaz Daruwala" />
            <meta itemProp="alternateName" content="coderhormaz" />
            <meta itemProp="jobTitle" content="Full-Stack Developer" />
            <meta itemProp="description" content="Professional Full-Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies." />
            <meta itemProp="url" content="https://hormaz.tech" />
            <HeroSection />
          </section>

          <div className="section-divider" />

          {/* About Section */}
          <section 
            id="about" 
            className="relative z-10"
            itemScope 
            itemType="https://schema.org/AboutPage"
            aria-label="About Hormaz Daruwala - Full Stack Developer"
          >
            <AboutSection />
          </section>

          <div className="section-divider" />
          
          {/* Projects Section */}
          <section 
            id="projects" 
            className="relative z-10"
            itemScope 
            itemType="https://schema.org/CreativeWork"
            aria-label="Hormaz Daruwala&apos;s Development Projects Portfolio"
          >
            <ProjectsSection />
          </section>

          <div className="section-divider" />
          
          {/* Contact Section */}
          <section 
            id="contact" 
            className="relative z-10"
            itemScope 
            itemType="https://schema.org/ContactPage"
            aria-label="Contact Hormaz Daruwala - Full Stack Developer"
          >
            <ContactSection />
          </section>
        </div>
      
      {/* Footer */}
      <footer className="py-8 sm:py-10 px-4 sm:px-6 glass-footer relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Top row: Brand | Links | Socials */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4 mb-6 sm:mb-8">
            {/* Brand */}
            <span className="text-lg font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Hormaz
            </span>

            {/* Nav links */}
            <nav className="flex items-center gap-6">
              {["Home", "About", "Projects", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm text-slate-500 hover:text-white transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </nav>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { name: "LinkedIn", icon: <Linkedin className="w-4 h-4" />, url: "https://www.linkedin.com/in/hormazdaruwala/" },
                { name: "Instagram", icon: <Instagram className="w-4 h-4" />, url: "https://www.instagram.com/hormaz_/" },
                { name: "GitHub", icon: <Github className="w-4 h-4" />, url: "https://github.com/coderhormaz" },
                { name: "Email", icon: <Mail className="w-4 h-4" />, url: "mailto:hormazdaruwala86@gmail.com" }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/[0.06] backdrop-blur-md transition-all duration-300"
                  onClick={() => portfolioAnalytics.trackSocialClick(social.name)}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Divider + copyright */}
          <div className="pt-6 border-t border-white/[0.04] text-center">
            <p className="text-slate-600 text-xs">
              © {new Date().getFullYear()} Hormaz Daruwala. Built with Next.js &amp; React Three Fiber.
            </p>
          </div>
        </div>
      </footer>
      </main>
    </>
  );
}
