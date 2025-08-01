import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = 'https://jratyxzmjkjzpaqclsio.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyYXR5eHptamtqenBhcWNsc2lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxOTExNzAsImV4cCI6MjA2Nzc2NzE3MH0.vgmHdbpJmOwMELktGkkfuG-bcRn70-7cwYDdRD6q66Y';

// Replace the above two lines with your real values from Supabase → Project → API

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
