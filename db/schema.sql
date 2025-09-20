-- Supabase schema for Just Better Study MVP

create table if not exists users (
  id uuid primary key,
  email text,
  name text,
  avatar_url text,
  created_at timestamptz default now()
);

create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  start_ts timestamptz,
  end_ts timestamptz,
  duration_seconds int
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  title text,
  completed boolean default false,
  due_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists analytics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  date date,
  study_time_seconds int default 0,
  sessions_completed int default 0,
  tasks_completed int default 0,
  tasks_left int default 0
);

-- Indexes for queries
create index if not exists idx_analytics_user_date on analytics(user_id, date);
create index if not exists idx_tasks_user_created on tasks(user_id, created_at);
create index if not exists idx_sessions_user_start on sessions(user_id, start_ts);
