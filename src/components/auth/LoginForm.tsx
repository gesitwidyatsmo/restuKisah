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
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import {
  loginAction,
  resendVerificationAction,
  type AuthActionState,
} from '@/app/actions/auth';
import GoogleOAuthButton from '@/components/auth/GoogleOAuthButton';

interface LoginFormProps {
  nextPath: string;
  initialError?: string;
}

export default function LoginForm({ nextPath, initialError }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState<
    AuthActionState | undefined,
    FormData
  >(loginAction, undefined);
  const [resendState, resendFormAction, isResending] = useActionState<
    AuthActionState | undefined,
    FormData
  >(resendVerificationAction, undefined);

  const displayError = state?.error || initialError;

  return (
    <div className="space-y-5">
      <GoogleOAuthButton label="Masuk dengan Google" nextPath={nextPath} />

      <div className="relative flex items-center py-1">
        <div className="flex-grow border-t-2 border-stone-200" />
        <span className="shrink mx-3 text-[11px] font-bold uppercase tracking-wider text-stone-500">
          atau dengan email
        </span>
        <div className="flex-grow border-t-2 border-stone-200" />
      </div>

      {displayError && (
        <div className="p-3.5 rounded-2xl bg-rose-100 border-2 border-[#1C1917] shadow-hard-sm flex items-start gap-2.5 text-xs font-bold text-rose-950">
          <AlertCircle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p>{displayError}</p>
            {state?.unverifiedEmail && (
              <form action={resendFormAction}>
                <input type="hidden" name="email" value={state.unverifiedEmail} />
                <button
                  type="submit"
                  disabled={isResending}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#1C1917] text-[11px] font-bold text-[#1C1917] hover:bg-stone-50 disabled:opacity-60"
                >
                  {isResending ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <RefreshCw className="w-3 h-3" />
                  )}
                  <span>Kirim Ulang Email Verifikasi</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {resendState?.success && (
        <div className="p-3.5 rounded-2xl bg-emerald-100 border-2 border-[#1C1917] shadow-hard-sm flex items-start gap-2.5 text-xs font-bold text-emerald-950">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <span>{resendState.success}</span>
        </div>
      )}

      {resendState?.error && (
        <div className="p-3.5 rounded-2xl bg-amber-100 border-2 border-[#1C1917] shadow-hard-sm flex items-start gap-2.5 text-xs font-bold text-amber-950">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>{resendState.error}</span>
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="next" value={nextPath} />

        <div>
          <label
            htmlFor="login-email"
            className="block text-xs font-bold text-stone-700 uppercase mb-1.5"
          >
            Alamat Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
            <input
              id="login-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="nama@email.com"
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border-2 border-[#1C1917] rounded-xl bg-white shadow-hard-sm focus:bg-stone-50 focus:shadow-hard focus:outline-none min-h-[44px]"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="login-password"
              className="block text-xs font-bold text-stone-700 uppercase"
            >
              Kata Sandi
            </label>
            <Link
              href="/forgot-password"
              className="text-[11px] font-bold text-rose-700 hover:underline"
            >
              Lupa kata sandi?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
            <input
              id="login-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="current-password"
              placeholder="Masukkan kata sandi Anda"
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
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3.5 px-5 text-xs sm:text-sm font-bold bg-rose-400 text-[#1C1917] border-2 border-[#1C1917] rounded-xl shadow-hard btn-pressable flex items-center justify-center gap-2 min-h-[48px] disabled:opacity-60"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Memproses Masuk...</span>
            </>
          ) : (
            <>
              <span>Masuk ke Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="p-3 rounded-xl bg-amber-50 border-2 border-[#1C1917] flex items-center justify-between gap-2 text-[11px]">
        <div className="flex items-center gap-1.5 font-semibold text-stone-700">
          <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span>Hanya ingin lihat contoh undangan?</span>
        </div>
        <Link
          href="/demo/jawa"
          className="font-bold text-[#1C1917] underline shrink-0"
        >
          Lihat Demo →
        </Link>
      </div>
    </div>
  );
}
