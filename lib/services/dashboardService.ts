import { DashboardData, PerformanceMetric, PostStatus } from '@/lib/types'
import { mockDashboardData } from '@/lib/mock-data/dashboard'
import { postService } from './postService'

/**
 * Simulates fetching dashboard data from an API.
 * In the future, this function will make a network request to the FastAPI backend.
 * For now, it returns mock data after a short delay to simulate network latency.
 *
 * @returns {Promise<DashboardData>} A promise that resolves with the dashboard data.
 */
export async function getDashboardData(): Promise<DashboardData> {
  const allCompanyPosts = await postService.getPosts();

  const upcomingPostsData = allCompanyPosts
    .filter(p => p.status === 'scheduled' as PostStatus || p.status === 'draft' as PostStatus)
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    .slice(0, 3);

  const scheduledPostsCount = allCompanyPosts.filter(p => p.status === 'scheduled' as PostStatus).length;

  const updatedPerformanceMetrics: PerformanceMetric[] = mockDashboardData.performanceMetrics.map(metric => {
    if (metric.id === 'metric-3') {
      return {
        ...metric,
        value: `${scheduledPostsCount} este mes`,
      };
    }
    return metric;
  });

  return {
    performanceMetrics: updatedPerformanceMetrics,
    upcomingPosts: upcomingPostsData,
    recommendedActions: mockDashboardData.recommendedActions,
    aiCoachInsights: mockDashboardData.aiCoachInsights,
  }
} 