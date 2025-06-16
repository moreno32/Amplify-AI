'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { Download } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';

// Placeholder components for tab content
import { MiRendimientoTab } from './components/MiRendimientoTab';
import { AnalisisCompetitivoTab } from './components/AnalisisCompetitivoTab';
import { TopPostsTab } from './components/TopPostsTab';

export default function AnalyticsPage() {
  return (
    <div>
      <PageHeader 
        title="Análisis de Rendimiento"
        subtitle="Mide el impacto de tu contenido y estrategia."
        actions={
          <div className="flex items-center space-x-2">
            <DatePickerWithRange />
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar Reporte
            </Button>
          </div>
        }
      />
      <Tabs defaultValue="mi-rendimiento">
        <TabsList className="bg-transparent p-0 h-auto space-x-4">
          <TabsTrigger value="mi-rendimiento">📊 Mi Rendimiento</TabsTrigger>
          <TabsTrigger value="analisis-competitivo">⚔️ Análisis Competitivo</TabsTrigger>
          <TabsTrigger value="top-posts">🏆 Top Posts</TabsTrigger>
        </TabsList>
        <TabsContent value="mi-rendimiento" className="pt-4">
          <MiRendimientoTab />
        </TabsContent>
        <TabsContent value="analisis-competitivo" className="pt-4">
          <AnalisisCompetitivoTab />
        </TabsContent>
        <TabsContent value="top-posts" className="pt-4">
          <TopPostsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
} 