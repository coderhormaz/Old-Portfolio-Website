"use client";
import React, { useEffect, useRef } from "react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import { ExternalLink, Github, Palette, Rocket, Layers, Layout, LayoutGrid, Trophy, Building2, Smartphone, Music2, Briefcase } from "lucide-react";
import { portfolioAnalytics } from "@/lib/analytics";

const projects = [
  {
    title: "Decentralised AI Agent Marketplace",
    badge: "🏅 Bounty",
    description: "Built at ETH Mumbai, this decentralised AI agent marketplace won a bounty and enables pay-per-query micropayments in USDC on Base via x402, with ENS-powered discovery, no KYC, and no subscriptions.",
    tech: ["Base", "USDC", "x402", "ENS", "TypeScript", "Next.js"],
    image: "/decentralised-ai-agent-marketplace.png",
    isVideo: false,
    demoUrl: "https://decentralised-ai-agent-marketplace.vercel.app/",
    codeUrl: "https://github.com/coderhormaz/Decentralised-AI-Agent-Marketplace",
  },
  {
    title: "AISkool.com — EdTech Admin Platform",
    description: "Full-stack work for an AI & Robotics EdTech platform: redesigned admin panel, built a complete auth system with RBAC, replaced Supabase with self-hosted PostgreSQL on a VPS, and managed Nginx/SSL/security hardening.",
    tech: ["Next.js", "PostgreSQL", "VPS", "Authentication", "Nginx", "SEO"],
    image: "/aiskool.png",
    isVideo: false,
    demoUrl: "https://aiskool.com",
    codeUrl: "#",
  },
  {
    title: "AI DeFi Trading Assistant",
    description: "An intelligent blockchain trading agent leveraging Gemini AI for natural language command processing on Polygon network. Provides automated token swaps, wallet generation, real-time price feeds, and seamless Uniswap V3 integration.",
    tech: ["TypeScript", "React", "Polygon", "Gemini AI", "Uniswap V3", "ethers.js"],
    image: "/ai-trading-agent.png",
    isVideo: false,
    demoUrl: "https://eth-global-2025-beige.vercel.app/dashboard",
    codeUrl: "https://github.com/coderhormaz/ETHGlobal_2025",
  },
  {
    title: "Parsi Calendar — Google Play",
    description: "Published mobile app for the Parsi/Zoroastrian community. Features event reminders, Parsi & Gregorian dual calendar support, monthly/weekly/agenda views, and a clean, intuitive UI. Available on the Google Play Store.",
    tech: ["React Native", "Expo", "TypeScript", "Mobile", "Google Play"],
    image: "",
    isVideo: false,
    demoUrl: "https://play.google.com/store",
    codeUrl: "https://github.com/coderhormaz",
  },
  {
    title: "Tarannum Khan — Dermatology Platform",
    description: "Full-featured skincare platform with online consultation booking, eCommerce for skincare products, cart & order management, stock alerts, revenue & analytics dashboard, and admin controls.",
    tech: ["Next.js", "PostgreSQL", "eCommerce", "Booking System", "Admin Panel"],
    image: "/tarannumkhan.mp4",
    isVideo: true,
    demoUrl: "https://tarannumkhan.in",
    codeUrl: "#",
  },
  {
    title: "VibeTune — AI Mood Music Player",
    description: "AI-powered music player that detects your facial emotion via OpenCV, accepts voice commands, plays Spotify previews, visualises a mood timeline, and dynamically themes the UI based on your emotional state.",
    tech: ["OpenCV", "Python", "Spotify API", "Web Speech API", "TypeScript"],
    image: "/vibe-tune-ai.jpeg",
    isVideo: false,
    demoUrl: "#",
    codeUrl: "https://github.com/coderhormaz",
  },
  {
    title: "opBNB AI Assistant",
    description: "A premium AI-powered assistant built on opBNB with ultra-low gas fees and 4,000+ TPS. Features secure authentication, auto wallet generation, and intelligent blockchain query assistance with glassmorphic UI.",
    tech: ["TypeScript", "React", "opBNB", "ethers.js", "Framer Motion", "Zustand"],
    image: "/bnbai.mp4",
    isVideo: true,
    demoUrl: "https://bnb-hackathon-bombay.vercel.app/",
    codeUrl: "https://github.com/coderhormaz/BNB_Hackathon",
  },
  {
    title: "Token Plus NFT Launcher",
    description: "A comprehensive platform for creating and deploying both NFTs and tokens on the Base blockchain, featuring a drawing board, customizable token parameters, and Web3 wallet integration.",
    tech: ["Web3.js", "React", "Solidity", "Base Chain", "MetaMask", "ERC-20/721"],
    image: "/basenft.mp4",
    isVideo: true,
    demoUrl: "https://kingsdontquit.netlify.app/",
    codeUrl: "https://github.com/coderhormaz/TokenPlusNFTlauncher",
  },
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Video thumbnail that only decodes/plays while visible.
 * Root cause of lag: every project video used autoPlay+loop, so 3 videos
 * decoded simultaneously (even offscreen / on mobile), janking scroll.
 */
const ProjectVideo = ({
  src,
  title,
  doubleSpeed = false,
}: {
  src: string;
  title: string;
  doubleSpeed?: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (doubleSpeed) el.playbackRate = 2.0;
    // Respect reduced-motion: show poster frame only, never autoplay.
    if (prefersReducedMotion()) {
      el.pause();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.play().catch(() => {
              /* autoplay blocked — user can tap to play */
            });
          } else {
            el.pause();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [src, doubleSpeed]);

  return (
    <video
      ref={videoRef}
      src={src}
      loop
      muted
      playsInline
      preload="metadata"
      disablePictureInPicture
      aria-label={`${title} preview video`}
      className="h-full w-full object-cover"
      style={{ height: "100%" }}
    />
  );
};

const ProjectsSection = () => {
  return (
    <section className="py-16 sm:py-20 relative w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <ScrollReveal>
            <div className="flex items-center gap-3 justify-center mb-4">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-amber-400/60" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-amber-400/70">Portfolio</span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-amber-400/60" />
            </div>
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white"
            >
              Featured Projects
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p 
              className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed px-4"
            >
            A showcase of my recent work, featuring innovative solutions and 
            cutting-edge technologies that push the boundaries of web development.
          </p>
          </ScrollReveal>
        </div>

        {/* Projects Grid */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-stretch" staggerDelay={0.12}>
          {projects.map((project) => (
            <StaggerItem key={project.title} className="relative group min-w-0 h-full">
              <CardSpotlight className="relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-xl border border-white/[0.06] hover:border-white/[0.12] bg-[#0a0e16]/50 hover:bg-[#0a0e16]/65 backdrop-blur-xl transition-all duration-500 glass-shine shadow-[0_8px_32px_rgba(0,0,0,0.16)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.24),0_0_60px_rgba(245,158,11,0.03)] p-0">
                {/* Project Image or Video */}
                <div className="project-media relative mx-3 mt-3 h-52 sm:h-60 md:h-64 overflow-hidden rounded-lg border border-white/[0.04]">
                  {project.isVideo ? (
                    <div className="w-full h-full relative" style={{ height: "100%" }}>
                      <ProjectVideo
                        src={project.image}
                        title={project.title}
                        doubleSpeed={project.image.includes("basenft")}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="pointer-events-none absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1"></span>
                        Video
                      </div>
                    </div>
                  ) : project.image.startsWith('/') && !project.image.includes('placeholder') ? (
                    <div className="w-full h-full relative" style={{ height: "100%" }}>
                      <Image 
                        src={project.image} 
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                  ) : (
                    <div className="w-full h-full min-h-44 bg-gradient-to-br from-amber-500/20 to-cyan-500/20 flex items-center justify-center" style={{ minHeight: "11rem" }}>
                      {"badge" in project && project.badge ? (
                        <Trophy className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-amber-400 opacity-60" />
                      ) : project.title.includes("AISkool") ? (
                        <Building2 className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-cyan-400 opacity-50" />
                      ) : project.title.includes("NFT") || project.title.includes("Token") ? (
                        <Palette className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-amber-400 opacity-50" />
                      ) : project.title.includes("Parsi") ? (
                        <Smartphone className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-green-400 opacity-50" />
                      ) : project.title.includes("VibeTune") ? (
                        <Music2 className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-pink-400 opacity-50" />
                      ) : project.title.includes("Tarannum") ? (
                        <Briefcase className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-rose-400 opacity-50" />
                      ) : (
                        <Rocket className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-blue-400 opacity-50" />
                      )}
                    </div>
                  )}
                </div>

                {/* Project Content — actions live here so they work on touch
                    (the old hover-only overlay was unreachable on mobile and its
                    invisible z-40 layer intercepted taps/scroll over the media). */}
                <div className="flex flex-1 flex-col gap-3 sm:gap-4 p-4 sm:p-6">
                  <div className="flex items-start gap-2 flex-wrap min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold text-white break-words group-hover:text-amber-300 transition-colors duration-300">
                      {project.title}
                    </h3>
                    {"badge" in project && project.badge && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 mt-1 shrink-0">
                        {project.badge}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-slate-400 leading-relaxed text-sm sm:text-base break-words">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-cyan-500/10 text-cyan-300 rounded-full border border-cyan-500/20 backdrop-blur-md break-words"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col min-[420px]:flex-row gap-3 pt-2 mt-auto">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-white text-black hover:bg-gray-200 text-sm px-4 py-2.5 min-h-11 shadow-md"
                      onClick={() => {
                        portfolioAnalytics.trackProjectView(project.title, 'demo');
                        window.open(project.demoUrl, '_blank');
                      }}
                      disabled={project.demoUrl === "#"}
                    >
                      <ExternalLink className="w-4 h-4 mr-1.5 shrink-0" /> Live Demo
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 border-white/20 text-white hover:bg-white/10 text-sm px-4 py-2.5 min-h-11 shadow-md"
                      onClick={() => {
                        portfolioAnalytics.trackProjectView(project.title, 'code');
                        window.open(project.codeUrl, '_blank');
                      }}
                      disabled={project.codeUrl === "#"}
                    >
                      <Github className="w-4 h-4 mr-1.5 shrink-0" /> View Code
                    </Button>
                  </div>
                </div>
              </CardSpotlight>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* View All Projects Button */}
        <ScrollReveal className="text-center mt-8 sm:mt-12">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-0.5 w-full sm:w-auto shadow-[0_4px_20px_rgba(245,158,11,0.2)] hover:shadow-[0_6px_30px_rgba(245,158,11,0.3)]"
            onClick={() => {
              portfolioAnalytics.trackSocialClick('GitHub');
              window.open("https://github.com/coderhormaz", '_blank');
            }}
          >
            View All Projects
            <ExternalLink className="ml-2 w-5 h-5" />
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProjectsSection;
