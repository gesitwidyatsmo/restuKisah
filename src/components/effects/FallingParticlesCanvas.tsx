'use client';

import { useEffect, useRef } from 'react';

export type ParticleEffectType = 'pink_blossoms' | 'leaves' | 'butterflies' | 'jasmine' | 'none';

interface FallingParticlesCanvasProps {
  type?: ParticleEffectType;
  className?: string;
  count?: number;
}

const PARTICLE_IMAGE_PRESETS: Record<Exclude<ParticleEffectType, 'jasmine' | 'none'>, string[]> = {
  pink_blossoms: [
    '/komponent/Pink Blossoms and Gold Butterflies/component_13.webp',
    '/komponent/Pink Blossoms and Gold Butterflies/component_17.webp',
    '/komponent/Pink Blossoms and Gold Butterflies/component_25.webp',
    '/komponent/Watercolor Floral Elements Collection/component_06.webp',
    '/komponent/Watercolor Floral Elements Collection/component_27.webp',
    '/komponent/Watercolor Floral Elements Collection/component_28.webp',
  ],
  leaves: [
    '/komponent/Watercolor Floral Elements Collection/component_20.webp',
    '/komponent/Watercolor Floral Elements Collection/component_21.webp',
    '/komponent/Watercolor Floral Elements Collection/component_22.webp',
    '/komponent/Watercolor Floral Elements Collection/component_24.webp',
    '/komponent/Watercolor Floral Elements Collection/component_26.webp',
  ],
  butterflies: [
    '/komponent/Pink Blossoms and Gold Butterflies/component_03.webp',
    '/komponent/Pink Blossoms and Gold Butterflies/component_05.webp',
    '/komponent/Pink Blossoms and Gold Butterflies/component_20.webp',
    '/komponent/Pink Blossoms and Gold Butterflies/component_24.webp',
  ],
};

interface ParticleItem {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  swayFrequency: number;
  swayAmplitude: number;
  swayPhase: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  opacity: number;
  imageIndex: number;
  isDust: boolean;
}

export default function FallingParticlesCanvas({
  type = 'pink_blossoms',
  className = 'fixed inset-0 w-full h-full pointer-events-none z-10',
  count = 22,
}: FallingParticlesCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (type === 'none') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Preload WebP images for current preset
    const loadedImages: HTMLImageElement[] = [];
    if (type !== 'jasmine') {
      const srcList = PARTICLE_IMAGE_PRESETS[type] || [];
      srcList.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedImages.push(img);
        };
      });
    }

    // Initialize Particles
    const particles: ParticleItem[] = [];
    for (let i = 0; i < count; i++) {
      const isDust = type === 'jasmine' ? (i % 4 === 0) : (i % 6 === 0);
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: type === 'leaves' ? Math.random() * 12 + 20 : Math.random() * 10 + 16,
        speedY: type === 'leaves' ? Math.random() * 0.7 + 0.5 : Math.random() * 0.6 + 0.35,
        speedX: (Math.random() - 0.5) * 0.4,
        swayFrequency: Math.random() * 0.006 + 0.004,
        swayAmplitude: Math.random() * 0.5 + 0.35,
        swayPhase: Math.random() * Math.PI * 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.2,
        flip: Math.random() * Math.PI * 2,
        flipSpeed: Math.random() * 0.025 + 0.015,
        opacity: Math.random() * 0.45 + 0.5,
        imageIndex: i % 6,
        isDust,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Natural falling physics
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * p.swayFrequency + p.swayPhase) * p.swayAmplitude;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        // Reset if offscreen
        if (p.y > height + 30) {
          p.y = -30;
          p.x = Math.random() * width;
        }
        if (p.x < -40) p.x = width + 20;
        if (p.x > width + 40) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        // 1. Shimmering Gold Dust Fleck
        if (p.isDust) {
          ctx.beginPath();
          ctx.arc(0, 0, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(251, 191, 36, ${p.opacity * 0.9})`;
          ctx.shadowColor = 'rgba(245, 158, 11, 0.7)';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.restore();
          return;
        }

        // 2. Real Image Petals/Leaves (with 3D flutter/tumbling scale)
        if (loadedImages.length > 0) {
          const img = loadedImages[p.imageIndex % loadedImages.length];
          const flipScale = Math.cos(p.flip);
          ctx.scale(flipScale, 1);
          ctx.globalAlpha = p.opacity;

          const aspect = img.naturalWidth / (img.naturalHeight || 1);
          const drawW = p.size * (aspect > 1 ? 1 : aspect);
          const drawH = p.size / (aspect > 1 ? aspect : 1);

          ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
        } else if (type === 'jasmine') {
          // Procedural White Jasmine Petal (Classic)
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.45, p.size * 0.85, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 253, 245, ${p.opacity * 0.95})`;
          ctx.shadowColor = 'rgba(217, 119, 6, 0.25)';
          ctx.shadowBlur = 4;
          ctx.fill();

          // Soft yellow-gold petal core
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.16, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 158, 11, ${p.opacity * 0.6})`;
          ctx.fill();
        } else {
          // Procedural fallback while images finish loading
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.5, p.size * 0.8, 0, 0, Math.PI * 2);
          ctx.fillStyle = type === 'leaves' 
            ? `rgba(135, 154, 100, ${p.opacity * 0.85})`
            : `rgba(251, 182, 193, ${p.opacity * 0.85})`;
          ctx.fill();
        }

        ctx.restore();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [type, count]);

  if (type === 'none') return null;

  return <canvas ref={canvasRef} className={className} />;
}
