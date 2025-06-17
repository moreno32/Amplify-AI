import { getSettingsData } from '@/lib/services/settingsService'
import { SettingsClientPage } from './components/SettingsClientPage'

export default async function SettingsPage() {
  const settingsData = await getSettingsData()

  return <SettingsClientPage data={settingsData} />
} 