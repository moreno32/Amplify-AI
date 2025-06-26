// This service will be responsible for fetching and updating brand profile data.
// For now, it uses mock data. In the future, it will interact with the Supabase API.

import { createClient } from '@/lib/supabase/client';
import { BrandProfile } from '@/lib/types';
import { mockBrandProfile } from '../mock-data/brand';

// Helper function to get the current user's company
async function getUserCompany(supabase: ReturnType<typeof createClient>): Promise<string> {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            console.warn("No user authenticated in brandProfileService, returning demo ID");
            return 'demo-company-id';
        }

        const { data: memberData, error: memberError } = await supabase
            .from('company_members')
            .select('company_id')
            .eq('user_id', user.id)
            .single();

        if (memberError || !memberData) {
            console.warn("Could not find company for the current user in brandProfileService, returning demo ID");
            return 'demo-company-id';
        }

        return memberData.company_id;
    } catch (error) {
        console.error("Error in getUserCompany (brandProfileService):", error);
        return 'demo-company-id';
    }
}

export const brandProfileService = {
  getBrandProfile: async (): Promise<BrandProfile> => {
    try {
      const supabase = createClient();
      const companyId = await getUserCompany(supabase);

      // Si es demo, simplemente devolver los mocks
      if (companyId === 'demo-company-id') {
          console.warn("Using mock brand profile data.");
          return mockBrandProfile;
      }
      
      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .select('*') // Fetches all columns, including new ones
        .eq('id', companyId)
        .single();

      if (companyError || !companyData) {
        console.error('Error fetching company data, falling back to mock data:', companyError);
        return mockBrandProfile;
      }

      const { brand_identity, ...restOfCompanyData } = companyData;

      const profile: BrandProfile = {
        id: restOfCompanyData.id,
        name: restOfCompanyData.name,
        companyName: restOfCompanyData.name,
        companyIndustry: restOfCompanyData.company_industry,
        companyType: restOfCompanyData.company_type,
        companySize: restOfCompanyData.company_size,
        companyWebsite: restOfCompanyData.company_website,
        companyDescription: restOfCompanyData.company_description,
        targetAudience: restOfCompanyData.target_audience,
        language: restOfCompanyData.language,
        timezone: restOfCompanyData.timezone,
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        dob: '',
        country: '',
        gender: 'prefer_not_to_say',
        userDescription: '',
        core: brand_identity?.core ?? {},
        voice: brand_identity?.voice ?? {},
        visual: brand_identity?.visual ?? {},
        assets: brand_identity?.assets ?? {},
      };

      return profile;
    } catch (error) {
      console.error('Catastrophic error in getBrandProfile, falling back to mock data:', error);
      return mockBrandProfile;
    }
  },

  updateBrandProfile: async (profileData: Partial<BrandProfile>): Promise<{ success: boolean; error?: any }> => {
    const supabase = createClient();

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