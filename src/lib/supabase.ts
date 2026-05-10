import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://acfazsuvlbxjctvnueho.supabase.co'
export const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZmF6c3V2bGJ4amN0dm51ZWhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMzgwMzksImV4cCI6MjA5MTgxNDAzOX0.FeWXAbvIzHObnz4Sulk1XtHBUZCp6q8fUCKXsjq0Qz4'

export const supabase = createClient(supabaseUrl, supabaseKey)
