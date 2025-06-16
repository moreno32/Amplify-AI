'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PerformanceMetric } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Link from 'next/link';

interface PerformanceCardProps {
  metric: PerformanceMetric;
}

const TrendIcon = ({ type }: { type: 'increase' | 'decrease' }) => {
  const isIncrease = type === 'increase';
  return isIncrease ? (
    <ArrowUpRight className="h-4 w-4 text-green-500" />
  ) : (
    <ArrowDownRight className="h-4 w-4 text-red-500" />
  );
};

export default function PerformanceCard({ metric }: PerformanceCardProps) {
  const isIncrease = metric.changeType === 'increase';
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
        {/* Placeholder for a sparkline chart icon */}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metric.value}</div>
        <div className="text-xs text-muted-foreground flex items-center">
            <TrendIcon type={metric.changeType} />
            <span className={cn("ml-1", isIncrease ? "text-green-500" : "text-red-500")}>
                {metric.change}%
            </span>
            <span className='ml-1'>vs. semana pasada</span>
        </div>
        {metric.link && (
            <Link href={metric.link.href} className='text-xs text-blue-500 hover:underline mt-2 block'>
                {metric.link.label}
            </Link>
        )}
      </CardContent>
    </Card>
  );
} 