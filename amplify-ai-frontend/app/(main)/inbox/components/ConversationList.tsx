'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Conversation } from '@/lib/types';
import { Search } from 'lucide-react';

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  onSelect: (conv: Conversation) => void;
}

export function ConversationList({
  conversations,
  selectedConversation,
  onSelect,
}: ConversationListProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar..." className="pl-8" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => onSelect(conv)}
            className={`flex items-center gap-3 p-3 cursor-pointer border-l-4 ${
              selectedConversation?.id === conv.id
                ? 'bg-muted border-primary'
                : 'border-transparent hover:bg-muted/50'
            }`}
          >
            <Avatar>
              <AvatarImage src={conv.contactAvatarUrl} />
              <AvatarFallback>{conv.contactName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 truncate">
              <p className="font-semibold">{conv.contactName}</p>
              <p className="text-sm text-muted-foreground truncate">
                {conv.lastMessage}
              </p>
            </div>
            <Badge
              variant={conv.status === 'open' ? 'default' : 'secondary'}
              className="capitalize"
            >
              {conv.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
