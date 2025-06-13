'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { Download } from 'lucide-react';

// Placeholder components for tab content
import { MiRendimientoTab } from './components/MiRendimientoTab';
import { AnalisisCompetitivoTab } from './components/AnalisisCompetitivoTab';
import { TopPostsTab } from './components/TopPostsTab';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <h1 className="text-2xl font-bold">Análisis de Rendimiento</h1>
        <div className="flex items-center space-x-2">
          <DatePickerWithRange />
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Reporte
          </Button>
        </div>
      </div>
      <Tabs defaultValue="mi-rendimiento">
        <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
          <TabsTrigger value="mi-rendimiento">📊 Mi Rendimiento</TabsTrigger>
          <TabsTrigger value="analisis-competitivo">⚔️ Análisis Competitivo</TabsTrigger>
          <TabsTrigger value="top-posts">🏆 Top Posts</TabsTrigger>
        </TabsList>
        <TabsContent value="mi-rendimiento">
          <MiRendimientoTab />
        </TabsContent>
        <TabsContent value="analisis-competitivo">
          <AnalisisCompetitivoTab />
        </TabsContent>
        <TabsContent value="top-posts">
          <TopPostsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
} 