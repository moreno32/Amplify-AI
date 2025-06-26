-- Migration to update and complete dimension tables based on lib/types.ts

-- 1. Update dim_post_status
-- First, standardize older, potentially capitalized names to the new lowercase standard.
-- This prevents unique constraint errors when the INSERT runs later.
UPDATE public.dim_post_status SET name = 'draft' WHERE name = 'Draft';
UPDATE public.dim_post_status SET name = 'scheduled' WHERE name = 'Scheduled';
UPDATE public.dim_post_status SET name = 'published' WHERE name = 'Published';
UPDATE public.dim_post_status SET name = 'awaiting-approval' WHERE name = 'Needs Approval';

-- Now, insert any missing values. The ON CONFLICT clause handles cases
-- where the script might be run more than once or if lowercase values already existed.
INSERT INTO public.dim_post_status (name) VALUES
    ('draft'), 
    ('scheduled'), 
    ('published'), 
    ('idea'), 
    ('awaiting-approval')
ON CONFLICT (name) DO NOTHING;

-- 'Archived' from 0001_master_setup.sql remains if it was inserted, not touched here as it's not in PostStatus type.

-- 2. Update dim_platforms
-- Add missing platforms relevant to Post.platform and Conversation.channel

INSERT INTO public.dim_platforms (name) VALUES
    ('Twitter'), -- For Post.platform 'twitter', postService capitalizes to 'Twitter'
    ('WhatsApp') -- For Conversation.channel 'whatsapp', service would capitalize
ON CONFLICT (name) DO NOTHING;

-- Platforms from 0001_master_setup.sql ('Instagram', 'Facebook', 'X', 'LinkedIn', 'TikTok', 'YouTube') 
-- are expected to remain and be correctly capitalized.

-- Script correctivo para el Paso 6

-- Primero, eliminamos los valores en minúscula que se insertaron incorrectamente.
DELETE FROM public.dim_post_status WHERE name IN ('draft', 'scheduled', 'published', 'awaiting-approval');

-- Ahora, actualizamos los valores originales con mayúscula a minúscula. Esto ya no debería fallar.
UPDATE public.dim_post_status SET name = 'draft' WHERE name = 'Draft';
UPDATE public.dim_post_status SET name = 'scheduled' WHERE name = 'Scheduled';
UPDATE public.dim_post_status SET name = 'published' WHERE name = 'Published';
UPDATE public.dim_post_status SET name = 'awaiting-approval' WHERE name = 'Needs Approval';

-- Insertamos los nuevos estados que faltaban.
INSERT INTO public.dim_post_status (name) VALUES
    ('idea')
ON CONFLICT (name) DO NOTHING;

-- Finalmente, añadimos las plataformas que faltaban como estaba previsto.
INSERT INTO public.dim_platforms (name) VALUES
    ('Twitter'),
    ('WhatsApp')
ON CONFLICT (name) DO NOTHING;

SELECT 'Migración 0006 corregida y completada con éxito.'; 