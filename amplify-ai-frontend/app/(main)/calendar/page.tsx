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
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const daysOfWeek = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
];

const getWeekDate = (dayIndex: number): string => {
    const today = new Date();
    const currentDay = today.getDay();
    const distance = dayIndex + 1 - currentDay; // +1 because getDay() is 0-indexed on Sunday
    const date = new Date(today.setDate(today.getDate() + distance));
    return new Intl.DateTimeFormat('es-ES', { month: 'short', day: 'numeric' }).format(date);
}

// Simple heatmap data for demonstration
const heatmapHours: { [key: string]: number } = {
    'Lunes': 7,
    'Martes': 9,
    'Miércoles': 10,
    'Jueves': 8,
    'Viernes': 6,
    'Sábado': 3,
    'Domingo': 2,
}

const TimeBlock = ({ title, posts, onPostClick }: { title: string; posts: Post[]; onPostClick: (post: Post) => void; }) => (
    <div className="mb-6">
      <p className="text-sm text-muted-foreground font-semibold mb-3 pl-2">{title}</p>
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
    const afternoonPosts = dayPosts.filter(p => {
        const hour = parseInt(p.time.split(':')[0]);
        return hour >= 12 && hour < 20;
    });
    const nightPosts = dayPosts.filter(p => parseInt(p.time.split(':')[0]) >= 20);
    return { morningPosts, afternoonPosts, nightPosts };
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

      <div className="grid grid-cols-7 gap-4">
        {daysOfWeek.map((day, index) => {
          const { morningPosts, afternoonPosts, nightPosts } = getPostsForDay(day);
          const date = getWeekDate(index);
          return (
            <div
              key={day}
              className={cn(
                "rounded-lg p-2 transition-colors duration-300 h-full flex flex-col",
                showHeatmap ? `bg-indigo-100/` : 'bg-muted/40'
              )}
              style={{ 
                backgroundColor: showHeatmap ? `rgba(99, 102, 241, ${heatmapHours[day] / 20})` : undefined
              }}
            >
              <div className='text-center mb-4'>
                <h3 className="text-sm font-semibold">{day}</h3>
                <p className='text-xs text-muted-foreground'>{date}</p>
              </div>
              <div className='flex-grow'>
                <TimeBlock title="Mañana" posts={morningPosts} onPostClick={handlePostClick} />
                <TimeBlock title="Tarde" posts={afternoonPosts} onPostClick={handlePostClick} />
                <TimeBlock title="Noche" posts={nightPosts} onPostClick={handlePostClick} />
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