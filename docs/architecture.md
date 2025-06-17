# Documento de Arquitectura y Decisiones (ADR) - Amplify AI Frontend

*Última actualización: Fusión de la documentación de arquitectura general y refactorización de nombres de archivo.*

## 1. Introducción y Visión General

Este documento describe la arquitectura de software, la estructura y las decisiones tecnológicas clave (ADR - Architecture Decision Records) para el proyecto `amplify-ai-frontend`. Su propósito es servir como una guía centralizada para el equipo de desarrollo, asegurando consistencia, mantenibilidad y un entendimiento común de nuestra base técnica.

### 1.1. Stack Tecnológico Principal
El frontend de Amplify AI está construido con **Next.js 15 (App Router)** y **TypeScript**. La interfaz de usuario se basa en un sistema de componentes construido con **shadcn/ui**, que a su vez utiliza **Tailwind CSS** para los estilos y **Radix UI** para las primitivas de componentes accesibles. La iconografía es gestionada por **lucide-react**.

### 1.2. Filosofía y Principios Guía

*   **Modernidad y Rendimiento:** Adoptamos un stack de vanguardia para maximizar el rendimiento percibido por el usuario (renderizado en servidor) y aprovechar las últimas innovaciones del ecosistema.
*   **Experiencia del Desarrollador (DX):** Las herramientas se eligen por el rendimiento y por la eficiencia que ofrecen al desarrollador.
*   **Seguridad por Diseño:** La arquitectura debe proteger por defecto los activos sensibles, como las claves de API, utilizando patrones de backend-for-frontend (BFF).
*   **Componentización y Reutilización:** Construimos la UI a partir de componentes modulares, bien definidos y reutilizables para garantizar la consistencia y acelerar el desarrollo.

---

## 2. Estructura de Proyecto y Directorios

### 2.1. Rutas (App Router)
La aplicación está organizada usando el **App Router** de Next.js. Las rutas principales se encuentran en `amplify-ai-frontend/app/(main)/` y se agrupan lógicamente sin afectar la URL final:
-   `/dashboard`: Página principal o de inicio.
-   `/brand-profile`: El "Playbook Estratégico" o Perfil de Marca.
-   `/calendar`: Calendario de publicaciones.
-   `/influencers`: Búsqueda y gestión de influencers.
-   `/analytics`: Analíticas y rendimiento.
-   `/strategy-coach`: Coach de estrategia.
-   ...y otras secciones como `settings`, `inbox`, etc.

Cada una de estas carpetas contiene un `page.tsx` que sirve como punto de entrada para esa ruta.

### 2.2. Layout Principal
La aplicación sigue un layout de dashboard clásico, definido en `app/(main)/layout.tsx`, consistente en:
-   **Panel de Navegación Lateral (Sidebar)**: Menú principal persistente.
-   **Área de Contenido Principal**: Contenedor donde se renderiza el contenido de cada página (`children`).

### 2.3. Filosofía de Componentes y Reutilización
La estrategia se centra en la **modularidad** y la **reutilización**, organizando los componentes de la siguiente manera:
-   **`@/components/ui`**: Componentes base de `shadcn/ui` (`<Button>`, `<Card>`, etc.). Son el fundamento de la interfaz.
-   **`@/components/shared`**: Componentes reutilizables que no son de UI base, pero son agnósticos al dominio y se usan en múltiples pantallas (ej: `PageHeader.tsx`, `DashboardSection.tsx`, `InsightCard.tsx`).
-   **`@/components/layout`**: Componentes que definen la estructura principal de la aplicación (ej: `Sidebar.tsx`, `Header.tsx`).
-   **Componentes de Dominio Específico**: Cada sección de la aplicación (p. ej., `analytics`) tiene su propio subdirectorio de componentes (`/app/(main)/analytics/components/`). Aquí residen los componentes que son específicos de esa pantalla (`KpiCard.tsx`). Esta separación mantiene el código organizado y evita que los componentes compartidos se contaminen con lógica de negocio específica.

### 2.4. Lógica y Tipos
-   **`@/lib`**: Contiene la lógica compartida, utilidades y definiciones.
    -   `@/lib/types.ts`: Centraliza las definiciones de tipos e interfaces de TypeScript para toda la aplicación.
    -   `@/lib/mock-data.ts`: Proporciona datos de prueba durante el desarrollo.
    -   `@/lib/utils.ts`: Para funciones de utilidad genéricas.

---

## 3. Decisiones de Arquitectura Clave (ADRs)

### 3.1. Framework Principal: Next.js 15 con App Router
*   **Decisión:** Utilizar Next.js 15 y su `App Router`.
*   **Justificación:** Server Components por defecto para mejor rendimiento, enrutamiento basado en directorios y Route Groups para organización.
*   **Consecuencias:** El equipo debe comprender la diferencia entre Componentes de Servidor y Componente de Cliente (`"use client"`).

### 3.2. UI y Componentes: shadcn/ui
*   **Decisión:** Utilizar `shadcn/ui`.
*   **Justificación:** Máxima personalización al ser código copiado al proyecto, no una dependencia externa. Accesibilidad garantizada por Radix UI.
*   **Consecuencias:** La consistencia visual depende del equipo.

### 3.3. Gestión de Estado
*   **Decisión:** Adoptar una estrategia de estado dual: **Zustand** para estado global y **React Hook Form** para formularios.
*   **Directrices:**
    *   **Zustand:** Solo para estado global compartido entre componentes no relacionados (info de usuario, tema).
    *   **React Hook Form:** Para todos los formularios de entrada de datos.
    *   **Hooks de React:** Es la opción por defecto. Usar siempre el estado más local posible.

### 3.4. Flujo de Datos y Llamadas a API (Patrón BFF)
*   **Decisión:** Implementar un patrón **Backend-for-Frontend (BFF)** utilizando las **Route Handlers** de Next.js (`/app/api`).
*   **Justificación y Flujo Obligatorio:**
    1.  **NUNCA** llamar a una API externa con claves secretas desde un Componente de Cliente.
    2.  El componente cliente (`"use client"`) hace `fetch` a una ruta de API interna de nuestro proyecto (ej. `fetch('/api/chat')`).
    3.  El Route Handler (`/app/api/chat/route.ts`), que se ejecuta **solo en el servidor**, recibe la petición.
    4.  El handler usa la clave secreta (`process.env.AI_API_KEY`) para llamar al servicio externo de forma segura.
    5.  El handler procesa la respuesta y la devuelve al cliente.
*   **Consecuencias:** Este patrón es mandatorio. Cualquier desviación introduce un riesgo de seguridad grave. 