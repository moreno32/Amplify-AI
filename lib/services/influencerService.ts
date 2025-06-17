import { mockInfluencers } from '../mock-data'
import { Influencer } from '../types'

/**
 * Fetches a list of influencers.
 * In a real app, this could accept filter and pagination parameters.
 *
 * @returns {Promise<Influencer[]>}
 */
export async function getInfluencers(): Promise<Influencer[]> {
  await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate latency
  return mockInfluencers
} 