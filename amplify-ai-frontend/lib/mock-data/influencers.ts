import { Influencer } from '@/lib/types';

export const mockInfluencers: Influencer[] = [
  {
    id: 'inf_1',
    name: 'Elena Rios',
    username: '@elenawellness',
    avatarUrl: 'https://images.unsplash.com/photo-1506126613408-4e61f36d50da?w=100&h=100&fit=crop&q=80',
    followers: 25400,
    engagementRate: 4.2,
    affinityScore: 85,
    tags: ['Yoga', 'Wellness', 'Mindfulness'],
  },
  {
    id: 'inf_2',
    name: 'David Chen',
    username: '@davidchen.fit',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&q=80',
    followers: 48900,
    engagementRate: 3.1,
    affinityScore: 72,
    tags: ['Fitness', 'Nutrition', 'Lifestyle'],
  },
  {
    id: 'inf_3',
    name: 'Aisha Khan',
    username: '@aishaskitchen',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80',
    followers: 12000,
    engagementRate: 5.8,
    affinityScore: 91,
    tags: ['Healthy Food', 'Vegan', 'Recipes'],
  },
  {
    id: 'inf_4',
    name: 'Marco Bianchi',
    username: '@marcobianchi.travel',
    avatarUrl: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=100&h=100&fit=crop&q=80',
    followers: 150000,
    engagementRate: 2.5,
    affinityScore: 65,
    tags: ['Travel', 'Photography', 'Adventure'],
  },
]; 