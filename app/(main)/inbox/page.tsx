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
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { PenSquare } from 'lucide-react';

export default function InboxPage() {
  const [selectedConversation, setSelectedConversation] =
    React.useState<Conversation | null>(mockConversations[0]);

  return (
    <div className="flex flex-col h-full">
      <PageHeader 
        title="Inbox"
        subtitle="Gestiona tus conversaciones y colaboraciones."
        actions={
          <Button><PenSquare className="mr-2 h-4 w-4" /> Nueva Conversación</Button>
        }
      />
      <div className="flex-grow">
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
      </div>
    </div>
  );
} 