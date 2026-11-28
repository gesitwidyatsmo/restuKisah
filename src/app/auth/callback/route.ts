import { NextResponse, type NextRequest } from 'next/server';
import type { EmailOtpType } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';
import { ensureUserProfile, getUserWeddingsWithRole } from '@/lib/auth/dal';
import { sanitizeNextPath } from '@/lib/auth/validation';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get('code');
  const tokenHash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = sanitizeNextPath(searchParams.get('next'), '/dashboard');

  const supabase = await createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(
        `${origin}/login?error=${encodeURIComponent('Tautan autentikasi gagal atau sudah kedaluwarsa.')}`
      );
    }
  } else if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    });
    if (error) {
      return NextResponse.redirect(
        `${origin}/login?error=${encodeURIComponent('Verifikasi email gagal atau tautan sudah kedaluwarsa.')}`
      );
    }
  } else {
    return NextResponse.redirect(`${origin}/login`);
  }

  if (next === '/reset-password') {
    return NextResponse.redirect(`${origin}/reset-password`);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(`${origin}/login`);
  }

  await ensureUserProfile(user);
  const memberships = await getUserWeddingsWithRole(user.id);

  if (memberships.length === 0) {
    return NextResponse.redirect(`${origin}/onboarding`);
  }

  return NextResponse.redirect(`${origin}${next}`);
}
