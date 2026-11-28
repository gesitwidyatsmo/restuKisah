import Link from 'next/link';
import AuthCardShell from '@/components/auth/AuthCardShell';
import LoginForm from '@/components/auth/LoginForm';
import { sanitizeNextPath } from '@/lib/auth/validation';

interface LoginPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const rawNext = typeof params.next === 'string' ? params.next : undefined;
  const rawError = typeof params.error === 'string' ? params.error : undefined;
  const nextPath = sanitizeNextPath(rawNext, '/dashboard');

  return (
    <AuthCardShell
      title="Selamat Datang Kembali"
      subtitle="Masuk untuk mengelola berkas KUA, anggaran, daftar tamu, dan undangan digital pernikahan Anda."
      footer={
        <p className="text-center text-xs font-medium text-stone-600">
          Belum punya akun RestuKisah?{' '}
          <Link
            href={
              nextPath !== '/dashboard'
                ? `/register?next=${encodeURIComponent(nextPath)}`
                : '/register'
            }
            className="font-bold text-rose-700 hover:underline"
          >
            Daftar Gratis Sekarang →
          </Link>
        </p>
      }
    >
      <LoginForm nextPath={nextPath} initialError={rawError} />
    </AuthCardShell>
  );
}
