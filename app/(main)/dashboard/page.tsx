import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/layout/PageHeader'
import { getDashboardData } from '@/lib/services/dashboardService'
import { Plus } from 'lucide-react'
import { DashboardClientContent } from './components/DashboardClientContent'

export default async function DashboardPage() {
  // 1. Data is now fetched on the server using the service layer
  const data = await getDashboardData()
  const userName = 'Dani' // This would also come from a server-side session

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
      {/* 2. Data is passed down to a client component */}
      <DashboardClientContent data={data} />
    </div>
  )
} 