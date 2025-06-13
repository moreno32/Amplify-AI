import { User, Competitor } from '@/lib/types';

export const mockUser: User = {
  id: 'user_1',
  name: 'Sofia Reyes',
  email: 'sofia@amplify.ai',
  onboardingCompleted: true,
};

export const mockCompetitors: Competitor[] = [
    {
      id: 'comp_1',
      name: 'Urban Wellness Club',
      username: '@urbanwellness',
      avatarUrl: '/avatars/01.png',
      followers: 15200,
      engagementRate: 2.8,
      recentPostImageUrl: '/placeholders/comp1.png',
    },
    {
      id: 'comp_2',
      name: 'Zenith Yoga Studio',
      username: '@zenithyoga',
      avatarUrl: '/avatars/02.png',
      followers: 8900,
      engagementRate: 4.1,
      recentPostImageUrl: '/placeholders/comp2.png',
    },
    {
      id: 'comp_3',
      name: 'Flow & Fitness',
      username: '@flowfit',
      avatarUrl: '/avatars/03.png',
      followers: 22500,
      engagementRate: 3.5,
      recentPostImageUrl: '/placeholders/comp3.png',
    },
    {
      id: 'comp_4',
      name: 'MindBody Balance',
      username: '@mindbody.b',
      avatarUrl: '/avatars/04.png',
      followers: 12000,
      engagementRate: 3.9,
      recentPostImageUrl: '/placeholders/comp4.png',
    },
  ]; 