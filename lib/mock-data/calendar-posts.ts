import { Post } from '@/lib/types';

export const mockPosts: Post[] = [
  {
    id: '1',
    content: 'La motivación te pone en marcha, el hábito te mantiene en el camino. #FitnessMotivation',
    status: 'published',
    platform: 'instagram',
    category: 'Motivación',
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&h=400&fit=crop&q=60',
    startTime: new Date('2025-06-16T09:00:00'),
    duration: 180, // 3 hours
    notes: 'Post para empezar la semana con energía.'
  },
  {
    id: '2',
    content: 'Borrador de una nueva rutina de piernas. #LegDay',
    status: 'draft',
    platform: 'facebook',
    category: 'Entrenamiento',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop&q=60',
    startTime: new Date('2025-06-18T10:00:00'),
    duration: 120, // 2 hours
    notes: 'Revisar la imagen antes de publicar.'
  },
  {
    id: '3',
    content: '¡Clase especial de HIIT este sábado! ¡Prepárense para sudar!',
    status: 'scheduled',
    platform: 'twitter',
    category: 'Evento',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&q=60',
    startTime: new Date('2025-06-21T07:00:00'),
    duration: 120, // 2 hours
    notes: 'Asegurarse de que el enlace de reserva esté activo.'
  },
  {
    id: '4',
    content: 'Idea para post: ¿Cómo afectan las horas de sueño a tu rendimiento en el gym?',
    status: 'idea',
    platform: 'instagram',
    category: 'Nutrición',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=400&fit=crop&q=60',
    startTime: new Date('2025-06-18T10:00:00'),
    duration: 120, // 2 hours
    notes: 'Investigar estudios recientes para respaldar el post.'
  },
  {
    id: '5',
    content: 'Recuperación activa: la clave para un progreso sostenible. Estiramientos y movilidad para el domingo.',
    status: 'scheduled',
    platform: 'facebook',
    category: 'Entrenamiento',
    image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=400&h=400&fit=crop&q=60',
    startTime: new Date('2025-06-22T12:00:00'),
    duration: 120, // 2 hours
    notes: 'Ideal para el día de descanso.'
  },
  {
    id: '6',
    content: 'Contenido para revisar. ¿Publicamos este meme el viernes?',
    status: 'awaiting-approval',
    platform: 'instagram',
    category: 'Promoción',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=400&fit=crop&q=60',
    startTime: new Date('2025-06-20T11:00:00'),
    duration: 120, // 2 hours
    notes: 'Pendiente de aprobación por el cliente.'
  },
]; 