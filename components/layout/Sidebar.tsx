'use client';

import * as React from 'react';
import {
  Book,
  BrainCircuit,
  Calendar,
  ChevronDown,
  CreditCard,
  LayoutGrid,
  Lightbulb,
  LineChart,
  LogOut,
  MessageCircle,
  Rocket,
  Settings,
  Users,
  Puzzle,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

const NavLink = ({ href, icon: Icon, label }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors duration-200 hover:bg-muted/50 hover:text-primary',
        {
          'bg-primary text-primary-foreground': isActive,
        }
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  );
};

export function Sidebar() {
  const [isUpgradeCardExpanded, setUpgradeCardExpanded] = React.useState(true);
  const mainNavItems = [
    { href: '/dashboard', icon: LayoutGrid, label: 'Dashboard' },
    { href: '/calendar', icon: Calendar, label: 'Calendario' },
    { href: '/inbox', icon: MessageCircle, label: 'Inbox' },
    { href: '/analytics', icon: Lightbulb, label: 'Métricas' },
    { href: '/influencers', icon: Users, label: 'Influencers' },
    { href: '/strategy-coach', icon: BrainCircuit, label: 'Strategy Coach' },
    { href: '/brand-profile', icon: LineChart, label: 'Perfil de Marca' },
  ];
  const settingsNavItems = [
    { href: '/integrations', icon: Puzzle, label: 'Integraciones' },
    { href: '/settings', icon: Settings, label: 'Ajustes' },
  ];

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Book className="h-6 w-6 text-accent" />
            <span className="">Amplify AI</span>
          </Link>
        </div>

        <div className="flex-1 overflow-auto py-4">
          <nav className="grid items-start gap-1 px-2 text-sm font-medium lg:px-4">
            {mainNavItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </nav>
          <Separator className="my-4" />
          <nav className="grid items-start gap-1 px-2 text-sm font-medium lg:px-4">
            {settingsNavItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </nav>
        </div>

        <div className="mt-auto flex flex-col gap-4 p-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Rocket className="h-6 w-6 text-accent" />
                <CardTitle className="text-base">
                  Desbloquea tu potencial
                </CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setUpgradeCardExpanded(!isUpgradeCardExpanded)}
                aria-expanded={isUpgradeCardExpanded}
              >
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform duration-300',
                    isUpgradeCardExpanded && 'rotate-180'
                  )}
                />
              </Button>
            </CardHeader>
            {isUpgradeCardExpanded && (
              <CardContent className="p-4 pt-0">
                <CardDescription className="mb-4">
                  Accede a analíticas avanzadas, creación ilimitada y más.
                </CardDescription>
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
} 