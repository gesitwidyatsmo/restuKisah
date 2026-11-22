'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RoyalJavanesePhotoBoothModal from './RoyalJavanesePhotoBoothModal';
import { 
  Radio, 
  CalendarDays, 
  Clock, 
  Camera, 
  Image as ImageIcon, 
  Upload, 
  Download, 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  Play, 
  Sparkles, 
  Video 
} from 'lucide-react';

export interface RoyalJavaneseCelebrateAnywhereProps {
  sectionTitle?: string;
  sectionSubtitle1?: string;
  sectionSubtitle2?: string;
  weddingDateText?: string;
  weddingTimeText?: string;
  youtubeUrl?: string;
  zoomUrl?: string;
  zoomMeetingId?: string;
  zoomPasscode?: string;
  className?: string;
}

export default function RoyalJavaneseCelebrateAnywhere({
  sectionTitle = 'Celebrate From Anywhere',
  sectionSubtitle1 = 'Tetap Terhubung dan Abadikan Momen Spesial',
  sectionSubtitle2 = 'Pernikahan Kami dari Mana Pun',
  weddingDateText = 'Sabtu, 24 Mei 2025',
  weddingTimeText = 'Pukul 09.00 WIB',
  youtubeUrl = 'https://www.youtube.com',
  zoomUrl = 'https://zoom.us/join',
  zoomMeetingId = '824 5920 1842',
  zoomPasscode = 'RESTU2025',
  className = '',
}: RoyalJavaneseCelebrateAnywhereProps) {
  // Modal states
  const [isLiveStreamModalOpen, setIsLiveStreamModalOpen] = useState(false);
  const [isPhotoBoothModalOpen, setIsPhotoBoothModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);

  const handleCopy = (text: string, type: 'id' | 'pass') => {
    navigator.clipboard.writeText(text);
    if (type === 'id') {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } else {
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2000);
    }
  };

  return (
    <section
      className={`relative w-full max-w-[440px] sm:max-w-[480px] mx-auto overflow-hidden rounded-[36px] sm:rounded-[44px] shadow-2xl border-2 border-[#D4AF37]/50 ring-1 ring-[#B58A45]/30 bg-[#241108] select-none text-[#FFF6E5] flex flex-col justify-between py-6 sm:py-8 px-3.5 sm:px-4.5 ${className}`}
      aria-label="Celebrate From Anywhere - Live Streaming and Wedding Photo Booth"
    >
      {/* ----------------------------------------------------------------- */}
      {/* 1. BACKGROUND: DEEP RICH JAVANESE EMBOSSED BATIK & VIGNETTE       */}
      {/* ----------------------------------------------------------------- */}
      <img
        src="/templates/jawa/story/bg-batik-dark.webp"
        alt="Batik Dark Background"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 brightness-[0.82] contrast-[1.12]"
      />

      {/* Royal Keraton Ambient Warm Vignette Overlay */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#1B0C06]/40 to-[#0F0603]/85 pointer-events-none z-0" />

      {/* ----------------------------------------------------------------- */}
      {/* 2. FOUR CORNER CARVINGS: ORNATE GOLDEN BAROQUE CARVING             */}
      {/* ----------------------------------------------------------------- */}
      {/* Top Left: Flipped horizontally so right-angle hugs top-left corner */}
      <div className="absolute top-0 left-0 w-20 sm:w-24 pointer-events-none z-10 opacity-95 scale-x-[-1]">
        <img
          src="/templates/jawa/Ornate Golden Baroque Corner Carving-5.webp"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)]"
        />
      </div>

      {/* Top Right: Original orientation hugs top-right corner */}
      <div className="absolute top-0 right-0 w-20 sm:w-24 pointer-events-none z-10 opacity-95">
        <img
          src="/templates/jawa/Ornate Golden Baroque Corner Carving-5.webp"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)]"
        />
      </div>

      {/* Bottom Left: Flipped horizontally & vertically so right-angle hugs bottom-left corner */}
      <div className="absolute bottom-0 left-0 w-20 sm:w-24 pointer-events-none z-10 opacity-95 scale-x-[-1] scale-y-[-1]">
        <img
          src="/templates/jawa/Ornate Golden Baroque Corner Carving-5.webp"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)]"
        />
      </div>

      {/* Bottom Right: Flipped vertically so right-angle hugs bottom-right corner */}
      <div className="absolute bottom-0 right-0 w-20 sm:w-24 pointer-events-none z-10 opacity-95 scale-y-[-1]">
        <img
          src="/templates/jawa/Ornate Golden Baroque Corner Carving-5.webp"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)]"
        />
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* 3. SECTION HEADER: GOLDEN FLORAL CREST + TITLE + SUBTITLES         */}
      {/* ----------------------------------------------------------------- */}
      <header className="relative z-10 w-full flex flex-col items-center justify-center text-center pt-2 pb-3 px-2">
        {/* Top Gold Crest Ornament */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-[170px] sm:w-[210px] max-w-[62%] h-auto mb-1 flex items-center justify-center"
        >
          <img
            src="/templates/jawa/Golden Floral Infinity Ornament.webp"
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
          />
        </motion.div>

        {/* Section Heading: "Celebrate From Anywhere" */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-[23px] xs:text-[26px] sm:text-[29px] font-normal text-[#FBF1DD] tracking-wide leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
          style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
        >
          {sectionTitle}
        </motion.h2>

        {/* Subtitle in Two Italic Lines */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-1.5 text-center"
        >
          <p 
            className="text-[11.5px] sm:text-[13px] italic text-[#DFC191] font-normal leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            {sectionSubtitle1}
          </p>
          <p 
            className="text-[11.5px] sm:text-[13px] italic text-[#DFC191] font-normal leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            {sectionSubtitle2}
          </p>
        </motion.div>
      </header>

      {/* ----------------------------------------------------------------- */}
      {/* 4. CARD 01: LIVE STREAMING                                        */}
      {/* ----------------------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="relative z-10 w-full my-2.5 sm:my-3"
      >
        {/* Outer Card Container */}
        <div className="relative w-full">
          {/* Card Parchment Texture Backdrop with Golden Frame */}
          <img
            src="/templates/jawa/Ornate Golden Parchment Card.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-fill pointer-events-none z-0 filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.55)]"
          />

          {/* Card Content Container: All contents including button are inside the parchment */}
          <div className="relative z-10 pt-3.5 sm:pt-4 pb-3.5 sm:pb-4.5 px-4 sm:px-5 flex flex-col items-center">
            {/* Header Plaque: Live Streaming (Restored to original grand size) */}
            <div className="relative w-[225px] sm:w-[255px] aspect-[2172/724] mx-auto flex items-center justify-center -mt-0.5">
              <img
                src="/templates/jawa/Ornate Gold Floral Title Plaque.webp"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
              />
              <div className="relative z-10 flex items-center justify-center gap-2 px-5 text-[#FFF6E5]">
                <Radio className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#FFF6E5] shrink-0 drop-shadow-xs" strokeWidth={2.2} />
                <span 
                  className="font-serif text-[13.5px] sm:text-[15px] font-bold text-[#FFF6E5] tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  Live Streaming
                </span>
              </div>
            </div>

            {/* Middle Section: Laptop Graphic (Left) + Information (Right) - pulled up to close the gap cleanly */}
            <div className="w-full flex items-center justify-between gap-2.5 sm:gap-3.5 -mt-2 sm:-mt-2.5 mb-1">
              {/* Left Column: Live Wedding Stage Laptop Mockup */}
              <div 
                onClick={() => setIsLiveStreamModalOpen(true)}
                className="w-[48%] sm:w-[49%] shrink-0 relative cursor-pointer group"
                title="Klik untuk menonton siaran langsung"
              >
                <div className="relative w-full aspect-[1536/1024] flex items-center justify-center">
                  <img
                    src="/templates/jawa/Live Wedding Stage Laptop Illustration.webp"
                    alt="Live Wedding Stage Laptop Illustration"
                    className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(90,50,20,0.22)] group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Subtle hover play hint */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 group-hover:bg-amber-400/25 transition-colors flex items-center justify-center">
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Text & Event Details */}
              <div className="w-[52%] sm:w-[51%] flex flex-col justify-center text-left text-[#3D2213] pl-1">
                <p 
                  className="text-[11px] sm:text-[12px] text-[#3D2213] font-medium leading-[1.38] mb-2"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  Saksikan rangkaian pernikahan kami secara langsung melalui siaran live.
                </p>

                {/* Event Schedule Info */}
                <div className="flex flex-col gap-1 mb-2.5">
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-[#4A2B18]">
                    <CalendarDays className="w-3.5 h-3.5 text-[#7D3F1D] shrink-0" />
                    <span>{weddingDateText}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-[#4A2B18]">
                    <Clock className="w-3.5 h-3.5 text-[#7D3F1D] shrink-0" />
                    <span>{weddingTimeText}</span>
                  </div>
                </div>

                {/* Platform Badges: YouTube | Zoom */}
                <div className="flex items-center gap-2 text-[10.5px] sm:text-[11.5px] font-bold text-[#2C1810]">
                  {/* YouTube Badge */}
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-3 shrink-0" viewBox="0 0 24 18" fill="none">
                      <rect width="24" height="18" rx="4" fill="#FF0000" />
                      <polygon points="9.5,4.5 16.5,9 9.5,13.5" fill="#FFFFFF" />
                    </svg>
                    <span className="tracking-tight text-[10.5px] sm:text-[11.5px]">YouTube</span>
                  </div>

                  <span className="text-[#A58866]/70 font-normal">|</span>

                  {/* Zoom Badge */}
                  <div className="flex items-center gap-1">
                    <div className="w-3.5 h-3.5 rounded-[3px] bg-[#2D8CFF] flex items-center justify-center text-white shrink-0 shadow-xs">
                      <Video className="w-2.2 h-2.2 fill-current" />
                    </div>
                    <span className="tracking-tight text-[10.5px] sm:text-[11.5px]">Zoom</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Button: Tonton Live Streaming (Centered, proportionate, inside the card) */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsLiveStreamModalOpen(true)}
              className="w-[66%] sm:w-[62%] min-w-[215px] max-w-[280px] mx-auto mt-2.5 sm:mt-3 py-2 sm:py-2.4 px-4 rounded-full bg-gradient-to-r from-[#7D3F1D] via-[#54240A] to-[#7D3F1D] border border-[#D4AF37]/90 shadow-[0_3px_10px_rgba(84,36,10,0.35)] flex items-center justify-center gap-2 group transition-all duration-200"
            >
              <div className="w-4.5 h-4.5 rounded-full bg-[#FFF6E5] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform">
                <Play className="w-2.5 h-2.5 text-[#54240A] fill-[#54240A] ml-0.5" />
              </div>
              <span 
                className="font-serif text-[12px] sm:text-[13px] font-bold text-[#FFF7E8] tracking-wider drop-shadow-xs"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                Tonton Live Streaming
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ----------------------------------------------------------------- */}
      {/* 5. CARD 02: WEDDING PHOTO BOOTH                                   */}
      {/* ----------------------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="relative z-10 w-full my-2.5 sm:my-3"
      >
        {/* Outer Card Container */}
        <div className="relative w-full">
          {/* Card Parchment Texture Backdrop with Golden Frame */}
          <img
            src="/templates/jawa/Ornate Golden Parchment Card.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-fill pointer-events-none z-0 filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.55)]"
          />

          {/* Card Content Container: All contents including button are inside the parchment */}
          <div className="relative z-10 pt-3.5 sm:pt-4 pb-3.5 sm:pb-4.5 px-4 sm:px-5 flex flex-col items-center">
            {/* Header Plaque: Wedding Photo Booth (Restored to original grand size) */}
            <div className="relative w-[230px] sm:w-[260px] aspect-[2172/724] mx-auto flex items-center justify-center -mt-0.5">
              <img
                src="/templates/jawa/Ornate Gold Floral Title Plaque.webp"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
              />
              <div className="relative z-10 flex items-center justify-center gap-2 px-5 text-[#FFF6E5]">
                <Camera className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#FFF6E5] shrink-0 drop-shadow-xs" strokeWidth={2} />
                <span 
                  className="font-serif text-[13.5px] sm:text-[15px] font-bold text-[#FFF6E5] tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  Wedding Photo Booth
                </span>
              </div>
            </div>

            {/* Subtitle Under Plaque */}
            <p 
              className="text-[11px] sm:text-[12px] text-[#3E2314] font-medium text-center max-w-[92%] mx-auto -mt-1 sm:-mt-1.5 mb-2 sm:mb-2.5 leading-[1.35]"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Abadikan momen dan bagikan kebahagiaan Anda dengan bingkai digital spesial pernikahan kami.
            </p>

            {/* Middle Section: Frame Trio (Left) + 3 Steps (Right) */}
            <div className="w-full flex items-center justify-between gap-2 sm:gap-3 my-0.5">
              {/* Left Column: Ornate Javanese Wedding Frame Trio */}
              <div 
                onClick={() => setIsPhotoBoothModalOpen(true)}
                className="w-[46%] sm:w-[47%] shrink-0 relative cursor-pointer group"
                title="Klik untuk memilih bingkai foto Jawa"
              >
                <div className="relative w-full aspect-[1536/1024] flex items-center justify-center">
                  <img
                    src="/templates/jawa/Ornate Javanese Wedding Frame Trio.webp"
                    alt="Ornate Javanese Wedding Frame Trio"
                    className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(90,50,20,0.25)] group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Subtle sparkle on hover */}
                  <div className="absolute top-1 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                  </div>
                </div>
              </div>

              {/* Right Column: 3 Steps Guide */}
              <div className="w-[54%] sm:w-[53%] flex flex-col justify-center text-[#3D2213] pl-1 gap-2 sm:gap-2.5">
                {/* Step 1: Pilih bingkai favorit */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full border border-[#4A2612]/70 flex items-center justify-center shrink-0 text-[#4A2612]">
                    <ImageIcon className="w-3.5 h-3.5 stroke-[1.8]" />
                  </div>
                  <span 
                    className="text-[10.5px] sm:text-[12px] font-medium text-[#3D2213] leading-tight"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    Pilih bingkai favorit
                  </span>
                </div>

                {/* Step 2: Unggah foto Anda */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full border border-[#4A2612]/70 flex items-center justify-center shrink-0 text-[#4A2612]">
                    <Upload className="w-3.5 h-3.5 stroke-[1.8]" />
                  </div>
                  <span 
                    className="text-[10.5px] sm:text-[12px] font-medium text-[#3D2213] leading-tight"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    Unggah foto Anda
                  </span>
                </div>

                {/* Step 3: Unduh & bagikan */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full border border-[#4A2612]/70 flex items-center justify-center shrink-0 text-[#4A2612]">
                    <Download className="w-3.5 h-3.5 stroke-[1.8]" />
                  </div>
                  <span 
                    className="text-[10.5px] sm:text-[12px] font-medium text-[#3D2213] leading-tight"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    Unduh &amp; bagikan di Instagram / WhatsApp
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Button: Buat Foto Sekarang (Centered, proportionate, inside the card matching Card 1) */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsPhotoBoothModalOpen(true)}
              className="w-[66%] sm:w-[62%] min-w-[215px] max-w-[280px] mx-auto mt-2.5 sm:mt-3 py-2 sm:py-2.4 px-4 rounded-full bg-gradient-to-r from-[#7D3F1D] via-[#54240A] to-[#7D3F1D] border border-[#D4AF37]/90 shadow-[0_3px_10px_rgba(84,36,10,0.35)] flex items-center justify-center gap-2 group transition-all duration-200"
            >
              <div className="w-4.5 h-4.5 rounded-full bg-[#FFF6E5] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform">
                <Camera className="w-2.5 h-2.5 text-[#54240A] stroke-[2.2]" />
              </div>
              <span 
                className="font-serif text-[12px] sm:text-[13px] font-bold text-[#FFF7E8] tracking-wider drop-shadow-xs"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                Buat Foto Sekarang
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ----------------------------------------------------------------- */}
      {/* 6. BOTTOM ORNAMENT: ORNATE GOLDEN FLORAL DIVIDER                  */}
      {/* ----------------------------------------------------------------- */}
      <footer className="relative z-10 w-full flex items-center justify-center pt-2 pb-1">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-[170px] sm:w-[210px] max-w-[62%] h-auto flex items-center justify-center"
        >
          <img
            src="/templates/jawa/Ornate Golden Floral Divider.webp"
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
          />
        </motion.div>
      </footer>

      {/* ================================================================= */}
      {/* 7. INTERACTIVE MODAL: LIVE STREAMING MODAL                        */}
      {/* ================================================================= */}
      <AnimatePresence>
        {isLiveStreamModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-sm rounded-3xl bg-[#FAF6EE] text-[#2C1810] border-2 border-[#D4AF37] shadow-2xl p-5 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsLiveStreamModalOpen(false)}
                className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-stone-200/80 hover:bg-stone-300 text-stone-700 transition-colors"
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="text-center mb-4 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 font-bold text-[10px] uppercase tracking-wider mb-2 border border-red-200">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                  Siaran Langsung
                </span>
                <h3 
                  className="text-xl font-bold text-[#422211]"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  Live Streaming Pernikahan
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Pilih kanal siaran favorit Anda untuk menyaksikan prosesi sakral kami secara langsung.
                </p>
              </div>

              {/* Stream Option 1: YouTube */}
              <div className="mb-3 p-3.5 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-4 shrink-0" viewBox="0 0 24 18" fill="none">
                      <rect width="24" height="18" rx="4" fill="#FF0000" />
                      <polygon points="9.5,4.5 16.5,9 9.5,13.5" fill="#FFFFFF" />
                    </svg>
                    <div>
                      <h4 className="font-bold text-xs text-stone-900">YouTube Live</h4>
                      <p className="text-[10px] text-stone-500">Tayangan Video HD &amp; Chat Live</p>
                    </div>
                  </div>
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold bg-[#FF0000] text-white rounded-xl shadow-xs hover:bg-red-700 transition-colors"
                  >
                    <span>Tonton</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Stream Option 2: Zoom */}
              <div className="mb-4 p-3.5 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-[4px] bg-[#2D8CFF] flex items-center justify-center text-white shrink-0 shadow-xs">
                      <Video className="w-3 h-3 fill-current" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-stone-900">Zoom Virtual Room</h4>
                      <p className="text-[10px] text-stone-500">Menyapa &amp; Interaktif Bersama</p>
                    </div>
                  </div>
                  <a
                    href={zoomUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold bg-[#2D8CFF] text-white rounded-xl shadow-xs hover:bg-blue-600 transition-colors"
                  >
                    <span>Masuk</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Meeting ID & Passcode with Copy Buttons */}
                <div className="pt-2 border-t border-stone-100 flex flex-col gap-1.5 text-[11px]">
                  <div className="flex items-center justify-between bg-stone-50 px-2.5 py-1 rounded-lg">
                    <span className="text-stone-500">Meeting ID:</span>
                    <div className="flex items-center gap-1.5 font-mono font-bold text-stone-800">
                      <span>{zoomMeetingId}</span>
                      <button
                        onClick={() => handleCopy(zoomMeetingId, 'id')}
                        className="p-1 hover:bg-stone-200 rounded text-stone-600 transition-colors"
                        title="Salin Meeting ID"
                      >
                        {copiedId ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-stone-50 px-2.5 py-1 rounded-lg">
                    <span className="text-stone-500">Passcode:</span>
                    <div className="flex items-center gap-1.5 font-mono font-bold text-stone-800">
                      <span>{zoomPasscode}</span>
                      <button
                        onClick={() => handleCopy(zoomPasscode, 'pass')}
                        className="p-1 hover:bg-stone-200 rounded text-stone-600 transition-colors"
                        title="Salin Passcode"
                      >
                        {copiedPass ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Schedule Reminder */}
              <div className="text-center text-[11px] text-stone-500 italic">
                Siaran akan dimulai pada {weddingDateText}, {weddingTimeText}.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================================================================= */}
      {/* 8. INTERACTIVE MODAL: WEDDING PHOTO BOOTH                         */}
      {/* ================================================================= */}
      <RoyalJavanesePhotoBoothModal
        isOpen={isPhotoBoothModalOpen}
        onClose={() => setIsPhotoBoothModalOpen(false)}
      />
    </section>
  );
}
