'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { format } from "date-fns"
import { es } from "date-fns/locale"
import {
  AlertTriangle,
  Building,
  CalendarDays,
  Eye,
  EyeOff,
  Globe,
  Lock,
  User,
} from 'lucide-react'

import { SettingsData } from '@/lib/services/settingsService'
import { DashboardSection } from '@/components/shared/DashboardSection'
import { BlockHeader } from '@/components/shared/BlockHeader'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Textarea } from '@/components/ui/textarea'
import { FormField } from '@/components/shared/FormField'
import { SettingsSaveFooter } from '@/components/shared/SettingsSaveFooter'
import { cn } from '@/lib/utils'

interface AccountTabProps {
  data: SettingsData
}

type AccountState = Omit<SettingsData, 'id' | 'core' | 'voice' | 'visual' | 'assets'>

const subsectorOptions: Record<string, string[]> = {
    'Salud y Bienestar': ['Gimnasio', 'Estudio de Yoga/Pilates', 'Entrenador Personal', 'Nutricionista', 'Fisioterapia'],
    'eCommerce': ['Moda y Accesorios', 'Electrónica', 'Hogar y Decoración', 'Belleza y Cuidado Personal', 'Libros y Papelería'],
    'Tecnología': ['SaaS', 'Agencia de Desarrollo', 'Consultoría IT', 'Hardware'],
    'Negocio Local': ['Restaurante/Cafetería', 'Tienda Minorista', 'Salón de Belleza', 'Servicios Profesionales'],
    'Marca Personal': ['Creador de Contenido', 'Coach/Consultor', 'Artista', 'Escritor'],
    'Agencia': ['Agencia de Marketing', 'Agencia de Diseño', 'Agencia de Relaciones Públicas'],
    'Otro': [],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const MAX_DESC_LENGTH = 200;

export function AccountTab({ data }: AccountTabProps) {
  const [formData, setFormData] = useState<Partial<AccountState>>(data ?? {})
  const [isModified, setIsModified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: ''})
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false })
  const [isPasswordSaving, setIsPasswordSaving] = useState(false)
  
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [availableSubsectors, setAvailableSubsectors] = useState<string[]>([]);

  useEffect(() => {
    if (formData.companyIndustry) {
      setAvailableSubsectors(subsectorOptions[formData.companyIndustry] || []);
    }
  }, [formData.companyIndustry]);

  const handleChange = (field: keyof AccountState, value: any) => {
    setFormData(prev => {
      const newState = { ...prev, [field]: value };
      
      if (field === 'companyIndustry') {
        setAvailableSubsectors(subsectorOptions[value] || []);
        newState.companyType = '';
      }
      
      return newState;
    });

    if (!isModified) setIsModified(true)
  }

  const handlePasswordChange = (field: keyof typeof passwords, value: string) => {
    setPasswords(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    setIsLoading(true)
    console.log("Saving general settings:", formData)
    setTimeout(() => {
      setIsLoading(false)
      setIsModified(false)
      toast.success('Ajustes de la cuenta guardados')
    }, 1500)
  }

  const handleSavePassword = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
        toast.error('Las nuevas contraseñas no coinciden.');
        return;
    }
    setIsPasswordSaving(true);
    console.log("Changing password...")
    setTimeout(() => {
        setIsPasswordSaving(false);
        setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setIsChangingPassword(false);
        toast.success('Contraseña actualizada correctamente.');
    }, 1500);
  }
  
  const isPasswordFormValid = passwords.currentPassword && passwords.newPassword && passwords.confirmPassword && passwords.newPassword.length >= 8;

  return (
    <>
      <div className="relative">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* User Info Card */}
          <motion.div variants={itemVariants}>
            <DashboardSection
              title="Tus datos personales."
            >
              <BlockHeader
                icon={User}
              title="Usuario"
              description="Tus datos personales."
              />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-6">
                <FormField label="Nombre" htmlFor="firstName">
                  <Input
                    id="firstName"
                    value={formData.firstName ?? ''}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                  />
                </FormField>
                <FormField label="Apellido" htmlFor="lastName">
                  <Input
                    id="lastName"
                    value={formData.lastName ?? ''}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                  />
                </FormField>
                 <FormField label="Posición o Rol" htmlFor="role">
                   <Input id="role" value={formData.role ?? ''} onChange={(e) => handleChange('role', e.target.value)} />
                 </FormField>
                 <FormField label="Fecha de Nacimiento" htmlFor="dob">
                   <Popover>
                     <PopoverTrigger asChild>
                       <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !formData.dob && "text-muted-foreground")}>
                         <CalendarDays className="mr-2 h-4 w-4" />
                         {formData.dob ? format(new Date(formData.dob), "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                       </Button>
                     </PopoverTrigger>
                     <PopoverContent className="w-auto p-0">
                       <Calendar
                         locale={es}
                         mode="single"
                         selected={formData.dob ? new Date(formData.dob) : undefined}
                         onSelect={(d) => handleChange('dob', d?.toISOString())}
                         initialFocus
                         captionLayout="dropdown"
                         fromYear={1950}
                         toYear={new Date().getFullYear() - 18}
                         defaultMonth={formData.dob ? new Date(formData.dob) : new Date(new Date().setFullYear(new Date().getFullYear() - 25))}
                       />
                     </PopoverContent>
                   </Popover>
                 </FormField>
                 <FormField label="Sexo" htmlFor="gender">
                     <Select value={formData.gender ?? 'prefer_not_to_say'} onValueChange={(v) => handleChange('gender', v)}>
                         <SelectTrigger id="gender" className="w-full"><SelectValue /></SelectTrigger>
                         <SelectContent>
                             <SelectItem value="female">Femenino</SelectItem>
                             <SelectItem value="male">Masculino</SelectItem>
                             <SelectItem value="other">Otro</SelectItem>
                             <SelectItem value="prefer_not_to_say">Prefiero no decirlo</SelectItem>
                         </SelectContent>
                     </Select>
                 </FormField>
                 <FormField label="Idioma" htmlFor="language">
                    <Select value={formData.language ?? 'es'} onValuechange={(v) => handleChange('language', v)}>
                        <SelectTrigger id="language" className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="es">Español</SelectItem><SelectItem value="en">English</SelectItem></SelectContent>
                    </Select>
                 </FormField>
                 <FormField label="Zona Horaria" htmlFor="timezone">
                   <Select value={formData.timezone ?? ''} onValueChange={(v) => handleChange('timezone', v)}>
                       <SelectTrigger id="timezone" className="w-full"><SelectValue placeholder="Elige tu zona"/></SelectTrigger>
                       <SelectContent>
                           <SelectItem value="Europe/Madrid">Europa/Madrid (GMT+2)</SelectItem>
                           <SelectItem value="America/Mexico_City">Ciudad de México (GMT-6)</SelectItem>
                           <SelectItem value="America/Bogota">Bogotá (GMT-5)</SelectItem>
                           <SelectItem value="America/Argentina/Buenos_Aires">Buenos Aires (GMT-3)</SelectItem>
                           <SelectItem value="America/New_York">Nueva York (GMT-4)</SelectItem>
                       </SelectContent>
                   </Select>
                 </FormField>
                 <FormField label="País" htmlFor="country">
                    <Select value={formData.country ?? ''} onValueChange={(v) => handleChange('country', v)}>
                        <SelectTrigger id="country" className="w-full"><SelectValue placeholder="Elige tu país"/></SelectTrigger>
                        <SelectContent><SelectItem value="España">España</SelectItem><SelectItem value="México">México</SelectItem><SelectItem value="Argentina">Argentina</SelectItem><SelectItem value="Colombia">Colombia</SelectItem><SelectItem value="USA">USA</SelectItem></SelectContent>
                    </Select>
                 </FormField>
              </div>
              <FormField label="Descripción Breve" htmlFor="userDescription" className="pt-6">
                <Textarea
                  id="userDescription"
                  value={formData.userDescription ?? ''}
                  onChange={(e) => handleChange('userDescription', e.target.value)}
                  maxLength={MAX_DESC_LENGTH}
                />
                <p className="text-xs text-right text-muted-foreground">
                  {(formData.userDescription?.length ?? 0)} / {MAX_DESC_LENGTH}
                </p>
              </FormField>
            </DashboardSection>
          </motion.div>

          {/* Company Info Card */}
          <motion.div variants={itemVariants}>
            <DashboardSection
              title="Los datos de tu empresa."
            >
              <BlockHeader
                icon={Building}
                title="Empresa"
                description="Información pública y de configuración de tu empresa."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                <FormField label="Nombre de la Empresa" htmlFor="companyName" className="md:col-span-2">
                  <Input
                    id="companyName"
                    value={formData.companyName ?? ''}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                  />
                </FormField>
                <FormField label="Industria" htmlFor="companyIndustry">
                    <Select value={formData.companyIndustry ?? ''} onValueChange={(v) => handleChange('companyIndustry', v)}>
                        <SelectTrigger id="companyIndustry" className="w-full"><SelectValue placeholder="Selecciona una industria" /></SelectTrigger>
                        <SelectContent>
                            {Object.keys(subsectorOptions).map(sector => (
                                <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormField>
                <FormField label="Subsector o tipo" htmlFor="companyType">
                    <Select value={formData.companyType ?? ''} onValueChange={(v) => handleChange('companyType', v)} disabled={!formData.companyIndustry || availableSubsectors.length === 0}>
                        <SelectTrigger id="companyType" className="w-full"><SelectValue placeholder="Selecciona un tipo" /></SelectTrigger>
                        <SelectContent>
                            {availableSubsectors.map(subsector => (
                                <SelectItem key={subsector} value={subsector}>{subsector}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormField>
                <FormField label="Sitio Web" htmlFor="companyWebsite" className="md:col-span-2">
                  <Input
                    id="companyWebsite"
                    type="url"
                    placeholder="https://tuempresa.com"
                    value={formData.companyWebsite ?? ''}
                    onChange={(e) => handleChange('companyWebsite', e.target.value)}
                  />
                </FormField>
                <FormField label="Describe tu empresa" htmlFor="companyDescription" className="md:col-span-2">
                  <Textarea
                    id="companyDescription"
                    value={formData.companyDescription ?? ''}
                    onChange={(e) => handleChange('companyDescription', e.target.value)}
                    maxLength={MAX_DESC_LENGTH}
                    className="h-24"
                    placeholder="Describe brevemente a qué se dedica tu empresa."
                  />
                  <p className="text-xs text-muted-foreground text-right">{formData.companyDescription?.length || 0} / {MAX_DESC_LENGTH}</p>
                </FormField>
              </div>
            </DashboardSection>
          </motion.div>

          {/* Security Card */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <DashboardSection
              title="Seguridad"
            >
              <BlockHeader
                icon={Lock}
                title="Seguridad de la Cuenta"
                description="Gestiona tu contraseña y otros ajustes de seguridad."
              />
              <div className="pt-6">
                {!isChangingPassword ? (
                    <Button onClick={() => setIsChangingPassword(true)}>Cambiar Contraseña</Button>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                        <FormField label="Contraseña Actual">
                            <div className="relative">
                                <Input type={showPasswords.current ? 'text' : 'password'} value={passwords.currentPassword} onChange={(e) => handlePasswordChange('currentPassword', e.target.value)} />
                                <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowPasswords(p => ({ ...p, current: !p.current }))}>
                                    {showPasswords.current ? <EyeOff size={16} /> : <Eye size={16} />}
                                </Button>
                            </div>
                        </FormField>
                        <FormField label="Nueva Contraseña">
                           <div className="relative">
                                <Input type={showPasswords.new ? 'text' : 'password'} value={passwords.newPassword} onChange={(e) => handlePasswordChange('newPassword', e.target.value)} />
                                <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowPasswords(p => ({ ...p, new: !p.new }))}>
                                    {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
                                </Button>
                            </div>
                        </FormField>
                        <FormField label="Confirmar Nueva Contraseña">
                            <div className="relative">
                                <Input type={showPasswords.confirm ? 'text' : 'password'} value={passwords.confirmPassword} onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)} />
                                <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowPasswords(p => ({ ...p, confirm: !p.confirm }))}>
                                    {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                </Button>
                            </div>
                        </FormField>
                        <div className="flex gap-2">
                            <Button onClick={handleSavePassword} disabled={!isPasswordFormValid || isPasswordSaving}>{isPasswordSaving ? 'Guardando...' : 'Guardar'}</Button>
                            <Button variant="ghost" onClick={() => setIsChangingPassword(false)}>Cancelar</Button>
                        </div>
                    </div>
                )}
              </div>
            </DashboardSection>
          </motion.div>
            
          {/* Delete Account Card */}
          <motion.div variants={itemVariants}>
            <DashboardSection
              title="Borrar Cuenta"
            >
              <BlockHeader
                icon={AlertTriangle}
                title="Eliminar Cuenta"
                description="Esta acción es irreversible y eliminará todos tus datos."
              />
              <div className="pt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Para confirmar, escribe <strong>&quot;BORRAR MI CUENTA&quot;</strong> en el campo de abajo.
                </p>
                <Input
                  id="deleteConfirmation"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  className="mb-4"
                  placeholder="BORRAR MI CUENTA"
                />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      disabled={deleteConfirmation !== 'BORRAR MI CUENTA'}
                    >
                      Eliminar mi cuenta permanentemente
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. Esto eliminará permanentemente
                        tu cuenta y todos los datos asociados de nuestros servidores.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => toast.info('Funcionalidad de borrado no implementada aún.')}
                        className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                      >
                        Sí, entiendo, borrar mi cuenta
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </DashboardSection>
          </motion.div>
        </motion.div>
      </div>

      <SettingsSaveFooter isModified={isModified} onSave={handleSave} onCancel={() => setIsModified(false)} isLoading={isLoading} />
    </>
  )
}