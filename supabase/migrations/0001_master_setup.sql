-- =================================================================
-- Amplify AI - Master Database Setup Script (v1.0)
-- =================================================================
-- This script resets and configures the entire public schema.
-- It is designed to be run from the Supabase SQL Editor.
-- Execution Order:
-- 1. Drop all public tables (in order of dependency).
-- 2. Create all tables and dimension tables (Schema v6.1).
-- 3. Seed all dimension tables with initial data.
-- 4. Create the user onboarding function (`handle_new_user`).
-- 5. Create the trigger on `auth.users`.
-- 6. Apply RLS policies required for the trigger to function.
-- =================================================================

-- 1. DROP EXISTING PUBLIC TABLES
-- Done in reverse order of creation to respect foreign key constraints.
DROP TABLE IF EXISTS public.brand_assets CASCADE;
DROP TABLE IF EXISTS public.company_contacts CASCADE;
DROP TABLE IF EXISTS public.crm_contacts CASCADE;
DROP TABLE IF EXISTS public.posts CASCADE;
DROP TABLE IF EXISTS public.campaigns CASCADE;
DROP TABLE IF EXISTS public.subscriptions CASCADE;
DROP TABLE IF EXISTS public.plans CASCADE;
DROP TABLE IF EXISTS public.social_accounts CASCADE;
DROP TABLE IF EXISTS public.company_members CASCADE;
DROP TABLE IF EXISTS public.companies CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;
DROP TABLE IF EXISTS public.dim_content_types CASCADE;
DROP TABLE IF EXISTS public.dim_roles CASCADE;
DROP TABLE IF EXISTS public.dim_post_status CASCADE;
DROP TABLE IF EXISTS public.dim_platforms CASCADE;

-- 2. CREATE SCHEMA (v6.1)
-- Dimension Tables
CREATE TABLE IF NOT EXISTS public.dim_platforms (id SERIAL PRIMARY KEY, name TEXT NOT NULL UNIQUE);
CREATE TABLE IF NOT EXISTS public.dim_post_status (id SERIAL PRIMARY KEY, name TEXT NOT NULL UNIQUE);
CREATE TABLE IF NOT EXISTS public.dim_roles (id SERIAL PRIMARY KEY, name TEXT NOT NULL UNIQUE);
CREATE TABLE IF NOT EXISTS public.dim_content_types (id SERIAL PRIMARY KEY, name TEXT NOT NULL UNIQUE);

-- Core Entities
CREATE TABLE IF NOT EXISTS public.users (id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE, full_name TEXT, avatar_url TEXT, onboarding_completed BOOLEAN DEFAULT FALSE);
CREATE TABLE IF NOT EXISTS public.companies (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), name TEXT NOT NULL, brand_identity JSONB, ai_configuration JSONB, stripe_customer_id TEXT UNIQUE, created_at TIMESTAMPTZ DEFAULT NOW(), language VARCHAR(10), timezone VARCHAR(50), company_type TEXT, company_size TEXT, company_website TEXT, target_audience TEXT);
CREATE TABLE IF NOT EXISTS public.company_members (company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE, user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE, role_id INTEGER NOT NULL REFERENCES public.dim_roles(id), PRIMARY KEY (company_id, user_id));
CREATE TABLE IF NOT EXISTS public.social_accounts (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE, platform_id INTEGER NOT NULL REFERENCES public.dim_platforms(id), handle TEXT NOT NULL, access_token_encrypted TEXT, created_at TIMESTAMPTZ DEFAULT NOW());

-- Business & Billing Logic
CREATE TABLE IF NOT EXISTS public.plans (id SERIAL PRIMARY KEY, name TEXT NOT NULL, features JSONB);
CREATE TABLE IF NOT EXISTS public.subscriptions (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE, plan_id INTEGER NOT NULL REFERENCES public.plans(id), status TEXT NOT NULL, ends_at TIMESTAMPTZ, stripe_subscription_id TEXT UNIQUE, created_at TIMESTAMPTZ DEFAULT NOW());

