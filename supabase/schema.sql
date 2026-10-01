-- ==============================================================================
-- RESTUKISAH - PRODUCTION SUPABASE DATABASE SCHEMA
-- Multi-Tenant SaaS Wedding Operating System
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. CUSTOM ENUMS
CREATE TYPE wedding_status AS ENUM ('planning', 'published', 'completed', 'archived');
CREATE TYPE member_role AS ENUM ('owner', 'partner', 'organizer', 'collaborator', 'receptionist');
CREATE TYPE admin_doc_stage AS ENUM ('rt_rw', 'kelurahan', 'kesehatan', 'kua_disdukcapil');
CREATE TYPE admin_doc_status AS ENUM ('not_started', 'in_progress', 'ready_to_submit', 'completed');
CREATE TYPE checklist_status AS ENUM ('todo', 'in_progress', 'done');
CREATE TYPE budget_category AS ENUM (
  'venue', 'catering', 'decoration', 'attire_mua', 
  'documentation', 'entertainment', 'invitation_souvenir', 
  'legal_admin', 'emergency_fund', 'other'
);
CREATE TYPE payment_status AS ENUM ('unpaid', 'down_payment', 'paid_full');
CREATE TYPE rsvp_status AS ENUM ('pending', 'attending', 'declined');
CREATE TYPE guest_category AS ENUM ('vip', 'keluarga', 'sahabat', 'teman_kantor', 'tetangga', 'umum');

-- ==============================================================================
-- 3. TABLES DEFINITION
-- ==============================================================================

-- 3.1 PROFILES (Sinkronisasi dengan auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.2 WEDDINGS (Penyewa / Tenant Utama)
CREATE TABLE IF NOT EXISTS public.weddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  groom_name TEXT NOT NULL,
  groom_nickname TEXT,
  bride_name TEXT NOT NULL,
  bride_nickname TEXT,
  wedding_date DATE NOT NULL,
  location_city TEXT NOT NULL,
  target_budget NUMERIC(15, 2) DEFAULT 0.00,
  status wedding_status DEFAULT 'planning',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.3 WEDDING_MEMBERS (Role-Based Collaboration)
CREATE TABLE IF NOT EXISTS public.wedding_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role member_role NOT NULL DEFAULT 'partner',
  invited_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(wedding_id, user_id)
);

-- 3.4 ADMIN_DOCUMENTS (Legal & KUA Tracker)
CREATE TABLE IF NOT EXISTS public.admin_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
  stage admin_doc_stage NOT NULL,
  document_name TEXT NOT NULL,
  status admin_doc_status DEFAULT 'not_started',
  file_url TEXT,
  due_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.5 CHECKLIST_ITEMS (To-Do & Milestones H-12 s/d Hari-H)
CREATE TABLE IF NOT EXISTS public.checklist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Umum',
  timeframe TEXT NOT NULL DEFAULT 'H-6 Bulan',
  status checklist_status DEFAULT 'todo',
  deadline DATE,
  assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.6 BUDGET_ITEMS (Kategori Pengeluaran & Estimasi)
CREATE TABLE IF NOT EXISTS public.budget_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
  category budget_category NOT NULL DEFAULT 'other',
  item_name TEXT NOT NULL,
  vendor_name TEXT,
  estimated_cost NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
  actual_cost NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.7 PAYMENT_MILESTONES (Termin Pembayaran: DP & Pelunasan)
CREATE TABLE IF NOT EXISTS public.payment_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  budget_item_id UUID NOT NULL REFERENCES public.budget_items(id) ON DELETE CASCADE,
  milestone_title TEXT NOT NULL,
  amount NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
  due_date DATE,
  is_paid BOOLEAN DEFAULT false,
  paid_date DATE,
  receipt_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.8 GUESTS (Daftar Tamu & Meja Resepsi)
CREATE TABLE IF NOT EXISTS public.guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  category guest_category DEFAULT 'umum',
  allocated_pax INT NOT NULL DEFAULT 1,
  qr_token TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(16), 'hex'),
  table_number TEXT,
  is_checked_in BOOLEAN DEFAULT false,
  checked_in_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.9 RSVPS (Konfirmasi Kehadiran Tamu)
