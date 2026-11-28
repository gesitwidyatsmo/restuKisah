import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import AuthCardShell from '@/components/auth/AuthCardShell';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import { getAuthSession } from '@/lib/auth/dal';

export default async function ResetPasswordPage() {
  const session = await getAuthSession();

  return (
    <AuthCardShell
      title="Atur Kata Sandi Baru"
      subtitle="Buat kata sandi baru yang kuat untuk mengamankan proyek pernikahan Anda."
      footer={
        <p className="text-center text-xs font-medium text-stone-600">
          <Link href="/login" className="font-bold text-rose-700 hover:underline">
            Kembali ke Halaman Masuk →
          </Link>
        </p>
      }
    >
      {session ? (
        <ResetPasswordForm />
      ) : (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-amber-100 border-2 border-[#1C1917] shadow-hard-sm flex items-start gap-2.5 text-xs font-bold text-amber-950">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>
              Sesi pemulihan kata sandi tidak ditemukan atau tautan sudah kedaluwarsa.
            </span>
          </div>
          <Link
            href="/forgot-password"
            className="w-full py-3 px-4 text-xs sm:text-sm font-bold bg-rose-400 text-[#1C1917] border-2 border-[#1C1917] rounded-xl shadow-hard-sm btn-pressable flex items-center justify-center min-h-[44px]"
          >
            Minta Tautan Reset Baru
          </Link>
        </div>
      )}
    </AuthCardShell>
  );
}
