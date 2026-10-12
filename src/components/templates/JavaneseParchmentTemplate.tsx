'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, type Variants } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Clock, 
  Volume2, 
  VolumeX, 
  Heart, 
  Share2,
  Copy,
  Check,
  ChevronDown,
  Gift,
  Send,
  Video,
  CheckCircle2,
  MessageCircle,
  ExternalLink,
  Navigation
} from 'lucide-react';

interface JavaneseParchmentTemplateProps {
  guestName?: string;
  onOpen?: () => void;
  coupleTitle?: string;
  weddingDate?: string;
  heroImage?: string;
}

interface WishItem {
  id: string;
  sender: string;
  attendance: 'hadir' | 'tidak_hadir' | 'ragu';
  message: string;
  time: string;
}

// Framer Motion Animation Variants for Staggered Sections
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 45, scale: 0.96 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 90, 
      damping: 18,
      mass: 0.8
    } 
  }
};

export default function JavaneseParchmentTemplate({
  guestName = 'Yogi dan Ratna',
  onOpen,
  coupleTitle = 'Benny & Dinda',
  weddingDate = 'Minggu, 30 September 2026',
  heroImage = '/templates/jawa/photos/couple-hero.jpg'
}: JavaneseParchmentTemplateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isGununganActive, setIsGununganActive] = useState(false);
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sheetScrollRef = useRef<HTMLDivElement | null>(null);

  // Parallax Offset
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // RSVP Form States
  const [rsvpName, setRsvpName] = useState(guestName !== 'Tamu Spesial' ? guestName : '');
  const [rsvpStatus, setRsvpStatus] = useState<'hadir' | 'tidak_hadir' | 'ragu'>('hadir');
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [wishes, setWishes] = useState<WishItem[]>([
    {
      id: '1',
      sender: 'Bagas & Dinda',
      attendance: 'hadir',
      message: 'Selamat berbahagia Mbak Juwita & Mas Seno! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah sampai kakek nenek. Aamiin ya rabbal alamin.',
      time: '1 jam yang lalu'
    },
    {
      id: '2',
      sender: 'Keluarga Besar Bpk. Heru Solo',
      attendance: 'hadir',
      message: 'Nderek bingah lan ngaturaken sugeng menempuh hidup baru kagem Mas Seno & Mbak Juwita, tansah ayem tentrem berkah gusti.',
      time: '3 jam yang lalu'
    },
    {
      id: '3',
      sender: 'Sahabat Kuliah Yogya',
      attendance: 'hadir',
      message: 'Akhirnya berlabuh ke pelaminan! Bahagia selalu kalian berdua, lancar-lancar sampai hari H yaa!',
      time: '5 jam yang lalu'
    }
  ]);

  // 1. Interactive Falling Jasmine Petals & Golden Glow
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      type: 'petal' | 'gold';
      rotation: number;
      rotationSpeed: number;
      opacity: number;
    }> = [];

    const PARTICLE_COUNT = 38;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.8 + 1.2,
        speedY: Math.random() * 0.7 + 0.35,
        speedX: Math.sin(Math.random() * Math.PI * 2) * 0.45,
        type: Math.random() > 0.35 ? 'petal' : 'gold',
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.7 + 0.3,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.012) * 0.6 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'petal') {
          // Jasmine Petal shape (Soft Ivory White with warm amber edge)
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 2.4, p.radius * 1.3, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 253, 245, ${p.opacity * 0.9})`;
          ctx.fill();
          ctx.strokeStyle = `rgba(217, 119, 6, ${p.opacity * 0.3})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        } else {
          // Golden sparkle
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(251, 191, 36, ${p.opacity})`;
          ctx.shadowColor = 'rgba(245, 158, 11, 0.9)';
          ctx.shadowBlur = 8;
          ctx.fill();
        }

        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * -16, y: y * -16 });
  };

  const handleOpenInvitation = () => {
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

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(type);
    setTimeout(() => setCopiedBank(null), 2000);
  };

  const handleSubmitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpMessage.trim()) return;

    const newWish: WishItem = {
      id: Date.now().toString(),
      sender: rsvpName || 'Sahabat Mempelai',
      attendance: rsvpStatus,
      message: rsvpMessage,
      time: 'Baru saja'
    };

    setWishes([newWish, ...wishes]);
    setRsvpMessage('');

    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#D97706', '#10B981', '#F59E0B']
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100dvh] w-full overflow-x-hidden bg-[#FAF8F5] text-[#1C1917] font-sans selection:bg-amber-200 py-6 sm:py-12 flex flex-col items-center justify-center"
    >
      {/* 1. OUTER BACKGROUND (BOKEH BLUR + LOWER OPACITY CINEMATIC DEPTH) */}
      <motion.div
        className="fixed inset-0 w-full h-full bg-cover bg-center origin-center pointer-events-none z-0 scale-105"
        style={{
          backgroundImage: `url(${isOpen ? '/templates/jawa/bg-parchment.png' : '/templates/jawa/cover-bg.jpg'})`,
          filter: 'blur(10px) brightness(0.92) contrast(1.05)',
          opacity: 0.45,
        }}
        animate={{
          scale: [1.05, 1.1, 1.05],
          x: mouseOffset.x * 0.4,
          y: mouseOffset.y * 0.4,
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
          background: 'radial-gradient(ellipse at center, rgba(254, 243, 199, 0.25) 0%, rgba(250, 248, 245, 0.65) 80%)'
        }}
      />

      {/* 3. PARTICLES CANVAS (Jasmine Petals & Gold Dust) */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* 4. FLOATING MUSIC CONTROLLER WITH PULSING GOLD RING */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsPlayingMusic(!isPlayingMusic)}
        className="fixed bottom-5 right-5 z-50 w-13 h-13 rounded-full bg-white border-2 border-[#1C1917] shadow-hard flex items-center justify-center btn-pressable min-h-[48px] min-w-[48px] ring-4 ring-amber-400/40"
        title={isPlayingMusic ? 'Heningkan Musik' : 'Putar Musik Gamelan'}
        aria-label="Toggle musik"
      >
        {isPlayingMusic ? (
          <Volume2 className="w-5 h-5 text-amber-600 animate-pulse" />
        ) : (
          <VolumeX className="w-5 h-5 text-stone-500" />
        )}
      </motion.button>

      {/* ========================================================= */}
      {/* ========================================================= */}
      {/* 4B. GUNUNGAN THEATRICAL OPENING CEREMONY (BEDHOL KAYON)   */}
      {/* ULTRA-SMOOTH GPU-ACCELERATED HARDWARE OPTIMIZED           */}
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
            {/* 1. Golden Amber Atmosphere Wash (GPU Opacity Only, Zero Backdrop Blur) */}
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

            {/* 2. Radiant Golden Radial Aura Burst (Zero CPU Blur, Pure Fast Gradient) */}
            <motion.div
              initial={{ scale: 0.4, rotate: 0, opacity: 0 }}
              animate={{ 
                scale: [0.4, 1.4, 2.4],
                rotate: [0, 40, 80],
                opacity: [0, 0.85, 0]
              }}
              transition={{ 
                times: [0, 0.48, 1],
                duration: 1.7,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="absolute w-[460px] sm:w-[660px] h-[460px] sm:h-[660px] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(254, 240, 138, 0.9) 0%, rgba(217, 119, 6, 0.4) 45%, transparent 70%)',
                willChange: 'transform, opacity'
              }}
            />

            {/* 3. GUNUNGAN KIRI: Meluncur masuk dengan ayunan anggun 60FPS */}
            <motion.div
              initial={{
                x: '-100vw',
                rotate: -20,
                scale: 0.75,
                opacity: 0
              }}
              animate={{
                x: ['-100vw', '-4vw', '0vw', '0vw'],
                rotate: [-20, 8, 0, 0],
                scale: [0.75, 1.1, 1.25, 2.4],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                times: [0, 0.42, 0.68, 1],
                duration: 1.7,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="absolute w-[260px] sm:w-[380px] max-w-[80vw] transform-gpu"
              style={{ willChange: 'transform, opacity' }}
            >
              <img
                src="/templates/jawa/gunungan.png"
                alt="Gunungan Wayang Kiri"
                className="w-full h-auto object-contain"
                loading="eager"
              />
            </motion.div>

            {/* 4. GUNUNGAN KANAN: Meluncur masuk simetris 60FPS */}
            <motion.div
              initial={{
                x: '100vw',
                rotate: 20,
                scale: 0.75,
                opacity: 0
              }}
              animate={{
                x: ['100vw', '4vw', '0vw', '0vw'],
                rotate: [20, -8, 0, 0],
                scale: [0.75, 1.1, 1.25, 2.4],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                times: [0, 0.42, 0.68, 1],
                duration: 1.7,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="absolute w-[260px] sm:w-[380px] max-w-[80vw] transform-gpu"
              style={{ willChange: 'transform, opacity' }}
            >
              <img
                src="/templates/jawa/gunungan.png"
                alt="Gunungan Wayang Kanan"
                className="w-full h-auto object-contain scale-x-[-1]"
                loading="eager"
              />
            </motion.div>

            {/* 5. EMBLEM BEDHOL KAYON DI TENGAH */}
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
              className="absolute z-20 text-center px-6 py-3 bg-[#FAF8F5] border-2 border-[#1C1917] rounded-3xl shadow-hard-lg"
              style={{ willChange: 'transform, opacity' }}
            >
              <span className="font-mono text-[10px] tracking-widest text-amber-900 font-extrabold uppercase block mb-0.5">
                ✦ BEDHOL KAYON ✦
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] leading-tight">
                Pawiwahan Ageng
              </h2>
              <p className="font-serif italic text-xs text-stone-700">
                Membuka Lembaran Suci Juwita & Seno
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* 5. COVER STATE: SAMPUL UNDANGAN DENGAN 3D WAX SEAL        */}
      {/* ========================================================= */}
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div 
            key="cover-sheet"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -45, scale: 0.94 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-30 w-full max-w-md px-4 flex items-center justify-center min-h-[85vh]"
          >
            {/* KOTAK KARTU SAMPUL BESAR BERGAYA ARSITEKTUR KERATON (MATCHING REFERENSI BENNY & DINDA) */}
            <div className="relative w-full max-w-[390px] sm:max-w-[430px] border-3 sm:border-4 border-[#1C1917] rounded-3xl sm:rounded-[44px] p-5 sm:p-7 text-center shadow-hard-xl overflow-hidden bg-[#FAF6F0] ring-2 ring-amber-400/50">
              
              {/* INNER ANIMATED BACKGROUND WITH JAVANESE JOGLO, TREES & FLOWERS */}
              <motion.div
                className="absolute inset-0 w-full h-full bg-cover bg-bottom pointer-events-none z-0"
                style={{
                  backgroundImage: `url('/templates/jawa/cover-bg.jpg')`,
                  filter: 'contrast(1.02) brightness(0.98)',
                }}
                animate={{
                  scale: [1, 1.04, 1],
                  x: mouseOffset.x * 0.7,
                  y: mouseOffset.y * 0.7,
                }}
                transition={{
                  scale: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
                  x: { type: 'spring', damping: 20, stiffness: 120 },
                  y: { type: 'spring', damping: 20, stiffness: 120 },
                }}
              />

              {/* AMBIENT WARM MIST TINT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0]/85 via-[#FAF6F0]/50 to-[#FAF6F0]/90 pointer-events-none z-0" />

              {/* SHIMMER LIGHT SWEEP */}
              <motion.div 
                className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
                style={{
                  background: 'linear-gradient(105deg, transparent 20%, rgba(254, 240, 138, 0.4) 50%, transparent 80%)',
                }}
                animate={{ x: ['-150%', '150%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 }}
              />

              {/* KONTEN PORTAL ARSITEKTUR UTAMA (HERO ARCH CARD) */}
              <div className="relative z-10 flex flex-col items-center">
                
                {/* ORNATE STEPPED ARCH BADGE */}
                <div className="relative w-full border-2 border-[#8C6D46]/80 rounded-[28px] p-4 sm:p-5 bg-[#FAF6F0]/92 backdrop-blur-xs shadow-xs mb-3.5">
                  
                  {/* Decorative Double Hairline Border Accent */}
                  <div className="absolute inset-1.5 border border-[#8C6D46]/35 rounded-[22px] pointer-events-none" />

                  {/* Top Crown Emblem / Gunungan Wax Accent */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border border-[#1C1917] shadow-xs flex items-center justify-center mx-auto mb-2 p-1.5">
                    <img 
                      src="/templates/jawa/gunungan.png" 
                      alt="Gunungan" 
                      className="w-full h-full object-contain filter drop-shadow-xs" 
                    />
                  </div>

                  {/* THE WEDDING OF */}
                  <span className="font-serif text-[11px] sm:text-xs font-semibold tracking-[0.28em] text-[#8C6D46] uppercase block mb-3">
                    THE WEDDING OF
                  </span>

                  {/* HERO DOME ARCH COUPLE PORTRAIT */}
                  <div className="relative mx-auto w-44 sm:w-52 aspect-[3/4.2] rounded-t-[110px] sm:rounded-t-[130px] rounded-b-md border-3 border-[#2C1810] overflow-hidden shadow-hard-sm bg-[#2C1810]">
                    <img 
                      src={heroImage}
                      alt={coupleTitle}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" 
                    />
                    {/* Subtle Inner Warm Golden Aura Rim */}
                    <div className="absolute inset-0 ring-1 ring-inset ring-amber-300/40 pointer-events-none rounded-t-[110px] sm:rounded-t-[130px]" />
                  </div>

                  {/* COUPLE TITLE & DATE */}
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-wider mt-3.5 mb-1 leading-tight">
                    {coupleTitle}
                  </h1>
                  <p className="font-serif text-[11px] sm:text-xs font-semibold text-[#8C6D46] tracking-[0.18em] uppercase">
                    {weddingDate}
                  </p>
                </div>

                {/* Recipient Glassmorphic Box */}
                <div className="w-full p-3.5 rounded-2xl bg-white/92 backdrop-blur-md border-2 border-[#1C1917] shadow-hard-sm mb-3.5 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-amber-200/40 rounded-full blur-xl pointer-events-none" />
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

                {/* Open Button with Shimmer & 3D Press */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleOpenInvitation}
                  className="w-full py-3.5 text-sm font-bold bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:to-amber-600 text-white border-2 border-[#1C1917] rounded-2xl shadow-hard btn-pressable flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span>Buka Lembaran Undangan</span>
                </motion.button>

                <p className="mt-2.5 text-[10px] sm:text-[11px] text-stone-700 font-medium bg-white/70 backdrop-blur-xs py-0.5 px-3 rounded-full inline-block border border-stone-800/20">
                  Ketuk untuk membuka lembaran resmi & memutar musik
                </p>
              </div>

            </div>
          </motion.div>
        ) : (
          /* =================================================================== */
          /* 6. SATU LEMBAR UNDANGAN MEWAH & TIDAK DATAR (ARCHITECTURAL PARCHMENT) */
          /* =================================================================== */
          <motion.div 
            key="invitation-single-sheet"
            initial={{ opacity: 0, scale: 0.93, y: 35 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 35 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-30 w-full max-w-lg px-3 sm:px-4 my-2"
          >
            {/* SATU LEMBAR FISIK DENGAN BINGKAI PARCHMENT ANIMASI */}
            <div className="relative w-full border-3 sm:border-4 border-[#1C1917] rounded-3xl sm:rounded-[44px] p-4 sm:p-7 shadow-hard-xl overflow-hidden bg-[#FAF8F5] ring-2 ring-amber-400/50">
              
              {/* INNER ANIMATED PARCHMENT BACKGROUND */}
              <motion.div
                className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none z-0"
                style={{
                  backgroundImage: `url('/templates/jawa/bg-parchment.png')`,
                  filter: 'contrast(1.05) brightness(0.98)',
                }}
                animate={{
                  scale: [1, 1.05, 1],
                  x: mouseOffset.x * 0.7,
                  y: mouseOffset.y * 0.7,
                }}
                transition={{
                  scale: { duration: 22, repeat: Infinity, ease: 'easeInOut' },
                  x: { type: 'spring', damping: 25, stiffness: 100 },
                  y: { type: 'spring', damping: 25, stiffness: 100 },
                }}
              />

              {/* INNER GOLDEN SHIMMER SWEEP */}
              <motion.div 
                className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
                style={{
                  background: 'linear-gradient(105deg, transparent 20%, rgba(254, 240, 138, 0.4) 50%, transparent 80%)',
                }}
                animate={{ x: ['-150%', '150%'] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', repeatDelay: 4 }}
              />

              <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-amber-950/25 pointer-events-none z-0" />

              {/* ======================================================== */}
              {/* ISI KONTEN LENGKAP DENGAN STAGGERED MOTION REVEALS       */}
              {/* ======================================================== */}
              <div className="relative z-10 space-y-6 text-center">

                {/* ---------------------------------------------------- */}
                {/* SECTION 1: KOP KERATON & WALIMATUL 'URSY              */}
                {/* ---------------------------------------------------- */}
                <motion.div 
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="bg-gradient-to-b from-[#FEF3C7]/95 via-[#FFFBEB]/95 to-[#FEF3C7]/95 border-2 border-[#1C1917] rounded-3xl p-5 shadow-hard-sm relative overflow-hidden ring-1 ring-amber-400/40"
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />
                  
                  {/* Ornate Golden Gunungan Royal Seal */}
                  <motion.div 
                    animate={{ rotate: [-2, 2, -2], scale: [1, 1.05, 1] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-[#1C1917] shadow-hard-sm flex items-center justify-center mx-auto mb-2.5 p-2"
                  >
                    <img 
                      src="/templates/jawa/gunungan.png" 
                      alt="Ornate Golden Gunungan Seal" 
                      className="w-full h-full object-contain filter drop-shadow-xs" 
                    />
                  </motion.div>
                  
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-950 bg-amber-200 border border-[#1C1917] px-4 py-1 rounded-full inline-block mb-2 shadow-xs">
                    WALIMATUL 'URSY
                  </span>
                  
                  <h3 className="font-serif italic text-lg sm:text-xl text-stone-900 font-bold tracking-wide">
                    Bismillahirrohmanirrohim
                  </h3>
                  
                  <div className="w-16 h-0.5 bg-[#1C1917] mx-auto my-2 rounded-full" />

                  <p className="text-xs text-stone-700 max-w-sm mx-auto leading-relaxed font-medium">
                    Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Dengan memohon ridho dan rahmat-Nya, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri pernikahan kami:
                  </p>
                </motion.div>

                {/* ---------------------------------------------------- */}
                {/* SECTION 2: THE COUPLE (PORTRAIT ARCH MEDALLIONS)     */}
                {/* ---------------------------------------------------- */}
                <motion.div 
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="bg-[#FDF2F8]/95 border-2 border-[#1C1917] rounded-3xl p-4 sm:p-6 shadow-hard-sm text-left space-y-4 ring-1 ring-rose-300"
                >
                  <div className="text-center">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-rose-950 bg-rose-200 border border-[#1C1917] px-3 py-0.5 rounded-full shadow-xs">
                      THE COUPLE
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#1C1917] mt-1">
                      Kedua Mempelai
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Mempelai Wanita */}
                    <motion.div 
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="bg-white border-2 border-[#1C1917] rounded-3xl p-4 shadow-hard-sm flex flex-col items-center text-center relative overflow-hidden group"
                    >
                      <div className="absolute top-2 right-2 px-2 py-0.5 bg-rose-100 border border-[#1C1917] rounded-full text-[9px] font-mono font-bold text-rose-800">
                        Mempelai Wanita
                      </div>
                      
                      {/* Dome / Arch Shaped Portrait Frame */}
                      <div className="w-28 h-38 rounded-t-full rounded-b-2xl border-2 border-[#1C1917] shadow-hard-sm overflow-hidden mb-3 bg-stone-100 ring-2 ring-rose-300">
                        <img 
                          src="/templates/jawa/photos/bride.jpg" 
                          alt="Juwita Sukma" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      
                      <h4 className="font-serif font-bold text-lg text-[#1C1917] leading-tight">
                        Juwita Sukma, S.Pd
                      </h4>
                      <p className="text-[11px] text-stone-600 my-1.5 leading-snug">
                        Putri Pertama dari Bpk. Bastian Edy <span className="italic text-stone-500">(Alm.)</span> & Ibu Romadona Noverina
                      </p>
                      
                      <a 
                        href="https://instagram.com" 
                        target="_blank" 
                        rel="noreferrer"
                        className="mt-auto inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 border border-[#1C1917] rounded-xl text-[10px] font-bold shadow-xs btn-pressable text-rose-900"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        <span>@juwitasukma</span>
                      </a>
                    </motion.div>

                    {/* Mempelai Pria */}
                    <motion.div 
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="bg-white border-2 border-[#1C1917] rounded-3xl p-4 shadow-hard-sm flex flex-col items-center text-center relative overflow-hidden group"
                    >
                      <div className="absolute top-2 right-2 px-2 py-0.5 bg-amber-100 border border-[#1C1917] rounded-full text-[9px] font-mono font-bold text-amber-900">
                        Mempelai Pria
                      </div>

                      {/* Dome / Arch Shaped Portrait Frame */}
                      <div className="w-28 h-38 rounded-t-full rounded-b-2xl border-2 border-[#1C1917] shadow-hard-sm overflow-hidden mb-3 bg-stone-100 ring-2 ring-amber-300">
                        <img 
                          src="/templates/jawa/photos/groom.jpg" 
                          alt="Seno Pratama" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <h4 className="font-serif font-bold text-lg text-[#1C1917] leading-tight">
                        Seno Pratama, S.Pd
                      </h4>
                      <p className="text-[11px] text-stone-600 my-1.5 leading-snug">
                        Putra Pertama dari Bpk. Bastian Edy <span className="italic text-stone-500">(Alm.)</span> & Ibu Romadona Noverina
                      </p>

                      <a 
                        href="https://instagram.com" 
                        target="_blank" 
                        rel="noreferrer"
                        className="mt-auto inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-[#1C1917] rounded-xl text-[10px] font-bold shadow-xs btn-pressable text-amber-950"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        <span>@senopratama</span>
                      </a>
                    </motion.div>
                  </div>
                </motion.div>

                {/* ---------------------------------------------------- */}
                {/* SECTION 3: KUTIPAN SUCI (ILLUMINATED MANUSCRIPT)     */}
                {/* ---------------------------------------------------- */}
                <motion.div 
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="bg-[#FAF5EE]/95 border-2 border-[#1C1917] rounded-3xl p-5 shadow-hard-sm text-center relative overflow-hidden"
                >
                  <div className="text-amber-800 text-xl mb-1">❦ ❧</div>
                  <p className="text-xs sm:text-sm text-stone-800 leading-relaxed italic font-serif max-w-sm mx-auto">
                    "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang."
                  </p>
                  <div className="font-mono text-[10px] font-bold text-amber-950 mt-2.5 inline-block px-3.5 py-1 bg-amber-100 border border-[#1C1917] rounded-full shadow-xs">
                    QS. Ar-Rum: 21
                  </div>
                </motion.div>

                {/* ---------------------------------------------------- */}
                {/* SECTION 4: RANGKAIAN ACARA (PERFORATED ROYAL TICKETS)*/}
                {/* ---------------------------------------------------- */}
                <motion.div 
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="bg-[#F0FDF4]/95 border-2 border-[#1C1917] rounded-3xl p-4 sm:p-6 shadow-hard-sm text-left space-y-4 ring-1 ring-emerald-300"
                >
                  <div className="flex items-center justify-between border-b-2 border-dashed border-emerald-300 pb-2.5">
                    <div>
                      <span className="font-serif font-bold text-xl text-[#1C1917] block">Rangkaian Acara</span>
                      <span className="text-[11px] text-emerald-800 font-medium">Akad Nikah & Walimah Resepsi</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-emerald-200 border border-[#1C1917] px-3 py-1 rounded-full shadow-xs">
                      Minggu, 27 Sep 2026
                    </span>
                  </div>

                  {/* Akad Nikah Pass */}
                  <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-4 shadow-hard-sm relative overflow-hidden">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-white font-bold text-base flex items-center justify-center border-2 border-[#1C1917] shrink-0 shadow-xs">
                        1
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h5 className="font-serif font-bold text-base text-[#1C1917]">Akad Nikah</h5>
                          <span className="px-2 py-0.5 bg-amber-100 border border-[#1C1917] rounded text-[10px] font-mono font-bold text-amber-900">
                            Pukul 08.00 WIB
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 mt-1 font-medium">Kediaman Mempelai Wanita</p>
                        <p className="text-[11px] text-stone-500">Jl. Pendeta J Wismar Saragih No. 6A, Siantar Utara</p>
                      </div>
                    </div>
                  </div>

                  {/* Resepsi Pass */}
                  <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-4 shadow-hard-sm relative overflow-hidden">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white font-bold text-base flex items-center justify-center border-2 border-[#1C1917] shrink-0 shadow-xs">
                        2
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h5 className="font-serif font-bold text-base text-[#1C1917]">Resepsi Pernikahan</h5>
                          <span className="px-2 py-0.5 bg-emerald-100 border border-[#1C1917] rounded text-[10px] font-mono font-bold text-emerald-900">
                            Pukul 11.00 WIB
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 mt-1 font-medium">Kediaman Mempelai Wanita</p>
                        <p className="text-[11px] text-stone-500">Jl. Pendeta J Wismar Saragih No. 6A, Siantar Utara</p>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <a 
                      href="https://maps.google.com" 
                      target="_blank" 
                      rel="noreferrer"
                      className="py-3 px-3 bg-white hover:bg-stone-50 border-2 border-[#1C1917] rounded-xl text-xs font-bold shadow-hard-sm btn-pressable flex items-center justify-center gap-2 group"
                    >
                      <MapPin className="w-4 h-4 text-emerald-700 group-hover:scale-110 transition-transform" />
                      <span>Petunjuk Arah (Google Maps)</span>
                    </a>
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noreferrer"
                      className="py-3 px-3 bg-white hover:bg-stone-50 border-2 border-[#1C1917] rounded-xl text-xs font-bold shadow-hard-sm btn-pressable flex items-center justify-center gap-2 text-rose-700 group"
                    >
                      <Video className="w-4 h-4 text-rose-600 group-hover:scale-110 transition-transform" />
                      <span>Live Streaming Instagram</span>
                    </a>
                  </div>
                </motion.div>

                {/* ---------------------------------------------------- */}
                {/* SECTION 5: HITUNG MUNDUR (TACTILE 3D CUBES)          */}
                {/* ---------------------------------------------------- */}
                <motion.div 
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="bg-[#FEF3C7]/95 border-2 border-[#1C1917] rounded-3xl p-5 shadow-hard-sm"
                >
                  <span className="text-[11px] font-mono font-bold tracking-widest text-amber-950 uppercase block mb-2.5">
                    MENGHITUNG HARI MENUJU AKAD
                  </span>
                  <div className="grid grid-cols-4 gap-2.5 font-mono">
                    <div className="bg-white border-2 border-[#1C1917] p-2.5 rounded-2xl text-center shadow-hard-sm">
                      <div className="text-2xl font-black text-[#1C1917]">359</div>
                      <div className="text-[10px] uppercase text-stone-500 font-bold">Hari</div>
                    </div>
                    <div className="bg-white border-2 border-[#1C1917] p-2.5 rounded-2xl text-center shadow-hard-sm">
                      <div className="text-2xl font-black text-[#1C1917]">14</div>
                      <div className="text-[10px] uppercase text-stone-500 font-bold">Jam</div>
                    </div>
                    <div className="bg-white border-2 border-[#1C1917] p-2.5 rounded-2xl text-center shadow-hard-sm">
                      <div className="text-2xl font-black text-[#1C1917]">20</div>
                      <div className="text-[10px] uppercase text-stone-500 font-bold">Menit</div>
                    </div>
                    <div className="bg-white border-2 border-[#1C1917] p-2.5 rounded-2xl text-center shadow-hard-sm">
                      <div className="text-2xl font-black text-[#1C1917]">45</div>
                      <div className="text-[10px] uppercase text-stone-500 font-bold">Detik</div>
                    </div>
                  </div>
                </motion.div>

                {/* ---------------------------------------------------- */}
                {/* SECTION 6: WEDDING GALLERY (POLAROID STACKS W/ TILT) */}
                {/* ---------------------------------------------------- */}
                <motion.div 
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="bg-[#F5F3FF]/95 border-2 border-[#1C1917] rounded-3xl p-5 shadow-hard-sm space-y-3.5 ring-1 ring-purple-300"
                >
                  <div className="text-center">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-purple-950 bg-purple-200 border border-[#1C1917] px-3.5 py-0.5 rounded-full shadow-xs">
                      WEDDING GALLERY
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#1C1917] mt-1">
                      Momen Bahagia Kami
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 pt-1">
                    {/* Polaroid 1 */}
                    <motion.div 
                      whileHover={{ scale: 1.08, rotate: 0, zIndex: 10 }}
                      className="aspect-[3/4] rounded-2xl border-2 border-[#1C1917] shadow-hard-sm overflow-hidden bg-white p-1 -rotate-2 cursor-pointer transition-shadow"
                    >
                      <img 
                        src="/templates/jawa/photos/prewed-1.jpg" 
                        alt="Prewedding 1"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </motion.div>
                    
                    {/* Polaroid 2 */}
                    <motion.div 
                      whileHover={{ scale: 1.08, rotate: 0, zIndex: 10 }}
                      className="aspect-[3/4] rounded-2xl border-2 border-[#1C1917] shadow-hard-sm overflow-hidden bg-white p-1 rotate-1 cursor-pointer transition-shadow"
                    >
                      <img 
                        src="/templates/jawa/photos/prewed-2.jpg" 
                        alt="Prewedding 2"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </motion.div>

                    {/* Polaroid 3 */}
                    <motion.div 
                      whileHover={{ scale: 1.08, rotate: 0, zIndex: 10 }}
                      className="aspect-[3/4] rounded-2xl border-2 border-[#1C1917] shadow-hard-sm overflow-hidden bg-white p-1 -rotate-1 cursor-pointer transition-shadow"
                    >
                      <img 
                        src="/templates/jawa/photos/prewed-3.jpg" 
                        alt="Prewedding 3"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </motion.div>
                  </div>
                  <p className="text-[11px] text-stone-500 italic text-center font-serif">
                    "Dalam setiap tatapan, terukir janji suci yang kekal."
                  </p>
                </motion.div>

                {/* ---------------------------------------------------- */}
                {/* SECTION 7: LOVE STORY (INTERACTIVE GOLDEN TIMELINE)  */}
                {/* ---------------------------------------------------- */}
                <motion.div 
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="bg-[#FFFBEB]/95 border-2 border-[#1C1917] rounded-3xl p-5 shadow-hard-sm text-left space-y-4 ring-1 ring-amber-300"
                >
                  <div className="text-center">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-950 bg-amber-200 border border-[#1C1917] px-3.5 py-0.5 rounded-full shadow-xs">
                      LOVE STORY
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#1C1917] mt-1">
                      Kisah Perjalanan Cinta
                    </h3>
                  </div>

                  <div className="relative pl-6 space-y-3.5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#1C1917]">
                    
                    {/* Chapter 1 */}
                    <motion.div 
                      whileHover={{ x: 4 }}
                      className="bg-white border-2 border-[#1C1917] rounded-2xl p-3.5 shadow-hard-sm flex gap-3 items-center relative"
                    >
                      <div className="absolute -left-6.5 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-[#1C1917] ring-2 ring-white" />
                      <img 
                        src="/templates/jawa/photos/story-1.jpg" 
                        alt="Awal Bertemu" 
                        className="w-18 h-18 rounded-xl object-cover border border-[#1C1917] shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[9px] font-mono font-bold bg-amber-200 border border-[#1C1917] px-1.5 py-0.2 rounded">2022</span>
                          <span className="font-serif font-bold text-base text-[#1C1917]">Awal Bertemu</span>
                        </div>
                        <p className="text-[11px] text-stone-600 leading-snug">
                          Pertama kali kami berjumpa di Yogyakarta. Dari obrolan hangat tumbuh rasa saling mengagumi dan seirama.
                        </p>
                      </div>
                    </motion.div>

                    {/* Chapter 2 */}
                    <motion.div 
                      whileHover={{ x: 4 }}
                      className="bg-white border-2 border-[#1C1917] rounded-2xl p-3.5 shadow-hard-sm flex gap-3 items-center relative"
                    >
                      <div className="absolute -left-6.5 w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-[#1C1917] ring-2 ring-white" />
                      <img 
                        src="/templates/jawa/photos/story-2.jpg" 
                        alt="Lamaran" 
                        className="w-18 h-18 rounded-xl object-cover border border-[#1C1917] shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[9px] font-mono font-bold bg-amber-200 border border-[#1C1917] px-1.5 py-0.2 rounded">2025</span>
                          <span className="font-serif font-bold text-base text-[#1C1917]">Lamaran Resmi</span>
                        </div>
                        <p className="text-[11px] text-stone-600 leading-snug">
                          Di hadapan kedua keluarga besar, kami mengikat janji suci dan memantapkan langkah menuju bahtera rumah tangga.
                        </p>
                      </div>
                    </motion.div>

                    {/* Chapter 3 */}
                    <motion.div 
                      whileHover={{ x: 4 }}
                      className="bg-white border-2 border-[#1C1917] rounded-2xl p-3.5 shadow-hard-sm flex gap-3 items-center relative"
                    >
                      <div className="absolute -left-6.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#1C1917] ring-2 ring-white" />
                      <img 
                        src="/templates/jawa/photos/story-3.jpg" 
                        alt="Menuju Pelaminan" 
                        className="w-18 h-18 rounded-xl object-cover border border-[#1C1917] shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[9px] font-mono font-bold bg-emerald-200 border border-[#1C1917] px-1.5 py-0.2 rounded">2026</span>
                          <span className="font-serif font-bold text-base text-[#1C1917]">Menuju Pelaminan</span>
                        </div>
                        <p className="text-[11px] text-stone-600 leading-snug">
                          Kini kami siap menyatukan dua takdir dalam ikatan pernikahan kudus yang insya Allah kekal abadi.
                        </p>
                      </div>
                    </motion.div>

                  </div>
                </motion.div>

                {/* ---------------------------------------------------- */}
                {/* SECTION 8: TANDA KASIH (METALLIC GOLD BANK PASSES)   */}
                {/* ---------------------------------------------------- */}
                <motion.div 
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="bg-[#EFF6FF]/95 border-2 border-[#1C1917] rounded-3xl p-5 shadow-hard-sm text-left space-y-3.5 ring-1 ring-blue-300"
                >
                  <div className="text-center pb-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-950 bg-blue-200 border border-[#1C1917] px-3.5 py-0.5 rounded-full shadow-xs">
                      WEDDING GIFT
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#1C1917] mt-1">
                      Tanda Kasih Digital
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 max-w-xs mx-auto text-center font-medium">
                      Doa restu Anda adalah karunia terindah bagi kami. Namun jika Anda berkenan memberikan tanda kasih, dapat melalui:
                    </p>
                  </div>

                  {/* Rekening 1: BCA */}
                  <div className="bg-gradient-to-r from-white to-blue-50/60 border-2 border-[#1C1917] rounded-2xl p-4 shadow-hard-sm flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold bg-blue-100 border border-[#1C1917] px-2 py-0.5 rounded">BANK BCA</span>
                        <span className="text-xs text-stone-600 font-semibold">a.n Juwita Sukma</span>
                      </div>
                      <div className="font-mono text-lg font-black text-[#1C1917] mt-1 tracking-wider">5371 8291 02</div>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.92 }}
                      onClick={() => handleCopy('5371829102', 'bca')}
                      className="px-3.5 py-2 bg-[#FEF3C7] hover:bg-amber-200 border-2 border-[#1C1917] rounded-xl text-xs font-bold shadow-xs btn-pressable flex items-center gap-1.5"
                    >
                      {copiedBank === 'bca' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedBank === 'bca' ? 'Tersalin' : 'Salin'}</span>
                    </motion.button>
                  </div>

                  {/* Rekening 2: Mandiri */}
                  <div className="bg-gradient-to-r from-white to-blue-50/60 border-2 border-[#1C1917] rounded-2xl p-4 shadow-hard-sm flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold bg-blue-100 border border-[#1C1917] px-2 py-0.5 rounded">BANK MANDIRI</span>
                        <span className="text-xs text-stone-600 font-semibold">a.n Seno Pratama</span>
                      </div>
                      <div className="font-mono text-lg font-black text-[#1C1917] mt-1 tracking-wider">1370 0192 8391</div>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.92 }}
                      onClick={() => handleCopy('137001928391', 'mandiri')}
                      className="px-3.5 py-2 bg-[#FEF3C7] hover:bg-amber-200 border-2 border-[#1C1917] rounded-xl text-xs font-bold shadow-xs btn-pressable flex items-center gap-1.5"
                    >
                      {copiedBank === 'mandiri' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedBank === 'mandiri' ? 'Tersalin' : 'Salin'}</span>
                    </motion.button>
                  </div>
                </motion.div>

                {/* ---------------------------------------------------- */}
                {/* SECTION 9: RSVP & WISHES (VIBRANT INTERACTIVE LEDGER)*/}
                {/* ---------------------------------------------------- */}
                <motion.div 
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="bg-white/95 border-2 border-[#1C1917] rounded-3xl p-5 sm:p-6 shadow-hard-sm text-left space-y-4"
                >
                  <div className="text-center">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-900 bg-stone-100 border border-[#1C1917] px-3.5 py-0.5 rounded-full shadow-xs">
                      RSVP & WISHES
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#1C1917] mt-1">
                      Konfirmasi & Doa Restu
                    </h3>
                  </div>

                  <form onSubmit={handleSubmitWish} className="space-y-3.5">
                    <div>
                      <label className="text-xs font-bold text-stone-800 block mb-1">
                        Nama Lengkap Anda
                      </label>
                      <input 
                        type="text" 
                        value={rsvpName}
                        onChange={(e) => setRsvpName(e.target.value)}
                        placeholder="Tuliskan nama Anda"
                        className="w-full text-xs p-3 rounded-xl border-2 border-[#1C1917] bg-stone-50/50 shadow-xs focus:bg-white focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-800 block mb-1">
                        Konfirmasi Kehadiran
                      </label>
                      <div className="grid grid-cols-3 gap-1.5 text-[11px] font-bold">
                        <button
                          type="button"
                          onClick={() => setRsvpStatus('hadir')}
                          className={`py-2.5 px-1 rounded-xl border-2 border-[#1C1917] text-center transition-all ${
                            rsvpStatus === 'hadir' ? 'bg-emerald-300 font-black shadow-hard-sm translate-y-0.5' : 'bg-white text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          ✓ Hadir
                        </button>
                        <button
                          type="button"
                          onClick={() => setRsvpStatus('ragu')}
                          className={`py-2.5 px-1 rounded-xl border-2 border-[#1C1917] text-center transition-all ${
                            rsvpStatus === 'ragu' ? 'bg-amber-300 font-black shadow-hard-sm translate-y-0.5' : 'bg-white text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          ? Ragu
                        </button>
                        <button
                          type="button"
                          onClick={() => setRsvpStatus('tidak_hadir')}
                          className={`py-2.5 px-1 rounded-xl border-2 border-[#1C1917] text-center transition-all ${
                            rsvpStatus === 'tidak_hadir' ? 'bg-rose-300 font-black shadow-hard-sm translate-y-0.5' : 'bg-white text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          ✕ Berhalangan
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-800 block mb-1">
                        Untaian Doa & Ucapan
                      </label>
                      <textarea 
                        rows={3}
                        value={rsvpMessage}
                        onChange={(e) => setRsvpMessage(e.target.value)}
                        placeholder="Tuliskan ucapan selamat dan doa tulus untuk mempelai..."
                        className="w-full text-xs p-3 rounded-xl border-2 border-[#1C1917] bg-stone-50/50 shadow-xs focus:bg-white focus:outline-none"
                        required
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs border-2 border-[#1C1917] rounded-xl shadow-hard-sm btn-pressable flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Kirimkan Doa Restu</span>
                    </motion.button>
                  </form>

                  {/* Wishes Feed */}
                  <div className="pt-3 border-t-2 border-stone-100 space-y-2.5 max-h-52 overflow-y-auto pr-1">
                    <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block">
                      Untaian Doa Terkini ({wishes.length}):
                    </span>
                    {wishes.map((w) => (
                      <div key={w.id} className="p-3 rounded-2xl bg-amber-50/60 border border-stone-200 text-xs shadow-2xs">
                        <div className="flex items-center justify-between font-bold text-[#1C1917] mb-1">
                          <span className="text-sm font-serif">{w.sender}</span>
                          <span className="text-[10px] font-normal text-stone-500">{w.time}</span>
                        </div>
                        <p className="text-stone-700 italic text-[11px] leading-relaxed">"{w.message}"</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* ---------------------------------------------------- */}
                {/* SECTION 10: PENUTUP DENGAN HANGAT & KELUARGA BESAR   */}
                {/* ---------------------------------------------------- */}
                <motion.div 
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="bg-gradient-to-b from-[#FFFBEB]/95 to-[#FEF3C7]/95 border-2 border-[#1C1917] rounded-3xl p-6 shadow-hard-sm space-y-3"
                >
                  <p className="text-xs text-stone-700 leading-relaxed font-medium">
                    Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu kepada kami berdua.
                  </p>
                  
                  <div className="py-1">
                    <p className="font-serif italic text-sm text-stone-600">Kami yang berbahagia,</p>
                    <h4 className="font-serif text-2xl text-amber-950 font-bold my-0.5">
                      Juwita & Seno
                    </h4>
                    <p className="text-xs font-sans text-stone-600">
                      beserta seluruh keluarga besar kedua mempelai
                    </p>
                  </div>
                  
                  <div className="pt-2">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsOpen(false);
                        setIsGununganActive(false);
                      }}
                      className="w-full py-3 bg-white hover:bg-stone-50 text-stone-900 border-2 border-[#1C1917] rounded-xl text-xs font-bold shadow-hard-sm btn-pressable flex items-center justify-center gap-2"
                    >
                      <span>← Tutup Lembaran & Kembali ke Sampul</span>
                    </motion.button>
                  </div>
                </motion.div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
