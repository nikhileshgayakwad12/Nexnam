import { createClient } from "@supabase/supabase-js";

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseUrl = rawUrl && rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}.supabase.co`;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("Supabase Client Init Configured - URL loaded:", !!rawUrl, "Key loaded:", !!supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
