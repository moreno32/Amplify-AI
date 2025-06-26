'use client'

import { DashboardSection } from '@/components/shared/DashboardSection'
import { DashboardData } from '@/lib/types'
import { StatCard } from '@/components/shared/StatCard'
import UpcomingPosts from './UpcomingPosts'
import { Rocket, CheckCircle } from 'lucide-react';
import { InfoCard } from '@/components/shared/InfoCard';
import AiCoachFeed from './AiCoachFeed';

interface DashboardClientContentProps {
  data: DashboardData
}

const iconMap: { [key: string]: React.ElementType } = {
  Rocket,
  CheckCircle,
};

export function DashboardClientContent({ data }: DashboardClientContentProps) {
  const { performanceMetrics, upcomingPosts, recommendedActions, aiCoachInsights } = data

  return (
    <div className="flex-1 space-y-8">
      <DashboardSection title="Rendimiento General">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {performanceMetrics.map((metric) => (
            <StatCard
              key={metric.id}
              title={metric.title}
              value={metric.value}
              change={`${metric.change}%`}
              changeType={metric.changeType}
              changeDescription="vs. semana pasada"
              link={metric.link}
            />
              ))}
            </div>
      </DashboardSection>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DashboardSection title="Próximos Posts">
            <UpcomingPosts posts={upcomingPosts} />
          </DashboardSection>
        </div>
        <div className="lg:col-span-1">
          <DashboardSection title="Acciones Recomendadas">
            <div className="space-y-4">
              {recommendedActions.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <InfoCard
                    key={item.id}
                    icon={Icon && <Icon className="h-8 w-8 text-blue-500" />}
                    title={item.title}
                    actionButton={{ label: item.buttonLabel }}
                  >
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </InfoCard>
                )
              })}
            </div>
          </DashboardSection>
         </div>
      </div>

      <DashboardSection title="Consejos del AI Coach">
        <AiCoachFeed insights={aiCoachInsights} />
      </DashboardSection>
    </div>
  )
} 