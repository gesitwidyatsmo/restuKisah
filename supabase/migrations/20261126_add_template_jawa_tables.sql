-- ==============================================================================
-- RESTUKISAH: MIGRATION - TAMBAHAN TABEL TEMPLATE JAWA & MULTI-TENANT
-- Jalankan file ini di Supabase SQL Editor jika tabel inti sudah pernah dibuat sebelumnya.
-- ==============================================================================

-- 1. TABEL PENGATURAN TEMA & VISUAL (THEMING ENGINE)
CREATE TABLE IF NOT EXISTS public.wedding_template_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id UUID UNIQUE NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
  theme_id TEXT NOT NULL DEFAULT 'jawa_parchment',
  cover_mode TEXT NOT NULL DEFAULT 'adat_jawa_cover',
  particle_effect TEXT NOT NULL DEFAULT 'pink_blossoms',
  burst_effect TEXT NOT NULL DEFAULT 'gold_butterflies',
  quote_badge_text TEXT DEFAULT 'AN INVITATION OF LOVE',
  quote_arabic_text TEXT DEFAULT 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعELَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
  quote_translation_text TEXT DEFAULT '“Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri...”',
  quote_citation_text TEXT DEFAULT '(QS. Ar-Rum: 21)',
  quote_frame_mode TEXT DEFAULT 'scalable_frame',
  audio_url TEXT DEFAULT '/templates/jawa/audio/gamelan-royal-wedding.mp3',
  closing_matur_nuwun_text TEXT DEFAULT 'Matur Nuwun',
  closing_thank_you_line1 TEXT DEFAULT 'Terima kasih telah menjadi bagian',
  closing_thank_you_line2 TEXT DEFAULT 'dari hari bahagia kami',
  enable_photobooth BOOLEAN DEFAULT true,
  custom_theme_config JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABEL DETAIL PROFIL MEMPELAI (BRIDE & GROOM PROFILE)
CREATE TABLE IF NOT EXISTS public.wedding_couples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id UUID UNIQUE NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
  -- Mempelai Pria (Groom)
  groom_full_name TEXT NOT NULL,
  groom_nickname TEXT NOT NULL,
  groom_child_order TEXT DEFAULT 'Putra Pertama dari',
  groom_father_name TEXT NOT NULL,
  groom_mother_name TEXT NOT NULL,
  groom_instagram TEXT,
  groom_instagram_url TEXT,
  groom_photo_url TEXT DEFAULT '/templates/jawa/cover/groom-full.webp',
  -- Mempelai Wanita (Bride)
  bride_full_name TEXT NOT NULL,
  bride_nickname TEXT NOT NULL,
  bride_child_order TEXT DEFAULT 'Putri Kedua dari',
  bride_father_name TEXT NOT NULL,
  bride_mother_name TEXT NOT NULL,
  bride_instagram TEXT,
  bride_instagram_url TEXT,
  bride_photo_url TEXT DEFAULT '/templates/jawa/cover/bride-full.webp',
  -- Hero / Couple Portrait Photo
  couple_hero_photo_url TEXT DEFAULT '/templates/jawa/hero/portrait-couple.webp',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABEL ACARA PERNIKAHAN (EVENTS: AKAD, RESEPSI, NGUNDUH MANTU)
CREATE TABLE IF NOT EXISTS public.wedding_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL DEFAULT 'resepsi',
  title TEXT NOT NULL,
  subtitle TEXT DEFAULT 'WEDDING CELEBRATION',
  event_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME,
  timezone TEXT DEFAULT 'WIB',
  venue_name TEXT NOT NULL,
  address TEXT NOT NULL,
  google_maps_url TEXT,
  illustration_url TEXT DEFAULT '/templates/jawa/events/event-akad.webp',
  order_index INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABEL PERJALANAN CINTA (OUR LOVE STORY)
CREATE TABLE IF NOT EXISTS public.wedding_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
  step_number TEXT NOT NULL DEFAULT '01',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABEL GALERI FOTO & VIDEO PREWEDDING
CREATE TABLE IF NOT EXISTS public.wedding_galleries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL DEFAULT 'photo',
  layout_slot TEXT NOT NULL DEFAULT 'row1',
  title TEXT NOT NULL,
  subtitle TEXT,
  media_url TEXT NOT NULL,
  thumbnail_url TEXT,
  aspect_ratio TEXT DEFAULT '318 / 289',
  flex_basis INT DEFAULT 300,
  video_duration TEXT,
  order_index INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABEL REKENING BANK & TANDA KASIH (DIGITAL ENVELOPE)
CREATE TABLE IF NOT EXISTS public.wedding_payment_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
  method_type TEXT NOT NULL DEFAULT 'bank',
  bank_slug TEXT DEFAULT 'bca',
  bank_title_badge TEXT DEFAULT 'Transfer Bank Utama',
  account_number TEXT,
  account_holder TEXT,
  qris_image_url TEXT,
  physical_recipient_name TEXT,
  physical_address TEXT,
  recipient_phone TEXT,
  order_index INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TABEL PANDUAN TAMU, DRESSCODE & KELUARGA (GUEST GUIDE & FAMILY)
