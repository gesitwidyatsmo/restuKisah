'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Clock, 
  Volume2, 
  VolumeX, 
  CreditCard, 
  Copy, 
  Check, 
  Send, 
  Sparkles, 
  QrCode
} from 'lucide-react';
import { mockWedding, mockWishes } from '@/lib/mock-data';
import { Wish } from '@/types/database';

function InvitationContent() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get('to') || 'Tamu Undangan';

  const [isOpen, setIsOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);
  
  // RSVP Form States
  const [rsvpStatus, setRsvpStatus] = useState<'attending' | 'declined'>('attending');
  const [paxCount, setPaxCount] = useState(2);
  const [senderName, setSenderName] = useState(guestName !== 'Tamu Undangan' ? guestName : '');
  const [messageText, setMessageText] = useState('');
  const [wishesList, setWishesList] = useState<Wish[]>(mockWishes);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    setIsPlayingMusic(true);
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('1234567890');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleSubmitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newWish: Wish = {
      id: `wsh-${Date.now()}`,
      wedding_id: mockWedding.id,
      sender_name: senderName || 'Sahabat Mempelai',
      relationship: 'Tamu Undangan',
      message: messageText,
      created_at: new Date().toISOString(),
    };

    setWishesList([newWish, ...wishesList]);
    setMessageText('');

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] selection:bg-rose-200 overflow-x-hidden">
      {/* 1. COVER AMPLOP MEWAH (Dgn min-h-[100dvh] untuk Mobile Browser Ergonomics) */}
      {!isOpen ? (
        <div className="fixed inset-0 z-50 bg-[#FAF8F5] flex flex-col items-center justify-center p-4 min-h-[100dvh]">
          <div className="max-w-md w-full bg-white border-2 sm:border-3 border-[#1C1917] rounded-3xl p-6 sm:p-8 text-center shadow-hard-lg sm:shadow-hard-xl relative overflow-hidden">
            {/* Wax Seal Stamp */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-rose-400 border-2 border-[#1C1917] shadow-hard flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-[#1C1917] fill-rose-600" />
            </div>

            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-stone-500 block mb-2">
              Undangan Pernikahan
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] mb-2">
              {mockWedding.bride_nickname} & {mockWedding.groom_nickname}
            </h1>
            <p className="text-xs text-stone-600 font-medium mb-5 sm:mb-6">
              Sabtu, 19 Desember 2026 • Bandung
            </p>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-rose-50 border-2 border-[#1C1917] shadow-hard-sm mb-6 sm:mb-8">
              <span className="text-[10px] sm:text-[11px] font-bold text-stone-500 uppercase block mb-1">
                Kepada Yth. Bapak/Ibu/Saudara/i:
              </span>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917]">
                {guestName}
              </h2>
            </div>

            <button
              onClick={handleOpenEnvelope}
              className="w-full py-3.5 sm:py-4 text-xs sm:text-sm font-bold bg-rose-400 text-[#1C1917] border-2 border-[#1C1917] rounded-2xl shadow-hard btn-pressable flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Buka Undangan</span>
            </button>
          </div>
        </div>
      ) : null}

      {/* 2. KONTEN UTAMA UNDANGAN (SETELAH DIBUKA) */}
      <div className="max-w-xl mx-auto px-4 py-8 sm:py-12 space-y-12 sm:space-y-16">
        {/* Floating Music Button */}
        <button
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-[#1C1917] shadow-hard flex items-center justify-center btn-pressable min-h-[44px] min-w-[44px]"
          title={isPlayingMusic ? 'Heningkan Musik' : 'Putar Musik'}
          aria-label="Toggle musik"
        >
          {isPlayingMusic ? (
            <Volume2 className="w-5 h-5 text-rose-600 animate-pulse" />
          ) : (
            <VolumeX className="w-5 h-5 text-stone-500" />
          )}
        </button>

        {/* Hero Section */}
        <div className="text-center bg-white border-2 sm:border-3 border-[#1C1917] rounded-3xl p-6 sm:p-8 shadow-hard sm:shadow-hard-lg">
          <div className="inline-block px-3 py-1 rounded-full bg-rose-100 border border-[#1C1917] text-xs font-bold text-rose-800 mb-3 sm:mb-4">
            The Wedding Celebration
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] mb-2 sm:mb-3">
            {mockWedding.bride_name}
            <span className="block text-xl sm:text-2xl font-sans font-normal my-1 text-rose-500">&</span>
            {mockWedding.groom_name}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            Dengan penuh rasa syukur dan memohon ridho Tuhan Yang Maha Esa, kami mengundang Anda untuk hadir di hari bahagia kami.
          </p>
        </div>

        {/* Detail Acara Akad & Resepsi */}
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center">
            <h2 className="font-serif text-2xl font-bold text-[#1C1917]">
              Waktu & Lokasi Acara
            </h2>
          </div>

          <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-5 sm:p-6 shadow-hard text-center">
            <div className="w-10 h-10 rounded-xl bg-amber-200 border-2 border-[#1C1917] shadow-hard-sm flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-5 h-5 text-[#1C1917]" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917] mb-1">
              Akad Nikah
            </h3>
            <div className="text-xs font-bold text-amber-800 mb-2 sm:mb-3">
              Pukul 08.00 - 10.00 WIB
            </div>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              Grand Ballroom Horison, Ruang Utama Lt. 2<br />
              Jl. Dr. Setiabudi No. 120, Bandung
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-2 border-[#1C1917] rounded-xl bg-[#FAF8F5] shadow-hard-sm btn-pressable min-h-[44px]"
            >
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Buka Google Maps</span>
            </a>
          </div>

          <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-5 sm:p-6 shadow-hard text-center">
            <div className="w-10 h-10 rounded-xl bg-rose-300 border-2 border-[#1C1917] shadow-hard-sm flex items-center justify-center mx-auto mb-3">
              <Clock className="w-5 h-5 text-[#1C1917]" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917] mb-1">
              Resepsi Pernikahan
            </h3>
            <div className="text-xs font-bold text-rose-800 mb-2 sm:mb-3">
              Pukul 11.00 - 14.00 WIB
            </div>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              Grand Ballroom Horison Bandung<br />
              Ramah Tamah & Jamuan Makan Siang
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-2 border-[#1C1917] rounded-xl bg-[#FAF8F5] shadow-hard-sm btn-pressable min-h-[44px]"
            >
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Buka Google Maps</span>
            </a>
          </div>
        </div>

        {/* Tiket Masuk & QR Code Presensi Tamu */}
        <div className="bg-purple-100 border-2 sm:border-3 border-[#1C1917] rounded-3xl p-5 sm:p-6 shadow-hard text-center">
          <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#1C1917] shadow-hard-sm flex items-center justify-center mx-auto mb-3">
            <QrCode className="w-5 h-5 text-purple-700" />
          </div>
          <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917] mb-1">
            Tiket Masuk & Presensi Meja Tamu
          </h2>
          <p className="text-xs text-stone-700 mb-4">
            Tunjukkan kode QR ini ke petugas meja penerima tamu di lokasi acara untuk akses souvenir dan buku tamu digital.
          </p>

          <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-4 inline-block shadow-hard-sm my-2">
            <div className="w-32 h-32 sm:w-36 sm:h-36 bg-stone-50 border border-[#1C1917] p-2 flex flex-col items-center justify-center font-mono text-center mx-auto">
              <QrCode className="w-24 h-24 sm:w-28 sm:h-28 text-stone-900" />
              <span className="text-[9px] font-bold text-stone-600 mt-1">
                TOKEN-{guestName.replace(/\s+/g, '').toUpperCase().slice(0, 8)}
              </span>
            </div>
            <div className="mt-2 text-xs font-bold text-stone-800">
              {guestName}
            </div>
          </div>
        </div>

        {/* Amplop Digital & Kado */}
        <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-5 sm:p-6 shadow-hard text-center">
          <div className="w-10 h-10 rounded-xl bg-emerald-200 border-2 border-[#1C1917] shadow-hard-sm flex items-center justify-center mx-auto mb-3">
            <CreditCard className="w-5 h-5 text-emerald-800" />
          </div>
          <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917] mb-1">
            Tanda Kasih / Amplop Digital
          </h2>
          <p className="text-xs text-stone-600 mb-4 sm:mb-5">
            Doa restu Anda adalah karunia terindah bagi kami. Bagi yang berkenan memberikan tanda kasih secara cashless:
          </p>

          <div className="p-3.5 sm:p-4 rounded-xl bg-[#FAF8F5] border-2 border-[#1C1917] shadow-hard-sm max-w-sm mx-auto text-left mb-4">
            <span className="text-xs font-bold text-blue-700 block">Bank BCA</span>
            <div className="font-mono text-base font-bold text-[#1C1917] mt-0.5">
              1234 5678 90
            </div>
            <div className="text-xs text-stone-600 mt-0.5">
              a.n. Bayu Pratama
            </div>

            <button
              onClick={handleCopyAccount}
              className="mt-3 w-full py-2.5 bg-white text-[#1C1917] text-xs font-bold border-2 border-[#1C1917] rounded-xl shadow-hard-sm btn-pressable flex items-center justify-center gap-1.5 min-h-[44px]"
            >
              {copiedBank ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedBank ? 'Nomor Rekening Tersalin!' : 'Salin Nomor Rekening'}</span>
            </button>
          </div>
        </div>

        {/* Konfirmasi Kehadiran (RSVP) & Ucapan Doa */}
        <div className="bg-white border-2 sm:border-3 border-[#1C1917] rounded-3xl p-5 sm:p-8 shadow-hard sm:shadow-hard-lg">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] text-center mb-1">
            Konfirmasi Kehadiran & Doa Restu
          </h2>
          <p className="text-xs text-stone-600 text-center mb-5 sm:mb-6">
            Mohon konfirmasikan kehadiran Anda untuk membantu persiapan catering kami.
          </p>

          <form onSubmit={handleSubmitWish} className="space-y-3.5 sm:space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Nama Lengkap Anda
              </label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Nama Anda"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border-2 border-[#1C1917] rounded-xl focus:outline-none min-h-[44px]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Kehadiran
                </label>
                <select
                  value={rsvpStatus}
                  onChange={(e) => setRsvpStatus(e.target.value as any)}
                  className="w-full px-3 py-2.5 text-xs font-bold border-2 border-[#1C1917] rounded-xl focus:outline-none bg-white min-h-[44px]"
                >
                  <option value="attending">✓ Ya, Saya Hadir</option>
                  <option value="declined">✕ Mohon Maaf, Berhalangan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Jumlah Orang (Pax)
                </label>
                <select
                  value={paxCount}
                  onChange={(e) => setPaxCount(Number(e.target.value))}
                  className="w-full px-3 py-2.5 text-xs font-bold border-2 border-[#1C1917] rounded-xl focus:outline-none bg-white min-h-[44px]"
                >
                  <option value={1}>1 Orang</option>
                  <option value={2}>2 Orang</option>
                  <option value={3}>3 Orang</option>
                  <option value={4}>4 Orang</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Ucapan & Doa untuk Mempelai
              </label>
              <textarea
                required
                rows={3}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Tuliskan harapan dan doa terbaik Anda..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border-2 border-[#1C1917] rounded-xl focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-rose-400 text-[#1C1917] font-bold text-xs sm:text-sm border-2 border-[#1C1917] rounded-xl shadow-hard btn-pressable flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Send className="w-4 h-4" />
              <span>Kirim Konfirmasi & Ucapan</span>
            </button>
          </form>

          {/* Live Wishes Feed */}
          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t-2 border-stone-200 space-y-3">
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#1C1917] mb-2 sm:mb-3">
              Doa & Ucapan ({wishesList.length})
            </h3>

            <div className="space-y-2.5 sm:space-y-3 max-h-80 overflow-y-auto pr-1">
              {wishesList.map((wish) => (
                <div 
                  key={wish.id}
                  className="p-3 sm:p-3.5 rounded-xl bg-[#FAF8F5] border-2 border-[#1C1917] shadow-hard-sm"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-[#1C1917]">
                      {wish.sender_name}
                    </span>
                    <span className="text-[10px] text-stone-500">
                      Baru saja
                    </span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {wish.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4 sm:py-6 text-xs text-stone-500 font-medium">
          Dibuat dengan cinta menggunakan <strong className="text-stone-800">RestuKisah</strong> • Wedding Operating System
        </div>
      </div>
    </div>
  );
}

export default function PublicInvitationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-sm">Memuat Undangan RestuKisah...</div>}>
      <InvitationContent />
    </Suspense>
  );
}
