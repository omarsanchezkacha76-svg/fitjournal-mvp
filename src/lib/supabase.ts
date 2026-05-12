import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'http://localhost';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'dummy-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export type Tables = {
  profiles: {
    id: string;
    email: string;
    display_name: string | null;
    avatar_url: string | null;
    subscription_tier: 'free' | 'pro' | 'premium';
    created_at: string;
  };
  workouts: {
    id: string;
    user_id: string;
    name: string;
    date: string;
    duration_seconds: number;
    is_completed: boolean;
    notes: string | null;
  };
  exercises: {
    id: string;
    name: string;
    category: string;
    muscle_group: string;
    equipment: string;
    is_custom: boolean;
    user_id: string | null;
  };
};
