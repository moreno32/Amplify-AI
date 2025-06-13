import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Influencer } from '@/lib/types';

export function InfluencerCard({ influencer }: { influencer: Influencer }) {
  return (
    <Card className="hover:border-primary transition-all cursor-pointer">
      <CardHeader className="items-center">
        <Avatar className="w-24 h-24 border-4 border-background shadow-md">
          <AvatarImage src={influencer.avatarUrl} alt={influencer.name} />
          <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="text-center">
        <CardTitle>{influencer.name}</CardTitle>
        <CardDescription>{influencer.username}</CardDescription>
        <div className="flex justify-around text-sm text-muted-foreground my-4">
          <div className="text-center">
            <p className="font-bold text-foreground">
              {(influencer.followers / 1000).toFixed(1)}k
            </p>
            <p>Seguidores</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-foreground">
              {influencer.engagementRate}%
            </p>
            <p>Engagement</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-primary">{influencer.affinityScore}%</p>
            <p>Afinidad</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {influencer.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 