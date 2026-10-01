'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Heart, 
  Calendar, 
  FileText, 
  CheckSquare, 
  Wallet, 
  QrCode, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Users, 
  Menu,
  X
} from 'lucide-react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-canvas-pattern overflow-x-hidden">
      {/* 1. NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b-2 border-[#1C1917]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-rose-300 border-2 border-[#1C1917] shadow-hard-sm flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-[#1C1917] fill-rose-500" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1C1917]">
                RestuKisah
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-200 border border-[#1C1917]">
                Wedding OS
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold">
            <a href="#fitur" className="hover:text-rose-600 transition-colors">Fitur Unggulan</a>
            <a href="#administrasi" className="hover:text-rose-600 transition-colors">Birokrasi KUA</a>
            <a href="#budget" className="hover:text-rose-600 transition-colors">Budget & Termin</a>
            <a href="#undangan" className="hover:text-rose-600 transition-colors">Undangan & QR Tamu</a>
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="px-4 py-2 text-xs sm:text-sm font-bold bg-white text-[#1C1917] border-2 border-[#1C1917] rounded-xl shadow-hard-sm btn-pressable min-h-[44px] flex items-center"
            >
              Masuk
            </Link>
            <Link
              href="/dashboard"
              className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold bg-rose-300 text-[#1C1917] border-2 border-[#1C1917] rounded-xl shadow-hard btn-pressable flex items-center gap-2 min-h-[44px]"
            >
              <span>Mulai Rencanakan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle (< 768px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border-2 border-[#1C1917] bg-white shadow-hard-sm btn-pressable min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#1C1917]" /> : <Menu className="w-5 h-5 text-[#1C1917]" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b-2 border-[#1C1917] bg-[#FAF8F5] px-4 py-4 space-y-3">
            <nav className="flex flex-col space-y-2 text-sm font-bold">
              <a 
                href="#fitur" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-stone-100"
              >
                Fitur Unggulan
              </a>
              <a 
                href="#administrasi" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-stone-100"
              >
                Birokrasi KUA
              </a>
              <a 
                href="#budget" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-stone-100"
              >
                Budget & Termin
              </a>
              <a 
                href="#undangan" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-stone-100"
              >
                Undangan & QR Tamu
              </a>
            </nav>

            <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
              <Link
                href="/dashboard"
                className="w-full py-2.5 text-center text-xs font-bold bg-white text-[#1C1917] border-2 border-[#1C1917] rounded-xl shadow-hard-sm"
              >
                Masuk Akun
              </Link>
              <Link
                href="/dashboard"
                className="w-full py-2.5 text-center text-xs font-bold bg-rose-400 text-[#1C1917] border-2 border-[#1C1917] rounded-xl shadow-hard-sm"
              >
                Mulai Rencanakan Gratis
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-8 pb-16 sm:pt-16 sm:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-200 border-2 border-[#1C1917] shadow-hard-sm mb-5 text-[11px] sm:text-xs font-bold tracking-wide uppercase text-stone-900 max-w-full truncate">
              <Sparkles className="w-3.5 h-3.5 text-amber-800 shrink-0" />
              <span className="truncate">All-in-One Wedding OS & Digital Invitation</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1C1917] leading-[1.18] sm:leading-[1.15] mb-5">
              Persiapkan Pernikahan Impian <span className="underline decoration-rose-400 decoration-wavy decoration-2">Tanpa Stres</span>
            </h1>

            {/* Subhead */}
            <p className="text-sm sm:text-lg md:text-xl text-stone-700 font-medium leading-relaxed mb-8 sm:mb-10 px-2">
              Dari pengurusan berkas legal KUA/Disdukcapil, to-do checklist berbulan-bulan, kontrol anggaran & termin vendor, hingga undangan sinematik dengan QR Code presensi meja tamu.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-10 sm:mb-14">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-7 py-3.5 sm:py-4 text-sm sm:text-base font-bold bg-rose-400 text-[#1C1917] border-2 border-[#1C1917] rounded-2xl shadow-hard hover:shadow-hard-lg btn-pressable flex items-center justify-center gap-3 text-center min-h-[48px]"
              >
                <span>Buka Dashboard Pernikahan</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/demo/dian-bayu"
                target="_blank"
                className="w-full sm:w-auto px-6 py-3.5 sm:py-4 text-sm sm:text-base font-bold bg-white text-[#1C1917] border-2 border-[#1C1917] rounded-2xl shadow-hard btn-pressable flex items-center justify-center gap-2 min-h-[48px]"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Lihat Contoh Undangan</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold text-stone-700">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Standar KUA & Elsimil</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Kolaborasi Pengantin & WO</span>
              </div>
              <div className="flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Check-In Meja Resepsi</span>
              </div>
            </div>
          </div>

          {/* 3. HERO INTERACTIVE MOCKUP WIDGET */}
          <div className="mt-12 sm:mt-16 max-w-5xl mx-auto">
            <div className="bg-white border-2 sm:border-3 border-[#1C1917] rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-hard sm:shadow-hard-xl">
              {/* Window Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-6 mb-4 sm:mb-6 border-b-2 border-stone-200 gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400 border border-[#1C1917]"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-400 border border-[#1C1917]"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-400 border border-[#1C1917]"></span>
                  <span className="ml-2 font-mono text-xs font-bold text-stone-600 truncate">
                    dashboard.restukisah.id/dian-bayu
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-100 border border-[#1C1917] text-[11px] sm:text-xs font-bold text-rose-800 self-start sm:self-auto">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>19 Desember 2026 • Grand Ballroom Bandung</span>
                </div>
              </div>

              {/* Grid Widgets Mockup */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {/* Widget 1: Countdown */}
                <div className="bg-rose-100 border-2 border-[#1C1917] rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-hard-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] sm:text-xs font-bold text-stone-600 uppercase tracking-wider">Hitung Mundur</span>
                    <Clock className="w-3.5 h-3.5 text-rose-600" />
                  </div>
                  <div className="font-serif text-xl sm:text-3xl font-bold text-[#1C1917]">78 Hari</div>
                  <div className="text-[10px] sm:text-xs font-medium text-stone-600 mt-0.5">Menuju Ijab Kabul</div>
                </div>

                {/* Widget 2: KUA Documents */}
                <div className="bg-blue-100 border-2 border-[#1C1917] rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-hard-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] sm:text-xs font-bold text-stone-600 uppercase tracking-wider">Berkas KUA</span>
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div className="font-serif text-xl sm:text-3xl font-bold text-[#1C1917]">6 / 8 Selesai</div>
                  <div className="text-[10px] sm:text-xs text-emerald-800 font-bold mt-0.5">✓ N1-N4 & TT Siap</div>
                </div>

                {/* Widget 3: Budget Control */}
                <div className="bg-emerald-100 border-2 border-[#1C1917] rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-hard-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] sm:text-xs font-bold text-stone-600 uppercase tracking-wider">Budget</span>
                    <Wallet className="w-3.5 h-3.5 text-emerald-700" />
                  </div>
                  <div className="font-serif text-lg sm:text-2xl font-bold text-[#1C1917]">Rp 149.5 Jt</div>
                  <div className="text-[10px] sm:text-xs font-medium text-stone-600 mt-0.5">Plafon: 160 Jt</div>
                </div>

                {/* Widget 4: Guests & RSVP */}
                <div className="bg-purple-100 border-2 border-[#1C1917] rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-hard-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] sm:text-xs font-bold text-stone-600 uppercase tracking-wider">RSVP Tamu</span>
                    <QrCode className="w-3.5 h-3.5 text-purple-700" />
                  </div>
                  <div className="font-serif text-xl sm:text-3xl font-bold text-[#1C1917]">342 Hadir</div>
                  <div className="text-[10px] sm:text-xs font-medium text-stone-600 mt-0.5">85% Konfirmasi</div>
                </div>
              </div>

              {/* Sample Action Ribbon */}
              <div className="mt-4 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-50 border-2 border-[#1C1917] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                  <span className="text-xs sm:text-sm font-bold text-[#1C1917]">
                    Tugas Prioritas: Ambil Surat Pengantar N2 Kelurahan Sukajadi & Bayar DP MUA
                  </span>
                </div>
                <Link
                  href="/dashboard/checklist"
                  className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white border border-[#1C1917] shadow-hard-sm hover:bg-stone-50 self-end sm:self-auto shrink-0"
                >
                  Kelola Tugas →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE MODULES SHOWCASE */}
      <section id="fitur" className="py-16 sm:py-20 bg-white border-y-2 border-[#1C1917]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-100 border border-[#1C1917] text-emerald-800">
              Modul All-in-One
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1C1917] mt-3">
              Semua yang Dibutuhkan untuk Hari Bahagia Anda
            </h2>
            <p className="text-stone-600 mt-2 text-sm sm:text-base">
              Tidak perlu lagi mencatat tercecer di notes WhatsApp atau spreadsheet yang membingungkan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {/* Card 1 */}
            <div id="administrasi" className="bg-[#FAF8F5] border-2 border-[#1C1917] rounded-2xl p-5 sm:p-6 shadow-hard flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-blue-300 border-2 border-[#1C1917] shadow-hard-sm flex items-center justify-center mb-4">
                  <FileText className="w-5 h-5 text-[#1C1917]" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917] mb-2">
                  1. Administrasi & KUA Vault
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                  Panduan runtut birokrasi Indonesia: RT/RW, Kelurahan (Surat N1, N2, N4), Puskesmas (Elsimil & Vaksin TT), hingga pendaftaran SIMKAH sebelum batas H-10 hari kerja.
                </p>
              </div>
              <div className="pt-3 border-t border-stone-300 flex items-center justify-between text-xs font-bold text-blue-800">
                <span>✓ Template & Pengingat Deadline</span>
                <Link href="/dashboard/administrasi" className="underline min-h-[44px] flex items-center">Buka Modul →</Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#FAF8F5] border-2 border-[#1C1917] rounded-2xl p-5 sm:p-6 shadow-hard flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-rose-300 border-2 border-[#1C1917] shadow-hard-sm flex items-center justify-center mb-4">
                  <CheckSquare className="w-5 h-5 text-[#1C1917]" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917] mb-2">
                  2. Wedding Checklist & Kanban
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                  To-do list otomatis dari H-12 bulan hingga Hari-H. Tetapkan PIC (Calon Pengantin Pria, Wanita, atau WO) dengan fitur centang interaktif yang menyenangkan.
                </p>
              </div>
              <div className="pt-3 border-t border-stone-300 flex items-center justify-between text-xs font-bold text-rose-800">
                <span>✓ Milestones H-12 s/d Hari-H</span>
                <Link href="/dashboard/checklist" className="underline min-h-[44px] flex items-center">Buka Modul →</Link>
              </div>
            </div>

            {/* Card 3 */}
            <div id="budget" className="bg-[#FAF8F5] border-2 border-[#1C1917] rounded-2xl p-5 sm:p-6 shadow-hard flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-emerald-300 border-2 border-[#1C1917] shadow-hard-sm flex items-center justify-center mb-4">
                  <Wallet className="w-5 h-5 text-[#1C1917]" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917] mb-2">
                  3. Budget & Termin Vendor
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                  Kalkulator alokasi anggaran otomatis (Catering 40%, Venue 20%, dll). Catat termin pembayaran DP, Termin II, hingga pelunasan vendor agar tidak ada tagihan terlewat.
                </p>
              </div>
              <div className="pt-3 border-t border-stone-300 flex items-center justify-between text-xs font-bold text-emerald-800">
                <span>✓ Estimasi vs Realistis</span>
                <Link href="/dashboard/budget" className="underline min-h-[44px] flex items-center">Buka Modul →</Link>
              </div>
            </div>

            {/* Card 4 */}
            <div id="undangan" className="bg-[#FAF8F5] border-2 border-[#1C1917] rounded-2xl p-5 sm:p-6 shadow-hard flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-amber-300 border-2 border-[#1C1917] shadow-hard-sm flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5 text-[#1C1917]" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917] mb-2">
                  4. Undangan Sinematik
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                  Animasi buka segel amplop mewah, pemutar musik, peta akad & resepsi, galeri foto prewedding, serta amplop digital & QRIS langsung terhubung ke rekening Anda.
                </p>
              </div>
              <div className="pt-3 border-t border-stone-300 flex items-center justify-between text-xs font-bold text-amber-800">
                <span>✓ Live Wishes Wall & RSVP</span>
                <Link href="/dashboard/undangan" className="underline min-h-[44px] flex items-center">Buka Modul →</Link>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-[#FAF8F5] border-2 border-[#1C1917] rounded-2xl p-5 sm:p-6 shadow-hard flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-purple-300 border-2 border-[#1C1917] shadow-hard-sm flex items-center justify-center mb-4">
                  <QrCode className="w-5 h-5 text-[#1C1917]" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917] mb-2">
                  5. Buku Tamu & QR Check-In
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                  Kirim undangan personal via tautan WhatsApp otomatis. Di hari-H, petugas meja tamu cukup memindai QR code tamu dari smartphone tanpa antrean panjang.
                </p>
              </div>
              <div className="pt-3 border-t border-stone-300 flex items-center justify-between text-xs font-bold text-purple-800">
                <span>✓ Scanner Kamera & Audio Beep</span>
                <Link href="/dashboard/tamu" className="underline min-h-[44px] flex items-center">Buka Modul →</Link>
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-[#FAF8F5] border-2 border-[#1C1917] rounded-2xl p-5 sm:p-6 shadow-hard flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-stone-300 border-2 border-[#1C1917] shadow-hard-sm flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5 text-[#1C1917]" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917] mb-2">
                  6. Rundown & Kontak Darurat
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                  Susunan acara menit demi menit dari makeup subuh hingga lempar bunga. Lengkap dengan direktori kontak PIC keluarga & vendor serta export cetak PDF instan.
                </p>
              </div>
              <div className="pt-3 border-t border-stone-300 flex items-center justify-between text-xs font-bold text-stone-800">
                <span>✓ Format Print PDF untuk WO</span>
                <Link href="/dashboard/rundown" className="underline min-h-[44px] flex items-center">Buka Modul →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="py-14 sm:py-20 bg-rose-100 border-b-2 border-[#1C1917]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-white border-2 sm:border-3 border-[#1C1917] shadow-hard sm:shadow-hard-lg max-w-3xl w-full">
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1C1917] mb-3">
              Siap Mewujudkan Pernikahan yang Rapi & Berkesan?
            </h2>
            <p className="text-stone-700 text-xs sm:text-base mb-6 max-w-xl mx-auto">
              Mulai gratis sekarang. Buat proyek pernikahan Anda dalam hitungan detik dan nikmati ketenangan persiapan bersama pasangan.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-bold bg-rose-400 text-[#1C1917] border-2 border-[#1C1917] rounded-xl shadow-hard btn-pressable flex items-center justify-center gap-2 min-h-[44px]"
              >
                <span>Mulai Buat Proyek Pernikahan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-bold bg-white text-[#1C1917] border-2 border-[#1C1917] rounded-xl shadow-hard-sm btn-pressable min-h-[44px] flex items-center justify-center"
              >
                Masuk Akun Catin / WO
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="bg-[#FAF8F5] py-10 border-t border-stone-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-300 border-2 border-[#1C1917] shadow-hard-sm flex items-center justify-center">
              <Heart className="w-4 h-4 text-[#1C1917] fill-rose-500" />
            </div>
            <span className="font-serif text-lg font-bold text-[#1C1917]">RestuKisah</span>
            <span className="text-xs text-stone-500">© 2026. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-stone-700">
            <Link href="/dashboard/administrasi" className="hover:text-rose-600 min-h-[44px] flex items-center">Panduan KUA</Link>
            <Link href="/dashboard/budget" className="hover:text-rose-600 min-h-[44px] flex items-center">Kalkulator Anggaran</Link>
            <Link href="/dashboard/tamu" className="hover:text-rose-600 min-h-[44px] flex items-center">Buku Tamu QR</Link>
            <Link href="/dashboard" className="hover:text-rose-600 min-h-[44px] flex items-center">Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
