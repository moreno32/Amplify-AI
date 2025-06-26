-- Migration to add duration and notes to posts table

ALTER TABLE public.posts
ADD COLUMN IF NOT EXISTS duration INTEGER NULL,
ADD COLUMN IF NOT EXISTS notes TEXT NULL;

COMMENT ON COLUMN public.posts.duration IS 'Duration of the event or activity related to the post, in minutes.';
COMMENT ON COLUMN public.posts.notes IS 'Additional private notes or details for the post.';

SELECT 'Migration 0005_add_post_duration_notes.sql completed.'; 