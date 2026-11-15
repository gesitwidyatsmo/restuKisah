'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface RoyalJavaneseQuoteOpeningProps {
  badgeText?: string;
  arabicText?: string;
  translationText?: string;
  citationText?: string;
  backgroundImage?: string;
}

export default function RoyalJavaneseQuoteOpening({
  badgeText = 'AN INVITATION OF LOVE',
  arabicText = 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
  translationText = '“Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.”',
  citationText = '(QS. Ar-Rum: 21)',
  backgroundImage = '/templates/jawa/quote/quote-parchment-frame.webp'
}: RoyalJavaneseQuoteOpeningProps) {
  return (
    <section className="relative w-full max-w-[440px] sm:max-w-[480px] mx-auto overflow-hidden rounded-[36px] sm:rounded-[44px] shadow-2xl border border-[#B58A45]/30 bg-[#28140B] select-none text-[#392319] aspect-[1364/2048]">
      {/* ----------------------------------------------------------------- */}
      {/* 1. BACKGROUND: BATIK EMBOSSED + ORNATE PARCHMENT + GUNUNGAN PANEL */}
      {/* ----------------------------------------------------------------- */}
      <img
        src={backgroundImage}
        alt="Ornate Javanese Gold Parchment Frame"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      />

      {/* Subtle Warm Vignette Overlay */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#2A170E]/5 to-[#1F1009]/25 pointer-events-none z-0" />

      {/* ----------------------------------------------------------------- */}
      {/* 2. TEXT CONTENT OVERLAY (RENDERED WITH TYPOGRAPHY / FONTS)       */}
      {/* ----------------------------------------------------------------- */}
      <div className="relative z-10 w-full h-full flex flex-col pointer-events-auto">
        {/* BADGE: "AN INVITATION OF LOVE" */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute flex items-center justify-center text-center px-4"
          style={{
            top: '26.1%',
            left: '21%',
            right: '21%',
            height: '3.8%'
          }}
        >
          <span className="font-cinzel text-[10.5px] sm:text-[12.5px] md:text-[13.5px] font-semibold tracking-[0.20em] sm:tracking-[0.24em] text-[#4A3323] uppercase select-text antialiased">
            {badgeText}
          </span>
        </motion.div>

        {/* ARABIC VERSE: QS. AR-RUM: 21 */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="absolute flex flex-col items-center justify-center text-center px-4 sm:px-6"
          style={{
            top: '32.8%',
            left: '12%',
            right: '12%',
            height: '16.5%'
          }}
        >
          <p
            dir="rtl"
            className="font-amiri font-bold text-[17px] sm:text-[21px] md:text-[23.5px] leading-[1.85] sm:leading-[1.95] text-[#2C1810] text-center antialiased drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)] select-text"
          >
            {arabicText}
          </p>
        </motion.div>

        {/* INDONESIAN TRANSLATION / QUOTE */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
          className="absolute flex flex-col items-center justify-center text-center px-3 sm:px-6"
          style={{
            top: '55.2%',
            left: '10.5%',
            right: '10.5%',
            height: '18.2%'
          }}
        >
          <p className="font-serif italic text-xs sm:text-[13.5px] md:text-[14.5px] leading-relaxed sm:leading-[1.78] text-[#3D2517] text-center font-normal select-text antialiased">
            {translationText}
          </p>
        </motion.div>

        {/* CITATION / SURAH REFERENCE: (QS. Ar-Rum: 21) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="absolute flex items-center justify-center text-center"
          style={{
            top: '74.8%',
            left: '15%',
            right: '15%'
          }}
        >
          <span className="font-cinzel text-[11px] sm:text-[12.5px] md:text-[13px] font-semibold tracking-wide text-[#5C3C28] uppercase select-text antialiased">
            {citationText}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
