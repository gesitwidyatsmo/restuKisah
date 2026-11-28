export const RESERVED_SLUGS = new Set([
  'login',
  'register',
  'signup',
  'signin',
  'logout',
  'forgot-password',
  'reset-password',
  'onboarding',
  'dashboard',
  'auth',
  'api',
  'demo',
  'admin',
  'settings',
  'check-in',
  'privacy',
  'terms',
  'legal',
  'kebijakan-privasi',
  'syarat-ketentuan',
  'favicon.ico',
]);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) return 'Email wajib diisi.';
  if (!EMAIL_REGEX.test(trimmed)) return 'Format email tidak valid.';
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Kata sandi wajib diisi.';
  if (password.length < 8) return 'Kata sandi minimal 8 karakter.';
  if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
    return 'Kata sandi harus mengandung minimal huruf dan angka.';
  }
  return null;
}

export function normalizeSlug(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function validateSlug(slug: string): string | null {
  const clean = normalizeSlug(slug);
  if (!clean) return 'Slug URL undangan wajib diisi.';
  if (clean.length < 3) return 'Slug URL minimal 3 karakter.';
  if (clean.length > 60) return 'Slug URL maksimal 60 karakter.';
  if (!SLUG_REGEX.test(clean)) {
    return 'Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung (-).';
  }
  if (RESERVED_SLUGS.has(clean)) {
    return `Slug "${clean}" dicadangkan oleh sistem. Silakan pilih slug lain.`;
  }
  return null;
}

export function sanitizeNextPath(
  rawNext: string | null | undefined,
  fallback = '/dashboard'
): string {
  if (!rawNext) return fallback;
  const trimmed = rawNext.trim();
  if (!trimmed.startsWith('/') || trimmed.startsWith('//')) {
    return fallback;
  }
  if (trimmed.includes('\\')) {
    return fallback;
  }
  return trimmed;
}

export function normalizeIndonesianPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('0')) {
    return `62${digits.slice(1)}`;
  }
  if (digits.startsWith('8')) {
    return `62${digits}`;
  }
  return digits;
}

export function getSiteOrigin(requestOrigin?: string): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured && /^https?:\/\//i.test(configured)) {
    return configured.replace(/\/+$/, '');
  }
  if (requestOrigin) {
    return requestOrigin.replace(/\/+$/, '');
  }
  return 'http://localhost:3000';
}

export function mapAuthErrorToIndonesian(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes('invalid login credentials')) {
    return 'Email atau kata sandi salah. Silakan periksa kembali.';
  }
  if (lower.includes('email not confirmed')) {
    return 'Email Anda belum diverifikasi. Silakan cek kotak masuk atau folder spam email Anda.';
  }
  if (lower.includes('user already registered') || lower.includes('already been registered')) {
    return 'Email ini sudah terdaftar. Silakan masuk ke akun Anda.';
  }
  if (lower.includes('rate limit') || lower.includes('too many requests')) {
    return 'Terlalu banyak percobaan dalam waktu singkat. Mohon tunggu beberapa saat lalu coba lagi.';
  }
  if (lower.includes('password should be at least')) {
    return 'Kata sandi terlalu pendek. Gunakan minimal 8 karakter dengan kombinasi huruf dan angka.';
  }
  if (lower.includes('same password') || lower.includes('new password should be different')) {
    return 'Kata sandi baru harus berbeda dari kata sandi sebelumnya.';
  }
  if (lower.includes('auth session missing') || lower.includes('expired')) {
    return 'Sesi verifikasi sudah kedaluwarsa. Silakan ajukan tautan baru.';
  }
  if (lower.includes('network') || lower.includes('fetch')) {
    return 'Koneksi ke server autentikasi gagal. Periksa jaringan internet Anda.';
  }

  return message || 'Terjadi kesalahan pada proses autentikasi.';
}
