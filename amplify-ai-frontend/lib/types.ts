export type PostStatus = 'draft' | 'scheduled' | 'published' | 'idea';

export interface Post {
  id: string;
  date: string;
  time: string;
  content: string;
  status: PostStatus;
  platform: 'instagram' | 'facebook';
  imageUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  onboardingCompleted: boolean;
}

export interface Competitor {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  followers: number;
  engagementRate: number;
  recentPostImageUrl: string;
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