import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Product = {
  id: string
  name: string
  slug: string
  price: number
  compare_at_price?: number
  description: string
  category: string
  images: string[]
  inventory: number
  brand?: string
  rating?: number
  color?: string
  condition?: string
  created_at?: string
}