'use client';

import React from 'react';
import { motion } from 'framer-motion';
import BaroqueCartoucheFrame from './BaroqueCartoucheFrame';

export interface RoyalJavaneseBrideGroomProfileProps {
  // Header Section
  sectionTitle?: string;
  sectionSubtitle?: string;

  // Bride Information
  brideLabel?: string;
  brideName?: string;
  brideRelation?: string;
  brideFather?: string;
  brideMother?: string;
  brideInstagram?: string;
  brideInstagramUrl?: string;
  brideImage?: string;

  // Groom Information
  groomLabel?: string;
  groomName?: string;
  groomRelation?: string;
  groomFather?: string;
  groomMother?: string;
  groomInstagram?: string;
  groomInstagramUrl?: string;
  groomImage?: string;

  // Text Frame & Background Styling
  frameMode?: 'vector_baroque' | 'parchment_image';
  textFrameImage?: string;
  textFrameHeight?: string;
  backgroundImage?: string;
  bottomOrnamentImage?: string;
  className?: string;
}

interface ProfileInfoPanelProps {
  label: string;
  name: string;
  relation: string;
  father: string;
  mother: string;
  instagram?: string;
  instagramUrl?: string;
  frameMode: 'vector_baroque' | 'parchment_image';
  textFrameImage: string;
  textFrameHeight: string;
}

