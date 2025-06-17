'use client'

import { DashboardData } from '@/lib/types'
import { BarChart, Sparkles } from 'lucide-react'
import ActionCard from './ActionCard'
import AiCoachFeed from './AiCoachFeed'
import { DashboardSection } from './DashboardSection'
import PerformanceCard from './PerformanceCard'
import UpcomingPosts from './UpcomingPosts'

interface DashboardClientContentProps {
  data: DashboardData
}

export function DashboardClientContent({ data }: DashboardClientContentProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Main Content Column */}
      <div className="lg:col-span-2 space-y-6">
        <DashboardSection icon={BarChart} title="Tu Rendimiento de un Vistazo">
          <div className="grid gap-4 md:grid-cols-2">
            {data.performanceMetrics.map((metric) => (
              <PerformanceCard key={metric.id} metric={metric} />
            ))}
          </div>
        </DashboardSection>

        <DashboardSection
          icon={Sparkles}
          title="¿Qué hacemos hoy?"
          description="Acciones rápidas para impulsar tu marca."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {data.recommendedActions.map((action) => (
              <ActionCard key={action.id} action={action} />
            ))}
          </div>
        </DashboardSection>
      </div>

      {/* Right Context Column */}
      <div className="lg:col-span-1 space-y-6">
        <AiCoachFeed insights={data.aiCoachInsights} />
        <UpcomingPosts posts={data.upcomingPosts} />
      </div>
    </div>
  )
} 