import { PageHeader } from '@/components/layout/PageHeader'
import { getStrategyCoachData } from '@/lib/services/strategyCoachService'
import { StrategyCoachClientPage } from './components/StrategyCoachClientPage'

export default async function StrategyCoachPage() {
  const strategyData = await getStrategyCoachData()

  return (
    <div>
      <PageHeader
        title="Asistente de Estrategia"
        subtitle="Inteligencia de mercado y análisis competitivo para guiar tu estrategia."
      />
      <StrategyCoachClientPage initialData={strategyData} />
    </div>
  )
} 