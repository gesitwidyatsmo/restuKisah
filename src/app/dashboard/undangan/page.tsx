'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/dashboard/Header';
import { useDashboard } from '@/components/dashboard/DashboardContext';
import { FullWeddingInvitationPayload } from '@/types/wedding-invitation';
import {
  buildEmptyInvitationPayload,
  getWeddingInvitationBySlug,
  saveWeddingInvitationData,
} from '@/lib/invitation-service';
import { ParticleEffectType } from '@/components/effects/FallingParticlesCanvas';
import { getClientActionOrigin, normalizeIndonesianPhone } from '@/lib/auth/validation';
import {
  Sparkles,
  ExternalLink,
  CreditCard,
  Save,
  Check,
  Users,
  Calendar,
  Plus,
  Trash2,
  Radio,
  Copy,
  Palette,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

type UndanganTab = 'theme' | 'couple' | 'events' | 'gifts' | 'guide';

const TABS: Array<{ id: UndanganTab; label: string; icon: typeof Palette }> = [
  { id: 'theme', label: 'Tema & Tampilan', icon: Palette },
  { id: 'couple', label: 'Kedua Mempelai', icon: Users },
  { id: 'events', label: 'Rangkaian Acara', icon: Calendar },
  { id: 'gifts', label: 'Amplop & Kado', icon: CreditCard },
  { id: 'guide', label: 'Panduan & Live', icon: Radio },
];

export default function UndanganSettingsPage() {
  const { wedding } = useDashboard();
  const [activeTab, setActiveTab] = useState<UndanganTab>('theme');
  const [formData, setFormData] = useState<FullWeddingInvitationPayload>(() =>
    buildEmptyInvitationPayload(wedding)
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    getWeddingInvitationBySlug(wedding.slug, {
      allowDemoFallback: false,
      fallbackWedding: wedding,
    }).then((data) => {
      if (isMounted) {
        if (data) {
          setFormData(data);
        }
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [wedding]);

  const handleCopyLink = () => {
    const origin = getClientActionOrigin();
    void navigator.clipboard.writeText(`${origin}/${formData.slug || wedding.slug}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage(null);

    const payloadToSave: FullWeddingInvitationPayload = {
      ...formData,
      paymentMethods: {
        ...formData.paymentMethods,
        confirmationWaNumber: normalizeIndonesianPhone(
          formData.paymentMethods.confirmationWaNumber || ''
        ),
      },
    };

    const result = await saveWeddingInvitationData(wedding.id, payloadToSave, {
      syncLocalDemoCache: false,
      fallbackWeddingDate: wedding.wedding_date,
    });

    setIsSaving(false);
    if (result.success) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } else {
      setErrorMessage(result.error || 'Gagal menyimpan ke Supabase');
    }
  };

  const handleAddEvent = () => {
    const newEvent = {
      id: `ev-${Date.now()}`,
      title: formData.events.length === 0 ? 'Akad Nikah' : 'Resepsi Pernikahan',
      subtitle: 'WEDDING CELEBRATION',
      date: wedding.wedding_date.slice(0, 10),
      time: '08.00 - 10.00 WIB',
      venueName: '',
      address: '',
      image: '/templates/jawa/events/event-akad.webp',
      googleMapsUrl: '',
    };
    setFormData((prev) => ({
      ...prev,
      events: [...prev.events, newEvent],
    }));
  };

  const handleRemoveEvent = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      events: prev.events.filter((e) => e.id !== id),
    }));
  };

  const handleUpdateEvent = (index: number, field: string, val: string) => {
    setFormData((prev) => {
      const updated = [...prev.events];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, events: updated };
    });
  };

  const handleAddBank = () => {
    const newBank = {
      id: `bank-${Date.now()}`,
      bankName: 'bca',
      bankTitleBadge:
        formData.paymentMethods.bankAccounts.length === 0
          ? 'Transfer Bank Utama'
          : 'Rekening Pasangan',
      accountNumber: '',
      accountHolder: formData.couples.groom.fullName || wedding.groom_name,
    };
    setFormData((prev) => ({
      ...prev,
      paymentMethods: {
        ...prev.paymentMethods,
        bankAccounts: [...prev.paymentMethods.bankAccounts, newBank],
      },
    }));
  };

  const handleRemoveBank = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethods: {
        ...prev.paymentMethods,
        bankAccounts: prev.paymentMethods.bankAccounts.filter((b) => b.id !== id),
      },
    }));
  };

  const handleUpdateBank = (index: number, field: string, val: string) => {
    setFormData((prev) => {
      const updated = [...prev.paymentMethods.bankAccounts];
      updated[index] = { ...updated[index], [field]: val };
      return {
        ...prev,
        paymentMethods: { ...prev.paymentMethods, bankAccounts: updated },
      };
    });
  };

  if (isLoading) {
    return (
      <div>
        <Header
          title="Pengaturan Undangan Digital"
          subtitle="Memuat konfigurasi template dan data undangan..."
        />
        <div className="p-8 text-center font-bold text-stone-600">
          Memuat data pengaturan...
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <Header
        title="Pengaturan Undangan Digital"
        subtitle="Kelola tema undangan, data kedua mempelai, jadwal acara akad/resepsi, dan rekening amplop digital."
      />

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        <div className="bg-amber-100 border-2 sm:border-3 border-[#1C1917] rounded-3xl p-5 sm:p-7 shadow-hard flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#1C1917] text-xs font-bold text-amber-900 mb-2 shadow-hard-sm">
              <Sparkles
                className="w-3.5 h-3.5 text-amber-600 animate-spin"
                style={{ animationDuration: '4s' }}
              />
              <span>
                Tema Aktif:{' '}
                {formData.templateSettings.themeId === 'jawa_parchment'
                  ? 'Adat Jawa Keraton (Parchment)'
                  : formData.templateSettings.themeId === 'classic_luxury'
                    ? 'Classic Royal Elegance'
                    : 'Soft Neobrutalism Modern'}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
              {formData.couples.coupleTitle || formData.title}
            </h2>
            <div className="flex items-center gap-2 mt-1 text-xs text-stone-700">
              <span>Link Publik:</span>
              <strong className="font-mono bg-white px-2 py-0.5 rounded-lg border border-[#1C1917] text-amber-950">
                /{formData.slug || wedding.slug}
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 relative z-10">
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-4 py-3 bg-white text-[#1C1917] font-bold text-xs border-2 border-[#1C1917] rounded-2xl shadow-hard btn-pressable flex items-center justify-center gap-1.5 min-h-[44px]"
            >
              {copiedLink ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4 text-stone-700" />
              )}
              <span>{copiedLink ? 'Link Tersalin!' : 'Salin Link'}</span>
            </button>

            <Link
              href={`/${formData.slug || wedding.slug}`}
              target="_blank"
              className="px-5 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-[#1C1917] font-bold text-xs border-2 border-[#1C1917] rounded-2xl shadow-hard btn-pressable flex items-center justify-center gap-2 min-h-[44px]"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Lihat Pratinjau Live</span>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all border-2 border-[#1C1917] min-h-[44px] ${
                  isActive
                    ? 'bg-rose-400 text-[#1C1917] shadow-hard'
                    : 'bg-white text-stone-700 hover:bg-stone-50 shadow-hard-sm'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {savedSuccess && (
          <div className="p-4 bg-emerald-100 border-2 border-[#1C1917] rounded-2xl shadow-hard flex items-center gap-3 text-emerald-950 font-bold text-xs sm:text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>Pengaturan undangan berhasil disimpan dan disinkronkan ke database!</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 bg-rose-100 border-2 border-[#1C1917] rounded-2xl shadow-hard flex items-center gap-3 text-rose-950 font-bold text-xs sm:text-sm">
            <AlertCircle className="w-5 h-5 text-rose-700 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={(e) => void handleSave(e)} className="space-y-6">
          {activeTab === 'theme' && (
            <div className="space-y-6">
              <div className="bg-white border-2 sm:border-3 border-[#1C1917] rounded-3xl p-5 sm:p-7 shadow-hard space-y-5">
                <h3 className="font-serif text-xl font-bold text-[#1C1917] flex items-center gap-2">
                  <Palette className="w-5 h-5 text-amber-600" />
                  <span>Pilihan Desain & Tema Undangan</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      id: 'jawa_parchment',
                      name: 'Adat Jawa Keraton (Parchment)',
                      tag: 'Rekomendasi Adat Jawa',
                      desc: 'Desain mewah adat Jawa dengan ornamen gebyok kayu jati, bedhol kayon gunungan, bunga melati emas, dan iringan gamelan.',
                      badgeBg: 'bg-amber-200 text-amber-900',
                    },
                    {
                      id: 'soft_neobrutalism',
                      name: 'Soft Neobrutalism Modern',
                      tag: 'Modern Pop',
                      desc: 'Desain modern ceria dengan hard shadow tegas, palet linen blush, dan tombol pressable taktil.',
                      badgeBg: 'bg-rose-200 text-rose-900',
                    },
                    {
                      id: 'classic_luxury',
                      name: 'Classic Royal Elegance',
                      tag: 'Elegan Minimalis',
                      desc: 'Nuansa emas champagne, serif anggun, dan dekorasi monogram inisial nama mempelai.',
                      badgeBg: 'bg-stone-200 text-stone-900',
                    },
                  ].map((t) => (
                    <div
                      key={t.id}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          templateSettings: { ...prev.templateSettings, themeId: t.id },
                        }))
                      }
                      className={`p-4 rounded-2xl border-2 sm:border-3 transition-all cursor-pointer flex flex-col justify-between ${
                        formData.templateSettings.themeId === t.id
                          ? 'border-[#1C1917] bg-amber-50 shadow-hard'
                          : 'border-stone-300 bg-white hover:border-[#1C1917]'
                      }`}
                    >
                      <div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border border-[#1C1917] ${t.badgeBg} inline-block mb-2`}
                        >
                          {t.tag}
                        </span>
                        <div className="font-bold text-sm text-[#1C1917] mb-1">{t.name}</div>
                        <p className="text-xs text-stone-600 leading-relaxed">{t.desc}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs font-bold">
                        <span>
                          {formData.templateSettings.themeId === t.id
                            ? '✓ Tema Dipilih'
                            : 'Pilih Tema'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {formData.templateSettings.themeId === 'jawa_parchment' && (
                <div className="bg-white border-2 sm:border-3 border-[#1C1917] rounded-3xl p-5 sm:p-7 shadow-hard space-y-5">
                  <h3 className="font-serif text-lg font-bold text-[#1C1917] flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <span>Konfigurasi Efek Visual Adat Jawa</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-stone-700 uppercase mb-1.5">
                        Mode Sampul Pembuka (Cover)
                      </label>
                      <select
                        value={formData.templateSettings.coverMode}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            templateSettings: {
                              ...prev.templateSettings,
                              coverMode: e.target.value as 'adat_jawa_cover' | 'classic_arch',
                            },
                          }))
                        }
                        className="w-full px-3.5 py-2.5 font-bold border-2 border-[#1C1917] rounded-xl focus:outline-none bg-white min-h-[44px]"
                      >
                        <option value="adat_jawa_cover">
                          Gebyok Kayu Penuh (Teatrikal Bedhol Kayon)
                        </option>
                        <option value="classic_arch">Bingkai Kartu Arch Klasik</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-stone-700 uppercase mb-1.5">
                        Efek Partikel Latar (Falling Particles)
                      </label>
                      <select
                        value={formData.templateSettings.particleEffect}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            templateSettings: {
                              ...prev.templateSettings,
                              particleEffect: e.target.value as ParticleEffectType,
                            },
                          }))
                        }
                        className="w-full px-3.5 py-2.5 font-bold border-2 border-[#1C1917] rounded-xl focus:outline-none bg-white min-h-[44px]"
                      >
                        <option value="pink_blossoms">
                          Kelopak Bunga Sakura / Melati (Pink Blossoms)
                        </option>
                        <option value="gold_butterflies">
                          Kupu-Kupu Emas Keraton (Gold Butterflies)
                        </option>
                        <option value="white_jasmine">
                          Ronce Melati Putih (White Jasmine)
                        </option>
                        <option value="none">Tanpa Partikel</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-stone-700 uppercase mb-1.5">
                        Musik Pengiring Gamelan (Audio URL)
                      </label>
                      <input
                        type="text"
                        value={formData.templateSettings.audioUrl}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            templateSettings: {
                              ...prev.templateSettings,
                              audioUrl: e.target.value,
                            },
                          }))
                        }
                        placeholder="/templates/jawa/audio/gamelan-royal-wedding.mp3"
                        className="w-full px-3.5 py-2.5 border-2 border-[#1C1917] rounded-xl focus:outline-none font-mono min-h-[44px]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-700 uppercase mb-1.5">
                        Virtual Photo Booth Interaktif
                      </label>
                      <div className="flex items-center gap-3 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer font-bold text-xs">
                          <input
                            type="checkbox"
                            checked={formData.templateSettings.enablePhotobooth}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                templateSettings: {
                                  ...prev.templateSettings,
                                  enablePhotobooth: e.target.checked,
                                },
                              }))
                            }
                            className="w-4 h-4 rounded border-[#1C1917] text-amber-600 focus:ring-0"
                          />
                          <span>Aktifkan Fitur Photo Booth Bingkai Jawa untuk Tamu</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'couple' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border-2 sm:border-3 border-[#1C1917] rounded-3xl p-5 sm:p-7 shadow-hard space-y-4">
                <div className="flex items-center justify-between pb-3 border-b-2 border-stone-200">
                  <h3 className="font-serif text-lg font-bold text-[#1C1917] flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span>Profil Mempelai Pria (The Groom)</span>
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 border border-[#1C1917]">
                    CPP
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-stone-700 uppercase mb-1">
                      Nama Lengkap & Gelar
                    </label>
                    <input
                      type="text"
                      value={formData.couples.groom.fullName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          couples: {
                            ...prev.couples,
                            groom: { ...prev.couples.groom, fullName: e.target.value },
                          },
                        }))
                      }
                      placeholder="Nama lengkap mempelai pria"
                      className="w-full px-3.5 py-2.5 border-2 border-[#1C1917] rounded-xl focus:outline-none min-h-[44px]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-stone-700 uppercase mb-1">
                        Nama Panggilan
                      </label>
                      <input
                        type="text"
                        value={formData.couples.groom.nickname}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            couples: {
                              ...prev.couples,
                              groom: { ...prev.couples.groom, nickname: e.target.value },
                            },
                          }))
                        }
                        placeholder="Panggilan"
                        className="w-full px-3 py-2 border-2 border-[#1C1917] rounded-xl focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-stone-700 uppercase mb-1">
                        Urutan Anak
                      </label>
                      <input
                        type="text"
                        value={formData.couples.groom.relation}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            couples: {
                              ...prev.couples,
                              groom: { ...prev.couples.groom, relation: e.target.value },
                            },
                          }))
                        }
                        placeholder="Putra Pertama dari"
                        className="w-full px-3 py-2 border-2 border-[#1C1917] rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-stone-700 uppercase mb-1">
                        Nama Ayah
                      </label>
                      <input
                        type="text"
                        value={formData.couples.groom.father}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            couples: {
                              ...prev.couples,
                              groom: { ...prev.couples.groom, father: e.target.value },
                            },
                          }))
                        }
                        placeholder="Nama ayah mempelai pria"
                        className="w-full px-3 py-2 border-2 border-[#1C1917] rounded-xl focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-stone-700 uppercase mb-1">
                        Nama Ibu
                      </label>
                      <input
                        type="text"
                        value={formData.couples.groom.mother}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            couples: {
                              ...prev.couples,
                              groom: { ...prev.couples.groom, mother: e.target.value },
                            },
                          }))
                        }
                        placeholder="Nama ibu mempelai pria"
                        className="w-full px-3 py-2 border-2 border-[#1C1917] rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 uppercase mb-1">
                      Username Instagram
                    </label>
                    <input
                      type="text"
                      value={formData.couples.groom.instagram || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          couples: {
                            ...prev.couples,
                            groom: { ...prev.couples.groom, instagram: e.target.value },
                          },
                        }))
                      }
                      placeholder="username_instagram"
                      className="w-full px-3 py-2 border-2 border-[#1C1917] rounded-xl focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 sm:border-3 border-[#1C1917] rounded-3xl p-5 sm:p-7 shadow-hard space-y-4">
                <div className="flex items-center justify-between pb-3 border-b-2 border-stone-200">
                  <h3 className="font-serif text-lg font-bold text-[#1C1917] flex items-center gap-2">
                    <Users className="w-5 h-5 text-rose-500" />
                    <span>Profil Mempelai Wanita (The Bride)</span>
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 border border-[#1C1917]">
                    CPW
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-stone-700 uppercase mb-1">
                      Nama Lengkap & Gelar
                    </label>
                    <input
                      type="text"
                      value={formData.couples.bride.fullName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          couples: {
                            ...prev.couples,
                            bride: { ...prev.couples.bride, fullName: e.target.value },
                          },
                        }))
                      }
                      placeholder="Nama lengkap mempelai wanita"
                      className="w-full px-3.5 py-2.5 border-2 border-[#1C1917] rounded-xl focus:outline-none min-h-[44px]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-stone-700 uppercase mb-1">
                        Nama Panggilan
                      </label>
                      <input
                        type="text"
                        value={formData.couples.bride.nickname}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            couples: {
                              ...prev.couples,
                              bride: { ...prev.couples.bride, nickname: e.target.value },
                            },
                          }))
                        }
                        placeholder="Panggilan"
                        className="w-full px-3 py-2 border-2 border-[#1C1917] rounded-xl focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-stone-700 uppercase mb-1">
                        Urutan Anak
                      </label>
                      <input
                        type="text"
                        value={formData.couples.bride.relation}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            couples: {
                              ...prev.couples,
                              bride: { ...prev.couples.bride, relation: e.target.value },
                            },
                          }))
                        }
                        placeholder="Putri Kedua dari"
                        className="w-full px-3 py-2 border-2 border-[#1C1917] rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-stone-700 uppercase mb-1">
                        Nama Ayah
                      </label>
                      <input
                        type="text"
                        value={formData.couples.bride.father}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            couples: {
                              ...prev.couples,
                              bride: { ...prev.couples.bride, father: e.target.value },
                            },
                          }))
                        }
                        placeholder="Nama ayah mempelai wanita"
                        className="w-full px-3 py-2 border-2 border-[#1C1917] rounded-xl focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-stone-700 uppercase mb-1">
                        Nama Ibu
                      </label>
                      <input
                        type="text"
                        value={formData.couples.bride.mother}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            couples: {
                              ...prev.couples,
                              bride: { ...prev.couples.bride, mother: e.target.value },
                            },
                          }))
                        }
                        placeholder="Nama ibu mempelai wanita"
                        className="w-full px-3 py-2 border-2 border-[#1C1917] rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 uppercase mb-1">
                      Username Instagram
                    </label>
                    <input
                      type="text"
                      value={formData.couples.bride.instagram || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          couples: {
                            ...prev.couples,
                            bride: { ...prev.couples.bride, instagram: e.target.value },
                          },
                        }))
                      }
                      placeholder="username_instagram"
                      className="w-full px-3 py-2 border-2 border-[#1C1917] rounded-xl focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#1C1917]">
                    Daftar Acara Pernikahan
                  </h3>
                  <p className="text-xs text-stone-600">
                    Atur jadwal akad nikah, resepsi, hingga unduh mantu beserta peta lokasi.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddEvent}
                  className="px-4 py-2.5 bg-amber-200 text-stone-900 border-2 border-[#1C1917] rounded-xl font-bold text-xs shadow-hard-sm btn-pressable flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Acara</span>
                </button>
              </div>

              {formData.events.length === 0 ? (
                <div className="bg-white border-2 border-[#1C1917] rounded-3xl p-8 text-center text-xs text-stone-600 shadow-hard">
                  Belum ada rangkaian acara ditambahkan. Klik &ldquo;Tambah Acara&rdquo; untuk
                  memasukkan jadwal Akad Nikah dan Resepsi.
                </div>
              ) : (
                <div className="space-y-4">
                  {formData.events.map((event, index) => (
                    <div
                      key={event.id || index}
                      className="bg-white border-2 sm:border-3 border-[#1C1917] rounded-3xl p-5 sm:p-6 shadow-hard space-y-4 relative"
                    >
                      <div className="flex items-center justify-between pb-3 border-b-2 border-stone-200">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#1C1917] text-white flex items-center justify-center font-bold text-xs">
                            {index + 1}
                          </span>
                          <input
                            type="text"
                            value={event.title}
                            onChange={(e) => handleUpdateEvent(index, 'title', e.target.value)}
                            placeholder="Akad Nikah"
                            className="font-serif text-base sm:text-lg font-bold text-[#1C1917] border-b border-stone-300 focus:border-[#1C1917] focus:outline-none"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveEvent(event.id)}
                          className="text-stone-400 hover:text-rose-600 p-1.5 rounded-lg border border-transparent hover:border-rose-300 transition-colors"
                          title="Hapus Acara"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <label className="block font-bold text-stone-700 uppercase mb-1">
                            Tanggal Acara
                          </label>
                          <input
                            type="date"
                            value={/^\d{4}-\d{2}-\d{2}/.test(event.date) ? event.date.slice(0, 10) : ''}
                            onChange={(e) => handleUpdateEvent(index, 'date', e.target.value)}
                            className="w-full px-3 py-2 border-2 border-[#1C1917] rounded-xl focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-stone-700 uppercase mb-1">
                            Waktu Pelaksanaan
                          </label>
                          <input
                            type="text"
                            value={event.time}
                            onChange={(e) => handleUpdateEvent(index, 'time', e.target.value)}
                            placeholder="08.00 - 10.00 WIB"
                            className="w-full px-3 py-2 border-2 border-[#1C1917] rounded-xl focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-stone-700 uppercase mb-1">
                            Nama Gedung / Tempat
                          </label>
                          <input
                            type="text"
                            value={event.venueName}
                            onChange={(e) =>
                              handleUpdateEvent(index, 'venueName', e.target.value)
                            }
                            placeholder="Nama tempat acara"
                            className="w-full px-3 py-2 border-2 border-[#1C1917] rounded-xl focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block font-bold text-stone-700 uppercase mb-1">
                            Alamat Lengkap Venue
                          </label>
                          <input
                            type="text"
                            value={event.address}
                            onChange={(e) => handleUpdateEvent(index, 'address', e.target.value)}
                            placeholder="Alamat lengkap gedung atau masjid"
                            className="w-full px-3 py-2 border-2 border-[#1C1917] rounded-xl focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-stone-700 uppercase mb-1">
                            Tautan Google Maps
                          </label>
                          <input
                            type="url"
                            value={event.googleMapsUrl || ''}
                            onChange={(e) =>
                              handleUpdateEvent(index, 'googleMapsUrl', e.target.value)
                            }
                            placeholder="https://maps.google.com/?q=..."
                            className="w-full px-3 py-2 border-2 border-[#1C1917] rounded-xl focus:outline-none font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'gifts' && (
            <div className="space-y-6">
              <div className="bg-white border-2 sm:border-3 border-[#1C1917] rounded-3xl p-5 sm:p-7 shadow-hard space-y-4">
                <div className="flex items-center justify-between pb-3 border-b-2 border-stone-200">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#1C1917] flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <span>Rekening Bank & Amplop Digital</span>
                    </h3>
                    <p className="text-xs text-stone-600">
                      Tamu dapat menyalin nomor rekening untuk memberikan tanda kasih secara cashless.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddBank}
                    className="px-3.5 py-2 bg-blue-100 text-blue-900 border-2 border-[#1C1917] rounded-xl font-bold text-xs shadow-hard-sm btn-pressable flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Rekening</span>
                  </button>
                </div>

                {formData.paymentMethods.bankAccounts.length === 0 ? (
                  <div className="p-6 rounded-2xl border-2 border-dashed border-stone-300 text-center text-xs text-stone-600">
                    Belum ada rekening bank ditambahkan. Klik &ldquo;Tambah Rekening&rdquo; jika ingin
                    mengaktifkan fitur amplop digital.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {formData.paymentMethods.bankAccounts.map((bank, index) => (
                      <div
                        key={bank.id || index}
                        className="p-4 bg-[#FAF8F5] border-2 border-[#1C1917] rounded-2xl grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs items-center relative"
                      >
                        <div>
                          <label className="block font-bold text-stone-700 uppercase mb-1">
                            Pilihan Bank
                          </label>
                          <select
                            value={bank.bankName}
                            onChange={(e) => handleUpdateBank(index, 'bankName', e.target.value)}
                            className="w-full px-3 py-2 font-bold border-2 border-[#1C1917] rounded-xl bg-white"
                          >
                            <option value="bca">Bank BCA</option>
                            <option value="mandiri">Bank Mandiri</option>
                            <option value="bri">Bank BRI</option>
                            <option value="bni">Bank BNI</option>
                            <option value="bsi">Bank BSI</option>
                            <option value="jago">Bank Jago</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-stone-700 uppercase mb-1">
                            Nomor Rekening
                          </label>
                          <input
                            type="text"
                            value={bank.accountNumber}
                            onChange={(e) =>
                              handleUpdateBank(index, 'accountNumber', e.target.value)
                            }
                            placeholder="Masukkan nomor rekening"
                            className="w-full px-3 py-2 border-2 border-[#1C1917] rounded-xl bg-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-stone-700 uppercase mb-1">
                            Nama Pemilik Rekening
                          </label>
                          <input
                            type="text"
                            value={bank.accountHolder}
                            onChange={(e) =>
                              handleUpdateBank(index, 'accountHolder', e.target.value)
                            }
                            placeholder="Nama pemilik rekening"
                            className="w-full px-3 py-2 border-2 border-[#1C1917] rounded-xl bg-white"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex-1">
                            <label className="block font-bold text-stone-700 uppercase mb-1">
                              Label Badge
                            </label>
                            <input
                              type="text"
                              value={bank.bankTitleBadge}
                              onChange={(e) =>
                                handleUpdateBank(index, 'bankTitleBadge', e.target.value)
                              }
                              placeholder="Transfer Bank Utama"
                              className="w-full px-3 py-2 border-2 border-[#1C1917] rounded-xl bg-white text-stone-600"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveBank(bank.id)}
                            className="text-stone-400 hover:text-rose-600 mt-5 p-2 rounded-lg"
                            title="Hapus Rekening"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white border-2 sm:border-3 border-[#1C1917] rounded-3xl p-5 sm:p-7 shadow-hard space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                  Alamat Kirim Kado Fisik & WhatsApp Konfirmasi
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-stone-700 uppercase mb-1">
                      Alamat Lengkap Pengiriman Kado
                    </label>
                    <textarea
                      rows={3}
                      value={formData.paymentMethods.physicalGift?.address || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          paymentMethods: {
                            ...prev.paymentMethods,
                            physicalGift: {
                              ...prev.paymentMethods.physicalGift,
                              recipient:
                                prev.paymentMethods.physicalGift?.recipient ||
                                prev.couples.coupleTitle,
                              phone: prev.paymentMethods.physicalGift?.phone || '',
                              address: e.target.value,
                            },
                          },
                        }))
                      }
                      placeholder="Masukkan alamat pengiriman kado (opsional)"
                      className="w-full px-3.5 py-2.5 border-2 border-[#1C1917] rounded-xl focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 uppercase mb-1">
                      Nomor WhatsApp Penerima Konfirmasi Transfer
                    </label>
                    <input
                      type="text"
                      value={formData.paymentMethods.confirmationWaNumber}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          paymentMethods: {
                            ...prev.paymentMethods,
                            confirmationWaNumber: e.target.value,
                          },
                        }))
                      }
                      placeholder="081234567890"
                      className="w-full px-3.5 py-2.5 border-2 border-[#1C1917] rounded-xl focus:outline-none font-mono"
                    />
                    <p className="text-[11px] text-stone-500 mt-1">
                      Nomor diawali 08 atau 62 (otomatis dinormalisasi ke format WhatsApp 62).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="bg-white border-2 sm:border-3 border-[#1C1917] rounded-3xl p-5 sm:p-7 shadow-hard space-y-5">
              <h3 className="font-serif text-lg font-bold text-[#1C1917] flex items-center gap-2">
                <Radio className="w-5 h-5 text-purple-600" />
                <span>Live Streaming & Virtual Celebration</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1">
                    URL YouTube Live Streaming
                  </label>
                  <input
                    type="url"
                    value={formData.guestGuide.liveStreaming?.youtubeUrl || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        guestGuide: {
                          ...prev.guestGuide,
                          liveStreaming: {
                            ...prev.guestGuide.liveStreaming,
                            weddingDateText:
                              prev.guestGuide.liveStreaming?.weddingDateText || '',
                            weddingTimeText:
                              prev.guestGuide.liveStreaming?.weddingTimeText || '',
                            youtubeUrl: e.target.value,
                          },
                        },
                      }))
                    }
                    placeholder="https://www.youtube.com/live/..."
                    className="w-full px-3.5 py-2.5 border-2 border-[#1C1917] rounded-xl focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1">
                    URL Zoom Meeting
                  </label>
                  <input
                    type="url"
                    value={formData.guestGuide.liveStreaming?.zoomUrl || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        guestGuide: {
                          ...prev.guestGuide,
                          liveStreaming: {
                            ...prev.guestGuide.liveStreaming,
                            weddingDateText:
                              prev.guestGuide.liveStreaming?.weddingDateText || '',
                            weddingTimeText:
                              prev.guestGuide.liveStreaming?.weddingTimeText || '',
                            zoomUrl: e.target.value,
                          },
                        },
                      }))
                    }
                    placeholder="https://zoom.us/j/..."
                    className="w-full px-3.5 py-2.5 border-2 border-[#1C1917] rounded-xl focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1">
                    Meeting ID Zoom
                  </label>
                  <input
                    type="text"
                    value={formData.guestGuide.liveStreaming?.zoomMeetingId || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        guestGuide: {
                          ...prev.guestGuide,
                          liveStreaming: {
                            ...prev.guestGuide.liveStreaming,
                            weddingDateText:
                              prev.guestGuide.liveStreaming?.weddingDateText || '',
                            weddingTimeText:
                              prev.guestGuide.liveStreaming?.weddingTimeText || '',
                            zoomMeetingId: e.target.value,
                          },
                        },
                      }))
                    }
                    placeholder="Opsional"
                    className="w-full px-3 py-2 border-2 border-[#1C1917] rounded-xl focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1">
                    Passcode Zoom
                  </label>
                  <input
                    type="text"
                    value={formData.guestGuide.liveStreaming?.zoomPasscode || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        guestGuide: {
                          ...prev.guestGuide,
                          liveStreaming: {
                            ...prev.guestGuide.liveStreaming,
                            weddingDateText:
                              prev.guestGuide.liveStreaming?.weddingDateText || '',
                            weddingTimeText:
                              prev.guestGuide.liveStreaming?.weddingTimeText || '',
                            zoomPasscode: e.target.value,
                          },
                        },
                      }))
                    }
                    placeholder="Opsional"
                    className="w-full px-3 py-2 border-2 border-[#1C1917] rounded-xl focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-[#1C1917] py-3.5 px-4 sm:px-8 shadow-hard-lg flex items-center justify-between max-w-7xl mx-auto">
            <div className="hidden sm:block text-xs text-stone-600 font-medium">
              Pastikan seluruh data mempelai dan jadwal acara sudah sesuai sebelum disimpan.
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full sm:w-auto px-7 py-3 bg-rose-400 hover:bg-rose-500 text-[#1C1917] font-bold text-xs sm:text-sm border-2 border-[#1C1917] rounded-2xl shadow-hard btn-pressable flex items-center justify-center gap-2 min-h-[46px]"
            >
              {isSaving ? (
                <span>Menyimpan ke Supabase...</span>
              ) : savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-800" />
                  <span>Perubahan Tersimpan!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan Undangan</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
