'use client'

import { useState } from 'react'
import { InsightCard } from './InsightCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StrategyCoachData, Competitor } from '@/lib/types'
import { Lightbulb } from 'lucide-react'
import { CompetitorGrid } from './CompetitorGrid'
import { ContentAnalysisTab } from './ContentAnalysisTab'

interface StrategyCoachClientPageProps {
  initialData: StrategyCoachData
}

export function StrategyCoachClientPage({
  initialData,
}: StrategyCoachClientPageProps) {
  const [selectedCompetitor, setSelectedCompetitor] =
    useState<Competitor | null>(null)
  const [activeTab, setActiveTab] = useState('market-overview')

  const handleCompetitorSelect = (competitor: Competitor) => {
    setSelectedCompetitor(competitor)
    setActiveTab('content-analysis')
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="market-overview">
          Visión General del Mercado
        </TabsTrigger>
        <TabsTrigger value="content-analysis" disabled={!selectedCompetitor}>
          Análisis de{' '}
          {selectedCompetitor ? selectedCompetitor.name : 'Contenido'}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="market-overview" className="space-y-6 pt-4">
        <InsightCard
          variant="highlight"
          icon={Lightbulb}
          title="Conclusión del Coach"
          description={
            <>
              <p>
                El nicho de 'Wellness' en Madrid muestra un{' '}
                <strong className="text-amber-950">
                  engagement promedio del 3.8%
                </strong>
                . Los competidores con mejor rendimiento publican
                consistentemente contenido sobre{' '}
                <strong className="text-amber-950">'Yoga Restaurativo'</strong>{' '}
                y{' '}
                <strong className="text-amber-950">'Mindfulness'</strong>.
              </p>
              <p className="mt-2">
                <strong>Recomendación:</strong> Lanza una campaña enfocada en
                'Mindfulness' para capturar una oportunidad de mercado.
              </p>
            </>
          }
          cta={{
            text: 'Generar Ideas para Campaña',
            props: {
              className: 'bg-amber-900 hover:bg-amber-950 text-white',
            },
          }}
        />
        <CompetitorGrid
          competitors={initialData.competitors}
          onCompetitorSelect={handleCompetitorSelect}
        />
      </TabsContent>
      <TabsContent value="content-analysis">
        {selectedCompetitor && (
          <ContentAnalysisTab
            competitorId={selectedCompetitor.name.toLowerCase().replace(' ', '')}
          />
        )}
      </TabsContent>
    </Tabs>
  )
} 