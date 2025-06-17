import { Competitor, UserCompetitorMetrics } from '@/lib/types';

export const userMetrics: UserCompetitorMetrics = {
  followers: 82000,
  engagementRate: 3.5,
  postFrequency: 3,
};

export const competitors: Competitor[] = [
    {
        id: 'rival1',
        name: '@GymPeak',
        logoUrl: 'https://avatar.vercel.sh/gympeak.png',
        postImageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop&q=60',
        stats: [
            { label: 'Seguidores', value: '115k', isBetter: true },
            { label: 'Tasa de Engagement', value: '2.1%', isBetter: false },
            { label: 'Frecuencia (posts/sem)', value: '7', isBetter: true },
        ],
      },
      {
        id: 'rival2',
        name: '@UrbanFit',
        logoUrl: 'https://avatar.vercel.sh/urbanfit.png',
        postImageUrl: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=500&h=500&fit=crop&q=60',
        stats: [
            { label: 'Seguidores', value: '75k', isBetter: false },
            { label: 'Tasa de Engagement', value: '4.2%', isBetter: true },
            { label: 'Frecuencia (posts/sem)', value: '4', isBetter: true },
        ],
      },
      {
        id: 'rival3',
        name: '@YogaFlowStudio',
        logoUrl: 'https://avatar.vercel.sh/yogaflow.png',
        postImageUrl: 'https://images.unsplash.com/photo-1599447462464-369873f27f12?w=500&h=500&fit=crop&q=60',
        stats: [
            { label: 'Seguidores', value: '92k', isBetter: true },
            { label: 'Tasa de Engagement', value: '3.3%', isBetter: false },
            { label: 'Frecuencia (posts/sem)', value: '2', isBetter: false },
        ],
      },
]; 