CREATE TABLE IF NOT EXISTS public.rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_id UUID UNIQUE NOT NULL REFERENCES public.guests(id) ON DELETE CASCADE,
  status rsvp_status NOT NULL DEFAULT 'pending',
  confirmed_pax INT DEFAULT 0,
  message TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.10 WISHES (Buku Tamu / Live Wishes Wall)
CREATE TABLE IF NOT EXISTS public.wishes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
  sender_name TEXT NOT NULL,
  message TEXT NOT NULL,
  relationship TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.11 RUNDOWN_ITEMS (Jadwal Menit demi Menit Hari-H)
CREATE TABLE IF NOT EXISTS public.rundown_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
  time_start TIME NOT NULL,
  time_end TIME NOT NULL,
  activity_title TEXT NOT NULL,
  location TEXT,
  pic_name TEXT,
  pic_contact TEXT,
  notes TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.12 INVITATION_SETTINGS (Konfigurasi Tema & Konten Undangan Digital)
CREATE TABLE IF NOT EXISTS public.invitation_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id UUID UNIQUE NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
  template_theme TEXT NOT NULL DEFAULT 'soft_neobrutalism',
  audio_url TEXT,
  groom_details JSONB DEFAULT '{}'::jsonb,
  bride_details JSONB DEFAULT '{}'::jsonb,
  events_data JSONB DEFAULT '[]'::jsonb,
  story_timeline JSONB DEFAULT '[]'::jsonb,
  gallery_urls JSONB DEFAULT '[]'::jsonb,
  bank_accounts JSONB DEFAULT '[]'::jsonb,
  qris_image_url TEXT,
  gift_address TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 4. INDICES
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_weddings_slug ON public.weddings(slug);
CREATE INDEX IF NOT EXISTS idx_wedding_members_user ON public.wedding_members(user_id);
CREATE INDEX IF NOT EXISTS idx_checklist_wedding ON public.checklist_items(wedding_id);
CREATE INDEX IF NOT EXISTS idx_budget_wedding ON public.budget_items(wedding_id);
CREATE INDEX IF NOT EXISTS idx_guests_wedding ON public.guests(wedding_id);
CREATE INDEX IF NOT EXISTS idx_guests_qr_token ON public.guests(qr_token);
CREATE INDEX IF NOT EXISTS idx_wishes_wedding ON public.wishes(wedding_id);

-- ==============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wedding_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rundown_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitation_settings ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_wedding_member(p_wedding_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.weddings w
    WHERE w.id = p_wedding_id AND w.owner_id = auth.uid()
  ) OR EXISTS (
    SELECT 1 FROM public.wedding_members wm
    WHERE wm.wedding_id = p_wedding_id AND wm.user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles
CREATE POLICY "Users can manage own profile" 
ON public.profiles FOR ALL USING (auth.uid() = id);

-- Weddings
CREATE POLICY "Members can view weddings" 
ON public.weddings FOR SELECT USING (is_wedding_member(id));

CREATE POLICY "Owners can update weddings" 
ON public.weddings FOR UPDATE USING (owner_id = auth.uid());

CREATE POLICY "Authenticated users can create wedding" 
ON public.weddings FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Public can view weddings by slug" 
ON public.weddings FOR SELECT USING (status != 'archived');

-- Invitation Settings
CREATE POLICY "Public can view invitation settings" 
ON public.invitation_settings FOR SELECT USING (true);

CREATE POLICY "Members can update invitation settings" 
ON public.invitation_settings FOR ALL USING (is_wedding_member(wedding_id));

-- Guests
CREATE POLICY "Members can view and manage guests" 
ON public.guests FOR ALL USING (is_wedding_member(wedding_id));

CREATE POLICY "Public can view guest info by token" 
ON public.guests FOR SELECT USING (true);

-- Wishes & RSVP
CREATE POLICY "Public can insert wishes" 
ON public.wishes FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can read wishes" 
ON public.wishes FOR SELECT USING (true);

CREATE POLICY "Public can submit RSVP" 
ON public.rsvps FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can update own RSVP" 
ON public.rsvps FOR UPDATE USING (true);

-- Management Data
CREATE POLICY "Members can access checklists" 
ON public.checklist_items FOR ALL USING (is_wedding_member(wedding_id));

CREATE POLICY "Members can access admin docs" 
ON public.admin_documents FOR ALL USING (is_wedding_member(wedding_id));

CREATE POLICY "Members can access budget" 
ON public.budget_items FOR ALL USING (is_wedding_member(wedding_id));

CREATE POLICY "Members can access milestones" 
ON public.payment_milestones FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.budget_items b 
    WHERE b.id = payment_milestones.budget_item_id AND is_wedding_member(b.wedding_id)
  )
);

