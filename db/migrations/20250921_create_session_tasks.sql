-- Create session_tasks table to link sessions and tasks
-- Ensure sessions.id and tasks.id types are compatible (expected uuid)
-- Using explicit uuid types for session_id and task_id to match existing schema
DO $$
DECLARE
  sessions_col_type text;
  tasks_col_type text;
  create_sql text;
BEGIN
  -- Determine the exact SQL type of sessions.id and tasks.id
  SELECT pg_catalog.format_type(a.atttypid, a.atttypmod)
    INTO sessions_col_type
    FROM pg_attribute a
    JOIN pg_class c ON a.attrelid = c.oid
    JOIN pg_namespace n ON c.relnamespace = n.oid
    WHERE n.nspname = 'public' AND c.relname = 'sessions' AND a.attname = 'id'
    LIMIT 1;

  SELECT pg_catalog.format_type(a.atttypid, a.atttypmod)
    INTO tasks_col_type
    FROM pg_attribute a
    JOIN pg_class c ON a.attrelid = c.oid
    JOIN pg_namespace n ON c.relnamespace = n.oid
    WHERE n.nspname = 'public' AND c.relname = 'tasks' AND a.attname = 'id'
    LIMIT 1;

  -- Fallbacks if not found
  IF sessions_col_type IS NULL THEN
    sessions_col_type := 'uuid';
  END IF;
  IF tasks_col_type IS NULL THEN
    tasks_col_type := 'uuid';
  END IF;

  -- Only create table if it doesn't already exist
  IF to_regclass('public.session_tasks') IS NULL THEN
    create_sql := 'CREATE TABLE public.session_tasks (' ||
                  'id uuid primary key default gen_random_uuid(), ' ||
                  'session_id ' || sessions_col_type || ' references public.sessions(id) on delete cascade, ' ||
                  'task_id ' || tasks_col_type || ' references public.tasks(id) on delete cascade, ' ||
                  'status text default ''active'', ' ||
                  'created_at timestamptz default now()' ||
                  ')';

    EXECUTE create_sql;
    EXECUTE 'CREATE INDEX IF NOT EXISTS idx_session_tasks_session ON public.session_tasks(session_id)';
    EXECUTE 'CREATE INDEX IF NOT EXISTS idx_session_tasks_task ON public.session_tasks(task_id)';
  END IF;
END
$$;
