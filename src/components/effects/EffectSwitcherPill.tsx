'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Sliders, X, Check, RotateCcw } from 'lucide-react';
import { ParticleEffectType } from './FallingParticlesCanvas';
import { BurstEffectType } from './OpeningBurstEffect';

interface EffectSwitcherPillProps {
  particleType: ParticleEffectType;
  onSelectParticle: (type: ParticleEffectType) => void;
  burstType: BurstEffectType;
  onSelectBurst: (type: BurstEffectType) => void;
  onResetInvitation?: () => void;
  isInvitationOpen?: boolean;
}

const PARTICLE_OPTIONS: Array<{ id: ParticleEffectType; label: string; icon: string }> = [
  { id: 'pink_blossoms', label: 'Kelopak Pink (Default)', icon: '🌸' },
  { id: 'leaves', label: 'Daun Hijau', icon: '🍃' },
  { id: 'butterflies', label: 'Kupu Emas', icon: '🦋' },
  { id: 'jasmine', label: 'Melati Klasik', icon: '🌼' },
  { id: 'none', label: 'Matikan', icon: '❌' },
];

const BURST_OPTIONS: Array<{ id: BurstEffectType; label: string; icon: string }> = [
  { id: 'gold_butterflies', label: 'Kupu-Kupu Emas (Default)', icon: '🦋' },
  { id: 'pink_blossoms', label: 'Kelopak Bunga Pink', icon: '🌸' },
  { id: 'leaves', label: 'Hamburan Daun Hijau', icon: '🍃' },
  { id: 'classic_confetti', label: 'Konfeti Klasik', icon: '🎉' },
  { id: 'none', label: 'Tanpa Hamburan', icon: '❌' },
];

export default function EffectSwitcherPill({
  particleType,
  onSelectParticle,
  burstType,
  onSelectBurst,
  onResetInvitation,
  isInvitationOpen,
}: EffectSwitcherPillProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Pill Trigger (Fixed at bottom-left) */}
      <motion.button
        suppressHydrationWarning
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 left-5 z-50 flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#FFFDF7]/95 hover:bg-white text-[#2A180E] border-2 border-[#B58A45] shadow-[0_4px_16px_rgba(28,25,23,0.18)] backdrop-blur-md text-xs font-bold cursor-pointer transition-all duration-200 ring-2 ring-amber-400/20"
        title="Ubah Pilihan Efek Animasi"
      >
        <Sliders className="w-3.5 h-3.5 text-[#B58A45]" />
        <span className="hidden sm:inline">Pilihan Efek:</span>
        <span className="text-[#9A3412] font-semibold">
          {PARTICLE_OPTIONS.find((o) => o.id === particleType)?.icon || '🌸'} +{' '}
          {BURST_OPTIONS.find((o) => o.id === burstType)?.icon || '🦋'}
        </span>
      </motion.button>

      {/* Popover Settings Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-start sm:justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-xs">
            {/* Backdrop click dismiss */}
            <div 
              className="absolute inset-0"
              onClick={() => setIsOpen(false)} 
            />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative w-full max-w-sm rounded-2xl bg-[#FFFDF9] border-2 border-[#1C1917] p-5 shadow-2xl text-[#1C1917] z-10 max-h-[85vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-900/15">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <h3 className="font-serif font-bold text-base text-[#1C1917]">
                    Kustomisasi Efek Visual
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-stone-100 text-stone-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* SECTION 1: Partikel Berguguran */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  1. Efek Berguguran di Layar
                </label>
                <div className="grid grid-cols-1 gap-1.5">
                  {PARTICLE_OPTIONS.map((opt) => {
                    const isSelected = particleType === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => onSelectParticle(opt.id)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all ${
                          isSelected
                            ? 'bg-amber-100/90 text-amber-950 border-2 border-amber-600 shadow-xs'
                            : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border border-stone-200'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base">{opt.icon}</span>
                          <span>{opt.label}</span>
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-700" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 2: Hamburan Tombol Buka Undangan */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  2. Hamburan Tombol Buka Undangan
                </label>
                <div className="grid grid-cols-1 gap-1.5">
                  {BURST_OPTIONS.map((opt) => {
                    const isSelected = burstType === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => onSelectBurst(opt.id)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all ${
                          isSelected
                            ? 'bg-amber-100/90 text-amber-950 border-2 border-amber-600 shadow-xs'
                            : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border border-stone-200'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base">{opt.icon}</span>
                          <span>{opt.label}</span>
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-700" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Reset Invitation (To test opening button repeatedly) */}
              {onResetInvitation && (
                <div className="pt-3 border-t border-amber-900/10">
                  <button
                    onClick={() => {
                      onResetInvitation();
                      setIsOpen(false);
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-stone-100 hover:bg-amber-50 text-stone-700 hover:text-amber-900 border border-stone-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Kembali ke Sampul (Uji Tombol Buka)</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
