'use client';

import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { mockBrandProfile } from '@/lib/mock-data/brand';
import {
  Sparkles,
  Palette,
  Mic,
  Clapperboard,
  RefreshCcw,
} from 'lucide-react';
import CoreTab from './components/CoreTab';
import VoiceTab from './components/VoiceTab';
import VisualTab from './components/VisualTab';
import AssetsTab from './components/AssetsTab';

export default function BrandProfilePage() {
  const brandProfile = mockBrandProfile;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">ADN de Marca</h2>
          <p className="text-muted-foreground">
            Aquí puedes ver y refinar cómo nuestra IA entiende tu marca.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <RefreshCcw className="mr-2 h-4 w-4" /> Resincronizar desde Guía
          </Button>
        </div>
      </div>
      <Tabs defaultValue="core" className="space-y-4">
        <TabsList>
          <TabsTrigger value="core">
            <Sparkles className="mr-2 h-4 w-4" />
            Core
          </TabsTrigger>
          <TabsTrigger value="voice">
            <Mic className="mr-2 h-4 w-4" />
            Voice
          </TabsTrigger>
          <TabsTrigger value="visual">
            <Palette className="mr-2 h-4 w-4" />
            Visual
          </TabsTrigger>
          <TabsTrigger value="assets">
            <Clapperboard className="mr-2 h-4 w-4" />
            Assets
          </TabsTrigger>
        </TabsList>
        <TabsContent value="core" className="space-y-4">
          <CoreTab data={brandProfile.core} />
        </TabsContent>
        <TabsContent value="voice" className="space-y-4">
            <VoiceTab data={brandProfile.voice} />
        </TabsContent>
        <TabsContent value="visual" className="space-y-4">
            <VisualTab data={brandProfile.visual} />
        </TabsContent>
        <TabsContent value="assets" className="space-y-4">
            <AssetsTab data={brandProfile.assets} />
        </TabsContent>
      </Tabs>
    </div>
  );
} 