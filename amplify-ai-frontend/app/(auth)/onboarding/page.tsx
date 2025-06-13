'use client';

import {
  BrainCircuit,
  Brush,
  Instagram,
  Pen,
  Rocket,
  Search,
} from 'lucide-react';
import React from 'react';

const steps = [
  {
    icon: Rocket,
    title: 'Bienvenida',
    description: 'Empecemos a construir tu estrategia.',
  },
  {
    icon: Instagram,
    title: 'Conexión',
    description: 'Conecta tu cuenta principal.',
  },
  {
    icon: Pen,
    title: 'Voz de Marca',
    description: 'Define tu tono y mensajes clave.',
  },
  {
    icon: Brush,
    title: 'Estilo Visual',
    description: 'Sube tu logo y paleta de colores.',
  },
  {
    icon: Search,
    title: 'Competencia',
    description: 'Analicemos a tus competidores.',
  },
  {
    icon: BrainCircuit,
    title: '¡Listo!',
    description: 'Tu perfil inteligente está completo.',
  },
];

function OnboardingStepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex flex-col gap-8">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div key={step.title} className="flex items-center gap-4">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : isCompleted
                  ? 'bg-primary/80 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              <step.icon className="h-5 w-5" />
            </div>
            <div>
              <h3
                className={`font-semibold ${
                  isActive ? 'text-primary' : 'text-foreground'
                }`}
              >
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function WelcomeStep() {
  return (
    <div className="flex flex-col justify-center h-full">
      <h1 className="text-4xl font-bold tracking-tighter">
        Vamos a crear el ADN de tu marca.
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        En 5 pasos rápidos, nuestra IA entenderá tu negocio a fondo para
        generar contenido que realmente conecte con tu audiencia.
      </p>
      <button className="mt-8 w-fit bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold">
        Empezar ahora →
      </button>
    </div>
  );
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = React.useState(0);

  const stepsContent = [<WelcomeStep key="welcome" />];

  return (
    <div className="grid md:grid-cols-[35%_65%] min-h-screen">
      <div className="hidden md:flex flex-col justify-center items-center bg-muted/40 p-10 border-r">
        <OnboardingStepper currentStep={currentStep} />
      </div>
      <div className="p-10">{stepsContent[currentStep]}</div>
    </div>
  );
} 