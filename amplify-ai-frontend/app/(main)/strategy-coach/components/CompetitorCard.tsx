import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Competitor } from '@/lib/types';
import Image from 'next/image';

interface CompetitorCardProps {
  competitor: Competitor;
}

export function CompetitorCard({ competitor }: CompetitorCardProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={competitor.avatarUrl} />
          <AvatarFallback>{competitor.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{competitor.name}</CardTitle>
          <CardDescription>{competitor.username}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-square w-full">
          <Image
            src={competitor.recentPostImageUrl}
            alt={`Post de ${competitor.name}`}
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="flex justify-around text-sm text-muted-foreground mt-4">
            <div><span className="font-bold text-foreground">{(competitor.followers/1000).toFixed(1)}k</span> Seguidores</div>
            <div><span className="font-bold text-foreground">{competitor.engagementRate}%</span> Engagement</div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" className="w-full">
          Analizar Perfil
        </Button>
      </CardFooter>
    </Card>
  );
} 