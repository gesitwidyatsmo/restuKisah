'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type {
  Wedding,
  AdminDocument,
  AdminDocStatus,
  ChecklistItem,
  BudgetItem,
  Guest,
  RundownItem,
  Wish,
  Profile,
  MemberRole,
} from '@/types/database';
import type { WeddingMembershipItem } from '@/lib/auth/dal';
import {
  WeddingFullData,
  WeddingOverviewStats,
  calculateOverviewStats,
  fetchWeddingFullDataFromSupabase,
  toggleChecklistRemote,
  addChecklistRemote,
  updateDocStatusRemote,
  toggleMilestoneRemote,
  addGuestRemote,
  checkInGuestRemote,
} from '@/lib/wedding-data-service';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { switchActiveWeddingAction } from '@/app/actions/auth';

interface DashboardContextType {
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (open: boolean) => void;
  toggleMobileNav: () => void;
  closeMobileNav: () => void;

  userProfile: Profile;
  userEmail: string;
  userWeddings: WeddingMembershipItem[];
  activeRole: MemberRole;
  switchWedding: (weddingId: string) => Promise<void>;

  wedding: Wedding;
  adminDocuments: AdminDocument[];
  checklists: ChecklistItem[];
  budgetItems: BudgetItem[];
  guests: Guest[];
  rundown: RundownItem[];
  wishes: Wish[];
  stats: WeddingOverviewStats;

  actionError: string | null;
  clearActionError: () => void;

