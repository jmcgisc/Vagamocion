import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.SUPABASE_URL,    // p.ej. https://xyz.supabase.co
  process.env.SUPABASE_KEY // la anon public key
);
