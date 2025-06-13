'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrandProfile } from '@/lib/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Star, Ban } from 'lucide-react';

interface AssetsTabProps {
  data: BrandProfile['assets'];
}

export default function AssetsTab({ data }: AssetsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Galería de Activos de Marca</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.brandPhotos.map((photo) => (
            <div key={photo.id} className="group relative aspect-square">
              <Image
                src={photo.url}
                alt={photo.alt}
                fill
                className="object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
              />
               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-2">
                <p className="text-white text-xs text-center mb-4">{photo.alt}</p>
                <div className='flex gap-2'>
                    <Button size="icon" variant="secondary" className='h-9 w-9'>
                        <Star className="h-5 w-5 text-yellow-400" />
                    </Button>
                     <Button size="icon" variant="secondary" className='h-9 w-9'>
                        <Ban className="h-5 w-5 text-red-500" />
                    </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 