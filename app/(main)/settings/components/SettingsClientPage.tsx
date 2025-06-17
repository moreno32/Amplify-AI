'use client'

import {
  BookUser,
  CreditCard,
  User,
  UserCircle,
  Sparkles,
} from 'lucide-react'

import { SettingsData } from '@/lib/services/settingsService'
import { PageHeader } from '@/components/layout/PageHeader'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { AccountTab } from './AccountTab'
import { BrandProfileTab } from './BrandProfileTab'
import { BillingTab } from './BillingTab'

interface SettingsClientPageProps {
  data: SettingsData
}

const TABS = [
  { value: "account", label: "Mi Cuenta", icon: UserCircle },
  { value: "brand-profile", label: "Agente IA", icon: Sparkles },
  { value: "billing", label: "Facturación", icon: CreditCard },
];

export function SettingsClientPage({ data }: SettingsClientPageProps) {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Ajustes"
        subtitle="Gestiona tu perfil, tu cuenta y la configuración de tu marca."
      />
      <Tabs defaultValue="account" className="fade-in">
        <TabsList>
          <TabsTrigger value="account">
            <User className="mr-2 h-4 w-4" />
            Mi Cuenta
          </TabsTrigger>
          <TabsTrigger value="brand-profile">
            <BookUser className="mr-2 h-4 w-4" />
            Agente IA
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="mr-2 h-4 w-4" />
            Facturación
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="mt-6">
          <AccountTab data={data} />
        </TabsContent>

        <TabsContent value="brand-profile" className="mt-6">
          <BrandProfileTab />
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <BillingTab />
        </TabsContent>
      </Tabs>
    </div>
  )
} 