'use client';

import Sidebar from './Sidebar';
import { DashboardProvider, useDashboard } from './DashboardContext';
import type { WeddingFullData } from '@/lib/wedding-data-service';
import type { WeddingMembershipItem } from '@/lib/auth/dal';
import type { MemberRole, Profile } from '@/types/database';

function InnerDashboardLayout({ children }: { children: React.ReactNode }) {
  const { isMobileNavOpen, closeMobileNav, actionError, clearActionError } =
    useDashboard();

  return (
    <div className="min-h-screen flex bg-canvas-pattern">
      <Sidebar isMobileOpen={isMobileNavOpen} onCloseMobile={closeMobileNav} />
      <div className="flex-1 flex flex-col min-w-0 w-full overflow-x-hidden">
        {actionError && (
          <div className="bg-rose-100 border-b-2 border-[#1C1917] px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 text-xs font-bold text-rose-950">
            <span>{actionError}</span>
            <button
              type="button"
              onClick={clearActionError}
              className="px-2 py-0.5 rounded border border-[#1C1917] bg-white text-[11px]"
            >
              Tutup
            </button>
          </div>
        )}
        <main className="flex-1 pb-16">{children}</main>
      </div>
    </div>
  );
}

interface DashboardLayoutWrapperProps {
  children: React.ReactNode;
  initialData: WeddingFullData;
  userProfile: Profile;
  userEmail: string;
  userWeddings: WeddingMembershipItem[];
  activeRole: MemberRole;
}

export default function DashboardLayoutWrapper({
  children,
  initialData,
  userProfile,
  userEmail,
  userWeddings,
  activeRole,
}: DashboardLayoutWrapperProps) {
  return (
    <DashboardProvider
      key={initialData.wedding.id}
      initialData={initialData}
      userProfile={userProfile}
      userEmail={userEmail}
      userWeddings={userWeddings}
      activeRole={activeRole}
    >
      <InnerDashboardLayout>{children}</InnerDashboardLayout>
    </DashboardProvider>
  );
}
