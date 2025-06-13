'use client';

import {
  ChevronLeft,
  ChevronRight,
  List,
  PlusCircle,
  View,
  Workflow,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { mockPosts } from '@/lib/mock-data';
import { Post } from '@/lib/types';
import { CreateCampaignModal } from '@/components/modals/CreateCampaignModal';
import React from 'react';
import { PostEditorModal } from '@/components/modals/PostEditorModal';
import { PostCard } from './components/PostCard';

const daysOfWeek = [
    { name: 'Lunes', date: '2024-10-21' },
    { name: 'Martes', date: '2024-10-22' },
    { name: 'Miércoles', date: '2024-10-23' },
    { name: 'Jueves', date: '2024-10-24' },
    { name: 'Viernes', date: '2024-10-25' },
    { name: 'Sábado', date: '2024-10-26' },
    { name: 'Domingo', date: '2024-10-27' },
];

export default function CalendarPage() {
  const [isCampaignModalOpen, setCampaignModalOpen] = React.useState(false);
  const [isEditorModalOpen, setEditorModalOpen] = React.useState(false);
  const [selectedPost, setSelectedPost] = React.useState<Post | null>(null);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setEditorModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full">
      <CreateCampaignModal
        isOpen={isCampaignModalOpen}
        onOpenChange={setCampaignModalOpen}
      />
      {selectedPost && (
        <PostEditorModal
          isOpen={isEditorModalOpen}
          onOpenChange={setEditorModalOpen}
          post={selectedPost}
        />
      )}
      <header className="flex items-center justify-between pb-4">
        <h1 className="text-2xl font-bold">Calendario de Contenido</h1>
        <div className="flex items-center gap-4">
          <ToggleGroup type="single" defaultValue="semanal" variant="outline">
            <ToggleGroupItem value="mensual" aria-label="Vista mensual" disabled>
              <Workflow className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="semanal" aria-label="Vista semanal">
              <View className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="lista" aria-label="Vista de lista" disabled>
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline">Esta Semana</Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={() => setCampaignModalOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Generar Ideas
          </Button>
        </div>
      </header>
      <div className="flex-1 grid grid-cols-7 gap-2">
        {daysOfWeek.map((day) => (
          <div key={day.name} className="bg-muted/40 rounded-lg p-2">
            <h3 className="font-semibold text-center mb-2">{day.name}</h3>
            <div className="h-full">
              {mockPosts
                .filter(
                  (post) => post.date === day.date
                )
                .map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onClick={handlePostClick}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 