  updateDocumentStatus: (docId: string) => Promise<void>;
  toggleChecklist: (itemId: string) => Promise<void>;
  addChecklist: (item: Omit<ChecklistItem, 'id' | 'wedding_id'>) => Promise<void>;
  toggleMilestone: (itemId: string, milestoneId: string) => Promise<void>;
  addGuest: (
    guest: Omit<Guest, 'id' | 'wedding_id' | 'qr_token' | 'is_checked_in'>
  ) => Promise<void>;
  checkInGuest: (
    tokenOrId: string
  ) => Promise<{ success: boolean; message: string; already?: boolean }>;
  refreshData: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

interface DashboardProviderProps {
  children: React.ReactNode;
  initialData: WeddingFullData;
  userProfile: Profile;
  userEmail: string;
  userWeddings: WeddingMembershipItem[];
  activeRole: MemberRole;
}

export function DashboardProvider({
  children,
  initialData,
  userProfile,
  userEmail,
  userWeddings,
  activeRole,
}: DashboardProviderProps) {
  const router = useRouter();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [data, setData] = useState<WeddingFullData>(initialData);
  const [actionError, setActionError] = useState<string | null>(null);

  const weddingId = data.wedding.id;

  const toggleMobileNav = () => setIsMobileNavOpen((prev) => !prev);
  const closeMobileNav = () => setIsMobileNavOpen(false);
  const clearActionError = () => setActionError(null);

  const reloadData = useCallback(async () => {
    const fresh = await fetchWeddingFullDataFromSupabase(weddingId);
    if (fresh) {
      setData(fresh);
    }
  }, [weddingId]);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const supabase = createClient();
    const channel = supabase
      .channel(`dashboard-sync-${weddingId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'guests', filter: `wedding_id=eq.${weddingId}` },
        () => {
          void reloadData();
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'wishes', filter: `wedding_id=eq.${weddingId}` },
        () => {
          void reloadData();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'checklist_items',
          filter: `wedding_id=eq.${weddingId}`,
        },
        () => {
          void reloadData();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'admin_documents',
          filter: `wedding_id=eq.${weddingId}`,
        },
        () => {
          void reloadData();
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [weddingId, reloadData]);

  const switchWedding = useCallback(
    async (targetWeddingId: string) => {
      const res = await switchActiveWeddingAction(targetWeddingId);
      if (!res.success) {
        setActionError(res.error || 'Gagal mengganti proyek pernikahan aktif.');
        return;
      }
      router.refresh();
    },
    [router]
  );

  const updateDocumentStatus = useCallback(
    async (docId: string) => {
      const nextStatusMap: Record<AdminDocStatus, AdminDocStatus> = {
        not_started: 'in_progress',
        in_progress: 'ready_to_submit',
        ready_to_submit: 'completed',
        completed: 'not_started',
      };

      const targetDoc = data.adminDocuments.find((d) => d.id === docId);
      if (!targetDoc) return;
      const nextStatus = nextStatusMap[targetDoc.status] || 'in_progress';
      const previousDocs = data.adminDocuments;

      setData((prev) => ({
        ...prev,
        adminDocuments: prev.adminDocuments.map((d) =>
          d.id === docId ? { ...d, status: nextStatus } : d
        ),
      }));

      const res = await updateDocStatusRemote(docId, nextStatus);
      if (!res.success) {
        setData((prev) => ({ ...prev, adminDocuments: previousDocs }));
        setActionError(res.error || 'Gagal memperbarui status berkas KUA.');
      }
    },
    [data.adminDocuments]
  );

  const toggleChecklist = useCallback(
    async (itemId: string) => {
      const target = data.checklists.find((c) => c.id === itemId);
      if (!target) return;
      const nextStatus: ChecklistItem['status'] =
        target.status === 'done' ? 'todo' : 'done';
      const previous = data.checklists;

      setData((prev) => ({
        ...prev,
        checklists: prev.checklists.map((t) =>
          t.id === itemId ? { ...t, status: nextStatus } : t
        ),
      }));

      const res = await toggleChecklistRemote(itemId, nextStatus);
      if (!res.success) {
        setData((prev) => ({ ...prev, checklists: previous }));
        setActionError(res.error || 'Gagal memperbarui checklist.');
      }
    },
    [data.checklists]
  );

  const addChecklist = useCallback(
    async (item: Omit<ChecklistItem, 'id' | 'wedding_id'>) => {
      const res = await addChecklistRemote(weddingId, item);
      if (!res.success || !res.item) {
        setActionError(res.error || 'Gagal menambahkan tugas checklist.');
        return;
      }
      setData((prev) => ({
        ...prev,
        checklists: [res.item!, ...prev.checklists],
      }));
    },
    [weddingId]
  );

  const toggleMilestone = useCallback(
    async (itemId: string, milestoneId: string) => {
      const targetItem = data.budgetItems.find((b) => b.id === itemId);
      const targetMs = targetItem?.milestones?.find((m) => m.id === milestoneId);
      if (!targetMs) return;

      const nextPaid = !targetMs.is_paid;
      const paidDate = nextPaid ? new Date().toISOString().split('T')[0] : undefined;
      const previousBudget = data.budgetItems;

      setData((prev) => ({
        ...prev,
        budgetItems: prev.budgetItems.map((b) =>
          b.id === itemId && b.milestones
            ? {
                ...b,
                milestones: b.milestones.map((m) =>
                  m.id === milestoneId ? { ...m, is_paid: nextPaid, paid_date: paidDate } : m
                ),
              }
            : b
        ),
      }));

      const res = await toggleMilestoneRemote(milestoneId, nextPaid, paidDate);
      if (!res.success) {
        setData((prev) => ({ ...prev, budgetItems: previousBudget }));
        setActionError(res.error || 'Gagal memperbarui status termin pembayaran.');
      }
    },
    [data.budgetItems]
  );

  const addGuest = useCallback(
    async (guestInput: Omit<Guest, 'id' | 'wedding_id' | 'qr_token' | 'is_checked_in'>) => {
      const res = await addGuestRemote(weddingId, guestInput);
      if (!res.success || !res.guest) {
        setActionError(res.error || 'Gagal menambahkan tamu.');
        return;
      }
      setData((prev) => ({
        ...prev,
        guests: [res.guest!, ...prev.guests],
      }));
    },
    [weddingId]
  );

  const checkInGuest = useCallback(
    async (tokenOrId: string) => {
      const res = await checkInGuestRemote(weddingId, tokenOrId);
      if (res.success) {
        await reloadData();
      }
      return res;
    },
    [weddingId, reloadData]
  );

  const stats = calculateOverviewStats(data);

  return (
    <DashboardContext.Provider
      value={{
        isMobileNavOpen,
        setIsMobileNavOpen,
        toggleMobileNav,
        closeMobileNav,

        userProfile,
        userEmail,
        userWeddings,
        activeRole,
        switchWedding,

        wedding: data.wedding,
        adminDocuments: data.adminDocuments,
        checklists: data.checklists,
        budgetItems: data.budgetItems,
        guests: data.guests,
        rundown: data.rundown,
        wishes: data.wishes,
        stats,

        actionError,
        clearActionError,

        updateDocumentStatus,
        toggleChecklist,
        addChecklist,
        toggleMilestone,
        addGuest,
        checkInGuest,
        refreshData: reloadData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard(): DashboardContextType {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard harus dipanggil di dalam DashboardProvider.');
  }
  return context;
}
