import { redirect } from 'next/navigation';
import Link from 'next/link';
import AuthCardShell from '@/components/auth/AuthCardShell';
import OnboardingForm from '@/components/auth/OnboardingForm';
import { getUserWeddingsWithRole, requireAuth } from '@/lib/auth/dal';
import { logoutAction } from '@/app/actions/auth';

interface OnboardingPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function OnboardingPage({ searchParams }: OnboardingPageProps) {
  const session = await requireAuth('/onboarding');
  const params = await searchParams;
  const mode = typeof params.mode === 'string' ? params.mode : '';

  const memberships = await getUserWeddingsWithRole(session.user.id);
  if (memberships.length > 0 && mode !== 'new') {
    redirect('/dashboard');
  }

  return (
    <AuthCardShell
      title="Setup Proyek Pernikahan"
      subtitle="Buat ruang kerja khusus pernikahan Anda. Sistem otomatis menyiapkan checklist KUA, jadwal, dan halaman undangan."
      badge="Langkah Awal"
      maxWidthClass="max-w-xl"
      footer={
        <div className="flex items-center justify-between text-xs">
          {memberships.length > 0 ? (
            <Link
              href="/dashboard"
              className="font-bold text-stone-700 hover:underline"
            >
              ← Kembali ke Dashboard
            </Link>
          ) : (
            <span className="text-stone-500 font-medium">
              Masuk sebagai {session.user.email}
            </span>
          )}
          <form action={logoutAction}>
            <button
              type="submit"
              className="font-bold text-rose-700 hover:underline"
            >
              Keluar Akun
            </button>
          </form>
        </div>
      }
    >
      <OnboardingForm userName={session.profile.full_name} />
    </AuthCardShell>
  );
}
