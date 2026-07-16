# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Form submissions (Supabase)

Two forms, two different write paths:

- **Demo form** — inserts directly into `demo_requests` via `supabase-js`
  with the publishable key (insert-only RLS policy).
- **WingsQuest registration** — goes through `api/register.ts` and an
  email-verification step (next section). There is **no** anon insert
  policy on `registrations`; rows are written only by the function's
  service-role client. The row is created immediately on submit with
  `verified_at` null and flipped once the code checks out.

Tables can never be read from the site — view entries in the Supabase
dashboard (Table Editor), from any device. `verified_at` null means the
applicant never entered their code (or the row predates the OTP flow) —
count `verified_at is not null` toward registration targets.

- Schema + policies: `supabase/schema.sql` (idempotent — safe to re-run
  in the SQL Editor)
- Credentials: copy `.env.example` to `.env.local` and fill in from
  Project Settings → API Keys. Production builds fail without them
  (guard in `vite.config.ts`), so a broken form can't ship.
- Database CHECK constraints enforce the same validation as the UI
  (grade ranges, Indian mobile format, board whitelist, length caps),
  so direct API calls can't insert junk.
- Spam/duplicate protection: both forms carry a hidden honeypot field
  (bots that fill it get a fake success and nothing is inserted), and
  `registrations.email` has a case-insensitive unique index — a repeat
  application shows an inline "already exists" message before any code
  is sent.

On submit failure the forms show a WhatsApp (demo) or email
(registration) fallback.

## Email verification (registration OTP)

`api/register.ts` makes every registration a verified one, in a single
flow on `/register`:

1. `action: "start"` — validates the application, rejects already-
   verified duplicate emails up front, upserts the row into
   `registrations` with `verified_at` null, stores a hashed 6-digit
   code in `otp_challenges`, and emails the code via Resend (the code
   is in the subject line, so it's readable from the inbox list).
2. The form card morphs into a code prompt — auto-submits on the 6th
   digit, resend with a 45 s cooldown, "wrong email? edit it" preserves
   the form, and common email-domain typos (gmial.com etc.) get a
   one-tap fix before anything is sent.
3. `action: "verify"` — checks the code (10 min expiry, 5 attempts) and
   flips `verified_at` on the row. That transition (not the unverified
   insert) fires the confirmation-email webhook.

Guardrails: one active code per email (a resend supersedes earlier
codes; a rapid re-submit inside the cooldown refreshes the pending row
without sending a new email), per-email cap 6 codes/hour, per-IP cap
30/hour (generous on purpose — school labs share one IP). Applicants
who stall at the code step sit in `registrations` with `verified_at`
null — complete with phone numbers — ready for follow-up; a returning
unverified email simply resumes (row refreshed, new code).

Extra env vars needed (Vercel Project Settings → Environment
Variables): `SUPABASE_SERVICE_ROLE_KEY` (Project Settings → API Keys →
secret key) alongside the existing `RESEND_API_KEY`. The function also
needs the Supabase URL, which it reads from `SUPABASE_URL` or the
existing `VITE_SUPABASE_URL`.

Local testing: `npm run dev` serves the SPA only — `/api/*` needs
`vercel dev` with the server-side vars in `.env.local` (see
`.env.example`).

## Analytics, attribution & the internal stats page

Three layers, all shipped in `src/lib/analytics.ts` + `api/stats.ts`:

- **Vercel Web Analytics** (`inject()` in `main.tsx`) for pageviews and
  referrers — enable Analytics on the project in the Vercel dashboard
  or nothing is recorded.
- **Funnel events, owned in Supabase** (`events` table, insert-only
  anon policy): `register_view` → `form_start` → `submit_success` (code
  emailed) → `verified` (code entered), fired fire-and-forget from
  `/register`. No plan caps, and the stats page can read them.
  Directional data (adblockers undercount) — registrations are ground
  truth.
- **Attribution**: on first load the client captures `utm_source`,
  `utm_medium`, `utm_campaign`, `?ref=` and the external referrer into
  localStorage (a later visit with campaign params overwrites — last
  campaign touch). Every event carries it, and `api/register.ts` writes
  it onto the registration row — so **every link you distribute should
  carry `?utm_source=…` or `?ref=…`** or it reports as "direct /
  unknown".

**`/stats`** is the internal counter (noindex, never prerendered):
today's verified count, target progress toward 2,000, 14-day trend,
funnel conversion, and by-source/class/city splits — all from the
`stats_payload()` Postgres function (service-role only). Gated by the
`STATS_KEY` env var (`openssl rand -hex 16`): open
`/stats?key=<STATS_KEY>` once, the page remembers the key in
localStorage and strips it from the URL.

## Email notifications

`api/notify.ts` is a Vercel Function that Supabase calls (via Database
Webhooks) after every insert. It emails an internal alert for each
submission and a confirmation to the applicant (registrations only),
using [Resend](https://resend.com). One-time setup:

1. **Resend** — create an account, verify the `aiwingschool.com` domain
   (DNS records shown in their dashboard), create an API key.
2. **Vercel env vars** (Project Settings → Environment Variables,
   Production):
   - `RESEND_API_KEY` — from step 1
   - `SUPABASE_WEBHOOK_SECRET` — any random string, e.g.
     `openssl rand -hex 24`
   - optional: `NOTIFY_EMAIL` (internal recipient, default
     `connect@aiwingschool.com`) and `NOTIFY_FROM` (sender, default
     `WingsQuest <notifications@aiwingschool.com>` — must be on the
     verified domain)
3. **Supabase webhooks** — Dashboard → Integrations → Database
   Webhooks → Create, one per table: `demo_requests` with event
   **INSERT**, `registrations` with events **INSERT and UPDATE** (the
   function emails only when a row is or becomes verified — unverified
   inserts and ordinary edits are ignored). Type HTTP request, method
   POST.
   Pass the shared secret one of two ways (the function accepts either):
   - **URL query param (recommended, most reliable):** set the URL to
     `https://<your-domain>/api/notify?secret=<SUPABASE_WEBHOOK_SECRET>`.
     The URL field isn't masked on edit, so a save can't silently blank
     it.
   - **HTTP header:** URL `https://<your-domain>/api/notify` plus a
     header `x-webhook-secret` = `SUPABASE_WEBHOOK_SECRET`. Note Supabase
     masks the header value when you re-open the webhook — re-enter it in
     full on every edit or the save clears it (a wrong/empty value makes
     the function return 401 and no email is sent).
4. Redeploy, submit a test on each form, and check the emails arrive
   (delivery errors appear in Vercel → Logs for `/api/notify`).

Email sending is fire-and-forget from the database's perspective: if
Resend is down the submission is still stored in Supabase.
