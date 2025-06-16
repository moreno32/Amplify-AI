import { Post } from '@/lib/types';

export const mockPosts: Post[] = [
  {
    id: 'post-1',
    date: '2024-06-17',
    startTime: 9,
    duration: 3,
    status: 'published',
    platform: 'instagram',
    content: 'La motivación te pone en marcha, el hábito te mantiene en marcha.',
    imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&h=800&fit=crop&q=60'
  },
  {
    id: 'post-2',
    date: '2024-06-18',
    startTime: 18,
    duration: 2,
    status: 'idea',
    platform: 'instagram',
    content: 'Idea para un Reel: 3 ejercicios clave con pesas rusas para fortalecer el core.',
    imageUrl: 'https://images.unsplash.com/photo-1581009137052-c61a4962b712?w=500&h=500&fit=crop&q=60'
  },
  {
    id: 'post-3',
    date: '2024-06-19',
    startTime: 12,
    duration: 4,
    status: 'scheduled',
    platform: 'instagram',
    content: '¡Atención, guerreras! Clase especial de HIIT este sábado a las 11:00. ¡Plazas limitadas!',
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=500&fit=crop&q=60'
  },
  {
    id: 'post-4',
    date: '2024-06-20',
    startTime: 9,
    duration: 3,
    status: 'draft',
    platform: 'instagram',
    content: 'Recordatorio: El descanso es tan importante como el entrenamiento. ¿Cuántas horas has dormido esta noche?',
    imageUrl: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=500&h=500&fit=crop&q=60'
  },
   {
    id: 'post-5',
    date: '2024-06-20',
    startTime: 9,
    duration: 2,
    status: 'draft',
    platform: 'facebook',
    content: 'Este es un segundo post para probar el apilamiento. El descanso es clave.',
    imageUrl: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=500&h=500&fit=crop&q=60'
  },
  {
    id: 'post-6',
    date: '2024-06-21',
    startTime: 19,
    duration: 3,
    status: 'idea',
    platform: 'instagram',
    content: 'Viernes de #FlexFriday. Comparte tu progreso de la semana y etiqueta a un amigo para motivarlo.',
    imageUrl: 'https://images.unsplash.com/photo-1623874514711-0f321325f318?w=500&h=500&fit=crop&q=60'
  }
]; 