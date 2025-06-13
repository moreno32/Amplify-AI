import { DashboardData } from '@/lib/types';
import { mockPosts } from './posts';

export const mockDashboardData: DashboardData = {
  performanceMetrics: [
    {
      id: 'metric-1',
      title: 'Tasa de Engagement',
      value: '4.5%',
      change: 0.5,
      changeType: 'increase',
    },
    {
      id: 'metric-2',
      title: 'Alcance Total (7d)',
      value: '12,345',
      change: 12.1,
      changeType: 'increase',
    },
    {
      id: 'metric-3',
      title: 'Posts Programados',
      value: '12 este mes',
      change: 2,
      changeType: 'increase',
      link: { href: '/calendar', label: 'Ver Calendario' },
    },
    {
      id: 'metric-4',
      title: 'Mensajes Pendientes',
      value: '3',
      change: 1,
      changeType: 'decrease',
      link: { href: '/inbox', label: 'Ir al Inbox' },
    },
  ],
  recommendedActions: [
    {
      id: 'action-1',
      icon: 'Rocket',
      title: 'Lanzar Campaña de Crecimiento',
      description:
        'Hemos detectado una oportunidad para aumentar tu visibilidad esta semana. ¿Creamos una campaña optimizada?',
      buttonLabel: 'Empezar con un clic',
    },
    {
      id: 'action-2',
      icon: 'CheckCircle',
      title: 'Revisar Contenido Generado',
      description: 'Hay 4 nuevos posts listos para tu aprobación.',
      buttonLabel: 'Revisar ahora',
    },
  ],
  aiCoachInsights: [
    {
      id: 'insight-1',
      insight:
        'Tu competidor @rival ha bajado su frecuencia de publicación. ¡Es el momento perfecto para destacar!',
    },
    {
      id: 'insight-2',
      insight:
        'El tema de "yoga para principiantes" está ganando tracción en tu sector. ¿Generamos un post sobre ello?',
      action: { href: '#', label: 'Crear Post' },
    },
    {
      id: 'insight-3',
      insight:
        'Hemos aprendido que los domingos a las 18:00h es tu mejor hora para publicar. Tu calendario ya está actualizado.',
    },
  ],
  upcomingPosts: mockPosts.filter(p => p.status === 'scheduled' || p.status === 'draft').slice(0, 3),
}; 