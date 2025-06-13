import { Post } from '@/lib/types';

export const mockPosts: Post[] = [
  {
    id: 'post_1',
    date: '2024-10-21',
    time: '09:00',
    content: 'Empezamos la semana con energía. ¿Listos para la clase de Vinyasa?',
    status: 'published',
    platform: 'instagram',
    imageUrl: '/placeholders/post1.png',
  },
  {
    id: 'post_2',
    date: '2024-10-22',
    time: '18:00',
    content: 'Idea: Reel sobre 3 posturas para mejorar la flexibilidad.',
    status: 'idea',
    platform: 'instagram',
  },
  {
    id: 'post_3',
    date: '2024-10-23',
    time: '12:00',
    content:
      'Clase especial de Hatha Yoga este viernes. ¡Plazas limitadas!',
    status: 'scheduled',
    platform: 'facebook',
    imageUrl: '/placeholders/post2.png',
  },
  {
    id: 'post_4',
    date: '2024-10-24',
    time: '09:00',
    content: 'Recordatorio: La constancia es la clave del progreso. #YogaLife',
    status: 'draft',
    platform: 'instagram',
    imageUrl: '/placeholders/post3.png',
  },
]; 