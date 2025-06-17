'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Post } from '@/lib/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface UpcomingPostsProps {
  posts: Post[];
}

export default function UpcomingPosts({ posts }: UpcomingPostsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">En la Rampa de Lanzamiento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="flex items-center gap-4 group">
              {post.image && (
                <div className="relative h-16 w-16 flex-shrink-0">
                  <Image
                    src={post.image}
                    alt={post.content}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
              )}
              <div className="flex-grow">
                <p className="text-sm line-clamp-2">{post.content}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(post.startTime).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })} a las {new Date(post.startTime).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <Button asChild variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                <Link href="/calendar">Editar</Link>
              </Button>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            No hay posts en la rampa de lanzamiento.
          </p>
        )}
      </CardContent>
    </Card>
  );
} 