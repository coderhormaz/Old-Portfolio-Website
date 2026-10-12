"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode, useRef } from "react";

interface CardSpotlightProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export const CardSpotlight = ({
  children,
  className,
  spotlightColor = "#ffffff",
}: CardSpotlightProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // Track the pointer position in CSS vars via ref (no re-renders).
  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.16),0_0_0_1px_rgba(255,255,255,0.04)_inset] hover:bg-white/[0.04] hover:border-white/[0.12] hover:shadow-[0_12px_40px_rgba(0,0,0,0.22),0_0_60px_rgba(245,158,11,0.03)] transition-all duration-500",
        className
      )}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
      <div className="relative z-10">{children}</div>
      
      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${spotlightColor}20, transparent 40%)`,
        }}
      />
    </div>
  );
};
