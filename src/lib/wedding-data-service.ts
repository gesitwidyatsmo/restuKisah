'use client';

import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import {
  Wedding,
  AdminDocument,
  AdminDocStatus,
  ChecklistItem,
  BudgetItem,
  PaymentMilestone,
  Guest,
  RundownItem,
  Wish,
  Rsvp,
} from '@/types/database';
import {
  mockWedding,
  mockAdminDocuments,
  mockChecklists,
  mockBudgetItems,
  mockGuests,
  mockRundown,
  mockWishes,
} from '@/lib/mock-data';

export interface WeddingFullData {
  wedding: Wedding;
  adminDocuments: AdminDocument[];
  checklists: ChecklistItem[];
  budgetItems: BudgetItem[];
  guests: Guest[];
  rundown: RundownItem[];
  wishes: Wish[];
}

export interface WeddingOverviewStats {
  docsCompleted: number;
  docsTotal: number;
  docsPercent: number;
  tasksCompleted: number;
  tasksTotal: number;
  tasksPercent: number;
  totalBudgetActual: number;
  targetBudget: number;
  totalPaid: number;
  totalUnpaid: number;
  budgetRemaining: number;
  totalGuests: number;
  attendingGuests: number;
  declinedGuests: number;
  pendingGuests: number;
  checkedInGuests: number;
  totalCheckedInPax: number;
  totalAllocatedPax: number;
}

