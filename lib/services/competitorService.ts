import { createClient } from '@/lib/supabase/client'
import { Competitor } from '@/lib/types'
import { competitors as mockCompetitors } from '@/lib/mock-data/competitors' // Corregido y renombrado

// Helper para obtener company_id, podemos reusarlo si lo movemos a un utils, por ahora lo copiamos.
async function getCompanyIdForCurrentUser(supabase: ReturnType<typeof createClient>): Promise<string> {
    try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
            console.warn('No authenticated user found in competitorService, using demo company ID');
            return 'demo-company-id';
        }
        const { data: memberData, error: memberError } = await supabase
            .from('company_members')
            .select('company_id')
            .eq('user_id', user.id)
            .single();
        if (memberError || !memberData) {
            console.warn('No company membership found in competitorService, using demo company ID');
            return 'demo-company-id';
        }
        return memberData.company_id;
    } catch (error) {
        console.error('Error in getCompanyIdForCurrentUser (competitorService), using demo ID:', error);
        return 'demo-company-id';
    }
}


export const competitorService = {
    async getCompetitors(): Promise<Competitor[]> {
        try {
            const supabase = createClient();
            const companyId = await getCompanyIdForCurrentUser(supabase);

            if (companyId === 'demo-company-id') {
                console.warn("Using mock competitor data.");
                return mockCompetitors;
            }

            const { data, error } = await supabase
                .from('company_contacts')
                .select(`
                    contact:crm_contacts (
                        id,
                        name,
                        details
                    )
                `)
                .eq('company_id', companyId)
                .eq('contact.contact_type', 'Competitor');

            if (error) {
                console.error('Error fetching competitors, falling back to mock data:', error);
                return mockCompetitors;
            }

            if (!data) return [];
            
            return data.map((item: any) => {
                const competitorMock = mockCompetitors.find((c: Competitor) => c.name === item.contact.name) || { stats: [], logoUrl: '', postImageUrl: '' };
                return {
                    id: item.contact.id,
                    name: item.contact.name,
                    logoUrl: competitorMock.logoUrl,
                    postImageUrl: competitorMock.postImageUrl,
                    stats: competitorMock.stats
                }
            });
        } catch (error) {
            console.error('Catastrophic error in getCompetitors, falling back to mock data:', error);
            return mockCompetitors;
        }
    },

    async seedCompetitors(): Promise<{ seeded: number; errors: any[] }> {
        const supabase = createClient();
        const companyId = await getCompanyIdForCurrentUser(supabase);
        
        let seededCount = 0;
        const errors: any[] = [];

        for (const competitor of mockCompetitors) {
            try {
                // 1. Upsert en crm_contacts. Usamos el nombre como clave de unicidad para evitar duplicados.
                const { data: crmContact, error: crmError } = await supabase
                    .from('crm_contacts')
                    .upsert({
                        name: competitor.name,
                        contact_type: 'Competitor',
                        // Se pueden añadir más detalles al JSONB 'details' si es necesario.
                        details: {
                            logoUrl: competitor.logoUrl,
                            postImageUrl: competitor.postImageUrl,
                        }
                    }, { onConflict: 'name' })
                    .select('id')
                    .single();

                if (crmError) throw crmError;
                if (!crmContact) throw new Error('Failed to upsert CRM contact.');

                // 2. Upsert en company_contacts para asociar el competidor con la compañía.
                const { error: companyContactError } = await supabase
                    .from('company_contacts')
                    .upsert({
                        company_id: companyId,
                        contact_id: crmContact.id,
                        pipeline_status: 'Monitoring' // Un estado para competidores
                    });

                if (companyContactError) throw companyContactError;
                
                seededCount++;

            } catch (e: any) {
                errors.push({ competitorName: competitor.name, error: e.message });
            }
        }
        return { seeded: seededCount, errors };
    }
} 