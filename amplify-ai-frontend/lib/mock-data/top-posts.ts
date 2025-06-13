export interface TopPost {
  id: number;
  imageUrl: string;
  mainStat: {
    label: 'Alcance' | 'Likes' | 'Comentarios' | 'Guardados';
    value: string;
  };
  secondaryStats: {
    likes: number;
    comments: number;
  };
}

export const mockTopPosts = [
  {
    id: 1,
    imageUrl: "https://picsum.photos/500/500?random=26",
    mainStat: { label: 'Alcance', value: '35.1k' },
    secondaryStats: { likes: 3200, comments: 210 },
  },
  {
    id: 2,
    imageUrl: "https://picsum.photos/500/500?random=27",
    mainStat: { label: 'Guardados', value: '1.8k' },
    secondaryStats: { likes: 2100, comments: 150 },
  },
  {
    id: 3,
    imageUrl: "https://picsum.photos/500/500?random=28",
    mainStat: { label: 'Likes', value: '4.5k' },
    secondaryStats: { likes: 4500, comments: 330 },
  },
  {
    id: 4,
    imageUrl: "https://picsum.photos/500/500?random=29",
    mainStat: { label: 'Comentarios', value: '450' },
    secondaryStats: { likes: 2800, comments: 450 },
  },
  {
    id: 5,
    imageUrl: "https://picsum.photos/500/500?random=30",
    mainStat: { label: 'Guardados', value: '2.2k' },
    secondaryStats: { likes: 1900, comments: 180 },
  },
  {
    id: 6,
    imageUrl: "https://picsum.photos/500/500?random=31",
    mainStat: { label: 'Alcance', value: '42.8k' },
    secondaryStats: { likes: 3800, comments: 310 },
  },
]; 