'use client';

import { Post } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Lightbulb, Pencil, RefreshCcw, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

const statusColors = {
  published: 'border-green-500',
  draft: 'border-yellow-500',
  idea: 'border-red-400',
  scheduled: 'border-blue-500',
};

export function PostCard({ post, onClick }: PostCardProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <Card
        onClick={onClick}
        className={cn(
          'cursor-pointer group relative overflow-hidden shadow-sm hover:shadow-md transition-shadow',
          statusColors[post.status] || 'border-gray-300',
          'border-l-4'
        )}
      >
        <CardContent className="p-3">
          {post.imageUrl && (
            <div className="relative aspect-video mb-2">
              <Image
                src={post.imageUrl}
                alt="Post image"
                fill
                className="object-cover rounded-md"
              />
            </div>
          )}
          <p className="text-sm leading-snug line-clamp-2">{post.content}</p>
          <div className="flex justify-between items-center mt-2">
            <Badge variant="secondary">{post.status}</Badge>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {post.isOptimal && (
                <Tooltip>
                  <TooltipTrigger>
                    <Lightbulb className="h-4 w-4 text-yellow-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{post.aiSuggestion}</p>
                  </TooltipContent>
                </Tooltip>
              )}
              <span>{post.time}</span>
            </div>
          </div>
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Button size="icon" variant="secondary" onClick={(e: React.MouseEvent) => { e.stopPropagation(); onClick(); }}>
                <Pencil className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary">
                <RefreshCcw className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="destructive">
                <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
} 