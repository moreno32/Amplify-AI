'use client';

import Image from 'next/image';
import { Card } from "@/components/ui/card";

interface RitualCardProps {
  title: string;
  description: string;
  imageUrl: string;
  isPriority?: boolean;
}

export const RitualCard = ({ title, description, imageUrl, isPriority = false }: RitualCardProps) => {
  return (
    <Card className="relative overflow-hidden group h-full focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--brand-accent)]">
      <div className="absolute inset-0 transition-transform duration-300 ease-in-out group-hover:scale-105">
        <Image
          src={imageUrl}
          alt={`Imagen representando el ritual de ${title}`}
          fill
          priority={isPriority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      <div className="relative flex flex-col justify-end h-full p-4 text-white transition-transform duration-300 ease-in-out group-hover:-translate-y-2">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm text-gray-200 truncate">{description}</p>
      </div>
    </Card>
  );
}; 