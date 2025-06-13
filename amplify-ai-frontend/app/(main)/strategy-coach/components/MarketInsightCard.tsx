import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

export function MarketInsightCard() {
  return (
    <Card className="bg-amber-50 border-amber-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-900">
          <Lightbulb className="h-5 w-5" />
          Conclusión del Coach
        </CardTitle>
      </CardHeader>
      <CardContent className="text-amber-800 space-y-2">
        <p>
          El nicho de 'Wellness' en Madrid muestra un{' '}
          <strong>engagement promedio del 3.8%</strong>. Los competidores con
          mejor rendimiento publican consistentemente contenido sobre{' '}
          <strong>'Yoga Restaurativo'</strong> y{' '}
          <strong>'Mindfulness'</strong>.
        </p>
        <p className="font-semibold">
          Recomendación: Lanza una campaña enfocada en 'Mindfulness' para
          capturar una oportunidad de mercado.
        </p>
        <Button className="mt-2 bg-amber-900 hover:bg-amber-950 text-white">
          <Lightbulb className="mr-2 h-4 w-4" />
          Generar Ideas para Campaña
        </Button>
      </CardContent>
    </Card>
  );
} 