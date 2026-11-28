'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ensureUserProfile } from '@/lib/auth/dal';
import { normalizeSlug, validateSlug } from '@/lib/auth/validation';

export interface OnboardingActionState {
  error?: string;
}

export async function checkSlugAvailabilityAction(rawSlug: string): Promise<{
  available: boolean;
  slug: string;
  error?: string;
}> {
  const cleanSlug = normalizeSlug(rawSlug);
  const formatError = validateSlug(cleanSlug);
  if (formatError) {
    return { available: false, slug: cleanSlug, error: formatError };
  }

  const supabase = await createClient();
  const { data: rpcResult, error: rpcError } = await supabase.rpc(
    'is_wedding_slug_available',
    { p_slug: cleanSlug }
  );

  if (!rpcError && typeof rpcResult === 'boolean') {
    return {
      available: rpcResult,
      slug: cleanSlug,
      error: rpcResult ? undefined : `Slug "${cleanSlug}" sudah dipakai pasangan lain.`,
    };
  }

  // Fallback jika fungsi RPC migrasi belum dijalankan
  const { data: existing } = await supabase
    .from('weddings')
    .select('id')
    .ilike('slug', cleanSlug)
    .maybeSingle();

  const available = !existing;
  return {
    available,
    slug: cleanSlug,
    error: available ? undefined : `Slug "${cleanSlug}" sudah dipakai pasangan lain.`,
  };
}

export async function createWeddingOnboardingAction(
  _prevState: OnboardingActionState | undefined,
  formData: FormData
): Promise<OnboardingActionState> {
  const groomName = String(formData.get('groomName') ?? '').trim();
  const groomNickname = String(formData.get('groomNickname') ?? '').trim();
  const brideName = String(formData.get('brideName') ?? '').trim();
  const brideNickname = String(formData.get('brideNickname') ?? '').trim();
  const weddingDate = String(formData.get('weddingDate') ?? '').trim();
  const locationCity = String(formData.get('locationCity') ?? '').trim();
  const targetBudgetRaw = String(formData.get('targetBudget') ?? '0').replace(/\D/g, '');
  const slugInput = String(formData.get('slug') ?? '');

  if (groomName.length < 2 || brideName.length < 2) {
    return { error: 'Nama lengkap kedua mempelai wajib diisi.' };
  }
  if (!weddingDate || Number.isNaN(new Date(`${weddingDate}T00:00:00`).getTime())) {
    return { error: 'Tanggal rencana pernikahan tidak valid.' };
  }
  if (locationCity.length < 2) {
    return { error: 'Kota pelaksanaan pernikahan wajib diisi.' };
  }

  const cleanSlug = normalizeSlug(slugInput);
  const slugError = validateSlug(cleanSlug);
  if (slugError) {
    return { error: slugError };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/onboarding');
  }

  // Pastikan profil user tersedia sebelum insert ke weddings (FK owner_id -> profiles.id)
  await ensureUserProfile(user);

  const slugCheck = await checkSlugAvailabilityAction(cleanSlug);
  if (!slugCheck.available) {
    return { error: slugCheck.error ?? 'Slug URL sudah digunakan.' };
  }

  const resolvedGroomNick = groomNickname || groomName.split(/\s+/)[0];
  const resolvedBrideNick = brideNickname || brideName.split(/\s+/)[0];
  const targetBudget = Number(targetBudgetRaw || '0');

  const { data: createdWedding, error: insertError } = await supabase
    .from('weddings')
    .insert({
      owner_id: user.id,
      slug: cleanSlug,
      title: `Pernikahan ${resolvedBrideNick} & ${resolvedGroomNick}`,
      groom_name: groomName,
      groom_nickname: resolvedGroomNick,
      bride_name: brideName,
      bride_nickname: resolvedBrideNick,
      wedding_date: weddingDate,
      location_city: locationCity,
      target_budget: Number.isFinite(targetBudget) ? targetBudget : 0,
      status: 'planning',
    })
    .select('id')
    .single();

  if (insertError || !createdWedding) {
    if (insertError?.code === '23505') {
      return { error: `Slug "${cleanSlug}" baru saja diambil. Silakan pilih slug lain.` };
    }
    return {
      error:
        insertError?.message ||
        'Gagal membuat proyek pernikahan. Pastikan migrasi database Supabase sudah dijalankan.',
    };
  }

  const cookieStore = await cookies();
  cookieStore.set('restukisah_active_wedding', createdWedding.id, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect('/dashboard');
}
