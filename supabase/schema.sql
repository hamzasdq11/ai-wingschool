-- WingsQuest registrations table.
-- Run once in the Supabase SQL Editor (Dashboard → SQL Editor → New query).

create table public.registrations (
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

-- The site (anon key) may only insert. Reading requires the dashboard
-- or the service-role key, so submitted data is never exposed publicly.
create policy "public can register"
  on public.registrations
  for insert
  to anon
  with check (true);
