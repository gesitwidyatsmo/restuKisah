'use client';

import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Music, Volume2, VolumeX, Eye } from 'lucide-react';
import FallingParticlesCanvas, { ParticleEffectType } from '@/components/effects/FallingParticlesCanvas';
import { BurstEffectType } from '@/components/effects/OpeningBurstEffect';

export interface JavaneseAnimatedCoverModalProps {
  isOpen: boolean;
  onOpen: (origin?: { x: number; y: number }) => void;
  guestName?: string;
  coupleTitle?: string;
  weddingDate?: string;
  enableParallax?: boolean;
  enableAudioToggle?: boolean;
  isPlayingMusic?: boolean;
  onToggleMusic?: () => void;
  particleType?: ParticleEffectType;
  burstType?: BurstEffectType;
}

export default function JavaneseAnimatedCoverModal({
  isOpen,
  onOpen,
  guestName = 'Yogi & Ratna',
  coupleTitle = 'Miko dan Angela',
  weddingDate = 'Minggu, 30 September 2026',
  enableParallax = false,
  enableAudioToggle = false,
  isPlayingMusic = false,
  onToggleMusic,
  particleType = 'pink_blossoms',
  burstType = 'gold_butterflies'
}: JavaneseAnimatedCoverModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOpenClick = (e: React.MouseEvent) => {
    onOpen({ x: e.clientX, y: e.clientY });
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="javanese-cover-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#FAF6F0]"
        >
          {/* ========================================================================= */}
          {/* SAMPUL PEMBUKA SATU LAYAR HP PENUH (FULL MOBILE SCREEN - NO CARD WRAPPER) */}
          {/* ========================================================================= */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              y: -30, 
              transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[480px] h-[100dvh] overflow-hidden bg-[#FAF6F0] flex flex-col items-center justify-between select-none shadow-2xl"
          >
            {/* ------------------------------------------------------------- */}
            {/* LAYER 0: BACKGROUND PARCHMENT (SOLID & STATIC - NO MOUSE MOVE)*/}
            {/* ------------------------------------------------------------- */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <img
                src="/templates/jawa/cover/bg-parchment.webp"
                alt="Parchment Background"
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
              {/* Radial Center Warm Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,_rgba(255,255,255,0.7)_0%,_rgba(254,243,199,0.3)_50%,_rgba(180,83,9,0.15)_100%)] pointer-events-none" />
            </div>

            {/* PARTICLES CANVAS (CONFIGURABLE) */}
            <FallingParticlesCanvas
              type={particleType}
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
            />

            {/* ------------------------------------------------------------- */}
            {/* LAYER 1: GEBYOK GATEWAY FRAME (KOMPONEN 2 - SOLID & STATIC)   */}
            {/* GERBANG KAYU JATI FULL PINGGIR (EDGE-TO-EDGE) DAN FULL ATAS   */}
            {/* ------------------------------------------------------------- */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-15">
              <img
                src="/templates/jawa/cover/gebyok-gateway.webp"
                alt="Ornate Gebyok Wooden Gateway"
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-fill object-top"
              />
            </div>

            {/* ------------------------------------------------------------- */}
            {/* LAYER 2: TOP GOLDEN CREST (KOMPONEN 3)                        */}
            {/* Visual weight dikurangi 20%: brightness & contrast diturunkan */}
            {/* ------------------------------------------------------------- */}
            <motion.div
              animate={{ y: [-1.5, 1.5, -1.5] }}
              transition={{ duration: 5.0, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] pointer-events-none z-35 opacity-85 filter brightness-[0.88] contrast-[0.92]"
            >
              <img
                src="/templates/jawa/cover/crest-top.webp"
                alt="Ornate Golden Wood Crest"
                loading="eager"
                className="w-full h-auto object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
              />
            </motion.div>

            {/* ------------------------------------------------------------- */}
            {/* LAYER 3: TOP BATIK CURTAINS (KOMPONEN 4 & 5)                  */}
            {/* Visual weight diringankan: opacity & contrast lembut          */}
            {/* ------------------------------------------------------------- */}
            {/* Tirai Kiri */}
            <motion.div
              animate={{ rotate: [-1.4, 1.2, -1.4] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top left' }}
              className="absolute top-0 left-0 w-[42%] pointer-events-none z-30 opacity-88 filter brightness-[0.92] contrast-[0.94]"
            >
              <img
                src="/templates/jawa/cover/curtain-left.webp"
                alt="Batik Curtain Left"
                loading="eager"
                className="w-full h-auto object-contain"
              />
            </motion.div>

            {/* Tirai Kanan */}
            <motion.div
              animate={{ rotate: [1.4, -1.2, 1.4] }}
              transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top right' }}
              className="absolute top-0 right-0 w-[42%] pointer-events-none z-30 opacity-88 filter brightness-[0.92] contrast-[0.94]"
            >
              <img
                src="/templates/jawa/cover/curtain-right.webp"
                alt="Batik Curtain Right"
                loading="eager"
                className="w-full h-auto object-contain"
              />
            </motion.div>

            {/* ------------------------------------------------------------- */}
            {/* LAYER 4: LANTERNS & JASMINE GARLANDS (KOMPONEN 8 & 9)         */}
            {/* BERGERAK: AYUNAN BANDUL LANTERNA & KEDIPAN CAHAYA LAMPU       */}
            {/* ------------------------------------------------------------- */}
            {/* Lentera Kiri */}
            <motion.div
              animate={{ rotate: [-2.5, 2.5, -2.5] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top center' }}
              className="absolute top-[13.5%] left-[3.5%] w-[10%] pointer-events-none z-32"
            >
              {/* Warm Pulsing Lantern Light Glow */}
              <motion.div 
                animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.25, 0.95] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[35%] left-[20%] w-[60%] h-[40%] bg-amber-400 rounded-full blur-md"
              />
              <img
                src="/templates/jawa/cover/lantern.webp"
                alt="Ornate Javanese Brass Lantern Left"
                className="w-full h-auto object-contain relative z-10"
              />
            </motion.div>

            {/* Ronce Melati Kiri */}
            <motion.div
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              style={{ transformOrigin: 'top center' }}
              className="absolute top-[13.5%] left-[0.5%] w-[4.5%] pointer-events-none z-31"
            >
              <img
                src="/templates/jawa/cover/garland-melati.webp"
                alt="Bridal Jasmine Garland Left"
                className="w-full h-auto object-contain"
              />
            </motion.div>

            {/* Lentera Kanan */}
            <motion.div
              animate={{ rotate: [2.5, -2.5, 2.5] }}
              transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              style={{ transformOrigin: 'top center' }}
              className="absolute top-[13.5%] right-[3.5%] w-[10%] pointer-events-none z-32"
            >
              {/* Warm Pulsing Lantern Light Glow */}
              <motion.div 
                animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.25, 0.95] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
                className="absolute top-[35%] left-[20%] w-[60%] h-[40%] bg-amber-400 rounded-full blur-md"
              />
              <img
                src="/templates/jawa/cover/lantern.webp"
                alt="Ornate Javanese Brass Lantern Right"
                className="w-full h-auto object-contain relative z-10 scale-x-[-1]"
              />
            </motion.div>

            {/* Ronce Melati Kanan */}
            <motion.div
              animate={{ rotate: [2, -2, 2] }}
              transition={{ duration: 5.0, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              style={{ transformOrigin: 'top center' }}
              className="absolute top-[13.5%] right-[0.5%] w-[4.5%] pointer-events-none z-31"
            >
              <img
                src="/templates/jawa/cover/garland-melati.webp"
                alt="Bridal Jasmine Garland Right"
                className="w-full h-auto object-contain scale-x-[-1]"
              />
            </motion.div>

            {/* ------------------------------------------------------------- */}
            {/* LAYER 5: THE WEDDING OF MIKO DAN ANGELA (SERIF ROYAL DEFAULT) */}
            {/* Tipografi Serif Royal (Cinzel) bertema Kraton berwibawa       */}
            {/* Diberi ruang lega & visual yang anggun dan tidak berat        */}
            {/* ------------------------------------------------------------- */}
            <motion.div
              animate={{ y: [-1.5, 1.5, -1.5] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[13%] left-1/2 -translate-x-1/2 w-[88%] max-w-[340px] pointer-events-none z-36 flex flex-col items-center text-center select-none"
            >
              <div className="relative flex flex-col items-center py-1">
                {/* Pendaran Cahaya Gelap Halus untuk Kontras Elegan */}
                <div className="absolute -inset-x-8 -inset-y-3 bg-radial from-stone-950/65 via-stone-900/30 to-transparent blur-md -z-10 rounded-full" />

                {/* Subtitle "THE WEDDING OF" */}
                <span className="font-cinzel text-[10px] sm:text-[11px] font-semibold tracking-[0.38em] uppercase text-amber-200/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] block mb-1">
                  The Wedding of
                </span>

                {/* Nama Mempelai (Serif Royal) */}
                <h1 className="font-cinzel text-xl sm:text-[23px] font-bold text-[#F7E9C8] uppercase tracking-[0.18em] leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] filter drop-shadow-[0_0_8px_rgba(245,158,11,0.35)] my-0.5">
                  {coupleTitle}
                </h1>

                {/* Ornamen Pembatas Emas Halus (Ukuran diperkecil 32% agar ringan) */}
                <div className="w-[32%] mt-1 opacity-80 filter brightness-95 drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]">
                  <img
                    src="/templates/jawa/cover/divider.webp"
                    alt="Golden Baroque Divider"
                    loading="eager"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </motion.div>

            {/* ------------------------------------------------------------- */}
            {/* LAYER 6: PENGANTIN JAWA (SECONDARY FOCAL POINT: 1.30x BESAR)  */}
            {/* BERGERAK: NAFAS HIDUP (BREATHING MOTION) MEMPELAI PRIA & WANITA */}
            {/* Diperbesar ~1.30x (h-[58%]), proporsional di tengah lengkungan, */}
            {/* tidak menyentuh nama atas dan guest card bawah.                */}
            {/* ------------------------------------------------------------- */}
            {/* Pengantin Pria (Groom) Full Body */}
            <motion.div
              animate={{ 
                y: [0, -3.5, 0],
                rotate: [0, 0.4, 0]
              }}
              transition={{ duration: 4.0, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[29.5%] right-[49.5%] h-[58%] pointer-events-none z-22 flex justify-end"
            >
              <img
                src="/templates/jawa/cover/groom-full.webp"
                alt="Javanese Groom in Ornate Beskap Full Body"
                loading="eager"
                fetchPriority="high"
                className="h-full w-auto object-contain drop-shadow-md"
              />
            </motion.div>

            {/* Pengantin Wanita (Bride) Full Body */}
            <motion.div
              animate={{ 
                y: [0, -3.5, 0],
                rotate: [0, -0.4, 0]
              }}
              transition={{ duration: 4.0, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              className="absolute top-[29.5%] left-[49.5%] h-[58%] pointer-events-none z-22 flex justify-start"
            >
              <img
                src="/templates/jawa/cover/bride-full.webp"
                alt="Javanese Bride in Golden Paes Ageng Attire Full Body"
                loading="eager"
                fetchPriority="high"
                className="h-full w-auto object-contain drop-shadow-md"
              />
            </motion.div>

            {/* ------------------------------------------------------------- */}
            {/* LAYER 7: ELEMEN BAWAH (KOMPONEN 6, 10, & 14)                  */}
            {/* ------------------------------------------------------------- */}
            {/* Kain Batik Dasar Melengkung */}
            <div className="absolute bottom-0 left-0 w-full pointer-events-none z-23">
              <img
                src="/templates/jawa/cover/border-bottom.webp"
                alt="Luxurious Javanese Batik Draped Border"
                loading="eager"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Buket Bunga Melati & Daun (Bergerak Bernafas) */}
            <motion.div
              animate={{ 
                y: [-2, 2, -2],
                scale: [0.99, 1.015, 0.99]
              }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[66%] left-1/2 -translate-x-1/2 w-[72%] pointer-events-none z-26"
            >
              <img
                src="/templates/jawa/cover/flowers-bottom.webp"
                alt="White Jasmine and Plumeria Garland Arrangement"
                className="w-full h-auto object-contain drop-shadow-md"
              />
            </motion.div>

            {/* Ukiran Kayu Emas Bawah */}
            <motion.div
              animate={{ 
                filter: [
                  'drop-shadow(0 2px 4px rgba(217,119,6,0.3))',
                  'drop-shadow(0 4px 8px rgba(245,158,11,0.6))',
                  'drop-shadow(0 2px 4px rgba(217,119,6,0.3))'
                ]
              }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-[1%] left-1/2 -translate-x-1/2 w-[34%] pointer-events-none z-27"
            >
              <img
                src="/templates/jawa/cover/carving-bottom.webp"
                alt="Gilded Javanese Floral Wood Carving"
                className="w-full h-auto object-contain"
              />
            </motion.div>

            {/* SHIMMER LIGHT OVERLAY DI ATAS KARTU */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-38 overflow-hidden"
              style={{
                background: 'linear-gradient(105deg, transparent 20%, rgba(254, 240, 138, 0.28) 50%, transparent 80%)',
              }}
              animate={{ x: ['-150%', '150%'] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', repeatDelay: 4 }}
            />

            {/* GRADIENT SHADOW UNTUK KONTEN INTERAKTIF DI BAWAH */}
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#1C1917]/95 via-[#1C1917]/50 to-transparent pointer-events-none z-40" />

            {/* ------------------------------------------------------------- */}
            {/* UI LAYER: KARTU TAMU IVORY & CTA ANTIQUE TEAK GOLD            */}
            {/* ------------------------------------------------------------- */}
            <div className="absolute inset-x-4 bottom-5 sm:bottom-6 z-45 flex flex-col items-center gap-2.5">
              {/* Guest Card: Background Ivory, Border Gold Tipis, Sedikit Radius, Shadow Lembut */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="w-full p-2.5 sm:p-3 rounded-xl bg-[#FAF7EE]/96 backdrop-blur-md border border-[#C69B45]/60 shadow-[0_4px_20px_rgba(28,25,23,0.12)] text-center relative overflow-hidden"
              >
                {/* Aksen Ornament Corner Kecil Emas */}
                <span className="absolute top-1.5 left-2 text-[9px] text-[#C69B45]/70 font-serif select-none pointer-events-none">❖</span>
                <span className="absolute top-1.5 right-2 text-[9px] text-[#C69B45]/70 font-serif select-none pointer-events-none">❖</span>
                <span className="absolute bottom-1.5 left-2 text-[9px] text-[#C69B45]/70 font-serif select-none pointer-events-none">❖</span>
                <span className="absolute bottom-1.5 right-2 text-[9px] text-[#C69B45]/70 font-serif select-none pointer-events-none">❖</span>

                <span className="font-cinzel text-[9.5px] sm:text-[10px] font-semibold text-[#7A5835] uppercase tracking-[0.24em] block mb-0.5">
                  Kepada Yth. Bapak/Ibu/Saudara/i:
                </span>
                <div className="font-serif text-base sm:text-lg font-bold text-[#2A180E] flex items-center justify-center gap-2">
                  <span className="truncate max-w-[240px] tracking-wide">{guestName}</span>
                  <span className="text-[9px] px-2 py-0.5 bg-[#FAF1D8] border border-[#C69B45]/40 rounded font-mono font-medium text-[#7A5835]">
                    Tamu Undangan
                  </span>
                </div>
              </motion.div>

              {/* Tombol CTA: Background #3A2418, Border #C69B45, Text #F7E9C8 */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOpenClick}
                className="w-full py-3 sm:py-3.5 text-xs sm:text-sm font-cinzel font-bold tracking-[0.18em] uppercase bg-[#3A2418] hover:bg-[#482F20] text-[#F7E9C8] border-2 border-[#C69B45] hover:border-[#DFB86C] rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.4)] flex items-center justify-center gap-2.5 transition-colors cursor-pointer group"
              >
                <Sparkles className="w-4 h-4 text-[#C69B45] group-hover:rotate-12 transition-transform" />
                <span>Buka Lembaran Undangan</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