export function formatWeddingDateIndo(
  dateStr?: string,
  style: 'long' | 'short' = 'long'
): string {
  if (!dateStr) return 'Tanggal belum diatur';
  const parsed = new Date(`${dateStr.slice(0, 10)}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return dateStr;

  if (style === 'short') {
    return parsed.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  return parsed.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function getWeddingCountdownParts(dateStr?: string): {
  days: number;
  hours: number;
  minutes: number;
  isPast: boolean;
  isToday: boolean;
} {
  if (!dateStr) {
    return { days: 0, hours: 0, minutes: 0, isPast: false, isToday: false };
  }
  const target = new Date(`${dateStr.slice(0, 10)}T08:00:00+07:00`).getTime();
  if (Number.isNaN(target)) {
    return { days: 0, hours: 0, minutes: 0, isPast: false, isToday: false };
  }

  const now = Date.now();
  const diff = target - now;
  const todayStr = new Date().toISOString().slice(0, 10);
  if (dateStr.slice(0, 10) === todayStr) {
    return { days: 0, hours: 0, minutes: 0, isPast: false, isToday: true };
  }
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, isPast: true, isToday: false };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    isPast: false,
    isToday: false,
  };
}

export function getKuaRecommendedDeadline(weddingDateStr?: string): string {
  if (!weddingDateStr) return 'H-10 hari kerja sebelum akad';
  const base = new Date(`${weddingDateStr.slice(0, 10)}T00:00:00`);
  if (Number.isNaN(base.getTime())) return 'H-10 hari kerja sebelum akad';

  // Hitung mundur 10 hari kerja (Senin-Jumat)
  let remainingWorkdays = 10;
  const cursor = new Date(base);
  while (remainingWorkdays > 0) {
    cursor.setDate(cursor.getDate() - 1);
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) {
      remainingWorkdays -= 1;
    }
  }

  return cursor.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function calculateOverviewStats(data: WeddingFullData): WeddingOverviewStats {
  const docsCompleted = data.adminDocuments.filter((d) => d.status === 'completed').length;
  const docsTotal = data.adminDocuments.length;
  const docsPercent = docsTotal > 0 ? Math.round((docsCompleted / docsTotal) * 100) : 0;

  const tasksCompleted = data.checklists.filter((t) => t.status === 'done').length;
  const tasksTotal = data.checklists.length;
  const tasksPercent = tasksTotal > 0 ? Math.round((tasksCompleted / tasksTotal) * 100) : 0;

  const targetBudget = Number(data.wedding.target_budget || 0);
  const totalActual = data.budgetItems.reduce((acc, curr) => acc + Number(curr.actual_cost || 0), 0);

  const allMilestones = data.budgetItems.flatMap((b) => b.milestones || []);
  const totalPaid = allMilestones
    .filter((m) => m.is_paid)
    .reduce((acc, m) => acc + Number(m.amount || 0), 0);
  const totalUnpaid = totalActual - totalPaid;
  const budgetRemaining = targetBudget - totalActual;

  const totalGuests = data.guests.length;
  const attendingGuests = data.guests.filter((g) => g.rsvp?.status === 'attending').length;
  const declinedGuests = data.guests.filter((g) => g.rsvp?.status === 'declined').length;
  const pendingGuests = data.guests.filter((g) => !g.rsvp || g.rsvp.status === 'pending').length;

  const checkedInList = data.guests.filter((g) => g.is_checked_in);
  const checkedInGuests = checkedInList.length;
  const totalCheckedInPax = checkedInList.reduce(
    (acc, curr) => acc + (curr.rsvp?.confirmed_pax || curr.allocated_pax || 1),
    0
  );
  const totalAllocatedPax = data.guests.reduce(
    (acc, curr) => acc + (curr.allocated_pax || 1),
    0
  );

  return {
    docsCompleted,
    docsTotal,
    docsPercent,
    tasksCompleted,
    tasksTotal,
    tasksPercent,
    totalBudgetActual: totalActual,
    targetBudget,
    totalPaid,
    totalUnpaid,
    budgetRemaining,
    totalGuests,
    attendingGuests,
    declinedGuests,
    pendingGuests,
    checkedInGuests,
    totalCheckedInPax,
    totalAllocatedPax,
  };
}

// ==============================================================================
// SUPABASE REAL-DATA CLIENT OPERATIONS (UNTUK USER TERAUTENTIKASI DI DASHBOARD)
// ==============================================================================

export async function fetchWeddingFullDataFromSupabase(
  weddingId: string
): Promise<WeddingFullData | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = createClient();
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

export async function updateDocStatusRemote(
  docId: string,
  nextStatus: AdminDocStatus
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();
  const { error } = await supabase
    .from('admin_documents')
    .update({ status: nextStatus })
    .eq('id', docId);
  return error ? { success: false, error: error.message } : { success: true };
}

export async function toggleChecklistRemote(
  itemId: string,
  nextStatus: ChecklistItem['status']
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();
  const { error } = await supabase
    .from('checklist_items')
    .update({ status: nextStatus })
    .eq('id', itemId);
  return error ? { success: false, error: error.message } : { success: true };
}

export async function addChecklistRemote(
  weddingId: string,
  item: Omit<ChecklistItem, 'id' | 'wedding_id'>
): Promise<{ success: boolean; item?: ChecklistItem; error?: string }> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('checklist_items')
    .insert({
      wedding_id: weddingId,
      title: item.title,
      category: item.category,
      timeframe: item.timeframe,
      status: item.status,
      deadline: item.deadline || null,
      notes: item.notes || null,
    })
    .select('*')
    .single();

  if (error || !data) {
    return { success: false, error: error?.message || 'Gagal menambah tugas.' };
  }
  return { success: true, item: data as ChecklistItem };
}

export async function toggleMilestoneRemote(
  milestoneId: string,
  nextPaid: boolean,
  paidDate?: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();
  const { error } = await supabase
    .from('payment_milestones')
    .update({ is_paid: nextPaid, paid_date: nextPaid ? paidDate || null : null })
    .eq('id', milestoneId);
  return error ? { success: false, error: error.message } : { success: true };
}

export async function addGuestRemote(
  weddingId: string,
  guestInput: Omit<Guest, 'id' | 'wedding_id' | 'qr_token' | 'is_checked_in'>
): Promise<{ success: boolean; guest?: Guest; error?: string }> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('guests')
    .insert({
      wedding_id: weddingId,
      name: guestInput.name.trim(),
      phone: guestInput.phone?.trim() || null,
      category: guestInput.category,
      allocated_pax: guestInput.allocated_pax || 1,
      table_number: guestInput.table_number?.trim() || null,
    })
    .select('*')
    .single();

  if (error || !data) {
    return { success: false, error: error?.message || 'Gagal menambahkan tamu.' };
  }
  return { success: true, guest: data as Guest };
}

export async function checkInGuestRemote(
  weddingId: string,
  tokenOrId: string
): Promise<{ success: boolean; guest?: Guest; message: string; already?: boolean }> {
  const supabase = createClient();
  const tokenClean = tokenOrId.trim();

  const { data: guestRow, error: findError } = await supabase
    .from('guests')
    .select('*, rsvp:rsvps(*)')
    .eq('wedding_id', weddingId)
    .or(`qr_token.ilike.${tokenClean},id.eq.${tokenClean}`)
    .maybeSingle();

  if (findError || !guestRow) {
    return {
      success: false,
      message: 'QR Token Tidak Valid! Tamu tidak terdaftar dalam database pernikahan ini.',
    };
  }

  const rsvpRaw = (guestRow as { rsvp?: Rsvp | Rsvp[] | null }).rsvp;
  const guest: Guest = {
    ...(guestRow as Guest),
    rsvp: Array.isArray(rsvpRaw) ? rsvpRaw[0] : rsvpRaw ?? undefined,
  };

  if (guest.is_checked_in) {
    const timeFormatted = guest.checked_in_at
      ? new Date(guest.checked_in_at).toLocaleTimeString('id-ID')
      : 'sebelumnya';
    return {
      success: false,
      already: true,
      guest,
      message: `Tamu "${guest.name}" SUDAH CHECK-IN pada pukul ${timeFormatted}.`,
    };
  }

  const nowIso = new Date().toISOString();
  const { error: updateError } = await supabase
    .from('guests')
    .update({ is_checked_in: true, checked_in_at: nowIso })
    .eq('id', guest.id);

  if (updateError) {
    return { success: false, message: updateError.message };
  }

  const updatedGuest: Guest = { ...guest, is_checked_in: true, checked_in_at: nowIso };
  return {
    success: true,
    guest: updatedGuest,
    message: `Presensi Berhasil! Silakan persilakan ${updatedGuest.name} masuk & serahkan souvenir.`,
  };
}

// ==============================================================================
// DEMO / MOCK LOCALSTORAGE HELPERS (KHUSUS RUTE /demo/* SAJA)
// ==============================================================================

const STORAGE_KEY_PREFIX = 'restukisah_data_';
const CHANNEL_NAME = 'restukisah_sync';

export function getStoredWeddingData(weddingId: string = mockWedding.id): WeddingFullData {
  if (typeof window === 'undefined') {
    return {
      wedding: mockWedding,
      adminDocuments: mockAdminDocuments,
      checklists: mockChecklists,
      budgetItems: mockBudgetItems,
      guests: mockGuests,
      rundown: mockRundown,
      wishes: mockWishes,
    };
  }

  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${weddingId}`);
    if (raw) {
      return JSON.parse(raw) as WeddingFullData;
    }
  } catch (err) {
    console.warn('[wedding-data-service] Gagal membaca localStorage:', err);
  }

  const initialData: WeddingFullData = {
    wedding: mockWedding,
    adminDocuments: mockAdminDocuments,
    checklists: mockChecklists,
    budgetItems: mockBudgetItems,
    guests: mockGuests,
    rundown: mockRundown,
    wishes: mockWishes,
  };

  try {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${weddingId}`, JSON.stringify(initialData));
  } catch {
    // Abaikan jika quota localStorage habis
  }

  return initialData;
}

export function persistWeddingData(
  weddingId: string,
  data: WeddingFullData,
  eventType: string = 'DATA_UPDATED'
): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${weddingId}`, JSON.stringify(data));
  } catch (err) {
    console.warn('[wedding-data-service] Gagal menyimpan ke localStorage:', err);
  }

  if ('BroadcastChannel' in window) {
    try {
      const bc = new BroadcastChannel(CHANNEL_NAME);
      bc.postMessage({ type: eventType, weddingId, timestamp: Date.now() });
      bc.close();
    } catch {
      // Fallback
    }
  }

  window.dispatchEvent(
    new CustomEvent('restukisah_sync_event', {
      detail: { type: eventType, weddingId, data },
    })
  );
}

