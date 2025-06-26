export type PostStatus = 'draft' | 'scheduled' | 'published' | 'idea' | 'awaiting-approval';
export type PostCategory = 'Entrenamiento' | 'Nutrición' | 'Motivación' | 'Promoción' | 'Evento';

export interface Post {
  id: string;
  content: string;
  status: PostStatus;
  category: PostCategory;
  platform: 'instagram' | 'facebook' | 'twitter';
  imageUrl?: string;
  startTime: Date;
  duration: number; // Duration in minutes
  notes?: string;
  metrics?: {
    likes: number;
    comments: number;
    reach: number;
  };
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
  positiveKeywords: string[];
  negativeKeywords: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface Influencer {
  id: string;
  name: string;
  followers: number;
  engagement: string;
  platform: 'instagram' | 'tiktok' | 'youtube';
  avatarUrl: string;
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
  firstName: string;
  lastName: string;
  email: string;
  language: 'es' | 'en';
  role: string;
  dob: string; // ISO 8601 date string
  country: string;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  timezone: string;
  userDescription: string;
  companyName: string;
  companyIndustry: string;
  companyType: string;
  companySize: string;
  companyWebsite: string;
  companyDescription: string;
  targetAudience: string;
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
    persona: { name: string; description: string; archetypes?: string[] };
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
  id: string;
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

export interface MarketInsight {
  id: string;
  title: string;
  // ... resto del archivo
} 