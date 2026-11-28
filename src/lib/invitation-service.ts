import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { FullWeddingInvitationPayload } from '@/types/wedding-invitation';
import { mockJavaneseWeddingData } from '@/lib/mock-data-jawa';
import {
  Wedding,
  WeddingCouple,
  WeddingEvent,
  WeddingGallery,
  WeddingGuestGuide,
  WeddingPaymentMethod,
  WeddingStory,
  WeddingTemplateSetting,
} from '@/types/database';
import { formatWeddingDateIndo } from '@/lib/wedding-data-service';
import type { ParticleEffectType } from '@/components/effects/FallingParticlesCanvas';
import type { BurstEffectType } from '@/components/effects/OpeningBurstEffect';

export interface GetInvitationOptions {
  allowDemoFallback?: boolean;
  fallbackWedding?: Wedding;
}

const DEFAULT_ARABIC_QUOTE =
  'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً';
const DEFAULT_QUOTE_TRANSLATION =
  '“Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.”';

export function buildEmptyInvitationPayload(wedding: Wedding): FullWeddingInvitationPayload {
  const formattedDate = formatWeddingDateIndo(wedding.wedding_date, 'long');
  const groomNick = wedding.groom_nickname || wedding.groom_name.split(/\s+/)[0] || '';
  const brideNick = wedding.bride_nickname || wedding.bride_name.split(/\s+/)[0] || '';

  return {
    weddingId: wedding.id,
    slug: wedding.slug,
    title: wedding.title || `Pernikahan ${brideNick} & ${groomNick}`,
    weddingDateFormatted: formattedDate,

    templateSettings: {
      themeId: 'jawa_parchment',
      coverMode: 'adat_jawa_cover',
      particleEffect: 'pink_blossoms',
      burstEffect: 'gold_butterflies',
      audioUrl: '/templates/jawa/audio/gamelan-royal-wedding.mp3',
      quoteBadgeText: 'AN INVITATION OF LOVE',
      quoteArabicText: DEFAULT_ARABIC_QUOTE,
      quoteTranslationText: DEFAULT_QUOTE_TRANSLATION,
      quoteCitationText: '(QS. Ar-Rum: 21)',
      quoteFrameMode: 'scalable_frame',
      closingMaturNuwunText: 'Matur Nuwun',
      closingThankYouLine1: 'Terima kasih telah menjadi bagian',
      closingThankYouLine2: 'dari hari bahagia kami',
      enablePhotobooth: true,
    },

    couples: {
      groom: {
        fullName: wedding.groom_name,
        nickname: groomNick,
        relation: 'Putra dari Pasangan',
        father: '',
        mother: '',
        instagram: '',
        instagramUrl: '',
        photo: '/templates/jawa/cover/groom-full.webp',
      },
      bride: {
        fullName: wedding.bride_name,
        nickname: brideNick,
        relation: 'Putri dari Pasangan',
        father: '',
        mother: '',
        instagram: '',
        instagramUrl: '',
        photo: '/templates/jawa/cover/bride-full.webp',
      },
      coupleHeroPhoto: '/templates/jawa/hero/portrait-couple.webp',
      coupleTitle: `${brideNick} & ${groomNick}`,
    },

    events: [],
    loveStories: [],
    gallery: {
      photos: [],
    },
    paymentMethods: {
      bankAccounts: [],
      physicalGift: {
        recipient: `${brideNick} & ${groomNick}`,
        address: '',
        phone: '',
      },
      confirmationWaNumber: '',
    },
    guestGuide: {
      dresscodeHeading: 'Attire for Our Special Day',
      dresscodeDescription:
        'Kami menghimbau tamu undangan untuk mengenakan busana formal dengan nuansa warna:',
      swatches: mockJavaneseWeddingData.guestGuide.swatches,
      etiquettes: mockJavaneseWeddingData.guestGuide.etiquettes,
      family: {
        brideFamily: { label: 'Keluarga Mempelai Wanita', members: [] },
        groomFamily: { label: 'Keluarga Mempelai Pria', members: [] },
      },
      liveStreaming: {
        weddingDateText: formattedDate,
        weddingTimeText: '',
        youtubeUrl: '',
        zoomUrl: '',
        zoomMeetingId: '',
        zoomPasscode: '',
      },
    },
  };
}

function normalizeEventDateForSql(rawDate: string, fallbackIsoDate?: string): string {
  const trimmed = (rawDate || '').trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }
  const parsed = new Date(trimmed);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10);
  }
  if (fallbackIsoDate && /^\d{4}-\d{2}-\d{2}$/.test(fallbackIsoDate)) {
    return fallbackIsoDate;
  }
  return new Date().toISOString().slice(0, 10);
}

