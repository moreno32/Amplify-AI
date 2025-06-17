'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AnalyticsData } from '@/lib/types'
import { AnalisisCompetitivoTab } from './AnalisisCompetitivoTab'
import { MiRendimientoTab } from './MiRendimientoTab'
import { TopPostsTab } from './TopPostsTab'

interface AnalyticsClientContentProps {
  data: AnalyticsData
}

export function AnalyticsClientContent({ data }: AnalyticsClientContentProps) {
  return (
    <Tabs defaultValue="mi-rendimiento">
      <TabsList className="bg-transparent p-0 h-auto space-x-4">
        <TabsTrigger value="mi-rendimiento">📊 Mi Rendimiento</TabsTrigger>
        <TabsTrigger value="analisis-competitivo">
          ⚔️ Análisis Competitivo
        </TabsTrigger>
        <TabsTrigger value="top-posts">🏆 Top Posts</TabsTrigger>
      </TabsList>
      <TabsContent value="mi-rendimiento" className="pt-4">
        <MiRendimientoTab data={data.performance} />
      </TabsContent>
      <TabsContent value="analisis-competitivo" className="pt-4">
        <AnalisisCompetitivoTab data={data.competitors} />
      </TabsContent>
      <TabsContent value="top-posts" className="pt-4">
        <TopPostsTab data={data.topPosts} />
      </TabsContent>
    </Tabs>
  )
} 