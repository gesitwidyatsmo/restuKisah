'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ChevronLeft, ChevronRight, Maximize2, Volume2, VolumeX } from 'lucide-react';

export interface GalleryPhotoItem {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  rawImage?: string;
  frame?: string;
  alt: string;
  aspectRatio: string;
  flex?: number;
}

export interface RoyalJavanesePhotoVideoGalleryProps {
  sectionTitle?: string;
  topOrnamentImage?: string;
  bottomOrnamentImage?: string;
  backgroundImage?: string;
  featuredPhoto?: GalleryPhotoItem;
  gridRow1?: GalleryPhotoItem[];
  gridRow2?: GalleryPhotoItem[];
  videoTeaser?: GalleryPhotoItem & {
    videoUrl?: string;
    videoType?: 'youtube' | 'mp4';
    videoDuration?: string;
  };
  className?: string;
  enableLightbox?: boolean;
}

const DEFAULT_FEATURED_PHOTO: GalleryPhotoItem = {
  id: 'featured-top',
  title: 'Pembaruan Janji Suci',
  subtitle: 'The Sacred Embrace & Forever Commitment',
  image: '/templates/Framed Traditional Wedding Collage one.webp',
  rawImage: '/templates/Frameless Traditional Wedding Photo Collage one.webp',
  frame: '/templates/Ornate Golden Transparent Frame Collage one.webp',
  alt: 'Foto Utama Pasangan Pengantin Adat Jawa Bernuansa Romantis',
  aspectRatio: '960 / 355',
};

const DEFAULT_GRID_ROW_1: GalleryPhotoItem[] = [
  {
    id: 'row1-joglo-walk',
    title: 'Langkah Bersama',
    subtitle: 'Walking together in the regal Joglo heritage garden',
    image: '/templates/Framed Traditional Wedding Collage two.webp',
    rawImage: '/templates/Frameless Traditional Wedding Photo Collage two.webp',
    frame: '/templates/Ornate Golden Transparent Frame Collage two.webp',
    alt: 'Pasangan Berjalan Bergandengan Tangan di Pelataran Joglo',
    aspectRatio: '318 / 289',
    flex: 318,
  },
  {
    id: 'row1-bride-portrait',
    title: 'Pesona Sang Putri',
    subtitle: 'Grace and elegance in traditional Javanese Paes Ageng',
    image: '/templates/Framed Traditional Wedding Collage three.webp',
    rawImage: '/templates/Frameless Traditional Wedding Photo Collage three.webp',
    frame: '/templates/Ornate Golden Transparent Frame Collage three.webp',
    alt: 'Potret Anggun Mempelai Wanita Berhias Ronce Melati',
    aspectRatio: '309 / 289',
    flex: 309,
  },
  {
    id: 'row1-groom-portrait',
    title: 'Wibawa Sang Kesatria',
    subtitle: 'Noble poise in bespoke Javanese velvet beskap',
    image: '/templates/Framed Traditional Wedding Collage four.webp',
    rawImage: '/templates/Frameless Traditional Wedding Photo Collage four.webp',
    frame: '/templates/Ornate Golden Transparent Frame Collage four.webp',
    alt: 'Potret Gagah Mempelai Pria Berbusana Beskap Hitam Klasik',
    aspectRatio: '317 / 289',
    flex: 317,
  },
];

const DEFAULT_GRID_ROW_2: GalleryPhotoItem[] = [
  {
    id: 'row2-intimate-glance',
    title: 'Tatapan Kasih',
    subtitle: 'An intimate whisper of unspoken adoration',
    image: '/templates/Framed Traditional Wedding Collage five.webp',
    rawImage: '/templates/Frameless Traditional Wedding Photo Collage five.webp',
    frame: '/templates/Ornate Golden Transparent Frame Collage five.webp',
    alt: 'Momen Mesra Saling Menatap Penuh Kehangatan',
    aspectRatio: '293 / 261',
    flex: 293,
  },
  {
    id: 'row2-gebyok-sanctuary',
    title: 'Dua Hati Bersatu',
    subtitle: 'Seated together before the timeless carved teak gebyok',
    image: '/templates/Framed Traditional Wedding Collage six.webp',
    rawImage: '/templates/Frameless Traditional Wedding Photo Collage six.webp',
    frame: '/templates/Ornate Golden Transparent Frame Collage six.webp',
    alt: 'Pasangan Duduk Bersama di Depan Pintu Ukir Gebyok Jawa',
    aspectRatio: '353 / 261',
    flex: 353,
  },
  {
    id: 'row2-parasol-smile',
    title: 'Senyuman Teduh',
    subtitle: 'Serene charm under the classic bridal parasol',
    image: '/templates/Framed Traditional Wedding Collage seven.webp',
    rawImage: '/templates/Frameless Traditional Wedding Photo Collage seven.webp',
    frame: '/templates/Ornate Golden Transparent Frame Collage seven.webp',
    alt: 'Mempelai Wanita Tersenyum Manis Membawa Payung Tradisional',
    aspectRatio: '293 / 261',
    flex: 293,
  },
];

