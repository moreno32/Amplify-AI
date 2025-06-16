'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Heart, Sparkles, Users } from 'lucide-react';

// This allows us to map a string from the data to a component
const iconMap: { [key: string]: React.ElementType } = {
  Sparkles,
  BookOpen,
  Users,
  Heart,
};

interface PillarCardProps {
  icon: string;
  name: string;
  description: string;
}

export const PillarCard = ({ icon, name, description }: PillarCardProps) => {
  const Icon = iconMap[icon];

  return (
    <Card className="p-4 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-muted mb-3">
        {Icon && <Icon className="h-7 w-7 text-muted-foreground" />}
      </div>
      <h3 className="font-bold text-md mb-1">{name}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </Card>
  );
}; 