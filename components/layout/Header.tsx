'use client';

import * as React from 'react';
import {
  Book,
  Home,
  LineChart,
  Menu,
  Package,
  PlusCircle,
  Search,
  Settings,
  User,
  Users,
  Bell,
  CreditCard,
  LogOut,
  HelpCircle,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CreateCampaignModal } from '@/components/modals/CreateCampaignModal';
import { CommandPalette } from '@/components/shared/CommandPalette';
import { NotificationSheet } from '@/components/shared/NotificationSheet';
import { Badge } from '@/components/ui/badge';
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
} from '@/components/ui/alert-dialog';

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/calendar', label: 'Calendario' },
  { href: '/inbox', label: 'Inbox' },
  { href: '/analytics', label: 'Métricas' },
  { href: '/influencers', label: 'Influencers' },
  { href: '/strategy-coach', label: 'Strategy Coach' },
  { href: '/brand-profile', label: 'Perfil de Marca' },
];

// Mobile nav data can be simplified as it's not the main focus
const mobileNavItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/calendar', label: 'Calendar' },
];

export function Header() {
  const pathname = usePathname();
  const [isCampaignModalOpen, setCampaignModalOpen] = React.useState(false);
  const [isCommandPaletteOpen, setCommandPaletteOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandPaletteOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const pageTitle = React.useMemo(() => {
    const currentPath = pathname.split('/')[1];
    const activeItem = navItems.find((item) => item.href.includes(currentPath));
    return activeItem ? activeItem.label : 'Dashboard';
  }, [pathname]);

  const newNotificationsCount = 5; // Mock data

  const handleLogout = () => {
    // In a real app, you'd clear session state here
    console.log('Logging out...');
    router.push('/login');
  };

  return (
    <>
      <header className="flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        {/* Left Zone: Search */}
        <div className="flex flex-1 items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              {/* Mobile nav content */}
            </SheetContent>
          </Sheet>
          <div className="hidden w-1/3 md:block">
            <Button
              variant="outline"
              className="w-full justify-start text-sm text-muted-foreground"
              onClick={() => setCommandPaletteOpen(true)}
            >
              <Search className="mr-2 h-4 w-4" />
              <span>Busca o ejecuta un comando...</span>
            </Button>
          </div>
        </div>

        {/* Right Zone: Actions */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
                <span className="sr-only">Ayuda</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Documentación</DropdownMenuItem>
              <DropdownMenuItem>Novedades</DropdownMenuItem>
              <DropdownMenuItem>Contactar Soporte</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <NotificationSheet newNotificationsCount={5} />

          <CreateCampaignModal
            isOpen={isCampaignModalOpen}
            onOpenChange={setCampaignModalOpen}
          />
          <Button
            className="shrink-0"
            onClick={() => setCampaignModalOpen(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Crear Campaña</span>
          </Button>

          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                  aria-label="Abrir menú de usuario"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="Avatar de usuario"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="transition-colors">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Ajustes</span>
                  </Link>
                </DropdownMenuItem>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  ¿Estás seguro de que quieres cerrar la sesión?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Serás redirigido a la pantalla de inicio de sesión.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleLogout}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Cerrar Sesión
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </header>
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onOpenChange={setCommandPaletteOpen}
      />
    </>
  );
} 