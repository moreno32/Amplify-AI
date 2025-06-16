'use client';

import { Button } from '@/components/ui/button';
import { mockDashboardData } from '@/lib/mock-data/dashboard';
import { Plus } from 'lucide-react';
import PerformanceCard from './components/PerformanceCard';
import ActionCard from './components/ActionCard';
import AiCoachFeed from './components/AiCoachFeed';
import UpcomingPosts from './components/UpcomingPosts';
import { PageHeader } from '@/components/layout/PageHeader';
import { DashboardSection } from './components/DashboardSection';
import { BarChart, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const data = mockDashboardData;
  const userName = 'Dani'; // Placeholder for user name

  return (
    <div>
      <PageHeader 
        title={`Hola de nuevo, ${userName} 👋`}
        subtitle="Aquí tienes tu vista de vuelo estratégica."
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Crear Nueva Campaña
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
            <DashboardSection
              icon={BarChart}
              title="Tu Rendimiento de un Vistazo"
            >
              <div className="grid gap-4 md:grid-cols-2">
                  {data.performanceMetrics.map(metric => (
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
                  {data.recommendedActions.map(action => (
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
    </div>
  );
} 