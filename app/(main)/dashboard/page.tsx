import { getDashboardData } from '@/lib/services/dashboardService'
import { DashboardClientContent } from './components/DashboardClientContent'

export default async function DashboardPage() {
  // 1. Data is now fetched on the server using the service layer
  const data = await getDashboardData()

  return (
    <div>
      {/* 2. Data is passed down to a client component */}
      <DashboardClientContent data={data} />
    </div>
  )
} 