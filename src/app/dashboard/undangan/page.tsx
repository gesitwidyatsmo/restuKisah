'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/dashboard/Header';
import { mockWedding } from '@/lib/mock-data';
import { 
  Sparkles, 
  ExternalLink, 
  Music, 
  CreditCard, 
  Save, 
  Check 
} from 'lucide-react';

export default function UndanganSettingsPage() {
  const [theme, setTheme] = useState('soft_neobrutalism');
  const [bankName, setBankName] = useState('BCA');
  const [accountNumber, setAccountNumber] = useState('1234567890');
  const [accountHolder, setAccountHolder] = useState('Bayu Pratama');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <Header 
        title="Pengaturan Undangan Digital" 
        subtitle="Sesuaikan tema tampilan, musik pengiring, kisah cinta, dan rekening amplop digital."
      />

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-5 sm:space-y-6">
        {/* Top Preview Banner */}
        <div className="bg-rose-200 border-2 border-[#1C1917] rounded-2xl p-5 sm:p-6 shadow-hard flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#1C1917] text-[11px] sm:text-xs font-bold text-rose-800 mb-2 shadow-hard-sm">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>Status Undangan: Publik & Siap Disebar</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917]">
              Undangan Digital Dian & Bayu
            </h2>
            <p className="text-xs text-stone-700 mt-0.5 truncate">
              URL: <strong className="font-mono">restukisah.id/{mockWedding.slug}</strong>
            </p>
          </div>

          <Link
            href={`/demo/${mockWedding.slug}`}
            target="_blank"
            className="w-full md:w-auto px-5 py-3 bg-white text-[#1C1917] font-bold text-xs border-2 border-[#1C1917] rounded-xl shadow-hard btn-pressable flex items-center justify-center gap-2 shrink-0 min-h-[44px]"
          >
            <ExternalLink className="w-4 h-4 text-rose-600" />
            <span>Lihat Pratinjau Undangan</span>
          </Link>
        </div>

        {/* Form Settings Grid */}
        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          {/* Kolom 1: Pilihan Tema */}
          <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-5 sm:p-6 shadow-hard space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#1C1917] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Pilihan Tema Undangan</span>
            </h3>

            <div className="space-y-2.5">
              {[
                { id: 'soft_neobrutalism', name: 'Soft Neobrutalism (Default)', desc: 'Desain modern ceria dengan hard shadow dan palet linen blush.' },
                { id: 'classic_luxury', name: 'Classic Royal Elegance', desc: 'Nuansa emas champagne, serif mewah, dan ornamen klasik.' },
                { id: 'rustic_botanical', name: 'Minimalist Botanical', desc: 'Nuansa hijau sage, daun eucalyptus, dan elemen alam.' },
              ].map((t) => (
                <div
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`p-3 rounded-xl border-2 transition-all cursor-pointer ${
                    theme === t.id
                      ? 'border-[#1C1917] bg-rose-100 shadow-hard-sm'
                      : 'border-stone-300 bg-[#FAF8F5] hover:border-[#1C1917]'
                  }`}
                >
                  <div className="font-bold text-xs sm:text-sm text-[#1C1917]">
                    {t.name}
                  </div>
                  <div className="text-[11px] text-stone-600 mt-0.5">
                    {t.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kolom 2: Rekening Amplop Digital */}
          <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-5 sm:p-6 shadow-hard space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#1C1917] flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-blue-600" />
              <span>Amplop Digital / Angpao</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">
                  Nama Bank / e-Wallet
                </label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-[#1C1917] rounded-xl focus:outline-none min-h-[44px]"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">
                  Nomor Rekening
                </label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-[#1C1917] rounded-xl focus:outline-none font-mono min-h-[44px]"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">
                  Nama Pemilik Rekening
                </label>
                <input
                  type="text"
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-[#1C1917] rounded-xl focus:outline-none min-h-[44px]"
                />
              </div>
            </div>
          </div>

          {/* Kolom 3: Musik & Lokasi */}
          <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-5 sm:p-6 shadow-hard space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#1C1917] flex items-center gap-2">
              <Music className="w-4 h-4 text-purple-600" />
              <span>Audio Latar & Lokasi</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">
                  Musik Latar (Audio URL)
                </label>
                <input
                  type="text"
                  defaultValue="https://example.com/audio/beautiful-in-white.mp3"
                  className="w-full px-3 py-2.5 border-2 border-[#1C1917] rounded-xl focus:outline-none text-stone-600 min-h-[44px]"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">
                  Venue Akad & Resepsi
                </label>
                <textarea
                  rows={3}
                  defaultValue="Grand Horison Ballroom, Jl. Dr. Setiabudi No. 120, Sukasari, Bandung"
                  className="w-full px-3 py-2 border-2 border-[#1C1917] rounded-xl focus:outline-none text-stone-700"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-rose-400 text-[#1C1917] font-bold text-xs border-2 border-[#1C1917] rounded-xl shadow-hard-sm btn-pressable flex items-center justify-center gap-2 mt-4 min-h-[44px]"
              >
                {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                <span>{saved ? 'Perubahan Tersimpan!' : 'Simpan Pengaturan'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
