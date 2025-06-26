import { createClient } from '@/lib/supabase/client'
import { Influencer } from '@/lib/types'
import { mockInfluencers } from '@/lib/mock-data/influencers'

// Helper para obtener company_id, podemos reusarlo si lo movemos a un utils
async function getCompanyIdForCurrentUser(supabase: ReturnType<typeof createClient>): Promise<string> {
    try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
            console.warn('No authenticated user found in influencerService, using demo company ID');
            return 'demo-company-id';
        }
        const { data: memberData, error: memberError } = await supabase
            .from('company_members')
            .select('company_id')
            .eq('user_id', user.id)
            .single();
        if (memberError || !memberData) {
            console.warn('No company membership found in influencerService, using demo company ID');
            return 'demo-company-id';
        }
        return memberData.company_id;
    } catch (error) {
        console.error('Error in getCompanyIdForCurrentUser (influencerService), using demo ID:', error);
        return 'demo-company-id';
    }
}

export const influencerService = {
    async getInfluencers(): Promise<Influencer[]> {
        try {
            const supabase = createClient();
            const companyId = await getCompanyIdForCurrentUser(supabase);

            // Si es demo, simplemente devolver los mocks
            if (companyId === 'demo-company-id') {
                console.warn("Using mock influencer data.");
                return mockInfluencers;
            }

            const { data, error } = await supabase
                .from('crm_contacts')
                .select('*')
                .eq('contact_type', 'Influencer');

            if (error) {
                console.error('Error fetching influencers, falling back to mock data:', error);
                return mockInfluencers;
            }

            if (!data) return [];

            return data.map((item: any): Influencer => {
                const mockData = mockInfluencers.find((inf: Influencer) => inf.name === item.name) || {
                    followers: 0,
                    engagement: '0%',
                    platform: 'instagram',
                    avatarUrl: '',
                    tags: []
                };

                return {
                    id: item.id,
                    name: item.name,
                    followers: mockData.followers,
                    engagement: mockData.engagement,
                    platform: mockData.platform,
                    avatarUrl: (item.details?.avatarUrl) || mockData.avatarUrl,
                    tags: (item.details?.tags) || mockData.tags,
                };
            });
        } catch (error) {
            console.error('Catastrophic error in getInfluencers, falling back to mock data:', error);
            return mockInfluencers;
        }
    },

    async seedInfluencers(): Promise<{ seeded: number; errors: any[] }> {
        const supabase = createClient();
        // La siembra de influencers no necesita companyId porque son contactos 'globales'
        // que luego pueden ser asociados a una compañía.
        
        let seededCount = 0;
        const errors: any[] = [];

        for (const influencer of mockInfluencers) {
            try {
                const { error } = await supabase
                    .from('crm_contacts')
                    .upsert({
                        name: influencer.name,
                        contact_type: 'Influencer',
                        details: { avatarUrl: influencer.avatarUrl, tags: influencer.tags }
                    }, { onConflict: 'name' });
                
                if (error) throw error;
                
                seededCount++;

            } catch (e: any) {
                errors.push({ influencerName: influencer.name, error: e.message });
            }
        }
        return { seeded: seededCount, errors };
    }
} 