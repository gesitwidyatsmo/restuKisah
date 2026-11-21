'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Volume2, VolumeX } from 'lucide-react';
import JavaneseAnimatedCoverModal from './JavaneseAnimatedCoverModal';
import RoyalJavaneseHeroCountdown from './jawa/RoyalJavaneseHeroCountdown';
import RoyalJavaneseQuoteOpening from './jawa/RoyalJavaneseQuoteOpening';
import RoyalJavaneseBrideGroomProfile from './jawa/RoyalJavaneseBrideGroomProfile';
import RoyalJavaneseWeddingEventsLocation from './jawa/RoyalJavaneseWeddingEventsLocation';
import RoyalJavaneseLoveStory from './jawa/RoyalJavaneseLoveStory';
import RoyalJavanesePhotoVideoGallery from './jawa/RoyalJavanesePhotoVideoGallery';
import FallingParticlesCanvas, { ParticleEffectType } from '@/components/effects/FallingParticlesCanvas';
import OpeningBurstEffect, { BurstEffectType } from '@/components/effects/OpeningBurstEffect';
import EffectSwitcherPill from '@/components/effects/EffectSwitcherPill';

interface JavaneseParchmentTemplateProps {
  guestName?: string;
  onOpen?: () => void;
  coupleTitle?: string;
  weddingDate?: string;
  heroImage?: string;
  coverMode?: 'adat_jawa_cover' | 'classic_arch';
  initialOpen?: boolean;
  particleEffect?: ParticleEffectType;
  burstEffect?: BurstEffectType;
  showEffectSwitcher?: boolean;
}

