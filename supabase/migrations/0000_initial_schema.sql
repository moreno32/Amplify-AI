-- Supabase Initial Schema - v6.1
-- This script contains the complete schema for the initial version of the application.
-- It includes all tables, dimension tables, and alterations.

-- 1. DIMENSION TABLES (Single Source of Truth)
CREATE TABLE IF NOT EXISTS public.dim_platforms (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);
COMMENT ON TABLE public.dim_platforms IS 'Stores social media platforms like Instagram, X, Facebook.';

CREATE TABLE IF NOT EXISTS public.dim_post_status (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);
COMMENT ON TABLE public.dim_post_status IS 'Stores the status of a post, e.g., Draft, Scheduled, Published.';

CREATE TABLE IF NOT EXISTS public.dim_roles (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);
COMMENT ON TABLE public.dim_roles IS 'Stores user roles within a company, e.g., Owner, Admin, Editor.';

CREATE TABLE IF NOT EXISTS public.dim_content_types (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);
COMMENT ON TABLE public.dim_content_types IS 'Stores types of content, e.g., Image, Video, Reel, Text.';

-- 2. CORE ENTITIES
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    onboarding_completed BOOLEAN DEFAULT FALSE
);
COMMENT ON TABLE public.users IS 'Profile information for each user, extending the auth.users table. Tracks onboarding.';

CREATE TABLE IF NOT EXISTS public.companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    brand_identity JSONB,
    ai_configuration JSONB,
    stripe_customer_id TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    language VARCHAR(10),
    timezone VARCHAR(50),
    company_type TEXT,
    company_size TEXT,
    company_website TEXT,
    target_audience TEXT
);
COMMENT ON TABLE public.companies IS 'Represents a workspace. Now with detailed brand profile fields.';

CREATE TABLE IF NOT EXISTS public.company_members (
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    role_id INTEGER NOT NULL REFERENCES public.dim_roles(id),
    PRIMARY KEY (company_id, user_id)
);
COMMENT ON TABLE public.company_members IS 'Associates users with companies and defines their roles.';

CREATE TABLE IF NOT EXISTS public.social_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    platform_id INTEGER NOT NULL REFERENCES public.dim_platforms(id),
    handle TEXT NOT NULL,
    access_token_encrypted TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE public.social_accounts IS 'Stores connected social media accounts for each company.';

-- 3. BUSINESS & BILLING LOGIC
CREATE TABLE IF NOT EXISTS public.plans (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    features JSONB
);
COMMENT ON TABLE public.plans IS 'Defines the subscription plans available.';

CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    plan_id INTEGER NOT NULL REFERENCES public.plans(id),
    status TEXT NOT NULL, -- e.g., active, canceled, past_due
    ends_at TIMESTAMPTZ,
    stripe_subscription_id TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE public.subscriptions IS 'Tracks which company is subscribed to which plan.';

-- 4. MARKETING & CONTENT
CREATE TABLE IF NOT EXISTS public.campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    goal TEXT,
    start_date DATE,
    end_date DATE
);
COMMENT ON TABLE public.campaigns IS 'Groups posts together under a single strategic objective.';

CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    social_account_id UUID NOT NULL REFERENCES public.social_accounts(id) ON DELETE CASCADE,
    campaign_id UUID REFERENCES public.campaigns(id) ON DELETE SET NULL,
    content_type_id INTEGER NOT NULL REFERENCES public.dim_content_types(id),
    status_id INTEGER NOT NULL REFERENCES public.dim_post_status(id),
    content TEXT,
    media_urls TEXT[],
    scheduled_at TIMESTAMPTZ NOT NULL,
    published_at TIMESTAMPTZ,
    metrics JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE public.posts IS 'Represents a single piece of content to be published.';

-- 5. CRM & INFLUENCERS
CREATE TABLE IF NOT EXISTS public.crm_contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    contact_type TEXT, -- e.g., Influencer, Lead
    details JSONB -- e.g., { followers: 10000, engagement_rate: 0.05 }
);
COMMENT ON TABLE public.crm_contacts IS 'A global directory of contacts like influencers or leads.';

CREATE TABLE IF NOT EXISTS public.company_contacts (
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    contact_id UUID NOT NULL REFERENCES public.crm_contacts(id) ON DELETE CASCADE,
    pipeline_status TEXT NOT NULL, -- e.g., Discovered, Contacted, Negotiating
    PRIMARY KEY (company_id, contact_id)
);
COMMENT ON TABLE public.company_contacts IS 'Tracks the relationship between a company and a CRM contact.';

-- 6. BRAND ASSETS
CREATE TABLE IF NOT EXISTS public.brand_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    asset_type TEXT NOT NULL, -- e.g., 'logo', 'photo', 'video'
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE public.brand_assets IS 'Stores brand assets like logos, photos, and videos.';

-- 7. ENABLE ROW LEVEL SECURITY (RLS) for all relevant tables
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_assets ENABLE ROW LEVEL SECURITY;

-- Note: RLS Policies and Data Seeding are handled in separate scripts.
SELECT 'Schema v6.1 migration file created.'; 