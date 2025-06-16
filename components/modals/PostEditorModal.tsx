import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Post } from '@/lib/types';
import { motion } from 'framer-motion';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Instagram, Facebook, Wand2, RefreshCcw, Upload, CalendarIcon } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface PostEditorModalProps {
  post: Post | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onPostUpdate: (updates: Partial<Post>) => void;
}

const overlayVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const contentVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -20 },
};

const formatDate = (date: Date) => {
    return format(date, "eeee, d 'de' MMMM", { locale: es });
}

export const PostEditorModal = ({ post, isOpen, onOpenChange, onPostUpdate }: PostEditorModalProps) => {
  const [activePlatform, setActivePlatform] = React.useState<'instagram' | 'facebook'>('instagram');
  const [editedContent, setEditedContent] = React.useState(post?.content || '');

  React.useEffect(() => {
    if (post) {
      setEditedContent(post.content);
    }
  }, [post]);

  const handleSave = () => {
    onPostUpdate({ content: editedContent });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <motion.div
        className="fixed inset-0 bg-black/60 z-50"
        variants={overlayVariants}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        transition={{ duration: 0.3 }}
      />
      <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0 gap-0" asChild>
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex flex-col h-full"
        >
          <DialogHeader className="p-6 pb-4 border-b">
            <DialogTitle className="flex items-center gap-2">
              {post ? 'Editando Post' : 'Crear Nuevo Post'}
              {post && <Badge variant="secondary">{post.status}</Badge>}
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 min-h-0">
            {/* Left Panel: Preview */}
            <div className="bg-muted/30 md:col-span-1 flex flex-col items-center justify-center p-8 overflow-y-auto border-r">
              <div className="w-full max-w-[350px] border bg-background shadow-lg rounded-lg overflow-hidden">
                <div className="flex items-center p-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://picsum.photos/100/100?random=1" />
                    <AvatarFallback>O2</AvatarFallback>
                  </Avatar>
                  <span className="ml-3 font-semibold text-sm">O2CW Boutique Gym</span>
                </div>

                {post?.image && (
                  <div className="relative aspect-square">
                    <Image src={post.image} alt="Preview" fill className="object-cover" />
                  </div>
                )}

                <div className="p-4 text-sm">
                  <p>
                    <span className="font-semibold">O2CW Boutique Gym </span>
                    {editedContent}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Panel: Editor */}
            <div className="flex flex-col gap-8 p-8 overflow-y-auto md:col-span-2">
              <div>
                <h3 className="text-lg font-semibold mb-3">Imagen del Post</h3>
                <div className="relative aspect-video w-full rounded-lg overflow-hidden border">
                  {post?.image && (
                    <Image
                      src={post.image}
                      alt="Post image"
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">
                    <RefreshCcw className="mr-2 h-4 w-4" /> Regenerar con IA
                  </Button>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" /> Cambiar
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Copy del Post</h3>
                <div className="relative">
                  <Textarea 
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    rows={8} 
                    className="pr-10 text-base" 
                  />
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7">
                    <Wand2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Programación</h3>
                <p className="text-base text-muted-foreground flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>
                    {post ? `Programado para: ${formatDate(post.startTime)} a las ${format(post.startTime, 'HH:mm')}` : 'Se programará a la fecha/hora seleccionada'}
                  </span>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Vista Previa por Plataforma</h3>
                <ToggleGroup
                  type="single"
                  variant="outline"
                  size="sm"
                  value={activePlatform}
                  onValueChange={(value) => {
                    if (value) setActivePlatform(value as 'instagram' | 'facebook');
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
          <DialogFooter className="p-4 border-t bg-background mt-auto">
            <Button variant="ghost">Guardar como Borrador</Button>
            <Button onClick={handleSave}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Aprobar y Programar
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}; 