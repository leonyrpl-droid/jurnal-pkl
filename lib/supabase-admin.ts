import "server-only";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseSecret = process.env.SUPABASE_SECRET_KEY!;

if (!supabaseUrl || !supabaseSecret) {
  throw new Error("Konfigurasi Supabase belum lengkap.");
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseSecret, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
