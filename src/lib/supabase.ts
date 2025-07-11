import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Message {
  id: string
  conversation_id: string
  sender_name: string
  sender_email: string
  content: string
  created_at: string
  is_admin_reply: boolean
}

export interface Conversation {
  id: string
  visitor_name: string
  visitor_email: string
  created_at: string
  last_message_at: string
  status: 'active' | 'closed'
}