CREATE TABLE IF NOT EXISTS public.admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.admin_users FROM anon, authenticated;
GRANT SELECT ON public.admin_users TO authenticated;

DROP POLICY IF EXISTS "Admins can read their own admin membership"
ON public.admin_users;

CREATE POLICY "Admins can read their own admin membership"
ON public.admin_users
FOR SELECT TO authenticated
USING (
  id = (SELECT auth.uid())
  AND lower(email) = lower(
    coalesce((SELECT auth.jwt() ->> 'email'), '')
  )
);

CREATE OR REPLACE FUNCTION public.is_store_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users au
    WHERE au.id = (SELECT auth.uid())
      AND lower(au.email) = lower(
        coalesce((SELECT auth.jwt() ->> 'email'), '')
      )
  );
$$;

REVOKE ALL ON FUNCTION public.is_store_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_store_admin() TO authenticated;
