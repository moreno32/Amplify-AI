import { PageHeader } from '@/components/layout/PageHeader'
import { getInfluencers } from '@/lib/services/influencerService'
import { InfluencerClientPage } from './components/InfluencerClientPage'
import { InfluencerFilters } from './components/InfluencerFilters'

export default async function InfluencersPage() {
  const influencers = await getInfluencers()

  return (
    <>
      <PageHeader
        title="Encuentra Colaboradores"
        subtitle="Descubre influencers alineados con tu marca y audiencia."
        actions={<InfluencerFilters />}
      />
      <InfluencerClientPage initialInfluencers={influencers} />
    </>
  )
} 