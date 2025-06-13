"use client";

import Link from "next/link";
import {
  BrainCircuit,
  Menu,
  PlusCircle,
  Search,
  Settings,
  User,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
      <Link href="#" className="lg:hidden">
        <BrainCircuit className="h-6 w-6" />
        <span className="sr-only">Home</span>
      </Link>
      <div className="w-full flex-1">
        {/* Posible barra de búsqueda global en el futuro */}
      </div>
      <Button variant="solid" size="sm">
        <PlusCircle className="mr-2 h-4 w-4" />
        Crear Campaña
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
            size="icon"
            variant="ghost"
          >
            <User className="h-4 w-4" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Perfil de Marca</DropdownMenuItem>
          <DropdownMenuItem>Facturación</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
} 