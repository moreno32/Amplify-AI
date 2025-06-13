import { Influencer } from '@/lib/types';

export const mockInfluencers: Influencer[] = [
  {
    id: 'inf_1',
    name: 'Elena Rios',
    username: '@elenawellness',
    avatarUrl: '/avatars/05.png',
    followers: 25400,
    engagementRate: 4.2,
    affinityScore: 85,
    tags: ['Yoga', 'Wellness', 'Mindfulness'],
  },
  {
    id: 'inf_2',
    name: 'David Chen',
    username: '@davidchen.fit',
    avatarUrl: '/avatars/06.png',
    followers: 48900,
    engagementRate: 3.1,
    affinityScore: 72,
    tags: ['Fitness', 'Nutrition', 'Lifestyle'],
  },
  {
    id: 'inf_3',
    name: 'Aisha Khan',
    username: '@aishaskitchen',
    avatarUrl: '/avatars/07.png',
    followers: 12000,
    engagementRate: 5.8,
    affinityScore: 91,
    tags: ['Healthy Food', 'Vegan', 'Recipes'],
  },
  {
    id: 'inf_4',
    name: 'Marco Bianchi',
    username: '@marcobianchi.travel',
    avatarUrl: '/avatars/08.png',
    followers: 150000,
    engagementRate: 2.5,
    affinityScore: 65,
    tags: ['Travel', 'Photography', 'Adventure'],
  },
]; 