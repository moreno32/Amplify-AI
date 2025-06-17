import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BrandProfile } from '@/lib/types';

interface CoreTabProps {
  data: BrandProfile['core'];
}

export function CoreTab({ data }: CoreTabProps) {
  // Data is passed for future forms, but not used in the current static view.
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Promesa de Marca</CardTitle>
          <CardDescription>@CORE::Promise::001</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Guiar a las socias en su viaje de autoaceptación a través del
            yoga, convirtiendo el estudio en un 'Santuario'.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Arquetipos Narrativos</CardTitle>
          <CardDescription>@CORE::Narrative::001</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Principal: El Amante. Secundario: El Sabio.</p>
        </CardContent>
      </Card>
    </div>
  );
} 