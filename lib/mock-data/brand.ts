import { BrandProfile } from '@/lib/types';

export const mockBrandProfile: BrandProfile = {
  name: "O2CW Boutique Gym",
  core: {
    promise: {
      id: 'CORE::Promise::001',
      title: 'Promesa de Marca',
      content: 'Nuestro mantra y promesa. Es el sentimiento que cada mujer debe experimentar al interactuar con la marca: "I LOVE ME".'
    },
    narrativeArchetypes: {
      id: 'CORE::Narrative::001',
      title: 'Arquetipos Narrativos',
      content: 'Primario: El Amante (Pasión, comunidad). Secundario: El Sabio (Guía experta, datos).',
      scores: [
        { subject: 'Amante', value: 90, fullMark: 100 },
        { subject: 'Sabio', value: 75, fullMark: 100 },
        { subject: 'Cuidador', value: 40, fullMark: 100 },
        { subject: 'Creador', value: 30, fullMark: 100 },
        { subject: 'Gobernante', value: 20, fullMark: 100 },
      ]
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
    items: [
      { id: 'ASSET::Logo::001', url: '/logos/logo-o2cw-full.svg', alt: 'Logo Completo O2CW', category: 'Logo' },
      { id: 'ASSET::Logo::002', url: '/logos/logo-o2cw-isotype.svg', alt: 'Isotipo O2CW', category: 'Logo' },
      { id: 'ASSET::Photo::001', url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1975&auto=format&fit=crop', alt: 'Mujer fuerte y concentrada en un boutique gym', category: 'Servicio' },
      { id: 'ASSET::Photo::002', url: 'https://images.unsplash.com/photo-1540496905036-5937c10647cc?q=80&w=2070&auto=format&fit=crop', alt: 'Interior de un gimnasio boutique con luces de neón magenta', category: 'Estilo' },
      { id: 'ASSET::Photo::003', url: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1974&auto=format&fit=crop', alt: 'Grupo de mujeres sonriendo y apoyándose en clase', category: 'Equipo' },
      { id: 'ASSET::Photo::004', url: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop', alt: 'Primer plano de una mujer levantando una kettlebell con determinación', category: 'Servicio' },
      { id: 'ASSET::Photo::005', url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop', alt: 'Flatlay con equipamiento de fitness y comida saludable', category: 'Producto' },
      { id: 'ASSET::Photo::006', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto=format&fit=crop', alt: 'Mujer meditando después de un entrenamiento intenso', category: 'Estilo' },
    ],
  },
}; 