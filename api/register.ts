// Vercel Function: verified registration for WingsQuest (/register).
//
// The form never writes to Supabase directly. Instead:
//   { action: "start",  application }  → validates, upserts the row
//     into `registrations` with verified_at null, stores a hashed
//     6-digit code in `otp_challenges`, emails the code (Resend)
//   { action: "verify", email, code }  → checks the code and flips
//     verified_at on the row (service role)
//
// Every attempt is visible in the table: verified_at null marks
// applicants who never entered their code, and the anon insert policy
// on `registrations` is gone entirely. api/notify.ts only emails once
// verified_at is set, so unverified rows trigger nothing.
//
// Required Vercel env vars (Project Settings → Environment Variables):
//   SUPABASE_URL (or VITE_SUPABASE_URL)  project URL
//   SUPABASE_SERVICE_ROLE_KEY            secret key, server-side only
//   RESEND_API_KEY                       shared with api/notify.ts
// Optional:
//   NOTIFY_FROM  sender (default WingsQuest <notifications@aiwingschool.com>)

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { createHash, randomInt, timingSafeEqual } from "node:crypto";

const CONTACT_EMAIL = "connect@aiwingschool.com";
const FONT_STACK =
  "-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const OTP_TTL_MINUTES = 10;
const RESEND_COOLDOWN_SECONDS = 45;
const MAX_ATTEMPTS = 5;
// Send caps per rolling hour. The per-IP cap stays generous so a school
// computer lab behind one NAT doesn't lock itself out.
const EMAIL_HOURLY_CAP = 6;
const IP_HOURLY_CAP = 30;

const BOARDS = ["CBSE", "ICSE", "State Board", "IB", "Cambridge (IGCSE)", "Other"];

type Application = {
  student: string;
  grade: number;
  school: string;
  board: string;
  city: string;
  email: string;
  phone: string;
  interest: string;
};

type Challenge = {
  id: string;
  created_at: string;
  email: string;
  code_hash: string;
  expires_at: string;
  attempts: number;
};

function validateApplication(raw: unknown): Application | null {
  if (typeof raw !== "object" || raw === null) return null;
  const a = raw as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const student = str(a.student);
  const school = str(a.school);
  const board = str(a.board);
  const city = str(a.city);
  const email = str(a.email).toLowerCase();
  const phone = str(a.phone);
  const interest = str(a.interest).slice(0, 220);
  const grade = Number(a.grade);
  if (
    student.length < 1 || student.length > 120 ||
    !Number.isInteger(grade) || grade < 6 || grade > 10 ||
    school.length < 1 || school.length > 120 ||
    !BOARDS.includes(board) ||
    city.length < 1 || city.length > 80 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 ||
    !/^[6-9][0-9]{9}$/.test(phone)
  ) {
    return null;
  }
  return { student, grade, school, board, city, email, phone, interest };
}

type AttributionColumns = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  ref: string | null;
  referrer: string | null;
};

// Attribution is best-effort metadata straight from the client: trim,
// truncate, and never let it fail a registration.
function sanitizeAttribution(raw: unknown): AttributionColumns {
  const a =
    typeof raw === "object" && raw !== null
      ? (raw as Record<string, unknown>)
      : {};
  const s = (v: unknown, max = 160) =>
    typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null;
  return {
    utm_source: s(a.utm_source),
    utm_medium: s(a.utm_medium),
    utm_campaign: s(a.utm_campaign),
    ref: s(a.ref),
    referrer: s(a.referrer, 300),
  };
}

// Escape %, _ and \ so an email used in .ilike() matches literally.
function escapeLike(value: string): string {
  return value.replace(/[\\%_]/g, (m) => `\\${m}`);
}

function hashCode(challengeId: string, code: string): string {
  return createHash("sha256").update(`${challengeId}:${code}`).digest("hex");
}

