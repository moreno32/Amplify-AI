import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/layout/PageHeader'
import { getInboxData } from '@/lib/services/inboxService'
import { PenSquare } from 'lucide-react'
import { InboxClientPage } from './components/InboxClientPage'

export default async function InboxPage() {
  const { conversations } = await getInboxData()

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Inbox"
        subtitle="Gestiona tus conversaciones y colaboraciones."
        actions={
          <Button>
            <PenSquare className="mr-2 h-4 w-4" /> Nueva Conversación
          </Button>
        }
      />
      <div className="flex-grow">
        <InboxClientPage initialConversations={conversations} />
      </div>
    </div>
  )
} 