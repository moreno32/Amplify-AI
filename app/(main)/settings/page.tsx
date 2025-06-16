'use client';

import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Book,
  BrainCircuit,
  Palette,
  RefreshCcw,
  Voicemail,
} from 'lucide-react';
import { CoreTab } from './components/CoreTab';
import { VoiceTab } from './components/VoiceTab';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">ADN de Marca</h1>
        <Button variant="outline">
          <RefreshCcw className="mr-2 h-4 w-4" />
          Resincronizar desde Guía
        </Button>
      </div>
      <Tabs defaultValue="core">
        <TabsList>
          <TabsTrigger value="core">
            <BrainCircuit className="mr-2 h-4 w-4" />
            CORE
          </TabsTrigger>
          <TabsTrigger value="voice">
            <Voicemail className="mr-2 h-4 w-4" />
            VOICE
          </TabsTrigger>
          <TabsTrigger value="visual" disabled>
            <Palette className="mr-2 h-4 w-4" />
            VISUAL
          </TabsTrigger>
          <TabsTrigger value="assets" disabled>
            <Book className="mr-2 h-4 w-4" />
            ASSETS
          </TabsTrigger>
        </TabsList>
        <TabsContent value="core">
          <CoreTab />
        </TabsContent>
        <TabsContent value="voice">
          <VoiceTab />
        </TabsContent>
      </Tabs>
    </div>
  );
} 