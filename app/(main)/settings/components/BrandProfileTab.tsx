'use client'

import { useState, useRef, KeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import {
  BrainCircuit,
  Lightbulb,
  Mic,
  Sparkles,
  X,
} from 'lucide-react'
import { DashboardSection } from '@/components/shared/DashboardSection'
import { BlockHeader } from '@/components/shared/BlockHeader'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { SettingsSaveFooter } from '@/components/shared/SettingsSaveFooter'

const RECOMMENDED_ARCHETYPES = [
  'El Educador (Claro y experto)',
  'El Conector (Cercano y comunitario)',
  'El Entretenedor (Divertido y amigable)',
  'El Visionario (Inspirador y vanguardista)',
  'El Protector (Confiable y seguro)',
  'El Provocador (Audaz y directo)',
]

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

export function BrandProfileTab() {
  const [agentName, setAgentName] = useState('AmplifyBot')
  const [companyContext, setCompanyContext] = useState('Amplify-AI es una plataforma SaaS B2B que utiliza IA para ayudar a las marcas a definir su estrategia de contenido, generar posts y analizar su rendimiento. Nuestro público objetivo son startups tecnológicas, agencias de marketing y marcas personales que buscan optimizar su presencia en redes sociales.')
  const [selectedArchetypes, setSelectedArchetypes] = useState<string[]>(['El Visionario (Inspirador y vanguardista)', 'El Educador (Claro y experto)'])
  const [selectedTones, setSelectedTones] = useState<string[]>(['Profesional', 'Entusiasta', 'Directo'])
  const [isLoading, setIsLoading] = useState(false)
  const [isModified, setIsModified] = useState(false)
  const archetypeInputRef = useRef<HTMLInputElement>(null)
  const toneInputRef = useRef<HTMLInputElement>(null)

  const handleStateChange = <T,>(setter: (value: T) => void) => (value: T) => {
    setter(value);
    if (!isModified) setIsModified(true);
  };
  
  const setAgentNameHandler = handleStateChange(setAgentName);
  const setCompanyContextHandler = handleStateChange(setCompanyContext);

  // Archetype Handlers
  const addArchetype = (archetype: string) => {
    const trimmed = archetype.trim()
    if (trimmed && !selectedArchetypes.includes(trimmed)) {
      setSelectedArchetypes([...selectedArchetypes, trimmed])
      if (!isModified) setIsModified(true);
    }
  }
  const removeArchetype = (archetype: string) => {
    setSelectedArchetypes(selectedArchetypes.filter((a) => a !== archetype))
    if (!isModified) setIsModified(true);
  }
  const handleArchetypeKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      addArchetype(event.currentTarget.value)
      event.currentTarget.value = ''
    }
  }
  const handleRecommendedArchetypeClick = (archetype: string) => {
    if (selectedArchetypes.includes(archetype)) removeArchetype(archetype)
    else addArchetype(archetype)
  }

  // Tone Handlers
  const addTone = (tone: string) => {
    const trimmed = tone.trim()
    if (trimmed && !selectedTones.includes(trimmed)) {
      setSelectedTones([...selectedTones, trimmed])
      if (!isModified) setIsModified(true);
    }
  }
  const removeTone = (tone: string) => {
    setSelectedTones(selectedTones.filter((t) => t !== tone))
    if (!isModified) setIsModified(true);
  }
  const handleToneKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      addTone(event.currentTarget.value)
      event.currentTarget.value = ''
    }
  }
  const handleRecommendedToneClick = (tone: string) => {
    if (selectedTones.includes(tone)) removeTone(tone)
    else addTone(tone)
  }

  const handleSave = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsModified(false)
      toast.success('Personalidad del Agente IA guardada')
    }, 1500)
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
              value={agentName}
              onChange={(e) => setAgentNameHandler(e.target.value)}
              placeholder="Ej: AmplifyBot, Kai, Sparky..."
            />
          </DashboardSection>
        </motion.div>

        <motion.div variants={itemVariants}>
          <DashboardSection title="Contexto Empresarial">
            <BlockHeader
              icon={BrainCircuit}
              title="Contexto Empresarial"
              description="Dale a la IA información clave sobre tu negocio y metas."
            />
             <div className="space-y-2">
              <Textarea
                value={companyContext}
                onChange={(e) => setCompanyContextHandler(e.target.value)}
                placeholder="Ej: Somos una marca de moda sostenible B2C. Buscamos conectar con un público joven y consciente..."
                rows={4}
                maxLength={MAX_CONTEXT_LENGTH}
              />
               <p className="text-xs text-right text-muted-foreground">{companyContext.length}/{MAX_CONTEXT_LENGTH}</p>
            </div>
          </DashboardSection>
        </motion.div>

        <motion.div variants={itemVariants}>
          <DashboardSection title="Personalidad del Agente">
            <BlockHeader
              icon={Lightbulb}
              title="Personalidad del Agente"
              description="Define su arquetipo para darle un carácter consistente."
            />
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Arquetipos Recomendados</h4>
                <div className="flex flex-wrap gap-2">
                  {RECOMMENDED_ARCHETYPES.map((archetype) => (
                    <Badge
                      key={archetype}
                      variant={selectedArchetypes.includes(archetype) ? 'default' : 'secondary'}
                      onClick={() => handleRecommendedArchetypeClick(archetype)}
                      className="cursor-pointer hover:bg-primary/80 transition-colors"
                    >
                      {archetype}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                 <h4 className="text-sm font-medium text-muted-foreground mb-2">Arquetipos Definidos</h4>
                <div className="flex flex-wrap items-center gap-2 p-2 border rounded-md min-h-[40px]">
                  {selectedArchetypes.map((archetype) => (
                    <Badge key={archetype} variant="default" className="flex items-center gap-1">
                      {archetype}
                      <button onClick={() => removeArchetype(archetype)} className="rounded-full hover:bg-background/50">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  <Input
                    ref={archetypeInputRef}
                    onKeyDown={handleArchetypeKeyDown}
                    placeholder="Añadir arquetipo..."
                    className="flex-1 bg-transparent border-none focus:ring-0 h-auto p-0"
                  />
                </div>
              </div>
            </div>
          </DashboardSection>
        </motion.div>

        <motion.div variants={itemVariants}>
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
                      variant={selectedTones.includes(tone) ? 'default' : 'secondary'}
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
                  {selectedTones.map((tone) => (
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
      
      <SettingsSaveFooter
        isLoading={isLoading}
        isModified={isModified}
        onSave={handleSave}
        saveText="Guardar Personalidad"
      />
    </div>
  )
} 