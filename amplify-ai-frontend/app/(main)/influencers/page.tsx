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

export default function InfluencersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Encuentra Colaboradores</h1>
        <p className="text-muted-foreground">
          Descubre influencers alineados con tu marca y audiencia.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Busca por nicho o @usuario..." className="pl-8" />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ubicación" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="madrid">Madrid</SelectItem>
              <SelectItem value="spain">España</SelectItem>
              <SelectItem value="global">Global</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Audiencia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nano">Nano (1k-10k)</SelectItem>
              <SelectItem value="micro">Micro (10k-50k)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Tabs defaultValue="suggested">
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
    </div>
  );
} 