import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import React from "react";

interface AiInsightCardProps {
  title: string;
  recommendation: React.ReactNode;
  ctaText: string;
  onCtaClick?: () => void;
}

export function AiInsightCard({ title, recommendation, ctaText, onCtaClick }: AiInsightCardProps) {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <div className="bg-primary/10 p-2 rounded-full">
            <Lightbulb className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
            <CardTitle className="text-lg text-primary">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
            {recommendation}
            <Button onClick={onCtaClick}>{ctaText}</Button>
        </div>
      </CardContent>
    </Card>
  );
} 