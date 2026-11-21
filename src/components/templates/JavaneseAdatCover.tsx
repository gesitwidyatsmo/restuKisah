'use client';

import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import Image from 'next/image';

interface JavaneseAdatCoverProps {
  guestName?: string;
  onOpen?: () => void;
  coupleTitle?: string;
  weddingDate?: string;
  variant?: 'complete' | 'blank';
}

export default function JavaneseAdatCover({
  guestName = 'Yogi & Ratna',
  onOpen,
  coupleTitle = 'Benny & Dinda',
  weddingDate = 'Minggu, 30 September 2026',
  variant = 'complete'
}: JavaneseAdatCoverProps) {
  const coverImageSrc = variant === 'complete' 
    ? '/templates/jawa/cover/cover-adat-jawa-complete.png' 
    : '/templates/jawa/cover/cover-adat-jawa-blank.png';

  return (
    <div className="relative w-full max-w-[430px] mx-auto p-2 sm:p-4 flex flex-col items-center">
      {/* Container Kartu Sampul Adat Jawa */}
      <motion.div 
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full rounded-[32px] sm:rounded-[40px] border-3 sm:border-4 border-[#1C1917] shadow-hard-xl overflow-hidden bg-[#FAF6F0] ring-2 ring-amber-400/50"
      >
        {/* GAMBAR COVER UTAMA HASIL KOMPOSISI ADAT JAWA */}
        <div className="relative w-full aspect-[1086/1448] overflow-hidden bg-[#FAF6F0]">
          <Image
            src={coverImageSrc}
            alt="Cover Undangan Adat Jawa"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 430px"
            className="object-contain object-top select-none pointer-events-none"
          />

          {/* EFEK KILAU AMBER (SHIMMER) */}
          <motion.div 
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{
              background: 'linear-gradient(105deg, transparent 20%, rgba(254, 240, 138, 0.35) 50%, transparent 80%)',
            }}
            animate={{ x: ['-150%', '150%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 }}
          />

          {/* JIKA VARIANT BLANK: TAMPILKAN JUDUL DENGAN TIPOGRAFI WEB DINAMIS */}
          {variant === 'blank' && (
            <div className="absolute inset-x-0 top-[37%] flex flex-col items-center text-center px-6 pointer-events-none z-10">
              <span className="font-serif italic text-xs tracking-widest text-[#8C6D46] uppercase font-semibold mb-1">
                Pawiwahan Ageng
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D1C06] tracking-wide leading-tight drop-shadow-xs">
                {coupleTitle}
              </h2>
              <p className="font-serif text-[11px] sm:text-xs text-[#8C6D46] tracking-[0.2em] font-medium mt-1">
                {weddingDate}
              </p>
            </div>
          )}

          {/* GRADIENT BAYANGAN HALUS DI BAGIAN BAWAH KARTU UNTUK KONTEN AKSI */}
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#1C1917]/90 via-[#1C1917]/40 to-transparent pointer-events-none" />

          {/* KOTAK TAMU DAN TOMBOL BUKA DI DALAM KARTU */}
          <div className="absolute inset-x-4 bottom-4 sm:bottom-5 z-20 flex flex-col items-center gap-2.5">
            {/* Box Kepada Yth */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-full p-2.5 sm:p-3 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-[#1C1917] shadow-hard-sm text-center"
            >
              <span className="text-[10px] sm:text-[11px] font-bold text-stone-600 uppercase tracking-widest block mb-0.5">
                Kepada Yth. Bapak/Ibu/Saudara/i:
              </span>
              <div className="font-serif text-base sm:text-lg font-bold text-[#1C1917] flex items-center justify-center gap-2">
                <span>{guestName}</span>
                <span className="text-[9px] px-2 py-0.5 bg-amber-200 border border-[#1C1917] rounded-md font-mono font-bold text-stone-900">
                  Tamu Spesial
                </span>
              </div>
            </motion.div>

            {/* Tombol Buka Undangan */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpen}
              className="w-full py-3 sm:py-3.5 text-sm font-bold bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:to-amber-600 text-white border-2 border-[#1C1917] rounded-2xl shadow-hard btn-pressable flex items-center justify-center gap-2 group ring-2 ring-amber-300/50"
            >
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform text-amber-200" />
              <span>Buka Lembaran Undangan</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Catatan di Bawah */}
      <p className="mt-3 text-[11px] text-stone-600 text-center font-serif italic">
        ✦ Sentuh untuk membuka lembaran adat Jawa & memutar gending ✦
      </p>
    </div>
  );
}
