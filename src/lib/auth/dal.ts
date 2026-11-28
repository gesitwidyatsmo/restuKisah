import { cache } from 'react';
import { redirect } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';
import type {
  AdminDocument,
  BudgetItem,
  ChecklistItem,
  Guest,
  MemberRole,
  PaymentMilestone,
  Profile,
  Rsvp,
  RundownItem,
  Wedding,
  Wish,
} from '@/types/database';
import type { WeddingFullData } from '@/lib/wedding-data-service';

export interface WeddingMembershipItem {
  wedding: Wedding;
  role: MemberRole;
}

export interface AuthSessionBundle {
  user: User;
  profile: Profile;
}

export async function ensureUserProfile(user: User): Promise<Profile> {
  const supabase = await createClient();
  const { data: existing } = await supabase
    .from('profiles')
    .select('id, full_name, phone, avatar_url, created_at')
    .eq('id', user.id)
    .maybeSingle();

  if (existing) {
    return existing as Profile;
  }

  const meta = user.user_metadata ?? {};
  const fullName =
    (typeof meta.full_name === 'string' && meta.full_name.trim()) ||
    (typeof meta.name === 'string' && meta.name.trim()) ||
    user.email?.split('@')[0] ||
    'Pengguna RestuKisah';

  const phone =
    typeof meta.phone === 'string' && meta.phone.trim() ? meta.phone.trim() : null;
  const avatarUrl =
    (typeof meta.avatar_url === 'string' && meta.avatar_url.trim()) ||
    (typeof meta.picture === 'string' && meta.picture.trim()) ||
    null;

  const { data: inserted } = await supabase
    .from('profiles')
    .upsert(
      {
        id: user.id,
        full_name: fullName,
        phone,
        avatar_url: avatarUrl,
      },
      { onConflict: 'id' }
    )
    .select('id, full_name, phone, avatar_url, created_at')
    .maybeSingle();

  return (
    (inserted as Profile | null) ?? {
      id: user.id,
      full_name: fullName,
      phone: phone ?? undefined,
      avatar_url: avatarUrl ?? undefined,
      created_at: new Date().toISOString(),
    }
  );
}

export const getAuthSession = cache(async (): Promise<AuthSessionBundle | null> => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  const profile = await ensureUserProfile(user);
  return { user, profile };
});

export async function requireAuth(nextPath = '/dashboard'): Promise<AuthSessionBundle> {
  const session = await getAuthSession();
  if (!session) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }
  return session;
}

export const getUserWeddingsWithRole = cache(
  async (userId: string): Promise<WeddingMembershipItem[]> => {
    const supabase = await createClient();

    const [{ data: ownedRows }, { data: memberRows }] = await Promise.all([
      supabase
        .from('weddings')
        .select('*')
        .eq('owner_id', userId)
        .order('created_at', { ascending: false }),
      supabase
        .from('wedding_members')
        .select('role, wedding:weddings(*)')
        .eq('user_id', userId),
    ]);

    const weddingMap = new Map<string, WeddingMembershipItem>();

    for (const row of (ownedRows ?? []) as Wedding[]) {
      weddingMap.set(row.id, { wedding: row, role: 'owner' });
    }

    for (const row of (memberRows ?? []) as Array<{
      role: MemberRole;
      wedding: Wedding | Wedding[] | null;
    }>) {
      const weddingObj = Array.isArray(row.wedding) ? row.wedding[0] : row.wedding;
      if (weddingObj && !weddingMap.has(weddingObj.id)) {
        weddingMap.set(weddingObj.id, { wedding: weddingObj, role: row.role });
      }
    }

    return Array.from(weddingMap.values()).sort(
      (a, b) =>
        new Date(b.wedding.created_at).getTime() -
        new Date(a.wedding.created_at).getTime()
    );
  }
);

export const getWeddingInitialBundle = cache(
  async (weddingId: string): Promise<WeddingFullData | null> => {
    const supabase = await createClient();

    const { data: wedding, error: weddingError } = await supabase
      .from('weddings')
      .select('*')
      .eq('id', weddingId)
      .maybeSingle();

    if (weddingError || !wedding) {
      return null;
    }

    const [
      { data: docs },
      { data: checklists },
      { data: budgets },
      { data: guests },
      { data: rundowns },
      { data: wishes },
    ] = await Promise.all([
      supabase
        .from('admin_documents')
        .select('*')
        .eq('wedding_id', weddingId)
        .order('created_at', { ascending: true }),
      supabase
        .from('checklist_items')
        .select('*')
        .eq('wedding_id', weddingId)
        .order('created_at', { ascending: true }),
      supabase
        .from('budget_items')
        .select('*, milestones:payment_milestones(*)')
        .eq('wedding_id', weddingId)
        .order('created_at', { ascending: true }),
      supabase
        .from('guests')
        .select('*, rsvp:rsvps(*)')
        .eq('wedding_id', weddingId)
        .order('created_at', { ascending: false }),
      supabase
        .from('rundown_items')
        .select('*')
        .eq('wedding_id', weddingId)
        .order('order_index', { ascending: true }),
      supabase
        .from('wishes')
        .select('*')
        .eq('wedding_id', weddingId)
        .order('created_at', { ascending: false }),
    ]);

    const normalizedBudgets: BudgetItem[] = ((budgets ?? []) as Array<
      BudgetItem & { milestones?: PaymentMilestone[] }
    >).map((item) => ({
      ...item,
      estimated_cost: Number(item.estimated_cost ?? 0),
      actual_cost: Number(item.actual_cost ?? 0),
      milestones: (item.milestones ?? []).map((m) => ({
        ...m,
        amount: Number(m.amount ?? 0),
      })),
    }));

    const normalizedGuests: Guest[] = ((guests ?? []) as Array<
      Omit<Guest, 'rsvp'> & { rsvp?: Rsvp | Rsvp[] | null }
    >).map((g) => {
      const rsvpObj = Array.isArray(g.rsvp) ? g.rsvp[0] : g.rsvp;
      return {
        ...g,
        rsvp: rsvpObj ?? undefined,
      };
    });

    return {
      wedding: {
        ...(wedding as Wedding),
        target_budget: Number((wedding as Wedding).target_budget ?? 0),
      },
      adminDocuments: (docs ?? []) as AdminDocument[],
      checklists: (checklists ?? []) as ChecklistItem[],
      budgetItems: normalizedBudgets,
      guests: normalizedGuests,
      rundown: (rundowns ?? []) as RundownItem[],
      wishes: (wishes ?? []) as Wish[],
    };
  }
);
