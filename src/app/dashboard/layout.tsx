import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardLayoutWrapper from '@/components/dashboard/DashboardLayoutWrapper';
import {
  getUserWeddingsWithRole,
  getWeddingInitialBundle,
  requireAuth,
} from '@/lib/auth/dal';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAuth('/dashboard');
  const memberships = await getUserWeddingsWithRole(session.user.id);

  if (memberships.length === 0) {
    redirect('/onboarding');
  }

  const cookieStore = await cookies();
  const preferredWeddingId = cookieStore.get('restukisah_active_wedding')?.value;
  const activeMembership =
    memberships.find((m) => m.wedding.id === preferredWeddingId) ?? memberships[0];

  const initialData = await getWeddingInitialBundle(activeMembership.wedding.id);
  if (!initialData) {
    redirect('/onboarding');
  }

  return (
    <DashboardLayoutWrapper
      initialData={initialData}
      userProfile={session.profile}
      userEmail={session.user.email ?? ''}
      userWeddings={memberships}
      activeRole={activeMembership.role}
    >
      {children}
    </DashboardLayoutWrapper>
  );
}
