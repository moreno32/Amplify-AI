'use client'

import { DashboardData } from '@/lib/types'
import { BarChart, Sparkles } from 'lucide-react'
import ActionCard from './ActionCard'
import AiCoachFeed from './AiCoachFeed'
import { ContentBlock } from '@/components/shared/ContentBlock'
import PerformanceCard from './PerformanceCard'
import UpcomingPosts from './UpcomingPosts'

interface DashboardClientContentProps {
  data: DashboardData
}

export function DashboardClientContent({ data }: DashboardClientContentProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Hola de nuevo, Dani 👋
        </h1>
        <p className="text-muted-foreground">
          Tienes{' '}
          <strong className="text-accent-foreground">3 comentarios nuevos</strong>{' '}
          y <strong className="text-accent-foreground">1 post publicado</strong>{' '}
          desde tu última visita.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          <ContentBlock icon={BarChart} title="Tu Rendimiento de un Vistazo">
            <div className="grid gap-4 md:grid-cols-2">
              {data.performanceMetrics.map((metric) => (
                <PerformanceCard key={metric.id} metric={metric} />
              ))}
            </div>
          </ContentBlock>

          <ContentBlock
            icon={Sparkles}
            title="¿Qué hacemos hoy?"
            description="Acciones rápidas para impulsar tu marca."
          >
            <div className="grid gap-4 md:grid-cols-2">
              {data.recommendedActions.map((action) => (
                <ActionCard key={action.id} action={action} />
              ))}
            </div>
          </ContentBlock>
        </div>

        {/* Right Context Column */}
         <div className="lg:col-span-1 space-y-6">
           <AiCoachFeed insights={data.aiCoachInsights} />
           <UpcomingPosts posts={data.upcomingPosts} />
         </div>
      </div>
    </div>
  )
} 