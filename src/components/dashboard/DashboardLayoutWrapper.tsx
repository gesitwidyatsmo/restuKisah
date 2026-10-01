'use client';

import Sidebar from './Sidebar';
import { DashboardProvider, useDashboard } from './DashboardContext';

function InnerDashboardLayout({ children }: { children: React.ReactNode }) {
  const { isMobileNavOpen, closeMobileNav } = useDashboard();

  return (
    <div className="min-h-screen flex bg-canvas-pattern">
      <Sidebar isMobileOpen={isMobileNavOpen} onCloseMobile={closeMobileNav} />
      <div className="flex-1 flex flex-col min-w-0 w-full overflow-x-hidden">
        <main className="flex-1 pb-16">{children}</main>
      </div>
    </div>
  );
}

export default function DashboardLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <InnerDashboardLayout>{children}</InnerDashboardLayout>
    </DashboardProvider>
  );
}
