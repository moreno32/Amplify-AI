'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { SettingsData } from '@/lib/services/settingsService'
import { Book, BrainCircuit, Palette, Voicemail } from 'lucide-react'
import { CoreTab } from './CoreTab'
import { VoiceTab } from './VoiceTab'

interface SettingsClientPageProps {
  data: SettingsData
}

export function SettingsClientPage({ data }: SettingsClientPageProps) {
  // Although tabs have no data yet, we pass it down for future use
  return (
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
        <CoreTab data={data.core} />
      </TabsContent>
      <TabsContent value="voice">
        <VoiceTab data={data.voice} />
      </TabsContent>
    </Tabs>
  )
} 