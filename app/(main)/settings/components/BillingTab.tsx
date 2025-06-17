'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { DashboardSection } from '@/components/shared/DashboardSection'
import { BlockHeader } from '@/components/shared/BlockHeader'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, CreditCard, Download, History, MoreVertical, PlusCircle, Star } from 'lucide-react'
import Image from 'next/image'

const paymentMethodsData = [
    { id: 'pm_1', type: 'Visa', last4: '4242', expiry: '12/26', isDefault: true },
    { id: 'pm_2', type: 'Mastercard', last4: '8989', expiry: '08/25', isDefault: false },
]

const invoicesData = [
  { id: 'INV-2024-007', date: '1 de Agosto, 2024', amount: '$49.00', status: 'Pagado' },
  { id: 'INV-2024-006', date: '1 de Julio, 2024', amount: '$49.00', status: 'Pagado' },
  { id: 'INV-2024-005', date: '1 de Junio, 2024', amount: '$49.00', status: 'Pagado' },
  { id: 'INV-2024-004', date: '1 de Mayo, 2024', amount: '$49.00', status: 'Fallido' },
  { id: 'INV-2024-003', date: '1 de Abril, 2024', amount: '$49.00', status: 'Pagado' },
  { id: 'INV-2024-002', date: '1 de Marzo, 2024', amount: '$49.00', status: 'Pagado' },
  { id: 'INV-2024-001', date: '1 de Febrero, 2024', amount: '$49.00', status: 'Pendiente' },
]

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

const getCardIcon = (cardType: string) => {
  const size = 40;
  const timestamp = new Date().getTime(); // Cache-busting timestamp
  switch (cardType.toLowerCase()) {
    case 'visa':
      return <Image src={`/visa-logo.svg?v=${timestamp}`} alt="Visa" width={size} height={size} className="object-contain" />;
    case 'mastercard':
      return <Image src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" width={size} height={size} className="object-contain" />;
    default:
      return <CreditCard className="h-8 w-8 text-muted-foreground" />;
  }
};

export function BillingTab() {
  const handleActionClick = (message: string) => {
    toast.info(message)
  }

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const invoicesPerPage = 5;
  const totalPages = Math.ceil(invoicesData.length / invoicesPerPage);
  const currentInvoices = invoicesData.slice(
    (currentPage - 1) * invoicesPerPage,
    currentPage * invoicesPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
    }
  }
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pagado':
        return <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50">{status}</Badge>;
      case 'Pendiente':
         return <Badge variant="outline" className="text-amber-600 border-amber-600 bg-amber-50">{status}</Badge>;
      case 'Fallido':
        return <Badge variant="destructive" >{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* --- Plan & Payment Methods Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* --- Current Plan Section --- */}
        <motion.div variants={itemVariants}>
          <DashboardSection
            title="Tu Plan Actual"
          >
            <BlockHeader icon={CheckCircle} title="Tu Plan Actual" description="Gestiona tu suscripción y explora otras opciones." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <Card className="border-primary/50 ring-2 ring-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Plan Pro</span>
                    <Badge variant="outline" className="text-primary border-primary">Plan Actual</Badge>
                  </CardTitle>
                  <CardDescription>Nuestro plan más popular.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                      10 perfiles sociales
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                      Análisis de competencia
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                      Asistente IA Avanzado
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                      Soporte prioritario
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="flex-col items-start space-y-2">
                  <div className="text-3xl font-bold">
                    $49<span className="text-sm font-normal text-muted-foreground">/mes</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Se renueva el 1 de Sep, 2024
                  </p>
                </CardFooter>
              </Card>
              
              <Card className="border-dashed">
                <CardHeader>
                  <CardTitle>Plan Business</CardTitle>
                  <CardDescription>Escala tu estrategia de marca.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                      Perfiles sociales ilimitados
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                      Analíticas avanzadas e informes
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                      Colaboración en equipo
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                      Manager de cuenta dedicado
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="flex-col items-stretch space-y-2">
                  <div className="text-3xl font-bold">
                    $99<span className="text-sm font-normal text-muted-foreground">/mes</span>
                  </div>
                  <Button className="w-full">
                    Mejorar a Business
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </DashboardSection>
        </motion.div>
        
        {/* --- Payment Methods Section --- */}
        <motion.div variants={itemVariants}>
           <DashboardSection title="Métodos de Pago" className="h-full">
            <BlockHeader
              icon={CreditCard}
              title="Métodos de Pago"
              description="Gestiona tus tarjetas guardadas."
            />
             <div className="flex flex-col h-full">
              <div className="flex-grow space-y-4">
                {paymentMethodsData.map(pm => (
                    <motion.div
                        key={pm.id}
                        className="p-4 rounded-lg border bg-card flex items-center justify-between transition-all hover:shadow-md hover:scale-[1.02]"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="flex items-center gap-4">
                            {getCardIcon(pm.type)}
                            <div>
                                <p className="font-semibold">{pm.type} •••• {pm.last4}</p>
                                <p className="text-sm text-muted-foreground">Expira {pm.expiry}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {pm.isDefault && <Badge variant="secondary">Predeterminado</Badge>}
                             <AlertDialog>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleActionClick("Funcionalidad para hacer predeterminado.")}>Hacer predeterminado</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleActionClick("Funcionalidad para actualizar método.")}>Actualizar</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <AlertDialogTrigger asChild>
                                            <DropdownMenuItem className="text-destructive" onSelect={(e) => e.preventDefault()}>Eliminar</DropdownMenuItem>
                                        </AlertDialogTrigger>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Esta acción es permanente. Se eliminará el método de pago y no se podrá deshacer.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => toast.success("Método de pago eliminado.")}>
                                        Confirmar y Eliminar
                                    </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                             </AlertDialog>
                        </div>
                    </motion.div>
                ))}
              </div>
               <Dialog>
                 <DialogTrigger asChild>
                    <Button variant="outline" className="mt-auto w-full">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Añadir nuevo método
                    </Button>
                 </DialogTrigger>
                 <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Añadir Nuevo Método de Pago</DialogTitle>
                        <DialogDescription>
                            Esta es una demostración. En una aplicación real, aquí se cargaría un elemento seguro de Stripe/Braintree.
                        </DialogDescription>
                    </DialogHeader>
                     <div className="py-8 text-center text-muted-foreground">
                        [Stripe Card Element Placeholder]
                    </div>
                 </DialogContent>
               </Dialog>
            </div>
          </DashboardSection>
        </motion.div>
      </div>

      {/* --- Invoice History Section --- */}
      <motion.div variants={itemVariants}>
        <DashboardSection title="Historial de Facturas">
          <BlockHeader
            icon={History}
            title="Historial de Facturas"
            description="Consulta y descarga tus facturas anteriores."
          />
          <Card>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nº Factura</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Importe</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell>
                        {getStatusBadge(invoice.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleActionClick(`Descargando ${invoice.id}...`)}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
          <Pagination className="mt-6">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" onClick={(e: React.MouseEvent) => {e.preventDefault(); handlePageChange(currentPage - 1)}} />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                        <PaginationLink href="#" isActive={currentPage === i + 1} onClick={(e: React.MouseEvent) => {e.preventDefault(); handlePageChange(i + 1)}}>
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext href="#" onClick={(e: React.MouseEvent) => {e.preventDefault(); handlePageChange(currentPage + 1)}}/>
                </PaginationItem>
            </PaginationContent>
          </Pagination>
        </DashboardSection>
      </motion.div>
    </motion.div>
  )
} 