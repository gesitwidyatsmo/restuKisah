'use client';

import { useState, useActionState } from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Phone,
  RefreshCw,
  User,
} from 'lucide-react';
import {
  registerAction,
  resendVerificationAction,
  type AuthActionState,
} from '@/app/actions/auth';
import GoogleOAuthButton from '@/components/auth/GoogleOAuthButton';

interface RegisterFormProps {
  nextPath: string;
}

export default function RegisterForm({ nextPath }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const [state, formAction, isPending] = useActionState<
    AuthActionState | undefined,
    FormData
  >(registerAction, undefined);
  const [resendState, resendFormAction, isResending] = useActionState<
    AuthActionState | undefined,
    FormData
  >(resendVerificationAction, undefined);

  const hasMinLen = passwordValue.length >= 8;
  const hasLetterAndDigit =
    /[a-zA-Z]/.test(passwordValue) && /[0-9]/.test(passwordValue);

  if (state?.requiresEmailVerification && state.email) {
    return (
      <div className="space-y-4">
        <div className="p-5 rounded-2xl bg-emerald-100 border-2 border-[#1C1917] shadow-hard-sm space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#1C1917] shadow-hard-sm flex items-center justify-center mx-auto mb-2">
            <Mail className="w-6 h-6 text-emerald-700" />
          </div>
          <h2 className="font-serif text-xl font-bold text-[#1C1917]">
            Cek Email Anda
          </h2>
          <p className="text-xs text-stone-700 leading-relaxed">
            Tautan verifikasi akun telah dikirim ke{' '}
            <strong className="text-[#1C1917]">{state.email}</strong>. Klik
            tautan tersebut untuk langsung masuk ke pengaturan pernikahan Anda.
          </p>
        </div>

        {resendState?.success && (
          <div className="p-3 rounded-xl bg-emerald-50 border-2 border-[#1C1917] text-xs font-bold text-emerald-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{resendState.success}</span>
          </div>
        )}

        {resendState?.error && (
          <div className="p-3 rounded-xl bg-rose-100 border-2 border-[#1C1917] text-xs font-bold text-rose-900 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{resendState.error}</span>
          </div>
        )}

        <form action={resendFormAction}>
          <input type="hidden" name="email" value={state.email} />
          <button
            type="submit"
            disabled={isResending}
            className="w-full py-3 px-4 text-xs font-bold bg-white text-[#1C1917] border-2 border-[#1C1917] rounded-xl shadow-hard-sm btn-pressable flex items-center justify-center gap-2 min-h-[44px] disabled:opacity-60"
          >
            {isResending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            <span>Kirim Ulang Email Verifikasi</span>
          </button>
        </form>

        <Link
          href="/login"
          className="w-full py-3 px-4 text-xs font-bold bg-rose-400 text-[#1C1917] border-2 border-[#1C1917] rounded-xl shadow-hard-sm btn-pressable flex items-center justify-center gap-2 min-h-[44px]"
        >
          <span>Kembali ke Halaman Masuk</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <GoogleOAuthButton label="Daftar dengan Google" nextPath={nextPath} />

      <div className="relative flex items-center py-1">
        <div className="flex-grow border-t-2 border-stone-200" />
        <span className="shrink mx-3 text-[11px] font-bold uppercase tracking-wider text-stone-500">
          atau daftar dengan email
        </span>
        <div className="flex-grow border-t-2 border-stone-200" />
      </div>

      {state?.error && (
        <div className="p-3.5 rounded-2xl bg-rose-100 border-2 border-[#1C1917] shadow-hard-sm flex items-start gap-2.5 text-xs font-bold text-rose-950">
          <AlertCircle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
          <span>{state.error}</span>
        </div>
      )}

      <form action={formAction} className="space-y-3.5">
        <input type="hidden" name="next" value={nextPath} />

        <div>
          <label
            htmlFor="register-fullname"
            className="block text-xs font-bold text-stone-700 uppercase mb-1"
          >
            Nama Lengkap *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
            <input
              id="register-fullname"
              name="fullName"
              type="text"
              required
              minLength={2}
              autoComplete="name"
              placeholder="Contoh: Nadia Putri"
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border-2 border-[#1C1917] rounded-xl bg-white shadow-hard-sm focus:bg-stone-50 focus:shadow-hard focus:outline-none min-h-[44px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="register-email"
              className="block text-xs font-bold text-stone-700 uppercase mb-1"
            >
              Alamat Email *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
              <input
                id="register-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="nama@email.com"
                className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm border-2 border-[#1C1917] rounded-xl bg-white shadow-hard-sm focus:bg-stone-50 focus:shadow-hard focus:outline-none min-h-[44px]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="register-phone"
              className="block text-xs font-bold text-stone-700 uppercase mb-1"
            >
              No. WhatsApp (Opsional)
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
              <input
                id="register-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="08123456789"
                className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm border-2 border-[#1C1917] rounded-xl bg-white shadow-hard-sm focus:bg-stone-50 focus:shadow-hard focus:outline-none min-h-[44px]"
              />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="register-password"
            className="block text-xs font-bold text-stone-700 uppercase mb-1"
          >
            Kata Sandi *
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
            <input
              id="register-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              minLength={8}
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              autoComplete="new-password"
              placeholder="Minimal 8 karakter (huruf & angka)"
              className="w-full pl-10 pr-11 py-2.5 text-xs sm:text-sm border-2 border-[#1C1917] rounded-xl bg-white shadow-hard-sm focus:bg-stone-50 focus:shadow-hard focus:outline-none min-h-[44px]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2.5 top-2 p-1.5 rounded-lg text-stone-500 hover:text-[#1C1917]"
              aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Lihat kata sandi'}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[11px] font-semibold">
            <span className={hasMinLen ? 'text-emerald-700' : 'text-stone-500'}>
              {hasMinLen ? '✓' : '○'} Min. 8 karakter
            </span>
            <span
              className={hasLetterAndDigit ? 'text-emerald-700' : 'text-stone-500'}
            >
              {hasLetterAndDigit ? '✓' : '○'} Kombinasi huruf & angka
            </span>
          </div>
        </div>

        <div>
          <label
            htmlFor="register-confirm-password"
            className="block text-xs font-bold text-stone-700 uppercase mb-1"
          >
            Konfirmasi Kata Sandi *
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
            <input
              id="register-confirm-password"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="Ulangi kata sandi"
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border-2 border-[#1C1917] rounded-xl bg-white shadow-hard-sm focus:bg-stone-50 focus:shadow-hard focus:outline-none min-h-[44px]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3.5 px-5 text-xs sm:text-sm font-bold bg-rose-400 text-[#1C1917] border-2 border-[#1C1917] rounded-xl shadow-hard btn-pressable flex items-center justify-center gap-2 min-h-[48px] disabled:opacity-60 mt-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Membuat Akun...</span>
            </>
          ) : (
            <>
              <span>Buat Akun & Mulai Rencanakan</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
