'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart, ShieldCheck } from 'lucide-react';

interface AuthCardShellProps {
  title: string;
  subtitle: string;
  badge?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidthClass?: string;
}

export default function AuthCardShell({
  title,
  subtitle,
  badge = 'Wedding OS',
  children,
  footer,
  maxWidthClass = 'max-w-md',
}: AuthCardShellProps) {
  return (
    <div className="min-h-[100dvh] flex flex-col justify-between bg-canvas-pattern px-4 py-6 sm:py-10">
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 group"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-300 border-2 border-[#1C1917] shadow-hard-sm flex items-center justify-center group-hover:-translate-y-0.5 transition-transform">
            <Heart className="w-5 h-5 text-[#1C1917] fill-rose-500" />
          </div>
          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1C1917]">
              RestuKisah
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 border border-[#1C1917]">
              {badge}
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-white text-[#1C1917] border-2 border-[#1C1917] rounded-xl shadow-hard-sm btn-pressable min-h-[40px]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Beranda</span>
        </Link>
      </div>

      <main className="my-8 flex items-center justify-center">
        <div
          className={`w-full ${maxWidthClass} bg-white border-2 sm:border-3 border-[#1C1917] rounded-3xl p-6 sm:p-8 shadow-hard sm:shadow-hard-xl`}
        >
          <div className="mb-6">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] leading-tight">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {children}

          {footer && (
            <div className="mt-6 pt-5 border-t-2 border-stone-200">{footer}</div>
          )}
        </div>
      </main>

      <footer className="max-w-6xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-medium text-stone-600">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>Data pernikahan terisolasi aman dengan enkripsi & RLS per akun.</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/privacy" className="hover:text-[#1C1917] underline-offset-2 hover:underline">
            Kebijakan Privasi
          </Link>
          <span aria-hidden="true">•</span>
          <Link href="/terms" className="hover:text-[#1C1917] underline-offset-2 hover:underline">
            Syarat & Ketentuan
          </Link>
          <span aria-hidden="true">•</span>
          <span>© {new Date().getFullYear()} RestuKisah</span>
        </div>
      </footer>
    </div>
  );
}
