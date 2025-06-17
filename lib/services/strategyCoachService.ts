import { mockCompetitors } from '../mock-data/market'
import { mockContentAnalysis } from '../mock-data/content-analysis'
import { Competitor, CompetitorContentAnalysis } from '../types'

export interface StrategyCoachData {
  competitors: Competitor[]
  analysis: Record<string, CompetitorContentAnalysis>
}

/**
 * Fetches all data needed for the Strategy Coach page.
 *
 * @returns {Promise<StrategyCoachData>}
 */
export async function getStrategyCoachData(): Promise<StrategyCoachData> {
  await new Promise((resolve) => setTimeout(resolve, 400)) // Simulate latency

  return {
    competitors: mockCompetitors,
    analysis: mockContentAnalysis,
  }
} 