export async function checkInGuestAction(
  weddingId: string,
  tokenOrId: string
): Promise<{ success: boolean; guest?: Guest; message: string; already?: boolean }> {
  const data = getStoredWeddingData(weddingId);
  const tokenClean = tokenOrId.trim().toLowerCase();

  const foundIndex = data.guests.findIndex(
    (g) => g.qr_token.toLowerCase() === tokenClean || g.id.toLowerCase() === tokenClean
  );

  if (foundIndex === -1) {
    return {
      success: false,
      message: 'QR Token Tidak Valid! Tamu tidak terdaftar dalam database pernikahan ini.',
    };
  }

  const currentGuest = data.guests[foundIndex];
  if (currentGuest.is_checked_in) {
    const timeFormatted = currentGuest.checked_in_at
      ? new Date(currentGuest.checked_in_at).toLocaleTimeString('id-ID')
      : 'sebelumnya';
    return {
      success: false,
      already: true,
      guest: currentGuest,
      message: `Tamu "${currentGuest.name}" SUDAH CHECK-IN pada pukul ${timeFormatted}.`,
    };
  }

  const nowIso = new Date().toISOString();
  const updatedGuest: Guest = {
    ...currentGuest,
    is_checked_in: true,
    checked_in_at: nowIso,
  };

  data.guests[foundIndex] = updatedGuest;
  persistWeddingData(weddingId, data, 'GUEST_CHECKED_IN');

  return {
    success: true,
    guest: updatedGuest,
    message: `Presensi Berhasil! Silakan persilakan ${updatedGuest.name} masuk & serahkan souvenir.`,
  };
}

