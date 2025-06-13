'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrandProfile } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface VisualTabProps {
  data: BrandProfile['visual'];
}

const ColorSwatch = ({ color, name, role, iaKeywords }: { color: string; name: string; role: string; iaKeywords: string[] }) => (
    <div className="flex flex-col items-center text-center">
        <div 
            className="h-24 w-24 rounded-full border-4 border-white dark:border-zinc-800 shadow-md"
            style={{ backgroundColor: color }}
        />
        <h4 className="mt-3 font-semibold text-sm">{name}</h4>
        <p className="text-xs text-muted-foreground">{role}</p>
        <p className="text-xs text-muted-foreground font-mono mt-1">{color}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-1">
            {iaKeywords.map(keyword => (
                <Badge key={keyword} variant="secondary">{keyword}</Badge>
            ))}
        </div>
    </div>
)

const TypographyCard = ({ title, font }: { title: string; font: BrandProfile['visual']['typography']['primary'] }) => (
    <Card className='flex-1'>
        <CardHeader>
            <CardTitle className="text-md">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-4xl font-bold" style={{ fontFamily: font.name }}>{font.name}</p>
            <p className="text-sm text-muted-foreground mt-2">{font.role}</p>
            <p className="text-xs text-muted-foreground">Provider: {font.provider} | Weight: {font.weight}</p>
        </CardContent>
    </Card>
)

export default function VisualTab({ data }: VisualTabProps) {
  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Paleta de Colores</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap justify-around gap-6">
                {data.colorPalette.map(color => (
                    <ColorSwatch key={color.name} {...color} />
                ))}
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Tipografía</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-4">
               <TypographyCard title="Fuente Primaria" font={data.typography.primary} />
               <TypographyCard title="Fuente Secundaria" font={data.typography.secondary} />
            </CardContent>
        </Card>
    </div>
  );
} 