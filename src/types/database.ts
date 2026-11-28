export type WeddingStatus = 'planning' | 'published' | 'completed' | 'archived';
export type MemberRole = 'owner' | 'partner' | 'organizer' | 'collaborator' | 'receptionist';
export type AdminDocStage = 'rt_rw' | 'kelurahan' | 'kesehatan' | 'kua_disdukcapil';
export type AdminDocStatus = 'not_started' | 'in_progress' | 'ready_to_submit' | 'completed';
export type ChecklistStatus = 'todo' | 'in_progress' | 'done';
export type BudgetCategory = 
  | 'venue' 
  | 'catering' 
  | 'decoration' 
  | 'attire_mua' 
  | 'documentation' 
  | 'entertainment' 
  | 'invitation_souvenir' 
  | 'legal_admin' 
  | 'emergency_fund' 
  | 'other';

export type PaymentStatus = 'unpaid' | 'down_payment' | 'paid_full';
export type RsvpStatus = 'pending' | 'attending' | 'declined';
export type GuestCategory = 'vip' | 'keluarga' | 'sahabat' | 'teman_kantor' | 'tetangga' | 'umum';

export interface Profile {
  id: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  created_at: string;
}

export interface Wedding {
  id: string;
  owner_id: string;
  slug: string;
  title: string;
  groom_name: string;
  groom_nickname: string;
  bride_name: string;
  bride_nickname: string;
  wedding_date: string;
  location_city: string;
  target_budget: number;
  status: WeddingStatus;
  created_at: string;
}

export interface AdminDocument {
  id: string;
  wedding_id: string;
  stage: AdminDocStage;
  document_name: string;
  status: AdminDocStatus;
  file_url?: string;
  due_date?: string;
  notes?: string;
  created_at: string;
}

export interface ChecklistItem {
  id: string;
  wedding_id: string;
  title: string;
  category: string;
  timeframe: string;
  status: ChecklistStatus;
  deadline?: string;
  assigned_to?: string;
  notes?: string;
}

export interface BudgetItem {
  id: string;
  wedding_id: string;
  category: BudgetCategory;
  item_name: string;
  vendor_name?: string;
  estimated_cost: number;
  actual_cost: number;
  notes?: string;
  milestones?: PaymentMilestone[];
}

export interface PaymentMilestone {
  id: string;
  budget_item_id: string;
  milestone_title: string;
  amount: number;
  due_date?: string;
  is_paid: boolean;
  paid_date?: string;
  receipt_url?: string;
}

export interface Guest {
  id: string;
  wedding_id: string;
  name: string;
  phone?: string;
  category: GuestCategory;
  allocated_pax: number;
  qr_token: string;
  table_number?: string;
  is_checked_in: boolean;
  checked_in_at?: string;
  rsvp?: Rsvp;
}

export interface Rsvp {
  id: string;
  guest_id: string;
  status: RsvpStatus;
  confirmed_pax: number;
  message?: string;
  submitted_at: string;
}

export interface Wish {
  id: string;
  wedding_id: string;
  sender_name: string;
  message: string;
  relationship?: string;
  created_at: string;
}

export interface RundownItem {
  id: string;
  wedding_id: string;
  time_start: string;
  time_end: string;
  activity_title: string;
  location?: string;
  pic_name?: string;
  pic_contact?: string;
  notes?: string;
  order_index: number;
}

export interface InvitationSetting {
  id: string;
  wedding_id: string;
  template_theme: string;
  audio_url?: string;
  groom_details?: {
    father_name?: string;
    mother_name?: string;
    instagram?: string;
  };
  bride_details?: {
    father_name?: string;
    mother_name?: string;
    instagram?: string;
  };
  events_data?: Array<{
    title: string;
    date: string;
    time: string;
    venue_name: string;
    address: string;
    maps_url: string;
  }>;
  story_timeline?: Array<{
    year: string;
    title: string;
    story: string;
  }>;
  gallery_urls?: string[];
  bank_accounts?: Array<{
    bank_name: string;
    account_number: string;
    account_holder: string;
  }>;
  qris_image_url?: string;
  gift_address?: string;
}

