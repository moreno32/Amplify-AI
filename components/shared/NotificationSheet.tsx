'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NotificationSheetProps {
  newNotificationsCount?: number;
}

export function NotificationSheet({
  newNotificationsCount = 0,
}: NotificationSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label={
            newNotificationsCount > 0
              ? `Tienes ${newNotificationsCount} notificaciones nuevas`
              : 'No tienes notificaciones nuevas'
          }
        >
          <Bell className="h-5 w-5" />
          {newNotificationsCount > 0 && (
            <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent p-0 text-xs text-accent-foreground">
              {newNotificationsCount > 9 ? '9+' : newNotificationsCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notificaciones</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Aquí aparecerán tus notificaciones.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
} 