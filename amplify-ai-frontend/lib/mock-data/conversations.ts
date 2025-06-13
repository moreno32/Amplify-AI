import { Conversation } from '@/lib/types';

export const mockConversations: Conversation[] = [
  {
    id: 'conv_1',
    contactName: 'Laura Gomez',
    contactAvatarUrl: '/avatars/09.png',
    lastMessage: '¡Hola! ¿Tenéis clases de prueba?',
    timestamp: '2024-10-23T10:30:00.000Z',
    status: 'open',
    channel: 'instagram',
    messages: [
      {
        id: 'msg_1',
        sender: 'contact',
        content: '¡Hola! ¿Tenéis clases de prueba?',
        timestamp: '2024-10-23T10:30:00.000Z',
      },
    ],
  },
  {
    id: 'conv_2',
    contactName: 'Carlos Diaz',
    contactAvatarUrl: '/avatars/10.png',
    lastMessage: 'Gracias por la ayuda, ¡sois geniales!',
    timestamp: '2024-10-22T15:45:00.000Z',
    status: 'resolved',
    channel: 'facebook',
    messages: [
      {
        id: 'msg_2',
        sender: 'contact',
        content: 'Quería saber el precio del bono mensual.',
        timestamp: '2024-10-22T15:40:00.000Z',
      },
      {
        id: 'msg_3',
        sender: 'user',
        content:
          '¡Hola Carlos! El bono mensual son 60€. Incluye acceso ilimitado a todas las clases.',
        timestamp: '2024-10-22T15:42:00.000Z',
      },
      {
        id: 'msg_4',
        sender: 'contact',
        content: 'Gracias por la ayuda, ¡sois geniales!',
        timestamp: '2024-10-22T15:45:00.000Z',
      },
    ],
  },
  {
    id: 'conv_3',
    contactName: 'Anaïs Martin',
    contactAvatarUrl: '/avatars/11.png',
    lastMessage: 'Do you offer services in English?',
    timestamp: '2024-10-23T11:05:00.000Z',
    status: 'unassigned',
    channel: 'whatsapp',
    messages: [
      {
        id: 'msg_5',
        sender: 'contact',
        content: 'Do you offer services in English?',
        timestamp: '2024-10-23T11:05:00.000Z',
      },
    ],
  },
]; 