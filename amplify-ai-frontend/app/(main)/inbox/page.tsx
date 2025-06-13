'use client';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { mockConversations } from '@/lib/mock-data';
import { Conversation } from '@/lib/types';
import React from 'react';
import { ConversationList } from './components/ConversationList';
import { ChatThread } from './components/ChatThread';
import { ContactContext } from './components/ContactContext';

export default function InboxPage() {
  const [selectedConversation, setSelectedConversation] =
    React.useState<Conversation | null>(mockConversations[0]);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full rounded-lg border"
    >
      <ResizablePanel defaultSize={25}>
        <ConversationList
          conversations={mockConversations}
          selectedConversation={selectedConversation}
          onSelect={setSelectedConversation}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <ChatThread conversation={selectedConversation} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25}>
        <ContactContext conversation={selectedConversation} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
} 