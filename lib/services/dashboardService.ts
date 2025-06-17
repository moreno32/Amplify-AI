import { mockDashboardData } from '@/lib/mock-data/dashboard'
import { DashboardData } from '@/lib/types'

/**
 * Simulates fetching dashboard data from an API.
 * In the future, this function will make a network request to the FastAPI backend.
 * For now, it returns mock data after a short delay to simulate network latency.
 *
 * @returns {Promise<DashboardData>} A promise that resolves with the dashboard data.
 */
export async function getDashboardData(): Promise<DashboardData> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In the future, this will be an API call:
  // const response = await fetch('/api/v1/dashboard');
  // const data = await response.json();
  // return data;

  return mockDashboardData
} 