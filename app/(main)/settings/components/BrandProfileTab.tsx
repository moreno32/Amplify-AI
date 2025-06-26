'use client'

import { useState, useRef, KeyboardEvent, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import {
  BrainCircuit,
  Mic,
  Sparkles,
  X,
} from 'lucide-react'
import { produce } from 'immer'

import { DashboardSection } from '@/components/shared/DashboardSection'
import { BlockHeader } from '@/components/shared/BlockHeader'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { SettingsSaveFooter } from '@/components/shared/SettingsSaveFooter'
import { BrandProfile } from '@/lib/types'
import { updateBrandProfile } from '../actions'

const RECOMMENDED_TONES = [
    'Conversacional',
    'Profesional',
    'Entusiasta',
    'Humorístico',
    'Sereno',
    'Directo',
    'Sofisticado',
    'Empático'
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const MAX_CONTEXT_LENGTH = 500;

interface BrandProfileTabProps {
  data: BrandProfile;
}

export function BrandProfileTab({ data }: BrandProfileTabProps) {
  const [formData, setFormData] = useState(data);
  const [isModified, setIsModified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toneInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setFormData(data);
    setIsModified(false);
  }, [data]);

  const handleFieldChange = (path: string, value: any) => {
    setFormData(produce(draft => {
      let current: any = draft;
      const keys = path.split('.');
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (current[key] === undefined || current[key] === null) {
          current[key] = {};
        }
        current = current[key];
      }
      current[keys[keys.length - 1]] = value;
    }));
    if (!isModified) setIsModified(true);
  };
  
  // Tone Handlers
  const addTone = (tone: string) => {
    const trimmed = tone.trim()
    const currentTones = formData.voice?.tone ?? [];
    if (trimmed && !currentTones.includes(trimmed)) {
      const newTones = [...currentTones, trimmed];
      handleFieldChange('voice.tone', newTones);
    }
  }
  const removeTone = (tone: string) => {
    const currentTones = formData.voice?.tone ?? [];
    const newTones = currentTones.filter((t) => t !== tone)
    handleFieldChange('voice.tone', newTones);
  }
  const handleToneKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      addTone(event.currentTarget.value)
      event.currentTarget.value = ''
    }
  }
  const handleRecommendedToneClick = (tone: string) => {
    const currentTones = formData.voice?.tone ?? [];
    if (currentTones.includes(tone)) removeTone(tone)
    else addTone(tone)
  }

  const handleSave = async () => {
    setIsLoading(true)
    
    // We only send the fields that are actually editable in this form
    const payload: Partial<BrandProfile> = {
      companyDescription: formData.companyDescription,
      voice: {
        // We must spread the original data to not wipe out other fields like vocabulary
        ...data.voice, 
        persona: {
            ...data.voice.persona, 
            name: formData.voice?.persona?.name ?? '',
        },
        tone: formData.voice?.tone ?? [],
      }
    };

    const result = await updateBrandProfile(payload);

    setIsLoading(false)
    if (result.success) {
      setIsModified(false)
      toast.success(result.message)
    } else {
      toast.error(result.message ?? 'An unknown error occurred.')
    }
  }

  return (
    <div className="relative">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <DashboardSection title="Nombre del Agente">
            <BlockHeader
              icon={Sparkles}
              title="Nombre del Agente"
              description="Dale una identidad única a tu asistente de IA."
            />
            <Input
              value={formData.voice?.persona?.name ?? ''}
              onChange={(e) => handleFieldChange('voice.persona.name', e.target.value)}
              placeholder="Ej: Kairos, BrandBot, Sparky..."
            />
          </DashboardSection>
        </motion.div>

        <motion.div variants={itemVariants}>
          <DashboardSection title="Contexto Empresarial">
            <BlockHeader
              icon={BrainCircuit}
              title="Contexto Empresarial"
              description="Dale a la IA información clave sobre tu negocio y metas. Esto se usa en todo el sistema."
            />
             <div className="space-y-2">
              <Textarea
                value={formData.companyDescription ?? ''}
                onChange={(e) => handleFieldChange('companyDescription', e.target.value)}
                placeholder="Ej: Somos una marca de moda sostenible B2C. Buscamos conectar con un público joven y consciente..."
                rows={4}
                maxLength={MAX_CONTEXT_LENGTH}
              />
               <p className="text-xs text-right text-muted-foreground">{(formData.companyDescription?.length ?? 0)}/{MAX_CONTEXT_LENGTH}</p>
            </div>
          </DashboardSection>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2">
          <DashboardSection title="Tono de Comunicación">
            <BlockHeader
              icon={Mic}
              title="Tono de Comunicación"
              description="Selecciona los atributos que guiarán su estilo al escribir."
            />
             <div className="space-y-4">
               <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Tonos Recomendados</h4>
                <div className="flex flex-wrap gap-2">
                  {RECOMMENDED_TONES.map((tone) => (
                    <Badge
                      key={tone}
                      variant={(formData.voice?.tone ?? []).includes(tone) ? 'default' : 'secondary'}
                      onClick={() => handleRecommendedToneClick(tone)}
                      className="cursor-pointer hover:bg-primary/80 transition-colors"
                    >
                      {tone}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                 <h4 className="text-sm font-medium text-muted-foreground mb-2">Tonos Definidos</h4>
                <div className="flex flex-wrap items-center gap-2 p-2 border rounded-md min-h-[40px]">
                  {(formData.voice?.tone ?? []).map((tone) => (
                    <Badge key={tone} variant="default" className="flex items-center gap-1">
                      {tone}
                      <button onClick={() => removeTone(tone)} className="rounded-full hover:bg-background/50">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                   <Input
                    ref={toneInputRef}
                    onKeyDown={handleToneKeyDown}
                    placeholder="Añadir tono..."
                    className="flex-1 bg-transparent border-none focus:ring-0 h-auto p-0"
                  />
                </div>
              </div>
            </div>
          </DashboardSection>
        </motion.div>

      </motion.div>
      {isModified && (
        <SettingsSaveFooter
          onSave={handleSave}
          onCancel={() => {
            setFormData(data)
            setIsModified(false)
          }}
          isLoading={isLoading}
        />
      )}
    </div>
  )
} 