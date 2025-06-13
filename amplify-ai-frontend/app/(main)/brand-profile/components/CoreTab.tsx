'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrandProfile } from '@/lib/types';
import { Sparkles, BookOpen, Users, Heart, Bot } from 'lucide-react';
import React from 'react';

// Icon mapping to render components dynamically
const iconMap: { [key: string]: React.ElementType } = {
  Sparkles,
  BookOpen,
  Users,
  Heart,
};

interface CoreTabProps {
  data: BrandProfile['core'];
}

const InfoCard = ({ title, content, id }: { title: string; content: string; id: string }) => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <p className="text-xs text-muted-foreground pt-1">{id}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{content}</p>
      </CardContent>
    </Card>
  );

const PillarCard = ({ title, pillars, id }: { title: string; id: string; pillars: BrandProfile['core']['contentPillars']['pillars'] }) => (
    <Card className="md:col-span-2">
        <CardHeader>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <p className="text-xs text-muted-foreground pt-1">{id}</p>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pillars.map(pillar => {
                const Icon = iconMap[pillar.icon];
                return (
                    <div key={pillar.name} className="flex flex-col items-center text-center">
                        <div className='flex items-center justify-center h-12 w-12 rounded-lg bg-muted mb-2'>
                            {Icon && <Icon className="h-6 w-6 text-muted-foreground" />}
                        </div>
                        <h4 className="font-semibold text-sm">{pillar.name}</h4>
                        <p className="text-xs text-muted-foreground">{pillar.description}</p>
                    </div>
                )
            })}
        </CardContent>
    </Card>
)

const CoachCard = ({ title, content, id }: { title: string; content: string; id: string }) => (
    <Card className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
        <CardHeader className='flex flex-row items-start gap-3'>
            <div className='flex items-center justify-center h-10 w-10 rounded-full bg-green-100 dark:bg-green-900'>
             <Bot className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
                <CardTitle className="text-lg font-semibold text-green-800 dark:text-green-300">{title}</CardTitle>
                <p className="text-xs text-muted-foreground pt-1">{id}</p>
            </div>
        </CardHeader>
      <CardContent>
        <p className="text-sm text-green-700 dark:text-green-300/90">{content}</p>
      </CardContent>
    </Card>
)

export default function CoreTab({ data }: CoreTabProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
       <InfoCard title={data.promise.title} content={data.promise.content} id={data.promise.id} />
       <InfoCard title={data.narrativeArchetypes.title} content={data.narrativeArchetypes.content} id={data.narrativeArchetypes.id} />
       <PillarCard title={data.contentPillars.title} pillars={data.contentPillars.pillars} id={data.contentPillars.id} />
       <div className="md:col-span-2 grid grid-cols-1 gap-4">
        <CoachCard title={data.aiCoachVerdict.title} content={data.aiCoachVerdict.content} id={data.aiCoachVerdict.id} />
       </div>
    </div>
  );
} 