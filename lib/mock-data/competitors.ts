import { Competitor } from '@/lib/types';

export const userMetrics = {
    followers: 82000,
    engagementRate: 3.5,
    postFrequency: 3,
};

export const competitors: Competitor[] = [
    {
        id: 'rival1',
        name: '@GymPeak',
        logo: 'https://avatar.vercel.sh/gympeak.png',
        recentPostImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop&q=60',
        metrics: {
            followers: 115000,
            engagementRate: 2.1,
            postFrequency: 7, // posts/week
        },
    },
    {
        id: 'rival2',
        name: '@UrbanFit',
        logo: 'https://avatar.vercel.sh/urbanfit.png',
        recentPostImage: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=500&h=500&fit=crop&q=60',
        metrics: {
            followers: 75000,
            engagementRate: 4.2,
            postFrequency: 4,
        },
    },
    {
        id: 'rival3',
        name: '@YogaFlowStudio',
        logo: 'https://avatar.vercel.sh/yogaflow.png',
        recentPostImage: 'https://images.unsplash.com/photo-1599447462464-369873f27f12?w=500&h=500&fit=crop&q=60',
        metrics: {
            followers: 92000,
            engagementRate: 3.3,
            postFrequency: 2,
        },
    },
]; 