'use client';

import { useState, useEffect, useRef } from 'react';

export default function LandingHeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Track mouse if within or close to hero area
      if (
        e.clientX >= rect.left - 50 &&
        e.clientX <= rect.right + 50 &&
        e.clientY >= rect.top - 50 &&
        e.clientY <= rect.bottom + 50
      ) {
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      } else {
        setMousePos(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* 1. LAYER: AMBIENT AURORA GLOW ORBS */}
      <div className="absolute inset-0">
        {/* Top-center Warm Rose & Champagne Aura */}
        <div className="absolute -top-[12%] left-1/2 -translate-x-1/2 w-[650px] sm:w-[850px] h-[380px] sm:h-[480px] rounded-full bg-gradient-to-b from-rose-200/50 via-amber-100/35 to-transparent blur-[110px] animate-pulse-glow" />

        {/* Top-left Rose Blush Orb */}
        <div className="absolute top-[6%] -left-[10%] sm:left-[2%] w-[380px] sm:w-[500px] h-[380px] sm:h-[500px] rounded-full bg-gradient-to-tr from-rose-300/35 to-pink-200/20 blur-[100px] animate-float-slow" />

        {/* Top-right Warm Golden Champagne Orb */}
        <div className="absolute top-[10%] -right-[10%] sm:right-[3%] w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] rounded-full bg-gradient-to-bl from-amber-200/40 to-orange-100/25 blur-[100px] animate-float-reverse" />

        {/* Center-mid Ethereal Lilac / Violet Glow behind Mockup */}
        <div className="absolute top-[45%] left-1/2 -translate-x-1/2 w-[600px] sm:w-[780px] h-[400px] sm:h-[500px] rounded-full bg-gradient-to-r from-purple-200/25 via-rose-200/25 to-amber-200/20 blur-[120px]" />
      </div>

      {/* 2. LAYER: INTERACTIVE CURSOR SPOTLIGHT */}
      {mousePos && (
        <div
          className="absolute rounded-full blur-[85px] bg-gradient-to-r from-rose-300/30 via-amber-200/25 to-rose-200/30 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] transition-transform duration-150 ease-out"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
          }}
        />
      )}

      {/* 3. LAYER: SOPHISTICATED SVG DOT GRID WITH RADIAL VIGNETTE */}
      <svg
        className="absolute inset-0 w-full h-full opacity-85"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Detailed romantic grid pattern */}
          <pattern
            id="romantic-dot-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            {/* Primary Crisp Dot */}
            <circle cx="16" cy="16" r="1.3" fill="#1C1917" fillOpacity="0.13" />

            {/* Corner Micro Rose Accents */}
            <circle cx="0" cy="0" r="0.9" fill="#F43F5E" fillOpacity="0.22" />
            <circle cx="32" cy="0" r="0.9" fill="#F43F5E" fillOpacity="0.22" />
            <circle cx="0" cy="32" r="0.9" fill="#F43F5E" fillOpacity="0.22" />
            <circle cx="32" cy="32" r="0.9" fill="#F43F5E" fillOpacity="0.22" />

            {/* Subtle stationery cross accent */}
            <path
              d="M16 14.5V17.5M14.5 16H17.5"
              stroke="#D97706"
              strokeWidth="0.6"
              strokeOpacity="0.14"
            />
          </pattern>

          {/* Smooth radial fade mask so the dot grid breathes elegantly */}
          <radialGradient id="dot-vignette-mask" cx="50%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="78%" stopColor="#FFFFFF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          <mask id="hero-pattern-mask">
            <rect width="100%" height="100%" fill="url(#dot-vignette-mask)" />
          </mask>
        </defs>

        <rect
          width="100%"
          height="100%"
          fill="url(#romantic-dot-grid)"
          mask="url(#hero-pattern-mask)"
        />
      </svg>

      {/* 4. LAYER: TWINKLING ROMANTIC 4-POINT STARS (✦) */}
      {/* Top Left Gold Sparkle */}
      <div className="absolute top-[12%] left-[8%] sm:left-[12%] animate-twinkle text-amber-500/70">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.4 9.6L24 12L14.4 14.4L12 24L9.6 14.4L0 12L9.6 9.6L12 0Z" />
        </svg>
      </div>

      {/* Top Right Rose Sparkle */}
      <div className="absolute top-[22%] right-[7%] sm:right-[11%] animate-twinkle-delayed text-rose-400/80">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.4 9.6L24 12L14.4 14.4L12 24L9.6 14.4L0 12L9.6 9.6L12 0Z" />
        </svg>
      </div>

      {/* Mid Left Soft Peach Sparkle */}
      <div className="absolute top-[48%] left-[4%] sm:left-[7%] animate-twinkle-delayed text-rose-400/60">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.4 9.6L24 12L14.4 14.4L12 24L9.6 14.4L0 12L9.6 9.6L12 0Z" />
        </svg>
      </div>

      {/* Mid Right Lavender Sparkle */}
      <div className="absolute top-[52%] right-[5%] sm:right-[8%] animate-twinkle text-purple-400/70">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.4 9.6L24 12L14.4 14.4L12 24L9.6 14.4L0 12L9.6 9.6L12 0Z" />
        </svg>
      </div>

      {/* Bottom Center-Left Champagne Sparkle */}
      <div className="absolute bottom-[18%] left-[10%] animate-twinkle text-amber-400/65">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.4 9.6L24 12L14.4 14.4L12 24L9.6 14.4L0 12L9.6 9.6L12 0Z" />
        </svg>
      </div>

      {/* 5. LAYER: FLOATING NEO-BRUTALIST BADGES (Large screens only) */}
      <div className="absolute top-[16%] left-[3%] xl:left-[5%] hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/95 border-2 border-[#1C1917] shadow-hard-sm animate-float-slow">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
        </span>
        <span className="text-[11px] font-bold text-[#1C1917]">✨ Persiapan Bebas Stres</span>
      </div>

      <div className="absolute top-[38%] left-[2%] xl:left-[3.5%] hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-100/95 border-2 border-[#1C1917] shadow-hard-sm animate-float-reverse">
        <span className="text-xs">📋</span>
        <span className="text-[11px] font-bold text-[#1C1917]">KUA & Elsimil Checklist</span>
      </div>

      <div className="absolute top-[18%] right-[3%] xl:right-[5%] hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/95 border-2 border-[#1C1917] shadow-hard-sm animate-float-reverse">
        <span className="text-xs">💌</span>
        <span className="text-[11px] font-bold text-[#1C1917]">Undangan & QR Tamu</span>
      </div>

      <div className="absolute top-[42%] right-[2%] xl:right-[3.5%] hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-100/95 border-2 border-[#1C1917] shadow-hard-sm animate-float-slow">
        <span className="text-xs">💰</span>
        <span className="text-[11px] font-bold text-[#1C1917]">Kontrol Budget Vendor</span>
      </div>
    </div>
  );
}
