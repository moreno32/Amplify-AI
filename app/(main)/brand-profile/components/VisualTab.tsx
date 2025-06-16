'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { BrandProfile } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { BlockHeader } from '@/components/shared/BlockHeader';
import { Palette, Type } from 'lucide-react';

interface VisualTabProps {
  data: BrandProfile['visual'];
}

const ColorSwatch = ({ color, name, role, keywords }: { color: string; name: string; role: string; keywords: string; }) => (
    <div className="flex flex-col items-center text-center">
        <div 
            className="h-24 w-24 rounded-full border-4 border-background shadow-md"
            style={{ backgroundColor: color }}
        />
        <h4 className="mt-3 font-semibold text-sm">{name}</h4>
        <p className="text-xs text-muted-foreground">{role}</p>
        <p className="text-xs text-muted-foreground font-mono mt-1">{color.toUpperCase()}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-1">
            {keywords.split(',').map(keyword => (
                <Badge key={keyword} variant="secondary" className="font-normal">{keyword.trim()}</Badge>
            ))}
        </div>
    </div>
)

const TypographyCard = ({ title, font }: { title: string; font: BrandProfile['visual']['typography']['primary'] }) => (
    <Card className='flex-1 bg-muted/50'>
        <CardHeader>
            <h4 className="font-semibold">{title}</h4>
        </CardHeader>
        <CardContent>
            <p className="text-4xl font-bold truncate" style={{ fontFamily: font.family }}>{font.family}</p>
            <p className="text-sm text-muted-foreground mt-2">{font.use}</p>
            <p className="text-xs text-muted-foreground">Provider: {font.provider} | Weight: {font.weight}</p>
        </CardContent>
    </Card>
)

export const VisualTab = ({ data }: VisualTabProps) => {
  return (
    <div className="space-y-8">
        <Card>
            <CardHeader>
                <BlockHeader 
                    icon={Palette}
                    title="Paleta de Colores"
                    description="Así se siente tu marca visualmente."
                />
            </CardHeader>
            <CardContent className="p-6 pt-4 grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h4 className="font-semibold">Paleta de Colores</h4>
                    <div className="flex flex-wrap gap-4">
                        {data.colorPalette.map((color) => (
                            <ColorSwatch 
                                key={color.name}
                                name={color.name}
                                role={color.role}
                                color={color.color}
                                keywords={color.keywords}
                            />
                        ))}
                    </div>
                </div>
                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <BlockHeader 
                                icon={Type}
                                title="Tipografía de Marca"
                                description="Las fuentes que usamos para comunicarnos, asegurando legibilidad y consistencia."
                            />
                        </CardHeader>
                        <CardContent className="p-6 flex flex-col md:flex-row gap-4">
                           <TypographyCard title="Fuente Primaria (Títulos)" font={data.typography.primary} />
                           <TypographyCard title="Fuente Secundaria (Cuerpo)" font={data.typography.secondary} />
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}; 