const DEFAULT_VIDEO_TEASER = {
  id: 'video-sunset-teaser',
  title: 'Our Beautiful Memories — Cinematic Wedding Teaser',
  subtitle: 'Golden hour silhouette overlooking the tranquil horizons',
  image: '/templates/Framed Traditional Wedding Collage eight.webp',
  rawImage: '/templates/Frameless Traditional Wedding Photo Collage eight.webp',
  frame: '/templates/Ornate Golden Transparent Frame Collage eight.webp',
  alt: 'Teaser Video Pre-wedding Memandang Sunset dari Atas Bukit',
  aspectRatio: '957 / 318',
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
  videoType: 'youtube' as const,
  videoDuration: '02:45',
};

/**
 * SECTION 06 — PHOTO & VIDEO GALLERY
 * Editorial Masonry Gallery bertema Keraton Jawa Mewah
 * Memadukan bingkai emas antik transparansi murni dan foto-foto beresolusi tinggi.
 */
export default function RoyalJavanesePhotoVideoGallery({
  sectionTitle = 'Our Beautiful Memories',
  topOrnamentImage = '/templates/ornamen_gold_transparan top.webp',
  bottomOrnamentImage = '/templates/ornamen_gold_transparan botton.webp',
  backgroundImage = '/templates/jawa/common/bg-cream-embossed.webp',
  featuredPhoto = DEFAULT_FEATURED_PHOTO,
  gridRow1 = DEFAULT_GRID_ROW_1,
  gridRow2 = DEFAULT_GRID_ROW_2,
  videoTeaser = DEFAULT_VIDEO_TEASER,
  className = '',
  enableLightbox = true,
}: RoyalJavanesePhotoVideoGalleryProps) {
  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Flattened array for lightbox browsing
  const allPhotos: GalleryPhotoItem[] = [
    featuredPhoto,
    ...gridRow1,
    ...gridRow2,
    videoTeaser,
  ];

  const openLightbox = (index: number) => {
    if (!enableLightbox) return;
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prevPhoto = useCallback(() => {
    setLightboxIndex((curr) => {
      if (curr === null) return null;
      return (curr - 1 + allPhotos.length) % allPhotos.length;
    });
  }, [allPhotos.length]);

  const nextPhoto = useCallback(() => {
    setLightboxIndex((curr) => {
      if (curr === null) return null;
      return (curr + 1) % allPhotos.length;
    });
  }, [allPhotos.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevPhoto();
        if (e.key === 'ArrowRight') nextPhoto();
      } else if (isVideoModalOpen) {
        if (e.key === 'Escape') setIsVideoModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, isVideoModalOpen, prevPhoto, nextPhoto]);

  return (
    <section
      className={`relative w-full max-w-[440px] sm:max-w-[480px] mx-auto overflow-hidden rounded-[36px] sm:rounded-[44px] shadow-2xl border border-[#B58A45]/30 bg-[#FAF6EE] select-none text-[#2C1810] flex flex-col justify-between py-5 sm:py-7 px-3.5 sm:px-5 ${className}`}
      aria-label="Galeri Foto dan Video Pernikahan Jawa"
    >
      {/* ----------------------------------------------------------------- */}
      {/* 1. BACKGROUND: CREAM EMBOSSED PARCHMENT & WARM VIGNETTE           */}
      {/* ----------------------------------------------------------------- */}
      <img
        src={backgroundImage}
        alt="Background Cream Embossed"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      />

      {/* Royal Keraton Ambient Warm Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#2A170E]/3 to-[#1F1009]/15 pointer-events-none z-0" />

      {/* Elegant Batik Corner Watermarks */}
      <div className="absolute -top-3 -left-3 w-20 h-20 pointer-events-none z-0 opacity-25">
        <img
          src="/templates/jawa/story/corner-flourish.webp"
          alt=""
          className="w-full h-full object-contain filter drop-shadow-xs"
        />
      </div>
      <div className="absolute -top-3 -right-3 w-20 h-20 pointer-events-none z-0 opacity-25 scale-x-[-1]">
        <img
          src="/templates/jawa/story/corner-flourish.webp"
          alt=""
          className="w-full h-full object-contain filter drop-shadow-xs"
        />
      </div>
      <div className="absolute -bottom-3 -left-3 w-20 h-20 pointer-events-none z-0 opacity-25 scale-y-[-1]">
        <img
          src="/templates/jawa/story/corner-flourish.webp"
          alt=""
          className="w-full h-full object-contain filter drop-shadow-xs"
        />
      </div>
      <div className="absolute -bottom-3 -right-3 w-20 h-20 pointer-events-none z-0 opacity-25 scale-x-[-1] scale-y-[-1]">
        <img
          src="/templates/jawa/story/corner-flourish.webp"
          alt=""
          className="w-full h-full object-contain filter drop-shadow-xs"
        />
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* 2. HEADER: TOP ORNAMENT + "Our Beautiful Memories" + BOT ORNAMENT */}
      {/* ----------------------------------------------------------------- */}
      <header className="relative z-10 w-full flex flex-col items-center justify-center text-center pt-1 pb-3 px-2">
        {/* Top Gold Crest Ornament with Horizontal Floral Divider */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-[180px] sm:w-[220px] max-w-[65%] h-auto mb-1 flex items-center justify-center"
        >
          <img
            src={topOrnamentImage}
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-contain filter drop-shadow-[0_1px_2px_rgba(181,138,69,0.3)]"
          />
        </motion.div>

        {/* Section Heading: "Our Beautiful Memories" */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-cormorant italic text-[22px] xs:text-[25px] sm:text-[28px] md:text-[30px] font-semibold text-[#5A3825] tracking-wide leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]"
        >
          {sectionTitle}
        </motion.h2>

        {/* Bottom Gold Flourish Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-[110px] sm:w-[135px] max-w-[40%] h-auto mt-1 flex items-center justify-center"
        >
          <img
            src={bottomOrnamentImage}
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-contain filter drop-shadow-[0_1px_2px_rgba(181,138,69,0.25)]"
          />
        </motion.div>
      </header>

      {/* ----------------------------------------------------------------- */}
      {/* 3. MAIN COMPOSITION: EDITORIAL MASONRY PHOTO GALLERY              */}
      {/* ----------------------------------------------------------------- */}
      <div className="relative z-10 w-full flex flex-col gap-2.5 sm:gap-3">
        {/* --------------------------------------------------------------- */}
        {/* 3A. FEATURED PRE-WEDDING PHOTOGRAPH (LARGE TOP)                 */}
        {/* --------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="relative w-full group cursor-pointer filter drop-shadow-[0_3px_8px_rgba(44,24,16,0.12)] transition-all duration-300 hover:drop-shadow-[0_6px_16px_rgba(44,24,16,0.22)]"
          style={{ aspectRatio: featuredPhoto.aspectRatio }}
          onClick={() => openLightbox(0)}
        >
          {/* Framed Photo with Antique-Gold Border and Masked Corners */}
          <img
            src={featuredPhoto.image}
            alt={featuredPhoto.alt}
            className="w-full h-full object-fill transition-transform duration-500 ease-out group-hover:scale-[1.015]"
          />

          {/* Subtle Golden Sheen Hover Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/0 via-amber-200/10 to-amber-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20" />

          {/* Expand Hint Icon */}
          <div className="absolute top-2.5 right-2.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#2C1810]/70 text-amber-200 p-1.5 rounded-full backdrop-blur-xs shadow-md">
            <Maximize2 className="w-3.5 h-3.5" />
          </div>
        </motion.div>

        {/* --------------------------------------------------------------- */}
        {/* 3B. BALANCED GRID ROW 1 (3 ROMANTIC PHOTOGRAPHS)               */}
        {/* --------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.25 }}
          className="w-full flex items-stretch gap-2 sm:gap-2.5"
        >
          {gridRow1.map((item, idx) => (
            <div
              key={item.id}
              style={{
                flex: item.flex || 1,
                aspectRatio: item.aspectRatio,
              }}
              className="relative group cursor-pointer filter drop-shadow-[0_2px_6px_rgba(44,24,16,0.1)] transition-all duration-300 hover:drop-shadow-[0_5px_14px_rgba(44,24,16,0.2)]"
              onClick={() => openLightbox(1 + idx)}
            >
              {/* Framed Photo with Exact Masked Corners */}
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-fill transition-transform duration-500 ease-out group-hover:scale-[1.025]"
              />

              {/* Golden Hover Sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/0 via-amber-200/15 to-amber-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20" />

              {/* Expand Hint Icon */}
              <div className="absolute bottom-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#2C1810]/70 text-amber-200 p-1 rounded-full backdrop-blur-xs shadow-xs">
                <Maximize2 className="w-3 h-3" />
              </div>
            </div>
          ))}
        </motion.div>

        {/* --------------------------------------------------------------- */}
        {/* 3C. BALANCED GRID ROW 2 (3 ROMANTIC PHOTOGRAPHS)               */}
        {/* --------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.35 }}
          className="w-full flex items-stretch gap-2 sm:gap-2.5"
        >
          {gridRow2.map((item, idx) => (
            <div
              key={item.id}
              style={{
                flex: item.flex || 1,
                aspectRatio: item.aspectRatio,
              }}
              className="relative group cursor-pointer filter drop-shadow-[0_2px_6px_rgba(44,24,16,0.1)] transition-all duration-300 hover:drop-shadow-[0_5px_14px_rgba(44,24,16,0.2)]"
              onClick={() => openLightbox(1 + gridRow1.length + idx)}
            >
              {/* Framed Photo with Exact Masked Corners */}
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-fill transition-transform duration-500 ease-out group-hover:scale-[1.025]"
              />

              {/* Golden Hover Sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/0 via-amber-200/15 to-amber-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20" />

              {/* Expand Hint Icon */}
              <div className="absolute bottom-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#2C1810]/70 text-amber-200 p-1 rounded-full backdrop-blur-xs shadow-xs">
                <Maximize2 className="w-3 h-3" />
              </div>
            </div>
          ))}
        </motion.div>

        {/* --------------------------------------------------------------- */}
        {/* 3D. VIDEO TEASER THUMBNAIL (WIDE BOTTOM WITH GOLD PLAY BUTTON)  */}
        {/* --------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.45 }}
          className="relative w-full group cursor-pointer filter drop-shadow-[0_3px_8px_rgba(44,24,16,0.12)] transition-all duration-300 hover:drop-shadow-[0_6px_16px_rgba(44,24,16,0.22)]"
          style={{ aspectRatio: videoTeaser.aspectRatio }}
          onClick={() => setIsVideoModalOpen(true)}
        >
          {/* Panoramic Teaser Photo Framed */}
          <img
            src={videoTeaser.image}
            alt={videoTeaser.alt}
            className="w-full h-full object-fill transition-transform duration-500 ease-out group-hover:scale-[1.015]"
          />

          {/* Centered Antique Gold Play Button */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            {/* Outer Subtle Golden Ripple Glow */}
            <motion.div
              animate={{ scale: [1, 1.14, 1], opacity: [0.35, 0.65, 0.35] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-400/25 blur-md pointer-events-none"
            />

            {/* Antique Gold Play Button Circle */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.94 }}
              className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center p-[2px] shadow-[0_4px_16px_rgba(0,0,0,0.45)] group-hover:shadow-[0_6px_22px_rgba(217,119,6,0.6)] transition-all duration-300 pointer-events-auto"
              style={{
                background: 'linear-gradient(135deg, #F3DEAB 0%, #D8AB52 35%, #976B27 70%, #D8AB52 100%)',
              }}
            >
              {/* Inner Translucent Dark Amber Disc */}
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#6A4621]/85 via-[#4A2D13]/90 to-[#2A1809]/95 flex items-center justify-center backdrop-blur-xs border border-amber-300/30">
                {/* Play Triangle Icon */}
                <Play
                  className="w-5 h-5 sm:w-6 sm:h-6 text-[#F9E2AF] fill-[#F9E2AF] ml-0.5 filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] group-hover:text-amber-100 group-hover:fill-amber-100 transition-colors"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* 4. INTERACTIVE LIGHTBOX MODAL                                      */}
      {/* ----------------------------------------------------------------- */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-3xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 sm:right-0 p-2 text-amber-200 hover:text-white bg-black/50 hover:bg-black/75 rounded-full border border-amber-400/30 transition-all z-20 cursor-pointer"
                aria-label="Tutup Galeri"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Framed Large Image Container */}
              <div className="relative w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl border-2 border-[#D8AB52]/40 bg-[#1A0F08]">
                <img
                  src={allPhotos[lightboxIndex].image}
                  alt={allPhotos[lightboxIndex].alt}
                  className="max-h-[70vh] w-auto max-w-full object-contain filter drop-shadow-lg"
                />
              </div>

              {/* Caption & Navigation Controls */}
              <div className="w-full mt-3 flex items-center justify-between text-amber-100 px-2">
                <button
                  onClick={prevPhoto}
                  className="p-2 rounded-full bg-black/60 hover:bg-amber-600/60 border border-amber-400/30 transition-all cursor-pointer flex items-center gap-1 text-xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Sebelumnya</span>
                </button>

                <div className="text-center px-2 flex-1">
                  <h4 className="font-cormorant italic text-lg sm:text-xl font-bold text-amber-200">
                    {allPhotos[lightboxIndex].title}
                  </h4>
                  {allPhotos[lightboxIndex].subtitle && (
                    <p className="text-xs text-amber-100/70 font-sans mt-0.5">
                      {allPhotos[lightboxIndex].subtitle}
                    </p>
                  )}
                  <span className="text-[10px] text-amber-300/60 font-mono block mt-0.5">
                    {lightboxIndex + 1} / {allPhotos.length}
                  </span>
                </div>

                <button
                  onClick={nextPhoto}
                  className="p-2 rounded-full bg-black/60 hover:bg-amber-600/60 border border-amber-400/30 transition-all cursor-pointer flex items-center gap-1 text-xs"
                >
                  <span className="hidden sm:inline">Selanjutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------------------------------------------------------- */}
      {/* 5. INTERACTIVE VIDEO TEASER MODAL                                 */}
      {/* ----------------------------------------------------------------- */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-2xl w-full bg-[#1A0F08] border-2 border-[#D8AB52]/60 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-amber-400/20 bg-gradient-to-r from-[#2A1809] to-[#1A0F08]">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span className="font-cormorant italic font-bold text-base sm:text-lg text-amber-200">
                    Our Beautiful Memories — Wedding Teaser
                  </span>
                </div>
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="p-1.5 text-amber-200 hover:text-white bg-black/40 hover:bg-black/80 rounded-full border border-amber-400/30 transition-all cursor-pointer"
                  aria-label="Tutup Video Teaser"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Video Player Frame */}
              <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                {videoTeaser.videoType === 'youtube' && videoTeaser.videoUrl ? (
                  <iframe
                    src={videoTeaser.videoUrl}
                    title="Pre-wedding Video Teaser"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="relative w-full h-full flex flex-col items-center justify-center text-amber-200 p-6 text-center">
                    <img
                      src={videoTeaser.image}
                      alt="Teaser Video Preview"
                      className="absolute inset-0 w-full h-full object-cover filter brightness-50"
                    />
                    <div className="relative z-10 flex flex-col items-center">
                      <Play className="w-12 h-12 text-amber-300 fill-amber-300 mb-2 drop-shadow-md animate-pulse" />
                      <p className="font-cormorant italic text-lg sm:text-xl font-bold">
                        Cinematic Wedding Film Teaser
                      </p>
                      <p className="text-xs text-amber-100/70 font-sans mt-1">
                        Memori indah perjalanan cinta kami dalam visual sinematik adat Jawa.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer Note */}
              <div className="px-4 py-2.5 bg-[#2A1809]/90 border-t border-amber-400/20 text-center">
                <p className="font-cormorant italic text-xs sm:text-sm text-amber-200/90">
                  "Menyulam janji di hadapan semesta, bersatu dalam restu dan cinta abadi."
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
