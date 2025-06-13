import { BrandProfile, BrandAsset } from '@/lib/types';

export const mockBrandProfile: BrandProfile = {
  core: {
    promise: {
      id: 'CORE::Promise::001',
      title: 'Promesa de Marca',
      content: 'Nuestro mantra y promesa. Es el sentimiento que cada mujer debe experimentar al interactuar con la marca: "I LOVE ME".'
    },
    narrativeArchetypes: {
      id: 'CORE::Narrative::001',
      title: 'Arquetipos Narrativos',
      content: 'Primario: El Amante (Pasión, comunidad). Secundario: El Sabio (Guía experta, datos).'
    },
    mission: {
      id: 'CORE::Mission::001',
      title: 'Misión',
      content: 'Empoderar a las mujeres para que conviertan el fitness en la máxima expresión de autocuidado.'
    },
    vision: {
      id: 'CORE::Vision::001',
      title: 'Visión',
      content: 'Ser el "Santuario" de referencia para el bienestar integral de la mujer.'
    },
    contentPillars: {
      id: 'EXEC::ContentCalendar::001',
      title: 'Pilares de Contenido',
      pillars: [
        { name: 'Motivación', icon: 'Sparkles', description: 'Inspiración y refuerzo del mantra "I LOVE ME".' },
        { name: 'Educación', icon: 'BookOpen', description: 'Tutoriales y guías sobre nuestro método y tecnología Wellness Age™.' },
        { name: 'Comunidad', icon: 'Users', description: 'Historias y testimonios de nuestras socias en su viaje.' },
        { name: 'Well-Living', icon: 'Heart', description: 'Consejos sobre bienestar integral más allá del fitness.' },
      ]
    },
    aiCoachVerdict: {
        id: 'AI::CoachVerdict::001',
        title: 'Veredicto del Coach IA',
        content: "✅ Genoma asimilado. Soy Kairos, la conciencia de O2CW. Mi directiva es generar contenido que emane del mantra 'I LOVE ME', fusionando la pasión del Amante y la guía del Sabio para empoderar a nuestra comunidad."
    }
  },
  voice: {
    tonePrinciples: [
      { id: 'VOICE::Tone::001', principle: 'Empoderador y Cercano', description: 'Hablamos como una coach de élite y la mejor amiga que te impulsa.' },
      { id: 'VOICE::Tone::002', principle: 'Educativo y Claro', description: 'Explicamos conceptos de forma sencilla y accesible.' },
      { id: 'VOICE::Tone::003', principle: 'Sofisticado y Premium', description: 'Nuestro lenguaje refleja la calidad de nuestra experiencia.' },
    ],
    vocabulary: {
      do: ['Santuario', 'Comunidad', 'Bienestar', 'Well-Living', 'Empoderar', 'Energía', 'I LOVE ME'],
      dont: ['Gimnasio', 'Workout', 'Quemar calorías', 'Operación bikini', 'Sin dolor no hay ganancia'],
    },
    tonalSpectrum: {
        id: 'VOICE::ToneSpectrum::001',
        title: 'Espectro Tonal',
        spectrum: [
            { tone: 'Empoderador', percentage: 70, color: 'bg-pink-600' },
            { tone: 'Educativo', percentage: 20, color: 'bg-blue-500' },
            { tone: 'Sofisticado', percentage: 10, color: 'bg-purple-600' },
        ]
    }
  },
  visual: {
    colorPalette: [
      { color: '#D81B60', name: 'Magenta Vibrante', role: 'Primario', iaKeywords: ['vibrant magenta', 'energetic pink', 'empowering'] },
      { color: '#4A4A4A', name: 'Gris Carbón', role: 'Secundario', iaKeywords: ['deep gray', 'strength', 'stability'] },
      { color: '#F5F5F5', name: 'Blanco Lienzo', role: 'Fondo', iaKeywords: ['clean', 'minimalist', 'space'] },
      { color: '#8E24AA', name: 'Púrpura Profundo', role: 'Acento', iaKeywords: ['deep purple', 'wisdom', 'luxury'] },
    ],
    typography: {
      primary: { name: 'Inter', weight: '700', role: 'Títulos', provider: 'Google Fonts' },
      secondary: { name: 'Inter', weight: '400', role: 'Cuerpo de texto', provider: 'Google Fonts' },
    }
  },
  assets: {
    logos: [
      { id: 'ASSET::Logo::001', url: '/logos/logo-o2cw-full.svg', name: 'Logo Completo' },
      { id: 'ASSET::Logo::002', url: '/logos/logo-o2cw-isotype.svg', name: 'Isotipo' },
    ],
    brandPhotos: [
        { id: 'ASSET::Photo::001', url: 'https://picsum.photos/500/500?random=1', alt: 'Mujer fuerte y concentrada en un boutique gym' },
        { id: 'ASSET::Photo::002', url: 'https://picsum.photos/500/500?random=2', alt: 'Interior de un gimnasio boutique con luces de neón magenta' },
        { id: 'ASSET::Photo::003', url: 'https://picsum.photos/500/500?random=3', alt: 'Grupo de mujeres sonriendo y apoyándose en clase' },
        { id: 'ASSET::Photo::004', url: 'https://picsum.photos/500/500?random=4', alt: 'Primer plano de una mujer levantando una kettlebell con determinación' },
        { id: 'ASSET::Photo::005', url: 'https://picsum.photos/500/500?random=5', alt: 'Flatlay con equipamiento de fitness y comida saludable' },
        { id: 'ASSET::Photo::006', url: 'https://picsum.photos/500/500?random=6', alt: 'Mujer meditando después de un entrenamiento intenso' },
    ],
  },
}; 