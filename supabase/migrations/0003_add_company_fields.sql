ALTER TABLE public.companies
ADD COLUMN IF NOT EXISTS company_industry TEXT,
ADD COLUMN IF NOT EXISTS company_description TEXT;

COMMENT ON COLUMN public.companies.company_industry IS 'The primary industry of the company, e.g., Salud y Bienestar, SaaS, eCommerce.';
COMMENT ON COLUMN public.companies.company_description IS 'A brief description of the company, its mission, or unique selling proposition.';

SELECT 'Migration 0003_add_company_fields.sql completed.'; 