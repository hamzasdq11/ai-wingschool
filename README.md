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

The demo and WingsQuest registration forms insert directly into Supabase
(project tables `demo_requests` and `registrations`) via `supabase-js`
using the publishable key. Tables are protected by insert-only row-level
security — the site can write but never read; view entries in the
Supabase dashboard (Table Editor), from any device.

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
  application shows an inline "already exists" message.

There is no backend server for the site itself: deploy to Vercel with
the two `VITE_SUPABASE_*` env vars set in the project's build settings.
On submit failure the forms show a WhatsApp (demo) or email
(registration) fallback.

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
   Webhooks → Create, one per table (`registrations`,
   `demo_requests`): event **INSERT**, type HTTP request, method POST.
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
