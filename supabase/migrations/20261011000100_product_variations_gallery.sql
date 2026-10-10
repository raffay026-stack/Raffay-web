ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS variations jsonb
    NOT NULL DEFAULT '{"name":"","options":[]}'::jsonb,
  ADD COLUMN IF NOT EXISTS gallery_images jsonb
    NOT NULL DEFAULT '[]'::jsonb;

NOTIFY pgrst, 'reload schema';
