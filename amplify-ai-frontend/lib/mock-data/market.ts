import { User, Competitor } from '@/lib/types';

export const mockUser: User = {
  id: 'user_1',
  name: 'Sofia Reyes',
  email: 'sofia@amplify.ai',
  onboardingCompleted: true,
};

export const mockCompetitors = [
    {
      id: 'comp_1',
      name: 'TitanFit',
      username: '@titanfit_club',
      avatarUrl: 'https://picsum.photos/100/100?random=14',
      followers: 25200,
      engagementRate: 3.2,
      recentPostImageUrl: 'https://picsum.photos/400/400?random=15',
    },
    {
      id: 'comp_2',
      name: 'Femme Power',
      username: '@femme.power.gym',
      avatarUrl: 'https://picsum.photos/100/100?random=16',
      followers: 12900,
      engagementRate: 4.8,
      recentPostImageUrl: 'https://picsum.photos/400/400?random=17',
    },
    {
      id: 'comp_3',
      name: 'The Core Club',
      username: '@thecoreclub',
      avatarUrl: 'https://picsum.photos/100/100?random=18',
      followers: 31500,
      engagementRate: 4.5,
      recentPostImageUrl: 'https://picsum.photos/400/400?random=19',
    },
    {
      id: 'comp_4',
      name: 'Lift House',
      username: '@lifthouse.gym',
      avatarUrl: 'https://picsum.photos/100/100?random=20',
      followers: 85000,
      engagementRate: 2.9,
      recentPostImageUrl: 'https://picsum.photos/400/400?random=21',
    },
  ]; 