-- Marketing & Content
CREATE TABLE IF NOT EXISTS public.campaigns (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE, name TEXT NOT NULL, goal TEXT, start_date DATE, end_date DATE);
CREATE TABLE IF NOT EXISTS public.posts (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), social_account_id UUID NOT NULL REFERENCES public.social_accounts(id) ON DELETE CASCADE, campaign_id UUID REFERENCES public.campaigns(id) ON DELETE SET NULL, content_type_id INTEGER NOT NULL REFERENCES public.dim_content_types(id), status_id INTEGER NOT NULL REFERENCES public.dim_post_status(id), content TEXT, media_urls TEXT[], scheduled_at TIMESTAMPTZ NOT NULL, published_at TIMESTAMPTZ, metrics JSONB, created_at TIMESTAMPTZ DEFAULT NOW());

-- CRM & Influencers
CREATE TABLE IF NOT EXISTS public.crm_contacts (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), name TEXT NOT NULL, email TEXT UNIQUE, contact_type TEXT, details JSONB);
CREATE TABLE IF NOT EXISTS public.company_contacts (company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE, contact_id UUID NOT NULL REFERENCES public.crm_contacts(id) ON DELETE CASCADE, pipeline_status TEXT NOT NULL, PRIMARY KEY (company_id, contact_id));

-- Brand Assets
CREATE TABLE IF NOT EXISTS public.brand_assets (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE, asset_type TEXT NOT NULL, name TEXT NOT NULL, url TEXT NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW());

-- 3. SEED DIMENSION TABLES
INSERT INTO public.dim_roles (name) VALUES ('Owner'), ('Admin'), ('Editor'), ('Viewer') ON CONFLICT (name) DO NOTHING;
INSERT INTO public.dim_platforms (name) VALUES ('Instagram'), ('Facebook'), ('X'), ('LinkedIn'), ('TikTok'), ('YouTube') ON CONFLICT (name) DO NOTHING;
INSERT INTO public.dim_post_status (name) VALUES ('Draft'), ('Scheduled'), ('Published'), ('Needs Approval'), ('Archived') ON CONFLICT (name) DO NOTHING;
INSERT INTO public.dim_content_types (name) VALUES ('Image Post'), ('Video Post'), ('Reel'), ('Story'), ('Carousel'), ('Text Post') ON CONFLICT (name) DO NOTHING;

-- 4. CREATE ONBOARDING FUNCTION (handle_new_user)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_company_id UUID;
  owner_role_id INTEGER;
  company_name_text TEXT;
BEGIN
  INSERT INTO public.users (id, full_name, avatar_url)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');

  company_name_text := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    SPLIT_PART(NEW.email, '@', 1)
  ) || '''s Company';

  INSERT INTO public.companies (name)
  VALUES (company_name_text)
  RETURNING id INTO new_company_id;

  SELECT id INTO owner_role_id FROM public.dim_roles WHERE name = 'Owner';

  INSERT INTO public.company_members (user_id, company_id, role_id)
  VALUES (NEW.id, new_company_id, owner_role_id);

  RETURN NEW;
END;
$$;

-- 5. CREATE TRIGGER
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 6. ENABLE RLS & APPLY POLICIES
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dim_roles ENABLE ROW LEVEL SECURITY;

-- Allow postgres role (used by the trigger) to operate on tables.
DROP POLICY IF EXISTS "Allow postgres to insert into users" ON public.users;
CREATE POLICY "Allow postgres to insert into users" ON public.users FOR INSERT TO postgres WITH CHECK (true);

DROP POLICY IF EXISTS "Allow postgres to insert into companies" ON public.companies;
CREATE POLICY "Allow postgres to insert into companies" ON public.companies FOR INSERT TO postgres WITH CHECK (true);

DROP POLICY IF EXISTS "Allow postgres to insert into company_members" ON public.company_members;
CREATE POLICY "Allow postgres to insert into company_members" ON public.company_members FOR INSERT TO postgres WITH CHECK (true);

DROP POLICY IF EXISTS "Allow postgres to select from dim_roles" ON public.dim_roles;
CREATE POLICY "Allow postgres to select from dim_roles" ON public.dim_roles FOR SELECT TO postgres USING (true);


SELECT 'Amplify AI Master Database Setup complete.'; 