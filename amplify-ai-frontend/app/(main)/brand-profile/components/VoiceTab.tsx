'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BrandProfile } from '@/lib/types';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { mockBrandProfile } from '@/lib/mock-data/brand';

interface VoiceTabProps {
  data: BrandProfile['voice'];
}

const TonalSpectrumCard = ({ data }: { data: BrandProfile['voice']['tonalSpectrum']}) => (
    <Card className="lg:col-span-2">
        <CardHeader>
            <CardTitle>{data.title}</CardTitle>
            <p className="text-xs text-muted-foreground pt-1">{data.id}</p>
        </CardHeader>
        <CardContent>
            <div className="flex h-4 rounded-full overflow-hidden">
                {data.spectrum.map(tone => (
                    <div
                        key={tone.tone}
                        className={tone.color}
                        style={{ width: `${tone.percentage}%`}}
                    />
                ))}
            </div>
            <div className="mt-3 flex justify-between text-sm">
                {data.spectrum.map(tone => (
                     <div key={tone.tone} className="flex items-center">
                        <span className={`h-3 w-3 rounded-full mr-2 ${tone.color}`} />
                        <span>{tone.tone} ({tone.percentage}%)</span>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
)

export default function VoiceTab({ data }: VoiceTabProps) {
  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      <TonalSpectrumCard data={data.tonalSpectrum} />
      <Card>
        <CardHeader>
          <CardTitle>Principios del Tono</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.tonePrinciples.map((principle) => (
            <div key={principle.id}>
              <h4 className="font-semibold text-md">{principle.principle}</h4>
              <p className="text-sm text-muted-foreground">
                {principle.description}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Vocabulario</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-md flex items-center mb-2">
              <ThumbsUp className="h-5 w-5 mr-2 text-green-500" />
              Usar
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.vocabulary.do.map((word) => (
                <Badge key={word} variant="default">
                  {word}
                </Badge>
              ))}
            </div>
          </div>
          <div className="pt-4">
            <h4 className="font-semibold text-md flex items-center mb-2">
              <ThumbsDown className="h-5 w-5 mr-2 text-red-500" />
              Evitar
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.vocabulary.dont.map((word) => (
                <Badge key={word} variant="destructive">
                  {word}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 