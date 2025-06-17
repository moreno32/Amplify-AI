import { getBrandProfile } from './brandProfileService'
import { BrandProfile } from '../types'

// The settings page currently edits parts of the Brand Profile.
// We can reuse the BrandProfile type for its data.
export type SettingsData = BrandProfile

/**
 * Fetches data needed for the settings page.
 * Currently, it fetches the main brand profile data.
 *
 * @returns {Promise<SettingsData>}
 */
export async function getSettingsData(): Promise<SettingsData> {
  // Reuses the logic from brandProfileService
  return await getBrandProfile()
} 