function hashesMatch(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

function otpEmailHtml(code: string): string {
  const digits = code.split("").join("&#8202;"); // hair spaces aid legibility
  return (
    `<div style="display:none;max-height:0;overflow:hidden;">Your WingsQuest code is ${code}. It expires in ${OTP_TTL_MINUTES} minutes.</div>` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f3ee;margin:0;">` +
    `<tr><td align="center" style="padding:36px 16px;">` +
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:480px;background-color:#ffffff;border-radius:16px;">` +
    `<tr><td style="padding:34px 40px 0;font-family:${FONT_STACK};font-size:15px;line-height:1.6;color:#0a0a0a;">` +
    `<p style="margin:0;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#1335b8;">WingsQuest 2026</p>` +
    `<p style="margin:14px 0 0;">Here&rsquo;s your code to confirm your email and complete your application:</p>` +
    `</td></tr>` +
    `<tr><td style="padding:22px 40px 0;">` +
    `<p style="margin:0;font-family:${FONT_STACK};font-size:38px;font-weight:700;letter-spacing:6px;color:#0a0a0a;">${digits}</p>` +
    `</td></tr>` +
    `<tr><td style="padding:20px 40px 34px;font-family:${FONT_STACK};font-size:13px;line-height:1.65;color:#5a5a5a;">` +
    `<p style="margin:0;">It expires in ${OTP_TTL_MINUTES} minutes and replaces any earlier code.</p>` +
    `<p style="margin:10px 0 0;">Didn&rsquo;t request this? You can safely ignore this email.</p>` +
    `</td></tr>` +
    `</table>` +
    `</td></tr></table>`
  );
}

function otpEmailText(code: string): string {
  return [
    `Your WingsQuest code: ${code}`,
    "",
    `Enter it on the application page to confirm your email. It expires in ${OTP_TTL_MINUTES} minutes and replaces any earlier code.`,
    "",
    "Didn't request this? You can safely ignore this email.",
  ].join("\n");
}

async function sendOtpEmail(apiKey: string, to: string, code: string) {
  const from =
    process.env.NOTIFY_FROM || "WingsQuest <notifications@aiwingschool.com>";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      // Code in the subject: readable from the inbox list / lock-screen
      // notification without even opening the email.
      subject: `${code} is your WingsQuest code`,
      html: otpEmailHtml(code),
      text: otpEmailText(code),
      reply_to: CONTACT_EMAIL,
    }),
  });
  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${await res.text()}`);
  }
}

type ExistingRow = { id: string; verified_at: string | null };

async function findRegistration(db: SupabaseClient, email: string): Promise<ExistingRow | null> {
  const { data, error } = await db
    .from("registrations")
    .select("id, verified_at")
    .ilike("email", escapeLike(email))
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data as ExistingRow | null;
}

// Create or refresh the applicant's row, unverified. Existing verified
// rows are never touched (callers reject those first).
async function upsertPending(
  db: SupabaseClient,
  app: Application,
  attribution: AttributionColumns,
): Promise<void> {
  const existing = await findRegistration(db, app.email);
  if (existing) {
    if (existing.verified_at) return; // raced a concurrent verify; leave it
    const { error } = await db
      .from("registrations")
      .update({ ...app, ...attribution })
      .eq("id", existing.id);
    if (error) throw error;
    return;
  }
  const { error } = await db
    .from("registrations")
    .insert({ ...app, ...attribution, verified_at: null });
  // 23505 = two tabs raced the first insert; the other tab's row holds
  // essentially the same application, so it's fine to leave it.
  if (error && error.code !== "23505") throw error;
}

async function activeChallenge(db: SupabaseClient, email: string): Promise<Challenge | null> {
  const { data, error } = await db
    .from("otp_challenges")
    .select("id, created_at, email, code_hash, expires_at, attempts")
    .eq("email", email)
    .is("consumed_at", null)
    .is("superseded_at", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data as Challenge | null;
}

async function sentInLastHour(db: SupabaseClient, column: "email" | "ip", value: string): Promise<number> {
  const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count, error } = await db
    .from("otp_challenges")
    .select("id", { count: "exact", head: true })
    .eq(column, value)
    .gte("created_at", hourAgo);
  if (error) throw error;
  return count ?? 0;
}

async function handleStart(db: SupabaseClient, resendKey: string, body: Record<string, unknown>, ip: string) {
  const app = validateApplication(body.application);
  if (!app) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }
  const attribution = sanitizeAttribution(body.attribution);

  // Catch verified duplicates before any code is sent; nobody should
  // verify an email only to learn the application already exists. An
  // unverified row is a previous attempt that never finished: refreshed
  // below and given a fresh shot at the code.
  const registered = await findRegistration(db, app.email);
  if (registered?.verified_at) {
    return Response.json({ error: "duplicate_email" }, { status: 409 });
  }

  const now = Date.now();
  const existing = await activeChallenge(db, app.email);
  if (existing && new Date(existing.expires_at).getTime() > now) {
    const age = (now - new Date(existing.created_at).getTime()) / 1000;
    if (age < RESEND_COOLDOWN_SECONDS) {
      // Same email re-submitted within the cooldown (e.g. the applicant
      // went back to fix a field): refresh the pending row so edits
      // aren't lost, keep the already-emailed code valid, send nothing.
      await upsertPending(db, app, attribution);
      return Response.json({
        ok: true,
        reused: true,
        cooldown: Math.ceil(RESEND_COOLDOWN_SECONDS - age),
      });
    }
  }

  if ((await sentInLastHour(db, "email", app.email)) >= EMAIL_HOURLY_CAP) {
    return Response.json({ error: "too_many_codes" }, { status: 429 });
  }
  if (ip !== "unknown" && (await sentInLastHour(db, "ip", ip)) >= IP_HOURLY_CAP) {
    return Response.json({ error: "too_many_codes" }, { status: 429 });
  }

  // The application lands in the table right away, unverified; the
  // lead is captured even if the code is never entered.
  await upsertPending(db, app, attribution);

  // Newest code wins: retire any earlier active challenge for this email.
  const { error: supersedeError } = await db
    .from("otp_challenges")
    .update({ superseded_at: new Date().toISOString() })
    .eq("email", app.email)
    .is("consumed_at", null)
    .is("superseded_at", null);
  if (supersedeError) throw supersedeError;

  const id = crypto.randomUUID();
  const code = String(randomInt(100000, 1000000)); // no leading zero to mistype
  const { error: insertError } = await db.from("otp_challenges").insert({
    id,
    email: app.email,
    code_hash: hashCode(id, code),
    expires_at: new Date(now + OTP_TTL_MINUTES * 60 * 1000).toISOString(),
    ip,
  });
  if (insertError) throw insertError;

  try {
    await sendOtpEmail(resendKey, app.email, code);
  } catch (err) {
    // Remove the challenge so an immediate retry isn't cooldown-blocked.
    // The unverified row stays; the lead survives the send failure.
    await db.from("otp_challenges").delete().eq("id", id);
    console.error("register: OTP email failed:", err);
    return Response.json({ error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true, cooldown: RESEND_COOLDOWN_SECONDS });
}

async function handleVerify(db: SupabaseClient, body: Record<string, unknown>) {
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const code = typeof body.code === "string" ? body.code.trim() : "";
  if (!email || !/^[0-9]{6}$/.test(code)) {
    return Response.json({ error: "invalid_code" }, { status: 400 });
  }

  const challenge = await activeChallenge(db, email);
  if (!challenge || new Date(challenge.expires_at).getTime() < Date.now()) {
    return Response.json({ error: "expired" }, { status: 410 });
  }
  if (challenge.attempts >= MAX_ATTEMPTS) {
    return Response.json({ error: "too_many_attempts" }, { status: 429 });
  }

  if (!hashesMatch(hashCode(challenge.id, code), challenge.code_hash)) {
    const attempts = challenge.attempts + 1;
    const { error } = await db
      .from("otp_challenges")
      .update({ attempts })
      .eq("id", challenge.id);
    if (error) throw error;
    const attemptsLeft = MAX_ATTEMPTS - attempts;
    return attemptsLeft > 0
      ? Response.json({ error: "invalid_code", attemptsLeft }, { status: 401 })
      : Response.json({ error: "too_many_attempts" }, { status: 429 });
  }

  // Flip the pending row to verified. Update first, consume after: if
  // the consume update failed, replaying the code would just re-flip an
  // already-verified row.
  const { data: flipped, error: flipError } = await db
    .from("registrations")
    .update({ verified_at: new Date().toISOString() })
    .ilike("email", escapeLike(email))
    .is("verified_at", null)
    .select("id");
  if (flipError) throw flipError;

  if (!flipped || flipped.length === 0) {
    // No pending row. Either a parallel tab already verified it (fine:
    // the code matched, they own the email) or the row was deleted from
    // the dashboard mid-flow; "expired" nudges a resend, which recreates
    // the row.
    const existing = await findRegistration(db, email);
    if (!existing?.verified_at) {
      return Response.json({ error: "expired" }, { status: 410 });
    }
  }

  const { error: consumeError } = await db
    .from("otp_challenges")
    .update({ consumed_at: new Date().toISOString() })
    .eq("id", challenge.id);
  if (consumeError) {
    console.error("register: consume update failed:", consumeError);
  }

  return Response.json({ ok: true });
}

export async function POST(request: Request) {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  if (!url || !serviceKey || !resendKey) {
    return Response.json({ error: "not_configured" }, { status: 500 });
  }
  const db = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  try {
    if (body.action === "start") return await handleStart(db, resendKey, body, ip);
    if (body.action === "verify") return await handleVerify(db, body);
    return Response.json({ error: "invalid" }, { status: 400 });
  } catch (err) {
    console.error("register: unhandled error:", err);
    return Response.json({ error: "server" }, { status: 500 });
  }
}
