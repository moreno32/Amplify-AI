'use client';

import { BrandAsset } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Star, Ban, Download } from 'lucide-react';
import Image from 'next/image';

interface AssetCardProps {
  asset: BrandAsset;
}

export const AssetCard = ({ asset }: AssetCardProps) => {
  return (
    <div className="group relative aspect-square">
      <Image
        src={asset.url}
        alt={asset.alt}
        fill
        className="object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
        <p className="text-white text-sm font-semibold mb-3">{asset.alt}</p>
        <div className="flex gap-2">
          <Button size="icon" variant="secondary" className="h-9 w-9">
            <Star className="h-5 w-5 text-yellow-400" />
          </Button>
          <Button size="icon" variant="secondary" className="h-9 w-9">
            <Ban className="h-5 w-5 text-red-500" />
          </Button>
          <a href={asset.url} download target="_blank" rel="noopener noreferrer">
            <Button size="icon" variant="secondary" className="h-9 w-9">
                <Download className="h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}; 