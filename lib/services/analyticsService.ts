import { competitors, userMetrics } from '@/lib/mock-data/competitors'
import { mockTopPosts } from '@/lib/mock-data/top-posts'
import { AnalyticsData } from '@/lib/types'

// Data for MiRendimientoTab
const kpiData = [
  {
    title: 'Alcance',
    value: '87,345',
    change: '+12.5%',
    changeType: 'increase' as const,
  },
  {
    title: 'Tasa de Engagement',
    value: '4.1%',
    change: '+0.8%',
    changeType: 'increase' as const,
  },
  {
    title: 'Nuevos Seguidores',
    value: '1,204',
    change: '+20.1%',
    changeType: 'increase' as const,
  },
  {
    title: 'Posts Publicados',
    value: '12',
    change: '-15%',
    changeType: 'decrease' as const,
  },
]

const chartData = [
  { name: 'Ene', Seguidores: 4000, Engagement: 2.4 },
  { name: 'Feb', Seguidores: 3000, Engagement: 3.9 },
  { name: 'Mar', Seguidores: 2000, Engagement: 2.8 },
  { name: 'Abr', Seguidores: 2780, Engagement: 3.0 },
  { name: 'May', Seguidores: 1890, Engagement: 4.8 },
  { name: 'Jun', Seguidores: 2390, Engagement: 3.8 },
  { name: 'Jul', Seguidores: 3490, Engagement: 4.3 },
]

/**
 * Simulates fetching all analytics data from an API.
 * In the future, this function will make a network request to the FastAPI backend.
 * For now, it returns a composition of mock data after a short delay.
 *
 * @returns {Promise<AnalyticsData>} A promise that resolves with all analytics data.
 */
export async function getAnalyticsData(): Promise<AnalyticsData> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  return {
    performance: {
      kpis: kpiData,
      chartData: chartData,
    },
    competitors: {
      user: userMetrics,
      list: competitors,
    },
    topPosts: mockTopPosts,
  }
} 