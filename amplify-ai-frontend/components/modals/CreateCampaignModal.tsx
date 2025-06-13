'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Lightbulb, Map, Zap } from 'lucide-react';
import React from 'react';

function InspirationalPanel() {
  return (
    <div className="hidden md:flex flex-col justify-between h-full p-8 text-white bg-gradient-to-br from-[#6444F4] to-[#4B38D8]">
      <div className="flex items-center gap-2 font-semibold">
        <Lightbulb className="h-6 w-6" />
        <span>Amplify AI</span>
      </div>
      <div>
        <h2 className="text-3xl font-bold tracking-tighter">
          Dale a la IA un objetivo.
        </h2>
        <p className="text-muted-foreground text-white/80 mt-2">
          Nosotros nos encargamos de la estrategia, el copy, las imágenes y el
          calendario.
        </p>
      </div>
      <div className="text-xs text-white/60">
        Basado en tu ADN de Marca para asegurar la coherencia.
      </div>
    </div>
  );
}

function CampaignWizard() {
  const [showExpress, setShowExpress] = React.useState(false);

  // In a real app, this would be a multi-step wizard
  if (showExpress) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold tracking-tight">Campaña Express</h1>
        <p className="text-muted-foreground mt-2">
          Describe tu idea en una frase y deja que nuestra IA haga el resto.
        </p>
        <Textarea
          placeholder="Ej: 'Una oferta de 2x1 en cafés para atraer estudiantes esta semana.'"
          className="mt-4 h-32"
        />
        <Button size="lg" className="mt-4 w-full">
          <Zap className="mr-2 h-4 w-4" />
          Generar Campaña Mágica
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold tracking-tight">
        Vamos a crear tu próxima campaña.
      </h1>
      <p className="text-muted-foreground mt-2">¿Cómo quieres empezar?</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Card
          className="cursor-pointer hover:border-primary transition-all"
          onClick={() => setShowExpress(true)}
        >
          <CardHeader>
            <Zap className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Campaña Express</CardTitle>
            <CardDescription>
              La forma más rápida de lanzar. Describe tu idea y la IA se encarga de
              todo.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="cursor-not-allowed opacity-50">
          <CardHeader>
            <Map className="h-8 w-8 mb-2" />
            <CardTitle>Campaña Guiada</CardTitle>
            <CardDescription>
              Define los detalles para una campaña más precisa y personalizada.
              (Próximamente)
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

interface CreateCampaignModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function CreateCampaignModal({
  isOpen,
  onOpenChange,
}: CreateCampaignModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 border-0 max-w-4xl h-[600px] grid grid-cols-1 md:grid-cols-[40%_60%] gap-0">
        <InspirationalPanel />
        <div className="bg-background rounded-r-lg">
          <CampaignWizard />
        </div>
      </DialogContent>
    </Dialog>
  );
} 