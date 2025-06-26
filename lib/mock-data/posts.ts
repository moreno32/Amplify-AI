import { Post } from '@/lib/types';

export const mockPosts: Post[] = [
  {
    id: 'b7a3c3d8-1b3e-4e4a-9a0a-4c2d7f1b3e7c',
    content: 'La motivación te pone en marcha, el hábito te mantiene en marcha. ¡Feliz Lunes!',
    status: 'published',
    category: 'Motivación',
    platform: 'instagram',
    imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&h=800&fit=crop&q=60',
    startTime: new Date('2024-06-24T09:00:00'),
    duration: 180,
    metrics: { likes: 1256, comments: 112, reach: 15234 }
  },
  {
    id: 'c8a4d4e9-2c4f-5f5b-0b1b-5d3e8g2c4f8d',
    content: 'Idea para un Reel: 3 ejercicios clave con pesas rusas para fortalecer el core.',
    status: 'idea',
    category: 'Entrenamiento',
    platform: 'instagram',
    imageUrl: 'https://images.unsplash.com/photo-1581009137052-c61a4962b712?w=500&h=500&fit=crop&q=60',
    startTime: new Date('2024-06-25T18:00:00'),
    duration: 120,
    metrics: { likes: 0, comments: 0, reach: 0 }
  },
  {
    id: 'd9b5e5f0-3d5g-6g6c-1c2c-6e4f9h3d5g9e',
    content: '¡Atención, guerreras! Clase especial de HIIT este sábado a las 11:00. ¡Plazas limitadas!',
    status: 'scheduled',
    category: 'Evento',
    platform: 'instagram',
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=500&fit=crop&q=60',
    startTime: new Date('2024-06-29T11:00:00'),
    duration: 240,
    metrics: { likes: 0, comments: 0, reach: 0 }
  },
  {
    id: 'e0c6f6g1-4e6h-7h7d-2d3d-7f5g0i4e6h0f',
    content: 'Recordatorio: El descanso es tan importante como el entrenamiento. ¿Cuántas horas has dormido esta noche?',
    status: 'draft',
    category: 'Motivación',
    platform: 'instagram',
    imageUrl: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=500&h=500&fit=crop&q=60',
    startTime: new Date('2024-06-26T09:00:00'),
    duration: 180,
    metrics: { likes: 0, comments: 0, reach: 0 }
  },
  {
    id: 'f1d7g7h2-5f7i-8i8e-3e4e-8g6h1j5f7i1g',
    content: 'Este es un segundo post para probar el apilamiento. El descanso es clave.',
    status: 'draft',
    category: 'Promoción',
    platform: 'facebook',
    imageUrl: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=500&h=500&fit=crop&q=60',
    startTime: new Date('2024-06-26T10:00:00'),
    duration: 120,
    metrics: { likes: 0, comments: 0, reach: 0 }
  },
  {
    id: 'g2e8h8i3-6g8j-9j9f-4f5f-9h7i2k6g8j2h',
    content: 'Viernes de #FlexFriday. Comparte tu progreso de la semana y etiqueta a un amigo para motivarlo.',
    status: 'published',
    category: 'Entrenamiento',
    platform: 'instagram',
    imageUrl: 'https://images.unsplash.com/photo-1623874514711-0f321325f318?w=500&h=500&fit=crop&q=60',
    startTime: new Date('2024-06-28T19:00:00'),
    duration: 180,
    metrics: { likes: 987, comments: 76, reach: 11200 }
  },
];
