import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,    // p.ej. https://xyz.supabase.co
  process.env.REACT_APP_SUPABASE_URL // la anon public key
);
