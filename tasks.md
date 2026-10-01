# RestuKisah: Development Roadmap & Sprint Backlog (`tasks.md`)
**Platform:** Next.js (App Router), Tailwind CSS, Supabase, Framer Motion, GSAP  
**Theme:** Soft Neobrutalism  

---

## Ringkasan Sprint Plan

```
[Sprint 1: Project Setup & Foundation] 
   └── [Sprint 2: Dashboard Shell & Overview]
          ├── [Sprint 3: Administrasi KUA & Checklist]
          ├── [Sprint 4: Budget & Termin Tracker]
          ├── [Sprint 5: Tamu, WA Generator & QR Scanner]
          └── [Sprint 6: Undangan Publik GSAP & Rundown]
```

---

### Sprint 1: Project Scaffolding & Foundation
- [ ] Inisialisasi Proyek Next.js (TypeScript, Tailwind CSS, App Router, ESLint).
- [ ] Install dependensi inti:
  - `@supabase/supabase-js`, `@supabase/ssr`
  - `framer-motion`, `gsap`, `canvas-confetti`
  - `lucide-react`, `clsx`, `tailwind-merge`
- [ ] Implementasi token `tailwind.config.ts` sesuai `desain.md` (warna canvas, wedding accents, hard shadow 3D, font setup).
- [ ] Konfigurasi Supabase Client & Server helpers (`lib/supabase/client.ts`, `server.ts`, `middleware.ts`).
- [ ] Generate TypeScript Database Types dari `schema.sql`.
- [ ] Setup Mock Data Provider / Seeder untuk kemudahan development lokal tanpa dependency koneksi instan.

---

### Sprint 2: Dashboard Shell & Overview Page
- [ ] Buat layout induk Dashboard (`app/(dashboard)/layout.tsx`):
  - Sidebar Navigasi Neobrutalis yang responsif (Collapsible di mobile, border 2px, hard shadow).
  - Topbar dengan Avatar Catin, Wedding Title Switcher, dan Quick Action button.
- [ ] Halaman **Overview** (`app/(dashboard)/dashboard/page.tsx`):
  - Countdown Card interaktif (Hari, Jam, Menit menuju akad).
  - Ringkasan Meteran Anggaran (Budget vs Pengeluaran Realistis).
  - Ringkasan Progres Checklist & Berkas KUA (Progress bar neobrutalis).
  - Quick RSVP Stats (Total Undangan, Konfirmasi Hadir, Belum Konfirmasi).

---

### Sprint 3: Modul Administrasi KUA & Checklist Planner
- [ ] **Modul Administrasi KUA** (`/dashboard/administrasi`):
  - Kartu berkas bertahap (RT/RW $\rightarrow$ Kelurahan N1-N4 $\rightarrow$ Puskesmas Elsimil $\rightarrow$ KUA).
  - Status switch (Belum Diurus, Dalam Proses, Selesai).
  - Upload file / mockup dokumen vault.
  - Peringatan tenggat waktu pendaftaran ($H-10$ hari kerja).
- [ ] **Modul Checklist To-Do** (`/dashboard/checklist`):
  - Filter kategori (*Venue, Catering, MUA, Dokumentasi, Legalitas*).
  - Filter timeline (*H-12 Bulan, H-6 Bulan, H-1 Bulan, Hari-H*).
  - Tampilan List & Kanban Card dengan animasi centang Framer Motion.
  - Form tambah tugas baru & assign PIC (Pria, Wanita, WO).

---

### Sprint 4: Modul Budget & Termin Pembayaran Vendor
- [ ] **Dashboard Budget Tracker** (`/dashboard/budget`):
  - Kalkulator alokasi anggaran total vs alokasi rekomendasi.
  - Tabel rincian pengeluaran per kategori (*Estimated vs Actual*).
- [ ] **Pelacakan Termin Pembayaran (Milestones)**:
  - Breakdown pembayaran per vendor: *DP (Down Payment), Termin 1, Pelunasan*.
  - Indikator status Lunas / Belum Lunas dengan badge neobrutalis.
  - Input tanggal jatuh tempo & modal upload bukti transfer.

---

### Sprint 5: Manajemen Tamu, Generator WhatsApp & QR Scanner
- [ ] **Buku Tamu & Pengelolaan Undangan** (`/dashboard/tamu`):
  - Tabel tamu dengan search, filter kategori (VIP, Keluarga, Teman), dan kuota pax.
  - Tombol **"Kirim Undangan WhatsApp"**: Membuka WhatsApp secara otomatis dengan format pesan personalisasi dan tautan `?to=Nama+Tamu`.
  - Download/Export QR Code individual per tamu.
- [ ] **Portal Meja Resepsi (Check-In Tamu)** (`/[slug]/check-in`):
  - Kamera QR Code Scanner (HTML5 QR Scanner) untuk HP/Tablet meja tamu.
  - Validasi instan ke Supabase (`is_checked_in = true`).
  - Audio *beep feedback* & alert sukses warna hijau neobrutalis.
  - Counter kehadiran tamu yang ter-update real-time.

---

### Sprint 6: Mesin Undangan Publik GSAP & Rundown Hari-H
- [ ] **Halaman Undangan Publik** (`/[slug]/page.tsx`):
  - Cover Amplop Buka Segel (*GSAP Opening Envelope Animation*).
  - Audio Player mengambang dengan kontrol Play/Pause.
  - Profil Kedua Mempelai & Galeri Foto Prewedding (Parallax scroll).
  - Detail Acara (Akad & Resepsi) + Integrasi Google Maps & Add to Calendar.
  - Formulir RSVP Interaktif & Amplop Digital (Salin No. Rekening & QRIS).
  - Wall Ucapan Doa Realtime dengan efek confetti saat kirim ucapan.
- [ ] **Modul Rundown & Guidebook** (`/dashboard/rundown`):
  - Timeline jadwal menit demi menit (05:00 - 21:00).
  - Kontak darurat panitia dan vendor.
  - Tombol **Print / Export PDF** siap pakai untuk dibagikan ke keluarga dan WO.