CREATE TABLE IF NOT EXISTS public.wedding_guest_guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id UUID UNIQUE NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
  dresscode_title TEXT DEFAULT 'Attire for Our Special Day',
  dresscode_description TEXT DEFAULT 'Kami menghimbau tamu undangan untuk mengenakan busana formal dengan nuansa warna:',
  dresscode_swatches JSONB DEFAULT '[
    {"id": "ivory", "name": "Ivory", "alias": "Gading", "hex": "#F2DDC0", "border": "#CDB596", "textDark": true, "recommendation": "Pilihan anggun untuk atasan kebaya..."},
    {"id": "champagne", "name": "Champagne", "alias": "Emas Muda", "hex": "#D3AB77", "border": "#AC8552", "textDark": true, "recommendation": "Nuansa mewah berpadu elegan..."}
  ]'::jsonb,
  etiquette_items JSONB DEFAULT '[
    {"id": "waktu", "icon": "clock", "title": "Datang Tepat Waktu", "shortDesc": "Datang tepat waktu sesuai jadwal acara."},
    {"id": "kamera", "icon": "camera-off", "title": "Tertib Mengambil Foto", "shortDesc": "Mohon tidak menggunakan flash saat prosesi."}
  ]'::jsonb,
  family_members JSONB DEFAULT '{
    "brideFamily": {"label": "Keluarga Mempelai Wanita", "members": ["Bpk. Bambang Soediro & Ibu Ratna Dewi", "dr. Dimas Prasetya (Kakak)"]},
    "groomFamily": {"label": "Keluarga Mempelai Pria", "members": ["Bpk. Hendro Pratama & Ibu Siti Rahayu", "Anisa Pratama, S.E. (Adik)"]}
  }'::jsonb,
  live_stream_youtube_url TEXT,
  live_stream_zoom_url TEXT,
  zoom_meeting_id TEXT,
  zoom_passcode TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. TABEL LOG KONFIRMASI KADO / GIFT CONFIRMATION
CREATE TABLE IF NOT EXISTS public.wedding_gift_confirmations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
  guest_id UUID REFERENCES public.guests(id) ON DELETE SET NULL,
  sender_name TEXT NOT NULL,
  bank_name TEXT,
  nominal NUMERIC(15, 2),
  proof_receipt_url TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. INDEKS PERFORMA
CREATE INDEX IF NOT EXISTS idx_template_settings_wedding ON public.wedding_template_settings(wedding_id);
CREATE INDEX IF NOT EXISTS idx_couples_wedding ON public.wedding_couples(wedding_id);
CREATE INDEX IF NOT EXISTS idx_events_wedding_date ON public.wedding_events(wedding_id, event_date);
CREATE INDEX IF NOT EXISTS idx_stories_wedding ON public.wedding_stories(wedding_id, order_index);
CREATE INDEX IF NOT EXISTS idx_galleries_wedding ON public.wedding_galleries(wedding_id, order_index);
CREATE INDEX IF NOT EXISTS idx_payments_wedding ON public.wedding_payment_methods(wedding_id);
CREATE INDEX IF NOT EXISTS idx_gift_confirm_wedding ON public.wedding_gift_confirmations(wedding_id);

-- 10. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.wedding_template_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wedding_couples ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wedding_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wedding_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wedding_galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wedding_payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wedding_guest_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wedding_gift_confirmations ENABLE ROW LEVEL SECURITY;

-- 11. POLICIES (DROP SEBELUM CREATE AGAR AMAN DIJALANKAN BERULANG KALI)
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public can view template settings" ON public.wedding_template_settings;
  CREATE POLICY "Public can view template settings" ON public.wedding_template_settings FOR SELECT USING (true);

  DROP POLICY IF EXISTS "Public can view couples profile" ON public.wedding_couples;
  CREATE POLICY "Public can view couples profile" ON public.wedding_couples FOR SELECT USING (true);

  DROP POLICY IF EXISTS "Public can view wedding events" ON public.wedding_events;
  CREATE POLICY "Public can view wedding events" ON public.wedding_events FOR SELECT USING (true);

  DROP POLICY IF EXISTS "Public can view wedding stories" ON public.wedding_stories;
  CREATE POLICY "Public can view wedding stories" ON public.wedding_stories FOR SELECT USING (true);

  DROP POLICY IF EXISTS "Public can view wedding galleries" ON public.wedding_galleries;
  CREATE POLICY "Public can view wedding galleries" ON public.wedding_galleries FOR SELECT USING (true);

  DROP POLICY IF EXISTS "Public can view wedding payment methods" ON public.wedding_payment_methods;
  CREATE POLICY "Public can view wedding payment methods" ON public.wedding_payment_methods FOR SELECT USING (true);

  DROP POLICY IF EXISTS "Public can view wedding guest guides" ON public.wedding_guest_guides;
  CREATE POLICY "Public can view wedding guest guides" ON public.wedding_guest_guides FOR SELECT USING (true);

  DROP POLICY IF EXISTS "Public can insert gift confirmation" ON public.wedding_gift_confirmations;
  CREATE POLICY "Public can insert gift confirmation" ON public.wedding_gift_confirmations FOR INSERT WITH CHECK (true);
END $$;
