import { mockConversations } from '../mock-data'
import { Conversation } from '../types'

export interface InboxData {
  conversations: Conversation[]
}

/**
 * Fetches the initial data for the inbox page.
 * In a real app, this would fetch the list of conversations for the current user.
 *
 * @returns {Promise<InboxData>}
 */
export async function getInboxData(): Promise<InboxData> {
  await new Promise((resolve) => setTimeout(resolve, 250)) // Simulate latency

  return {
    conversations: mockConversations,
  }
} 