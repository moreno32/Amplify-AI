'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Conversation } from '@/lib/types';
import { Lightbulb } from 'lucide-react';

interface ContactContextProps {
  conversation: Conversation | null;
}

export function ContactContext({ conversation }: ContactContextProps) {
  if (!conversation) return null;

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Contexto del Contacto</CardTitle>
          <CardDescription>{conversation.contactName}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Cliente leal. Ha interactuado 5 veces este mes.
          </p>
        </CardContent>
      </Card>
      <Card className="bg-amber-50 border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-900 text-base">
            <Lightbulb className="h-5 w-5" />
            Consejos del Coach
          </CardTitle>
        </CardHeader>
        <CardContent className="text-amber-800 text-sm">
          <p>
            Mencionó que le interesaban los batidos de proteína en un post
            reciente. Es una buena oportunidad para preguntarle si tiene alguna
            duda al respecto.
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 