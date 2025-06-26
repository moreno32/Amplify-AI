// This service will be responsible for fetching and updating brand profile data.
// For now, it uses mock data. In the future, it will interact with the Supabase API.

import { createClient } from '@/lib/supabase/server';
import { BrandProfile } from '@/lib/types';
import { cookies } from 'next/headers';
import { mockBrandProfile } from '../mock-data/brand';

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
      .select('*') // Fetches all columns, including new ones
      .eq('id', memberData.company_id)
      .single();

    if (companyError || !companyData) {
      console.error('Error fetching company data:', companyError);
      throw new Error('Failed to fetch brand profile data.');
    }

    const { brand_identity, ...restOfCompanyData } = companyData;

    // Construct the BrandProfile object to match the UI expectations
    const profile: BrandProfile = {
      id: restOfCompanyData.id, // company ID
      name: restOfCompanyData.name, // company name from DB
      companyName: restOfCompanyData.name, // For consistency with mock type
      companyIndustry: restOfCompanyData.company_industry, // New field
      companyType: restOfCompanyData.company_type,
      companySize: restOfCompanyData.company_size,
      companyWebsite: restOfCompanyData.company_website,
      companyDescription: restOfCompanyData.company_description, // New field
      targetAudience: restOfCompanyData.target_audience,
      language: restOfCompanyData.language,
      timezone: restOfCompanyData.timezone,
      // User-specific fields are not part of the 'companies' table directly,
      // so we provide defaults or empty values if they are expected by BrandProfile type
      // but not stored in 'companies' table.
      // These would ideally come from a 'users' table or similar.
      firstName: '', // Default or fetch from user profile if needed elsewhere
      lastName: '',  // Default
      email: '',    // Default
      role: '',      // Default
      dob: '',        // Default
      country: '',    // Default
      gender: 'prefer_not_to_say', //Default
      userDescription: '', // Default
      
      // Nested brand identity fields
      core: brand_identity?.core ?? {},
      voice: brand_identity?.voice ?? {},
      visual: brand_identity?.visual ?? {},
      assets: brand_identity?.assets ?? {},
    };

    return profile;
  },

  updateBrandProfile: async (profileData: Partial<BrandProfile>): Promise<{ success: boolean; error?: any }> => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    try {
      const companyId = await getUserCompany(supabase);

      // Destructure only the company-specific fields from profileData
      const {
        // Company direct fields
        companyName, // This will be mapped to 'name' in the DB
        companyIndustry,
        companyType,
        companySize,
        companyWebsite,
        companyDescription,
        targetAudience,
        language,
        timezone,
        // Brand identity nested fields
        core,
        voice,
        visual,
        assets,
        // Ignore user-specific fields like id, firstName, email, userDescription, etc.
      } = profileData;

      const brand_identity = { core, voice, visual, assets };

      // Prepare the update object for Supabase
      const companyUpdateData: any = {};
      if (companyName !== undefined) companyUpdateData.name = companyName;
      if (companyIndustry !== undefined) companyUpdateData.company_industry = companyIndustry;
      if (companyType !== undefined) companyUpdateData.company_type = companyType;
      if (companySize !== undefined) companyUpdateData.company_size = companySize;
      if (companyWebsite !== undefined) companyUpdateData.company_website = companyWebsite;
      if (companyDescription !== undefined) companyUpdateData.company_description = companyDescription;
      if (targetAudience !== undefined) companyUpdateData.target_audience = targetAudience;
      if (language !== undefined) companyUpdateData.language = language;
      if (timezone !== undefined) companyUpdateData.timezone = timezone;
      
      // Only update brand_identity if there are relevant changes
      if (core || voice || visual || assets) {
        companyUpdateData.brand_identity = brand_identity;
      }
      
      companyUpdateData.updated_at = new Date().toISOString();

      if (Object.keys(companyUpdateData).length <= 1 && !companyUpdateData.brand_identity) { // only updated_at
        // No actual data to update other than timestamp, maybe skip or just update timestamp
        console.log("No significant data changes to update for brand profile.");
        return { success: true }; // Or proceed to update only timestamp
      }

      const { error: companyError } = await supabase
        .from('companies')
        .update(companyUpdateData)
        .eq('id', companyId);

      if (companyError) throw companyError;

      return { success: true };
    } catch (error) {
      console.error("Error updating brand profile:", error);
      return { success: false, error };
    }
  },

  seedBrandProfile: async (): Promise<{ success: boolean; error?: any }> => {
    try {
      // Use the full mock profile for seeding, updateBrandProfile will filter relevant fields.
      const seedData = mockBrandProfile;
      console.log("Seeding with mock data:", seedData.companyName, seedData.companyIndustry);
      return brandProfileService.updateBrandProfile(seedData);
    } catch (error) {
      console.error("Error seeding brand profile:", error);
      return { success: false, error };
    }
  },
}; 