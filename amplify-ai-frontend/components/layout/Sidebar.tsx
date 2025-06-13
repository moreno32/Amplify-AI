'use client';

import {
  Book,
  BrainCircuit,
  Calendar,
  LayoutGrid,
  Lightbulb,
  MessageCircle,
  Settings,
  Sparkles,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
}

const NavItem = ({ href, icon: Icon, label, isActive }: NavItemProps) => (
  <Link
    href={href}
    className={cn(
      'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
      isActive && 'bg-muted text-primary'
    )}
  >
    <Icon className="h-4 w-4" />
    {label}
  </Link>
);

export function Sidebar() {
  const pathname = usePathname();

  const navItems: NavItemProps[] = [
    { href: '/dashboard', icon: LayoutGrid, label: 'Dashboard', isActive: pathname === '/dashboard' },
    { href: '/calendar', icon: Calendar, label: 'Calendario', isActive: pathname.startsWith('/calendar') },
    { href: '/inbox', icon: MessageCircle, label: 'Inbox', isActive: pathname.startsWith('/inbox') },
    { href: '/analytics', icon: Lightbulb, label: 'Métricas', isActive: pathname.startsWith('/analytics') },
    { href: '/influencers', icon: Users, label: 'Influencers', isActive: pathname.startsWith('/influencers') },
    { href: '/strategy-coach', icon: BrainCircuit, label: 'Strategy Coach', isActive: pathname.startsWith('/strategy-coach') },
    { href: '/brand-profile', icon: Sparkles, label: 'Perfil de Marca', isActive: pathname.startsWith('/brand-profile') },
  ];

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Book className="h-6 w-6" />
            <span className="">Amplify AI</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card>
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 