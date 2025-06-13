import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Eye, Heart, MessageCircle } from "lucide-react";

interface TopPostCardProps {
  post: {
    imageUrl: string;
    mainStat: {
      label: 'Alcance' | 'Likes' | 'Comentarios';
      value: string;
    };
    secondaryStats: {
      likes: number;
      comments: number;
    };
  };
}

const ICONS = {
  Alcance: <Eye className="h-4 w-4" />,
  Likes: <Heart className="h-4 w-4" />,
  Comentarios: <MessageCircle className="h-4 w-4" />,
}

export function TopPostCard({ post }: TopPostCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-square">
        <Image src={post.imageUrl} alt="Top Post" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <div className="flex items-center gap-2">
            {ICONS[post.mainStat.label]}
            <p className="text-xl font-bold">{post.mainStat.value}</p>
          </div>
          <p className="text-sm">{post.mainStat.label}</p>
        </div>
      </div>
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-around text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            <span>{post.secondaryStats.likes.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            <span>{post.secondaryStats.comments.toLocaleString()}</span>
          </div>
        </div>
        <Button variant="secondary" className="w-full">Reutilizar Post</Button>
      </CardContent>
    </Card>
  );
} 