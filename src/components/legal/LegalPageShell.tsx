import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Globe, Heart, ShieldCheck } from 'lucide-react';

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  note?: string;
}

interface LegalPageShellProps {
  badge: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  activeRoute: 'privacy' | 'terms';
  sections: LegalSection[];
}

export default function LegalPageShell({
  badge,
  title,
  subtitle,
  lastUpdated,
  activeRoute,
  sections,
}: LegalPageShellProps) {
  const siblingHref = activeRoute === 'privacy' ? '/terms' : '/privacy';
  const siblingLabel =
    activeRoute === 'privacy' ? 'Syarat & Ketentuan' : 'Kebijakan Privasi';

  return (
    <div className="min-h-[100dvh] flex flex-col justify-between bg-canvas-pattern text-[#1C1917]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-sm border-b-2 border-[#1C1917]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-rose-300 border-2 border-[#1C1917] shadow-hard-sm flex items-center justify-center group-hover:-translate-y-0.5 transition-transform">
              <Heart className="w-4 h-4 text-[#1C1917] fill-rose-500" />
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-tight text-[#1C1917]">
                RestuKisah
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 border border-[#1C1917]">
                {badge}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href={siblingHref}
              className="hidden sm:inline-flex items-center px-3 py-2 text-xs font-bold bg-stone-100 hover:bg-stone-200 text-[#1C1917] border-2 border-[#1C1917] rounded-xl min-h-[40px]"
            >
              {siblingLabel}
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-white text-[#1C1917] border-2 border-[#1C1917] rounded-xl shadow-hard-sm btn-pressable min-h-[40px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Beranda</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
        {/* Document Header Card */}
        <section className="bg-white border-2 sm:border-3 border-[#1C1917] rounded-3xl p-6 sm:p-9 shadow-hard sm:shadow-hard-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-200 border-2 border-[#1C1917] text-xs font-bold mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Dokumen Resmi RestuKisah</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] leading-tight">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-stone-700 mt-3 leading-relaxed max-w-3xl">
            {subtitle}
          </p>

          <div className="mt-5 pt-4 border-t-2 border-stone-200 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold text-stone-600">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              Terakhir diperbarui: {lastUpdated}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-rose-600" />
              Domain resmi: https://www.restukisah.my.id
            </span>
          </div>

          {/* Quick Jump Table of Contents */}
          <div className="mt-6 bg-[#FAF8F5] border-2 border-[#1C1917] rounded-2xl p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2.5">
              Ringkasan Bagian
            </p>
            <div className="flex flex-wrap gap-2">
              {sections.map((section, idx) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white border border-[#1C1917] hover:bg-rose-100 transition-colors"
                >
                  {idx + 1}. {section.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section, idx) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 bg-white border-2 border-[#1C1917] rounded-2xl p-5 sm:p-7 shadow-hard-sm"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="w-8 h-8 shrink-0 rounded-lg bg-rose-200 border-2 border-[#1C1917] flex items-center justify-center text-xs font-extrabold">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] leading-snug pt-0.5">
                  {section.title}
                </h2>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed sm:pl-11">
                {section.paragraphs.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}

                {section.bullets && section.bullets.length > 0 && (
                  <ul className="space-y-2 pt-1">
                    {section.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1C1917] mt-2 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.note && (
                  <div className="mt-3 p-3.5 rounded-xl bg-amber-50 border-2 border-[#1C1917] text-xs font-medium text-[#1C1917]">
                    {section.note}
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>

        {/* Bottom CTA */}
        <section className="bg-rose-100 border-2 border-[#1C1917] rounded-2xl p-5 sm:p-6 shadow-hard-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1C1917]">
              Siap Merencanakan Pernikahan dengan Aman?
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 mt-1">
              Baca juga{' '}
              <Link href={siblingHref} className="font-bold underline text-[#1C1917]">
                {siblingLabel}
              </Link>{' '}
              atau mulai buat proyek pernikahan Anda sekarang.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5 shrink-0">
            <Link
              href="/login"
              className="px-4 py-2.5 text-xs font-bold bg-white text-[#1C1917] border-2 border-[#1C1917] rounded-xl shadow-hard-sm btn-pressable"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="px-4 py-2.5 text-xs font-bold bg-rose-400 text-[#1C1917] border-2 border-[#1C1917] rounded-xl shadow-hard-sm btn-pressable"
            >
              Daftar Akun
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#FAF8F5] border-t-2 border-stone-300 py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-stone-600">
          <span>© {new Date().getFullYear()} RestuKisah (restukisah.my.id). All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className={`hover:text-[#1C1917] ${activeRoute === 'privacy' ? 'underline font-bold text-[#1C1917]' : ''}`}
            >
              Kebijakan Privasi
            </Link>
            <Link
              href="/terms"
              className={`hover:text-[#1C1917] ${activeRoute === 'terms' ? 'underline font-bold text-[#1C1917]' : ''}`}
            >
              Syarat & Ketentuan
            </Link>
            <Link href="/" className="hover:text-[#1C1917]">
              Beranda
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
