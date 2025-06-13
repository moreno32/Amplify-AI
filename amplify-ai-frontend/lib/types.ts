export type PostStatus = 'draft' | 'scheduled' | 'published' | 'idea';

export interface Post {
  id: string;
  dayOfWeek: string;
  date: string;
  time: string;
  content: string;
  status: PostStatus;
  platform: 'instagram' | 'facebook';
  imageUrl?: string;
  isOptimal?: boolean;
  aiSuggestion?: string;
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

export interface BrandAsset {
  id: string;
  url: string;
  alt: string;
}

export interface BrandProfile {
  name: string;
  core: {
    promise: { id: string; title: string; content: string };
    narrativeArchetypes: { id: string; title: string; content: string };
    mission: { id: string; title: string; content: string };
    vision: { id: string; title: string; content: string };
    contentPillars: { 
      id: string; 
      title: string; 
      pillars: { name: string; icon: string; description: string }[]; 
    };
    aiCoachVerdict: { id: string; title: string; content: string; };
  };
  voice: {
    tonePrinciples: { id: string; principle: string; description: string }[];
    vocabulary: {
      do: string[];
      dont: string[];
    };
    tonalSpectrum: { 
      id: string; 
      title: string; 
      spectrum: { tone: string; percentage: number; color: string }[]; 
    };
  };
  visual: {
    colorPalette: {
      color: string;
      name: string;
      role: string;
      iaKeywords: string[];
    }[];
    typography: {
      primary: { name: string; weight: string; role: string; provider: string };
      secondary: { name: string; weight: string; role: string; provider: string };
    };
  };
  assets: {
    logos: { id: string; url: string; name: string }[];
    brandPhotos: { id: string; url: string; alt: string }[];
  };
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