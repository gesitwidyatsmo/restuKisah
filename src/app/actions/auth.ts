'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ensureUserProfile, getUserWeddingsWithRole } from '@/lib/auth/dal';
import {
  getSiteOrigin,
  mapAuthErrorToIndonesian,
  normalizeIndonesianPhone,
  sanitizeNextPath,
  validateEmail,
  validatePassword,
} from '@/lib/auth/validation';

export interface AuthActionState {
  error?: string;
  success?: string;
  requiresEmailVerification?: boolean;
  email?: string;
  unverifiedEmail?: string;
}

async function resolveOriginFromRequest(): Promise<string> {
  const headerList = await headers();
  const originHeader = headerList.get('origin');
  const host = headerList.get('x-forwarded-host') || headerList.get('host');
  const proto = headerList.get('x-forwarded-proto') || 'http';
  const inferred = originHeader || (host ? `${proto}://${host}` : undefined);
  return getSiteOrigin(inferred);
}

export async function loginAction(
  _prevState: AuthActionState | undefined,
  formData: FormData
): Promise<AuthActionState> {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const nextPath = sanitizeNextPath(String(formData.get('next') ?? ''), '/dashboard');

  const emailError = validateEmail(email);
  if (emailError) {
    return { error: emailError };
  }
  if (!password) {
    return { error: 'Kata sandi wajib diisi.' };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    const rawMsg = error?.message ?? 'Login gagal.';
    const isUnverified = rawMsg.toLowerCase().includes('email not confirmed');
    return {
      error: mapAuthErrorToIndonesian(rawMsg),
      unverifiedEmail: isUnverified ? email : undefined,
    };
  }

  await ensureUserProfile(data.user);
  const memberships = await getUserWeddingsWithRole(data.user.id);

  if (memberships.length === 0) {
    redirect('/onboarding');
  }

  redirect(nextPath);
}

export async function registerAction(
  _prevState: AuthActionState | undefined,
  formData: FormData
): Promise<AuthActionState> {
  const fullName = String(formData.get('fullName') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const rawPhone = String(formData.get('phone') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const confirmPassword = String(formData.get('confirmPassword') ?? '');
  const nextPath = sanitizeNextPath(String(formData.get('next') ?? ''), '/onboarding');

  if (fullName.length < 2) {
    return { error: 'Nama lengkap minimal 2 karakter.' };
  }

  const emailError = validateEmail(email);
  if (emailError) {
    return { error: emailError };
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    return { error: passwordError };
  }

  if (password !== confirmPassword) {
    return { error: 'Konfirmasi kata sandi tidak cocok.' };
  }

  const normalizedPhone = normalizeIndonesianPhone(rawPhone);
  const origin = await resolveOriginFromRequest();
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(nextPath)}`,
      data: {
        full_name: fullName,
        phone: normalizedPhone || undefined,
      },
    },
  });

  if (error) {
    return { error: mapAuthErrorToIndonesian(error.message) };
  }

  if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
    return {
      error: 'Email ini sudah terdaftar. Silakan masuk atau gunakan fitur Lupa Kata Sandi.',
    };
  }

  if (data.session && data.user) {
    await ensureUserProfile(data.user);
    redirect(nextPath);
  }

  return {
    requiresEmailVerification: true,
    email,
    success:
      'Akun berhasil dibuat! Silakan cek kotak masuk atau folder spam email Anda untuk mengklik tautan verifikasi.',
  };
}

export async function resendVerificationAction(
  _prevState: AuthActionState | undefined,
  formData: FormData
): Promise<AuthActionState> {
  const email = String(formData.get('email') ?? '').trim();
  const emailError = validateEmail(email);
  if (emailError) {
    return { error: emailError };
  }

  const origin = await resolveOriginFromRequest();
  const supabase = await createClient();

  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=/onboarding`,
    },
  });

  if (error) {
    return {
      error: mapAuthErrorToIndonesian(error.message),
      email,
      requiresEmailVerification: true,
    };
  }

  return {
    requiresEmailVerification: true,
    email,
    success: 'Tautan verifikasi baru telah dikirim ke email Anda.',
  };
}

export async function forgotPasswordAction(
  _prevState: AuthActionState | undefined,
  formData: FormData
): Promise<AuthActionState> {
  const email = String(formData.get('email') ?? '').trim();
  const emailError = validateEmail(email);
  if (emailError) {
    return { error: emailError };
  }

  const origin = await resolveOriginFromRequest();
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/reset-password`,
  });

  if (error) {
    return { error: mapAuthErrorToIndonesian(error.message) };
  }

  return {
    success:
      'Jika email terdaftar di RestuKisah, tautan atur ulang kata sandi telah kami kirimkan ke kotak masuk Anda.',
  };
}

export async function resetPasswordAction(
  _prevState: AuthActionState | undefined,
  formData: FormData
): Promise<AuthActionState> {
  const password = String(formData.get('password') ?? '');
  const confirmPassword = String(formData.get('confirmPassword') ?? '');

  const passwordError = validatePassword(password);
  if (passwordError) {
    return { error: passwordError };
  }

  if (password !== confirmPassword) {
    return { error: 'Konfirmasi kata sandi tidak cocok.' };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: 'Sesi pemulihan kata sandi tidak ditemukan atau sudah kedaluwarsa. Silakan ajukan ulang.',
    };
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return { error: mapAuthErrorToIndonesian(error.message) };
  }

  const memberships = await getUserWeddingsWithRole(user.id);
  if (memberships.length === 0) {
    redirect('/onboarding');
  }

  redirect('/dashboard');
}

export async function logoutAction(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();

  const cookieStore = await cookies();
  cookieStore.delete('restukisah_active_wedding');

  redirect('/login');
}

export async function switchActiveWeddingAction(
  weddingId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Sesi tidak valid.' };
  }

  const memberships = await getUserWeddingsWithRole(user.id);
  const ownsOrBelongs = memberships.some((item) => item.wedding.id === weddingId);
  if (!ownsOrBelongs) {
    return { success: false, error: 'Anda tidak memiliki akses ke proyek pernikahan ini.' };
  }

  const cookieStore = await cookies();
  cookieStore.set('restukisah_active_wedding', weddingId, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
  });

  return { success: true };
}
