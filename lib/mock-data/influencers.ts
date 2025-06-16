import { Influencer } from '@/lib/types';

export const mockInfluencers: Influencer[] = [
  {
    id: 'INFLUENCER::001',
    name: 'SofiaFit',
    username: '@sofia_fit',
    avatarUrl: 'https://picsum.photos/100/100?random=10',
    followers: 45200,
    engagementRate: 5.1,
    affinityScore: 92,
    tags: ['Fitness', 'StrongWoman', 'Well-Living'],
  },
  {
    id: 'INFLUENCER::002',
    name: 'Alex Performance',
    username: '@alexperformance',
    avatarUrl: 'https://picsum.photos/100/100?random=11',
    followers: 18900,
    engagementRate: 4.2,
    affinityScore: 85,
    tags: ['HIIT', 'Performance', 'Training'],
  },
  {
    id: 'INFLUENCER::003',
    name: 'Clara Health',
    username: '@clarahealth',
    avatarUrl: 'https://picsum.photos/100/100?random=12',
    followers: 88000,
    engagementRate: 6.3,
    affinityScore: 88,
    tags: ['Nutrition', 'Healthy Habits', 'Mindfulness'],
  },
  {
    id: 'INFLUENCER::004',
    name: 'Iron Mike',
    username: '@iron.mike',
    avatarUrl: 'https://picsum.photos/100/100?random=13',
    followers: 125100,
    engagementRate: 3.5,
    affinityScore: 78,
    tags: ['Bodybuilding', 'Strength', 'Powerlifting'],
  },
]; 