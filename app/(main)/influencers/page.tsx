'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockInfluencers } from '@/lib/mock-data';
import { Search, Star } from 'lucide-react';
import { InfluencerCard } from './components/InfluencerCard';
import { PageHeader } from '@/components/layout/PageHeader';
import { InfluencerFilters } from './components/InfluencerFilters';

export default function InfluencersPage() {
  return (
    <>
      <PageHeader 
        title="Encuentra Colaboradores"
        subtitle="Descubre influencers alineados con tu marca y audiencia."
        actions={<InfluencerFilters />}
      />
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
            {mockInfluencers.map((influencer) => (
              <InfluencerCard key={influencer.id} influencer={influencer} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
} 