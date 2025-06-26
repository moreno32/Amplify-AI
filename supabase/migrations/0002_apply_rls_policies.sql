-- =================================================================
-- Amplify AI - RLS Policies Script (v1.0)
-- =================================================================
-- This script applies the Row Level Security (RLS) policies required
-- for a multi-tenant setup. It ensures that users can only access
-- data associated with the companies they are members of.
-- =================================================================

-- 1. HELPER FUNCTION
-- Checks if the currently authenticated user is a member of a given company.
-- This function is the cornerstone of our RLS strategy.
CREATE OR REPLACE FUNCTION public.is_member_of(p_company_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.company_members
    WHERE company_members.company_id = p_company_id
    AND company_members.user_id = auth.uid()
  );
END;
$$;

-- 2. RLS POLICIES
-- We drop existing policies first to ensure a clean slate, then re-create them.

-- Table: users
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Table: companies
DROP POLICY IF EXISTS "Members can view their own companies" ON public.companies;
CREATE POLICY "Members can view their own companies" ON public.companies
  FOR SELECT USING (public.is_member_of(id));
  
-- Note: We are not allowing company creation/update via RLS for now.
-- This would typically be handled by a SECURITY DEFINER function to ensure consistency.

-- Table: company_members
DROP POLICY IF EXISTS "Members can view company memberships" ON public.company_members;
CREATE POLICY "Members can view company memberships" ON public.company_members
  FOR SELECT USING (public.is_member_of(company_id));
  
-- Note: Managing memberships (INSERT, DELETE) should be restricted to owners/admins
-- and is best handled by secure functions.

-- Table: social_accounts
DROP POLICY IF EXISTS "Members can manage social accounts" ON public.social_accounts;
CREATE POLICY "Members can manage social accounts" ON public.social_accounts
  FOR ALL USING (public.is_member_of(company_id));

-- Table: campaigns
DROP POLICY IF EXISTS "Members can manage campaigns" ON public.campaigns;
CREATE POLICY "Members can manage campaigns" ON public.campaigns
  FOR ALL USING (public.is_member_of(company_id));

-- Table: posts
-- Posts are linked to a social_account_id, so we need to check membership through that relation.
DROP POLICY IF EXISTS "Members can manage posts" ON public.posts;
DROP FUNCTION IF EXISTS public.get_company_id_for_post(uuid); -- Drop the old helper function

CREATE POLICY "Members can manage posts" ON public.posts
  FOR ALL
  USING (
    EXISTS (
      SELECT 1
      FROM public.social_accounts sa
      WHERE sa.id = posts.social_account_id AND public.is_member_of(sa.company_id)
    )
  );

-- Table: brand_assets
DROP POLICY IF EXISTS "Members can manage brand assets" ON public.brand_assets;
CREATE POLICY "Members can manage brand assets" ON public.brand_assets
  FOR ALL USING (public.is_member_of(company_id));

-- Table: subscriptions
DROP POLICY IF EXISTS "Members can view their subscriptions" ON public.subscriptions;
CREATE POLICY "Members can view their subscriptions" ON public.subscriptions
  FOR SELECT USING (public.is_member_of(company_id));

-- =================================================================
-- 3. POLICIES FOR DIMENSION TABLES
-- These tables contain public, non-sensitive data that all authenticated
-- users need to access for the application to function correctly.
-- =================================================================

-- Table: dim_post_status
DROP POLICY IF EXISTS "Authenticated users can read post statuses" ON public.dim_post_status;
CREATE POLICY "Authenticated users can read post statuses" ON public.dim_post_status
  FOR SELECT TO authenticated USING (true);

-- Table: dim_post_categories
DROP POLICY IF EXISTS "Authenticated users can read post categories" ON public.dim_post_categories;
CREATE POLICY "Authenticated users can read post categories" ON public.dim_post_categories
  FOR SELECT TO authenticated USING (true);

-- Table: dim_content_types
DROP POLICY IF EXISTS "Authenticated users can read content types" ON public.dim_content_types;
CREATE POLICY "Authenticated users can read content types" ON public.dim_content_types
  FOR SELECT TO authenticated USING (true);

-- Table: dim_platforms
DROP POLICY IF EXISTS "Authenticated users can read platforms" ON public.dim_platforms;
CREATE POLICY "Authenticated users can read platforms" ON public.dim_platforms
  FOR SELECT TO authenticated USING (true);


SELECT 'Amplify AI RLS policies applied successfully.';

ALTER TABLE public.posts
ADD COLUMN IF NOT EXISTS duration INTEGER,
ADD COLUMN IF NOT EXISTS notes TEXT;

COMMENT ON COLUMN public.posts.duration IS 'Duration of the post content, e.g., in minutes for a video.';
COMMENT ON COLUMN public.posts.notes IS 'Internal notes or details about the post.';

SELECT 'Migration 0005 executed manually.'; 