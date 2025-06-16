'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BrandProfile } from '@/lib/types';
import { UserCircle, ListChecks, Mic } from 'lucide-react';
import { BlockHeader } from '@/components/shared/BlockHeader';

interface VoiceTabProps {
  data: BrandProfile['voice'];
}

export const VoiceTab = ({ data }: VoiceTabProps) => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <BlockHeader 
            icon={UserCircle}
            title="Persona de Marca"
            description="La personificación de nuestra marca, con quien nuestras clientas sienten que conversan."
          />
        </CardHeader>
        <CardContent className="p-6 space-y-1">
          <h4 className="font-semibold text-lg text-primary">{data.persona.name}</h4>
          <p className="text-sm text-muted-foreground">
            {data.persona.description}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <BlockHeader 
            icon={Mic}
            title="Tono de Voz"
            description="Las características clave que definen cómo suena nuestra comunicación."
          />
        </CardHeader>
        <CardContent className="p-6">
            <div className="flex flex-wrap gap-2">
              {data.tone.map((word) => (
                <Badge key={word} variant="default" className="text-sm font-normal">
                  {word}
                </Badge>
              ))}
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <BlockHeader 
            icon={ListChecks}
            title="Guía Lingüística"
            description="Reglas y vocabulario específico para mantener la coherencia en todos nuestros mensajes."
          />
        </CardHeader>
        <CardContent className="p-6 space-y-4">
            <div>
                <h4 className="font-semibold text-md mb-2">Vocabulario Clave</h4>
                 <div className="flex flex-wrap gap-2">
                    {data.vocabulary.map((word) => (
                        <Badge key={word} variant="outline" className="text-sm font-normal">
                        {word}
                        </Badge>
                    ))}
                </div>
            </div>
             <div>
                <h4 className="font-semibold text-md mb-2">Gramática y Estilo</h4>
                <p className="text-sm text-muted-foreground">{data.grammar}</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}; 