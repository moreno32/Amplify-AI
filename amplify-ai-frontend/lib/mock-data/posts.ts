import { Post } from '@/lib/types';

const currentYear = new Date().getFullYear();

export const mockPosts: Post[] = [
  {
    id: 'POST_001',
    dayOfWeek: 'Lunes',
    date: `${currentYear}-10-21`,
    time: '09:00',
    content: 'La motivación te pone en marcha, el hábito te mantiene en movimiento. ¡A por una nueva semana en O2CW! #O2CWFitness #GymLife',
    status: 'published',
    platform: 'instagram',
    imageUrl: 'https://picsum.photos/400/400?random=22',
    isOptimal: true,
    aiSuggestion: 'Excelente frase para empezar la semana. El uso de hashtags de marca es un plus.'
  },
  {
    id: 'POST_002',
    dayOfWeek: 'Martes',
    date: `${currentYear}-10-22`,
    time: '18:00',
    content: 'Idea para un Reel: 3 ejercicios clave con kettlebell para un entrenamiento de cuerpo completo. #KettlebellWorkout #O2CW',
    status: 'idea',
    platform: 'instagram',
    imageUrl: 'https://picsum.photos/400/400?random=23',
    isOptimal: true,
    aiSuggestion: 'Contenido educativo y visual. Perfecto para Reels.'
  },
  {
    id: 'POST_003',
    dayOfWeek: 'Miércoles',
    date: `${currentYear}-10-23`,
    time: '12:00',
    content: '¡Atención, guerreras! Clase especial de HIIT este viernes en nuestro Santuario. Plazas limitadas para las Fundadoras. #O2CW #Workout',
    status: 'scheduled',
    platform: 'facebook',
    imageUrl: 'https://picsum.photos/400/400?random=24',
    isOptimal: true,
    aiSuggestion: 'Genera urgencia y exclusividad. Bien jugado.'
  },
  {
    id: 'POST_004',
    dayOfWeek: 'Jueves',
    date: `${currentYear}-10-24`,
    time: '09:00',
    content: 'Recordatorio: El descanso es tan importante como el entrenamiento. Dale a tu cuerpo el tiempo que necesita para recuperarse. #SelfCare #O2CW',
    status: 'draft',
    platform: 'instagram',
    imageUrl: 'https://picsum.photos/400/400?random=25',
    isOptimal: false,
    aiSuggestion: 'Buen recordatorio sobre el bienestar integral. Podrías añadir una imagen más relajante.'
  }
]; 