-- Migration: add analytics.user_id column and index (idempotent)
-- Adds a nullable user_id column, attempts to add an FK if possible, and creates index

ALTER TABLE public.analytics
  ADD COLUMN IF NOT EXISTS user_id uuid;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'analytics_user_id_fkey'
  ) THEN
    BEGIN
      ALTER TABLE public.analytics
        ADD CONSTRAINT analytics_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
    EXCEPTION WHEN others THEN
      RAISE NOTICE 'Could not add FK constraint to analytics(user_id) - check users table and existing analytics.user_id values';
    END;
  END IF;
END
$$;

CREATE INDEX IF NOT EXISTS idx_analytics_user_date ON public.analytics(user_id, date);