CREATE POLICY "Members can access rundowns" 
ON public.rundown_items FOR ALL USING (is_wedding_member(wedding_id));

-- ==============================================================================
-- 6. AUTOMATED TRIGGERS
-- ==============================================================================

-- 6.1 Trigger Profil
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Pengguna Baru'),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6.2 Trigger Auto-Seed Berkas KUA & Checklist Default Indonesia
CREATE OR REPLACE FUNCTION public.seed_default_wedding_data()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.admin_documents (wedding_id, stage, document_name, notes) VALUES
    (NEW.id, 'rt_rw', 'Surat Pengantar Nikah RT & RW', 'Minta pengantar dari ketua RT dan RW domisili mempelai.'),
    (NEW.id, 'kelurahan', 'Formulir Model N1 (Pengantar Nikah)', 'Diterbitkan kelurahan domisili.'),
    (NEW.id, 'kelurahan', 'Formulir Model N2 (Permohonan Kehendak Nikah)', 'Diterbitkan kelurahan domisili.'),
    (NEW.id, 'kelurahan', 'Formulir Model N4 (Persetujuan Calon Mempelai)', 'Ditandatangani kedua calon mempelai.'),
    (NEW.id, 'kesehatan', 'Sertifikat Layak Kawin / Elsimil (BKKBN)', 'Pemeriksaan HB, lingkar lengan, dan screening kesehatan catin di Puskesmas.'),
    (NEW.id, 'kesehatan', 'Suntik / Vaksin Tetanus Toksoid (TT)', 'Bagi calon pengantin wanita di Puskesmas.'),
    (NEW.id, 'kua_disdukcapil', 'Pas Foto Berlatar Biru (2x3 & 4x6)', 'Format resmi KUA dengan busana sopan/berkerah.'),
    (NEW.id, 'kua_disdukcapil', 'Surat Rekomendasi Nikah (Jika Numpang Nikah)', 'Diperlukan jika akad nikah dilaksanakan di luar kecamatan domisili.');

  INSERT INTO public.checklist_items (wedding_id, category, timeframe, title, notes) VALUES
    (NEW.id, 'Konsep & Tanggal', 'H-12 Bulan', 'Tentukan Tanggal & Konsep Acara', 'Diskusikan bersama kedua keluarga besar.'),
    (NEW.id, 'Venue & Catering', 'H-10 Bulan', 'Booking Tempat / Gedung & DP Catering', 'Catering dan venue adalah pengeluaran prioritas terbesar.'),
    (NEW.id, 'MUA & Dokumentasi', 'H-8 Bulan', 'Pilih Makeup Artist (MUA) & Fotografer Utama', 'Booking fotografer dan MUA favorit sebelum jadwal penuh.'),
    (NEW.id, 'Legalitas', 'H-3 Bulan', 'Mulai Pengurusan Berkas KUA / Catatan Sipil', 'Urus surat RT/RW dan kelurahan.'),
    (NEW.id, 'Tamu & Undangan', 'H-2 Bulan', 'Finalisasi Daftar Tamu & Setup Undangan Digital', 'Kumpulkan nomor WhatsApp keluarga dan teman dekat.'),
    (NEW.id, 'Technical Meeting', 'H-2 Minggu', 'Technical Meeting (TM) Seluruh Vendor & WO', 'Sinkronisasi rundown dan kelengkapan listrik/sound system.');

  INSERT INTO public.invitation_settings (wedding_id, template_theme) VALUES
    (NEW.id, 'soft_neobrutalism');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_wedding_created
  AFTER INSERT ON public.weddings
  FOR EACH ROW EXECUTE FUNCTION public.seed_default_wedding_data();

-- 7. REALTIME
ALTER PUBLICATION supabase_realtime ADD TABLE public.wishes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.guests;
ALTER PUBLICATION supabase_realtime ADD TABLE public.rsvps;
