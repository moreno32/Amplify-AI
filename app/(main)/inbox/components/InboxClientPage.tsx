'use client'

import React from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Conversation } from '@/lib/types'
import { ChatThread } from './ChatThread'
import { ContactContext } from './ContactContext'
import { ConversationList } from './ConversationList'

interface InboxClientPageProps {
  initialConversations: Conversation[]
}

export function InboxClientPage({
  initialConversations,
}: InboxClientPageProps) {
  const [selectedConversation, setSelectedConversation] =
    React.useState<Conversation | null>(initialConversations[0] || null)

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full rounded-lg border"
    >
      <ResizablePanel defaultSize={25} minSize={20}>
        <ConversationList
          conversations={initialConversations}
          selectedConversation={selectedConversation}
          onSelect={setSelectedConversation}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50} minSize={30}>
        <ChatThread conversation={selectedConversation} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25} minSize={20}>
        <ContactContext conversation={selectedConversation} />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
} 