'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'none';
  changeDescription?: string;
  link?: {
    href: string;
    label: string;
  };
}

/**
 * A generic card component for displaying a single statistic.
 * It can show a title, a main value, an icon, and an optional trend indicator with a description.
 */
export function StatCard({ 
  title, 
  value, 
  icon,
  change,
  changeType = 'none',
  changeDescription = 'vs. período anterior',
  link
}: StatCardProps) {
  const isIncrease = changeType === 'increase';

  const changeColor = changeType === 'increase' ? 'text-green-500' : 'text-red-500';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && changeType !== 'none' && (
          <p className={cn("text-xs text-muted-foreground", changeColor)}>
            {change} {changeDescription}
          </p>
        )}
        {link && (
            <Link href={link.href} className='text-xs text-blue-500 hover:underline mt-2 block'>
                {link.label}
            </Link>
        )}
      </CardContent>
    </Card>
  );
} 