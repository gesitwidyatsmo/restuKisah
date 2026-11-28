'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/dashboard/Header';
import { useDashboard } from '@/components/dashboard/DashboardContext';
import {
  formatWeddingDateIndo,
  getKuaRecommendedDeadline,
  getWeddingCountdownParts,
} from '@/lib/wedding-data-service';
import { getClientActionOrigin } from '@/lib/auth/validation';
import {
  Calendar,
  FileText,
  CheckSquare,
  Wallet,
  Users,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
  QrCode,
  Share2,
} from 'lucide-react';

export default function DashboardOverviewPage() {
  const [copied, setCopied] = useState(false);
  const { wedding, checklists, budgetItems, stats, toggleChecklist } = useDashboard();
  const [countdown, setCountdown] = useState(() =>
    getWeddingCountdownParts(wedding.wedding_date)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getWeddingCountdownParts(wedding.wedding_date));
    }, 60000);
    return () => clearInterval(interval);
  }, [wedding.wedding_date]);

  const allMilestones = budgetItems.flatMap((b) =>
    (b.milestones || []).map((m) => ({
      ...m,
      vendor: b.vendor_name || 'Vendor',
      item: b.item_name,
    }))
  );
  const unpaidMilestones = allMilestones.filter((m) => !m.is_paid);

  const formattedDate = formatWeddingDateIndo(wedding.wedding_date, 'long');
  const kuaDeadline = getKuaRecommendedDeadline(wedding.wedding_date);

  const handleCopyLink = () => {
    const origin = getClientActionOrigin();
    void navigator.clipboard.writeText(`${origin}/${wedding.slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <Header
        title="Ringkasan Pernikahan"
        subtitle={`Halo ${wedding.bride_nickname || wedding.bride_name} & ${wedding.groom_nickname || wedding.groom_name}, berikut progres persiapan hari bahagia Anda.`}
      />

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-5 sm:space-y-6">
        {/* 1. HERO COUNTDOWN BANNER */}
        <div className="bg-rose-200 border-2 sm:border-3 border-[#1C1917] rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-hard relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#1C1917] text-[11px] sm:text-xs font-bold text-rose-800 mb-2 sm:mb-3 shadow-hard-sm">
                <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                <span>
                  {countdown.isToday
                    ? 'Hari Bahagia Anda Tiba Hari Ini!'
                    : countdown.isPast
                      ? 'Rangkaian Pernikahan Telah Berlangsung'
                      : 'Pernikahan Impian Dalam Waktu Dekat'}
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1C1917]">
                {wedding.bride_name} & {wedding.groom_name}
              </h2>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold text-stone-700 mt-2">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#1C1917]" />
                  {formattedDate}
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="block sm:inline">{wedding.location_city}</span>
              </div>
            </div>

            {/* Countdown Boxes */}
            <div className="flex items-center gap-2 sm:gap-3 self-center sm:self-auto">
              <div className="bg-white border-2 border-[#1C1917] rounded-xl sm:rounded-2xl p-2.5 sm:p-4 text-center min-w-[58px] sm:min-w-[70px] shadow-hard-sm">
                <span className="font-serif text-xl sm:text-3xl font-bold text-[#1C1917] block">
                  {countdown.days}
                </span>
                <span className="text-[9px] sm:text-xs font-bold text-stone-600 uppercase">
                  Hari
                </span>
              </div>
              <div className="font-bold text-lg sm:text-xl text-[#1C1917]">:</div>
              <div className="bg-white border-2 border-[#1C1917] rounded-xl sm:rounded-2xl p-2.5 sm:p-4 text-center min-w-[58px] sm:min-w-[70px] shadow-hard-sm">
                <span className="font-serif text-xl sm:text-3xl font-bold text-[#1C1917] block">
                  {String(countdown.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-xs font-bold text-stone-600 uppercase">
                  Jam
                </span>
              </div>
              <div className="font-bold text-lg sm:text-xl text-[#1C1917]">:</div>
              <div className="bg-white border-2 border-[#1C1917] rounded-xl sm:rounded-2xl p-2.5 sm:p-4 text-center min-w-[58px] sm:min-w-[70px] shadow-hard-sm">
                <span className="font-serif text-xl sm:text-3xl font-bold text-[#1C1917] block">
                  {String(countdown.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-xs font-bold text-stone-600 uppercase">
                  Menit
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. 4 METRIC STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <Link
            href="/dashboard/administrasi"
            className="bg-white border-2 border-[#1C1917] rounded-2xl p-4 sm:p-5 shadow-hard hover:shadow-hard-lg transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-[11px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider">
                  Berkas KUA
                </span>
                <div className="w-8 h-8 rounded-lg bg-blue-200 border border-[#1C1917] flex items-center justify-center">
                  <FileText className="w-4 h-4 text-[#1C1917]" />
                </div>
              </div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
                {stats.docsCompleted}{' '}
                <span className="text-base sm:text-lg text-stone-500 font-sans">
                  / {stats.docsTotal}
                </span>
              </div>
              <div className="w-full bg-stone-100 border border-[#1C1917] h-3 rounded-full mt-2 sm:mt-3 overflow-hidden p-0.5">
                <div
                  className="bg-blue-400 h-full rounded-full transition-all"
                  style={{ width: `${stats.docsPercent}%` }}
                />
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-stone-200 flex items-center justify-between text-xs font-bold text-blue-700 min-h-[36px]">
              <span>{stats.docsPercent}% Berkas Siap</span>
              <span className="group-hover:translate-x-1 transition-transform">Detail →</span>
            </div>
          </Link>

          <Link
            href="/dashboard/checklist"
            className="bg-white border-2 border-[#1C1917] rounded-2xl p-4 sm:p-5 shadow-hard hover:shadow-hard-lg transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-[11px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider">
                  Checklist To-Do
                </span>
                <div className="w-8 h-8 rounded-lg bg-emerald-200 border border-[#1C1917] flex items-center justify-center">
                  <CheckSquare className="w-4 h-4 text-[#1C1917]" />
                </div>
              </div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
                {stats.tasksCompleted}{' '}
                <span className="text-base sm:text-lg text-stone-500 font-sans">
                  / {stats.tasksTotal}
                </span>
              </div>
              <div className="w-full bg-stone-100 border border-[#1C1917] h-3 rounded-full mt-2 sm:mt-3 overflow-hidden p-0.5">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all"
                  style={{ width: `${stats.tasksPercent}%` }}
                />
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-stone-200 flex items-center justify-between text-xs font-bold text-emerald-700 min-h-[36px]">
              <span>{stats.tasksPercent}% Tugas Selesai</span>
              <span className="group-hover:translate-x-1 transition-transform">Detail →</span>
            </div>
          </Link>

          <Link
            href="/dashboard/budget"
            className="bg-white border-2 border-[#1C1917] rounded-2xl p-4 sm:p-5 shadow-hard hover:shadow-hard-lg transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-[11px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider">
                  Total Kontrak
                </span>
                <div className="w-8 h-8 rounded-lg bg-amber-200 border border-[#1C1917] flex items-center justify-center">
                  <Wallet className="w-4 h-4 text-[#1C1917]" />
                </div>
              </div>
              <div className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917]">
                Rp {(stats.totalBudgetActual / 1000000).toFixed(1)} Jt
              </div>
              <div className="text-[11px] sm:text-xs text-stone-600 mt-1 font-medium">
                Plafon: Rp {(stats.targetBudget / 1000000).toFixed(0)} Jt
              </div>
            </div>
            <div
              className={`mt-3 pt-2.5 border-t border-stone-200 flex items-center justify-between text-xs font-bold min-h-[36px] ${
                stats.budgetRemaining >= 0 ? 'text-emerald-700' : 'text-rose-700'
              }`}
            >
              <span className="inline-flex items-center gap-1">
                {stats.budgetRemaining >= 0 ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5" />
                )}
                <span>{stats.budgetRemaining >= 0 ? 'Budget Aman' : 'Melebihi Plafon'}</span>
              </span>
              <span className="group-hover:translate-x-1 transition-transform">Detail →</span>
            </div>
          </Link>

          <Link
            href="/dashboard/tamu"
            className="bg-white border-2 border-[#1C1917] rounded-2xl p-4 sm:p-5 shadow-hard hover:shadow-hard-lg transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-[11px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider">
                  Buku Tamu
                </span>
                <div className="w-8 h-8 rounded-lg bg-purple-200 border border-[#1C1917] flex items-center justify-center">
                  <Users className="w-4 h-4 text-[#1C1917]" />
                </div>
              </div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
                {stats.attendingGuests}{' '}
                <span className="text-base sm:text-lg text-stone-500 font-sans">
                  / {stats.totalGuests}
                </span>
              </div>
              <div className="text-[11px] sm:text-xs text-stone-600 mt-1 font-medium">
                {stats.checkedInGuests > 0
                  ? `${stats.checkedInGuests} Tamu Telah Hadir (${stats.totalCheckedInPax} Pax)`
                  : stats.totalGuests > 0
                    ? 'Telah Konfirmasi Hadir'
                    : 'Belum ada tamu tercatat'}
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-stone-200 flex items-center justify-between text-xs font-bold text-purple-700 min-h-[36px]">
              <span>
                {stats.checkedInGuests > 0
                  ? `${stats.checkedInGuests} Check-in Live`
                  : 'QR Presensi Siap'}
              </span>
              <span className="group-hover:translate-x-1 transition-transform">Detail →</span>
            </div>
          </Link>
        </div>

        {/* 3. PRIORITAS CHECKLIST & JADWAL TERMIN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-4 sm:p-6 shadow-hard flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4 pb-2.5 border-b-2 border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-200 border border-[#1C1917] flex items-center justify-center shrink-0">
                    <CheckSquare className="w-4 h-4 text-[#1C1917]" />
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#1C1917]">
                    Tugas Prioritas Mendatang
                  </h3>
                </div>
                <Link
                  href="/dashboard/checklist"
                  className="text-xs font-bold text-stone-700 hover:text-rose-600"
                >
                  Lihat Semua →
                </Link>
              </div>

              <div className="space-y-2.5 sm:space-y-3">
                {checklists.length === 0 ? (
                  <div className="p-4 rounded-xl border-2 border-dashed border-stone-300 text-center text-xs text-stone-500">
                    Belum ada tugas checklist. Tambahkan tugas pertama Anda.
                  </div>
                ) : (
                  checklists.slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      className="p-3 rounded-xl border-2 border-[#1C1917] bg-[#FAF8F5] flex items-start justify-between gap-2.5 shadow-hard-sm cursor-pointer hover:bg-stone-50 transition-colors"
                      onClick={() => void toggleChecklist(task.id)}
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        <input
                          type="checkbox"
                          checked={task.status === 'done'}
                          onClick={(e) => e.stopPropagation()}
                          onChange={() => void toggleChecklist(task.id)}
                          className="mt-1 w-4 h-4 rounded border-2 border-[#1C1917] text-rose-500 focus:ring-0 cursor-pointer shrink-0"
                        />
                        <div className="min-w-0">
                          <div
                            className={`font-bold text-xs sm:text-sm text-[#1C1917] truncate ${
                              task.status === 'done' ? 'line-through text-stone-400' : ''
                            }`}
                          >
                            {task.title}
                          </div>
                          <div className="text-[10px] sm:text-[11px] text-stone-500 mt-0.5 truncate">
                            {task.category} • {task.deadline || task.timeframe}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#1C1917] shrink-0 ${
                          task.status === 'done'
                            ? 'bg-emerald-200 text-emerald-900'
                            : 'bg-amber-200 text-amber-900'
                        }`}
                      >
                        {task.status === 'done' ? 'Selesai' : 'Proses'}
                      </span>
                    </div>
                  ))
                )}

                <div className="p-3 rounded-xl border-2 border-[#1C1917] bg-blue-50 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <div className="text-[11px] sm:text-xs text-blue-900">
                    <span className="font-bold">Pengingat KUA:</span> Pendaftaran SIMKAH &
                    berkas N1-N4 disarankan selesai sebelum <strong>{kuaDeadline}</strong>.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-200">
              <Link
                href="/dashboard/checklist"
                className="w-full py-2.5 px-4 text-xs font-bold bg-[#FAF8F5] text-[#1C1917] border-2 border-[#1C1917] rounded-xl shadow-hard-sm btn-pressable flex items-center justify-center gap-2 min-h-[44px]"
              >
                <span>Buka Checklist Persiapan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-4 sm:p-6 shadow-hard flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4 pb-2.5 border-b-2 border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-200 border border-[#1C1917] flex items-center justify-center shrink-0">
                    <Wallet className="w-4 h-4 text-[#1C1917]" />
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#1C1917]">
                    Termin Tagihan Vendor
                  </h3>
                </div>
                <Link
                  href="/dashboard/budget"
                  className="text-xs font-bold text-stone-700 hover:text-rose-600"
                >
                  Lihat Semua →
                </Link>
              </div>

              <div className="space-y-2.5 sm:space-y-3">
                {unpaidMilestones.length === 0 ? (
                  <div className="p-5 rounded-xl border-2 border-dashed border-stone-300 text-center text-xs text-stone-500">
                    Belum ada tagihan termin vendor yang belum lunas.
                  </div>
                ) : (
                  unpaidMilestones.slice(0, 3).map((m) => (
                    <div
                      key={m.id}
                      className="p-3 rounded-xl border-2 border-[#1C1917] bg-[#FAF8F5] flex items-center justify-between gap-2.5 shadow-hard-sm"
                    >
                      <div className="min-w-0">
                        <div className="font-bold text-xs sm:text-sm text-[#1C1917] truncate">
                          {m.milestone_title}
                        </div>
                        <div className="text-[10px] sm:text-[11px] text-stone-500 mt-0.5 truncate">
                          {m.vendor} • {m.due_date || 'Menyesuaikan'}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-serif font-bold text-xs sm:text-sm text-[#1C1917]">
                          Rp {(m.amount / 1000000).toFixed(1)} Jt
                        </div>
                        <span className="inline-block text-[9px] font-bold px-2 py-0.5 rounded-full border border-[#1C1917] bg-rose-200 text-rose-900 mt-0.5">
                          Belum Lunas
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-200">
              <Link
                href="/dashboard/budget"
                className="w-full py-2.5 px-4 text-xs font-bold bg-[#FAF8F5] text-[#1C1917] border-2 border-[#1C1917] rounded-xl shadow-hard-sm btn-pressable flex items-center justify-center gap-2 min-h-[44px]"
              >
                <span>Kelola Anggaran & Termin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4. TAUTAN CEPAT UNDANGAN PUBLIK & QR SCANNER */}
        <div className="bg-gradient-to-r from-amber-100 via-rose-100 to-purple-100 border-2 border-[#1C1917] rounded-2xl p-4 sm:p-6 shadow-hard flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border-2 border-[#1C1917] shadow-hard-sm flex items-center justify-center shrink-0">
              <QrCode className="w-5 h-5 sm:w-6 sm:h-6 text-[#1C1917]" />
            </div>
            <div>
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#1C1917]">
                Tautan Undangan: /{wedding.slug}
              </h4>
              <p className="text-[11px] sm:text-xs text-stone-600 mt-0.5">
                Bagikan ke keluarga atau gunakan portal QR meja tamu di hari-H.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full md:w-auto">
            <button
              onClick={handleCopyLink}
              className="flex-1 md:flex-initial px-3.5 py-2 text-xs font-bold bg-white text-[#1C1917] border-2 border-[#1C1917] rounded-xl shadow-hard-sm btn-pressable flex items-center justify-center gap-1.5 min-h-[40px]"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Tersalin! ✓' : 'Salin Tautan'}</span>
            </button>

            <Link
              href={`/${wedding.slug}`}
              target="_blank"
              className="flex-1 md:flex-initial px-3.5 py-2 text-xs font-bold bg-rose-400 text-[#1C1917] border-2 border-[#1C1917] rounded-xl shadow-hard-sm btn-pressable flex items-center justify-center gap-1.5 min-h-[40px]"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Pratinjau</span>
            </Link>

            <Link
              href={`/${wedding.slug}/check-in`}
              className="flex-1 md:flex-initial px-3.5 py-2 text-xs font-bold bg-purple-300 text-[#1C1917] border-2 border-[#1C1917] rounded-xl shadow-hard-sm btn-pressable flex items-center justify-center gap-1.5 min-h-[40px]"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Meja Tamu</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
