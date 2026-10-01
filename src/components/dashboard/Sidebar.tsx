'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  CheckSquare, 
  Wallet, 
  Users, 
  Sparkles, 
  Clock, 
  ExternalLink, 
  Heart,
  ChevronRight,
  Home,
  X
} from 'lucide-react';
import { mockWedding } from '@/lib/mock-data';

const navItems = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
    badgeColor: 'bg-rose-200',
  },
  {
    name: 'Administrasi KUA',
    href: '/dashboard/administrasi',
    icon: FileText,
    badgeColor: 'bg-blue-200',
  },
  {
    name: 'Wedding Checklist',
    href: '/dashboard/checklist',
    icon: CheckSquare,
    badgeColor: 'bg-emerald-200',
  },
  {
    name: 'Budget & Termin',
    href: '/dashboard/budget',
    icon: Wallet,
    badgeColor: 'bg-amber-200',
  },
  {
    name: 'Tamu & WhatsApp',
    href: '/dashboard/tamu',
    icon: Users,
    badgeColor: 'bg-purple-200',
  },
  {
    name: 'Undangan Digital',
    href: '/dashboard/undangan',
    icon: Sparkles,
    badgeColor: 'bg-pink-200',
  },
  {
    name: 'Rundown Hari-H',
    href: '/dashboard/rundown',
    icon: Clock,
    badgeColor: 'bg-stone-200',
  },
];

interface SidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({ isMobileOpen = false, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full bg-white border-r-2 border-[#1C1917] w-72">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b-2 border-[#1C1917] bg-[#FAF8F5]">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3" onClick={onCloseMobile}>
              <div className="w-10 h-10 rounded-xl bg-rose-400 border-2 border-[#1C1917] shadow-hard-sm flex items-center justify-center">
                <Heart className="w-5 h-5 text-[#1C1917] fill-rose-600" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-[#1C1917]">
                  RestuKisah
                </span>
                <span className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                  Wedding Dashboard
                </span>
              </div>
            </Link>

            {/* Mobile Close Button */}
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="lg:hidden p-1.5 rounded-lg border-2 border-[#1C1917] bg-white shadow-hard-sm"
                aria-label="Tutup menu"
              >
                <X className="w-4 h-4 text-[#1C1917]" />
              </button>
            )}
          </div>

          {/* Wedding Switcher Card */}
          <div className="mt-4 p-3 rounded-xl bg-rose-50 border-2 border-[#1C1917] shadow-hard-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800">
                Pernikahan Aktif
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <div className="font-serif font-bold text-sm text-[#1C1917] mt-1">
              {mockWedding.bride_nickname} & {mockWedding.groom_nickname}
            </div>
            <div className="text-[11px] font-medium text-stone-600">
              19 Des 2026 • {mockWedding.location_city}
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-270px)]">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-sm border-2 transition-all min-h-[44px] ${
                  isActive
                    ? 'bg-rose-300 border-[#1C1917] shadow-hard-sm text-[#1C1917]'
                    : 'bg-white border-transparent text-stone-700 hover:border-[#1C1917] hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg border border-[#1C1917] flex items-center justify-center ${item.badgeColor}`}
                  >
                    <Icon className="w-4 h-4 text-[#1C1917]" />
                  </div>
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-[#1C1917]" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Quick Links */}
      <div className="p-4 border-t-2 border-[#1C1917] bg-[#FAF8F5] space-y-2">
        <Link
          href={`/demo/${mockWedding.slug}`}
          target="_blank"
          className="flex items-center justify-between w-full px-3.5 py-2.5 text-xs font-bold bg-amber-200 border-2 border-[#1C1917] rounded-xl shadow-hard-sm btn-pressable text-[#1C1917] min-h-[40px]"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lihat Undangan Publik</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <Link
          href="/"
          className="flex items-center justify-center gap-2 w-full px-3.5 py-2 text-xs font-bold bg-white border border-[#1C1917] rounded-xl text-stone-700 hover:bg-stone-100 min-h-[38px]"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda Utama</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Desktop Persistent Sidebar (≥ 1024px) */}
      <aside className="hidden lg:block w-72 sticky top-0 h-screen shrink-0 z-30">
        {sidebarContent}
      </aside>

      {/* 2. Mobile & Tablet Slide-Over Drawer (< 1024px) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop Blur Overlay */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 left-0 w-72 shadow-hard-xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
