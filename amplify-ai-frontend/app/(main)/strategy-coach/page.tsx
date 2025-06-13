import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { mockCompetitors } from '@/lib/mock-data/market';
import { CompetitorCard } from './components/CompetitorCard';
import { MarketInsightCard } from './components/MarketInsightCard';

export default function StrategyCoachPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Asistente de Estrategia</h1>
        <p className="text-muted-foreground">
          Inteligencia de mercado y análisis competitivo para guiar tu
          estrategia.
        </p>
      </div>
      <Tabs defaultValue="market-overview">
        <TabsList>
          <TabsTrigger value="market-overview">
            Visión General del Mercado
          </TabsTrigger>
          <TabsTrigger value="content-analysis" disabled>
            Análisis de Contenido
          </TabsTrigger>
        </TabsList>
        <TabsContent value="market-overview" className="space-y-6 pt-4">
          <MarketInsightCard />
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Competidores Clave
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockCompetitors.map((competitor) => (
                <CompetitorCard key={competitor.id} competitor={competitor} />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 