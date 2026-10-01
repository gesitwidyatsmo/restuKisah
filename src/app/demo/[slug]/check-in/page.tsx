'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  QrCode, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  Camera
} from 'lucide-react';
import { mockGuests, mockWedding } from '@/lib/mock-data';
import { Guest } from '@/types/database';

export default function CheckInScannerPage() {
  const [guests, setGuests] = useState<Guest[]>(mockGuests);
  const [inputToken, setInputToken] = useState('');
  const [lastScannedGuest, setLastScannedGuest] = useState<Guest | null>(null);
  const [scanMessage, setScanMessage] = useState<{ type: 'success' | 'error' | 'already'; text: string } | null>(null);

  const handleScanToken = (tokenToScan: string) => {
    const token = tokenToScan.trim();
    if (!token) return;

    const foundGuest = guests.find(g => g.qr_token.toLowerCase() === token.toLowerCase());

    if (!foundGuest) {
      setScanMessage({ type: 'error', text: 'QR Token Tidak Valid! Tamu tidak terdaftar dalam database.' });
      setLastScannedGuest(null);
      return;
    }

    if (foundGuest.is_checked_in) {
      setScanMessage({ 
        type: 'already', 
        text: `Tamu "${foundGuest.name}" SUDAH CHECK-IN sebelumnya pada ${foundGuest.checked_in_at ? new Date(foundGuest.checked_in_at).toLocaleTimeString('id-ID') : 'pagi hari'}.` 
      });
      setLastScannedGuest(foundGuest);
      return;
    }

    const updated = guests.map(g => {
      if (g.id === foundGuest.id) {
        return {
          ...g,
          is_checked_in: true,
          checked_in_at: new Date().toISOString()
        };
      }
      return g;
    });

    setGuests(updated);
    setLastScannedGuest({ ...foundGuest, is_checked_in: true, checked_in_at: new Date().toISOString() });
    setScanMessage({ 
      type: 'success', 
      text: `Presensi Berhasil! Silakan persilakan ${foundGuest.name} masuk & serahkan souvenir.` 
    });
    setInputToken('');
  };

  const totalGuests = guests.length;
  const checkedInCount = guests.filter(g => g.is_checked_in).length;
  const totalCheckedInPax = guests.filter(g => g.is_checked_in)
    .reduce((acc, curr) => acc + (curr.rsvp?.confirmed_pax || curr.allocated_pax), 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] p-3.5 sm:p-6 lg:p-8 overflow-x-hidden">
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2">
          <Link
            href="/dashboard/tamu"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 border-[#1C1917] bg-white text-xs font-bold shadow-hard-sm btn-pressable min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Dashboard</span>
          </Link>

          <span className="text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full bg-purple-200 border border-[#1C1917] text-purple-900">
            Meja Resepsi
          </span>
        </div>

        {/* Realtime Attendance Header Card */}
        <div className="bg-white border-2 sm:border-3 border-[#1C1917] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-hard sm:shadow-hard-lg text-center">
          <h1 className="font-serif text-xl sm:text-3xl font-bold text-[#1C1917]">
            Meja Resepsi: {mockWedding.bride_nickname} & {mockWedding.groom_nickname}
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Pindai QR Code tamu dari layar smartphone mereka untuk validasi kehadiran.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-5">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-100 border-2 border-[#1C1917] shadow-hard-sm">
              <span className="text-[10px] sm:text-xs font-bold text-stone-600 uppercase block mb-1">
                Tamu Hadir
              </span>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-emerald-900">
                {checkedInCount} <span className="text-xs sm:text-sm font-sans text-stone-600">/ {totalGuests}</span>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-purple-100 border-2 border-[#1C1917] shadow-hard-sm">
              <span className="text-[10px] sm:text-xs font-bold text-stone-600 uppercase block mb-1">
                Total Pax Masuk
              </span>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-purple-900">
                {totalCheckedInPax} Pax
              </div>
            </div>
          </div>
        </div>

        {/* Scanner Simulation Box */}
        <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-4 sm:p-6 shadow-hard space-y-3.5 sm:space-y-4">
          <div className="flex items-center justify-between pb-2.5 border-b-2 border-stone-200">
            <h3 className="font-bold text-xs sm:text-sm text-[#1C1917] flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-purple-600" />
              <span>Pemindai QR Meja Tamu</span>
            </h3>
            <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Kamera Siap
            </span>
          </div>

          {/* Scanner Viewfinder Box */}
          <div className="border-2 sm:border-3 border-dashed border-[#1C1917] rounded-2xl p-6 sm:p-8 text-center bg-[#FAF8F5] relative overflow-hidden">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-2 border-purple-500 bg-white/70 mx-auto flex items-center justify-center relative shadow-hard-sm">
              <QrCode className="w-16 h-16 sm:w-20 sm:h-20 text-stone-800" />
              <div className="absolute inset-x-2 top-0 h-1 bg-purple-500 animate-bounce"></div>
            </div>
            <p className="text-[11px] sm:text-xs text-stone-600 font-medium mt-3 sm:mt-4">
              Arahkan kamera ke layar HP tamu atau ketik token di bawah:
            </p>
          </div>

          {/* Token Input Form */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleScanToken(inputToken);
            }} 
            className="flex flex-col sm:flex-row gap-2"
          >
            <input
              type="text"
              placeholder="Contoh: TOKEN-BUDI-VIP01"
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value)}
              className="flex-1 px-3.5 py-2.5 text-xs font-mono font-bold border-2 border-[#1C1917] rounded-xl focus:outline-none min-h-[44px]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-purple-400 text-[#1C1917] font-bold text-xs border-2 border-[#1C1917] rounded-xl shadow-hard-sm btn-pressable min-h-[44px] flex items-center justify-center"
            >
              Verifikasi
            </button>
          </form>

          {/* Quick Demo Tokens */}
          <div className="pt-1">
            <span className="text-[10px] sm:text-[11px] font-bold text-stone-500 block mb-1.5">
              Simulasi Cepat (Klik Token Tamu):
            </span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {guests.map((g) => (
                <button
                  key={g.id}
                  onClick={() => handleScanToken(g.qr_token)}
                  className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg border border-[#1C1917] shadow-hard-sm btn-pressable min-h-[34px] ${
                    g.is_checked_in ? 'bg-stone-200 text-stone-600' : 'bg-rose-100 text-[#1C1917]'
                  }`}
                >
                  {g.name.split(' ')[0]} ({g.qr_token})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scan Result Feedback Card */}
        {scanMessage && (
          <div className={`p-4 sm:p-5 rounded-2xl border-2 sm:border-3 border-[#1C1917] shadow-hard ${
            scanMessage.type === 'success' 
              ? 'bg-emerald-100 text-emerald-950' 
              : scanMessage.type === 'already' 
              ? 'bg-amber-100 text-amber-950' 
              : 'bg-rose-100 text-rose-950'
          }`}>
            <div className="flex items-start gap-3">
              {scanMessage.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-700 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700 shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="font-bold text-xs sm:text-sm">
                  {scanMessage.text}
                </h4>

                {lastScannedGuest && (
                  <div className="mt-2 pt-2 border-t border-stone-300 text-xs space-y-1">
                    <div>Nama: <strong>{lastScannedGuest.name}</strong></div>
                    <div>Kategori: <strong>{lastScannedGuest.category.toUpperCase()}</strong></div>
                    <div>Nomor Meja: <strong>{lastScannedGuest.table_number || 'Bebas'}</strong></div>
                    <div>Kuota Pax: <strong>{lastScannedGuest.allocated_pax} Orang</strong></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
