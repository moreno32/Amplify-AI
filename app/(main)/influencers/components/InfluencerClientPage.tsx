'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Influencer } from '@/lib/types'
import { Search, Star } from 'lucide-react'
import { InfluencerCard } from './InfluencerCard'

interface InfluencerClientPageProps {
  initialInfluencers: Influencer[]
}

export function InfluencerClientPage({
  initialInfluencers,
}: InfluencerClientPageProps) {
  // TODO: Add state for search results and filtering logic
  return (
    <Tabs defaultValue="suggested" className="mt-4">
      <TabsList>
        <TabsTrigger value="suggested">
          <Star className="mr-2 h-4 w-4" />
          Sugeridos por IA
        </TabsTrigger>
        <TabsTrigger value="search">
          <Search className="mr-2 h-4 w-4" />
          Resultados
        </TabsTrigger>
      </TabsList>
      <TabsContent value="suggested" className="pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {initialInfluencers.map((influencer) => (
            <InfluencerCard key={influencer.id} influencer={influencer} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="search" className="pt-4">
        {/* Search results would be rendered here based on state */}
        <p className="text-center text-muted-foreground">
          Los resultados de tu búsqueda aparecerán aquí.
        </p>
      </TabsContent>
    </Tabs>
  )
} 