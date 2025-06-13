"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronsRight, Circle, Rocket, Link as LinkIcon, Feather, Brush, Search, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Bienvenida", icon: Rocket },
  { id: 2, title: "Conexión", icon: LinkIcon },
  { id: 3, title: "Voz de Marca", icon: Feather },
  { id: 4, title: "Estilo Visual", icon: Brush },
  { id: 5, title: "Competencia", icon: Search },
  { id: 6, title: "¡Listo!", icon: BrainCircuit },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleFinish = () => {
      setCurrentStep(steps.length); // Ir al paso final de carga
      setTimeout(() => {
          router.push('/dashboard');
      }, 3000); // Simular carga y redirigir
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center">
            <h1 className="text-3xl font-bold">Vamos a crear el ADN de tu marca.</h1>
            <p className="mt-4 text-muted-foreground">
              En 5 pasos rápidos, nuestra IA entenderá tu negocio a fondo para generar contenido que realmente conecte con tu audiencia.
            </p>
            <Button onClick={handleNext} className="mt-8" size="lg">
              Empezar ahora <ChevronsRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      case 2:
        return (
          <div>
            <h1 className="text-2xl font-bold">Conecta tu cuenta de Instagram.</h1>
            <p className="mt-2 text-muted-foreground">
              Necesitamos acceso para analizar tu perfil y programar publicaciones. Tu información está segura.
            </p>
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Instagram (Cuentas de Empresa)</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button className="w-full">Conectar con Meta</Button>
                </CardContent>
            </Card>
          </div>
        );
       case 3:
        return (
          <div>
            <h1 className="text-2xl font-bold">¿Cómo suena tu marca?</h1>
            <div className="space-y-6 mt-4">
                <div>
                    <label className="font-semibold">¿A qué sector pertenece tu negocio?</label>
                    <ToggleGroup type="single" variant="outline" className="flex-wrap justify-start mt-2">
                        <ToggleGroupItem value="ecomm">eCommerce</ToggleGroupItem>
                        <ToggleGroupItem value="local">Negocio Local</ToggleGroupItem>
                        <ToggleGroupItem value="startup">Startup</ToggleGroupItem>
                        <ToggleGroupItem value="health">Salud y Bienestar</ToggleGroupItem>
                    </ToggleGroup>
                </div>
                 <div>
                    <label className="font-semibold">Elige hasta 3 adjetivos que describan tu tono:</label>
                    <ToggleGroup type="multiple" variant="outline" className="flex-wrap justify-start mt-2">
                        <ToggleGroupItem value="profesional">Profesional</ToggleGroupItem>
                        <ToggleGroupItem value="cercano">Cercano</ToggleGroupItem>
                        <ToggleGroupItem value="divertido">Divertido</ToggleGroupItem>
                        <ToggleGroupItem value="inspirador">Inspirador</ToggleGroupItem>
                    </ToggleGroup>
                </div>
            </div>
          </div>
        );
        case 4:
            return (
                <div>
                    <h1 className="text-2xl font-bold">Define tu identidad visual.</h1>
                    <Card className="mt-6">
                        <CardHeader><CardTitle>Logo de la Marca</CardTitle></CardHeader>
                        <CardContent className="text-center p-12 border-dashed border-2 rounded-lg">
                            <p>Arrastra tu logo aquí o haz clic para seleccionarlo</p>
                            <p className="text-xs text-muted-foreground mt-2">PNG, JPG, SVG</p>
                        </CardContent>
                    </Card>
                </div>
            )
        case 5:
            return (
                <div>
                    <h1 className="text-2xl font-bold">¿Quiénes son tus referentes o competidores?</h1>
                    <p className="mt-2 text-muted-foreground">Introduce los @usuarios de Instagram. Nuestra IA los analizará.</p>
                    <Input placeholder="@competidor1, @competidor2" className="mt-4"/>
                </div>
            )
        case 6:
            return (
                 <div className="text-center">
                    <BrainCircuit className="mx-auto h-16 w-16 animate-pulse text-indigo-500" />
                    <h1 className="text-3xl font-bold mt-4">Estamos creando tu perfil inteligente...</h1>
                    <p className="mt-2 text-muted-foreground">
                        Analizando tu tono de voz...
                    </p>
                </div>
            )
      default:
        return null;
    }
  };

  if(currentStep === steps.length) {
      return (
          <div className="flex items-center justify-center min-h-screen bg-gray-50">
             {renderStepContent()}
          </div>
      )
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[350px_1fr]">
      <div className="hidden border-r bg-gray-100/40 p-10 lg:block">
        <div className="flex flex-col gap-8">
            <Link href="/" className="flex items-center gap-2 font-semibold">
                <BrainCircuit className="h-6 w-6" />
                <span>Amplify AI</span>
            </Link>
            <nav className="grid gap-4">
            {steps.map((step, index) => {
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                return (
                <div key={step.id} className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background">
                    {isCompleted ? <Check className="h-5 w-5 text-indigo-500" /> : <step.icon className={cn("h-5 w-5", isActive && "text-indigo-500")} />}
                    </div>
                    <div>
                    <p className={cn("font-medium", isActive ? "text-primary" : "text-muted-foreground")}>{step.title}</p>
                    </div>
                </div>
                );
            })}
            </nav>
        </div>
      </div>
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col items-center justify-center gap-4 p-4 md:gap-8 md:p-10">
          <div className="w-full max-w-2xl">
            {renderStepContent()}
          </div>
        </main>
        {currentStep > 1 && currentStep < steps.length -1 && (
             <footer className="flex items-center justify-end gap-4 p-4 border-t">
                <Button variant="outline" onClick={handleBack}>Volver</Button>
                <Button onClick={currentStep === steps.length - 2 ? handleFinish : handleNext}>
                    {currentStep === steps.length - 2 ? 'Finalizar Configuración' : 'Continuar'}
                </Button>
            </footer>
        )}
      </div>
    </div>
  );
} 