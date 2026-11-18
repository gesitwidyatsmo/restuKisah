'use client';

import React from 'react';

export interface BaroqueCartoucheFrameProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Classical Baroque Corner Flourish SVG
 * Recreates the exact ornate concave scoop, volute swirl, and decorative gold bead
 * from the royal Javanese baroque frame in the reference design.
 */
function CornerFlourish({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-8 h-8 sm:w-11 sm:h-11 pointer-events-none text-[#C29D59] ${className}`}
      aria-hidden="true"
    >
      {/* Outer baroque concave swooping arc connecting top line to side line */}
      <path
        d="M2 5.5 C16 5.5 42.5 32 42.5 46"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Inner delicate parallel accent curve */}
      <path
        d="M5 8.5 C17 8.5 39.5 31 39.5 43"
        stroke="#D4AF37"
        strokeWidth="0.6"
        strokeOpacity="0.65"
        strokeLinecap="round"
        fill="none"
      />

      {/* Classical Baroque Volute / Spiral Curl */}
      <path
        d="M23 18 C26 13 33 13 34 19 C35 26 25 28 23 23 C22 19 26 17 29 19 C30 22 28 24 25 23"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Outward ornamental flourish loop at the corner crest */}
      <path
        d="M31 12 C35 7 42 9 41 15 C40 18 36 17 34 14"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
      />

      {/* Soft filigree leaf accent */}
      <path
        d="M14 6 C17 9 20 12 24 14"
        stroke="#D4AF37"
        strokeWidth="0.75"
        strokeLinecap="round"
        fill="none"
      />

      {/* Center Polished Gold Pearl Bead */}
      <circle cx="26" cy="21" r="2.2" fill="currentColor" />
      <circle cx="25.4" cy="20.4" r="0.9" fill="#FEF08A" />

      {/* Outer corner micro-pearl */}
      <circle cx="38" cy="11" r="1.4" fill="currentColor" />
    </svg>
  );
}

/**
 * BaroqueCartoucheFrame
 * Bingkai panel informasi bergaya baroque klasik murni dengan CSS + SVG vector.
 * - Sangat mirip dengan bentuk pada gambar contoh
 * - Bebas dibesarkan ke bawah sepuasnya tanpa distorsi pada sudut-sudut ornamen
 * - Super tajam di semua resolusi layar (Retina / 4K / Mobile)
 */
export default function BaroqueCartoucheFrame({
  className = '',
  children
}: BaroqueCartoucheFrameProps) {
  return (
    <div className={`relative w-full ${className}`}>
      {/* ------------------------------------------------------------- */}
      {/* 1. SOFT WARM IVORY PARCHMENT SURFACE FILL                    */}
      {/* ------------------------------------------------------------- */}
      <div
        className="absolute inset-0 rounded-[20px] sm:rounded-[24px] pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle at 50% 35%, #FDFBF7 0%, #FAF6EE 75%, #F5ECE0 100%)',
          boxShadow:
            'inset 0 0 16px rgba(181, 138, 69, 0.08), 0 4px 18px rgba(44, 24, 16, 0.05)',
        }}
      />

      {/* ------------------------------------------------------------- */}
      {/* 2. VECTOR CONNECTING BORDER LINES (STRETCH SMOOTHLY ANY SIZE) */}
      {/* ------------------------------------------------------------- */}
      {/* Top Outer Gold Line */}
      <div
        className="absolute top-[5px] left-[30px] sm:left-[42px] right-[30px] sm:right-[42px] h-[1.3px] pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(to right, #B58A45 0%, #C29D59 20%, #E8D5B5 50%, #C29D59 80%, #B58A45 100%)',
        }}
      />
      {/* Top Inner Hairline Accent */}
      <div
        className="absolute top-[8.5px] left-[32px] sm:left-[44px] right-[32px] sm:right-[44px] h-[0.6px] pointer-events-none z-10 opacity-60"
        style={{
          background:
            'linear-gradient(to right, transparent, #D4AF37 25%, #FFFBEB 50%, #D4AF37 75%, transparent)',
        }}
      />

      {/* Bottom Outer Gold Line */}
      <div
        className="absolute bottom-[5px] left-[30px] sm:left-[42px] right-[30px] sm:right-[42px] h-[1.3px] pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(to right, #B58A45 0%, #C29D59 20%, #E8D5B5 50%, #C29D59 80%, #B58A45 100%)',
        }}
      />
      {/* Bottom Inner Hairline Accent */}
      <div
        className="absolute bottom-[8.5px] left-[32px] sm:left-[44px] right-[32px] sm:right-[44px] h-[0.6px] pointer-events-none z-10 opacity-60"
        style={{
          background:
            'linear-gradient(to right, transparent, #D4AF37 25%, #FFFBEB 50%, #D4AF37 75%, transparent)',
        }}
      />

      {/* Right Outer Gold Line */}
      <div
        className="absolute top-[30px] sm:top-[42px] bottom-[30px] sm:bottom-[42px] right-[5px] w-[1.3px] pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(to bottom, #B58A45 0%, #C29D59 25%, #E8D5B5 50%, #C29D59 75%, #B58A45 100%)',
        }}
      />
      {/* Right Inner Hairline Accent */}
      <div
        className="absolute top-[32px] sm:top-[44px] bottom-[32px] sm:bottom-[44px] right-[8.5px] w-[0.6px] pointer-events-none z-10 opacity-60"
        style={{
          background:
            'linear-gradient(to bottom, transparent, #D4AF37 25%, #FFFBEB 50%, #D4AF37 75%, transparent)',
        }}
      />

      {/* Left Outer Gold Line */}
      <div
        className="absolute top-[30px] sm:top-[42px] bottom-[30px] sm:bottom-[42px] left-[5px] w-[1.3px] pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(to bottom, #B58A45 0%, #C29D59 25%, #E8D5B5 50%, #C29D59 75%, #B58A45 100%)',
        }}
      />
      {/* Left Inner Hairline Accent */}
      <div
        className="absolute top-[32px] sm:top-[44px] bottom-[32px] sm:bottom-[44px] left-[8.5px] w-[0.6px] pointer-events-none z-10 opacity-60"
        style={{
          background:
            'linear-gradient(to bottom, transparent, #D4AF37 25%, #FFFBEB 50%, #D4AF37 75%, transparent)',
        }}
      />

      {/* ------------------------------------------------------------- */}
      {/* 3. THE 4 ORNATE BAROQUE CORNER FLOURISHES (FIXED & CRISP)     */}
      {/* ------------------------------------------------------------- */}
      {/* Top-Right Corner */}
      <div className="absolute top-0 right-0 z-20 pointer-events-none">
        <CornerFlourish />
      </div>

      {/* Bottom-Right Corner */}
      <div className="absolute bottom-0 right-0 z-20 pointer-events-none scale-y-[-1]">
        <CornerFlourish />
      </div>

      {/* Top-Left Corner */}
      <div className="absolute top-0 left-0 z-20 pointer-events-none scale-x-[-1]">
        <CornerFlourish />
      </div>

      {/* Bottom-Left Corner */}
      <div className="absolute bottom-0 left-0 z-20 pointer-events-none scale-x-[-1] scale-y-[-1]">
        <CornerFlourish />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. CONTENT WRAPPER                                            */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
