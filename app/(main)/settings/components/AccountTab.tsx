'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
import { cn } from '@/lib/utils'
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
import { Separator } from '@/components/ui/separator'
import { SettingsSaveFooter } from '@/components/shared/SettingsSaveFooter'

interface AccountTabProps {
  data: SettingsData
}

type AccountState = Omit<SettingsData, 'id' | 'name' | 'core' | 'voice' | 'visual' | 'assets'>

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
  const [formData, setFormData] = useState<AccountState>(data)
  const [isModified, setIsModified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: ''})
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false })
  const [isPasswordSaving, setIsPasswordSaving] = useState(false)
  
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [availableSubsectors, setAvailableSubsectors] = useState<string[]>([]);

  useEffect(() => {
    // Initialize subsectors based on initial form data
    setAvailableSubsectors(subsectorOptions[formData.companyIndustry] || []);
  }, []);

  const handleChange = (field: keyof AccountState, value: any) => {
    setFormData(prev => {
      const newState = { ...prev, [field]: value };
      
      // If industry changes, update available subsectors and reset companyType
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
      <style>{`
        .custom-calendar .rdp-head_cell {
          width: 100% !important;
        }
      `}</style>
      <div className="relative">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* User Info Card */}
          <motion.div variants={itemVariants}>
            <DashboardSection title="Usuario">
              <BlockHeader icon={User} title="Usuario" description="Tus datos personales." />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                {/* Row 1 */}
                <FormField label="Nombre" htmlFor="firstName"><Input id="firstName" value={formData.firstName} onChange={(e) => handleChange('firstName', e.target.value)} /></FormField>
                <FormField label="Apellido" htmlFor="lastName"><Input id="lastName" value={formData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} /></FormField>
                
                {/* Row 2 */}
                <FormField label="Posición o Rol" htmlFor="role">
                  <Input id="role" value={formData.role} onChange={(e) => handleChange('role', e.target.value)} />
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
                        className="custom-calendar"
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

                {/* Row 3 */}
                <FormField label="Sexo" htmlFor="gender">
                    <Select value={formData.gender} onValueChange={(v) => handleChange('gender', v)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="female">Femenino</SelectItem>
                            <SelectItem value="male">Masculino</SelectItem>
                            <SelectItem value="other">Otro</SelectItem>
                            <SelectItem value="prefer_not_to_say">Prefiero no decirlo</SelectItem>
                        </SelectContent>
                    </Select>
                </FormField>
                <FormField label="Idioma" htmlFor="language"><Select value={formData.language} onValueChange={(v) => handleChange('language', v)}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="es">Español</SelectItem><SelectItem value="en">English</SelectItem></SelectContent></Select></FormField>

                {/* Row 4 */}
                <FormField label="Zona Horaria" htmlFor="timezone">
                  <Select value={formData.timezone} onValueChange={(v) => handleChange('timezone', v)}>
                      <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                      <SelectContent>
                          <SelectItem value="Europe/Madrid">Europa/Madrid (GMT+2)</SelectItem>
                          <SelectItem value="America/Mexico_City">Ciudad de México (GMT-6)</SelectItem>
                          <SelectItem value="America/Bogota">Bogotá (GMT-5)</SelectItem>
                          <SelectItem value="America/Argentina/Buenos_Aires">Buenos Aires (GMT-3)</SelectItem>
                          <SelectItem value="America/New_York">Nueva York (GMT-4)</SelectItem>
                      </SelectContent>
                  </Select>
                </FormField>
                <FormField label="País" htmlFor="country"><Select value={formData.country} onValueChange={(v) => handleChange('country', v)}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="España">España</SelectItem><SelectItem value="México">México</SelectItem><SelectItem value="Argentina">Argentina</SelectItem><SelectItem value="Colombia">Colombia</SelectItem><SelectItem value="USA">USA</SelectItem></SelectContent></Select></FormField>
              
                <FormField label="Descripción Breve" htmlFor="userDescription" className="md:col-span-2">
                  <Textarea id="userDescription" value={formData.userDescription} onChange={(e) => handleChange('userDescription', e.target.value)} rows={3} maxLength={MAX_DESC_LENGTH} />
                  <p className="text-xs text-right text-muted-foreground">{formData.userDescription.length}/{MAX_DESC_LENGTH}</p>
                </FormField>
              </div>
            </DashboardSection>
          </motion.div>

          {/* Company Info Card */}
          <motion.div variants={itemVariants}>
            <DashboardSection title="Empresa">
              <BlockHeader icon={Building} title="Empresa" description="Detalles de tu organización." />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                <FormField label="Nombre de la Empresa" htmlFor="companyName" className="md:col-span-2">
                  <Input id="companyName" value={formData.companyName} onChange={(e) => handleChange('companyName', e.target.value)} />
                </FormField>

                <FormField label="Sector" htmlFor="companyIndustry">
                  <Select value={formData.companyIndustry} onValueChange={(v) => handleChange('companyIndustry', v)}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="Salud y Bienestar">Salud y Bienestar</SelectItem><SelectItem value="eCommerce">eCommerce</SelectItem><SelectItem value="Tecnología">Tecnología</SelectItem><SelectItem value="Negocio Local">Negocio Local</SelectItem><SelectItem value="Marca Personal">Marca Personal</SelectItem><SelectItem value="Agencia">Agencia</SelectItem><SelectItem value="Otro">Otro</SelectItem></SelectContent>
                  </Select>
                </FormField>
                
                <FormField label="Subsector" htmlFor="companyType">
                    <Select value={formData.companyType} onValueChange={(v) => handleChange('companyType', v)} disabled={availableSubsectors.length === 0}>
                        <SelectTrigger className="w-full"><SelectValue placeholder="Primero elige un sector" /></SelectTrigger>
                        <SelectContent>
                            {availableSubsectors.map((sub) => (
                                <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormField>
                
                <FormField label="Tamaño" htmlFor="companySize">
                  <Select value={formData.companySize} onValueChange={(v) => handleChange('companySize', v)}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="Yo solo">Yo solo</SelectItem><SelectItem value="2-10 empleados">2-10 empleados</SelectItem><SelectItem value="11-50 empleados">11-50 empleados</SelectItem><SelectItem value="50+">50+</SelectItem></SelectContent>
                  </Select>
                </FormField>
                
                <FormField label="Mercado Objetivo" htmlFor="targetAudience">
                    <Select value={formData.targetAudience} onValueChange={(v) => handleChange('targetAudience', v)}>
                        <SelectTrigger className="w-full"><SelectValue placeholder="Selecciona un mercado" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Jóvenes (18-25)">Jóvenes (18-25)</SelectItem>
                            <SelectItem value="Adultos Jóvenes (25-40)">Adultos Jóvenes (25-40)</SelectItem>
                            <SelectItem value="Adultos (40-60)">Adultos (40-60)</SelectItem>
                            <SelectItem value="Familias">Familias</SelectItem>
                            <SelectItem value="Empresas (B2B)">Empresas (B2B)</SelectItem>
                            <SelectItem value="Público General">Público General</SelectItem>
                        </SelectContent>
                    </Select>
                </FormField>
                
                <FormField label="Sitio Web" htmlFor="companyWebsite" className="md:col-span-2">
                  <div className="relative"><Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input id="companyWebsite" type="url" value={formData.companyWebsite} onChange={(e) => handleChange('companyWebsite', e.target.value)} className="pl-10" /></div>
                </FormField>
                
                <FormField label="Descripción Breve" htmlFor="companyDescription" className="md:col-span-2">
                  <Textarea id="companyDescription" value={formData.companyDescription} onChange={(e) => handleChange('companyDescription', e.target.value)} rows={3} maxLength={MAX_DESC_LENGTH} />
                  <p className="text-xs text-right text-muted-foreground">{formData.companyDescription.length}/{MAX_DESC_LENGTH}</p>
                </FormField>
              </div>
            </DashboardSection>
          </motion.div>

          {/* Security Card */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <DashboardSection title="Seguridad">
              <BlockHeader icon={Lock} title="Seguridad" description="Gestiona tu contraseña y la seguridad de tu cuenta." />
              
              {!isChangingPassword ? (
                <div className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded-lg bg-background">
                    <div>
                        <h4 className="font-semibold">Contraseña</h4>
                        <p className="text-sm text-muted-foreground">Última actualización hace 2 meses</p>
                    </div>
                    <Button variant="outline" onClick={() => setIsChangingPassword(true)}>Cambiar Contraseña</Button>
                </div>
              ) : (
                <div className="p-4 border rounded-lg space-y-4">
                  <h4 className="font-semibold">Cambiar Contraseña</h4>
                  <div className="space-y-4">
                    <FormField label="Contraseña Actual">
                      <div className="relative">
                        <Input type={showPasswords.current ? 'text' : 'password'} value={passwords.currentPassword} onChange={e => handlePasswordChange('currentPassword', e.target.value)} />
                        <button type="button" onClick={() => setShowPasswords(p => ({ ...p, current: !p.current }))} className="absolute inset-y-0 right-0 px-3 flex items-center text-muted-foreground">
                          {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </FormField>
                    <FormField label="Nueva Contraseña">
                      <div className="relative">
                        <Input type={showPasswords.new ? 'text' : 'password'} value={passwords.newPassword} onChange={e => handlePasswordChange('newPassword', e.target.value)} />
                        <button type="button" onClick={() => setShowPasswords(p => ({ ...p, new: !p.new }))} className="absolute inset-y-0 right-0 px-3 flex items-center text-muted-foreground">
                          {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground">La contraseña debe tener al menos 8 caracteres.</p>
                    </FormField>
                     <FormField label="Confirmar Nueva Contraseña">
                        <div className="relative">
                            <Input type={showPasswords.confirm ? 'text' : 'password'} value={passwords.confirmPassword} onChange={e => handlePasswordChange('confirmPassword', e.target.value)} />
                             <button type="button" onClick={() => setShowPasswords(p => ({ ...p, confirm: !p.confirm }))} className="absolute inset-y-0 right-0 px-3 flex items-center text-muted-foreground">
                                {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </FormField>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setIsChangingPassword(false)}>Cancelar</Button>
                    <Button onClick={handleSavePassword} disabled={!isPasswordFormValid || isPasswordSaving}>
                      {isPasswordSaving ? 'Guardando...' : 'Guardar Contraseña'}
                    </Button>
                  </div>
                </div>
              )}
            </DashboardSection>
          </motion.div>
          
           {/* Danger Zone Card */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <DashboardSection title="Zona de Peligro">
              <BlockHeader 
                icon={AlertTriangle} 
                title="Zona de Peligro" 
                description="Acciones irreversibles. Por favor, proceda con cuidado."
                className="text-destructive"
              />
              <div className="flex flex-col sm:flex-row items-center justify-between p-4 border border-destructive/50 rounded-lg bg-destructive/5">
                <div>
                  <h4 className="font-semibold text-destructive">Eliminar Cuenta</h4>
                  <p className="text-sm text-destructive/80">Esta acción eliminará permanentemente tu cuenta y todos tus datos.</p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Eliminar mi cuenta</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta y todos los datos asociados. Para confirmar, escribe <strong>{data.email}</strong> en el campo de abajo.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <Input 
                      value={deleteConfirmation}
                      onChange={(e) => setDeleteConfirmation(e.target.value)}
                      placeholder={data.email}
                    />
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction disabled={deleteConfirmation !== data.email}>
                        Entiendo, eliminar mi cuenta
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </DashboardSection>
          </motion.div>

        </motion.div>
      </div>

      <SettingsSaveFooter
        isLoading={isLoading}
        isModified={isModified}
        onSave={handleSave}
        saveText="Guardar Cambios Generales"
      />
    </>
  )
}