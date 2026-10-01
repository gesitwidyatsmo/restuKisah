'use client';

import { Bell, Calendar, User, Menu } from 'lucide-react';
import { mockWedding } from '@/lib/mock-data';
import { useDashboard } from './DashboardContext';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onToggleMobileMenu?: () => void;
}

export default function Header({ 
  title = "Dashboard Ringkasan", 
  subtitle = "Selamat datang! Pantau persiapan pernikahan Anda di sini.",
  onToggleMobileMenu
}: HeaderProps) {
  const { toggleMobileNav } = useDashboard();
  const handleToggle = onToggleMobileMenu || toggleMobileNav;

  return (
    <header className="bg-white border-b-2 border-[#1C1917] px-4 sm:px-6 py-3.5 sm:py-4 flex flex-row items-center justify-between gap-3 sticky top-0 z-20">
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile Hamburger Button (< 1024px) */}
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
        {/* Countdown Badge (Hidden on mobile < 640px) */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 border-2 border-[#1C1917] shadow-hard-sm text-xs font-bold text-amber-900">
          <Calendar className="w-3.5 h-3.5 text-amber-700" />
          <span>78 Hari Menuju Hari-H</span>
        </div>

        {/* Notification Bell */}
        <button 
          title="Notifikasi" 
          className="relative w-10 h-10 rounded-xl bg-white border-2 border-[#1C1917] shadow-hard-sm flex items-center justify-center btn-pressable shrink-0"
        >
          <Bell className="w-4 h-4 text-[#1C1917]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
        </button>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-[#FAF8F5] border-2 border-[#1C1917] shadow-hard-sm">
          <div className="w-7 h-7 rounded-lg bg-rose-400 border border-[#1C1917] flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-[#1C1917]" />
          </div>
          <div className="hidden md:block text-left">
            <span className="block text-xs font-bold text-[#1C1917] leading-none">
              {mockWedding.bride_nickname} & {mockWedding.groom_nickname}
            </span>
            <span className="text-[10px] font-medium text-stone-500">
              Pengantin (Owner)
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
