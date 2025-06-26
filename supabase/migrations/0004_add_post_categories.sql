-- Migration to add post categories

-- 1. Create the dimension table for post categories
CREATE TABLE IF NOT EXISTS public.dim_post_categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);
COMMENT ON TABLE public.dim_post_categories IS 'Stores thematic categories for posts, e.g., Entrenamiento, Nutrición, Motivación.';

-- 2. Add the category_id column to the posts table
ALTER TABLE public.posts
ADD COLUMN IF NOT EXISTS category_id INTEGER NULL REFERENCES public.dim_post_categories(id) ON DELETE SET NULL;
COMMENT ON COLUMN public.posts.category_id IS 'Thematic category of the post.';

-- 3. Populate dim_post_categories with initial values from the PostCategory type
-- (Adjust these if your PostCategory type in lib/types.ts is different)
INSERT INTO public.dim_post_categories (name) VALUES
    ('Entrenamiento'),
    ('Nutrición'),
    ('Motivación'),
    ('Promoción'),
    ('Evento')
ON CONFLICT (name) DO NOTHING;

-- (Opcional) Actualizar posts existentes si se puede inferir una categoría
-- Por ejemplo, si todos los posts existentes deben tener una categoría por defecto:
-- UPDATE public.posts SET category_id = (SELECT id FROM public.dim_post_categories WHERE name = 'General') WHERE category_id IS NULL;
-- (Asegúrese de que 'General' exista en dim_post_categories si usa la línea anterior)

SELECT 'Migration 0004_add_post_categories.sql completed.'; 