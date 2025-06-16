'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { BrandAsset, BrandAssetCategory, BrandProfile } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AssetCard } from './AssetCard';
import { UploadCloud, FolderKanban } from 'lucide-react';
import { BlockHeader } from '@/components/shared/BlockHeader';
import { Button } from '@/components/ui/button';

interface AssetsTabProps {
  data: BrandProfile['assets'];
}

const UploadZone = () => (
    <div className="text-center py-16 px-6 border-2 border-dashed border-muted rounded-lg">
        <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">Aún no hay activos en esta categoría</h3>
        <p className="mt-1 text-sm text-muted-foreground">
            Arrastra y suelta tus archivos aquí o haz clic en el botón para subirlos.
        </p>
    </div>
)

export const AssetsTab = ({ data }: AssetsTabProps) => {
  const combinedAssets = [
      ...data.logos,
      ...data.photos,
      ...data.videos
  ];

  const allItems: BrandAsset[] = combinedAssets.map((item, index) => ({
      id: `${item.name}-${index}`,
      url: item.url,
      alt: item.name,
      category: item.type as BrandAssetCategory,
  }));
  
  const availableCategories = [...new Set(allItems.map(item => item.category))];
  
  return (
    <div className="space-y-8">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <BlockHeader 
                    icon={FolderKanban}
                    title="Librería de Activos"
                    description="Tu colección centralizada de logos, imágenes y otros recursos visuales de marca."
                />
                <Button>
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Subir Activo
                </Button>
            </CardHeader>
            <CardContent className="p-6">
                <Tabs defaultValue={availableCategories[0]} className="w-full">
                    <TabsList>
                        {availableCategories.map(category => (
                            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                        ))}
                    </TabsList>
                    {availableCategories.map(category => {
                        const filteredAssets = allItems.filter(item => item.category === category);
                        return (
                            <TabsContent key={category} value={category} className="pt-6">
                                {filteredAssets.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                        {filteredAssets.map((asset) => (
                                            <AssetCard key={asset.id} asset={asset} />
                                        ))}
                                    </div>
                                ) : (
                                    <UploadZone />
                                )}
                            </TabsContent>
                        )
                    })}
                </Tabs>
            </CardContent>
        </Card>
    </div>
  );
}; 