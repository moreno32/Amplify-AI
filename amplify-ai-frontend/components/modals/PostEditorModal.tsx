'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Post } from '@/lib/types';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import {
  Calendar as CalendarIcon,
  RefreshCcw,
  Upload,
  Wand2,
} from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { Instagram, Facebook } from 'lucide-react';
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
    })
}

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
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Editando Post <Badge variant="secondary">{post.status}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-8 flex-1 overflow-hidden">
          {/* Left Panel: Preview */}
          <div className="bg-muted/40 rounded-lg flex flex-col items-center justify-center p-4 overflow-y-auto">
            <div className='w-full max-w-[350px] border bg-background shadow-lg rounded-lg'>
                {/* Instagram Header */}
                <div className="flex items-center p-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://images.unsplash.com/photo-1621847412523-04b9b43512d7?w=100&h=100&fit=crop&q=80" />
                        <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <span className="ml-3 font-semibold text-sm">Amplify.AI</span>
                </div>

                {/* Image */}
                {post.imageUrl && (
                    <div className="relative aspect-square">
                        <Image src={post.imageUrl} alt="Preview" fill className="object-cover" />
                    </div>
                )}
                
                {/* Actions and Copy */}
                <div className="p-3">
                    <p className="text-sm">
                        <span className="font-semibold">Amplify.AI </span>
                        {post.content}
                    </p>
                </div>
            </div>
          </div>

          {/* Right Panel: Editor */}
          <div className="flex flex-col gap-4 overflow-y-auto pr-2">
            <div>
              <h3 className="text-lg font-semibold mb-2">Imagen del Post</h3>
              <div className="relative aspect-video w-full">
                {post.imageUrl && (
                  <Image
                    src={post.imageUrl}
                    alt="Post image"
                    fill
                    className="rounded-md object-cover"
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
              <h3 className="text-lg font-semibold mb-2">Copy del Post</h3>
              <div className="relative">
                <Textarea defaultValue={post.content} rows={8} className='pr-10'/>
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7">
                    <Wand2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Programación</h3>
                <p className='text-sm text-muted-foreground flex items-center gap-2'>
                    <CalendarIcon className='h-4 w-4'/>
                    Programado para: {formatDate(scheduleDate)} a las {post.time}
                </p>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Vista Previa</h3>
                <ToggleGroup 
                    type="single" 
                    variant="outline"
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

        <DialogFooter>
            <Button variant="ghost">Guardar como Borrador</Button>
            <Button><RefreshCcw className="mr-2 h-4 w-4" /> Aprobar y Programar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 