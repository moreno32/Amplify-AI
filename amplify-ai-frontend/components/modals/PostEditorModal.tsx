'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Post } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import {
  Calendar as CalendarIcon,
  Facebook,
  Instagram,
  RefreshCcw,
  Upload,
  Wand2,
} from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import React from 'react';

interface PostEditorModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  post: Post | null;
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export function PostEditorModal({
  isOpen,
  onOpenChange,
  post,
}: PostEditorModalProps) {
  const [activePlatform, setActivePlatform] = React.useState<'instagram' | 'facebook'>('instagram');

  if (!post) return null;

  const scheduleDate = new Date(`${post.date}T${post.time}`);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            Editando Post <Badge variant="secondary">{post.status}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 min-h-0">
          {/* Left Panel: Preview */}
          <div className="bg-muted/30 flex flex-col items-center justify-center p-6 overflow-y-auto border-r">
            <div className="w-full max-w-[350px] border bg-background shadow-lg rounded-lg overflow-hidden">
              <div className="flex items-center p-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1621847412523-04b9b43512d7?w=100&h=100&fit=crop&q=80" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <span className="ml-3 font-semibold text-sm">Amplify.AI</span>
              </div>

              {post.imageUrl && (
                <div className="relative aspect-square">
                  <Image src={post.imageUrl} alt="Preview" fill className="object-cover" />
                </div>
              )}

              <div className="p-4 text-sm">
                <p>
                  <span className="font-semibold">Amplify.AI </span>
                  {post.content}
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel: Editor */}
          <div className="flex flex-col gap-6 p-6 overflow-y-auto">
            <div>
              <h3 className="text-base font-semibold mb-2">Imagen del Post</h3>
              <div className="relative aspect-video w-full rounded-md overflow-hidden">
                {post.imageUrl && (
                  <Image
                    src={post.imageUrl}
                    alt="Post image"
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm">
                  <RefreshCcw className="mr-2 h-4 w-4" /> Regenerar con IA
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" /> Cambiar
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-2">Copy del Post</h3>
              <div className="relative">
                <Textarea defaultValue={post.content} rows={6} className="pr-10" />
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7">
                  <Wand2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-2">Programación</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>Programado para: {formatDate(scheduleDate)} a las {post.time}</span>
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-2">Vista Previa por Plataforma</h3>
              <ToggleGroup
                type="single"
                variant="outline"
                size="sm"
                value={activePlatform}
                onValueChange={(value) => {
                  if (value) setActivePlatform(value as any);
                }}
              >
                <ToggleGroupItem value="instagram" aria-label="Instagram">
                  <Instagram className="h-4 w-4 mr-2" />
                  Instagram
                </ToggleGroupItem>
                <ToggleGroupItem value="facebook" aria-label="Facebook">
                  <Facebook className="h-4 w-4 mr-2" />
                  Facebook
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </div>

        <DialogFooter className="p-4 border-t bg-background">
          <Button variant="ghost">Guardar como Borrador</Button>
          <Button>
            <RefreshCcw className="mr-2 h-4 w-4" /> Aprobar y Programar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 