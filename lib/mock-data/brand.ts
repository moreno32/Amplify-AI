import { BrandProfile } from '@/lib/types';

export const mockBrandProfile: BrandProfile = {
  id: "O2CW",
  name: "O2CW Boutique Gym",
  firstName: "Analía",
  lastName: "López",
  email: "analia.lopez@ejemplo.com",
  language: "es",
  role: "Fundadora & CEO",
  dob: "1988-07-15T00:00:00.000Z",
  country: "España",
  gender: "female",
  timezone: "Europe/Madrid",
  userDescription: 'Emprendedora apasionada por el fitness y el bienestar, con más de 10 años de experiencia en la industria. Mi misión es ayudar a las personas a transformar sus vidas a través del movimiento consciente y la nutrición inteligente.',
  companyName: "O2CW Boutique Gym",
  companyIndustry: "Salud y Bienestar",
  companyType: "Gimnasio",
  companySize: "2-10 empleados",
  companyWebsite: "https://o2cw.com",
  companyDescription: "Un gimnasio boutique enfocado en el empoderamiento femenino a través del fitness holístico.",
  targetAudience: "Mujeres (25-45)",
  core: {
    id: "data-_ZajlF3sQ",
    promise: {
      id: 'CORE::Promise::001',
      main: 'I LOVE ME',
      slogan: 'El catalizador de una profunda transformación interior, un viaje para redescubrir tu fuerza y decir con convicción.'
    },
    goldenCircle: {
      why: { title: "Por qué", content: "Creemos que cada mujer merece sentirse completa, fuerte y dueña de su historia." },
      how: { title: "Cómo", content: "A través de un enfoque holístico que fusiona fitness, comunidad y mentalidad." },
      what: { title: "Qué", content: "Ofrecemos clases boutique, coaching y una plataforma digital." }
    },
    purposeFramework: {
      problem: "La industria del fitness se enfoca en la estética punitiva.",
      importance: "Perpetúa la inseguridad y desconecta a las mujeres de su poder.",
      villain: "La cultura de la 'dieta' y la autoexigencia tóxica.",
      needs: "Una comunidad segura y herramientas para reprogramar la mentalidad.",
      victory: "Cuando cada miembro siente 'I LOVE ME' desde adentro.",
      superpower: "La Comunidad, donde la vulnerabilidad se convierte en fuerza."
    },
    archetypeMatrix: {
      primary: { name: "Amante", description: "Busca la conexión y la apreciación de la belleza." },
      secondary: { name: "Sabio", description: "Busca la verdad, el conocimiento y la sabiduría para entender el mundo." },
      tertiary: { name: "Héroe", description: "Busca probarse a sí mismo y dejar una huella." },
      all: [ { name: "Creador", description: "Tiene una visión del mundo" } ]
    },
    heroJourney: [
      { step: 1, title: "El Llamado", description: "Siente la necesidad de un cambio." },
      { step: 2, title: "El Mentor", description: "Descubre O2CW como una guía." },
      { step: 3, title: "La Transformación", description: "Transforma su cuerpo y auto-percepción." },
      { step: 4, title: "El Regalo", description: "Alcanza un estado de 'I LOVE ME'." }
    ],
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
      pillars: [
        { name: 'Motivación', description: 'Inspiración y refuerzo del mantra "I LOVE ME".' },
        { name: 'Educación', description: 'Tutoriales y guías sobre nuestro método.' },
        { name: 'Comunidad', description: 'Historias y testimonios de nuestras socias.' },
        { name: 'Well-Living', description: 'Consejos sobre bienestar integral.' },
      ]
    },
    aiCoachVerdict: {
        id: 'AI::CoachVerdict::001',
        title: 'Veredicto del Coach IA',
        content: "✅ Genoma asimilado. Soy Kairos. Mi directiva es generar contenido que emane del mantra 'I LOVE ME'."
    }
  },
  voice: {
    persona: {
      name: "La Mentora Apasionada",
      description: "Una voz que es a la vez experta y empática, como una coach de élite y la mejor amiga que te impulsa."
    },
    tone: ["Empoderador", "Cercano", "Educativo", "Sofisticado"],
    vocabulary: ['Santuario', 'Comunidad', 'Bienestar', 'Well-Living', 'Empoderar', 'Energía', 'I LOVE ME'],
    grammar: "Uso de la segunda persona (tú) para crear una conexión directa y personal."
  },
  visual: {
    colorPalette: [
      { color: '#D81B60', name: 'Magenta Vibrante', role: 'Primario', keywords: 'vibrant magenta, energetic pink, empowering' },
      { color: '#4A4A4A', name: 'Gris Carbón', role: 'Secundario', keywords: 'deep gray, strength, stability' },
      { color: '#F5F5F5', name: 'Blanco Lienzo', role: 'Fondo', keywords: 'clean, minimalist, space' },
      { color: '#8E24AA', name: 'Púrpura Profundo', role: 'Acento', keywords: 'deep purple, wisdom, luxury' },
    ],
    typography: {
      primary: { family: 'Inter', weight: '700', use: 'Títulos', provider: 'Google Fonts' },
      secondary: { family: 'Inter', weight: '400', use: 'Cuerpo de texto', provider: 'Google Fonts' },
    },
    logo: "/logos/logo-o2cw-full.svg",
    imageryStyle: "Imágenes auténticas y emotivas de mujeres, enfocadas en la fuerza y la alegría."
  },
  assets: {
    logos: [
      { name: 'Logo Completo O2CW', url: '/logos/logo-o2cw-full.svg', type: 'Logo' },
      { name: 'Isotipo O2CW', url: '/logos/logo-o2cw-isotype.svg', type: 'Logo' }
    ],
    photos: [
      { name: 'Mujer fuerte y concentrada', url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f', type: 'Servicio' },
      { name: 'Interior de gimnasio boutique', url: 'https://images.unsplash.com/photo-1540496905036-5937c10647cc', type: 'Estilo' },
      { name: 'Grupo de mujeres sonriendo', url: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5', type: 'Equipo' },
      { name: 'Primer plano de kettlebell', url: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e', type: 'Servicio' },
      { name: 'Flatlay saludable', url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd', type: 'Producto' },
      { name: 'Mujer meditando', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b', type: 'Estilo' }
    ],
    videos: [
      // { name: "Video Tour", url: "/videos/tour.mp4", type: "Servicio" } // Example
    ]
  },
}; 