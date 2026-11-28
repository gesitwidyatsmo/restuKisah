'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Camera,
} from 'lucide-react';
import { Guest, Wedding } from '@/types/database';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { checkInGuestRemote } from '@/lib/wedding-data-service';

export default function PublicSlugCheckInPage() {
  const params = useParams();
  const slug = (params?.slug as string) || '';

  const [weddingInfo, setWeddingInfo] = useState<Wedding | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [inputToken, setInputToken] = useState('');
  const [lastScannedGuest, setLastScannedGuest] = useState<Guest | null>(null);
  const [scanMessage, setScanMessage] = useState<{
    type: 'success' | 'error' | 'already';
    text: string;
  } | null>(null);

  const loadGuestsAndWedding = useCallback(async () => {
    if (!slug || !isSupabaseConfigured()) {
      setLoadError('Konfigurasi Supabase belum tersedia.');
      setIsLoading(false);
      return;
    }

    const supabase = createClient();
    const { data: wedding, error: weddingErr } = await supabase
      .from('weddings')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (weddingErr || !wedding) {
      setLoadError('Proyek pernikahan tidak ditemukan atau Anda tidak memiliki akses.');
      setIsLoading(false);
      return;
    }

    setWeddingInfo(wedding as Wedding);

    const { data: guestRows } = await supabase
      .from('guests')
      .select('*, rsvp:rsvps(*)')
      .eq('wedding_id', wedding.id)
      .order('created_at', { ascending: false });

    if (guestRows) {
      setGuests(guestRows as Guest[]);
    }
    setIsLoading(false);
  }, [slug]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadGuestsAndWedding();
    }, 0);
    return () => clearTimeout(timer);
  }, [loadGuestsAndWedding]);

  const handleScanToken = async (tokenToScan: string) => {
    const token = tokenToScan.trim();
    if (!token || !weddingInfo) return;

    const result = await checkInGuestRemote(weddingInfo.id, token);

    if (!result.success) {
      if (result.already && result.guest) {
        setScanMessage({ type: 'already', text: result.message });
        setLastScannedGuest(result.guest);
      } else {
        setScanMessage({ type: 'error', text: result.message });
        setLastScannedGuest(null);
      }
      return;
    }

    if (result.guest) {
      setLastScannedGuest(result.guest);
      setScanMessage({ type: 'success', text: result.message });
    }
    setInputToken('');
    await loadGuestsAndWedding();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-xs font-bold text-stone-600">
        Memuat Portal Meja Resepsi...
      </div>
    );
  }

  if (loadError || !weddingInfo) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border-2 border-[#1C1917] rounded-3xl p-6 text-center shadow-hard space-y-3">
          <h1 className="font-serif text-xl font-bold text-[#1C1917]">
            Akses Portal Meja Tamu
          </h1>
          <p className="text-xs text-stone-600">{loadError}</p>
          <Link
            href="/login"
            className="inline-flex px-4 py-2.5 text-xs font-bold bg-rose-400 text-[#1C1917] border-2 border-[#1C1917] rounded-xl shadow-hard-sm"
          >
            Masuk Akun Pengelola
          </Link>
        </div>
      </div>
    );
  }

  const totalGuests = guests.length;
  const checkedInCount = guests.filter((g) => g.is_checked_in).length;
  const totalCheckedInPax = guests
    .filter((g) => g.is_checked_in)
    .reduce((acc, curr) => acc + (curr.rsvp?.confirmed_pax || curr.allocated_pax || 1), 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] p-3.5 sm:p-6 lg:p-8 overflow-x-hidden">
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between gap-2">
          <Link
            href="/dashboard/tamu"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 border-[#1C1917] bg-white text-xs font-bold shadow-hard-sm btn-pressable min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Dashboard</span>
          </Link>

          <span className="text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full bg-purple-200 border border-[#1C1917] text-purple-900">
            Meja Resepsi Live
          </span>
        </div>

        <div className="bg-white border-2 sm:border-3 border-[#1C1917] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-hard sm:shadow-hard-lg text-center">
          <h1 className="font-serif text-xl sm:text-3xl font-bold text-[#1C1917]">
            Meja Resepsi: {weddingInfo.bride_nickname || weddingInfo.bride_name} &{' '}
            {weddingInfo.groom_nickname || weddingInfo.groom_name}
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Masukkan token QR Code tamu untuk validasi kehadiran di lokasi acara.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-5">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-100 border-2 border-[#1C1917] shadow-hard-sm">
              <span className="text-[10px] sm:text-xs font-bold text-stone-600 uppercase block mb-1">
                Tamu Hadir
              </span>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-emerald-900">
                {checkedInCount}{' '}
                <span className="text-xs sm:text-sm font-sans text-stone-600">
                  / {totalGuests}
                </span>
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

        <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-4 sm:p-6 shadow-hard space-y-4">
          <div className="flex items-center justify-between pb-2.5 border-b-2 border-stone-200">
            <h3 className="font-bold text-xs sm:text-sm text-[#1C1917] flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-purple-600" />
              <span>Verifikasi Token Meja Tamu</span>
            </h3>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void handleScanToken(inputToken);
            }}
            className="flex flex-col sm:flex-row gap-2"
          >
            <input
              type="text"
              placeholder="Masukkan QR Token Tamu"
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

          {guests.length > 0 && (
            <div className="pt-1">
              <span className="text-[10px] sm:text-[11px] font-bold text-stone-500 block mb-1.5">
                Daftar Tamu Terdaftar:
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {guests.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => void handleScanToken(g.qr_token)}
                    className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg border border-[#1C1917] shadow-hard-sm btn-pressable min-h-[34px] ${
                      g.is_checked_in
                        ? 'bg-stone-200 text-stone-600'
                        : 'bg-rose-100 text-[#1C1917]'
                    }`}
                  >
                    {g.name} ({g.qr_token})
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {scanMessage && (
          <div
            className={`p-4 sm:p-5 rounded-2xl border-2 sm:border-3 border-[#1C1917] shadow-hard ${
              scanMessage.type === 'success'
                ? 'bg-emerald-100 text-emerald-950'
                : scanMessage.type === 'already'
                  ? 'bg-amber-100 text-amber-950'
                  : 'bg-rose-100 text-rose-950'
            }`}
          >
            <div className="flex items-start gap-3">
              {scanMessage.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-700 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700 shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="font-bold text-xs sm:text-sm">{scanMessage.text}</h4>

                {lastScannedGuest && (
                  <div className="mt-2 pt-2 border-t border-stone-300 text-xs space-y-1">
                    <div>
                      Nama: <strong>{lastScannedGuest.name}</strong>
                    </div>
                    <div>
                      Kategori: <strong>{lastScannedGuest.category.toUpperCase()}</strong>
                    </div>
                    <div>
                      Nomor Meja: <strong>{lastScannedGuest.table_number || 'Bebas'}</strong>
                    </div>
                    <div>
                      Kuota Pax: <strong>{lastScannedGuest.allocated_pax} Orang</strong>
                    </div>
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
