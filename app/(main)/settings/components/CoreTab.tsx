import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function CoreTab() {
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