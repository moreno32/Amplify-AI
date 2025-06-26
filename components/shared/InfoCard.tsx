'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  actionButton?: {
    label: string;
    onClick?: () => void;
  };
  variant?: 'default' | 'primary';
  className?: string;
}

/**
 * A generic card for displaying informational content.
 * It supports a header with an icon and title, a content body, and an optional action button in the footer.
 * It can be styled with different variants.
 */
export function InfoCard({
  icon,
  title,
  children,
  actionButton,
  variant = 'default',
  className,
}: InfoCardProps) {
  const cardClasses = cn(
    'flex flex-col',
    {
      'bg-primary/5 border-primary/20': variant === 'primary',
    },
    className,
  );

  const iconContainerClasses = cn('p-2 rounded-full', {
    'bg-primary/10': variant === 'primary',
  });

  const titleClasses = cn({
    'text-primary': variant === 'primary',
  });

  return (
    <Card className={cardClasses}>
      <CardHeader className="flex-row gap-4 items-center">
        <div className={iconContainerClasses}>{icon}</div>
        <CardTitle className={titleClasses}>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        {children}
      </CardContent>
      {actionButton && (
        <CardFooter>
          <Button className="w-full" onClick={actionButton.onClick}>
            {actionButton.label}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
} 