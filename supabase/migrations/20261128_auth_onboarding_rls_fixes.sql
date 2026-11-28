-- ==============================================================================
-- RESTUKISAH: MIGRATION - AUTH, ONBOARDING, RLS FIXES & REAL DATA ISOLATION
-- Jalankan file ini di Supabase SQL Editor setelah schema.sql dan
-- 20261126_add_template_jawa_tables.sql. Aman dijalankan berulang kali.
-- ==============================================================================

-- 1. BACKFILL PROFILES UNTUK USER YANG SUDAH TERDAFTAR SEBELUM TRIGGER AKTIF
INSERT INTO public.profiles (id, full_name, phone, avatar_url)
SELECT
  u.id,
  COALESCE(
    NULLIF(trim(u.raw_user_meta_data->>'full_name'), ''),
    NULLIF(trim(u.raw_user_meta_data->>'name'), ''),
    NULLIF(split_part(COALESCE(u.email, ''), '@', 1), ''),
    'Pengguna RestuKisah'
  ),
  NULLIF(trim(u.raw_user_meta_data->>'phone'), ''),
  NULLIF(trim(COALESCE(u.raw_user_meta_data->>'avatar_url', u.raw_user_meta_data->>'picture', '')), '')
FROM auth.users u
ON CONFLICT (id) DO NOTHING;

