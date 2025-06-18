'use client'

import { useEffect } from 'react'
import {
  Clapperboard,
  Mic,
  Palette,
  RefreshCcw,
  Sparkles,
} from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BrandProfile } from '@/lib/types'
import { AssetsTab } from './AssetsTab'
import { CoreTab } from './CoreTab'
import { VisualTab } from './VisualTab'
import { VoiceTab } from './VoiceTab'

interface BrandProfileClientContentProps {
  brandProfile: BrandProfile
}

// A helper function to safely extract HSL values for CSS variables
const getHslValues = (color: string | undefined): string => {
  if (!color) return '0 0% 0%';
  // This is a simplified conversion, a real app might use a library like `colord`
  // For now, let's assume hex and provide a placeholder conversion
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    // This is not a real HSL conversion, just for placeholder purposes.
    return `${r} ${g} ${b}`; 
  }
  return '0 0% 50%'; // default
};

export function BrandProfileClientContent({
  brandProfile,
}: BrandProfileClientContentProps) {
  useEffect(() => {
    toast.info('El Alma de tu Marca ha sido cargada.', {
      description: 'Explora y refina la esencia de tu narrativa.',
    })
  }, [])

  const brandStyle = {
    '--brand-primary':
      brandProfile.visual?.colorPalette?.find((c) => c.role === 'Primario')?.color || '#6D28D9',
    '--brand-primary-hsl': getHslValues(
      brandProfile.visual?.colorPalette?.find((c) => c.role === 'Primario')?.color
    ),
    '--brand-secondary':
      brandProfile.visual?.colorPalette?.find((c) => c.role === 'Secundario')?.color || '#DB2777',
    '--brand-accent':
      brandProfile.visual?.colorPalette?.find((c) => c.role === 'Acento')?.color || '#F59E0B',
  } as React.CSSProperties

  return (
    <div style={brandStyle}>
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
  )
} 