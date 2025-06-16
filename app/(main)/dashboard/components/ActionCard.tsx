'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { AiAction } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Rocket, CheckCircle } from 'lucide-react';
import React from 'react';

// Icon mapping
const iconMap: { [key: string]: React.ElementType } = {
  Rocket,
  CheckCircle,
};

interface ActionCardProps {
    action: AiAction;
}

export default function ActionCard({ action }: ActionCardProps) {
  const Icon = iconMap[action.icon];
  return (
    <Card className="flex flex-col">
        <CardHeader className="flex-row gap-4 items-center">
            {Icon && <Icon className="h-8 w-8 text-blue-500" />}
            <CardTitle>{action.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
            <CardDescription>{action.description}</CardDescription>
        </CardContent>
        <CardFooter>
            <Button className="w-full">{action.buttonLabel}</Button>
        </CardFooter>
    </Card>
  );
} 