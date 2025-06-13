import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Post, PostStatus } from '@/lib/types';
import { Lightbulb, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';

const statusStyles: { [key in PostStatus]: string } = {
  draft: 'border-yellow-500 bg-yellow-50',
  scheduled: 'border-blue-500 bg-blue-50',
  published: 'border-green-500 bg-green-50',
  idea: 'border-dashed border-gray-400 bg-gray-50',
};

const badgeVariants = {
    draft: 'default',
    scheduled: 'secondary',
    published: 'outline',
    idea: 'destructive',
} as const;

export function PostCard({
  post,
  onClick,
}: {
  post: Post;
  onClick: (post: Post) => void;
}) {
  return (
    <TooltipProvider delayDuration={200}>
      <Card
        className={`group relative mb-2 cursor-pointer transition-all hover:shadow-md ${
          statusStyles[post.status]
        }`}
      >
        <div 
            className="absolute top-1 right-1 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => e.stopPropagation()}
        >
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => onClick(post)}>
                <Pencil className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-7 w-7 hover:bg-destructive/80 hover:text-destructive-foreground">
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>

        <div onClick={() => onClick(post)}>
            {post.imageUrl && (
                <CardHeader className="p-0">
                    <Image
                    src={post.imageUrl}
                    alt="Post image"
                    width={400}
                    height={400}
                    className="rounded-t-lg object-cover w-full h-24"
                    />
                </CardHeader>
            )}
            <CardContent className="p-3">
                <p className="text-sm line-clamp-2">{post.content}</p>
            </CardContent>
            <CardFooter className="p-3 pt-0 flex justify-between items-center">
                <Badge variant={badgeVariants[post.status]}>{post.status}</Badge>
                <div className="flex items-center gap-2">
                {post.isOptimal && (
                    <Tooltip>
                    <TooltipTrigger>
                        <Lightbulb className="h-4 w-4 text-yellow-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Publicado en horario óptimo para maximizar engagement.</p>
                    </TooltipContent>
                    </Tooltip>
                )}
                <span className="text-xs text-muted-foreground">
                    {post.time}
                </span>
                </div>
            </CardFooter>
        </div>
      </Card>
    </TooltipProvider>
  );
} 