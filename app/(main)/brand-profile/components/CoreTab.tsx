'use client';

import React from 'react';
import { BrandProfile } from '@/lib/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { BlockHeader } from '@/components/shared/BlockHeader';
import { BrandPromiseHero } from './BrandPromiseHero';
import { GoldenCircle } from './GoldenCircle';
import { ArchetypeGrid } from './ArchetypeGrid';
import { Rituals } from './Rituals';
import { HeroJourney } from './HeroJourney';
import { KairosVerdictCard } from './KairosVerdictCard';
import { Target, Users, Rss, Milestone, HeartHandshake } from 'lucide-react';

interface CoreTabProps {
    data: BrandProfile['core'];
}

export const CoreTab = ({ data }: CoreTabProps) => {
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
                    <BrandPromiseHero main={data.promise.main} slogan={data.promise.slogan} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <BlockHeader 
                        icon={Target} 
                        title="Filosofía de Marca"
                        description="El corazón de nuestra marca. Define nuestro propósito, nuestras acciones y nuestros resultados."
                    />
                </CardHeader>
                <CardContent className="pt-0">
                    <GoldenCircle data={data.goldenCircle} />
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <BlockHeader 
                        icon={Users} 
                        title="Arquetipos de Personalidad"
                        description="Las personalidades que guían nuestra voz y narrativa para conectar auténticamente."
                    />
                </CardHeader>
                <CardContent className="p-6">
                    <ArchetypeGrid data={data.archetypeMatrix} />
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
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-2 h-full">
                    <KairosVerdictCard content={data.aiCoachVerdict.content} />
                </div>
                <div className="lg:col-span-3 h-full">
                     <Card className="h-full">
                        <CardHeader>
                            <BlockHeader 
                                icon={Milestone} 
                                title="El Viaje de la Heroína"
                                description="Las etapas clave que una clienta experimenta en su relación con nuestra marca."
                            />
                        </CardHeader>
                        <CardContent className="p-6">
                            <HeroJourney data={data.heroJourney} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}; 