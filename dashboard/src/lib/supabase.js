import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lriapvoderqzvecjezpe.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_0LC5NFaOnDhc7oySD11G1w_7HPBP2td'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
