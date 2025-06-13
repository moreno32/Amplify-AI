import { Post } from '@/lib/types';

export const mockPosts: Post[] = [
  {
    id: 'post_1',
    dayOfWeek: 'Lunes',
    date: '2024-10-21',
    time: '09:00',
    content: 'Empezamos la semana con energía. ¿Listos para la clase de Vinyasa de las 18:00?',
    status: 'published',
    platform: 'instagram',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop&q=80',
    isOptimal: true,
    aiSuggestion: "Publicado a las 09:00h para captar la atención de la mañana."
  },
  {
    id: 'post_2',
    dayOfWeek: 'Martes',
    date: '2024-10-22',
    time: '18:00',
    content: 'Idea: Reel sobre 3 posturas para mejorar la flexibilidad de la espalda.',
    status: 'idea',
    platform: 'instagram',
    isOptimal: true,
    aiSuggestion: "Las 18:00h es una hora pico de engagement para tu audiencia."
  },
  {
    id: 'post_3',
    dayOfWeek: 'Miércoles',
    date: '2024-10-23',
    time: '12:00',
    content:
      'Clase especial de Hatha Yoga este viernes. ¡Plazas limitadas!',
    status: 'scheduled',
    platform: 'facebook',
    imageUrl: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=400&fit=crop&q=80',
    isOptimal: false,
  },
  {
    id: 'post_4',
    dayOfWeek: 'Jueves',
    date: '2024-10-24',
    time: '09:00',
    content: 'Recordatorio: La constancia es la clave del progreso. #YogaLife',
    status: 'draft',
    platform: 'instagram',
    imageUrl: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=400&h=400&fit=crop&q=80',
    isOptimal: true,
    aiSuggestion: "Publicar por la mañana refuerza el hábito en tus seguidoras."
  },
]; 