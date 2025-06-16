'use client';

import { Post, PostStatus, PostCategory } from '@/lib/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

export interface PostCardProps {
    post: Post;
    onClick: (post: Post) => void;
}

const borderColors: { [key in PostStatus]: string } = {
    published: "border-green-500",
    scheduled: "border-blue-500",
    draft: "border-yellow-500",
    idea: "border-purple-500",
    "awaiting-approval": "border-orange-500",
};

const dotColors: { [key in PostStatus]: string } = {
    published: "bg-green-500",
    scheduled: "bg-blue-500",
    draft: "bg-yellow-500",
    idea: "bg-purple-500",
    "awaiting-approval": "bg-orange-500",
};

// A simple hash function to get a color for the category
const categoryColors: { [key: string]: string } = {
    'Entrenamiento': 'bg-blue-100 text-blue-800',
    'Nutrición': 'bg-green-100 text-green-800',
    'Motivación': 'bg-purple-100 text-purple-800',
    'Promoción': 'bg-red-100 text-red-800',
    'Evento': 'bg-indigo-100 text-indigo-800',
};

export const PostCard = ({ post, onClick }: PostCardProps) => {
    const statusText = post.status.charAt(0).toUpperCase() + post.status.slice(1).replace('-', ' ');

    return (
        <div
            onClick={() => onClick(post)}
            className={cn(
                'cursor-pointer group relative h-full flex flex-col',
                'bg-background shadow-sm hover:shadow-md transition-all rounded-lg border-l-4',
                borderColors[post.status]
            )}
        >
            {post.image && (
                <div className="relative h-24 w-full">
                    <Image src={post.image} alt={post.content} layout="fill" className="object-cover rounded-t-md" />
                </div>
            )}
            <div className="p-3 flex flex-col flex-grow">
                 <p className="text-sm font-medium mb-2 flex-grow">{post.content}</p>

                <div className="flex items-center text-xs text-muted-foreground mt-auto pt-2">
                    <div className={cn("w-2 h-2 rounded-full mr-2", dotColors[post.status])} />
                    <span className="font-medium mr-2">{statusText}</span>
                    <Badge variant="outline" className={cn("mr-2", categoryColors[post.category] || 'bg-gray-100 text-gray-800')}>
                        {post.category}
                    </Badge>
                    <span className="ml-auto">{format(post.startTime, 'HH:mm')}</span>
                </div>
            </div>
        </div>
    );
} 