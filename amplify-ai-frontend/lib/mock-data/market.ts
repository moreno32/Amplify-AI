import { User, Competitor } from '@/lib/types';

export const mockUser: User = {
  id: 'user_1',
  name: 'Sofia Reyes',
  email: 'sofia@amplify.ai',
  onboardingCompleted: true,
};

export const mockUserWithStats: Competitor = {
    id: "user_0",
    name: "O2CW",
    logoUrl: "https://picsum.photos/100/100?random=9",
    postImageUrl: "https://picsum.photos/400/300?random=9",
    stats: [
        { label: "Publicaciones/sem", value: "6", isBetter: false },
        { label: "Engagement Prom.", value: "2.8%", isBetter: false },
        { label: "Hashtag Dominante", value: "#O2CWmovement", isBetter: false },
    ]
};

export const mockCompetitors: Competitor[] = [
    {
        id: "comp_1",
        name: "Gymbox",
        logoUrl: "https://picsum.photos/100/100?random=10",
        postImageUrl: "https://picsum.photos/400/300?random=11",
        stats: [
            { label: "Publicaciones/sem", value: "8", isBetter: true },
            { label: "Engagement Prom.", value: "2.1%", isBetter: false },
            { label: "Hashtag Dominante", value: "#outofthebox", isBetter: true },
        ]
    },
    {
        id: "comp_2",
        name: "Third Space",
        logoUrl: "https://picsum.photos/100/100?random=12",
        postImageUrl: "https://picsum.photos/400/300?random=13",
        stats: [
            { label: "Publicaciones/sem", value: "5", isBetter: false },
            { label: "Engagement Prom.", value: "3.5%", isBetter: true },
            { label: "Hashtag Dominante", value: "#luxurytraining", isBetter: true },
        ]
    },
    {
        id: "comp_3",
        name: "Barry's",
        logoUrl: "https://picsum.photos/100/100?random=14",
        postImageUrl: "https://picsum.photos/400/300?random=15",
        stats: [
            { label: "Publicaciones/sem", value: "12", isBetter: true },
            { label: "Engagement Prom.", value: "1.8%", isBetter: false },
            { label: "Hashtag Dominante", value: "#redroom", isBetter: false },
        ]
    },
    {
        id: "comp_4",
        name: "F45 Training",
        logoUrl: "https://picsum.photos/100/100?random=16",
        postImageUrl: "https://picsum.photos/400/300?random=17",
        stats: [
            { label: "Publicaciones/sem", value: "7", isBetter: false },
            { label: "Engagement Prom.", value: "2.9%", isBetter: true },
            { label: "Hashtag Dominante", value: "#F45challenge", isBetter: true },
        ]
    }
]; 