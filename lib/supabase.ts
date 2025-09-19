import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

import { Dimensions, Colors, GlassType } from './types';

// Database types
export interface Database {
  public: {
    Tables: {
      configurations: {
        Row: {
          id: string
          user_id: string | null
          guest_data: { firstName: string; lastName: string; email: string; phone: string } | null
          material: string | null
          category: string | null
          dimensions: Dimensions | null
          colors: Colors | null
          glass_type: GlassType | null
          accessories: string[] | null
          current_step: number
          is_completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          guest_data?: { firstName: string; lastName: string; email: string; phone: string } | null
          material?: string | null
          category?: string | null
          dimensions?: Dimensions | null
          colors?: Colors | null
          glass_type?: GlassType | null
          accessories?: string[] | null
          current_step?: number
          is_completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          guest_data?: { firstName: string; lastName: string; email: string; phone: string } | null
          material?: string | null
          category?: string | null
          dimensions?: Dimensions | null
          colors?: Colors | null
          glass_type?: GlassType | null
          accessories?: string[] | null
          current_step?: number
          is_completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      quote_requests: {
        Row: {
          id: string
          configuration_id: string
          status: 'pending' | 'processing' | 'completed' | 'cancelled'
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          configuration_id: string
          status?: 'pending' | 'processing' | 'completed' | 'cancelled'
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          configuration_id: string
          status?: 'pending' | 'processing' | 'completed' | 'cancelled'
          notes?: string | null
          created_at?: string
        }
      }
    }
  }
}
