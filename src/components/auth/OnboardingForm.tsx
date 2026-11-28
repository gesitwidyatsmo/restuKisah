'use client';

import { useState, useEffect, useActionState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Link2,
  Loader2,
  MapPin,
  Sparkles,
  Wallet,
} from 'lucide-react';
import {
  checkSlugAvailabilityAction,
  createWeddingOnboardingAction,
  type OnboardingActionState,
} from '@/app/actions/onboarding';
import { normalizeSlug } from '@/lib/auth/validation';

interface OnboardingFormProps {
  userName: string;
}

const BUDGET_PRESETS = [
  { label: '50 Jt', value: 50000000 },
  { label: '100 Jt', value: 100000000 },
  { label: '150 Jt', value: 150000000 },
  { label: '250 Jt', value: 250000000 },
];

export default function OnboardingForm({ userName }: OnboardingFormProps) {
  const [groomNickname, setGroomNickname] = useState('');
  const [brideNickname, setBrideNickname] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [targetBudget, setTargetBudget] = useState('100000000');
  const [slugCheck, setSlugCheck] = useState<{
    checking: boolean;
    available?: boolean;
    message?: string;
  }>({ checking: false });

  const [state, formAction, isPending] = useActionState<
    OnboardingActionState | undefined,
    FormData
  >(createWeddingOnboardingAction, undefined);

  // Auto-generate slug dari panggilan sebelum user menyunting slug secara manual
  useEffect(() => {
    if (slugTouched) return;
    const g = groomNickname.trim();
    const b = brideNickname.trim();
    if (!g && !b) return;
    const generated = normalizeSlug([b, g].filter(Boolean).join('-'));
    const timer = setTimeout(() => {
      setSlug(generated);
    }, 0);
    return () => clearTimeout(timer);
  }, [groomNickname, brideNickname, slugTouched]);

  // Debounced availability check
  useEffect(() => {
    const clean = normalizeSlug(slug);
    if (!clean || clean.length < 3) {
      const clearTimer = setTimeout(() => {
        setSlugCheck({ checking: false });
      }, 0);
      return () => clearTimeout(clearTimer);
    }

    const timer = setTimeout(async () => {
      setSlugCheck({ checking: true });
      const res = await checkSlugAvailabilityAction(clean);
      setSlugCheck({
        checking: false,
        available: res.available,
        message: res.available
          ? `Tersedia: restukisah.id/${res.slug}`
          : res.error,
      });
    }, 350);

    return () => clearTimeout(timer);
  }, [slug]);

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-5">
      <div className="p-3.5 rounded-2xl bg-rose-50 border-2 border-[#1C1917] flex items-center gap-2.5 text-xs font-semibold text-stone-800">
        <Sparkles className="w-4 h-4 text-rose-600 shrink-0" />
        <span>
          Halo <strong>{userName}</strong>! Lengkapi data pasangan untuk menyiapkan
          Checklist KUA, Budget, dan link undangan pribadi Anda.
        </span>
      </div>

      {state?.error && (
        <div className="p-3.5 rounded-2xl bg-rose-100 border-2 border-[#1C1917] shadow-hard-sm flex items-start gap-2.5 text-xs font-bold text-rose-950">
          <AlertCircle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
          <span>{state.error}</span>
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label
              htmlFor="bride-name"
              className="block text-xs font-bold text-stone-700 uppercase mb-1"
            >
              Nama Lengkap Mempelai Wanita *
            </label>
            <input
              id="bride-name"
              name="brideName"
              type="text"
              required
              minLength={2}
              placeholder="Contoh: Nadia Kusuma"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border-2 border-[#1C1917] rounded-xl bg-white shadow-hard-sm focus:outline-none min-h-[44px]"
            />
          </div>

          <div>
            <label
              htmlFor="bride-nickname"
              className="block text-xs font-bold text-stone-700 uppercase mb-1"
            >
              Panggilan Mempelai Wanita *
            </label>
            <input
              id="bride-nickname"
              name="brideNickname"
              type="text"
              required
              value={brideNickname}
              onChange={(e) => setBrideNickname(e.target.value)}
              placeholder="Contoh: Nadia"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border-2 border-[#1C1917] rounded-xl bg-white shadow-hard-sm focus:outline-none min-h-[44px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label
              htmlFor="groom-name"
              className="block text-xs font-bold text-stone-700 uppercase mb-1"
            >
              Nama Lengkap Mempelai Pria *
            </label>
            <input
              id="groom-name"
              name="groomName"
              type="text"
              required
              minLength={2}
              placeholder="Contoh: Arya Pratama"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border-2 border-[#1C1917] rounded-xl bg-white shadow-hard-sm focus:outline-none min-h-[44px]"
            />
          </div>

          <div>
            <label
              htmlFor="groom-nickname"
              className="block text-xs font-bold text-stone-700 uppercase mb-1"
            >
              Panggilan Mempelai Pria *
            </label>
            <input
              id="groom-nickname"
              name="groomNickname"
              type="text"
              required
              value={groomNickname}
              onChange={(e) => setGroomNickname(e.target.value)}
              placeholder="Contoh: Arya"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border-2 border-[#1C1917] rounded-xl bg-white shadow-hard-sm focus:outline-none min-h-[44px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label
              htmlFor="wedding-date"
              className="block text-xs font-bold text-stone-700 uppercase mb-1"
            >
              Tanggal Rencana Akad / Acara *
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
              <input
                id="wedding-date"
                name="weddingDate"
                type="date"
                required
                min={minDate}
                className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm border-2 border-[#1C1917] rounded-xl bg-white shadow-hard-sm focus:outline-none min-h-[44px]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="location-city"
              className="block text-xs font-bold text-stone-700 uppercase mb-1"
            >
              Kota Pelaksanaan *
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
              <input
                id="location-city"
                name="locationCity"
                type="text"
                required
                placeholder="Contoh: Yogyakarta"
                className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm border-2 border-[#1C1917] rounded-xl bg-white shadow-hard-sm focus:outline-none min-h-[44px]"
              />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="target-budget"
            className="block text-xs font-bold text-stone-700 uppercase mb-1"
          >
            Target Anggaran Pernikahan (Rp)
          </label>
          <div className="relative">
            <Wallet className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
            <input
              id="target-budget"
              name="targetBudget"
              type="number"
              min={0}
              step={500000}
              value={targetBudget}
              onChange={(e) => setTargetBudget(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-mono font-bold border-2 border-[#1C1917] rounded-xl bg-white shadow-hard-sm focus:outline-none min-h-[44px]"
            />
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {BUDGET_PRESETS.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => setTargetBudget(String(preset.value))}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border border-[#1C1917] transition-colors ${
                  Number(targetBudget) === preset.value
                    ? 'bg-emerald-200 text-emerald-950'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                Rp {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="wedding-slug"
            className="block text-xs font-bold text-stone-700 uppercase mb-1"
          >
            Slug Tautan Undangan Unik *
          </label>
          <div className="relative">
            <Link2 className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
            <input
              id="wedding-slug"
              name="slug"
              type="text"
              required
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(normalizeSlug(e.target.value));
              }}
              placeholder="nadia-arya"
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-mono font-bold border-2 border-[#1C1917] rounded-xl bg-white shadow-hard-sm focus:outline-none min-h-[44px]"
            />
          </div>

          <div className="mt-1.5 min-h-[20px] flex items-center gap-1.5 text-[11px] font-bold">
            {slugCheck.checking ? (
              <span className="text-stone-500 flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                Mengecek ketersediaan slug...
              </span>
            ) : slugCheck.message ? (
              <span
                className={`flex items-center gap-1 ${
                  slugCheck.available ? 'text-emerald-700' : 'text-rose-700'
                }`}
              >
                {slugCheck.available ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5" />
                )}
                <span>{slugCheck.message}</span>
              </span>
            ) : (
              <span className="text-stone-500">
                Pratinjau URL: restukisah.id/{slug || 'nama-pasangan'}
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending || slugCheck.available === false}
          className="w-full py-3.5 px-5 text-xs sm:text-sm font-bold bg-rose-400 text-[#1C1917] border-2 border-[#1C1917] rounded-xl shadow-hard btn-pressable flex items-center justify-center gap-2 min-h-[48px] disabled:opacity-60"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Menyiapkan Proyek Pernikahan...</span>
            </>
          ) : (
            <>
              <span>Buat Proyek & Masuk Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
