# Documento de Arquitectura y Decisiones (ADR) - Amplify AI

*Última actualización: Refactorización completa de la arquitectura para desacoplar Frontend y Backend, y definición del stack tecnológico Full-Stack.*

## 1. Filosofía y Visión General

Este documento describe la arquitectura full-stack del proyecto Amplify AI. La filosofía principal es la **separación de responsabilidades** entre un frontend Next.js de alto rendimiento y un backend de API robusto y escalable, permitiendo un desarrollo en paralelo y una integración limpia.

*   **Frontend (Next.js):** Actúa como la capa de presentación. Es responsable de la experiencia de usuario, la renderización de la interfaz y la gestión del estado de la UI. **No contiene lógica de negocio crítica**.
*   **Backend (FastAPI):** Actúa como el cerebro del sistema. Centraliza toda la lógica de negocio, la comunicación con la base de datos, la gestión de usuarios y la integración con servicios de terceros.

---

## 2. Arquitectura Full-Stack

### 2.1. Diagrama de Arquitectura Global

```mermaid
graph TD
    subgraph "Usuario Final"
        A[Navegador del Usuario]
    end

    subgraph "Plataforma Frontend (Vercel/Render)"
        B[Next.js App]
        B -- HTTPS --> C
    end

    subgraph "Plataforma Backend (Render/Fly.io)"
        C[API de FastAPI]
        C -- Conexión Segura --> D
        C -- Webhooks/API --> E
    end

    subgraph "Servicios de Terceros"
        D[Supabase: DB (Postgres) + Auth + Storage]
        E[Stripe: Pagos y Suscripciones]
    end

    A --> B
```

### 2.2. Stack Tecnológico Detallado

| Capa      | Tecnología        | Propósito                                       |
|-----------|-------------------|-------------------------------------------------|
| **Frontend**  | Next.js 15 (App Router) | Framework de React para UI y renderizado.       |
|           | TypeScript        | Tipado estático para robustez.                  |
|           | Tailwind CSS      | Estilos a través de clases de utilidad.         |
|           | shadcn/ui         | Componentes de UI accesibles y personalizables. |
|           | Zustand           | Gestión de estado global simple (si es necesario). |
|           | Testing Library   | Pruebas de componentes y UI.                    |
| **Backend**   | Python 3.11+      | Lenguaje principal.                             |
|           | FastAPI           | Framework de API de alto rendimiento.           |
|           | Pydantic          | Validación de datos y "contrato" de API.        |
|           | SQLAlchemy        | ORM para la interacción con la base de datos.   |
|           | Pytest, Black, Mypy | Calidad, formato y tipado del código.           |
| **Base de Datos** | Supabase (PostgreSQL) | Base de datos relacional gestionada.        |
| **Autenticación** | Supabase Auth     | Gestión de usuarios (Social, Email/Pass). |
| **Almacenamiento** | Supabase Storage  | Almacenamiento de archivos y assets.       |
| **Pagos**     | Stripe            | Procesamiento de pagos y suscripciones.       |
| **CI/CD**     | GitHub Actions    | Automatización de pruebas y despliegues.      |
| **Hosting**   | Vercel/Render/Fly.io | Plataformas para el despliegue de servicios.  |

---

## 3. Arquitectura del Frontend (Next.js)

El frontend sigue un patrón moderno que prioriza el rendimiento y la mantenibilidad.

### 3.1. Flujo de Renderizado y Datos (Patrón de Servicio)

La decisión arquitectónica clave es la **abstracción de la capa de datos** a través de un "Service Layer".

1.  **Server Component (`/app/(main)/**/page.tsx`):**
    *   Una página es, por defecto, un **React Server Component (RSC)**.
    *   Su única responsabilidad es **orquestar la obtención de datos** para la carga inicial.
    *   Llama a una función del **Service Layer** (ej. `getDashboardData()`).
    *   **No contiene JSX de presentación complejo**.
    *   Pasa los datos obtenidos como `props` a un Client Component.

2.  **Service Layer (`/lib/services/*.ts`):**
    *   Este es el **único lugar** donde se define cómo obtener datos.
    *   Cada servicio (ej. `dashboardService.ts`) exporta funciones asíncronas (ej. `getDashboardData`).
    *   **Actualmente**, estas funciones leen de los `mock-data`.
    *   **En el futuro**, estas funciones harán una llamada `fetch` al endpoint correspondiente de la API de FastAPI.
    *   Este patrón asegura que si el backend cambia, **solo necesitamos actualizar el servicio**, no los componentes.

3.  **Client Component (`/app/(main)/**/components/*ClientPage.tsx`):**
    *   Marcado con `"use client"`.
    *   Recibe los datos iniciales como `props`.
    *   **Contiene toda la interactividad**: estado (hooks), manejadores de eventos, y renderizado de la UI.
    *   Si necesita realizar una **mutación** (Crear, Actualizar, Borrar), llama a funciones de un servicio (ej. `postService.updatePost()`) que a su vez harán la llamada `POST`, `PUT`, o `DELETE` a la API de FastAPI.

### 3.2. Estructura de Directorios Clave

-   `app/(main)/*`: Rutas principales de la aplicación.
    -   `page.tsx`: El Server Component que carga los datos.
    -   `components/*ClientPage.tsx`: El Client Component que renderiza la UI.
    -   `components/*`: Otros componentes específicos de esa sección.
-   `lib/services`: La capa de abstracción de datos. El punto de integración con el Backend.
-   `lib/mock-data`: Datos simulados para desarrollo desacoplado.
-   `lib/types.ts`: Definiciones de tipos de TypeScript compartidas.

---

## 4. Arquitectura del Backend (FastAPI)

El backend está diseñado para ser un monolito de API limpio, seguro y fácil de mantener.

### 4.1. Responsabilidades

*   **Endpoints de API:** Expone una API RESTful documentada automáticamente (gracias a FastAPI y Pydantic) para que el frontend la consuma.
*   **Lógica de Negocio:** Centraliza todas las reglas de negocio (ej. cómo se calcula una métrica, qué implica una suscripción, etc.).
*   **Autenticación y Autorización:** Valida los tokens de JWT (generados por Supabase Auth) en cada petición protegida.
*   **Interacción con la Base de Datos:** Es el único componente del sistema que puede comunicarse directamente con la base de datos de Supabase.
*   **Integración Segura con Terceros:** Gestiona las claves secretas y la comunicación con servicios como Stripe.

### 4.2. Flujo de una Petición Autenticada

1.  El usuario inicia sesión en el frontend. El cliente de Supabase en el frontend gestiona el flujo de OAuth/contraseña y recibe un **JWT (JSON Web Token)**.
2.  Para cada llamada a un endpoint protegido, el frontend Next.js añade este JWT al encabezado `Authorization: Bearer <token>`.
3.  La API de FastAPI recibe la petición y, a través de una `Dependency`, valida el JWT con las claves públicas de Supabase.
4.  Si el token es válido, extrae el `user_id` y procesa la petición.
5.  Si el token no es válido, devuelve un error `401 Unauthorized`.

Este flujo asegura que la API es **stateless** y que cada endpoint puede protegerse de forma individual y robusta. 