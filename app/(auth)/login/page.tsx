"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BrainCircuit, Facebook, Google } from "lucide-react"; // Asumiendo que tienes iconos para Google y Facebook

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">
              {isRegister ? "Crea tu cuenta inteligente" : "Tu copiloto de IA te espera"}
            </h1>
            <p className="text-balance text-muted-foreground">
              {isRegister
                ? "Empieza a automatizar tu contenido en menos de 5 minutos."
                : "Accede para planificar, crear y analizar tus campañas."}
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@ejemplo.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Contraseña</Label>
                {!isRegister && (
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    ¿Has olvidado la contraseña?
                  </Link>
                )}
              </div>
              <Input id="password" type="password" required />
            </div>
            {isRegister && (
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                <Input id="confirm-password" type="password" required />
              </div>
            )}
             <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">
                    {isRegister ? "Acepto los Términos y Condiciones" : "Recuérdame"}
                </Label>
            </div>
            <Button type="submit" className="w-full">
              {isRegister ? "Crear Cuenta Gratis" : "Entrar"}
            </Button>
            <Separator className="my-2" />
             <div className="grid grid-cols-2 gap-4">
                <Button variant="outline">
                    {/* <Google className="mr-2 h-4 w-4" /> */}
                    Google
                </Button>
                <Button variant="outline">
                    {/* <Facebook className="mr-2 h-4 w-4" /> */}
                    Meta
                </Button>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            {isRegister ? "¿Ya tienes una cuenta? " : "¿No tienes cuenta? "}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="underline"
            >
              {isRegister ? "Inicia sesión" : "Regístrate aquí"}
            </button>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6444F4] to-[#4B38D8]" />
        <div className="relative flex items-center justify-center h-full">
            <div className="text-white text-center p-12">
                 <h2 className="text-5xl font-bold leading-tight">Contenido que vende,<br/>estrategia que enseña.</h2>
                 <p className="text-xl mt-4 opacity-80">
                    Tu copiloto de IA para dominar Instagram y centralizar tu comunicación.
                 </p>
                 {/* Aquí iría el Mockup Artístico 3D, por ahora usamos texto */}
            </div>
        </div>
      </div>
    </div>
  );
} 