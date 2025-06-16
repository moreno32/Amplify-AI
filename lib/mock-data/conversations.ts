import { Conversation } from '@/lib/types';

export const mockConversations: Conversation[] = [
  {
    id: 'conv_1',
    contactName: 'Valeria Luna',
    contactAvatarUrl: 'https://picsum.photos/100/100?random=7',
    lastMessage: 'Hola! Me interesa la oferta de fundadoras. ¿Aún está disponible?',
    timestamp: '2024-10-23T10:30:00.000Z',
    status: 'open',
    channel: 'instagram',
    messages: [
      {
        id: 'msg_1',
        sender: 'contact',
        content: 'Hola! Me interesa la oferta de fundadoras. ¿Aún está disponible?',
        timestamp: '2024-10-23T10:30:00.000Z',
      },
    ],
  },
  {
    id: 'conv_2',
    contactName: 'David Soler',
    contactAvatarUrl: 'https://picsum.photos/100/100?random=8',
    lastMessage: '¡Gracias por la clase de hoy! Increíble la energía.',
    timestamp: '2024-10-22T15:45:00.000Z',
    status: 'resolved',
    channel: 'facebook',
    messages: [
      {
        id: 'msg_2',
        sender: 'contact',
        content: 'Quería saber si tenéis entrenadores personales.',
        timestamp: '2024-10-22T15:40:00.000Z',
      },
      {
        id: 'msg_3',
        sender: 'user',
        content: '¡Hola David! Sí, todos nuestros coaches ofrecen sesiones 1 a 1. Te ayudarán a crear un plan personalizado.',
        timestamp: '2024-10-22T15:42:00.000Z',
      },
      {
        id: 'msg_4',
        sender: 'contact',
        content: '¡Gracias por la clase de hoy! Increíble la energía.',
        timestamp: '2024-10-22T15:45:00.000Z',
      },
    ],
  },
  {
    id: 'conv_3',
    contactName: 'Isabella Rossi',
    contactAvatarUrl: 'https://picsum.photos/100/100?random=9',
    lastMessage: '¿Puedo reservar una visita al Santuario antes de inscribirme?',
    timestamp: '2024-10-23T11:05:00.000Z',
    status: 'unassigned',
    channel: 'whatsapp',
    messages: [
      {
        id: 'msg_5',
        sender: 'contact',
        content: '¿Puedo reservar una visita al Santuario antes de inscribirme?',
        timestamp: '2024-10-23T11:05:00.000Z',
      },
    ],
  },
]; 