import { BrandProfile } from '@/lib/types';

export const mockBrandProfile: BrandProfile = {
  core: {
    promise: {
      id: 'CORE::Promise::001',
      title: 'Promesa de Marca',
      content:
        "Guiar a las socias en su viaje de autoaceptación a través del yoga, convirtiendo el estudio en un 'Santuario'.",
    },
    narrativeArchetypes: {
      id: 'CORE::Narrative::001',
      title: 'Arquetipos Narrativos',
      content: 'Principal: El Amante. Secundario: El Sabio.',
    },
    mission: {
      id: 'CORE::Mission::001',
      title: 'Misión',
      content: 'Empoderar a las mujeres para que encuentren fuerza y paz interior a través de la práctica consciente del yoga.'
    },
    vision: {
      id: 'CORE::Vision::001',
      title: 'Visión',
      content: 'Ser el estudio de yoga de referencia para el bienestar integral de la mujer en la comunidad.'
    },
    contentPillars: {
      id: 'EXEC::ContentCalendar::001',
      title: 'Pilares de Contenido',
      pillars: [
        { name: 'Motivación', icon: 'Sparkles', description: 'Frases y reflexiones para empezar la semana con energía.' },
        { name: 'Educación', icon: 'BookOpen', description: 'Tutoriales y guías sobre posturas y técnicas de respiración.' },
        { name: 'Comunidad', icon: 'Users', description: 'Historias y testimonios de nuestras socias.' },
        { name: 'Bienestar', icon: 'Heart', description: 'Consejos sobre nutrición, mindfulness y autocuidado.' },
      ]
    },
    aiCoachVerdict: {
        id: 'AI::CoachVerdict::001',
        title: 'Veredicto del Coach IA',
        content: "✅ He asimilado que tu marca es un 'Santuario' que usa la narrativa del 'Amante' para guiar a las socias. Mi directiva principal es generar contenido que siempre refuerce el mantra de autoaceptación y bienestar."
    }
  },
  voice: {
    tonePrinciples: [
      { id: 'VOICE::Tone::001', principle: 'Inclusivo y Empático', description: 'Nos comunicamos con calidez, creando un espacio seguro y sin juicios.' },
      { id: 'VOICE::Tone::002', principle: 'Inspirador y Positivo', description: 'Elevamos el ánimo y motivamos, enfocándonos en el progreso, no en la perfección.' },
      { id: 'VOICE::Tone::003', principle: 'Claro y Accesible', description: 'Evitamos la jerga compleja del yoga, haciendo la práctica comprensible para todas.' },
    ],
    vocabulary: {
      do: ['Santuario', 'Comunidad', 'Bienestar', 'Consciente', 'Flujo', 'Energía'],
      dont: ['Workout', 'Ejercicio', 'Quemar calorías', 'Rendimiento', 'Exigente'],
    },
    tonalSpectrum: {
        id: 'VOICE::ToneSpectrum::001',
        title: 'Espectro Tonal',
        spectrum: [
            { tone: 'Empoderador', percentage: 70, color: 'bg-green-500' },
            { tone: 'Educativo', percentage: 20, color: 'bg-blue-500' },
            { tone: 'Sofisticado', percentage: 10, color: 'bg-purple-500' },
        ]
    }
  },
  visual: {
    colorPalette: [
      { color: '#4A5568', name: 'Gris Pizarra', role: 'Primario', iaKeywords: ['Calma', 'Estabilidad', 'Fuerza'] },
      { color: '#A0AEC0', name: 'Gris Niebla', role: 'Secundario', iaKeywords: ['Suavidad', 'Soporte', 'Equilibrio'] },
      { color: '#F7FAFC', name: 'Blanco Nube', role: 'Fondo', iaKeywords: ['Limpieza', 'Paz', 'Espacio'] },
      { color: '#38A169', name: 'Verde Sereno', role: 'Acento', iaKeywords: ['Naturaleza', 'Crecimiento', 'Vida'] },
    ],
    typography: {
      primary: {
        name: 'Montserrat',
        weight: '600',
        role: 'Títulos y Encabezados',
        provider: 'Google Fonts'
      },
      secondary: {
        name: 'Lato',
        weight: '400',
        role: 'Cuerpo de texto',
        provider: 'Google Fonts'
      },
    }
  },
  assets: {
    logos: [
      { id: 'ASSET::Logo::001', url: '/logos/logo-primary.svg', name: 'Logo Principal' },
      { id: 'ASSET::Logo::002', url: '/logos/logo-isotype.svg', name: 'Isotipo' },
    ],
    brandPhotos: [
        { id: 'ASSET::Photo::001', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?fit=crop&w=500&q=80', alt: 'Mujer practicando yoga en la playa al amanecer' },
        { id: 'ASSET::Photo::002', url: 'https://images.unsplash.com/photo-1599905292414-8e340705fb49?fit=crop&w=500&q=80', alt: 'Detalle de manos en posición de meditación' },
        { id: 'ASSET::Photo::003', url: 'https://images.unsplash.com/photo-1575052814086-4989e741e54e?fit=crop&w=500&q=80', alt: 'Grupo de mujeres en una clase de yoga' },
        { id: 'ASSET::Photo::004', url: 'https://images.unsplash.com/photo-1506126613408-4e65f2b4b4d4?fit=crop&w=500&q=80', alt: 'Persona meditando frente a una ventana grande' },
        { id: 'ASSET::Photo::005', url: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?fit=crop&w=500&q=80', alt: 'Esterilla de yoga y accesorios en el estudio' },
        { id: 'ASSET::Photo::006', url: 'https://images.unsplash.com/photo-1593164842264-854604db2260?fit=crop&w=500&q=80', alt: 'Mujer sonriendo mientras sostiene una postura de yoga' },
    ],
  },
}; 