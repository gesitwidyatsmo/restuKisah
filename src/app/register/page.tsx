import Link from 'next/link';
import AuthCardShell from '@/components/auth/AuthCardShell';
import RegisterForm from '@/components/auth/RegisterForm';
import { sanitizeNextPath } from '@/lib/auth/validation';

interface RegisterPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams;
  const rawNext = typeof params.next === 'string' ? params.next : undefined;
  const nextPath = sanitizeNextPath(rawNext, '/onboarding');

  return (
    <AuthCardShell
      title="Mulai Rencanakan Pernikahan"
      subtitle="Buat akun gratis dalam 30 detik untuk mengakses KUA Vault, Budget Tracker, Tamu WA, dan Undangan Digital."
      maxWidthClass="max-w-lg"
      footer={
        <p className="text-center text-xs font-medium text-stone-600">
          Sudah punya akun RestuKisah?{' '}
          <Link href="/login" className="font-bold text-rose-700 hover:underline">
            Masuk di Sini →
          </Link>
        </p>
      }
    >
      <RegisterForm nextPath={nextPath} />
    </AuthCardShell>
  );
}
