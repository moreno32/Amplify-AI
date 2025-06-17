import { Button } from '@/components/ui/button'
import { getSettingsData } from '@/lib/services/settingsService'
import { RefreshCcw } from 'lucide-react'
import { SettingsClientPage } from './components/SettingsClientPage'

export default async function SettingsPage() {
  const settingsData = await getSettingsData()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">ADN de Marca</h1>
        <Button variant="outline">
          <RefreshCcw className="mr-2 h-4 w-4" />
          Resincronizar desde Guía
        </Button>
      </div>
      <SettingsClientPage data={settingsData} />
    </div>
  )
} 