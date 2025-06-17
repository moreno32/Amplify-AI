import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/layout/PageHeader'
import { getBrandProfile } from '@/lib/services/brandProfileService'
import { RefreshCcw } from 'lucide-react'
import { toast } from 'sonner'
import { BrandProfileClientContent } from './components/BrandProfileClientContent'

export default async function BrandProfilePage() {
  // 1. Data is fetched on the server via the service layer
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
      {/* 2. Data is passed down to a client component for interactive rendering */}
      <BrandProfileClientContent brandProfile={brandProfile} />
    </div>
  )
} 