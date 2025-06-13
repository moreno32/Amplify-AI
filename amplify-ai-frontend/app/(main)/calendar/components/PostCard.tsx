import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Post, PostStatus } from '@/lib/types';
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
}

export function PostCard({
  post,
  onClick,
}: {
  post: Post;
  onClick: (post: Post) => void;
}) {
  return (
    <Card
      onClick={() => onClick(post)}
      className={`mb-2 cursor-pointer transition-all hover:shadow-md ${
        statusStyles[post.status]
      }`}
    >
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
        <Badge variant={badgeVariants[post.status] as any}>{post.status}</Badge>
        <span className="text-xs text-muted-foreground">
          {post.time}
        </span>
      </CardFooter>
    </Card>
  );
} 