'use client';

import { Button } from '@/components/ui/button';
import { mockDashboardData } from '@/lib/mock-data/dashboard';
import { Plus } from 'lucide-react';
import PerformanceCard from './components/PerformanceCard';
import ActionCard from './components/ActionCard';
import AiCoachFeed from './components/AiCoachFeed';
import UpcomingPosts from './components/UpcomingPosts';

export default function DashboardPage() {
  const data = mockDashboardData;
  const userName = 'Dani'; // Placeholder for user name

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Hola de nuevo, {userName} 👋
          </h2>
          <p className="text-muted-foreground">
            Aquí tienes tu vista de vuelo estratégica.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Crear Nueva Campaña
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-semibold tracking-tight">Tu Rendimiento de un Vistazo</h3>
            <div className="grid gap-4 md:grid-cols-2">
                {data.performanceMetrics.map(metric => (
                    <PerformanceCard key={metric.id} metric={metric} />
                ))}
            </div>
            <h3 className="text-xl font-semibold tracking-tight">¿Qué hacemos hoy?</h3>
            <div className="grid gap-4 md:grid-cols-2">
                {data.recommendedActions.map(action => (
                    <ActionCard key={action.id} action={action} />
                ))}
            </div>
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