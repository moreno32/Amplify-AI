import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { Influencer } from '@/lib/types'
import { mockInfluencers } from '@/lib/mock-data/influencers'

// Helper para obtener company_id, podemos reusarlo si lo movemos a un utils
async function getCompanyIdForCurrentUser(supabase: ReturnType<typeof createClient>): Promise<string> {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
        throw new Error('User not authenticated.');
    }
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

export const influencerService = {
    async getInfluencers(): Promise<Influencer[]> {
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);
        await getCompanyIdForCurrentUser(supabase);

        const { data, error } = await supabase
            .from('crm_contacts')
            // No necesitamos asociar con company_contacts para una búsqueda general,
            // pero si quisiéramos mostrar solo 'influencers guardados', la consulta cambiaría.
            // Por ahora, traemos todos los que son de tipo 'Influencer'.
            .select('*')
            .eq('contact_type', 'Influencer');

        if (error) {
            console.error('Error fetching influencers:', error);
            throw new Error('Failed to fetch influencers.');
        }

        if (!data) return [];

        // Mapear los datos de la DB al tipo Influencer.
        // El mock tiene más detalles (como engagement, followers) que no están en la DB.
        // En un caso real, la DB tendría estos campos o se obtendrían de una API.
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
    },

    async seedInfluencers(): Promise<{ seeded: number; errors: any[] }> {
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);
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