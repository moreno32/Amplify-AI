'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Conversation, Message } from '@/lib/types';
import { Archive, Send, Users, Wand2 } from 'lucide-react';

interface ChatThreadProps {
  conversation: Conversation | null;
}

export function ChatThread({ conversation }: ChatThreadProps) {
  if (!conversation) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-muted-foreground">
        <Users className="h-12 w-12" />
        <p className="mt-2">Selecciona una conversación para empezar</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={conversation.contactAvatarUrl} />
            <AvatarFallback>
              {conversation.contactName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <p className="font-semibold">{conversation.contactName}</p>
        </div>
        <Button variant="outline" size="sm">
          <Archive className="mr-2 h-4 w-4" />
          Marcar como resuelto
        </Button>
      </div>
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {conversation.messages.map((msg: Message) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${
              msg.sender === 'user' ? 'justify-end' : ''
            }`}
          >
            {msg.sender === 'contact' && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={conversation.contactAvatarUrl} />
                <AvatarFallback>
                  {conversation.contactName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}
            <p
              className={`max-w-xs md:max-w-md p-3 rounded-2xl ${
                msg.sender === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-none'
                  : 'bg-muted rounded-bl-none'
              }`}
            >
              {msg.content}
            </p>
          </div>
        ))}
      </div>
      <div className="p-4 border-t relative">
        <Textarea
          placeholder="Escribe tu respuesta..."
          className="pr-20"
          rows={3}
        />
        <div className="absolute right-6 top-6 flex gap-2">
          <Button size="icon" variant="ghost">
            <Wand2 className="h-5 w-5" />
          </Button>
          <Button size="icon">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
} 