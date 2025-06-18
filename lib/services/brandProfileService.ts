// This service will be responsible for fetching and updating brand profile data.
// For now, it uses mock data. In the future, it will interact with the Supabase API.

import { createClient } from '@/lib/supabase/server';
import { BrandProfile } from '@/lib/types';
import { cookies } from 'next/headers';

// Helper function to get the current user's company
async function getUserCompany(supabase: ReturnType<typeof createClient>) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data: memberData, error: memberError } = await supabase
        .from('company_members')
        .select('company_id')
        .eq('user_id', user.id)
        .single();

    if (memberError || !memberData) {
        throw new Error('Could not find company for the current user.');
    }

    return memberData.company_id;
}

export const brandProfileService = {
  getBrandProfile: async (): Promise<BrandProfile> => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      // This will be caught by the an error boundary
      throw new Error('User not authenticated. Could not fetch brand profile.');
    }

    const { data: memberData, error: memberError } = await supabase
      .from('company_members')
      .select('company_id')
      .eq('user_id', user.id)
      .single();

    if (memberError || !memberData) {
      console.error('Error fetching company membership:', memberError);
      throw new Error('Could not find company for the current user.');
    }

    const { data: companyData, error: companyError } = await supabase
      .from('companies')
      .select('*')
      .eq('id', memberData.company_id)
      .single();

    if (companyError || !companyData) {
      console.error('Error fetching company data:', companyError);
      throw new Error('Failed to fetch brand profile data.');
    }

    // Deconstruct the brand_identity JSONB and merge it with the rest
    // of the company data to match the legacy BrandProfile type structure
    // that the UI components expect.
    const { brand_identity, ...restOfCompanyData } = companyData;

    const profile: BrandProfile = {
      ...restOfCompanyData,
      core: brand_identity?.core ?? {},
      voice: brand_identity?.voice ?? {},
      visual: brand_identity?.visual ?? {},
      assets: brand_identity?.assets ?? {},
    };

    return profile;
  },
}; 