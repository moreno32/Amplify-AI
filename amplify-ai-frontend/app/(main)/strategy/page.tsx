'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockCompetitors } from '@/lib/mock-data';
import { Lightbulb } from 'lucide-react';

function StrategyQuadrant() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tu Posición en el Mercado</CardTitle>
        <CardDescription>
          Engagement vs. Crecimiento de Seguidores
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[400px] bg-muted/20 rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">
          [Gráfico de dispersión de Recharts (Cuadrante Estratégico) irá aquí]
        </p>
      </CardContent>
    </Card>
  );
}

function CoachLesson() {
  return (
    <Card className="bg-indigo-50 border-indigo-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-indigo-900">
          <Lightbulb className="h-5 w-5" />
          Lección de Hoy
        </CardTitle>
      </CardHeader>
      <CardContent className="text-indigo-800 space-y-2">
        <p>
          Actualmente eres un <strong>'Creador de Comunidad'</strong>. Tu
          audiencia te adora, pero tu crecimiento es más lento que el de los
          'Líderes'.
        </p>
        <p className="font-semibold">
          Plan de Acción Propuesto: Una campaña de 'Colaboración con
          Microinfluencers' para llegar a nuevas audiencias que comparten tus
          valores.
        </p>
        <Button className="mt-2 bg-indigo-900 hover:bg-indigo-950 text-white">
          Explorar Plan de Acción
        </Button>
      </CardContent>
    </Card>
  );
}

export default function StrategyCoachPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Sesión con tu Strategy Coach 🧠</h1>
        <div className="w-[250px]">
          <Select defaultValue="overview">
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar enfoque..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Visión General del Mercado</SelectItem>
              {mockCompetitors.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  Análisis de {c.username}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-6">
        <StrategyQuadrant />
        <CoachLesson />
      </div>
    </div>
  );
} 