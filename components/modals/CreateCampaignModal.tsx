"use client";

import { useModalStore } from "@/lib/store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import { Lightbulb, Map, Milestone, Zap } from "lucide-react";

export const CreateCampaignModal = () => {
    const { isOpen, type, onClose } = useModalStore();
    const [view, setView] = useState('selector'); // 'selector', 'express', 'guided'
    const [guidedStep, setGuidedStep] = useState(1);
  
    const isModalOpen = isOpen && type === "createCampaign";

    const handleClose = () => {
        onClose();
        setTimeout(() => {
            setView('selector');
            setGuidedStep(1);
        }, 300); // Reset state after closing animation
    }

    const renderContent = () => {
        if(view === 'express') {
            return (
                <div>
                     <Button variant="ghost" onClick={() => setView('selector')}>← Volver</Button>
                    <h2 className="text-2xl font-bold mt-4">Campaña Express</h2>
                    <p className="text-muted-foreground">Describe tu idea en una frase y deja que nuestra IA haga el resto.</p>
                    <Textarea placeholder="Ej: 'Una oferta de 2x1 en cafés para atraer estudiantes esta semana'." className="mt-4 min-h-[100px]" />
                    <Button className="w-full mt-4">✨ Generar Campaña Mágica</Button>
                </div>
            )
        }

        if(view === 'guided') {
            // Aquí iría el wizard de varios pasos
            return (
                 <div>
                    <Button variant="ghost" onClick={() => setView('selector')}>← Volver</Button>
                    <h2 className="text-2xl font-bold mt-4">Campaña Guiada (Paso {guidedStep})</h2>
                    <p className="text-muted-foreground">Define los detalles para una campaña más precisa.</p>
                    {/* Contenido del Wizard aquí */}
                     <Button className="w-full mt-4">✨ Generar Campaña Estratégica</Button>
                </div>
            )
        }

        // Default view: selector
        return (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="cursor-pointer hover:border-indigo-500 transition-colors" onClick={() => setView('express')}>
                    <CardHeader>
                        <Zap className="h-8 w-8 mb-2 text-indigo-500" />
                        <CardTitle>Campaña Express</CardTitle>
                        <CardDescription>Describe tu idea en una frase y deja que nuestra IA haga el resto.</CardDescription>
                    </CardHeader>
                </Card>
                 <Card className="cursor-pointer hover:border-gray-400 transition-colors" onClick={() => setView('guided')}>
                    <CardHeader>
                        <Map className="h-8 w-8 mb-2 text-gray-500" />
                        <CardTitle>Campaña Guiada</CardTitle>
                        <CardDescription>Define los detalles para una campaña más precisa y personalizada.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }
  
    return (
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-4xl h-full md:h-auto flex flex-col">
            <div className="grid md:grid-cols-[40%_60%] h-full">
                {/* Panel Izquierdo */}
                <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-[#6444F4] to-[#4B38D8] text-white rounded-l-lg">
                    <Milestone className="h-12 w-12 mb-4"/>
                    <h2 className="text-3xl font-bold">Dale a la IA un objetivo.</h2>
                    <p className="mt-2 opacity-80">Nosotros nos encargamos de la estrategia, el copy, las imágenes y el calendario.</p>
                </div>

                {/* Panel Derecho */}
                <div className="p-8 flex flex-col justify-center">
                     <DialogHeader>
                        <DialogTitle className="text-3xl font-bold">Vamos a crear tu próxima campaña.</DialogTitle>
                    </DialogHeader>
                    <div className="mt-6">
                       {renderContent()}
                    </div>
                </div>
            </div>
        </DialogContent>
      </Dialog>
    );
  }; 