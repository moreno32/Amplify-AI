import { Button } from '@/components/ui/button';
import Link from 'next/link';

/**
 * Punto de entrada principal de la aplicación.
 * Redirige inmediatamente al usuario al dashboard desde el lado del servidor.
 */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Amplify-AI
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Bienvenido a tu plataforma de IA para la gestión de marcas.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild>
            <Link href="/dashboard">Ir al Dashboard &rarr;</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
