import { Button } from '@/components/ui/button'
import { DatePickerWithRange } from '@/components/ui/date-range-picker'
import { Download } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { getAnalyticsData } from '@/lib/services/analyticsService'
import { AnalyticsClientContent } from './components/AnalyticsClientContent'

export default async function AnalyticsPage() {
  // 1. Data is fetched on the server via the service layer
  const analyticsData = await getAnalyticsData()

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
      {/* 2. All data is passed down to a single client component */}
      <AnalyticsClientContent data={analyticsData} />
    </div>
  )
} 