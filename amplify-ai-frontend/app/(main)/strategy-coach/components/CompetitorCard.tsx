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
          <AvatarImage src={competitor.logoUrl} />
          <AvatarFallback>{competitor.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-base">{competitor.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <img src={competitor.postImageUrl} alt={`Post de ${competitor.name}`} className="rounded-md object-cover w-full h-48" />
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Estadísticas Clave:</h4>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            {competitor.stats.map((stat) => (
              <li key={stat.label}>
                {stat.label}: <span className="font-medium text-foreground">{stat.value}</span>
              </li>
            ))}
          </ul>
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