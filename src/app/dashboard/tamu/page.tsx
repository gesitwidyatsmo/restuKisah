'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/dashboard/Header';
import { useDashboard } from '@/components/dashboard/DashboardContext';
import { Guest, GuestCategory } from '@/types/database';
import { formatWeddingDateIndo } from '@/lib/wedding-data-service';
import { getClientActionOrigin, normalizeIndonesianPhone } from '@/lib/auth/validation';
import {
  Users,
  MessageCircle,
  QrCode,
  Search,
  Plus,
  UserCheck,
} from 'lucide-react';

const GUEST_CATEGORIES: Array<{ value: 'all' | GuestCategory; label: string }> = [
  { value: 'all', label: 'Semua' },
  { value: 'vip', label: 'VIP' },
  { value: 'keluarga', label: 'Keluarga' },
  { value: 'sahabat', label: 'Sahabat' },
  { value: 'teman_kantor', label: 'Teman Kantor' },
  { value: 'tetangga', label: 'Tetangga' },
  { value: 'umum', label: 'Umum' },
];

export default function TamuPage() {
  const { guests, wedding, stats, addGuest } = useDashboard();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeQrGuest, setActiveQrGuest] = useState<Guest | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestPhone, setNewGuestPhone] = useState('');
  const [newGuestCategory, setNewGuestCategory] = useState<GuestCategory>('umum');
  const [newGuestPax, setNewGuestPax] = useState<number>(2);
  const [newGuestTable, setNewGuestTable] = useState('');

  const handleCreateGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim()) return;

    const normalizedPhone = normalizeIndonesianPhone(newGuestPhone);

    await addGuest({
      name: newGuestName.trim(),
      phone: normalizedPhone || undefined,
      category: newGuestCategory,
      allocated_pax: newGuestPax || 1,
      table_number: newGuestTable.trim() || undefined,
    });

    setNewGuestName('');
    setNewGuestPhone('');
    setNewGuestPax(2);
    setNewGuestTable('');
    setShowAddModal(false);
  };

  const filteredGuests = guests.filter((g) => {
    const matchSearch =
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      (g.phone && g.phone.includes(search));
    const matchCat = selectedCategory === 'all' || g.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const formattedEventDate = formatWeddingDateIndo(wedding.wedding_date, 'long');

  const generateWhatsAppUrl = (guest: Guest) => {
    const origin = getClientActionOrigin();
    const inviteLink = `${origin}/${wedding.slug}?to=${encodeURIComponent(guest.name)}&t=${encodeURIComponent(guest.qr_token)}`;
    const brideLabel = wedding.bride_nickname || wedding.bride_name;
    const groomLabel = wedding.groom_nickname || wedding.groom_name;

    const message = [
      `Kepada Yth. ${guest.name},`,
      '',
      'Tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami:',
      '',
      `*${wedding.bride_name} & ${wedding.groom_name}*`,
      `${formattedEventDate} • ${wedding.location_city}`,
      '',
      'Berikut tautan undangan resmi beserta informasi acara & tiket masuk:',
      inviteLink,
      '',
      'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila berkenan hadir dan memberikan doa restu.',
      '',
      'Terima kasih.',
      `*${brideLabel} & ${groomLabel}*`,
    ].join('\n');

    const cleanPhone = normalizeIndonesianPhone(guest.phone || '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  const totalPax = stats.totalAllocatedPax;

  return (
    <div>
      <Header
        title="Daftar Tamu & WhatsApp Blast"
        subtitle="Kelola buku tamu, generator pesan WhatsApp personal, kuota pax, dan tiket QR Code."
      />

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-5 sm:space-y-6">
        <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-5 sm:p-6 shadow-hard flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 border border-[#1C1917] text-xs font-bold text-purple-800 mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>
                {guests.length} Undangan • Kuota: {totalPax} Pax • {stats.checkedInGuests} Check-in
                Live
              </span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917]">
              Buku Tamu Digital & Presensi Resepsi
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              Setiap tamu memiliki tautan personal dan token QR Code unik untuk check-in di lokasi acara.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="w-full sm:w-auto px-4 py-2.5 bg-rose-400 text-[#1C1917] font-bold text-xs border-2 border-[#1C1917] rounded-xl shadow-hard-sm btn-pressable flex items-center justify-center gap-1.5 min-h-[44px]"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Tamu</span>
            </button>

            <Link
              href={`/${wedding.slug}/check-in`}
              className="w-full sm:w-auto px-4 py-2.5 bg-purple-300 text-[#1C1917] font-bold text-xs border-2 border-[#1C1917] rounded-xl shadow-hard-sm btn-pressable flex items-center justify-center gap-2 min-h-[44px]"
            >
              <QrCode className="w-4 h-4" />
              <span>Buka Scanner Meja Resepsi</span>
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Cari nama atau nomor WhatsApp tamu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs font-medium border-2 border-[#1C1917] rounded-xl bg-white shadow-hard-sm focus:outline-none min-h-[44px]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1.5">
            {GUEST_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all shrink-0 min-h-[38px] ${
                  selectedCategory === cat.value
                    ? 'bg-rose-300 border-[#1C1917] shadow-hard-sm text-[#1C1917]'
                    : 'bg-white border-stone-300 text-stone-700 hover:border-[#1C1917]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {filteredGuests.length === 0 ? (
          <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-8 text-center text-xs font-medium text-stone-600 shadow-hard">
            {guests.length === 0
              ? 'Belum ada tamu undangan tercatat. Klik "Tambah Tamu" untuk mulai membuat daftar tamu.'
              : 'Tidak ada tamu yang cocok dengan pencarian atau filter kategori.'}
          </div>
        ) : (
          <>
            <div className="block md:hidden space-y-3">
              {filteredGuests.map((guest) => {
                const isAttending = guest.rsvp?.status === 'attending';

                return (
                  <div
                    key={guest.id}
                    className="bg-white border-2 border-[#1C1917] rounded-2xl p-4 shadow-hard-sm space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-sm text-[#1C1917]">{guest.name}</h3>
                        <div className="text-[11px] font-mono text-stone-600 mt-0.5">
                          {guest.phone || 'Nomor WhatsApp belum diisi'}
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#1C1917] shrink-0 ${
                          guest.category === 'vip'
                            ? 'bg-purple-200 text-purple-900'
                            : guest.category === 'keluarga'
                              ? 'bg-blue-200 text-blue-900'
                              : 'bg-stone-200 text-stone-800'
                        }`}
                      >
                        {guest.category.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs py-2 border-y border-stone-200">
                      <div className="text-stone-700">
                        Kuota: <strong>{guest.allocated_pax} Pax</strong> • Meja:{' '}
                        <strong>{guest.table_number || 'Bebas'}</strong>
                      </div>
                      <div className="flex items-center gap-1">
                        {guest.is_checked_in && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-200 border border-[#1C1917] text-purple-950">
                            <UserCheck className="w-3 h-3 text-purple-800" /> Hadir
                          </span>
                        )}
                        {guest.rsvp ? (
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#1C1917] ${
                              isAttending
                                ? 'bg-emerald-200 text-emerald-900'
                                : 'bg-rose-200 text-rose-900'
                            }`}
                          >
                            {isAttending
                              ? `RSVP (${guest.rsvp.confirmed_pax} Pax)`
                              : 'Berhalangan'}
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 border border-[#1C1917] text-stone-600">
                            Menunggu RSVP
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => setActiveQrGuest(guest)}
                        className="py-2.5 rounded-xl border-2 border-[#1C1917] bg-white text-stone-800 font-bold text-xs shadow-hard-sm flex items-center justify-center gap-1.5 btn-pressable min-h-[44px]"
                      >
                        <QrCode className="w-4 h-4 text-purple-700" />
                        <span>Tiket QR</span>
                      </button>

                      <a
                        href={generateWhatsAppUrl(guest)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 rounded-xl border-2 border-[#1C1917] bg-emerald-400 text-emerald-950 font-bold text-xs shadow-hard-sm flex items-center justify-center gap-1.5 btn-pressable min-h-[44px]"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Kirim WA</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="hidden md:block bg-white border-2 border-[#1C1917] rounded-2xl shadow-hard overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#FAF8F5] border-b-2 border-[#1C1917] text-xs font-bold text-[#1C1917]">
                      <th className="p-4">Nama Tamu & Kategori</th>
                      <th className="p-4">Kontak WhatsApp</th>
                      <th className="p-4">Pax / Meja</th>
                      <th className="p-4">Status RSVP</th>
                      <th className="p-4 text-right">Aksi Undangan & QR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 text-xs">
                    {filteredGuests.map((guest) => {
                      const isAttending = guest.rsvp?.status === 'attending';

                      return (
                        <tr key={guest.id} className="hover:bg-stone-50/80 transition-colors">
                          <td className="p-4">
                            <div className="font-bold text-sm text-[#1C1917]">{guest.name}</div>
                            <span
                              className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#1C1917] mt-1 ${
                                guest.category === 'vip'
                                  ? 'bg-purple-200 text-purple-900'
                                  : guest.category === 'keluarga'
                                    ? 'bg-blue-200 text-blue-900'
                                    : 'bg-stone-200 text-stone-800'
                              }`}
                            >
                              {guest.category.toUpperCase()}
                            </span>
                          </td>

                          <td className="p-4 font-mono font-medium text-stone-700">
                            {guest.phone || '-'}
                          </td>

                          <td className="p-4">
                            <div className="font-bold text-stone-800">
                              {guest.allocated_pax} Pax
                            </div>
                            <div className="text-[11px] text-stone-500">
                              {guest.table_number || 'Bebas'}
                            </div>
                          </td>

                          <td className="p-4">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {guest.is_checked_in && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-200 border border-[#1C1917] text-purple-950">
                                  <UserCheck className="w-3 h-3 text-purple-800" /> Hadir
                                </span>
                              )}
                              {guest.rsvp ? (
                                <span
                                  className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full border border-[#1C1917] ${
                                    isAttending
                                      ? 'bg-emerald-200 text-emerald-900'
                                      : 'bg-rose-200 text-rose-900'
                                  }`}
                                >
                                  {isAttending
                                    ? `Hadir (${guest.rsvp.confirmed_pax} Pax)`
                                    : 'Berhalangan'}
                                </span>
                              ) : (
                                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-stone-100 border border-[#1C1917] text-stone-600">
                                  Menunggu RSVP
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setActiveQrGuest(guest)}
                                className="px-3 py-1.5 rounded-lg border border-[#1C1917] bg-white text-stone-800 font-bold hover:bg-stone-100 shadow-hard-sm flex items-center gap-1.5 btn-pressable min-h-[38px]"
                              >
                                <QrCode className="w-3.5 h-3.5 text-purple-700" />
                                <span>QR Tiket</span>
                              </button>

                              <a
                                href={generateWhatsAppUrl(guest)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 rounded-lg border border-[#1C1917] bg-emerald-400 text-emerald-950 font-bold shadow-hard-sm flex items-center gap-1.5 btn-pressable min-h-[38px]"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>Kirim WA</span>
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white border-3 border-[#1C1917] rounded-3xl p-6 max-w-md w-full shadow-hard-xl">
              <div className="flex items-center justify-between pb-3 border-b-2 border-stone-200 mb-4">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917] flex items-center gap-2">
                  <Users className="w-5 h-5 text-rose-500" />
                  <span>Tambah Tamu Undangan</span>
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-stone-500 hover:text-stone-900 font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={(e) => void handleCreateGuest(e)} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Nama Tamu / Pasangan *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso & Partner"
                    value={newGuestName}
                    onChange={(e) => setNewGuestName(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border-2 border-[#1C1917] rounded-xl focus:outline-none min-h-[42px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                      Kategori
                    </label>
                    <select
                      value={newGuestCategory}
                      onChange={(e) => setNewGuestCategory(e.target.value as GuestCategory)}
                      className="w-full px-3 py-2 text-xs font-bold border-2 border-[#1C1917] rounded-xl bg-white focus:outline-none min-h-[42px]"
                    >
                      <option value="umum">Umum</option>
                      <option value="vip">VIP</option>
                      <option value="keluarga">Keluarga</option>
                      <option value="sahabat">Sahabat</option>
                      <option value="teman_kantor">Teman Kantor</option>
                      <option value="tetangga">Tetangga</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                      Alokasi Pax
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={newGuestPax}
                      onChange={(e) => setNewGuestPax(Number(e.target.value))}
                      className="w-full px-3.5 py-2 text-xs border-2 border-[#1C1917] rounded-xl focus:outline-none min-h-[42px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                      Nomor WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="08123456789"
                      value={newGuestPhone}
                      onChange={(e) => setNewGuestPhone(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs border-2 border-[#1C1917] rounded-xl focus:outline-none min-h-[42px]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                      Nomor Meja
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Meja A-1"
                      value={newGuestTable}
                      onChange={(e) => setNewGuestTable(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs border-2 border-[#1C1917] rounded-xl focus:outline-none min-h-[42px]"
                    />
                  </div>
                </div>

                <div className="pt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-2.5 text-xs font-bold border-2 border-[#1C1917] rounded-xl bg-stone-100 hover:bg-stone-200"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 text-xs font-bold border-2 border-[#1C1917] rounded-xl bg-rose-400 text-[#1C1917] shadow-hard-sm btn-pressable"
                  >
                    Simpan Tamu
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeQrGuest && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white border-3 border-[#1C1917] rounded-3xl p-6 max-w-sm w-full shadow-hard-xl text-center">
              <div className="w-12 h-12 rounded-2xl bg-purple-200 border-2 border-[#1C1917] shadow-hard-sm flex items-center justify-center mx-auto mb-3">
                <QrCode className="w-6 h-6 text-[#1C1917]" />
              </div>

              <h3 className="font-serif text-xl font-bold text-[#1C1917]">
                Tiket Masuk Resepsi
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Tamu: <strong className="text-stone-900">{activeQrGuest.name}</strong> (
                {activeQrGuest.allocated_pax} Pax)
              </p>

              <div className="my-5 p-4 bg-[#FAF8F5] border-2 border-[#1C1917] rounded-2xl inline-block shadow-hard-sm">
                <div className="w-36 h-36 bg-white border border-[#1C1917] p-2 flex flex-col items-center justify-center font-mono text-center">
                  <QrCode className="w-28 h-28 text-stone-900" />
                  <span className="text-[10px] font-bold text-stone-500 mt-1 break-all">
                    {activeQrGuest.qr_token}
                  </span>
                </div>
              </div>

              <div className="text-xs text-stone-600 mb-4">
                Meja:{' '}
                <span className="font-bold text-stone-900">
                  {activeQrGuest.table_number || 'Reguler'}
                </span>{' '}
                • Tunjukkan di Meja Tamu
              </div>

              <button
                onClick={() => setActiveQrGuest(null)}
                className="w-full py-3 text-xs font-bold border-2 border-[#1C1917] rounded-xl bg-stone-200 hover:bg-stone-300 btn-pressable min-h-[44px]"
              >
                Tutup Jendela
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
