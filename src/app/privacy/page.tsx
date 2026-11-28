import type { Metadata } from 'next';
import LegalPageShell, { type LegalSection } from '@/components/legal/LegalPageShell';

export const metadata: Metadata = {
  title: 'Kebijakan Privasi — RestuKisah',
  description:
    'Kebijakan privasi resmi RestuKisah terkait pengelolaan data akun, Google OAuth, perencanaan pernikahan, serta undangan digital di restukisah.my.id.',
};

const PRIVACY_SECTIONS: LegalSection[] = [
  {
    id: 'pendahuluan',
    title: 'Pendahuluan & Ruang Lingkup',
    paragraphs: [
      'Kebijakan Privasi ini menjelaskan bagaimana RestuKisah ("kami") mengumpulkan, menyimpan, menggunakan, dan melindungi informasi pribadi Anda saat mengakses situs web https://www.restukisah.my.id beserta seluruh fitur manajemen persiapan pernikahan dan undangan digital di dalamnya.',
      'Dengan mendaftar akun, masuk melalui Google OAuth, atau mengisi data di layanan RestuKisah, Anda memahami dan menyetujui praktik pengolahan data yang dijelaskan dalam dokumen ini.',
    ],
  },
  {
    id: 'data-dikumpulkan',
    title: 'Informasi yang Kami Kumpulkan',
    paragraphs: [
      'Kami hanya mengumpulkan data yang relevan dan dibutuhkan agar fitur perencanaan pernikahan dan undangan digital Anda dapat berjalan dengan baik:',
    ],
    bullets: [
      'Data Akun & Identitas: nama lengkap, alamat email, kata sandi terenkripsi (bila mendaftar dengan email), nomor telepon/WhatsApp (bila diisi), serta nama dan foto profil dari Google apabila Anda memilih masuk menggunakan Google.',
      'Data Proyek Pernikahan: nama kedua calon mempelai, nama orang tua, tanggal dan kota acara, daftar berkas administrasi KUA, checklist persiapan, alokasi anggaran & catatan termin vendor, susunan acara (rundown), daftar tamu & nomor WhatsApp tamu, serta konten undangan digital (foto galeri, lokasi peta, ucapan, dan info amplop digital yang Anda atur sendiri).',
      'Data Interaksi Tamu Undangan: nama tamu, konfirmasi kehadiran (RSVP), jumlah tamu hadir, pesan/doa di buku tamu, status check-in QR di lokasi acara, serta konfirmasi kiriman hadiah apabila tamu mengisi formulir terkait.',
    ],
  },
  {
    id: 'google-oauth',
    title: 'Penggunaan Data Google OAuth',
    paragraphs: [
      'Apabila Anda memilih opsi "Masuk dengan Google" atau "Daftar dengan Google", RestuKisah hanya meminta izin akses profil dasar yang diperlukan untuk autentikasi akun, yaitu OpenID (openid), alamat email (userinfo.email), dan profil dasar seperti nama serta foto avatar (userinfo.profile).',
    ],
    bullets: [
      'Data profil Google Anda hanya dipakai untuk membuat akun, menampilkan nama profil di dashboard, dan mengautentikasi sesi login Anda secara aman.',
      'RestuKisah tidak meminta izin dan tidak pernah mengakses isi Gmail, Google Contacts, Google Drive, Google Calendar, maupun data sensitif Google lainnya.',
      'Kami tidak menjual, menyewakan, ataupun menggunakan data Google pengguna untuk penargetan iklan atau pelatihan model kecerdasan buatan (AI).',
    ],
    note: 'Penggunaan dan pemindahan informasi yang diterima dari Google API oleh RestuKisah mematuhi Google API Services User Data Policy, termasuk persyaratan Limited Use.',
  },
  {
    id: 'tujuan-penggunaan',
    title: 'Bagaimana Kami Menggunakan Informasi Anda',
    paragraphs: [
      'Seluruh data yang Anda berikan digunakan semata-mata untuk operasional layanan RestuKisah:',
    ],
    bullets: [
      'Menyediakan workspace perencanaan pernikahan pribadi Anda (Administrasi KUA, Checklist, Budget & Termin, Tamu & WhatsApp, Rundown, dan Editor Undangan).',
      'Menampilkan halaman undangan digital publik sesuai slug URL yang Anda tentukan (misalnya https://www.restukisah.my.id/nama-pasangan) hanya jika Anda mengatur data tersebut untuk ditampilkan.',
      'Mengirimkan email verifikasi akun atau tautan pemulihan kata sandi saat Anda memintanya.',
      'Menjaga keandalan sistem, mendeteksi aktivitas mencurigakan, dan melindungi integritas data pengguna.',
    ],
  },
  {
    id: 'keamanan-isolasi',
    title: 'Penyimpanan, Enkripsi & Isolasi Data',
    paragraphs: [
      'Data akun dan proyek pernikahan Anda dikelola menggunakan infrastruktur Supabase (Autentikasi & Database PostgreSQL) melalui koneksi terenkripsi HTTPS/TLS.',
      'Setiap proyek pernikahan di dashboard RestuKisah dilindungi oleh kebijakan Row Level Security (RLS) di tingkat basis data. Artinya, data proyek pernikahan Anda terisolasi sepenuhnya dan hanya dapat dibaca atau diubah oleh akun pemilik proyek maupun anggota yang Anda beri akses resmi.',
      'Kata sandi yang Anda buat saat mendaftar di-hash menggunakan mekanisme keamanan standar industri di server autentikasi sehingga tidak pernah disimpan atau dibaca dalam bentuk teks biasa.',
    ],
  },
  {
    id: 'cookie-sesi',
    title: 'Cookie & Pengelolaan Sesi',
    paragraphs: [
      'RestuKisah menggunakan cookie sesi esensial untuk mempertahankan status login Anda secara aman saat berpindah antar halaman dashboard dan onboarding.',
      'Kami tidak menanamkan cookie pelacak iklan pihak ketiga maupun menjual riwayat kunjungan Anda kepada jaringan periklanan mana pun.',
    ],
  },
  {
    id: 'hak-pengguna',
    title: 'Hak Anda atas Data Pribadi',
    paragraphs: [
      'Sesuai prinsip perlindungan data pribadi yang berlaku di Indonesia, Anda memiliki kendali penuh atas data Anda:',
    ],
    bullets: [
      'Mengakses & Memperbarui Data: Anda dapat mengedit profil, daftar tamu, anggaran, maupun konten undangan langsung dari halaman dashboard kapan saja.',
      'Mengelola Publikasi Undangan: Anda menentukan sendiri teks, foto, dan detail amplop digital yang ingin tampil atau disembunyikan pada undangan digital Anda.',
      'Penghapusan Data & Akun: Anda berhak meminta penghapusan akun serta seluruh data proyek pernikahan terkait secara permanen dari basis data kami melalui saluran dukungan resmi RestuKisah.',
    ],
  },
  {
    id: 'perubahan-kontak',
    title: 'Pembaruan Kebijakan & Kontak',
    paragraphs: [
      'Kami dapat memperbarui Kebijakan Privasi ini sewaktu-waktu seiring penambahan fitur baru atau penyesuaian regulasi perlindungan data pribadi yang berlaku. Perubahan akan langsung ditampilkan di halaman https://www.restukisah.my.id/privacy dengan tanggal pembaruan terbaru di bagian atas.',
      'Jika Anda memiliki pertanyaan mengenai privasi data, penggunaan Google OAuth, atau permintaan penghapusan data akun, Anda dapat menghubungi pengelola melalui situs resmi https://www.restukisah.my.id.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      badge="Privasi"
      title="Kebijakan Privasi RestuKisah"
      subtitle="Komitmen kami dalam menjaga kerahasiaan, keamanan, dan isolasi data pribadi serta rencana pernikahan Anda di platform RestuKisah."
      lastUpdated="28 November 2026"
      activeRoute="privacy"
      sections={PRIVACY_SECTIONS}
    />
  );
}
