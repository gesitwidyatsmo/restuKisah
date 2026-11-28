'use client';

import { Bell, Calendar, LogOut, Menu, User } from 'lucide-react';
import { useDashboard } from './DashboardContext';
import { getWeddingCountdownParts } from '@/lib/wedding-data-service';
import { logoutAction } from '@/app/actions/auth';
import type { MemberRole } from '@/types/database';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onToggleMobileMenu?: () => void;
}

const ROLE_LABELS: Record<MemberRole, string> = {
  owner: 'Owner',
  partner: 'Pasangan',
  organizer: 'Wedding Organizer',
  collaborator: 'Keluarga / PIC',
  receptionist: 'Penerima Tamu',
};

export default function Header({
  title = 'Dashboard Ringkasan',
  subtitle = 'Selamat datang! Pantau persiapan pernikahan Anda di sini.',
  onToggleMobileMenu,
}: HeaderProps) {
  const { toggleMobileNav, wedding, userProfile, activeRole } = useDashboard();
  const handleToggle = onToggleMobileMenu || toggleMobileNav;
  const countdown = getWeddingCountdownParts(wedding.wedding_date);

  const countdownLabel = countdown.isToday
    ? 'Hari-H Hari Ini!'
    : countdown.isPast
      ? 'Acara Selesai'
      : `${countdown.days} Hari Menuju Hari-H`;

  return (
    <header className="bg-white border-b-2 border-[#1C1917] px-4 sm:px-6 py-3.5 sm:py-4 flex flex-row items-center justify-between gap-3 sticky top-0 z-20">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={handleToggle}
          className="lg:hidden p-2 rounded-xl border-2 border-[#1C1917] bg-[#FAF8F5] shadow-hard-sm btn-pressable shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Buka menu navigasi"
        >
          <Menu className="w-5 h-5 text-[#1C1917]" />
        </button>

        <div className="min-w-0">
          <h1 className="font-serif text-lg sm:text-2xl font-bold text-[#1C1917] truncate">
            {title}
          </h1>
          <p className="hidden sm:block text-xs text-stone-600 mt-0.5 truncate">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 border-2 border-[#1C1917] shadow-hard-sm text-xs font-bold text-amber-900">
          <Calendar className="w-3.5 h-3.5 text-amber-700" />
          <span>{countdownLabel}</span>
        </div>

        <button
          type="button"
          title="Notifikasi"
          className="relative w-10 h-10 rounded-xl bg-white border-2 border-[#1C1917] shadow-hard-sm flex items-center justify-center btn-pressable shrink-0"
        >
          <Bell className="w-4 h-4 text-[#1C1917]" />
        </button>

        <div className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-[#FAF8F5] border-2 border-[#1C1917] shadow-hard-sm">
          <div className="w-7 h-7 rounded-lg bg-rose-400 border border-[#1C1917] flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-[#1C1917]" />
          </div>
          <div className="hidden md:block text-left max-w-[140px]">
            <span className="block text-xs font-bold text-[#1C1917] leading-none truncate">
              {userProfile.full_name}
            </span>
            <span className="text-[10px] font-medium text-stone-500">
              {ROLE_LABELS[activeRole] ?? activeRole}
            </span>
          </div>
        </div>

        <form action={logoutAction}>
          <button
            type="submit"
            title="Keluar Akun"
            aria-label="Keluar Akun"
            className="h-10 px-2.5 sm:px-3 rounded-xl bg-white hover:bg-rose-100 border-2 border-[#1C1917] shadow-hard-sm flex items-center justify-center gap-1.5 text-xs font-bold text-[#1C1917] btn-pressable shrink-0"
          >
            <LogOut className="w-4 h-4 text-rose-700" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </form>
      </div>
    </header>
  );
}
