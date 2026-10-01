# RestuKisah: User Journey & Flowchart (`flow.md`)

**Platform:** Next.js Multi-Tenant SaaS Wedding Operating System
**Design Pattern:** Mobile-First, Realtime Sync, Soft Neobrutalism UI

---

## 1. Peta Situs Keseluruhan (Sitemap & Routing)

```mermaid
flowchart TD
    Root["/ (Landing Page Publik)"] --> Auth["/login & /register"]
    Root --> Demo["/demo/[slug] (Pratinjau Undangan)"]
  
    Auth --> DashboardGroup["/dashboard (Area Terproteksi Pengantin & WO)"]
    DashboardGroup --> Overview["/dashboard/overview (Ringkasan & Countdown)"]
    DashboardGroup --> Administrasi["/dashboard/administrasi (Birokrasi KUA & Berkas)"]
    DashboardGroup --> Checklist["/dashboard/checklist (Kanban / To-Do H-12 s/d Hari-H)"]
    DashboardGroup --> Budget["/dashboard/budget (Anggaran & Termin Vendor)"]
    DashboardGroup --> Tamu["/dashboard/tamu (Guest List & WA Blast Generator)"]
    DashboardGroup --> UndanganBuilder["/dashboard/undangan (Editor Tampilan & Tema)"]
    DashboardGroup --> Rundown["/dashboard/rundown (Run-sheet Menit demi Menit)"]
    DashboardGroup --> Settings["/dashboard/settings (Kolaborasi Anggota & Profil)"]

    Root --> PublicGroup["/[slug] (Halaman Tamu Undangan Publik)"]
    PublicGroup --> Envelope["Cover Buka Amplop (GSAP)"]
    PublicGroup --> Content["Isi Acara, Peta, Kisah Cinta & Galeri"]
    PublicGroup --> RSVPForm["Form RSVP & Kirim Ucapan Doa"]
    PublicGroup --> QRPass["Tiket QR Code Masuk Resepsi"]

    PublicGroup --> CheckIn["/[slug]/check-in (Portal Meja Resepsi - Scan QR)"]
```

---

## 2. Alur Perjalanan Pengguna (User Journeys)

### 2.1 Alur Calon Pengantin (Onboarding ke Dashboard)

Tujuan: Pasangan mendaftarkan pernikahan baru, mendapatkan URL slug unik, dan langsung dapat mengatur persiapan.

```mermaid
sequenceDiagram
    autonumber
    actor Catin as Calon Pengantin
    participant App as Web Frontend (Next.js)
    participant Auth as Supabase Auth
    participant DB as Supabase Database

    Catin->>App: Buka Landing Page & Klik "Mulai Rencanakan"
    Catin->>App: Input Email & Password / Google OAuth
    App->>Auth: Request Pendaftaran Akun
    Auth-->>App: Akun Terverifikasi (Session Active)
    App->>Catin: Menampilkan Modal "Setup Pernikahan Anda"
    Catin->>App: Input Nama Pria, Nama Wanita, Tanggal Nikah, Kota & Pilihan Slug (e.g. 'dian-bayu')
    App->>DB: INSERT into weddings & wedding_members (role: 'owner')
    DB-->>App: Wedding Project ID Terbentuk
    App->>Catin: Redirect ke /dashboard/overview (Soft Neobrutalist UI)
    Note over Catin,App: Catin melihat Countdown Hari-H, Checklist Otomatis KUA, dan Estimasi Budget
```

---

### 2.2 Alur Tamu Undangan (Guest Experience: WhatsApp $\rightarrow$ RSVP $\rightarrow$ QR Pass)

Tujuan: Tamu membuka tautan undangan personal, menikmati animasi sinematik, konfirmasi kehadiran, dan mendapatkan QR Code masuk.

```mermaid
sequenceDiagram
    autonumber
    actor Tamu as Tamu Undangan
    participant WA as WhatsApp App
    participant Web as Undangan Publik (/[slug]?to=Nama+Tamu)
    participant RT as Supabase Realtime & DB

    Tamu->>WA: Menerima Pesan Undangan dengan Link Khusus
    Tamu->>Web: Klik Link Undangan
    Web->>Tamu: Tampilan Layar Cover Amplop Mewah "Kepada Yth: Nama Tamu"
    Tamu->>Web: Klik "Buka Undangan"
    Note over Web,Tamu: Animasi GSAP membuka amplop + Musik Romantis mulai diputar otomatis
    Tamu->>Web: Scroll membaca Cerita Cinta, Lokasi Akad & Resepsi (Google Maps)
    Tamu->>Web: Mengisi Formulir RSVP (Hadir / Berhalangan, Jumlah Pax) & Tulis Ucapan Doa
    Web->>RT: POST /api/rsvp & INSERT wishes
    RT-->>Web: Live Confetti Effect & Ucapan langsung tampil di Live Wall
    Web->>Tamu: Menampilkan "Tiket Tamu & QR Code Presensi" untuk disimpan / tangkapan layar
    Tamu->>Web: Salin No. Rekening / Scan QRIS untuk Amplop Digital
```

---

### 2.3 Alur Petugas Meja Resepsi (Check-In Tamu Hari-H)

Tujuan: Menghindari antrean panjang, mencatat kehadiran tamu dengan cepat tanpa kertas, dan memantau kapasitas catering real-time.

```mermaid
sequenceDiagram
    autonumber
    actor Petugas as Penerima Tamu / WO
    actor Tamu as Tamu Datang di Venue
    participant Scanner as Portal Scanner (/[slug]/check-in)
    participant DB as Supabase DB & Realtime

    Petugas->>Scanner: Login / Masuk via PIN Meja Tamu
    Scanner->>Petugas: Kamera Scanner Aktif di Layar HP/Tablet
    Tamu->>Petugas: Menunjukkan QR Code di Layar HP
    Petugas->>Scanner: Arahkan Kamera ke QR Code Tamu
    Scanner->>DB: UPDATE guests SET is_checked_in = true, checked_in_at = NOW() WHERE qr_token = $token
    DB-->>Scanner: Data Terverifikasi (Nama: Budi Santoso, Meja: VIP 03, Pax: 2)
    Note over Scanner,Petugas: Efek Audio BEEP Sukses + Haptic Feedback Getar
    Scanner-->>Petugas: Pop-up Sukses Hijau Neobrutalis & Kuota Tamu Hadir Bertambah Real-Time
    Petugas->>Tamu: Serahkan Souvenir & Persilakan Masuk
```

---

### 2.4 Alur Wedding Organizer & Kolaborasi Anggota

Tujuan: WO dan keluarga membantu mencicil tugas tanpa mengganggu data pribadi pengantin.

```mermaid
flowchart TD
    Invite[Pengantin Undang WO via Email] --> RoleAssign{Pilih Hak Akses}
    RoleAssign -->|Organizer| WOPermission[WO: Akses Checklist, Rundown, Tamu & Budget Vendor]
    RoleAssign -->|Receptionist| ReceptionOnly[Petugas: Khusus Scan QR di Hari-H]
    RoleAssign -->|Family Partner| FamilyPermission[Keluarga: Logistik & Konfirmasi Tamu Khusus]

    WOPermission --> Work[Update Progress Checklist & Susun Rundown Jam-ke-Jam]
    Work --> PushNotif[Pengantin Menerima Pembaruan Real-Time di Dashboard]
```
