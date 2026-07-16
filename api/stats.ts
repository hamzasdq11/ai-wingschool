// Vercel Function: aggregates for the internal /stats page.
//   GET /api/stats?key=<STATS_KEY> → public.stats_payload() as JSON
//
// Required Vercel env vars (alongside the register/notify ones):
//   STATS_KEY  any random string, e.g. `openssl rand -hex 16`; the
//              /stats page sends it as ?key= and remembers it locally

import { createClient } from "@supabase/supabase-js";
import { timingSafeEqual } from "node:crypto";

function secretsMatch(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET(request: Request) {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const statsKey = process.env.STATS_KEY;
  if (!url || !serviceKey || !statsKey) {
    return Response.json({ error: "not_configured" }, { status: 500 });
  }

  const provided = new URL(request.url).searchParams.get("key") ?? "";
  if (!secretsMatch(provided, statsKey)) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const db = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await db.rpc("stats_payload");
  if (error) {
    console.error("stats: rpc failed:", error);
    return Response.json({ error: "server" }, { status: 500 });
  }
  return Response.json(data, { headers: { "Cache-Control": "no-store" } });
}
