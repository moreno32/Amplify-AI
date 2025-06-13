'use client';

import {
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  List,
  Plus,
  View,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { mockPosts } from '@/lib/mock-data/posts';
import { Post } from '@/lib/types';
import { CreateCampaignModal } from '@/components/modals/CreateCampaignModal';
import React, { useState } from 'react';
import { PostEditorModal } from '@/components/modals/PostEditorModal';
import { PostCard } from './components/PostCard';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const daysOfWeek = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
];

// Simple heatmap data for demonstration
const heatmapHours: { [key: string]: number } = {
    'Lunes': 2,
    'Martes': 5,
    'Miércoles': 8,
    'Jueves': 4,
    'Viernes': 9,
    'Sábado': 7,
    'Domingo': 3,
}

const TimeBlock = ({ title, posts, onPostClick }: { title: string; posts: Post[]; onPostClick: (post: Post) => void; }) => (
  <div className="mb-4">
    <p className="text-xs text-muted-foreground uppercase font-semibold mb-2 pl-2">{title}</p>
    <div className="space-y-2">
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard key={post.id} post={post} onClick={() => onPostClick(post)} />
        ))
      ) : (
        <div className="h-10" /> // Placeholder for empty block
      )}
    </div>
  </div>
);

export default function CalendarPage() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleModalOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedPost(null);
    }
    setIsModalOpen(isOpen);
  };

  const getPostsForDay = (day: string) => {
    const dayPosts = posts.filter((post) => post.dayOfWeek === day);
    const morningPosts = dayPosts.filter(p => parseInt(p.time.split(':')[0]) < 12);
    const afternoonPosts = dayPosts.filter(p => parseInt(p.time.split(':')[0]) >= 12);
    return { morningPosts, afternoonPosts };
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Calendario de Contenido
        </h2>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="heatmap-toggle"
              checked={showHeatmap}
              onCheckedChange={setShowHeatmap}
            />
            <Label htmlFor="heatmap-toggle" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Horas Óptimas
            </Label>
          </div>
          <ToggleGroup type="single" defaultValue="semanal" variant="outline">
            <ToggleGroupItem value="mensual" aria-label="Vista mensual">
              <View className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="semanal" aria-label="Vista semanal">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className='text-sm font-medium'>Esta Semana</span>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Generar Ideas
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 items-start">
        {daysOfWeek.map((day) => {
          const { morningPosts, afternoonPosts } = getPostsForDay(day);
          return (
            <div
              key={day}
              className={cn(
                "rounded-lg p-2 transition-colors duration-300",
                showHeatmap ? `bg-indigo-100/` : 'bg-muted/40',
                showHeatmap && `opacity-${heatmapHours[day]*10}`
              )}
              style={{ 
                backgroundColor: showHeatmap ? `rgba(99, 102, 241, ${heatmapHours[day] / 15})` : undefined
              }}
            >
              <h3 className="text-sm font-semibold text-center mb-4">{day}</h3>
              <div>
                <TimeBlock title="Mañana" posts={morningPosts} onPostClick={handlePostClick} />
                <TimeBlock title="Tarde" posts={afternoonPosts} onPostClick={handlePostClick} />
              </div>
            </div>
          );
        })}
      </div>
      <PostEditorModal
        isOpen={isModalOpen}
        onOpenChange={handleModalOpenChange}
        post={selectedPost}
      />
    </div>
  );
} 