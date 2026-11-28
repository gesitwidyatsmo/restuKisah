'use client';

import { useState, useActionState } from 'react';
import { AlertCircle, ArrowRight, Eye, EyeOff, Loader2, Lock } from 'lucide-react';
import { resetPasswordAction, type AuthActionState } from '@/app/actions/auth';

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState<
    AuthActionState | undefined,
    FormData
  >(resetPasswordAction, undefined);

  return (
    <div className="space-y-4">
      {state?.error && (
        <div className="p-3.5 rounded-2xl bg-rose-100 border-2 border-[#1C1917] shadow-hard-sm flex items-start gap-2.5 text-xs font-bold text-rose-950">
          <AlertCircle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
          <span>{state.error}</span>
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div>
          <label
            htmlFor="reset-password"
            className="block text-xs font-bold text-stone-700 uppercase mb-1.5"
          >
            Kata Sandi Baru
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
            <input
              id="reset-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              minLength={8}
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
        </div>

        <div>
          <label
            htmlFor="reset-confirm-password"
            className="block text-xs font-bold text-stone-700 uppercase mb-1.5"
          >
            Konfirmasi Kata Sandi Baru
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
            <input
              id="reset-confirm-password"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="Ulangi kata sandi baru"
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border-2 border-[#1C1917] rounded-xl bg-white shadow-hard-sm focus:bg-stone-50 focus:shadow-hard focus:outline-none min-h-[44px]"
            />
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
              <span>Menyimpan Kata Sandi...</span>
            </>
          ) : (
            <>
              <span>Simpan Kata Sandi Baru</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
