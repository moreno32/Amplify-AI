'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

interface StrategyCompetitorCardProps {
    name: string;
    logoUrl: string;
    postImageUrl: string;
}

export const StrategyCompetitorCard = ({ name, logoUrl, postImageUrl }: StrategyCompetitorCardProps) => (
    <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center gap-2 p-3">
            <Avatar className="h-6 w-6">
                <AvatarImage src={logoUrl} alt={name} />
                <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-sm">{name}</h3>
        </CardHeader>
        <CardContent className="p-0">
            <div className="relative aspect-[4/3] w-full">
                <Image src={postImageUrl} alt={`Post de ${name}`} fill className="object-cover" />
            </div>
        </CardContent>
    </Card>
); 