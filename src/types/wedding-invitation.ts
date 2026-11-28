import { ParticleEffectType } from '@/components/effects/FallingParticlesCanvas';
import { BurstEffectType } from '@/components/effects/OpeningBurstEffect';

export interface FullWeddingInvitationPayload {
  // Metadata Utama
  weddingId: string;
  slug: string;
  title: string;
  weddingDateFormatted: string;

  // Konfigurasi Visual & Tema Jawa
  templateSettings: {
    themeId: string;
    coverMode: 'adat_jawa_cover' | 'classic_arch';
    particleEffect: ParticleEffectType;
    burstEffect: BurstEffectType;
    audioUrl: string;
    quoteBadgeText: string;
    quoteArabicText: string;
    quoteTranslationText: string;
    quoteCitationText: string;
    quoteFrameMode: 'scalable_frame' | 'ornate_card' | 'vector_baroque';
    closingMaturNuwunText: string;
    closingThankYouLine1: string;
    closingThankYouLine2: string;
    enablePhotobooth: boolean;
  };

  // Profil Mempelai Pria & Wanita
  couples: {
    groom: {
      fullName: string;
      nickname: string;
      relation: string;
      father: string;
      mother: string;
      instagram?: string;
      instagramUrl?: string;
      photo: string;
    };
    bride: {
      fullName: string;
      nickname: string;
      relation: string;
      father: string;
      mother: string;
      instagram?: string;
      instagramUrl?: string;
      photo: string;
    };
    coupleHeroPhoto: string;
    coupleTitle: string; // contoh: "Miko & Angela"
  };

  // Jadwal Acara (Akad, Resepsi, Unduh Mantu, dll)
  events: Array<{
    id: string;
    title: string;
    subtitle: string;
    date: string;
    time: string;
    venueName: string;
    address: string;
    image: string;
    imageAlt?: string;
    googleMapsUrl?: string;
  }>;

  // Timeline Perjalanan Cinta
  loveStories: Array<{
    id: string;
    step: string;
    title: string;
    description: string;
    image: string;
    framedImage?: string;
    imageAlt?: string;
  }>;

  // Galeri Foto & Teaser Video
  gallery: {
    featuredPhoto?: {
      id: string;
      title: string;
      subtitle: string;
      image: string;
      rawImage?: string;
      frame?: string;
      alt: string;
      aspectRatio: string;
    };
    photos: Array<{
      id: string;
      title: string;
      subtitle: string;
      image: string;
      rawImage?: string;
      frame?: string;
      alt: string;
      aspectRatio: string;
      flex?: number;
    }>;
    videoTeaser?: {
      id: string;
      title: string;
      subtitle: string;
      image: string;
      alt: string;
      aspectRatio: string;
      videoUrl: string;
      videoType: 'youtube' | 'mp4';
      videoDuration: string;
    };
  };

  // Rekening Bank, QRIS, & Kado Fisik
  paymentMethods: {
    bankAccounts: Array<{
      id: string;
      bankName: string;
      bankTitleBadge: string;
      accountNumber: string;
      accountHolder: string;
      qrisImage?: string;
    }>;
    physicalGift?: {
      recipient: string;
      address: string;
      phone: string;
    };
    confirmationWaNumber: string;
  };

  // Panduan Tamu, Dresscode, Etika, & Turut Mengundang
  guestGuide: {
    dresscodeHeading?: string;
    dresscodeDescription?: string;
    swatches: Array<{
      id: string;
      name: string;
      alias: string;
      hex: string;
      border?: string;
      textDark?: boolean;
      recommendation: string;
    }>;
    etiquettes: Array<{
      id: string;
      icon: 'clock' | 'camera-off' | 'phone-off' | 'handshake' | 'trash' | 'shirt' | 'users' | 'map-pin';
      title: string;
      shortDesc: string;
      detailDesc?: string;
    }>;
    family: {
      brideFamily?: { label: string; members: string[] };
      groomFamily?: { label: string; members: string[] };
    };
    liveStreaming?: {
      weddingDateText: string;
      weddingTimeText: string;
      youtubeUrl?: string;
      zoomUrl?: string;
      zoomMeetingId?: string;
      zoomPasscode?: string;
    };
  };
}
