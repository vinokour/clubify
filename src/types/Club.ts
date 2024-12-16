export interface Club {
  id: string;
  name: string;
  description: string;
  image_url: string;
  category: string;
  member_size: string;
  commitment: string;
  type: string;
  slug: string;
  website_url?: string;
  meeting_times?: string;
  location?: string;
  contact_email?: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}