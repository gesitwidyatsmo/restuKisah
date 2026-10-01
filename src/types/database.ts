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
