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

alter table public.registrations enable row level security;

-- The site (publishable key) may only insert. Reading requires the
-- dashboard, so submitted data is never exposed publicly.
drop policy if exists "public can register" on public.registrations;
create policy "public can register"
  on public.registrations
  for insert
  to anon
  with check (true);

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
