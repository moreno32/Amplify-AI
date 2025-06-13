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
      avatarUrl: 'https://images.unsplash.com/photo-1621847412523-04b9b43512d7?w=100&h=100&fit=crop&q=80',
      followers: 15200,
      engagementRate: 2.8,
      recentPostImageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop&q=80',
    },
    {
      id: 'comp_2',
      name: 'Zenith Yoga Studio',
      username: '@zenithyoga',
      avatarUrl: 'https://images.unsplash.com/photo-1620242255734-27878c65f248?w=100&h=100&fit=crop&q=80',
      followers: 8900,
      engagementRate: 4.1,
      recentPostImageUrl: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=400&h=400&fit=crop&q=80',
    },
    {
      id: 'comp_3',
      name: 'Flow & Fitness',
      username: '@flowfit',
      avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop&q=80',
      followers: 22500,
      engagementRate: 3.5,
      recentPostImageUrl: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400&h=400&fit=crop&q=80',
    },
    {
      id: 'comp_4',
      name: 'MindBody Balance',
      username: '@mindbody.b',
      avatarUrl: 'https://images.unsplash.com/photo-1549492423-400259a5e5a9?w=100&h=100&fit=crop&q=80',
      followers: 12000,
      engagementRate: 3.9,
      recentPostImageUrl: 'https://images.unsplash.com/photo-1548690312-e3b511d5b110?w=400&h=400&fit=crop&q=80',
    },
  ]; 