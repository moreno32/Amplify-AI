import { redirect } from 'next/navigation';

/**
 * Punto de entrada principal de la aplicación.
 * Redirige inmediatamente al usuario al dashboard desde el lado del servidor.
 */
export default function Home() {
  redirect('/dashboard');
}
