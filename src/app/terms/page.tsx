import type { Metadata } from 'next';
import LegalPageShell, { type LegalSection } from '@/components/legal/LegalPageShell';
import { getSiteDisplayHost, getSiteOrigin } from '@/lib/auth/validation';

export function generateMetadata(): Metadata {
  const siteHost = getSiteDisplayHost();
  return {
    title: 'Syarat & Ketentuan — RestuKisah',
    description: `Syarat dan ketentuan penggunaan platform manajemen pernikahan dan undangan digital RestuKisah di ${siteHost}.`,
  };
}

function buildTermsSections(siteOrigin: string): LegalSection[] {
  return [
    {
      id: 'penerimaan',
      title: 'Penerimaan Syarat & Ketentuan',
      paragraphs: [
        `Selamat datang di RestuKisah (${siteOrigin}). Syarat & Ketentuan ini mengatur akses dan penggunaan seluruh layanan, modul perencanaan pernikahan, serta pembuat undangan digital yang disediakan melalui situs web RestuKisah.`,
        'Dengan membuat akun, masuk melalui email atau Google OAuth, maupun menggunakan layanan kami, Anda menyatakan telah membaca, memahami, dan menyetujui untuk terikat oleh ketentuan ini serta Kebijakan Privasi kami.',
      ],
    },
    {
      id: 'ruang-lingkup',
      title: 'Ruang Lingkup Layanan',
      paragraphs: [
        'RestuKisah menyediakan aplikasi berbasis web untuk membantu calon pengantin dan/atau Wedding Organizer (WO) dalam mengelola persiapan acara pernikahan, meliputi:',
      ],
      bullets: [
        'Panduan pencatatan berkas administrasi pra-nikah dan KUA/Disdukcapil.',
        'Checklist persiapan bertahap, pelacakan anggaran & termin pembayaran vendor, serta penyusunan rundown acara.',
        'Pengelolaan daftar tamu, tautan kirim undangan WhatsApp, konfirmasi kehadiran (RSVP), buku tamu, serta sistem check-in QR di lokasi acara.',
        'Penyusunan dan publikasi halaman undangan digital pada slug URL khusus milik pengguna.',
      ],
    },
    {
      id: 'akun-keamanan',
      title: 'Akun Pengguna & Tanggung Jawab Keamanan',
      paragraphs: [
        'Untuk mengakses dashboard perencanaan pernikahan, Anda diwajibkan mendaftar menggunakan alamat email aktif atau akun Google yang sah.',
      ],
      bullets: [
        'Anda bertanggung jawab penuh menjaga kerahasiaan kata sandi serta perangkat yang digunakan untuk masuk ke akun Anda.',
        'Anda setuju untuk memberikan informasi pendaftaran yang benar dan tidak menyamar sebagai pihak lain.',
        'Setiap aktivitas dan perubahan data proyek pernikahan yang terjadi di bawah sesi akun Anda dianggap dilakukan atas persetujuan Anda.',
      ],
    },
    {
      id: 'konten-pengguna',
      title: 'Konten Pengguna, Slug URL & Larangan Penyalahgunaan',
      paragraphs: [
        'Seluruh informasi mempelai, foto, dokumen catatan, daftar tamu, dan rincian rekening/hadiah digital yang Anda masukkan ke dalam RestuKisah sepenuhnya menjadi tanggung jawab Anda sebagai pemilik proyek.',
      ],
      bullets: [
        `Pemilihan slug URL undangan (misalnya ${siteOrigin}/nama-pasangan) tidak boleh menyerupai rute resmi sistem, merek dagang pihak lain tanpa izin, atau kata-kata yang melanggar kesusilaan.`,
        'Anda dilarang mengunggah konten atau menggunakan tautan WhatsApp dari platform ini untuk penipuan (phishing), spam massal ilegal, ujaran kebencian, pornografi, perjudian, maupun pelanggaran hak cipta pihak ketiga.',
        'RestuKisah berhak menangguhkan akun atau menonaktifkan halaman undangan publik apabila ditemukan pelanggaran terhadap ketentuan ini atau atas permintaan hukum yang sah.',
      ],
    },
    {
      id: 'penafian-kua-transaksi',
      title: 'Penafian Panduan KUA & Transaksi Pihak Ketiga',
      paragraphs: [
        'Daftar dokumen KUA, tenggat pendaftaran SIMKAH, dan contoh checklist di dalam aplikasi disusun sebagai alat bantu perencanaan agar persiapan Anda lebih terstruktur.',
      ],
      bullets: [
        'Ketentuan resmi, biaya pencatatan, dan kelengkapan persyaratan hukum pernikahan tetap mengacu pada peraturan Kantor Urusan Agama (KUA), Kementerian Agama, atau Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) setempat.',
        'Fitur pencatatan anggaran vendor dan tampilan amplop digital pada undangan bersifat informatif. RestuKisah bukan lembaga keuangan/payment gateway dan tidak memproses, menampung, ataupun menjamin transaksi dana antara Anda, tamu undangan, dan vendor pihak ketiga.',
      ],
      note: 'Selalu pastikan nomor rekening dan tautan peta lokasi yang Anda cantumkan di editor undangan sudah benar sebelum membagikan tautan kepada tamu.',
    },
    {
      id: 'kekayaan-intelektual',
      title: 'Hak Kekayaan Intelektual & Ketersediaan Layanan',
      paragraphs: [
        'Seluruh kode sumber, desain antarmuka, komponen visual, serta templat undangan digital yang disediakan di RestuKisah merupakan milik pengelola platform. Anda diberikan hak penggunaan non-eksklusif untuk keperluan acara pernikahan pribadi atau pengelolaan klien yang sah melalui platform.',
        'Kami berupaya menjaga layanan tetap stabil dan tersedia setiap saat, namun sewaktu-waktu dapat melakukan pemeliharaan terencana, pembaruan fitur, atau penyesuaian sistem demi menjaga kualitas serta keamanan platform.',
      ],
    },
    {
      id: 'perubahan-hukum',
      title: 'Perubahan Ketentuan & Hukum yang Berlaku',
      paragraphs: [
        'Syarat & Ketentuan ini diatur dan ditafsirkan berdasarkan hukum yang berlaku di Negara Kesatuan Republik Indonesia.',
        `Kami dapat memperbarui ketentuan ini bila diperlukan. Versi terbaru akan selalu dipublikasikan di ${siteOrigin}/terms dan mulai berlaku sejak tanggal pembaruan yang tertera.`,
      ],
    },
  ];
}

export default function TermsOfServicePage() {
  const siteOrigin = getSiteOrigin();

  return (
    <LegalPageShell
      badge="Ketentuan"
      title="Syarat & Ketentuan Layanan"
      subtitle="Aturan penggunaan platform manajemen pernikahan dan undangan digital RestuKisah demi kenyamanan dan keamanan seluruh pengguna."
      lastUpdated="28 November 2026"
      activeRoute="terms"
      sections={buildTermsSections(siteOrigin)}
    />
  );
}