function normalizeStartTimeForSql(rawTime: string): string {
  const match = (rawTime || '').match(/(\d{1,2})[:.](\d{2})/);
  if (!match) return '08:00:00';
  const hh = match[1].padStart(2, '0');
  const mm = match[2].padStart(2, '0');
  return `${hh}:${mm}:00`;
}

export async function getWeddingInvitationBySlug(
  slug: string,
  options: GetInvitationOptions = {}
): Promise<FullWeddingInvitationPayload | null> {
  const { allowDemoFallback = true, fallbackWedding } = options;

  // Demo cache lokal hanya untuk mode demo publik
  if (allowDemoFallback && typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(`restukisah_invitation_${slug}`);
      if (cached) {
        return JSON.parse(cached) as FullWeddingInvitationPayload;
      }
    } catch {
      // Abaikan error localStorage
    }
  }

  if (!isSupabaseConfigured()) {
    if (allowDemoFallback) {
      return {
        ...mockJavaneseWeddingData,
        slug,
        title: `Pawiwahan ${slug.replace(/-/g, ' ')}`,
      };
    }
    return fallbackWedding ? buildEmptyInvitationPayload(fallbackWedding) : null;
  }

  try {
    const supabase = createClient();

    const { data: wedding, error } = await supabase
      .from('weddings')
      .select(
        `
        id,
        owner_id,
        slug,
        title,
        groom_name,
        groom_nickname,
        bride_name,
        bride_nickname,
        wedding_date,
        location_city,
        target_budget,
        status,
        created_at,
        wedding_template_settings (*),
        wedding_couples (*),
        wedding_events (*),
        wedding_stories (*),
        wedding_galleries (*),
        wedding_payment_methods (*),
        wedding_guest_guides (*)
      `
      )
      .eq('slug', slug)
      .maybeSingle();

    if (error || !wedding) {
      if (allowDemoFallback) {
        return {
          ...mockJavaneseWeddingData,
          slug,
          title: `Pawiwahan ${slug.replace(/-/g, ' ')}`,
        };
      }
      return fallbackWedding ? buildEmptyInvitationPayload(fallbackWedding) : null;
    }

    const typedWedding = wedding as unknown as Wedding & {
      wedding_template_settings?: WeddingTemplateSetting | WeddingTemplateSetting[] | null;
      wedding_couples?: WeddingCouple | WeddingCouple[] | null;
      wedding_events?: WeddingEvent[];
      wedding_stories?: WeddingStory[];
      wedding_galleries?: WeddingGallery[];
      wedding_payment_methods?: WeddingPaymentMethod[];
      wedding_guest_guides?: WeddingGuestGuide | WeddingGuestGuide[] | null;
    };

    const settings = Array.isArray(typedWedding.wedding_template_settings)
      ? typedWedding.wedding_template_settings[0]
      : typedWedding.wedding_template_settings;

    const couple = Array.isArray(typedWedding.wedding_couples)
      ? typedWedding.wedding_couples[0]
      : typedWedding.wedding_couples;

    const guestGuide = Array.isArray(typedWedding.wedding_guest_guides)
      ? typedWedding.wedding_guest_guides[0]
      : typedWedding.wedding_guest_guides;

    const events = [...(typedWedding.wedding_events || [])].sort(
      (a, b) => a.order_index - b.order_index
    );
    const stories = [...(typedWedding.wedding_stories || [])].sort(
      (a, b) => a.order_index - b.order_index
    );
    const galleries = [...(typedWedding.wedding_galleries || [])].sort(
      (a, b) => a.order_index - b.order_index
    );
    const paymentRows = [...(typedWedding.wedding_payment_methods || [])].sort(
      (a, b) => a.order_index - b.order_index
    );

    const bankRows = paymentRows.filter((p) => p.method_type === 'bank');
    const giftRow = paymentRows.find((p) => p.method_type === 'gift') || paymentRows[0];

    const formattedDate = formatWeddingDateIndo(typedWedding.wedding_date, 'long');
    const groomNick =
      couple?.groom_nickname ||
      typedWedding.groom_nickname ||
      typedWedding.groom_name.split(/\s+/)[0] ||
      '';
    const brideNick =
      couple?.bride_nickname ||
      typedWedding.bride_nickname ||
      typedWedding.bride_name.split(/\s+/)[0] ||
      '';

    return {
      weddingId: typedWedding.id,
      slug: typedWedding.slug,
      title: typedWedding.title || `Pernikahan ${brideNick} & ${groomNick}`,
      weddingDateFormatted: formattedDate,

      templateSettings: {
        themeId: settings?.theme_id || 'jawa_parchment',
        coverMode: settings?.cover_mode || 'adat_jawa_cover',
        particleEffect: (settings?.particle_effect || 'pink_blossoms') as ParticleEffectType,
        burstEffect: (settings?.burst_effect || 'gold_butterflies') as BurstEffectType,
        audioUrl:
          settings?.audio_url || '/templates/jawa/audio/gamelan-royal-wedding.mp3',
        quoteBadgeText: settings?.quote_badge_text || 'AN INVITATION OF LOVE',
        quoteArabicText: settings?.quote_arabic_text || DEFAULT_ARABIC_QUOTE,
        quoteTranslationText:
          settings?.quote_translation_text || DEFAULT_QUOTE_TRANSLATION,
        quoteCitationText: settings?.quote_citation_text || '(QS. Ar-Rum: 21)',
        quoteFrameMode: settings?.quote_frame_mode || 'scalable_frame',
        closingMaturNuwunText: settings?.closing_matur_nuwun_text || 'Matur Nuwun',
        closingThankYouLine1:
          settings?.closing_thank_you_line1 || 'Terima kasih telah menjadi bagian',
        closingThankYouLine2:
          settings?.closing_thank_you_line2 || 'dari hari bahagia kami',
        enablePhotobooth: settings?.enable_photobooth ?? true,
      },

      couples: {
        groom: {
          fullName: couple?.groom_full_name || typedWedding.groom_name,
          nickname: groomNick,
          relation: couple?.groom_child_order || 'Putra dari Pasangan',
          father: couple?.groom_father_name || '',
          mother: couple?.groom_mother_name || '',
          instagram: couple?.groom_instagram || '',
          instagramUrl: couple?.groom_instagram_url || '',
          photo: couple?.groom_photo_url || '/templates/jawa/cover/groom-full.webp',
        },
        bride: {
          fullName: couple?.bride_full_name || typedWedding.bride_name,
          nickname: brideNick,
          relation: couple?.bride_child_order || 'Putri dari Pasangan',
          father: couple?.bride_father_name || '',
          mother: couple?.bride_mother_name || '',
          instagram: couple?.bride_instagram || '',
          instagramUrl: couple?.bride_instagram_url || '',
          photo: couple?.bride_photo_url || '/templates/jawa/cover/bride-full.webp',
        },
        coupleHeroPhoto:
          couple?.couple_hero_photo_url || '/templates/jawa/hero/portrait-couple.webp',
        coupleTitle: `${brideNick} & ${groomNick}`,
      },

      events: events.map((ev) => ({
        id: ev.id,
        title: ev.title,
        subtitle: ev.subtitle || 'WEDDING CELEBRATION',
        date: ev.event_date,
        time: ev.start_time
          ? `${ev.start_time.slice(0, 5)} - ${ev.end_time?.slice(0, 5) || 'Selesai'} ${ev.timezone || 'WIB'}`
          : '',
        venueName: ev.venue_name,
        address: ev.address,
        image: ev.illustration_url || '/templates/jawa/events/event-akad.webp',
        googleMapsUrl: ev.google_maps_url,
      })),

      loveStories: stories.map((st) => ({
        id: st.id,
        step: st.step_number,
        title: st.title,
        description: st.description,
        image: st.photo_url,
      })),

      gallery: {
        photos: galleries.map((g) => ({
          id: g.id,
          title: g.title,
          subtitle: g.subtitle || '',
          image: g.media_url,
          rawImage: g.media_url,
          frame: g.thumbnail_url,
          alt: g.title,
          aspectRatio: g.aspect_ratio || '318 / 289',
          flex: g.flex_basis || 300,
        })),
      },

      paymentMethods: {
        bankAccounts: bankRows.map((p) => ({
          id: p.id,
          bankName: p.bank_slug || 'bca',
          bankTitleBadge: p.bank_title_badge || 'Transfer Bank',
          accountNumber: p.account_number || '',
          accountHolder: p.account_holder || '',
          qrisImage: p.qris_image_url,
        })),
        physicalGift: {
          recipient: giftRow?.physical_recipient_name || `${brideNick} & ${groomNick}`,
          address: giftRow?.physical_address || '',
          phone: giftRow?.recipient_phone || '',
        },
        confirmationWaNumber: giftRow?.recipient_phone || '',
      },

      guestGuide: {
        dresscodeHeading: guestGuide?.dresscode_title || 'Attire for Our Special Day',
        dresscodeDescription:
          guestGuide?.dresscode_description ||
          'Kami menghimbau tamu undangan untuk mengenakan busana formal dengan nuansa warna:',
        swatches:
          guestGuide?.dresscode_swatches || mockJavaneseWeddingData.guestGuide.swatches,
        etiquettes: (guestGuide?.etiquette_items ||
          mockJavaneseWeddingData.guestGuide.etiquettes) as FullWeddingInvitationPayload['guestGuide']['etiquettes'],
        family: guestGuide?.family_members || {
          brideFamily: { label: 'Keluarga Mempelai Wanita', members: [] },
          groomFamily: { label: 'Keluarga Mempelai Pria', members: [] },
        },
        liveStreaming: {
          weddingDateText: formattedDate,
          weddingTimeText: '',
          youtubeUrl: guestGuide?.live_stream_youtube_url || '',
          zoomUrl: guestGuide?.live_stream_zoom_url || '',
          zoomMeetingId: guestGuide?.zoom_meeting_id || '',
          zoomPasscode: guestGuide?.zoom_passcode || '',
        },
      },
    };
  } catch (err) {
    console.error('[invitation-service] Error saat fetch wedding invitation:', err);
    if (allowDemoFallback) {
      return mockJavaneseWeddingData;
    }
    return fallbackWedding ? buildEmptyInvitationPayload(fallbackWedding) : null;
  }
}

