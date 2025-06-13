export interface TopPost {
  id: number;
  imageUrl: string;
  mainStat: {
    label: 'Alcance' | 'Likes' | 'Comentarios';
    value: string;
  };
  secondaryStats: {
    likes: number;
    comments: number;
  };
}

export const topPostsData: TopPost[] = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=500&q=80",
    mainStat: { label: 'Alcance', value: '25.3k' },
    secondaryStats: { likes: 2100, comments: 154 },
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80",
    mainStat: { label: 'Alcance', value: '22.1k' },
    secondaryStats: { likes: 1800, comments: 120 },
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=500&q=80",
    mainStat: { label: 'Likes', value: '2.5k' },
    secondaryStats: { likes: 2500, comments: 230 },
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80",
    mainStat: { label: 'Comentarios', value: '312' },
    secondaryStats: { likes: 1500, comments: 312 },
  },
  {
    id: 5,
    imageUrl: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&q=80",
    mainStat: { label: 'Alcance', value: '19.8k' },
    secondaryStats: { likes: 1600, comments: 98 },
  },
  {
    id: 6,
    imageUrl: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&q=80",
    mainStat: { label: 'Likes', value: '2.2k' },
    secondaryStats: { likes: 2200, comments: 180 },
  }
]; 