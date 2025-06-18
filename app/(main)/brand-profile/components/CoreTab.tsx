'use client';

import React from 'react';
import { BrandProfile } from '@/lib/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { BlockHeader } from '@/components/shared/BlockHeader';
import { BrandPromiseHero } from './BrandPromiseHero';
import { GoldenCircle } from './GoldenCircle';
import { HeroJourney } from './HeroJourney';
import { KairosVerdictCard } from './KairosVerdictCard';
import { Rituals } from './Rituals';
import { Target, Users, Rss, Milestone, HeartHandshake } from 'lucide-react';

interface CoreTabProps {
    data: BrandProfile['core'];
}

export function CoreTab({ data }: CoreTabProps) {
    if (!data) return null; // Return early if no core data

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <BlockHeader 
                        icon={HeartHandshake} 
                        title="Nuestra Promesa"
                        description="La declaración central que define el valor y el compromiso que ofrecemos a cada clienta."
                    />
                </CardHeader>
                <CardContent className="p-6 text-center">
                    <BrandPromiseHero 
                        main={data.promise?.main ?? 'Define tu promesa principal'}
                        slogan={data.promise?.slogan ?? 'y el eslogan que la acompaña.'}
                    />
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <BlockHeader 
                            icon={Users} 
                            title="Arquetipo y Tono"
                            description="La personalidad de tu marca y cómo se comunica con el mundo."
                        />
                    </CardHeader>
                    <CardContent className="p-6">
                        <KairosVerdictCard 
                            archetype={data.archetype?.name ?? 'Arquetipo'}
                            tone={data.archetype?.tone ?? 'Tono'}
                            keywords={data.archetype?.keywords ?? []}
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <BlockHeader 
                            icon={Milestone} 
                            title="El Viaje del Héroe"
                            description="La estructura narrativa que conecta emocionalmente con tu audiencia."
                        />
                    </CardHeader>
                    <CardContent className="p-6">
                        <HeroJourney journey={data.heroJourney} />
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <BlockHeader 
                        icon={Target} 
                        title="El Círculo Dorado"
                        description="El propósito fundamental que impulsa cada acción de tu marca."
                    />
                </CardHeader>
                <CardContent className="p-6">
                    <GoldenCircle goldenCircle={data.goldenCircle} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <BlockHeader 
                        icon={Rss} 
                        title="Pilares de Contenido"
                        description="Los temas centrales sobre los que construimos nuestra comunicación y contenido."
                    />
                </CardHeader>
                <CardContent className="p-6">
                    <Rituals data={data.contentPillars} />
                </CardContent>
            </Card>
        </div>
    );
} 