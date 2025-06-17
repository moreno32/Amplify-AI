/**
 * Design Tokens
 *
 * Este archivo centraliza todas las constantes de diseño de la aplicación
 * para asegurar consistencia y facilitar el mantenimiento. Estos tokens
 * son consumidos por la configuración de Tailwind CSS.
 *
 * @see tailwind.config.ts
 * @see app/globals.css
 */

export const colors = {
  border: 'var(--border)',
  input: 'var(--input)',
  ring: 'var(--ring)',
  background: 'var(--background)',
  foreground: 'var(--foreground)',
  primary: {
    DEFAULT: 'var(--primary)',
    foreground: 'var(--primary-foreground)',
  },
  secondary: {
    DEFAULT: 'var(--secondary)',
    foreground: 'var(--secondary-foreground)',
  },
  destructive: {
    DEFAULT: 'var(--destructive)',
    foreground: 'var(--destructive-foreground)',
  },
  muted: {
    DEFAULT: 'var(--muted)',
    foreground: 'var(--muted-foreground)',
  },
  accent: {
    DEFAULT: 'var(--accent)',
    foreground: 'var(--accent-foreground)',
  },
  popover: {
    DEFAULT: 'var(--popover)',
    foreground: 'var(--popover-foreground)',
  },
  card: {
    DEFAULT: 'var(--card)',
    foreground: 'var(--card-foreground)',
  },
  sidebar: {
    DEFAULT: 'var(--sidebar)',
    foreground: 'var(--sidebar-foreground)',
    primary: {
        DEFAULT: 'var(--sidebar-primary)',
        foreground: 'var(--sidebar-primary-foreground)',
    },
    accent: {
        DEFAULT: 'var(--sidebar-accent)',
        foreground: 'var(--sidebar-accent-foreground)',
    },
    border: 'var(--sidebar-border)',
    ring: 'var(--sidebar-ring)',
  },
  chart: {
    '1': 'var(--chart-1)',
    '2': 'var(--chart-2)',
    '3': 'var(--chart-3)',
    '4': 'var(--chart-4)',
    '5': 'var(--chart-5)',
  },
};

export const radius = {
  lg: 'var(--radius)',
  md: 'calc(var(--radius) - 2px)',
  sm: 'calc(var(--radius) - 4px)',
  xl: 'calc(var(--radius) + 4px)',
};

export const fontFamily = {
    sans: ['var(--font-geist-sans)'],
    mono: ['var(--font-geist-mono)'],
} 