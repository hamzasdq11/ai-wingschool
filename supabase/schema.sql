-- WingsQuest data tables. Idempotent: safe to run the whole file again
-- in the Supabase SQL Editor (Dashboard → SQL Editor → New query).

-- Registrations (WingsQuest application form on /register)
create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  student text not null check (char_length(trim(student)) between 1 and 120),
  grade smallint not null check (grade between 6 and 10),
  school text not null check (char_length(trim(school)) between 1 and 120),
  board text not null check (board in ('CBSE','ICSE','State Board','IB','Cambridge (IGCSE)','Other')),
  city text not null check (char_length(trim(city)) between 1 and 80),
  email text not null check (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$' and char_length(email) <= 254),
  phone text not null check (phone ~ '^[6-9][0-9]{9}$'),
  interest text not null default '' check (char_length(interest) <= 220)
);

-- Set once the applicant proves ownership of the email via the OTP
-- step (api/register.ts). Rows created since the OTP flow shipped are
-- always verified; null marks legacy pre-OTP registrations.
alter table public.registrations
  add column if not exists verified_at timestamptz;

-- One application per email (case-insensitive). The form turns the
-- resulting Postgres 23505 error into a friendly inline message.
-- Note: creation fails if existing rows already contain duplicates —
-- clean those up in the Table Editor first.
create unique index if not exists registrations_email_unique
  on public.registrations (lower(email));

alter table public.registrations enable row level security;

-- No insert policy: registrations are written exclusively by
-- api/register.ts (service role, bypasses RLS) after the applicant
-- verifies a 6-digit email code. The publishable key can neither read
-- nor write this table.
drop policy if exists "public can register" on public.registrations;

-- Email-verification challenges for the registration form. One active
-- (unconsumed, unsuperseded) challenge per email; requesting a new code
-- supersedes earlier ones. `payload` holds the pending application so a
-- row only ever lands in `registrations` after the code checks out —
-- and so drop-offs at the code step remain recoverable for follow-up.
-- Only the service role touches this table (RLS on, no policies).
-- Optional hygiene, run occasionally or via pg_cron:
--   delete from public.otp_challenges where created_at < now() - interval '30 days';
create table if not exists public.otp_challenges (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null check (char_length(email) <= 254),
  code_hash text not null,
  expires_at timestamptz not null,
  attempts smallint not null default 0,
  consumed_at timestamptz,
  superseded_at timestamptz,
  ip text,
  payload jsonb not null
);

create index if not exists otp_challenges_email_idx
  on public.otp_challenges (email, created_at desc);
create index if not exists otp_challenges_ip_idx
  on public.otp_challenges (ip, created_at desc);

alter table public.otp_challenges enable row level security;

-- Demo-call requests (Book a Demo form on the landing page)
create table if not exists public.demo_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(trim(name)) between 1 and 120),
  phone text not null check (phone ~ '^\+?[0-9\s\-]{10,15}$'),
  grade smallint not null check (grade between 5 and 10)
);

alter table public.demo_requests enable row level security;

drop policy if exists "public can book demo" on public.demo_requests;
create policy "public can book demo"
  on public.demo_requests
  for insert
  to anon
  with check (true);

-- Email notifications are driven by Database Webhooks, configured in the
-- dashboard (not here, so the shared secret stays out of git):
--   Dashboard → Integrations → Database Webhooks → Create — one webhook
--   per table (registrations, demo_requests), event INSERT, type
--   HTTP request, method POST, URL https://<your-domain>/api/notify,
--   HTTP header  x-webhook-secret: <same value as the Vercel env var
--   SUPABASE_WEBHOOK_SECRET>.
-- The receiving function is api/notify.ts; setup steps in README.md.
