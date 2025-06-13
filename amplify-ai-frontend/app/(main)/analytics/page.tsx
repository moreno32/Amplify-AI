'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from './components/MetricCard';
import { KPIPill } from './components/KPIPill';

const kpiData = [
  { kpi: 'Tasa de Clics (CTR)', value: '2.3%', change: '+0.5%', changeType: 'increase' as const },
  { kpi: 'Coste por Clic (CPC)', value: '€0.45', change: '-€0.05', changeType: 'decrease' as const },
  { kpi: 'Tasa de Conversión', value: '1.8%', change: '+0.2%', changeType: 'increase' as const },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Métricas de Rendimiento</h1>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Visión General</TabsTrigger>
          <TabsTrigger value="audience" disabled>Audiencia</TabsTrigger>
          <TabsTrigger value="content" disabled>Contenido</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard 
              title="Seguidores Totales"
              value="10,234"
              change="+20.1%"
              changeType="increase"
              description="El número total de seguidores en todas las plataformas."
            />
            <MetricCard 
              title="Tasa de Engagement"
              value="3.4%"
              change="-1.2%"
              changeType="decrease"
              description="Interacciones vs. seguidores."
            />
          </div>
          <div className="grid gap-4 mt-6 md:grid-cols-3">
              {kpiData.map(kpi => <KPIPill key={kpi.kpi} {...kpi} />)}
          </div>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Gráfico de Crecimiento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Gráfico próximamente</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 