'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AiInsight } from '@/lib/types';
import { Lightbulb } from 'lucide-react';
import Link from 'next/link';

interface AiCoachFeedProps {
  insights: AiInsight[];
}

export default function AiCoachFeed({ insights }: AiCoachFeedProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <Lightbulb className="h-5 w-5 text-yellow-400" />
        <CardTitle className="text-lg">Insights del Coach IA</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight) => (
          <div key={insight.id} className="text-sm">
            <p>{insight.insight}</p>
            {insight.action && (
              <Link
                href={insight.action.href}
                className="text-blue-500 hover:underline font-semibold"
              >
                {insight.action.label}
              </Link>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
} 