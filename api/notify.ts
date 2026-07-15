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
  replyTo?: string;
};

const CONTACT_EMAIL = "connect@aiwingschool.com";

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
    const confirmation: Email = {
      to: applicantEmail,
      subject: "Your WingsQuest 2026 application is in",
      replyTo: CONTACT_EMAIL,
      html: wrap(
        `<p>Hi ${escapeHtml(student.split(" ")[0] || "there")},</p>` +
          `<p>Your application to <b>WingsQuest 2026</b> — the All India AI Aptitude ` +
          `Challenge for Classes 6–10 — has been received.</p>` +
          `<p>Your entry confirmation and all official WingsQuest communications ` +
          `will arrive at this address, so keep an eye on it.</p>` +
          `<p>Questions in the meantime? Just reply to this email or write to ` +
          `<a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>` +
          `<p style="color:#666">— The Wingschool team</p>`,
      ),
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

  if (!secretsMatch(request.headers.get("x-webhook-secret") ?? "", secret)) {
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