export async function submitRsvpAction(
  weddingId: string,
  guestName: string,
  status: 'attending' | 'declined',
  paxCount: number,
  message?: string
): Promise<{ success: boolean; message: string }> {
  const data = getStoredWeddingData(weddingId);

  const foundIndex = data.guests.findIndex(
    (g) => g.name.toLowerCase().trim() === guestName.toLowerCase().trim()
  );

  const nowIso = new Date().toISOString();
  const rsvpPayload: Rsvp = {
    id: `rsvp-${Date.now()}`,
    guest_id: foundIndex !== -1 ? data.guests[foundIndex].id : `guest-temp-${Date.now()}`,
    status: status === 'attending' ? 'attending' : 'declined',
    confirmed_pax: status === 'attending' ? paxCount : 0,
    message: message || '',
    submitted_at: nowIso,
  };

  if (foundIndex !== -1) {
    data.guests[foundIndex] = {
      ...data.guests[foundIndex],
      rsvp: rsvpPayload,
    };
  } else {
    const newGuest: Guest = {
      id: `gst-auto-${Date.now()}`,
      wedding_id: weddingId,
      name: guestName,
      category: 'umum',
      allocated_pax: paxCount || 1,
      qr_token: `TOKEN-${guestName.replace(/\s+/g, '').toUpperCase().slice(0, 8)}-${Date.now().toString().slice(-4)}`,
      is_checked_in: false,
      rsvp: rsvpPayload,
    };
    data.guests.unshift(newGuest);
  }

  if (message && message.trim()) {
    data.wishes.unshift({
      id: `wsh-${Date.now()}`,
      wedding_id: weddingId,
      sender_name: guestName,
      relationship: 'Tamu Undangan',
      message: message.trim(),
      created_at: nowIso,
    });
  }

  persistWeddingData(weddingId, data, 'RSVP_SUBMITTED');

  return { success: true, message: 'Konfirmasi kehadiran Anda telah tersimpan.' };
}

export async function submitWishAction(
  weddingId: string,
  senderName: string,
  message: string,
  relationship: string = 'Tamu Undangan'
): Promise<{ success: boolean; wish: Wish }> {
  const data = getStoredWeddingData(weddingId);
  const nowIso = new Date().toISOString();

  const newWish: Wish = {
    id: `wsh-${Date.now()}`,
    wedding_id: weddingId,
    sender_name: senderName.trim(),
    relationship,
    message: message.trim(),
    created_at: nowIso,
  };

  data.wishes.unshift(newWish);
  persistWeddingData(weddingId, data, 'WISH_ADDED');

  return { success: true, wish: newWish };
}
