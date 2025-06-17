export type PostStatus = 'draft' | 'scheduled' | 'published' | 'idea' | 'awaiting-approval';
export type PostCategory = 'Entrenamiento' | 'Nutrición' | 'Motivación' | 'Promoción' | 'Evento';

export interface Post {
  id: string;
  content: string;
  status: PostStatus;
  category: PostCategory;
  platform: 'instagram' | 'facebook' | 'twitter';
  image?: string;
  startTime: Date;
  duration: number; // Duration in minutes
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  onboardingCompleted: boolean;
}

export interface CompetitorStat {
  label: string;
  value: string;
  isBetter: boolean;
}

export interface Competitor {
  id: string;
  name: string;
  logoUrl: string;
  postImageUrl: string;
  stats: CompetitorStat[];
}

export interface Influencer {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  followers: number;
  engagementRate: number;
  affinityScore: number;
  tags: string[];
}

export type ConversationStatus = 'open' | 'resolved' | 'unassigned';

export interface Message {
  id: string;
  sender: 'user' | 'contact';
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  contactName: string;
  contactAvatarUrl: string;
  lastMessage: string;
  timestamp: string;
  status: ConversationStatus;
  channel: 'instagram' | 'facebook' | 'whatsapp';
  messages: Message[];
}

export type BrandAssetCategory = 'Producto' | 'Servicio' | 'Equipo' | 'Estilo' | 'Logo';

export interface BrandAsset {
  id: string;
  url: string;
  alt: string;
  category: BrandAssetCategory;
}

export interface BrandProfile {
  id: string;
  name: string;
  core: {
    id: string;
    promise: {
      id: string;
      main: string;
      slogan: string;
    };
    goldenCircle: {
      why: { title: string; content: string; };
      how: { title: string; content: string; };
      what: { title: string; content: string; };
    };
    purposeFramework: {
      problem: string;
      importance: string;
      villain: string;
      needs: string;
      victory: string;
      superpower: string;
    };
    archetypeMatrix: {
      primary: { name: string; description: string; };
      secondary: { name: "Sabio"; description: "Busca la verdad, el conocimiento y la sabiduría para entender el mundo."; };
      tertiary: { name: string; description: string; };
      all: { name: string; description: string; }[];
    };
    narrativeArchetypes: {
      id: string;
      title: string;
      content: string;
      scores: { subject: string; value: number; fullMark: number }[];
    };
    heroJourney: {
      step: number;
      title: string;
      description: string;
    }[];
    aiCoachVerdict: { id: string; title: string; content: string };
    mission: { id: string; title: string; content: string };
    vision: { id: string; title: string; content: string };
    contentPillars: { 
      id: string;
      pillars: { name: string; description: string; }[];
    };
  };
  voice: {
    persona: { name: string; description: string };
    tone: string[];
    vocabulary: string[];
    grammar: string;
  };
  visual: {
    colorPalette: {
      name: string;
      role: string;
      color: string;
      keywords: string;
    }[];
    typography: {
      primary: { family: string; weight: string; use: string; provider: string; };
      secondary: { family: string; weight: string; use: string; provider: string; };
    };
    logo: string;
    imageryStyle: string;
  };
  assets: {
    logos: { name: string; url: string; type: string; }[];
    photos: { name:string; url: string; type: string; }[];
    videos: { name:string; url: string; type: string; }[];
  }
}

export interface PerformanceMetric {
  id: string;
  title: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease';
  link?: {
    href: string;
    label: string;
  };
}

export interface AiAction {
  id: string;
  icon: string;
  title: string;
  description: string;
  buttonLabel: string;
}

export interface AiInsight {
  id: string;
  insight: string;
  action?: {
    href: string;
    label: string;
  };
}

export interface DashboardData {
    performanceMetrics: PerformanceMetric[];
    recommendedActions: AiAction[];
    aiCoachInsights: AiInsight[];
    upcomingPosts: Post[];
}

export interface TopPost {
  id: number;
  imageUrl: string;
  mainStat: {
    label: "Alcance" | "Likes" | "Comentarios";
    value: string;
  };
  secondaryStats: {
    likes: number;
    comments: number;
  };
}

export interface CompetitorContentAnalysis {
  id: string;
  name: string;
  performanceData: { month: string; user: number; competitor: number }[];
  postTypes: { name: string; value: number; color: string }[];
  thematicPillars: { theme: string; posts: number }[];
  publishingPattern: { [key: string]: number };
  successfulHashtags: { text: string; value: number }[];
  aiCoachInsight: {
    title: string;
    lesson: string;
    action: string;
    cta: string;
  };
}

// Types for Analytics Section
export interface Kpi {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
}

export interface ChartDataPoint {
  name: string;
  [key: string]: string | number;
}

export interface UserCompetitorMetrics {
  followers: number;
  engagementRate: number;
  postFrequency: number;
}

export interface AnalyticsData {
  performance: {
    kpis: Kpi[];
    chartData: ChartDataPoint[];
  };
  competitors: {
    user: UserCompetitorMetrics;
    list: Competitor[];
  };
  topPosts: TopPost[];
}

export interface StrategyCoachData {
  competitors: Competitor[];
  analysis: Record<string, CompetitorContentAnalysis>;
} 