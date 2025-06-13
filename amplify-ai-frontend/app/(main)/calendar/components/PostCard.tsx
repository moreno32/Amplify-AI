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
  isCompact?: boolean;
}

const statusColors = {
  published: 'border-green-500',
  draft: 'border-yellow-500',
  idea: 'border-red-400',
  scheduled: 'border-blue-500',
};

const statusBadgeColors = {
    published: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    idea: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    scheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  };

export function PostCard({ post, onClick, isCompact = false }: PostCardProps) {
  if (isCompact) {
    return (
      <Card
        onClick={onClick}
        className={cn(
          'cursor-pointer group relative overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full',
          statusColors[post.status] || 'border-gray-300',
          'border-l-4'
        )}
      >
        <CardContent className="p-1.5 flex items-center gap-2 h-full">
          {post.imageUrl && (
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src={post.imageUrl}
                alt="Post image"
                fill
                className="object-cover rounded-sm"
              />
            </div>
          )}
          <div className='flex-grow overflow-hidden'>
            <p className="text-xs leading-snug line-clamp-2">{post.content}</p>
            <div className="flex justify-between items-center mt-1">
              <Badge className={cn("text-[10px] px-1 py-0", statusBadgeColors[post.status])}>{post.status}</Badge>
              <span className="text-xs text-muted-foreground">{post.time}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

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
            <Badge className={cn(statusBadgeColors[post.status])}>{post.status}</Badge>
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