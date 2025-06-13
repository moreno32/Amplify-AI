'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Post } from '@/lib/mock-data/types';
import { ImageIcon, RefreshCcw, Upload, Wand2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

function PostPreview({ post }: { post: Post | null }) {
  if (!post)
    return (
      <div className="hidden md:flex flex-col items-center justify-center h-full bg-muted/40 rounded-lg">
        <ImageIcon className="h-16 w-16 text-muted-foreground" />
        <p className="mt-2 text-muted-foreground">Vista Previa del Post</p>
      </div>
    );

  return (
    <div className="hidden md:flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[350px] border rounded-2xl shadow-lg overflow-hidden bg-background">
        <div className="p-3 flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-muted" />
          <span className="font-semibold text-sm">tu_usuario</span>
        </div>
        <Image
          src={post.imageUrl}
          alt="Post preview"
          width={400}
          height={400}
          className="w-full object-cover aspect-square"
        />
        <div className="p-3 text-sm">
          <p>{post.copy}</p>
        </div>
      </div>
    </div>
  );
}

function EditingWorkshop({ post }: { post: Post | null }) {
  if (!post) return null;

  return (
    <div className="p-6 h-full flex flex-col">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          Editando Post <Badge>{post.status}</Badge>
        </DialogTitle>
      </DialogHeader>
      <div className="flex-1 mt-4 space-y-6 overflow-y-auto">
        <div>
          <h3 className="font-semibold mb-2">Imagen del Post</h3>
          <div className="relative w-full h-48 rounded-lg overflow-hidden">
            <Image
              src={post.imageUrl}
              alt="Post image to edit"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex gap-2 mt-2">
            <Button variant="outline" size="sm">
              <RefreshCcw className="mr-2 h-4 w-4" /> Regenerar con IA
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" /> Cambiar Imagen
            </Button>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Copy del Post</h3>
          <div className="relative">
            <Textarea defaultValue={post.copy} className="h-48" />
            <Button
              size="icon"
              variant="outline"
              className="absolute top-2 right-2 rounded-full h-8 w-8"
            >
              <Wand2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Programación</h3>
          {/* DatePicker would go here */}
          <p className="text-sm text-muted-foreground">
            Programado para:{' '}
            {new Date(post.scheduledAt).toLocaleString('es-ES')}
          </p>
        </div>
      </div>
      <DialogFooter className="mt-6">
        <Button variant="ghost">Guardar como Borrador</Button>
        <Button>
          ✅ Aprobar y Programar
        </Button>
      </DialogFooter>
    </div>
  );
}

interface PostEditorModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  post: Post | null;
}

export function PostEditorModal({
  isOpen,
  onOpenChange,
  post,
}: PostEditorModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 border-0 max-w-5xl h-[700px] grid grid-cols-1 md:grid-cols-[45%_55%] gap-0">
        <div className="bg-muted/20">
          <PostPreview post={post} />
        </div>
        <div className="bg-background rounded-r-lg">
          <EditingWorkshop post={post} />
        </div>
      </DialogContent>
    </Dialog>
  );
} 