-- Ensure analytics table exists (idempotent)
-- Create a minimal analytics table if it doesn't exist, then try to add FK/index if possible

CREATE TABLE IF NOT EXISTS public.analytics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  date date,
  study_time_seconds int default 0,
  sessions_completed int default 0,
  tasks_completed int default 0,
  tasks_left int default 0
);

-- If users table exists, try to add FK constraint (no-op if already present)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE c.relname = 'users' AND n.nspname = 'public'
  ) THEN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'analytics_user_id_fkey') THEN
      BEGIN
        ALTER TABLE public.analytics
          ADD CONSTRAINT analytics_user_id_fkey
          FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
      EXCEPTION WHEN others THEN
        RAISE NOTICE 'Could not add FK constraint analytics_user_id_fkey (will try later)';
      END;
    END IF;
  END IF;
END
$$;

CREATE INDEX IF NOT EXISTS idx_analytics_user_date ON public.analytics(user_id, date);