-- 2. PERBAIKI FUNGSI HELPER KEANGGOTAAN & KEPEMILIKAN WEDDING
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.is_wedding_owner(p_wedding_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.weddings w
    WHERE w.id = p_wedding_id AND w.owner_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 3. RPC CEK KETERSEDIAAN SLUG TANPA MENGEKSPOS DATA WEDDING ORANG LAIN
CREATE OR REPLACE FUNCTION public.is_wedding_slug_available(p_slug TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  v_clean TEXT := lower(trim(COALESCE(p_slug, '')));
BEGIN
  IF v_clean = '' OR v_clean = ANY (ARRAY[
    'login', 'register', 'signup', 'signin', 'logout',
    'forgot-password', 'reset-password', 'onboarding', 'dashboard',
    'auth', 'api', 'demo', 'admin', 'settings', 'check-in',
    'privacy', 'terms', 'legal', 'kebijakan-privasi', 'syarat-ketentuan',
    'favicon.ico'
  ]) THEN
    RETURN false;
  END IF;

  RETURN NOT EXISTS (
    SELECT 1 FROM public.weddings w WHERE lower(w.slug) = v_clean
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

REVOKE ALL ON FUNCTION public.is_wedding_slug_available(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_wedding_slug_available(TEXT) TO authenticated;

-- 4. PERBAIKI TRIGGER HANDLE_NEW_USER (EMAIL/PASSWORD + GOOGLE OAUTH)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(
      NULLIF(trim(NEW.raw_user_meta_data->>'full_name'), ''),
      NULLIF(trim(NEW.raw_user_meta_data->>'name'), ''),
      NULLIF(split_part(COALESCE(NEW.email, ''), '@', 1), ''),
      'Pengguna RestuKisah'
    ),
    NULLIF(trim(NEW.raw_user_meta_data->>'phone'), ''),
    NULLIF(trim(COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', '')), '')
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = COALESCE(NULLIF(EXCLUDED.full_name, 'Pengguna RestuKisah'), public.profiles.full_name),
    phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
    avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url),
    updated_at = NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. PERBAIKI TRIGGER SEED DATA AWAL PERNIKAHAN (BEBAS DATA DUMMY)
CREATE OR REPLACE FUNCTION public.seed_default_wedding_data()
RETURNS TRIGGER AS $$
DECLARE
  v_simkah_due DATE := (NEW.wedding_date - INTERVAL '14 days')::DATE;
  v_groom_nick TEXT := COALESCE(NULLIF(trim(NEW.groom_nickname), ''), split_part(NEW.groom_name, ' ', 1));
  v_bride_nick TEXT := COALESCE(NULLIF(trim(NEW.bride_nickname), ''), split_part(NEW.bride_name, ' ', 1));
BEGIN
  -- 5.1 Daftarkan pembuat proyek sebagai 'owner' di wedding_members
  INSERT INTO public.wedding_members (wedding_id, user_id, role)
  VALUES (NEW.id, NEW.owner_id, 'owner')
  ON CONFLICT (wedding_id, user_id) DO NOTHING;

  -- 5.2 Seed daftar berkas administrasi KUA Indonesia (netral, spesifik pernikahan ini)
  INSERT INTO public.admin_documents (wedding_id, stage, document_name, due_date, notes) VALUES
    (NEW.id, 'rt_rw', 'Surat Pengantar Nikah RT & RW', NULL, 'Minta pengantar dari ketua RT dan RW domisili masing-masing mempelai.'),
    (NEW.id, 'kelurahan', 'Formulir Model N1 (Pengantar Nikah)', NULL, 'Diterbitkan kantor kelurahan/desa domisili.'),
    (NEW.id, 'kelurahan', 'Formulir Model N2 (Permohonan Kehendak Nikah)', NULL, 'Diterbitkan kantor kelurahan/desa domisili.'),
    (NEW.id, 'kelurahan', 'Formulir Model N4 (Persetujuan Calon Mempelai)', NULL, 'Ditandatangani kedua calon mempelai.'),
    (NEW.id, 'kesehatan', 'Sertifikat Layak Kawin / Elsimil (BKKBN)', NULL, 'Screening kesehatan calon pengantin di Puskesmas & aplikasi Elsimil.'),
    (NEW.id, 'kesehatan', 'Suntik / Vaksin Tetanus Toksoid (TT)', NULL, 'Bagi calon pengantin wanita di Puskesmas atau fasilitas kesehatan.'),
    (NEW.id, 'kua_disdukcapil', 'Pas Foto Berlatar Biru (2x3 & 4x6)', NULL, 'Format resmi KUA dengan busana sopan/berkerah.'),
    (NEW.id, 'kua_disdukcapil', 'Pendaftaran SIMKAH & Rekomendasi Nikah', v_simkah_due, 'Batas aman pendaftaran ke KUA minimal H-10 hari kerja sebelum akad.');

  -- 5.3 Seed checklist persiapan dasar
  INSERT INTO public.checklist_items (wedding_id, category, timeframe, title, notes) VALUES
    (NEW.id, 'Konsep & Tanggal', 'H-12 Bulan', 'Tentukan Tanggal & Konsep Acara', 'Diskusikan bersama kedua keluarga besar.'),
    (NEW.id, 'Venue & Catering', 'H-10 Bulan', 'Booking Tempat / Gedung & DP Catering', 'Catering dan venue biasanya menjadi alokasi anggaran terbesar.'),
    (NEW.id, 'MUA & Dokumentasi', 'H-8 Bulan', 'Pilih Makeup Artist (MUA) & Fotografer Utama', 'Amankan jadwal vendor pilihan sebelum tanggal terisi.'),
    (NEW.id, 'Legalitas', 'H-3 Bulan', 'Mulai Pengurusan Berkas KUA / Catatan Sipil', 'Urus surat pengantar RT/RW, kelurahan, dan Puskesmas.'),
    (NEW.id, 'Tamu & Undangan', 'H-2 Bulan', 'Finalisasi Daftar Tamu & Setup Undangan Digital', 'Lengkapi nomor WhatsApp tamu undangan.'),
    (NEW.id, 'Technical Meeting', 'H-2 Minggu', 'Technical Meeting (TM) Seluruh Vendor & WO', 'Sinkronisasi rundown acara dan kebutuhan teknis hari-H.');

  -- 5.4 Seed pengaturan undangan dasar
  INSERT INTO public.invitation_settings (wedding_id, template_theme)
  VALUES (NEW.id, 'jawa_parchment')
  ON CONFLICT (wedding_id) DO NOTHING;

  -- 5.5 Seed tabel relasional undangan (jika migrasi 20261126 sudah dijalankan)
  IF to_regclass('public.wedding_template_settings') IS NOT NULL THEN
    INSERT INTO public.wedding_template_settings (wedding_id, theme_id, quote_arabic_text)
    VALUES (
      NEW.id,
      'jawa_parchment',
      'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً'
    )
    ON CONFLICT (wedding_id) DO NOTHING;
  END IF;

  IF to_regclass('public.wedding_couples') IS NOT NULL THEN
    INSERT INTO public.wedding_couples (
      wedding_id,
      groom_full_name,
      groom_nickname,
      groom_father_name,
      groom_mother_name,
      bride_full_name,
      bride_nickname,
      bride_father_name,
      bride_mother_name
    ) VALUES (
      NEW.id,
      NEW.groom_name,
      v_groom_nick,
      '',
      '',
      NEW.bride_name,
      v_bride_nick,
      '',
      ''
    )
    ON CONFLICT (wedding_id) DO NOTHING;
  END IF;

  IF to_regclass('public.wedding_guest_guides') IS NOT NULL THEN
    INSERT INTO public.wedding_guest_guides (wedding_id, family_members)
    VALUES (
      NEW.id,
      '{"brideFamily":{"label":"Keluarga Mempelai Wanita","members":[]},"groomFamily":{"label":"Keluarga Mempelai Pria","members":[]}}'::jsonb
    )
    ON CONFLICT (wedding_id) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_wedding_created ON public.weddings;
CREATE TRIGGER on_wedding_created
  AFTER INSERT ON public.weddings
  FOR EACH ROW EXECUTE FUNCTION public.seed_default_wedding_data();

-- 6. PERBAIKAN RLS POLICIES (PROFILES, WEDDING_MEMBERS, RSVPS & TABEL TEMPLATE)
DO $$ BEGIN
  -- 6.1 Profiles
  DROP POLICY IF EXISTS "Users can manage own profile" ON public.profiles;
  CREATE POLICY "Users can manage own profile"
    ON public.profiles FOR ALL
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

  -- 6.2 Wedding Members (sebelumnya RLS aktif tanpa policy sama sekali)
  DROP POLICY IF EXISTS "Members can view wedding members" ON public.wedding_members;
  CREATE POLICY "Members can view wedding members"
    ON public.wedding_members FOR SELECT
    USING (user_id = auth.uid() OR is_wedding_member(wedding_id));

  DROP POLICY IF EXISTS "Owners can insert wedding members" ON public.wedding_members;
  CREATE POLICY "Owners can insert wedding members"
    ON public.wedding_members FOR INSERT
    WITH CHECK (is_wedding_owner(wedding_id));

  DROP POLICY IF EXISTS "Owners can update wedding members" ON public.wedding_members;
  CREATE POLICY "Owners can update wedding members"
    ON public.wedding_members FOR UPDATE
    USING (is_wedding_owner(wedding_id))
    WITH CHECK (is_wedding_owner(wedding_id));

  DROP POLICY IF EXISTS "Owners can delete wedding members" ON public.wedding_members;
  CREATE POLICY "Owners can delete wedding members"
    ON public.wedding_members FOR DELETE
    USING (is_wedding_owner(wedding_id));

  -- 6.3 RSVPs SELECT policy untuk member dashboard (sebelumnya tidak ada SELECT policy)
  DROP POLICY IF EXISTS "Members can view rsvps" ON public.rsvps;
  CREATE POLICY "Members can view rsvps"
    ON public.rsvps FOR SELECT
    USING (
      EXISTS (
        SELECT 1 FROM public.guests g
        WHERE g.id = rsvps.guest_id AND is_wedding_member(g.wedding_id)
      )
    );

  -- 6.4 Policy tulis untuk tabel template (migrasi 20261126 sebelumnya hanya SELECT)
  IF to_regclass('public.wedding_template_settings') IS NOT NULL THEN
    DROP POLICY IF EXISTS "Members can manage template settings" ON public.wedding_template_settings;
    CREATE POLICY "Members can manage template settings"
      ON public.wedding_template_settings FOR ALL
      USING (is_wedding_member(wedding_id))
      WITH CHECK (is_wedding_member(wedding_id));
  END IF;

  IF to_regclass('public.wedding_couples') IS NOT NULL THEN
    DROP POLICY IF EXISTS "Members can manage couples profile" ON public.wedding_couples;
    CREATE POLICY "Members can manage couples profile"
      ON public.wedding_couples FOR ALL
      USING (is_wedding_member(wedding_id))
      WITH CHECK (is_wedding_member(wedding_id));
  END IF;

  IF to_regclass('public.wedding_events') IS NOT NULL THEN
    DROP POLICY IF EXISTS "Members can manage wedding events" ON public.wedding_events;
    CREATE POLICY "Members can manage wedding events"
      ON public.wedding_events FOR ALL
      USING (is_wedding_member(wedding_id))
      WITH CHECK (is_wedding_member(wedding_id));
  END IF;

  IF to_regclass('public.wedding_stories') IS NOT NULL THEN
    DROP POLICY IF EXISTS "Members can manage wedding stories" ON public.wedding_stories;
    CREATE POLICY "Members can manage wedding stories"
      ON public.wedding_stories FOR ALL
      USING (is_wedding_member(wedding_id))
      WITH CHECK (is_wedding_member(wedding_id));
  END IF;

  IF to_regclass('public.wedding_galleries') IS NOT NULL THEN
    DROP POLICY IF EXISTS "Members can manage wedding galleries" ON public.wedding_galleries;
    CREATE POLICY "Members can manage wedding galleries"
      ON public.wedding_galleries FOR ALL
      USING (is_wedding_member(wedding_id))
      WITH CHECK (is_wedding_member(wedding_id));
  END IF;

  IF to_regclass('public.wedding_payment_methods') IS NOT NULL THEN
    DROP POLICY IF EXISTS "Members can manage wedding payment methods" ON public.wedding_payment_methods;
    CREATE POLICY "Members can manage wedding payment methods"
      ON public.wedding_payment_methods FOR ALL
      USING (is_wedding_member(wedding_id))
      WITH CHECK (is_wedding_member(wedding_id));
  END IF;

  IF to_regclass('public.wedding_guest_guides') IS NOT NULL THEN
    DROP POLICY IF EXISTS "Members can manage wedding guest guides" ON public.wedding_guest_guides;
    CREATE POLICY "Members can manage wedding guest guides"
      ON public.wedding_guest_guides FOR ALL
      USING (is_wedding_member(wedding_id))
      WITH CHECK (is_wedding_member(wedding_id));
  END IF;

  IF to_regclass('public.wedding_gift_confirmations') IS NOT NULL THEN
    DROP POLICY IF EXISTS "Members can view gift confirmations" ON public.wedding_gift_confirmations;
    CREATE POLICY "Members can view gift confirmations"
      ON public.wedding_gift_confirmations FOR SELECT
      USING (is_wedding_member(wedding_id));
  END IF;
END $$;
