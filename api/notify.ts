// Vercel Function: receives Supabase Database Webhooks (INSERT on
// registrations / demo_requests) and sends email via Resend — an
// internal alert for every submission, plus a confirmation to the
// applicant for registrations.
//
// Required Vercel env vars (Project Settings → Environment Variables):
//   RESEND_API_KEY           Resend API key (domain must be verified there)
//   SUPABASE_WEBHOOK_SECRET  random string; the Supabase webhook sends it
//                            as the x-webhook-secret header
// Optional:
//   NOTIFY_EMAIL  internal recipient  (default connect@aiwingschool.com)
//   NOTIFY_FROM   sender              (default WingsQuest <notifications@aiwingschool.com>)
//
// Setup steps live in README.md ("Email notifications").

import { timingSafeEqual } from "node:crypto";

type WebhookPayload = {
  type?: string;
  table?: string;
  schema?: string;
  record?: Record<string, unknown> | null;
};

type Email = {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

const CONTACT_EMAIL = "connect@aiwingschool.com";
const SITE_URL = "https://www.aiwingschool.com";
const LOGO_URL = `${SITE_URL}/email/logo.png`;
const BRAND_BLUE = "#1335b8";
const FONT_STACK =
  "-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const WHATSAPP_LINK =
  "https://wa.me/917355080850?text=" +
  encodeURIComponent(
    "Hi Wingschool! I have a question about my WingsQuest 2026 application.",
  );

const JOURNEY = [
  {
    number: "01",
    title: "The Challenge",
    desc: "Sixty minutes of reasoning, curiosity and builder instinct. This is where every WingsQuest journey begins.",
  },
  {
    number: "02",
    title: "The AI Builder Program",
    desc: "Selected participants turn ideas into something real, guided through an intensive building experience.",
  },
  {
    number: "03",
    title: "Flagship Expo Day",
    desc: "The strongest builders present their work live before parents, mentors and an industry expert panel.",
  },
];

function secretsMatch(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function detailRows(record: Record<string, unknown>, fields: [string, string][]) {
  return fields
    .map(
      ([label, key]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#666;white-space:nowrap;vertical-align:top">${label}</td>` +
        `<td style="padding:4px 0">${escapeHtml(record[key])}</td></tr>`,
    )
    .join("");
}

function wrap(body: string) {
  return (
    `<div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;` +
    `font-size:15px;line-height:1.6;color:#0a0a0a;max-width:560px">${body}</div>`
  );
}

// Branded applicant confirmation. Table layout + inline styles only —
// email clients strip <style>, flexbox and web fonts; the brand carries
// through color, the hosted logo PNG and structure instead.
function confirmationHtml(firstName: string): string {
  const greeting = firstName ? `You&rsquo;re in, ${escapeHtml(firstName)}.` : "You&rsquo;re in.";
  const journeyRows = JOURNEY.map(
    (step) =>
      `<tr>` +
      `<td width="40" valign="top" style="padding:0 0 20px;">` +
      `<span style="display:inline-block;width:34px;height:34px;line-height:34px;text-align:center;border:1px solid #e2dfd5;border-radius:999px;font-family:${FONT_STACK};font-size:12px;font-weight:600;color:${BRAND_BLUE};">${step.number}</span>` +
      `</td>` +
      `<td valign="top" style="padding:2px 0 20px 14px;">` +
      `<p style="margin:0;font-family:${FONT_STACK};font-size:16px;font-weight:600;color:#0a0a0a;">${step.title}</p>` +
      `<p style="margin:4px 0 0;font-family:${FONT_STACK};font-size:13px;line-height:1.55;color:#6b6b6b;">${step.desc}</p>` +
      `</td>` +
      `</tr>`,
  ).join("");

  return (
    `<div style="display:none;max-height:0;overflow:hidden;">Your WingsQuest 2026 application has been received &mdash; Stage One begins 28 August.</div>` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f3ee;margin:0;">` +
    `<tr><td align="center" style="padding:36px 16px;">` +
    // No width attribute on the card: it acts as a min-width in the
    // table algorithm and breaks narrow phones; Outlook (which ignores
    // max-width) gets a fixed 600 via the MSO conditional instead.
    `<!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->` +
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#ffffff;border-radius:16px;">` +
    // Header
    `<tr><td style="padding:30px 44px 24px;border-bottom:1px solid #eceadf;">` +
    `<img src="${LOGO_URL}" width="141" height="40" alt="ai wingschool &middot; ad meliora" style="display:block;border:0;outline:none;">` +
    `</td></tr>` +
    // Chip
    `<tr><td style="padding:38px 44px 0;">` +
    `<span style="display:inline-block;background-color:#e9edf9;color:${BRAND_BLUE};font-family:${FONT_STACK};font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:7px 14px;border-radius:999px;">Application received</span>` +
    `</td></tr>` +
    // Heading
    `<tr><td style="padding:22px 44px 0;">` +
    `<h1 style="margin:0;font-family:${FONT_STACK};font-size:30px;line-height:1.15;letter-spacing:-0.5px;font-weight:600;color:#0a0a0a;">${greeting}</h1>` +
    `</td></tr>` +
    // Body copy
    `<tr><td style="padding:18px 44px 0;font-family:${FONT_STACK};font-size:15px;line-height:1.65;color:#3c3c3c;">` +
    `<p style="margin:0 0 14px;">Your application to <b>WingsQuest 2026</b> &mdash; the All India AI Aptitude Challenge for Classes 6&ndash;10 &mdash; has been received.</p>` +
    `<p style="margin:0;">Your entry confirmation and every official WingsQuest communication will arrive at this address, so keep an eye on it.</p>` +
    `</td></tr>` +
    // Journey
    `<tr><td style="padding:34px 44px 0;">` +
    `<p style="margin:0 0 18px;font-family:${FONT_STACK};font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${BRAND_BLUE};">Your WingsQuest journey</p>` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${journeyRows}</table>` +
    `</td></tr>` +
    // Key date panel
    `<tr><td style="padding:6px 44px 0;">` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>` +
    `<td style="background-color:#eef1fb;border-radius:12px;padding:18px 22px;font-family:${FONT_STACK};font-size:14px;line-height:1.6;color:#0a0a0a;">` +
    `<b style="color:${BRAND_BLUE};">Stage One begins 28 August.</b> Your entry details and preparation pointers will arrive by email before the challenge.` +
    `</td></tr></table>` +
    `</td></tr>` +
    // WhatsApp button
    `<tr><td style="padding:28px 44px 38px;">` +
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>` +
    `<td style="background-color:${BRAND_BLUE};border-radius:10px;">` +
    `<a href="${WHATSAPP_LINK}" style="display:inline-block;padding:13px 26px;font-family:${FONT_STACK};font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">Questions? Message us on WhatsApp</a>` +
    `</td></tr></table>` +
    `</td></tr>` +
    // Footer
    `<tr><td style="padding:24px 44px 30px;border-top:1px solid #eceadf;font-family:${FONT_STACK};font-size:12px;line-height:1.7;color:#8a8a8a;">` +
    `<p style="margin:0;">ai wingschool&nbsp;&nbsp;&middot;&nbsp;&nbsp;<i>ad meliora</i></p>` +
    `<p style="margin:6px 0 0;"><a href="mailto:${CONTACT_EMAIL}" style="color:${BRAND_BLUE};text-decoration:none;">${CONTACT_EMAIL}</a> &middot; +91 73550 80850 &middot; <a href="${SITE_URL}" style="color:${BRAND_BLUE};text-decoration:none;">aiwingschool.com</a></p>` +
    `<p style="margin:14px 0 0;color:#b0b0b0;">You&rsquo;re receiving this because this address was used to apply to WingsQuest 2026.</p>` +
    `</td></tr>` +
    `</table>` +
    `<!--[if mso]></td></tr></table><![endif]-->` +
    `</td></tr></table>`
  );
}

function confirmationText(firstName: string): string {
  return [
    firstName ? `You're in, ${firstName}.` : "You're in.",
    "",
    "Your application to WingsQuest 2026 — the All India AI Aptitude Challenge for Classes 6–10 — has been received. Your entry confirmation and every official WingsQuest communication will arrive at this address.",
    "",
    "YOUR WINGSQUEST JOURNEY",
    ...JOURNEY.map((s) => `${s.number}. ${s.title} — ${s.desc}`),
    "",
    "Stage One begins 28 August. Your entry details and preparation pointers will arrive by email before the challenge.",
    "",
    `Questions? Message us on WhatsApp: https://wa.me/917355080850 or write to ${CONTACT_EMAIL}.`,
    "",
    "ai wingschool · ad meliora",
    `${CONTACT_EMAIL} · +91 73550 80850 · ${SITE_URL}`,
  ].join("\n");
}

function buildEmails(table: string, record: Record<string, unknown>, notifyEmail: string): Email[] {
  if (table === "registrations") {
    const student = String(record.student ?? "");
    const internal: Email = {
      to: notifyEmail,
      subject: `New WingsQuest application — ${student} (Class ${record.grade}, ${record.city})`,
      replyTo: String(record.email ?? "") || undefined,
      html: wrap(
        `<p><b>New WingsQuest 2026 application</b></p><table>` +
          detailRows(record, [
            ["Student", "student"],
            ["Class", "grade"],
            ["School", "school"],
            ["Board", "board"],
            ["City", "city"],
            ["Email", "email"],
            ["Phone", "phone"],
            ["Interest", "interest"],
          ]) +
          `</table>`,
      ),
    };
    const applicantEmail = String(record.email ?? "");
    const firstName = student.trim().split(" ")[0] ?? "";
    const confirmation: Email = {
      to: applicantEmail,
      subject: "Your WingsQuest 2026 application is in",
      replyTo: CONTACT_EMAIL,
      html: confirmationHtml(firstName),
      text: confirmationText(firstName),
    };
    return applicantEmail ? [internal, confirmation] : [internal];
  }

  if (table === "demo_requests") {
    return [
      {
        to: notifyEmail,
        subject: `New demo call request — ${record.name} (Class ${record.grade})`,
        html: wrap(
          `<p><b>New demo call request</b></p><table>` +
            detailRows(record, [
              ["Name", "name"],
              ["WhatsApp", "phone"],
              ["Class", "grade"],
            ]) +
            `</table><p style="color:#666">They expect a WhatsApp reply within 2 hours.</p>`,
        ),
      },
    ];
  }

  return [];
}

async function sendEmail(apiKey: string, from: string, email: Email) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [email.to],
      subject: email.subject,
      html: email.html,
      ...(email.text ? { text: email.text } : {}),
      ...(email.replyTo ? { reply_to: email.replyTo } : {}),
    }),
  });
  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${await res.text()}`);
  }
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const secret = process.env.SUPABASE_WEBHOOK_SECRET;
  if (!apiKey || !secret) {
    return Response.json({ error: "Notifications not configured" }, { status: 500 });
  }

  // Accept the shared secret from either the x-webhook-secret header or a
  // ?secret= query param. The query param is easier to configure reliably
  // in the Supabase webhook (the URL field isn't masked on edit, unlike
  // custom headers) at the cost of appearing in request logs — acceptable
  // here since the secret only gates sending notification emails.
  const provided =
    request.headers.get("x-webhook-secret") ??
    new URL(request.url).searchParams.get("secret") ??
    "";
  if (!secretsMatch(provided, secret)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: WebhookPayload;
  try {
    payload = (await request.json()) as WebhookPayload;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (payload.type !== "INSERT" || !payload.record || !payload.table) {
    return Response.json({ ignored: true });
  }

  const notifyEmail = process.env.NOTIFY_EMAIL || CONTACT_EMAIL;
  const from = process.env.NOTIFY_FROM || "WingsQuest <notifications@aiwingschool.com>";
  const emails = buildEmails(payload.table, payload.record, notifyEmail);
  if (emails.length === 0) {
    return Response.json({ ignored: true });
  }

  const results = await Promise.allSettled(emails.map((e) => sendEmail(apiKey, from, e)));
  const failures = results.filter((r): r is PromiseRejectedResult => r.status === "rejected");
  for (const f of failures) {
    console.error("notify: email failed:", f.reason);
  }
  if (failures.length === results.length) {
    return Response.json({ error: "All emails failed" }, { status: 502 });
  }
  return Response.json({ sent: results.length - failures.length });
}
