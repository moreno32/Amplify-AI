'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Book, Eye, EyeOff, Chrome } from 'lucide-react';
import { toast } from 'sonner';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [view, setView] = useState<'login' | 'register'>('login');

  const handleAuthAction = () => {
    if (view === 'login') {
      if (email && password) {
        toast.success('¡Inicio de sesión exitoso!', {
          description: 'Redirigiendo a tu copiloto...',
        });
        router.push('/dashboard');
      } else {
        toast.error('Credenciales inválidas', {
          description: 'Por favor, introduce un email y contraseña válidos.',
        });
      }
    } else {
      // Lógica de registro simulada
      if (email && password) {
        toast.success('¡Cuenta creada exitosamente!', {
          description: 'Ahora puedes iniciar sesión.',
        });
        setView('login');
      } else {
        toast.error('Error en el registro', {
          description: 'Por favor, completa todos los campos.',
        });
      }
    }
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
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nombre@ejemplo.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            <Button
              type="submit"
              className="w-full"
              onClick={handleAuthAction}
            >
              {view === 'login' ? 'Entrar' : 'Crear Cuenta Gratis'}
            </Button>

            <div className="my-4 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">
                O inicia sesión con
              </span>
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
                  className="mr-2 h-4 w-4"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.25,6.17c-1.65,0-3.34,0.92-4.22,2.39a4.4,4.4,0,0,0-.6,3.89,4.73,4.73,0,0,0,2.3,3.23c0.88,0.59,2.08,0.88,3.23,0.5,1.42-.48,2.29-1.94,2.3-1.95a0.35,0.35,0,0,0-.29-0.51,3.13,3.13,0,0,1-1-1.85,0.35,0.35,0,0,0-.39-0.3c-1.55-.16-2.6-1.28-3.09-2.22a4.11,4.11,0,0,1,1.83-3.18,0.35,0.35,0,0,0,0-.56A4.31,4.31,0,0,0,12.25,6.17Zm2.18-3.7a2.53,2.53,0,0,0-2.19,1.21,2.45,2.45,0,0,0,0,2.43,2.53,2.53,0,0,0,2.19,1.2,2.45,2.45,0,0,0,0-2.42A2.53,2.53,0,0,0,14.43,2.47Z" />
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