function ProfileInfoPanel({
  label,
  name,
  relation,
  father,
  mother,
  instagram,
  instagramUrl,
  frameMode,
  textFrameImage,
  textFrameHeight,
}: ProfileInfoPanelProps) {
  const content = (
    <div className="relative z-10 w-full flex flex-col items-center justify-center">
      {/* Label: — THE BRIDE / THE GROOM — */}
      <div className="flex items-center justify-center gap-1.5 mb-0.5 sm:mb-1 w-full">
        <span className="h-[1px] w-5 sm:w-8 bg-gradient-to-r from-transparent to-[#B58A45]/80" />
        <span className="font-cinzel text-[8px] xs:text-[9px] sm:text-[11px] font-bold tracking-[0.18em] sm:tracking-[0.22em] text-[#5C4033] uppercase">
          {label}
        </span>
        <span className="h-[1px] w-5 sm:w-8 bg-gradient-to-l from-transparent to-[#B58A45]/80" />
      </div>

      {/* Full Name */}
      <h3 className="font-cormorant font-bold text-[14px] xs:text-[15.5px] sm:text-[18.5px] md:text-[20.5px] text-[#2C1810] tracking-wide leading-tight px-0.5 text-center">
        {name}
      </h3>

      {/* Golden Floral Motif Divider */}
      <div className="flex items-center justify-center gap-1 my-0.5 sm:my-1">
        <span className="h-[0.5px] w-6 sm:w-10 bg-gradient-to-r from-transparent to-[#B58A45]/70" />
        <span className="text-[#B58A45] text-[9px] sm:text-[10px]">❖</span>
        <span className="h-[0.5px] w-6 sm:w-10 bg-gradient-to-l from-transparent to-[#B58A45]/70" />
      </div>

      {/* Parentage */}
      <p className="font-cormorant italic text-[9.5px] sm:text-[12px] text-[#5C4033] leading-snug">
        {relation}
      </p>
      <p className="font-cormorant font-semibold text-[10px] sm:text-[12.5px] text-[#2C1810] leading-snug">
        {father}
      </p>
      <p className="font-cormorant font-semibold text-[10px] sm:text-[12.5px] text-[#2C1810] leading-snug">
        & {mother}
      </p>

      {/* Instagram Handle Link */}
      {instagram && (
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 sm:mt-2 inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 text-[9.5px] sm:text-[11.5px] font-medium text-[#3D2517] hover:text-[#B58A45] transition-colors duration-200 group"
          title={`Instagram ${name}`}
        >
          <svg
            className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#5C4033] group-hover:text-[#B58A45] transition-colors shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
          <span className="font-sans text-[9.5px] sm:text-[11.5px] tracking-tight truncate max-w-[140px] sm:max-w-none">
            {instagram}
          </span>
        </a>
      )}
    </div>
  );

  return (
    <div
      className="relative z-10 flex-1 min-w-0 -ml-[9%] sm:-ml-[10%]"
    >
      {frameMode === 'vector_baroque' ? (
        <BaroqueCartoucheFrame className="w-full py-2.5 sm:py-3.5 pl-5 sm:pl-7 pr-2.5 sm:pr-3.5 flex flex-col items-center justify-center text-center">
          {content}
        </BaroqueCartoucheFrame>
      ) : (
        <div className="relative w-full py-2.5 sm:py-3.5 pl-5 sm:pl-7 pr-2.5 sm:pr-3.5 flex flex-col items-center justify-center text-center">
          <img
            src={textFrameImage}
            alt="Parchment Frame"
            className="absolute inset-0 w-full h-full object-fill pointer-events-none z-0 filter drop-shadow-xs"
          />
          {content}
        </div>
      )}
    </div>
  );
}

/**
 * SECTION 03 — BRIDE & GROOM PROFILES
 * Disusun secara murni dari file aset master asli proyek (100% tanpa crop gambar contoh).
 * Bingkai teks dibuat menggunakan CSS + SVG Baroque Cartouche (vector, super tajam, bebas dibesarkan ke bawah).
 */
export default function RoyalJavaneseBrideGroomProfile({
  sectionTitle = 'The Bride & The Groom',
  sectionSubtitle = 'TWO SOULS, ONE STORY',

  brideLabel = 'THE BRIDE',
  brideName = 'Putri Anindya Sari, S.T.',
  brideRelation = 'Daughter of',
  brideFather = 'Mr. Budi Setiawan, M.M.',
  brideMother = 'Mrs. Ratna Dewi, S.E.',
  brideInstagram = '@putrianindya',
  brideInstagramUrl = 'https://instagram.com/putrianindya',
  brideImage = '/templates/jawa/profile/bride-portrait.webp',

  groomLabel = 'THE GROOM',
  groomName = 'Raden Arka Pratama, S.T.',
  groomRelation = 'Son of',
  groomFather = 'Mr. Haryono Wicaksono, M.T.',
  groomMother = 'Mrs. Sri Lestari, S.Pd.',
  groomInstagram = '@arkapratama',
  groomInstagramUrl = 'https://instagram.com/arkapratama',
  groomImage = '/templates/jawa/profile/groom-portrait.webp',

  frameMode = 'vector_baroque',
  textFrameImage = '/templates/jawa/profile/parchment-frame-flourishes.webp',
  textFrameHeight = '98%',
  backgroundImage = '/templates/jawa/hero/bg-cream-embossed.webp',
  bottomOrnamentImage = '/templates/jawa/common/batik-gold-border.webp',
  className = ''
}: RoyalJavaneseBrideGroomProfileProps) {
  return (
    <section
      className={`relative w-full max-w-[440px] sm:max-w-[480px] mx-auto overflow-hidden rounded-[36px] sm:rounded-[44px] shadow-2xl border border-[#B58A45]/30 bg-[#FAF6EE] select-none text-[#2C1810] aspect-[682/1024] flex flex-col justify-between ${className}`}
      aria-label="Profil Pengantin Pria dan Wanita"
    >
      {/* ----------------------------------------------------------------- */}
      {/* 1. BACKGROUND: EMBOSSED JAVANESE FLORAL CREAM PAPER (MASTER FILE)  */}
      {/* ----------------------------------------------------------------- */}
      <img
        src={backgroundImage}
        alt="Background Ivory Heritage Embossed Javanese Floral Cream Paper"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      />

      {/* Warm Ambient Vignette for Keraton Royal Feel */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#2A170E]/3 to-[#1F1009]/20 pointer-events-none z-0" />

      {/* ----------------------------------------------------------------- */}
      {/* 2. TOP CORNER DECORATIONS: ELEGANT CASCADING JASMINE GARLAND      */}
      {/* ----------------------------------------------------------------- */}
      <div
        className="absolute pointer-events-none z-20 opacity-90"
        style={{ left: '4%', top: '-2%', width: '18%' }}
      >
        <img
          src="/templates/jawa/profile/jasmine-garland.webp"
          alt=""
          className="w-full h-auto object-contain filter drop-shadow-xs"
        />
      </div>

      <div
        className="absolute pointer-events-none z-20 opacity-90 scale-x-[-1]"
        style={{ right: '4%', top: '-2%', width: '18%' }}
      >
        <img
          src="/templates/jawa/profile/jasmine-garland.webp"
          alt=""
          className="w-full h-auto object-contain filter drop-shadow-xs"
        />
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* 3. SECTION HEADER: "The Bride & The Groom" + ORNAMENT + SUBTITLE */}
      {/* ----------------------------------------------------------------- */}
      <header
        className="relative z-10 w-full flex flex-col items-center text-center pt-[5.5%] px-4"
      >
        <h2 className="font-cormorant italic text-[24px] sm:text-[28px] md:text-[30px] font-semibold text-[#2C1810] tracking-wide leading-tight">
          {sectionTitle}
        </h2>

        {/* Small Golden Floral Crest Divider */}
        <div className="flex items-center justify-center gap-1.5 my-0.5">
          <span className="h-[1px] w-6 sm:w-8 bg-gradient-to-r from-transparent to-[#B58A45]" />
          <span className="text-[#B58A45] text-xs">✦ ❖ ✦</span>
          <span className="h-[1px] w-6 sm:w-8 bg-gradient-to-l from-transparent to-[#B58A45]" />
        </div>

        <p className="font-cinzel text-[10px] sm:text-[11.5px] font-bold tracking-[0.24em] text-[#5C4033] uppercase">
          {sectionSubtitle}
        </p>
      </header>

      {/* ----------------------------------------------------------------- */}
      {/* 4. MAIN PROFILES CONTAINER: BRIDE (TOP) + GUNUNGAN + GROOM (BTM) */}
      {/* ----------------------------------------------------------------- */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-center px-3 sm:px-4.5 -mt-1">
        {/* =============================================================== */}
        {/* A. THE BRIDE PROFILE ROW                                        */}
        {/* =============================================================== */}
        <article
          className="relative w-full flex items-center"
        >
          {/* Left: Antique Gold Baroque Frame + 12. Javanese Bride + Jasmine */}
          <div
            className="relative z-20 shrink-0"
            style={{ width: '38%', aspectRatio: '1312/1199' }}
          >
            {/* Layer 1: Arched Mask with Warm Bokeh Gradient & Master Bride Photo */}
            <div
              className="absolute z-0 overflow-hidden"
              style={{
                left: '17.8%',
                top: '18.5%',
                width: '64.4%',
                height: '77.5%',
                borderRadius: '50% 50% 2% 2% / 39% 39% 2% 2%',
                background:
                  'radial-gradient(circle at 18% 38%, rgba(215, 192, 155, 0.55) 0%, transparent 38%), radial-gradient(circle at 82% 44%, rgba(168, 140, 105, 0.45) 0%, transparent 40%), radial-gradient(circle at 50% 30%, #725D47 0%, #4A3A2C 70%, #3B2D21 100%)'
              }}
            >
              <img
                src={brideImage}
                alt={`Foto Profil ${brideName}`}
                className="w-full h-full object-cover object-[center_12%] hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Layer 2: Ornate Golden Baroque Frame (Master File: 1312x1199) */}
            <img
              src="/templates/jawa/hero/frame-baroque-gold.webp"
              alt=""
              className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10 filter drop-shadow-md"
            />

            {/* Layer 3: Detailed White Jasmine Flower Clusters at Bottom Corners */}
            <div
              className="absolute pointer-events-none z-20"
              style={{ left: '-6%', bottom: '-4%', width: '38%' }}
            >
              <img
                src="/templates/jawa/profile/jasmine-cluster-left.webp"
                alt=""
                className="w-full h-auto object-contain filter drop-shadow-xs"
              />
            </div>
            <div
              className="absolute pointer-events-none z-20"
              style={{ right: '-6%', bottom: '-4%', width: '38%' }}
            >
              <img
                src="/templates/jawa/profile/jasmine-cluster.webp"
                alt=""
                className="w-full h-auto object-contain filter drop-shadow-xs"
              />
            </div>
          </div>

          {/* Right: Info Panel (CSS + SVG Vector Baroque Cartouche Frame) */}
          <ProfileInfoPanel
            label={brideLabel}
            name={brideName}
            relation={brideRelation}
            father={brideFather}
            mother={brideMother}
            instagram={brideInstagram}
            instagramUrl={brideInstagramUrl}
            frameMode={frameMode}
            textFrameImage={textFrameImage}
            textFrameHeight={textFrameHeight}
          />
        </article>

        {/* =============================================================== */}
        {/* B. GUNUNGAN CENTER DIVIDER (SACRED KAYON + BAROQUE VINES)       */}
        {/* =============================================================== */}
        <div
          className="relative w-[70%] sm:w-[65%] mx-auto my-[-1.5%] z-20 pointer-events-none flex items-center justify-center"
        >
          {/* Background Filigree Floral Vines (2172x724 Master File) */}
          <img
            src="/templates/jawa/common/divider-gold.webp"
            alt=""
            className="w-full h-auto object-contain filter drop-shadow-xs opacity-80"
          />

          {/* Centered Golden Gunungan Emblem (1043x1508 Master File) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/templates/jawa/profile/gunungan-emblem.webp"
              alt="Gunungan Wayang Emas"
              className="w-12 sm:w-14 h-auto object-contain filter drop-shadow-sm"
            />
          </div>
        </div>

        {/* =============================================================== */}
        {/* C. THE GROOM PROFILE ROW                                        */}
        {/* =============================================================== */}
        <article
          className="relative w-full flex items-center"
        >
          {/* Left: Antique Gold Baroque Frame + 11. Javanese Groom + Jasmine */}
          <div
            className="relative z-20 shrink-0"
            style={{ width: '38%', aspectRatio: '1312/1199' }}
          >
            {/* Layer 1: Arched Mask with Warm Bokeh Gradient & Master Groom Photo */}
            <div
              className="absolute z-0 overflow-hidden"
              style={{
                left: '17.8%',
                top: '18.5%',
                width: '64.4%',
                height: '77.5%',
                borderRadius: '50% 50% 2% 2% / 39% 39% 2% 2%',
                background:
                  'radial-gradient(circle at 18% 38%, rgba(215, 192, 155, 0.55) 0%, transparent 38%), radial-gradient(circle at 82% 44%, rgba(168, 140, 105, 0.45) 0%, transparent 40%), radial-gradient(circle at 50% 30%, #725D47 0%, #4A3A2C 70%, #3B2D21 100%)'
              }}
            >
              <img
                src={groomImage}
                alt={`Foto Profil ${groomName}`}
                className="w-full h-full object-cover object-[center_12%] hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Layer 2: Ornate Golden Baroque Frame (Master File: 1312x1199) */}
            <img
              src="/templates/jawa/hero/frame-baroque-gold.webp"
              alt=""
              className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10 filter drop-shadow-md"
            />

            {/* Layer 3: Detailed White Jasmine Flower Clusters at Bottom Corners */}
            <div
              className="absolute pointer-events-none z-20"
              style={{ left: '-6%', bottom: '-4%', width: '38%' }}
            >
              <img
                src="/templates/jawa/profile/jasmine-cluster-left.webp"
                alt=""
                className="w-full h-auto object-contain filter drop-shadow-xs"
              />
            </div>
            <div
              className="absolute pointer-events-none z-20"
              style={{ right: '-6%', bottom: '-4%', width: '38%' }}
            >
              <img
                src="/templates/jawa/profile/jasmine-cluster.webp"
                alt=""
                className="w-full h-auto object-contain filter drop-shadow-xs"
              />
            </div>
          </div>

          {/* Right: Info Panel (CSS + SVG Vector Baroque Cartouche Frame) */}
          <ProfileInfoPanel
            label={groomLabel}
            name={groomName}
            relation={groomRelation}
            father={groomFather}
            mother={groomMother}
            instagram={groomInstagram}
            instagramUrl={groomInstagramUrl}
            frameMode={frameMode}
            textFrameImage={textFrameImage}
            textFrameHeight={textFrameHeight}
          />
        </article>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* 5. BOTTOM ORNAMENT: ORNATE JAVANESE BATIK GOLD BORDER BASE        */}
      {/* ----------------------------------------------------------------- */}
      <div className="relative z-10 w-full pointer-events-none mt-auto">
        <img
          src={bottomOrnamentImage}
          alt="Ornate Javanese Batik Gold Border"
          className="w-full h-auto object-cover object-bottom filter drop-shadow-sm select-none"
        />
      </div>
    </section>
  );
}
