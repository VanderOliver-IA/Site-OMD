import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://supabase.olamundodigital.cloud'
const supabaseAnonKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MTA4MDAwMCwiZXhwIjo0OTI2NzUzNjAwLCJyb2xlIjoiYW5vbiJ9.FQgBjbzSmuq1y2_wBBIVA1wiXlWOVlFb1zsVheiEFzQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
