'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Componente principal que redirige al usuario al dashboard.
 * Este es el punto de entrada de la aplicación.
 */
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return null; // No es necesario renderizar nada mientras se redirige
}
