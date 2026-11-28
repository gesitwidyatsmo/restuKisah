'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, Mail } from 'lucide-react';
import AuthCardShell from '@/components/auth/AuthCardShell';
import { forgotPasswordAction, type AuthActionState } from '@/app/actions/auth';

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState<
    AuthActionState | undefined,
    FormData
  >(forgotPasswordAction, undefined);

  return (
    <AuthCardShell
      title="Lupa Kata Sandi?"
      subtitle="Masukkan alamat email terdaftar Anda dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi."
      footer={
        <p className="text-center text-xs font-medium text-stone-600">
          Sudah ingat kata sandi?{' '}
          <Link href="/login" className="font-bold text-rose-700 hover:underline">
            Kembali ke Halaman Masuk →
          </Link>
        </p>
      }
    >
      <div className="space-y-4">
        {state?.error && (
          <div className="p-3.5 rounded-2xl bg-rose-100 border-2 border-[#1C1917] shadow-hard-sm flex items-start gap-2.5 text-xs font-bold text-rose-950">
            <AlertCircle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
            <span>{state.error}</span>
          </div>
        )}

        {state?.success && (
          <div className="p-3.5 rounded-2xl bg-emerald-100 border-2 border-[#1C1917] shadow-hard-sm flex items-start gap-2.5 text-xs font-bold text-emerald-950">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span>{state.success}</span>
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <label
              htmlFor="forgot-email"
              className="block text-xs font-bold text-stone-700 uppercase mb-1.5"
            >
              Alamat Email Terdaftar
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
              <input
                id="forgot-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="nama@email.com"
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
                <span>Mengirim Tautan...</span>
              </>
            ) : (
              <>
                <span>Kirim Tautan Reset Sandi</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </AuthCardShell>
  );
}
