-- Strict migration: enforce user_id NOT NULL and add FK (run only after verifying existing rows)

-- 1) verify there are no NULL user_id rows before running
-- SELECT count(*) FROM public.analytics WHERE user_id IS NULL;

-- 2) set any orphaned user_id values to a valid user or delete them
-- (handle per your data policy)

-- 3) Set column NOT NULL
ALTER TABLE public.analytics
  ALTER COLUMN user_id SET NOT NULL;

-- 4) Add FK constraint (will fail if any orphaned values exist)
ALTER TABLE public.analytics
  ADD CONSTRAINT analytics_user_id_fkey_strict
  FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
