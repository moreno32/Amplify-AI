'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

type ArchetypeChartProps = {
  data: { subject: string; value: number; fullMark: number }[];
};

export function ArchetypeChart({ data }: ArchetypeChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[250px] text-muted-foreground">
        Datos de arquetipos no disponibles.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <RadarChart data={data}>
        <PolarGrid stroke="hsl(var(--border))" />
        <PolarAngleAxis dataKey="subject" tick={{ fontWeight: '600', fill: 'hsl(var(--foreground))' }} />
        <Radar
          dataKey="value"
          stroke="var(--brand-primary)"
          fill="var(--brand-primary)"
          fillOpacity={0.6}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            borderColor: 'hsl(var(--border))',
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
} 