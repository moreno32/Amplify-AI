import { startOfISOWeek, endOfISOWeek } from 'date-fns'
import { postService } from './postService'
import { Post } from '../types'

export interface CalendarPageData {
  initialPosts: Post[];
  initialDate: string; // ISO string to be safely passed to client
}

/**
 * Fetches the initial data needed to render the calendar page.
 * This includes the posts for the current week and the current date.
 *
 * @returns {Promise<CalendarPageData>} A promise that resolves with the initial calendar data.
 */
export async function getInitialCalendarData(): Promise<CalendarPageData> {
  const now = new Date()
  const startOfWeek = startOfISOWeek(now)
  const endOfWeek = endOfISOWeek(now)

  // We reuse the existing postService to fetch the posts
  const initialPosts = await postService.getPosts(startOfWeek, endOfWeek)

  return {
    initialPosts,
    initialDate: now.toISOString(),
  }
} 