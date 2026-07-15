import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Production builds fail without these vars (see vite.config.ts), so
// this is only null in a keyless dev session, where form submits show
// their WhatsApp/email fallbacks instead.
export const supabase = url && anonKey ? createClient(url, anonKey) : null;
