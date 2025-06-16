'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { competitors, userMetrics } from '@/lib/mock-data/competitors';
import { Competitor } from '@/lib/types';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';

const formatNumber = (num: number) => {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

const MetricComparison = ({ label, userValue, competitorValue }: { label: string, userValue: number, competitorValue: number }) => {
    const isBetter = userValue > competitorValue;
    const valueClass = isBetter ? 'text-green-500' : 'text-red-500';

    return (
        <div className="flex justify-between items-baseline text-sm">
            <span className="text-muted-foreground">{label}:</span>
            <span className="font-semibold">
                {competitorValue}{label.includes('%') ? '%' : ''} (vs. <strong className={cn("font-bold", valueClass)}>{userValue}{label.includes('%') ? '%' : ''}</strong>)
            </span>
        </div>
    );
};


const CompetitorCard = ({ competitor }: { competitor: Competitor }) => (
    <Card className="min-w-[300px] max-w-[320px] flex-shrink-0">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-2">
                <Avatar>
                    <AvatarImage src={competitor.logo} alt={competitor.name} />
                    <AvatarFallback>{competitor.name.substring(1, 3)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg font-semibold">{competitor.name}</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
            <div className="relative aspect-square w-full my-4">
                <Image src={competitor.recentPostImage} alt={`Post de ${competitor.name}`} fill className="rounded-md object-cover" />
            </div>
            <div className="space-y-2">
                <MetricComparison label="Seguidores" userValue={userMetrics.followers} competitorValue={competitor.metrics.followers} />
                <MetricComparison label="Tasa de Engagement" userValue={userMetrics.engagementRate} competitorValue={competitor.metrics.engagementRate} />
                <MetricComparison label="Frecuencia (posts/sem)" userValue={userMetrics.postFrequency} competitorValue={competitor.metrics.postFrequency} />
            </div>
        </CardContent>
    </Card>
);

const UserCard = () => (
     <Card className="min-w-[300px] max-w-[320px] flex-shrink-0 bg-primary/5 border-primary/20">
        <CardHeader className="pb-2">
             <CardTitle className="text-lg font-semibold">Tu Rendimiento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
            <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Seguidores:</span> <span className="font-bold">{formatNumber(userMetrics.followers)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Tasa de Engagement:</span> <span className="font-bold">{userMetrics.engagementRate}%</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Frecuencia de Posteo:</span> <span className="font-bold">{userMetrics.postFrequency} posts/sem.</span></div>
            </div>
             <p className="text-xs text-muted-foreground pt-4">Estos son tus resultados para el período seleccionado. Usa esta tarjeta como base para comparar con tus competidores.</p>
        </CardContent>
    </Card>
)


export const AnalisisCompetitivoTab = () => {
    return (
        <div className="space-y-6">
            <div className="flex overflow-x-auto space-x-4 pb-4">
                <UserCard />
                {competitors.map(c => <CompetitorCard key={c.id} competitor={c} />)}
            </div>
            
            <Card className="bg-amber-100/40 border-amber-200/60 dark:bg-amber-950/20 dark:border-amber-900/40">
                <CardHeader className="flex flex-row items-start gap-4">
                    <div className="bg-amber-200/60 dark:bg-amber-950/40 p-2 rounded-full">
                        <Lightbulb className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="flex-1">
                        <CardTitle className="text-amber-900 dark:text-amber-200">Análisis Competitivo del Coach</CardTitle>
                        <p className="text-sm text-amber-800/80 dark:text-amber-400/80 mt-1">
                            Estás superando a casi todos tus competidores en <strong>Tasa de Engagement</strong>, ¡excelente trabajo! Sin embargo, <strong>@GymPeak</strong> está creciendo más rápido en seguidores porque publica Reels a diario.
                        </p>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <p className="text-sm flex-1">
                           <strong>Recomendación:</strong> ¿Probamos a generar un Reel para tu post con más 'Me Gusta' de esta semana para capitalizar en tu gran engagement y potenciar el alcance?
                        </p>
                        <Button variant='default' className="bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 dark:text-white flex-shrink-0">
                            Convertir Top Post en Reel
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}