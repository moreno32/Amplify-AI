import { getInitialCalendarData } from '@/lib/services/calendarService'
import { CalendarClientPage } from './components/CalendarClientPage'

/**
 * This is the main page for the Calendar.
 * It's a Server Component responsible for fetching the initial data
 * for the current week and passing it to the client component.
 */
export default async function CalendarPage() {
  // 1. Fetch initial data on the server
  const initialData = await getInitialCalendarData()

  // 2. Render the interactive client component with the initial data
  return <CalendarClientPage initialData={initialData} />
} 