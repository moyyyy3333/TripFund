import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Database types (generated from Supabase, but defined manually for now)
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

export type PoolMember = {
  id: string;
  pool_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'member';
  joined_at: string;
};

export type Contribution = {
  id: string;
  pool_id: string;
  user_id: string;
  amount: number;
  payment_method_id?: string;
  stripe_payment_intent_id?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  notes?: string;
  created_at: string;
  completed_at?: string;
};

export type Message = {
  id: string;
  pool_id: string;
  user_id: string;
  content: string;
  image_url?: string;
  created_at: string;
};