export async function saveWeddingInvitationData(
  weddingId: string,
  payload: FullWeddingInvitationPayload,
  options: { syncLocalDemoCache?: boolean; fallbackWeddingDate?: string } = {}
): Promise<{ success: boolean; error?: string }> {
  const { syncLocalDemoCache = false, fallbackWeddingDate } = options;

  if (syncLocalDemoCache && typeof window !== 'undefined') {
    try {
      localStorage.setItem(`restukisah_invitation_${weddingId}`, JSON.stringify(payload));
      if (payload.slug) {
        localStorage.setItem(`restukisah_invitation_${payload.slug}`, JSON.stringify(payload));
      }
    } catch {
      // Abaikan
    }
  }

  try {
    const supabase = createClient();

    const { error: settingsError } = await supabase
      .from('wedding_template_settings')
      .upsert(
        {
          wedding_id: weddingId,
          theme_id: payload.templateSettings.themeId,
          cover_mode: payload.templateSettings.coverMode,
          particle_effect: payload.templateSettings.particleEffect,
          burst_effect: payload.templateSettings.burstEffect,
          audio_url: payload.templateSettings.audioUrl,
          quote_badge_text: payload.templateSettings.quoteBadgeText,
          quote_arabic_text: payload.templateSettings.quoteArabicText,
          quote_translation_text: payload.templateSettings.quoteTranslationText,
          quote_citation_text: payload.templateSettings.quoteCitationText,
          quote_frame_mode: payload.templateSettings.quoteFrameMode,
          closing_matur_nuwun_text: payload.templateSettings.closingMaturNuwunText,
          closing_thank_you_line1: payload.templateSettings.closingThankYouLine1,
          closing_thank_you_line2: payload.templateSettings.closingThankYouLine2,
          enable_photobooth: payload.templateSettings.enablePhotobooth,
        },
        { onConflict: 'wedding_id' }
      );

    if (settingsError) throw settingsError;

    const { error: legacySettingError } = await supabase
      .from('invitation_settings')
      .upsert(
        {
          wedding_id: weddingId,
          template_theme: payload.templateSettings.themeId,
          audio_url: payload.templateSettings.audioUrl,
          gift_address: payload.paymentMethods.physicalGift?.address || null,
        },
        { onConflict: 'wedding_id' }
      );

    if (legacySettingError) throw legacySettingError;

    const { error: coupleError } = await supabase
      .from('wedding_couples')
      .upsert(
        {
          wedding_id: weddingId,
          groom_full_name: payload.couples.groom.fullName,
          groom_nickname: payload.couples.groom.nickname,
          groom_child_order: payload.couples.groom.relation,
          groom_father_name: payload.couples.groom.father,
          groom_mother_name: payload.couples.groom.mother,
          groom_instagram: payload.couples.groom.instagram,
          groom_instagram_url: payload.couples.groom.instagramUrl,
          groom_photo_url: payload.couples.groom.photo,
          bride_full_name: payload.couples.bride.fullName,
          bride_nickname: payload.couples.bride.nickname,
          bride_child_order: payload.couples.bride.relation,
          bride_father_name: payload.couples.bride.father,
          bride_mother_name: payload.couples.bride.mother,
          bride_instagram: payload.couples.bride.instagram,
          bride_instagram_url: payload.couples.bride.instagramUrl,
          bride_photo_url: payload.couples.bride.photo,
          couple_hero_photo_url: payload.couples.coupleHeroPhoto,
        },
        { onConflict: 'wedding_id' }
      );

    if (coupleError) throw coupleError;

    const { error: deleteEventsErr } = await supabase
      .from('wedding_events')
      .delete()
      .eq('wedding_id', weddingId);
    if (deleteEventsErr) throw deleteEventsErr;

    if (payload.events && payload.events.length > 0) {
      const eventsToInsert = payload.events.map((ev, idx) => ({
        wedding_id: weddingId,
        title: ev.title,
        subtitle: ev.subtitle,
        event_date: normalizeEventDateForSql(ev.date, fallbackWeddingDate),
        start_time: normalizeStartTimeForSql(ev.time),
        venue_name: ev.venueName,
        address: ev.address,
        google_maps_url: ev.googleMapsUrl,
        illustration_url: ev.image,
        order_index: idx + 1,
      }));
      const { error: insertEventsErr } = await supabase
        .from('wedding_events')
        .insert(eventsToInsert);
      if (insertEventsErr) throw insertEventsErr;
    }

    const { error: deletePaymentsErr } = await supabase
      .from('wedding_payment_methods')
      .delete()
      .eq('wedding_id', weddingId);
    if (deletePaymentsErr) throw deletePaymentsErr;

    type PaymentInsertRow = {
      wedding_id: string;
      method_type: 'bank' | 'gift';
      bank_slug: string | null;
      bank_title_badge: string | null;
      account_number: string | null;
      account_holder: string | null;
      qris_image_url: string | null;
      physical_recipient_name: string | null;
      physical_address: string | null;
      recipient_phone: string | null;
      order_index: number;
    };

    const bankRows: PaymentInsertRow[] = (payload.paymentMethods?.bankAccounts || []).map(
      (b, idx) => ({
        wedding_id: weddingId,
        method_type: 'bank',
        bank_slug: b.bankName || null,
        bank_title_badge: b.bankTitleBadge || null,
        account_number: b.accountNumber || null,
        account_holder: b.accountHolder || null,
        qris_image_url: b.qrisImage || null,
        physical_recipient_name: payload.paymentMethods.physicalGift?.recipient || null,
        physical_address: payload.paymentMethods.physicalGift?.address || null,
        recipient_phone: payload.paymentMethods.confirmationWaNumber || null,
        order_index: idx + 1,
      })
    );

    const hasGiftInfo = Boolean(
      payload.paymentMethods?.physicalGift?.address ||
        payload.paymentMethods?.confirmationWaNumber
    );
    const paymentRowsToInsert: PaymentInsertRow[] =
      bankRows.length > 0
        ? bankRows
        : hasGiftInfo
          ? [
              {
                wedding_id: weddingId,
                method_type: 'gift',
                bank_slug: null,
                bank_title_badge: null,
                account_number: null,
                account_holder: null,
                qris_image_url: null,
                physical_recipient_name:
                  payload.paymentMethods.physicalGift?.recipient || null,
                physical_address: payload.paymentMethods.physicalGift?.address || null,
                recipient_phone: payload.paymentMethods.confirmationWaNumber || null,
                order_index: 1,
              },
            ]
          : [];

    if (paymentRowsToInsert.length > 0) {
      const { error: insertPaymentsErr } = await supabase
        .from('wedding_payment_methods')
        .insert(paymentRowsToInsert);
      if (insertPaymentsErr) throw insertPaymentsErr;
    }

    if (payload.guestGuide) {
      const { error: guideError } = await supabase
        .from('wedding_guest_guides')
        .upsert(
          {
            wedding_id: weddingId,
            dresscode_title: payload.guestGuide.dresscodeHeading,
            dresscode_description: payload.guestGuide.dresscodeDescription,
            dresscode_swatches: payload.guestGuide.swatches,
            etiquette_items: payload.guestGuide.etiquettes,
            family_members: payload.guestGuide.family,
            live_stream_youtube_url: payload.guestGuide.liveStreaming?.youtubeUrl || null,
            live_stream_zoom_url: payload.guestGuide.liveStreaming?.zoomUrl || null,
            zoom_meeting_id: payload.guestGuide.liveStreaming?.zoomMeetingId || null,
            zoom_passcode: payload.guestGuide.liveStreaming?.zoomPasscode || null,
          },
          { onConflict: 'wedding_id' }
        );
      if (guideError) throw guideError;
    }

    return { success: true };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Terjadi kesalahan saat menyimpan ke Supabase';
    console.error('[invitation-service] Gagal menyimpan data undangan:', err);
    return { success: false, error: message };
  }
}
