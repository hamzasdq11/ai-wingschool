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
-- step. api/register.ts inserts the row immediately on submit with
-- verified_at null and flips it when the code checks out — so the
-- table shows every attempt, and null means the code was never entered
-- (or the row predates the OTP flow). Count verified_at is not null
-- toward registration targets.
alter table public.registrations
  add column if not exists verified_at timestamptz;

-- Attribution: which link brought this applicant. Captured client-side
-- from URL params (utm_*, ?ref=) + document.referrer, sent with the
-- application, written by api/register.ts. Null = direct/unknown.
alter table public.registrations
  add column if not exists utm_source text check (char_length(utm_source) <= 160);
alter table public.registrations
  add column if not exists utm_medium text check (char_length(utm_medium) <= 160);
alter table public.registrations
  add column if not exists utm_campaign text check (char_length(utm_campaign) <= 160);
alter table public.registrations
  add column if not exists ref text check (char_length(ref) <= 160);
alter table public.registrations
  add column if not exists referrer text check (char_length(referrer) <= 300);

-- One application per email (case-insensitive). api/register.ts checks
-- for a verified duplicate before sending any code (friendly inline
-- message); the index is the backstop against races.
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
-- supersedes earlier ones. The pending application itself lives in
-- `registrations` (verified_at null) — this table only tracks codes
-- and send-rate history. Only the service role touches it (RLS on, no
-- policies). Optional hygiene, run occasionally or via pg_cron:
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
  ip text
);

-- Early versions kept the pending application here as jsonb; it now
-- lives in `registrations` directly.
alter table public.otp_challenges drop column if exists payload;

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

-- Registration funnel events, logged fire-and-forget from the client
-- (src/lib/analytics.ts): register_view → form_start → submit_success
-- (code emailed) → verified (code entered). Insert-only for the site;
-- read via stats_payload() below. Analytics-grade data: anon inserts
-- mean it is directional, not ground truth — registrations are the
-- ground truth. Same optional hygiene as otp_challenges.
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (name in ('register_view','form_start','submit_success','verified')),
  session text check (char_length(session) <= 64),
  path text check (char_length(path) <= 200),
  utm_source text check (char_length(utm_source) <= 160),
  utm_medium text check (char_length(utm_medium) <= 160),
  utm_campaign text check (char_length(utm_campaign) <= 160),
  ref text check (char_length(ref) <= 160),
  referrer text check (char_length(referrer) <= 300)
);

create index if not exists events_name_created_idx
  on public.events (name, created_at desc);

alter table public.events enable row level security;

drop policy if exists "public can log events" on public.events;
create policy "public can log events"
  on public.events
  for insert
  to anon
  with check (true);

-- Aggregates for the internal /stats page (api/stats.ts, service role
-- only — no anon/authenticated execute). Day boundaries in IST.
create or replace function public.stats_payload()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
with reg as (
  select ((created_at at time zone 'Asia/Kolkata')::date) as day,
         verified_at, grade,
         initcap(trim(city)) as city,
         coalesce(nullif(trim(utm_source), ''), nullif(trim(ref), ''), 'direct / unknown') as source
  from registrations
),
ev as (
  select name, ((created_at at time zone 'Asia/Kolkata')::date) as day
  from events
),
today as (select (now() at time zone 'Asia/Kolkata')::date as d)
select jsonb_build_object(
  'generated_at', to_char(now() at time zone 'Asia/Kolkata', 'DD Mon YYYY, HH24:MI') || ' IST',
  'totals', (select jsonb_build_object(
      'all', count(*),
      'verified', count(*) filter (where verified_at is not null)) from reg),
  'today', (select jsonb_build_object(
      'all', count(*),
      'verified', count(*) filter (where verified_at is not null))
      from reg, today where day = today.d),
  'yesterday', (select jsonb_build_object(
      'all', count(*),
      'verified', count(*) filter (where verified_at is not null))
      from reg, today where day = today.d - 1),
  'daily', (select coalesce(jsonb_agg(jsonb_build_object('day', day, 'all', c, 'verified', v) order by day desc), '[]'::jsonb)
      from (select day, count(*) as c, count(*) filter (where verified_at is not null) as v
            from reg, today where day > today.d - 14 group by day) t),
  'by_source', (select coalesce(jsonb_agg(jsonb_build_object('source', source, 'all', c, 'verified', v) order by v desc, c desc), '[]'::jsonb)
      from (select source, count(*) as c, count(*) filter (where verified_at is not null) as v
            from reg group by source) t),
  'by_grade', (select coalesce(jsonb_agg(jsonb_build_object('grade', grade, 'all', c, 'verified', v) order by grade), '[]'::jsonb)
      from (select grade, count(*) as c, count(*) filter (where verified_at is not null) as v
            from reg group by grade) t),
  'by_city', (select coalesce(jsonb_agg(jsonb_build_object('city', city, 'all', c, 'verified', v) order by v desc, c desc), '[]'::jsonb)
      from (select city, count(*) as c, count(*) filter (where verified_at is not null) as v
            from reg group by city
            order by count(*) filter (where verified_at is not null) desc, count(*) desc
            limit 12) t),
  'funnel_today', (select coalesce(jsonb_object_agg(name, c), '{}'::jsonb)
      from (select name, count(*) as c from ev, today where day = today.d group by name) t),
  'funnel_7d', (select coalesce(jsonb_object_agg(name, c), '{}'::jsonb)
      from (select name, count(*) as c from ev, today where day > today.d - 7 group by name) t)
)
$$;

revoke all on function public.stats_payload() from public;
revoke all on function public.stats_payload() from anon;
revoke all on function public.stats_payload() from authenticated;
grant execute on function public.stats_payload() to service_role;

-- Email notifications are driven by Database Webhooks, configured in the
-- dashboard (not here, so the shared secret stays out of git):
--   Dashboard → Integrations → Database Webhooks → Create — one webhook
--   per table (registrations, demo_requests), event INSERT, type
--   HTTP request, method POST, URL https://<your-domain>/api/notify,
--   HTTP header  x-webhook-secret: <same value as the Vercel env var
--   SUPABASE_WEBHOOK_SECRET>.
-- The receiving function is api/notify.ts; setup steps in README.md.
