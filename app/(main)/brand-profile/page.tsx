import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/layout/PageHeader'
import { getBrandProfile } from '@/lib/services/brandProfileService'
import { RefreshCcw } from 'lucide-react'
import { BrandProfileClientContent } from './components/BrandProfileClientContent'

export default async function BrandProfilePage() {
  const brandProfile = await getBrandProfile()

  if (!brandProfile) {
    return <div>Cargando el alma de tu marca...</div>
  }

  return (
    <div>
      <PageHeader
        title="El Alma de tu Marca"
        subtitle="El espejo estratégico de tu marca. Descubre y refina la narrativa que te hace única."
        actions={
          <Button>
            <RefreshCcw className="mr-2 h-4 w-4" /> Resincronizar desde Guía
          </Button>
        }
      />
      <BrandProfileClientContent brandProfile={brandProfile} />
    </div>
  )
} 