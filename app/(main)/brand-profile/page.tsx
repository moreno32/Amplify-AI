'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { brandProfileData } from '@/lib/brand';
import {
  Sparkles,
  Palette,
  Mic,
  Clapperboard,
  RefreshCcw,
} from 'lucide-react';
import { CoreTab } from './components/CoreTab';
import { VoiceTab } from './components/VoiceTab';
import { VisualTab } from './components/VisualTab';
import { AssetsTab } from './components/AssetsTab';
import { PageHeader } from '@/components/layout/PageHeader';
import { toast } from 'sonner';

export default function BrandProfilePage() {
  const brandProfile = brandProfileData;

  useEffect(() => {
    toast.info("El Alma de tu Marca ha sido cargada.", {
      description: "Explora y refina la esencia de tu narrativa.",
    })
  }, [])

  if (!brandProfile) {
    return <div>Cargando el alma de tu marca...</div>;
  }

  // Helper to extract HSL values from an HSL string like 'hsl(222.2 47.4% 11.2%)'
  const getHslValues = (hslString: string | undefined) => {
    if (!hslString) return '0 0% 0%';
    const match = hslString.match(/(\d+(\.\d+)?)\s*(\d+(\.\d+)?)%\s*(\d+(\.\d+)?)%/);
    return match ? `${match[1]} ${match[3]}% ${match[5]}%` : '0 0% 0%';
  };

  // Define brand colors as CSS variables for dynamic theming
  const brandStyle = {
    '--brand-primary': brandProfile.visual.colorPalette.find(c => c.role === 'Primario')?.color || '#000000',
    '--brand-primary-hsl': getHslValues(brandProfile.visual.colorPalette.find(c => c.role === 'Primario')?.color),
    '--brand-secondary': brandProfile.visual.colorPalette.find(c => c.role === 'Secundario')?.color || '#4A4A4A',
    '--brand-accent': brandProfile.visual.colorPalette.find(c => c.role === 'Acento')?.color || '#8E24AA',
  } as React.CSSProperties;

  return (
    <div style={brandStyle}>
      <PageHeader
        title="El Alma de tu Marca"
        subtitle="El espejo estratégico de tu marca. Descubre y refina la narrativa que te hace única."
        actions={
          <Button onClick={() => toast.success("Guía de marca resincronizada correctamente.")}>
            <RefreshCcw className="mr-2 h-4 w-4" /> Resincronizar desde Guía
          </Button>
        }
      />
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