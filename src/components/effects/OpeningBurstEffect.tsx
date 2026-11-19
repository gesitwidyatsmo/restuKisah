'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export type BurstEffectType = 'gold_butterflies' | 'pink_blossoms' | 'leaves' | 'classic_confetti' | 'none';

interface OpeningBurstEffectProps {
  isActive: boolean;
  type?: BurstEffectType;
  origin?: { x: number; y: number };
  onComplete?: () => void;
}

const BURST_IMAGE_PRESETS: Record<Exclude<BurstEffectType, 'classic_confetti' | 'none'>, string[]> = {
  gold_butterflies: [
    '/komponent/Pink Blossoms and Gold Butterflies/component_03.webp',
    '/komponent/Pink Blossoms and Gold Butterflies/component_05.webp',
    '/komponent/Pink Blossoms and Gold Butterflies/component_20.webp',
    '/komponent/Pink Blossoms and Gold Butterflies/component_24.webp',
  ],
  pink_blossoms: [
    '/komponent/Pink Blossoms and Gold Butterflies/component_13.webp',
    '/komponent/Pink Blossoms and Gold Butterflies/component_17.webp',
    '/komponent/Pink Blossoms and Gold Butterflies/component_25.webp',
    '/komponent/Watercolor Floral Elements Collection/component_06.webp',
    '/komponent/Watercolor Floral Elements Collection/component_27.webp',
  ],
  leaves: [
    '/komponent/Watercolor Floral Elements Collection/component_20.webp',
    '/komponent/Watercolor Floral Elements Collection/component_21.webp',
    '/komponent/Watercolor Floral Elements Collection/component_24.webp',
    '/komponent/Watercolor Floral Elements Collection/component_26.webp',
  ],
};

interface BurstParticle {
  id: number;
  image: string;
  size: number;
  targetX: number;
  targetY: number;
  midX: number;
  midY: number;
  rotate: number;
  delay: number;
  duration: number;
}

export default function OpeningBurstEffect({
  isActive,
  type = 'gold_butterflies',
  origin,
  onComplete,
}: OpeningBurstEffectProps) {
  const [particles, setParticles] = useState<BurstParticle[]>([]);
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    if (!isActive || type === 'none') {
      setIsShowing(false);
      return;
    }

    const clickX = origin?.x ?? (typeof window !== 'undefined' ? window.innerWidth / 2 : 200);
    const clickY = origin?.y ?? (typeof window !== 'undefined' ? window.innerHeight * 0.82 : 500);

    // 1. Trigger Golden Sparkle Confetti in addition to flying elements
    try {
      const normX = Math.min(Math.max(clickX / (window.innerWidth || 1), 0.1), 0.9);
      const normY = Math.min(Math.max(clickY / (window.innerHeight || 1), 0.1), 0.95);

      confetti({
        particleCount: type === 'classic_confetti' ? 90 : 50,
        spread: 80,
        origin: { x: normX, y: normY },
        colors: type === 'pink_blossoms' 
          ? ['#F43F5E', '#FDA4AF', '#FECDD3', '#F472B6', '#FBBF24']
          : type === 'leaves'
          ? ['#65A30D', '#84CC16', '#A3E635', '#FBBF24', '#D97706']
          : ['#D97706', '#F59E0B', '#FDE68A', '#FEF3C7', '#B45309'],
        ticks: 200,
        gravity: 0.8,
      });
    } catch {
      // Fallback if confetti fails
    }

    if (type === 'classic_confetti') {
      if (onComplete) onComplete();
      return;
    }

    // 2. Generate Burst Particles (Butterflies / Petals / Leaves)
    const images = BURST_IMAGE_PRESETS[type] || [];
    if (images.length === 0) return;

    const count = type === 'gold_butterflies' ? 16 : 18;
    const items: BurstParticle[] = [];

    for (let i = 0; i < count; i++) {
      // Angle radiating upwards and outwards (-150deg to -30deg)
      const angle = -Math.PI * 0.85 + Math.random() * Math.PI * 0.7;
      const distance = Math.random() * 420 + 260; // flight distance upwards

      const targetX = Math.cos(angle) * distance * (Math.random() * 0.6 + 0.8);
      const targetY = Math.sin(angle) * distance - Math.random() * 120; // strong upward bias
      const midX = targetX * 0.45 + (Math.random() - 0.5) * 60;
      const midY = targetY * 0.5;

      items.push({
        id: i,
        image: images[i % images.length],
        size: type === 'gold_butterflies' 
          ? Math.random() * 20 + 36   // 36px - 56px butterfly size
          : Math.random() * 14 + 24,  // 24px - 38px petal/leaf size
        targetX,
        targetY,
        midX,
        midY,
        rotate: (Math.random() - 0.5) * 60 + (targetX > 0 ? 20 : -20),
        delay: Math.random() * 0.22,
        duration: Math.random() * 0.5 + 1.8,
      });
    }

    setParticles(items);
    setIsShowing(true);

    const timer = setTimeout(() => {
      setIsShowing(false);
      if (onComplete) onComplete();
    }, 2400);

    return () => clearTimeout(timer);
  }, [isActive, type, origin, onComplete]);

  if (!isShowing || particles.length === 0) return null;

  const clickX = origin?.x ?? (typeof window !== 'undefined' ? window.innerWidth / 2 : 200);
  const clickY = origin?.y ?? (typeof window !== 'undefined' ? window.innerHeight * 0.82 : 500);

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 pointer-events-none z-[75] overflow-hidden select-none"
        aria-hidden="true"
      >
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{
              x: clickX,
              y: clickY,
              scale: 0.2,
              opacity: 0,
              rotate: 0,
            }}
            animate={{
              x: [clickX, clickX + p.midX, clickX + p.targetX],
              y: [clickY, clickY + p.midY, clickY + p.targetY],
              scale: [0.3, 1.05, 1.15, 0.9],
              opacity: [0, 1, 1, 0.85, 0],
              rotate: [0, p.rotate * 0.5, p.rotate],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.size,
              transformOrigin: 'center center',
            }}
          >
            {/* Wing fluttering animation for butterflies */}
            <motion.img
              src={p.image}
              alt="Burst particle"
              animate={type === 'gold_butterflies' ? {
                scaleX: [1, 0.3, 1, 0.35, 1, 0.4, 1],
              } : {
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: type === 'gold_butterflies' ? 0.35 : p.duration,
                repeat: type === 'gold_butterflies' ? Infinity : 0,
                ease: 'easeInOut',
              }}
              className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(217,119,6,0.6)]"
            />
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
}
