import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface CompetitorStat {
  label: string;
  value: string;
  userValue: string;
  isBetter: boolean;
}

interface CompetitorCardProps {
  name: string;
  logoUrl: string;
  postImageUrl: string;
  stats: CompetitorStat[];
  isUser?: boolean;
}

function Stat({ label, value, userValue, isBetter, isUser }: Omit<CompetitorStat, 'isBetter'> & { isUser?: boolean; isBetter?: boolean; }) {
  if (isUser) {
    return (
      <li className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{value}</span>
      </li>
    )
  }
  return (
    <li className="flex justify-between items-center text-sm">
      <span className="text-muted-foreground">{label}</span>
      <div className="text-right">
        <span className="font-semibold">{value}</span>
        <span className={cn("text-xs ml-1", isBetter ? "text-green-500" : "text-red-500")}>
          (vs. {userValue})
        </span>
      </div>
    </li>
  )
}

export function CompetitorCard({ name, logoUrl, postImageUrl, stats, isUser = false }: CompetitorCardProps) {
  return (
    <Card className="w-[300px] flex-shrink-0">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <Avatar>
          <AvatarImage src={logoUrl} alt={name} />
          <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-square relative w-full overflow-hidden rounded-md">
          <Image src={postImageUrl} alt={`Post de ${name}`} fill className="object-cover" />
        </div>
        <ul className="space-y-2">
          {stats.map((stat) => (
            <Stat key={stat.label} {...stat} isUser={isUser} />
          ))}
        </ul>
      </CardContent>
    </Card>
  )
} 