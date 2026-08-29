-- PipeHook outreach leads. Extra nullable columns are reserved for later
-- thumbnail, OG and engagement work — do not use them in app code yet.

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  lead_slug text unique not null,
  company_name text not null,
  logo_url text,
  accent_color text,
  industry text not null check (industry in ('relining', 'dranering', 'enskilt-avlopp')),
  loom_video_id text not null,
  contact_name text not null,
  contact_booking_url text not null,
  copy_override jsonb,
  og_image_url text,
  viewed_at timestamptz,
  demo_clicked_at timestamptz,
  created_at timestamptz default now()
);

create index if not exists leads_industry_idx on leads (industry);
create index if not exists leads_created_at_idx on leads (created_at desc);

alter table leads enable row level security;

-- No policies: anon/authenticated cannot read or write.
-- The Next.js server uses the service role, which bypasses RLS.
