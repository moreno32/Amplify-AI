'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Book, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    toast.info('Verificando credenciales...');

    setTimeout(() => {
      if (email === 'dani@amplify.ai' && password === 'password123') {
        toast.success('¡Bienvenido de nuevo!', {
          description: 'Redirigiendo a tu dashboard...',
        });
        router.push('/dashboard');
      } else {
        toast.error('Error de autenticación', {
          description: 'El email o la contraseña son incorrectos.',
        });
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Tu copiloto de IA te espera</h1>
            <p className="text-balance text-muted-foreground">
              Introduce tus credenciales para acceder a tu dashboard.
            </p>
          </div>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@ejemplo.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-10 text-white">
          <div className="text-center">
            <Book className="mx-auto h-12 w-12" />
            <h2 className="mt-6 text-4xl font-bold">
              Contenido que vende, estrategia que enseña.
            </h2>
            <p className="mt-4 text-lg text-indigo-100">
              Deja que nuestra IA potencie tu marca y convierta seguidores en
              clientes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 