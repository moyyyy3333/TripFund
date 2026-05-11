import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  username: string;
  date_of_birth: string;
  phone_number?: string;
  avatar_url?: string;
  is_verified: boolean;
  kyc_status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
};

export type Pool = {
  id: string;
  title: string;
  description?: string;
  goal_amount: number;
  current_amount: number;
  target_date?: string;
  cover_image_url?: string;
  pool_type: 'travel' | 'personal' | 'wedding' | 'car' | 'house' | 'other';
  status: 'active' | 'completed' | 'cancelled';
  created_by: string;
  created_at: string;
  updated_at: string;
};