// ==============================================================================
// RELATIONAL TEMPLATE ENTITIES (MIGRATION 20261126)
// ==============================================================================

export interface WeddingTemplateSetting {
  id: string;
  wedding_id: string;
  theme_id: string;
  cover_mode: 'adat_jawa_cover' | 'classic_arch';
  particle_effect: string;
  burst_effect: string;
  quote_badge_text?: string;
  quote_arabic_text?: string;
  quote_translation_text?: string;
  quote_citation_text?: string;
  quote_frame_mode?: 'scalable_frame' | 'ornate_card' | 'vector_baroque';
  audio_url?: string;
  closing_matur_nuwun_text?: string;
  closing_thank_you_line1?: string;
  closing_thank_you_line2?: string;
  enable_photobooth?: boolean;
  custom_theme_config?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface WeddingCouple {
  id: string;
  wedding_id: string;
  groom_full_name: string;
  groom_nickname: string;
  groom_child_order?: string;
  groom_father_name: string;
  groom_mother_name: string;
  groom_instagram?: string;
  groom_instagram_url?: string;
  groom_photo_url?: string;
  bride_full_name: string;
  bride_nickname: string;
  bride_child_order?: string;
  bride_father_name: string;
  bride_mother_name: string;
  bride_instagram?: string;
  bride_instagram_url?: string;
  bride_photo_url?: string;
  couple_hero_photo_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface WeddingEvent {
  id: string;
  wedding_id: string;
  event_type: string;
  title: string;
  subtitle?: string;
  event_date: string;
  start_time: string;
  end_time?: string;
  timezone?: string;
  venue_name: string;
  address: string;
  google_maps_url?: string;
  illustration_url?: string;
  order_index: number;
  created_at?: string;
}

export interface WeddingStory {
  id: string;
  wedding_id: string;
  step_number: string;
  title: string;
  description: string;
  photo_url: string;
  order_index: number;
  created_at?: string;
}

export interface WeddingGallery {
  id: string;
  wedding_id: string;
  media_type: 'photo' | 'video';
  layout_slot?: string;
  title: string;
  subtitle?: string;
  media_url: string;
  thumbnail_url?: string;
  aspect_ratio?: string;
  flex_basis?: number;
  video_duration?: string;
  order_index: number;
  created_at?: string;
}

export interface WeddingPaymentMethod {
  id: string;
  wedding_id: string;
  method_type: 'bank' | 'qris' | 'gift';
  bank_slug?: string;
  bank_title_badge?: string;
  account_number?: string;
  account_holder?: string;
  qris_image_url?: string;
  physical_recipient_name?: string;
  physical_address?: string;
  recipient_phone?: string;
  order_index: number;
  created_at?: string;
}

export interface WeddingGuestGuide {
  id: string;
  wedding_id: string;
  dresscode_title?: string;
  dresscode_description?: string;
  dresscode_swatches?: Array<{
    id: string;
    name: string;
    alias: string;
    hex: string;
    border?: string;
    textDark?: boolean;
    recommendation: string;
  }>;
  etiquette_items?: Array<{
    id: string;
    icon: string;
    title: string;
    shortDesc: string;
  }>;
  family_members?: {
    brideFamily?: { label: string; members: string[] };
    groomFamily?: { label: string; members: string[] };
  };
  live_stream_youtube_url?: string;
  live_stream_zoom_url?: string;
  zoom_meeting_id?: string;
  zoom_passcode?: string;
  updated_at?: string;
}

export interface WeddingGiftConfirmation {
  id: string;
  wedding_id: string;
  guest_id?: string;
  sender_name: string;
  bank_name?: string;
  nominal?: number;
  proof_receipt_url?: string;
  message?: string;
  created_at?: string;
}