export default function JavaneseParchmentTemplate({
  guestName = 'Yogi dan Ratna',
  onOpen,
  coupleTitle = 'Miko dan Angela',
  weddingDate = 'Saturday, 21 June 2025',
  heroImage = '/templates/jawa/hero/portrait-couple.webp',
  coverMode = 'adat_jawa_cover',
  initialOpen = false,
  particleEffect = 'pink_blossoms',
  burstEffect = 'gold_butterflies',
  showEffectSwitcher = true,
}: JavaneseParchmentTemplateProps) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isGununganActive, setIsGununganActive] = useState(false);

  // Configurable Effects
  const [currentParticle, setCurrentParticle] = useState<ParticleEffectType>(particleEffect);
  const [currentBurst, setCurrentBurst] = useState<BurstEffectType>(burstEffect);
  const [burstActive, setBurstActive] = useState(false);
  const [burstOrigin, setBurstOrigin] = useState<{ x: number; y: number } | undefined>(undefined);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Parallax Offset
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * -16, y: y * -16 });
  };

  const handleOpenInvitation = (origin?: { x: number; y: number }) => {
    if (origin) {
      setBurstOrigin(origin);
    }
    setBurstActive(true);
    setIsGununganActive(true);
    setIsPlayingMusic(true);

    // Swap under the golden wash at 750ms while screen is occluded
    setTimeout(() => {
      setIsOpen(true);
    }, 750);

    // Conclude Gunungan animation smoothly at 1700ms
    setTimeout(() => {
      setIsGununganActive(false);
      if (onOpen) onOpen();
    }, 1700);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      suppressHydrationWarning
      className="relative min-h-[100dvh] w-full overflow-x-hidden bg-[#FAF8F5] text-[#1C1917] font-sans selection:bg-amber-200 py-4 sm:py-8 flex flex-col items-center justify-center"
    >
      {/* 1. ULTRA SLOW BREATHING PARCHMENT BACKDROP */}
      <motion.div 
        className="fixed inset-0 w-full h-full bg-cover bg-center pointer-events-none z-0"
        style={{
          backgroundImage: `url(${isOpen ? '/templates/jawa/common/bg-ivory-heritage.webp' : '/templates/jawa/common/cover-bg.jpg'})`,
          filter: 'blur(8px) brightness(0.96) contrast(1.02)',
          opacity: 0.35,
        }}
        animate={{
          scale: [1.02, 1.06, 1.02],
          x: mouseOffset.x * 0.3,
          y: mouseOffset.y * 0.3,
        }}
        transition={{
          scale: { duration: 30, repeat: Infinity, ease: 'easeInOut' },
          x: { type: 'spring', damping: 30, stiffness: 80 },
          y: { type: 'spring', damping: 30, stiffness: 80 },
        }}
      />

      {/* 2. AMBIENT WARM TINT VIGNETTE */}
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(254, 243, 199, 0.2) 0%, rgba(250, 248, 245, 0.6) 80%)'
        }}
      />

      {/* 3. PARTICLES CANVAS (CONFIGURABLE: PINK BLOSSOMS DEFAULT) */}
      <FallingParticlesCanvas 
        type={currentParticle}
        className="fixed inset-0 w-full h-full pointer-events-none z-10" 
      />

      {/* 3B. OPENING BURST EFFECT (GOLD BUTTERFLIES DEFAULT) */}
      <OpeningBurstEffect
        isActive={burstActive}
        type={currentBurst}
        origin={burstOrigin}
        onComplete={() => setBurstActive(false)}
      />

      {/* 4. FLOATING MUSIC CONTROLLER */}
      <motion.button
        suppressHydrationWarning
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsPlayingMusic(!isPlayingMusic)}
        className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-[#FFF9F0] border-2 border-[#B58A45] shadow-lg flex items-center justify-center btn-pressable ring-4 ring-amber-400/30"
        title={isPlayingMusic ? 'Heningkan Musik' : 'Putar Musik Gamelan'}
        aria-label="Toggle musik"
      >
        {isPlayingMusic ? (
          <Volume2 className="w-5 h-5 text-[#B58A45] animate-pulse" />
        ) : (
          <VolumeX className="w-5 h-5 text-stone-500" />
        )}
      </motion.button>

      {/* ========================================================= */}
      {/* 4B. GUNUNGAN THEATRICAL OPENING CEREMONY (BEDHOL KAYON)   */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isGununganActive && (
          <motion.div
            key="gunungan-ceremony"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed inset-0 z-[60] pointer-events-none flex items-center justify-center overflow-hidden transform-gpu"
          >
            {/* 1. Golden Amber Atmosphere Wash */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.96, 0.96, 0],
              }}
              transition={{ 
                times: [0, 0.38, 0.68, 1],
                duration: 1.7,
                ease: 'easeInOut'
              }}
              className="absolute inset-0 bg-gradient-to-b from-[#FEF3C7] via-[#FDE68A] to-[#D97706]/95"
              style={{ willChange: 'opacity' }}
            />

            {/* 2. Radiant Golden Radial Aura Burst */}
            <motion.div
              initial={{ scale: 0.4, rotate: 0, opacity: 0 }}
              animate={{ 
                scale: [0.4, 1.4, 2.4],
                rotate: [0, 45, 90],
                opacity: [0, 0.85, 0]
              }}
              transition={{ 
                times: [0, 0.45, 1],
                duration: 1.7,
                ease: 'easeOut'
              }}
              className="absolute w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(254,240,138,0.9)_0%,rgba(217,119,6,0.5)_50%,transparent_75%)]"
              style={{ willChange: 'transform, opacity' }}
            />

            {/* 3. Theatrical Sacred Kayon / Gunungan (Splitting Apart) */}
            <div className="relative z-10 flex items-center justify-center w-full h-full max-w-sm px-6">
              {/* Left Gunungan Flap */}
              <motion.div
                initial={{ x: 0, rotate: 0, scale: 0.8, opacity: 0 }}
                animate={{ 
                  x: [0, -15, -450],
                  rotate: [0, -6, -24],
                  scale: [0.8, 1.12, 1.3],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{ 
                  times: [0, 0.32, 0.68, 1],
                  duration: 1.7, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="w-1/2 flex justify-end transform-gpu"
                style={{ willChange: 'transform, opacity' }}
              >
                <img 
                  src="/templates/jawa/common/gunungan.png" 
                  alt="Gunungan Wayang Kiri" 
                  className="w-48 sm:w-60 h-auto object-contain filter drop-shadow-[0_15px_25px_rgba(180,83,9,0.7)]"
                />
              </motion.div>

              {/* Right Gunungan Flap */}
              <motion.div
                initial={{ x: 0, rotate: 0, scale: 0.8, opacity: 0 }}
                animate={{ 
                  x: [0, 15, 450],
                  rotate: [0, 6, 24],
                  scale: [0.8, 1.12, 1.3],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{ 
                  times: [0, 0.32, 0.68, 1],
                  duration: 1.7, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="w-1/2 flex justify-start transform-gpu"
                style={{ willChange: 'transform, opacity' }}
              >
                <img 
                  src="/templates/jawa/common/gunungan.png" 
                  alt="Gunungan Wayang Kanan" 
                  className="w-48 sm:w-60 h-auto object-contain filter drop-shadow-[0_15px_25px_rgba(180,83,9,0.7)] scale-x-[-1]"
                />
              </motion.div>
            </div>

            {/* 4. Sacred Text Banner: Pawiwahan Ageng */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0.8, 1.05, 1.1, 1.18]
              }}
              transition={{
                times: [0, 0.38, 0.68, 1],
                duration: 1.7,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="absolute z-20 text-center px-6 py-3 bg-[#FAF8F5] border-2 border-[#1C1917] rounded-3xl shadow-2xl"
              style={{ willChange: 'transform, opacity' }}
            >
              <span className="font-mono text-[10px] tracking-widest text-amber-900 font-extrabold uppercase block mb-0.5">
                ✦ BEDHOL KAYON ✦
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] leading-tight">
                Pawiwahan Ageng
              </h2>
              <p className="font-serif italic text-xs text-stone-700">
                Membuka Lembaran Suci {coupleTitle}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* 5. COVER STATE / OPENED INVITATION CONTENT                */}
      {/* ========================================================= */}
      <AnimatePresence mode="wait">
        {!isOpen ? (
          coverMode === 'adat_jawa_cover' ? (
            <JavaneseAnimatedCoverModal 
              key="cover-modal-animated"
              isOpen={isOpen}
              onOpen={(origin) => handleOpenInvitation(origin)}
              guestName={guestName}
              coupleTitle={coupleTitle}
              weddingDate={weddingDate}
              particleType={currentParticle}
              burstType={currentBurst}
            />
          ) : (
            <motion.div 
              key="cover-sheet"
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -45, scale: 0.94 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-30 w-full max-w-md px-4 flex items-center justify-center min-h-[85vh]"
            >
              <div className="relative w-full max-w-[390px] sm:max-w-[430px] border-3 sm:border-4 border-[#1C1917] rounded-3xl sm:rounded-[44px] p-5 sm:p-7 text-center shadow-2xl overflow-hidden bg-[#FAF6F0] ring-2 ring-amber-400/50">
                {/* Background image */}
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-bottom pointer-events-none z-0"
                  style={{
                    backgroundImage: `url('/templates/jawa/common/cover-bg.jpg')`,
                    filter: 'contrast(1.02) brightness(0.98)',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0]/85 via-[#FAF6F0]/50 to-[#FAF6F0]/90 pointer-events-none z-0" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative w-full border-2 border-[#8C6D46]/80 rounded-[28px] p-4 sm:p-5 bg-[#FAF6F0]/92 backdrop-blur-xs shadow-xs mb-3.5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border border-[#1C1917] shadow-xs flex items-center justify-center mx-auto mb-2 p-1.5">
                      <img 
                        src="/templates/jawa/common/gunungan.png" 
                        alt="Gunungan" 
                        className="w-full h-full object-contain filter drop-shadow-xs" 
                      />
                    </div>
                    <span className="font-serif text-[11px] sm:text-xs font-semibold tracking-[0.28em] text-[#8C6D46] uppercase block mb-3">
                      THE WEDDING OF
                    </span>
                    <div className="relative mx-auto w-44 sm:w-52 aspect-[3/4.2] rounded-t-[110px] sm:rounded-t-[130px] rounded-b-md border-3 border-[#2C1810] overflow-hidden shadow-md bg-[#2C1810]">
                      <img 
                        src={heroImage}
                        alt={coupleTitle}
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" 
                      />
                    </div>
                    <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-wider mt-3.5 mb-1 leading-tight">
                      {coupleTitle}
                    </h1>
                    <p className="font-serif text-[11px] sm:text-xs font-semibold text-[#8C6D46] tracking-[0.18em] uppercase">
                      {weddingDate}
                    </p>
                  </div>

                  <div className="w-full p-3.5 rounded-2xl bg-white/92 backdrop-blur-md border-2 border-[#1C1917] shadow-sm mb-3.5 text-left relative overflow-hidden">
                    <span className="text-[10px] font-bold text-stone-600 uppercase tracking-wider block mb-0.5">
                      Kepada Yth. Bapak/Ibu/Saudara/i:
                    </span>
                    <div className="font-serif text-lg sm:text-xl font-bold text-[#1C1917] flex items-center justify-between">
                      <span>{guestName}</span>
                      <span className="text-[10px] px-2.5 py-0.5 bg-amber-200 border border-[#1C1917] rounded-lg font-mono font-bold text-stone-900 shadow-xs">
                        Tamu Spesial
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => handleOpenInvitation({ x: e.clientX, y: e.clientY })}
                    className="w-full py-3.5 text-sm font-bold bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 text-white border-2 border-[#1C1917] rounded-2xl shadow-md btn-pressable flex items-center justify-center gap-2 group"
                  >
                    <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    <span>Buka Lembaran Undangan</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )
        ) : (
          /* =================================================================== */
          /* 6. LEMBARAN ISI UNDANGAN: HERO & COUNTDOWN SECTION                 */
          /* =================================================================== */
          <motion.div 
            key="invitation-hero-sheet"
            initial={false}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-30 w-full max-w-lg px-2 sm:px-4 my-2 flex flex-col items-center"
          >
            {/* SECTION 01: ROYAL JAVANESE WEDDING HERO & COUNTDOWN COMPONENT */}
            <RoyalJavaneseHeroCountdown 
              coupleTitle={coupleTitle}
              weddingDateFormatted={weddingDate || 'Saturday, 21 June 2025'}
              targetDateISO="2025-06-21T09:00:00+07:00"
              heroImage="/templates/jawa/hero/portrait-couple.webp"
              calendarButtonText="Save the Date"
              eventLocation="Gedung Sasana Kriya, Taman Mini Indonesia Indah, Jakarta"
            />

            {/* SECTION 02: ROYAL JAVANESE QUOTE & OPENING PRAYER */}
            <div className="w-full mt-4 sm:mt-6">
              <RoyalJavaneseQuoteOpening />
            </div>

            {/* SECTION 03: ROYAL JAVANESE BRIDE & GROOM PROFILES */}
            <div className="w-full mt-4 sm:mt-6">
              <RoyalJavaneseBrideGroomProfile />
            </div>

            {/* SECTION 04: ROYAL JAVANESE WEDDING EVENTS & LOCATION */}
            <div className="w-full mt-4 sm:mt-6">
              <RoyalJavaneseWeddingEventsLocation 
                cardFrameImage="/templates/jawa/events/card-banner.webp"
              />
            </div>

            {/* SECTION 05: ROYAL JAVANESE OUR LOVE STORY TIMELINE */}
            <div className="w-full mt-4 sm:mt-6">
              <RoyalJavaneseLoveStory />
            </div>

            {/* SECTION 06: ROYAL JAVANESE PHOTO & VIDEO GALLERY */}
            <div className="w-full mt-4 sm:mt-6">
              <RoyalJavanesePhotoVideoGallery 
                backgroundImage="/templates/jawa/common/bg-cream-embossed.webp"
              />
            </div>

            {/* Subtle Return to Cover Navigation */}
            <div className="w-full text-center mt-3 mb-6">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setIsOpen(false);
                  setIsGununganActive(false);
                  setBurstActive(false);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#65422F] hover:text-[#392319] bg-[#FFF9F0]/90 hover:bg-[#FFF9F0] border border-[#B58A45]/40 rounded-full shadow-sm transition-all duration-200"
              >
                <span>← Tutup Lembaran & Kembali ke Sampul</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. EFFECT SWITCHER PILL (Interactive options selector) */}
      {showEffectSwitcher && (
        <EffectSwitcherPill
          particleType={currentParticle}
          onSelectParticle={(p) => setCurrentParticle(p)}
          burstType={currentBurst}
          onSelectBurst={(b) => setCurrentBurst(b)}
          isInvitationOpen={isOpen}
          onResetInvitation={() => {
            setIsOpen(false);
            setIsGununganActive(false);
            setBurstActive(false);
          }}
        />
      )}
    </div>
  );
}
