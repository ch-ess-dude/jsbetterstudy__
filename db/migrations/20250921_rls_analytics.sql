-- Enable Row Level Security and add policies for analytics table

-- 1) Enable RLS
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- 2) Allow users to SELECT their own analytics rows
CREATE POLICY analytics_select_own ON public.analytics
  FOR SELECT
  USING (auth.uid() = user_id);

-- 3) Allow users to INSERT only with their own user_id
CREATE POLICY analytics_insert_own ON public.analytics
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 4) Allow users to UPDATE their own rows
CREATE POLICY analytics_update_own ON public.analytics
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 5) Allow users to DELETE their own rows
CREATE POLICY analytics_delete_own ON public.analytics
  FOR DELETE
  USING (auth.uid() = user_id);

-- Note: auth.uid() is a Supabase helper available in Postgres functions when using Supabase JWT
-- If you're not using Supabase or auth.uid() isn't available, replace with appropriate session user id mechanism.
