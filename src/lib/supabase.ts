import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Null until the Supabase env vars are set; callers fall back to the
// local Express API so the forms keep working in dev without keys.
export const supabase = url && anonKey ? createClient(url, anonKey) : null;
