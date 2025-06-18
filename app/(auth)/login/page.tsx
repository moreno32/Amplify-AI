'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Book, Eye, EyeOff, Chrome } from 'lucide-react';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OrbitalShowcase } from '@/components/auth/OrbitalShowcase';

export default function LoginPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [view, setView] = useState<'login' | 'register'>('login');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleAuthAction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (view === 'login') {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        toast.success('¡Inicio de sesión exitoso!', {
          description: 'Redirigiendo a tu copiloto...',
        });
        router.push('/dashboard');
        router.refresh();
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: `${firstName} ${lastName}`.trim(),
          },
        },
      });

      if (error) {
        setError(error.message);
      } else {
        toast.success('¡Cuenta creada!', {
          description: 'Por favor, revisa tu email para verificar tu cuenta.',
        });
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="relative flex h-full flex-col items-center justify-center p-6 lg:p-12">
        <div className="absolute left-8 top-8">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Book className="h-6 w-6" />
            <span className="text-lg">Amplify AI</span>
          </Link>
        </div>

        <form onSubmit={handleAuthAction}>
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                {view === 'login'
                  ? 'Bienvenido de vuelta'
                  : 'Crea tu cuenta inteligente'}
              </CardTitle>
              <CardDescription>
                {view === 'login'
                  ? 'Introduce tus credenciales para acceder a tu copiloto.'
                  : 'Empieza a automatizar tu contenido en menos de 5 minutos.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5">
              {view === 'register' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">Nombre</Label>
                    <Input
                      id="first-name"
                      placeholder="Juan"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name">Apellido</Label>
                    <Input
                      id="last-name"
                      placeholder="Pérez"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nombre@ejemplo.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {view === 'login' && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember-me" />
                    <Label htmlFor="remember-me" className="text-sm font-normal">
                      Recuérdame
                    </Label>
                  </div>
                  <Link
                    href="#"
                    className="text-xs text-muted-foreground hover:text-primary hover:underline"
                  >
                    ¿Has olvidado la contraseña?
                  </Link>
                </div>
              )}
              
              {view === 'register' && (
                  <div className="grid gap-2">
                      <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                      <Input id="confirm-password" type="password" required />
                  </div>
              )}

              {error && <p className="text-red-500 text-sm px-6">{error}</p>}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (view === 'login' ? 'Entrando...' : 'Creando...') : (view === 'login' ? 'Entrar' : 'Crear Cuenta Gratis')}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    O inicia sesión con
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full transition-all hover:scale-105 hover:bg-muted">
                  <Chrome className="mr-2 h-4 w-4" />
                  Google
                </Button>
                <Button variant="outline" className="w-full transition-all hover:scale-105 hover:bg-muted">
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-4 w-4"
                  >
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-1.84.048-3.13 1.2-3.96 2.903-1.464 2.994-.744 7.394 1.176 9.873.816 1.151 1.812 2.535 3.12 2.504 1.2-.03 1.62-.744 3.036-.744 1.416 0 1.776.744 3.036.744 1.344.03 2.112-1.233 2.916-2.456.972-1.498 1.44-3.078 1.44-3.132 0-.03-2.11-1.248-2.14-3.332-.03-2.448 1.764-3.624 1.848-3.708-.96-.996-2.388-1.536-3.684-1.536-2.052 0-3.624 1.332-4.596 1.332zM10.02 3.032c.792-1.02 1.932-1.68 3.132-1.728-.084 1.152-.636 2.22-1.56 2.952-.84.66-1.956 1.32-3.084 1.284.12-1.212.6-2.328 1.512-2.508z"
                      fill="#1C1C1C"
                    ></path>
                  </svg>
                  Apple
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-center text-sm w-full">
                {view === 'login' ? (
                  <span className="text-muted-foreground">
                    ¿No tienes una cuenta?{' '}
                    <button
                      onClick={() => setView('register')}
                      className="font-semibold text-primary hover:underline"
                    >
                      Regístrate ahora
                    </button>
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    ¿Ya tienes una cuenta?{' '}
                    <button
                      onClick={() => setView('login')}
                      className="font-semibold text-primary hover:underline"
                    >
                      Inicia sesión
                    </button>
                  </span>
                )}
              </div>
            </CardFooter>
          </Card>
        </form>

        <footer className="absolute bottom-6 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Amplify AI. Todos los derechos reservados.
        </footer>
      </div>
      <div
        className="hidden lg:flex flex-col relative overflow-hidden p-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"
        aria-hidden="true"
      >
        <div className="relative z-20 max-w-xl pointer-events-none">
          <h1 className="text-5xl font-bold tracking-tight text-white !leading-tight">
            Marketing inteligente.
            <br />
            Crecimiento exponencial.
          </h1>
          <p className="mt-4 text-lg text-white/80">
            La plataforma unificada para definir tu marca, crear contenido que
            resuene y dominar tu estrategia.
          </p>
        </div>
        <div className="flex-grow flex items-center justify-center relative z-10 -mt-12">
          <OrbitalShowcase />
        </div>
      </div>
    </div>
  );
} 