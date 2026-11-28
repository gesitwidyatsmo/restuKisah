'use client';

import { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import {
  Heart,
  Calendar,
  MapPin,
  Volume2,
  VolumeX,
  CreditCard,
  Copy,
  Check,
  Send,
  Sparkles,
  QrCode,
} from 'lucide-react';
import { Wish } from '@/types/database';
import { getWeddingInvitationBySlug } from '@/lib/invitation-service';
import { FullWeddingInvitationPayload } from '@/types/wedding-invitation';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

const JavaneseParchmentTemplate = dynamic(
  () => import('@/components/templates/JavaneseParchmentTemplate'),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center font-serif text-[#8C6D46] font-bold">
        Memuat Undangan...
      </div>
    ),
  }
);

function PublicSlugInvitationContent() {
  const params = useParams();
  const slug = (params?.slug as string) || '';
  const searchParams = useSearchParams();
  const guestName = searchParams.get('to') || 'Tamu Undangan';
  const guestTokenParam = searchParams.get('t') || '';

  const [invitationData, setInvitationData] = useState<FullWeddingInvitationPayload | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [copiedBankId, setCopiedBankId] = useState<string | null>(null);

  const [rsvpStatus, setRsvpStatus] = useState<'attending' | 'declined'>('attending');
  const [paxCount, setPaxCount] = useState(2);
  const [senderName, setSenderName] = useState(
    guestName !== 'Tamu Undangan' ? guestName : ''
  );
  const [messageText, setMessageText] = useState('');
  const [wishesList, setWishesList] = useState<Wish[]>([]);

  useEffect(() => {
    let isMounted = true;
    getWeddingInvitationBySlug(slug, { allowDemoFallback: false }).then(async (data) => {
      if (!isMounted) return;
      setInvitationData(data);

      if (data && isSupabaseConfigured()) {
        const supabase = createClient();
        const { data: wishesRows } = await supabase
          .from('wishes')
          .select('*')
          .eq('wedding_id', data.weddingId)
          .order('created_at', { ascending: false });

        if (isMounted && wishesRows) {
          setWishesList(wishesRows as Wish[]);
        }
      }

      if (isMounted) setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handlePersistWish = async (name: string, message: string) => {
    if (!invitationData || !isSupabaseConfigured()) return;
    const supabase = createClient();
    const { data: inserted } = await supabase
      .from('wishes')
      .insert({
        wedding_id: invitationData.weddingId,
        sender_name: name.trim(),
        relationship: 'Tamu Undangan',
        message: message.trim(),
      })
      .select('*')
      .maybeSingle();

    if (inserted) {
      setWishesList((prev) => [inserted as Wish, ...prev]);
    }
  };

  const handlePersistRsvp = async (
    name: string,
    status: 'attending' | 'declined',
    pax: number,
    message?: string
  ) => {
    if (!invitationData || !isSupabaseConfigured()) return;
    const supabase = createClient();

    if (guestTokenParam) {
      const { data: guest } = await supabase
        .from('guests')
        .select('id')
        .eq('wedding_id', invitationData.weddingId)
        .eq('qr_token', guestTokenParam)
        .maybeSingle();

      if (guest?.id) {
        await supabase.from('rsvps').upsert(
          {
            guest_id: guest.id,
            status,
            confirmed_pax: status === 'attending' ? pax : 0,
            message: message || '',
            submitted_at: new Date().toISOString(),
          },
          { onConflict: 'guest_id' }
        );
      }
    }

    if (message && message.trim()) {
      await handlePersistWish(name, message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center font-serif text-stone-700 font-bold">
        Memuat Undangan...
      </div>
    );
  }

  if (!invitationData) {
    return (
      <div className="min-h-screen bg-canvas-pattern flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border-2 border-[#1C1917] rounded-3xl p-8 text-center shadow-hard space-y-4">
          <h1 className="font-serif text-2xl font-bold text-[#1C1917]">
            Undangan Tidak Ditemukan
          </h1>
          <p className="text-xs text-stone-600">
            Tautan undangan <code>/{slug}</code> belum terdaftar atau sudah diarsipkan.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold bg-rose-400 text-[#1C1917] border-2 border-[#1C1917] rounded-xl shadow-hard-sm"
          >
            Kembali ke Beranda RestuKisah
          </Link>
        </div>
      </div>
    );
  }

  if (invitationData.templateSettings.themeId === 'jawa_parchment') {
    return (
      <JavaneseParchmentTemplate
        invitationData={invitationData}
        guestName={guestName}
        coupleTitle={invitationData.couples.coupleTitle}
        weddingDate={invitationData.weddingDateFormatted}
        heroImage={invitationData.couples.coupleHeroPhoto}
        wishes={wishesList.map((w) => ({
          id: w.id,
          senderName: w.sender_name,
          message: w.message,
          timestamp: new Date(w.created_at).toLocaleDateString('id-ID'),
        }))}
        onRsvpSubmit={async (data) => {
          await handlePersistRsvp(
            data.name,
            data.attendance === 'hadir' ? 'attending' : 'declined',
            data.pax,
            data.message
          );
        }}
        onAddWish={async (wish) => {
          await handlePersistWish(wish.senderName, wish.message);
        }}
      />
    );
  }

  const handleCopyAccount = (accountNumber: string, bankId: string) => {
    void navigator.clipboard.writeText(accountNumber);
    setCopiedBankId(bankId);
    setTimeout(() => setCopiedBankId(null), 2000);
  };

  const handleSubmitNonJawaWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    const currentSender = senderName.trim() || guestName || 'Tamu Undangan';
    await handlePersistRsvp(currentSender, rsvpStatus, paxCount, messageText);
    setMessageText('');
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] selection:bg-rose-200 overflow-x-hidden">
      {!isOpen && (
        <div className="fixed inset-0 z-50 bg-[#FAF8F5] flex flex-col items-center justify-center p-4 min-h-[100dvh]">
          <div className="max-w-md w-full bg-white border-2 sm:border-3 border-[#1C1917] rounded-3xl p-6 sm:p-8 text-center shadow-hard-lg sm:shadow-hard-xl">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-rose-400 border-2 border-[#1C1917] shadow-hard flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-[#1C1917] fill-rose-600" />
            </div>

            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-stone-500 block mb-2">
              Undangan Pernikahan
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] mb-2">
              {invitationData.couples.coupleTitle}
            </h1>
            <p className="text-xs text-stone-600 font-medium mb-5 sm:mb-6">
              {invitationData.weddingDateFormatted}
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
              onClick={() => {
                setIsOpen(true);
                setIsPlayingMusic(true);
              }}
              className="w-full py-3.5 sm:py-4 text-xs sm:text-sm font-bold bg-rose-400 text-[#1C1917] border-2 border-[#1C1917] rounded-2xl shadow-hard btn-pressable flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Buka Undangan</span>
            </button>
          </div>
        </div>
      )}

      <div className="max-w-xl mx-auto px-4 py-8 sm:py-12 space-y-12 sm:space-y-16">
        <button
          onClick={() => setIsPlayingMusic((prev) => !prev)}
          className="fixed bottom-5 right-5 z-40 w-11 h-11 rounded-full bg-white border-2 border-[#1C1917] shadow-hard flex items-center justify-center btn-pressable"
          title={isPlayingMusic ? 'Heningkan Musik' : 'Putar Musik'}
        >
          {isPlayingMusic ? (
            <Volume2 className="w-5 h-5 text-rose-600 animate-pulse" />
          ) : (
            <VolumeX className="w-5 h-5 text-stone-500" />
          )}
        </button>

        <div className="text-center bg-white border-2 sm:border-3 border-[#1C1917] rounded-3xl p-6 sm:p-8 shadow-hard">
          <div className="inline-block px-3 py-1 rounded-full bg-rose-100 border border-[#1C1917] text-xs font-bold text-rose-800 mb-3">
            The Wedding Celebration
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] mb-2">
            {invitationData.couples.bride.fullName}
            <span className="block text-xl sm:text-2xl font-sans font-normal my-1 text-rose-500">
              &
            </span>
            {invitationData.couples.groom.fullName}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-medium mt-3">
            {invitationData.weddingDateFormatted}
          </p>
        </div>

        {invitationData.events.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#1C1917] text-center">
              Waktu & Lokasi Acara
            </h2>
            {invitationData.events.map((ev) => (
              <div
                key={ev.id}
                className="bg-white border-2 border-[#1C1917] rounded-2xl p-5 shadow-hard text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-200 border-2 border-[#1C1917] shadow-hard-sm flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-5 h-5 text-[#1C1917]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] mb-1">
                  {ev.title}
                </h3>
                <div className="text-xs font-bold text-amber-800 mb-2">
                  {ev.date} • {ev.time}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  <strong>{ev.venueName}</strong>
                  <br />
                  {ev.address}
                </p>
                {ev.googleMapsUrl && (
                  <a
                    href={ev.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-2 border-[#1C1917] rounded-xl bg-[#FAF8F5] shadow-hard-sm btn-pressable"
                  >
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>Buka Google Maps</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {guestTokenParam && (
          <div className="bg-purple-100 border-2 border-[#1C1917] rounded-3xl p-6 shadow-hard text-center">
            <h2 className="font-serif text-lg font-bold text-[#1C1917] mb-2">
              Tiket Presensi Meja Tamu
            </h2>
            <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-4 inline-block shadow-hard-sm">
              <QrCode className="w-24 h-24 text-stone-900 mx-auto" />
              <div className="font-mono text-[10px] font-bold text-stone-600 mt-2">
                {guestTokenParam}
              </div>
              <div className="text-xs font-bold text-stone-900 mt-1">{guestName}</div>
            </div>
          </div>
        )}

        {invitationData.paymentMethods.bankAccounts.length > 0 && (
          <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-5 shadow-hard text-center space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-200 border-2 border-[#1C1917] shadow-hard-sm flex items-center justify-center mx-auto">
              <CreditCard className="w-5 h-5 text-emerald-800" />
            </div>
            <h2 className="font-serif text-lg font-bold text-[#1C1917]">
              Tanda Kasih / Amplop Digital
            </h2>
            {invitationData.paymentMethods.bankAccounts.map((bank) => (
              <div
                key={bank.id}
                className="p-4 rounded-xl bg-[#FAF8F5] border-2 border-[#1C1917] shadow-hard-sm max-w-sm mx-auto text-left"
              >
                <span className="text-xs font-bold text-blue-700 uppercase block">
                  {bank.bankName}
                </span>
                <div className="font-mono text-base font-bold text-[#1C1917] mt-0.5">
                  {bank.accountNumber}
                </div>
                <div className="text-xs text-stone-600 mt-0.5">
                  a.n. {bank.accountHolder}
                </div>
                <button
                  onClick={() => handleCopyAccount(bank.accountNumber, bank.id)}
                  className="mt-3 w-full py-2.5 bg-white text-[#1C1917] text-xs font-bold border-2 border-[#1C1917] rounded-xl shadow-hard-sm btn-pressable flex items-center justify-center gap-1.5"
                >
                  {copiedBankId === bank.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {copiedBankId === bank.id
                      ? 'Nomor Rekening Tersalin!'
                      : 'Salin Nomor Rekening'}
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="bg-white border-2 sm:border-3 border-[#1C1917] rounded-3xl p-5 sm:p-8 shadow-hard">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] text-center mb-1">
            Konfirmasi Kehadiran & Doa Restu
          </h2>
          <p className="text-xs text-stone-600 text-center mb-5">
            Mohon konfirmasikan kehadiran dan tuliskan doa terbaik Anda.
          </p>

          <form onSubmit={(e) => void handleSubmitNonJawaWish(e)} className="space-y-4">
            <input
              type="text"
              required
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Nama Lengkap Anda"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border-2 border-[#1C1917] rounded-xl focus:outline-none min-h-[44px]"
            />

            <div className="grid grid-cols-2 gap-3">
              <select
                value={rsvpStatus}
                onChange={(e) =>
                  setRsvpStatus(e.target.value as 'attending' | 'declined')
                }
                className="w-full px-3 py-2.5 text-xs font-bold border-2 border-[#1C1917] rounded-xl bg-white min-h-[44px]"
              >
                <option value="attending">✓ Hadir</option>
                <option value="declined">✕ Berhalangan</option>
              </select>

              <select
                value={paxCount}
                onChange={(e) => setPaxCount(Number(e.target.value))}
                className="w-full px-3 py-2.5 text-xs font-bold border-2 border-[#1C1917] rounded-xl bg-white min-h-[44px]"
              >
                <option value={1}>1 Orang</option>
                <option value={2}>2 Orang</option>
                <option value={3}>3 Orang</option>
                <option value={4}>4 Orang</option>
              </select>
            </div>

            <textarea
              required
              rows={3}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Tuliskan doa dan ucapan Anda..."
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border-2 border-[#1C1917] rounded-xl focus:outline-none"
            />

            <button
              type="submit"
              className="w-full py-3.5 bg-rose-400 text-[#1C1917] font-bold text-xs sm:text-sm border-2 border-[#1C1917] rounded-xl shadow-hard btn-pressable flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Send className="w-4 h-4" />
              <span>Kirim Konfirmasi & Ucapan</span>
            </button>
          </form>

          <div className="mt-6 pt-5 border-t-2 border-stone-200 space-y-3">
            <h3 className="font-serif text-base font-bold text-[#1C1917]">
              Doa & Ucapan ({wishesList.length})
            </h3>
            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {wishesList.map((wish) => (
                <div
                  key={wish.id}
                  className="p-3 rounded-xl bg-[#FAF8F5] border-2 border-[#1C1917] shadow-hard-sm"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-[#1C1917]">
                      {wish.sender_name}
                    </span>
                    <span className="text-[10px] text-stone-500">
                      {new Date(wish.created_at).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">{wish.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PublicSlugInvitationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-bold text-sm">
          Memuat Undangan RestuKisah...
        </div>
      }
    >
      <PublicSlugInvitationContent />
    </Suspense>
  );
}
