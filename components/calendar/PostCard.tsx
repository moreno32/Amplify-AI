'use client';

import { Post, PostStatus, PostCategory } from '@/lib/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Trash2, MessageCircle, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export interface PostCardProps {
    post: Post;
    onClick: (post: Post) => void;
    onDelete: (postId: string) => void;
}

const statusMapping: { [key in PostStatus]: { text: string; dotColor: string; } } = {
    published: { text: "Publicado", dotColor: "bg-green-500" },
    scheduled: { text: "Programado", dotColor: "bg-blue-500" },
    draft: { text: "Borrador", dotColor: "bg-yellow-500" },
    idea: { text: "Idea", dotColor: "bg-purple-500" },
    "awaiting-approval": { text: "Pendiente", dotColor: "bg-orange-500" },
};

const categoryColors: { [key: string]: string } = {
    'Entrenamiento': 'bg-blue-100 text-blue-800',
    'Nutrición': 'bg-green-100 text-green-800',
    'Motivación': 'bg-purple-100 text-purple-800',
    'Promoción': 'bg-pink-100 text-pink-800',
    'Evento': 'bg-indigo-100 text-indigo-800',
};


export const PostCard = ({ post, onClick, onDelete }: PostCardProps) => {

    return (
        <div
            onClick={() => onClick(post)}
            className='cursor-pointer group bg-white shadow-md hover:shadow-lg transition-all rounded-lg p-3 flex flex-col h-full border'
        >
            {/* Card Header */}
            <div className="flex justify-between items-start mb-2">
                <p className="text-sm font-bold text-gray-900">{format(post.startTime, 'p')}</p>
                <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0">
                     {/* Placeholder for user avatar */}
                </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
                <Badge variant="outline" className={cn(categoryColors[post.category] || 'bg-gray-100 text-gray-800', 'px-2 py-0.5 text-xs font-medium')}>
                    {post.category}
                </Badge>
                <Badge variant="secondary" className="px-2 py-0.5 text-xs font-medium">
                     <div className={cn("w-1.5 h-1.5 rounded-full mr-1.5", statusMapping[post.status].dotColor)} />
                    {statusMapping[post.status].text}
                </Badge>
            </div>
            
            {/* Image and Content */}
            <div className="flex-grow flex flex-col min-h-0">
                {post.imageUrl && (
                    <div className="relative aspect-video w-full my-2 rounded-md overflow-hidden flex-shrink-0">
                        <Image src={post.imageUrl} alt={post.content} layout="fill" className="object-cover" />
                    </div>
                )}
                <p className="text-sm text-gray-700 break-words flex-shrink min-h-0 overflow-y-auto">{post.content.split('#')[0]}</p>
            </div>
            
            {/* Footer Actions */}
            <div className="flex justify-between items-center mt-auto border-t pt-2 -mx-3 px-3">
                 <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e: React.MouseEvent) => { e.stopPropagation(); onClick(post);}}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                     <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                        <MessageCircle className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                            <AlertDialogHeader>
                                <AlertDialogTitle>¿Estás realmente seguro?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Esta acción no se puede deshacer. Esto eliminará permanentemente la publicación de nuestros servidores.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={(e: React.MouseEvent) => e.stopPropagation()}>Cancelar</AlertDialogCancel>
                                <AlertDialogAction 
                                    onClick={(e: React.MouseEvent) => {
                                        e.stopPropagation();
                                        onDelete(post.id)
                                    }}
                                    className="bg-red-600 hover:bg-red-700">
                                    Eliminar
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
} 