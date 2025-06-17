---
title: "Amplify-AI Project Rules"
---

This file contains a set of rules for the Cursor AI to follow when working on the Amplify-AI project. They are based on the architectural decisions documented in the `/docs` folder.

---
rule: "architecture-overview"
type: "Agent Requested"
description: "Provides a high-level overview of the Amplify-AI full-stack architecture, data flow, and component structure. Use this for general context or when starting a broad task."
---

The Amplify-AI project follows a decoupled full-stack architecture. For a complete understanding, always refer to the main architecture document: @docs/architecture.md

**Key Principles:**

1.  **Frontend/Backend Separation:**
    *   The **Frontend** is a Next.js 15 application responsible for UI and user experience.
    *   The **Backend** is a FastAPI (Python) API that centralizes all business logic, database interactions (Supabase), and third-party integrations (Stripe).
    *   The Frontend **MUST ONLY** communicate with the FastAPI backend, never directly with the database or other services.

2.  **Frontend Data Flow (Service Layer Pattern):**
    *   Data for pages is fetched in **React Server Components (RSC)** (`page.tsx`).
    *   These RSCs call asynchronous functions from a corresponding **Service** located in `lib/services/`.
    *   The service is responsible for the actual data fetching (currently from `@lib/mock-data/`, eventually via `fetch` to the FastAPI backend).
    *   The RSC then passes the data as props to a **Client Component** (`'use client'`) which handles all interactivity and rendering.

3.  **Component Structure (The Component Pyramid):**
    *   Components are strictly organized into three tiers to ensure scalability and maintainability. This is one of the most important conventions in this codebase.

---
rule: "component-pyramid"
type: "Auto Attached"
description: "Guidelines for creating and placing React components according to the 'Component Pyramid' architecture."
globs:
  - "app/(main)/**/components/**/*.tsx"
  - "components/shared/**/*.tsx"
---

When creating or modifying React components, you **MUST** follow the "Component Pyramid" structure defined in `@docs/architecture.md`.

**1. Nivel 1: Componentes Específicos de Feature (Default Location)**
*   **Directorio:** `/app/(main)/[feature]/components/`
*   **Regla:** If a component is used in only **ONE** feature (e.g., `Dashboard`, `Analytics`), it **MUST** reside here. This is the default location for all new components.
*   **Ejemplo:** `KpiCard` is only used in Analytics, so it lives in `app/(main)/analytics/components/KpiCard.tsx`.

**2. Nivel 2: Componentes Compartidos (Promoted)**
*   **Directorio:** `/components/shared/`
*   **Regla:** A component can only be moved here if it is used in **AT LEAST TWO** distinct features. Do not create "shared" components speculatively.
*   **Ejemplo:** `ContentBlock` is used across `Dashboard`, `Analytics`, and `Strategy Coach`, so it was "promoted" to `shared`.

**3. Nivel 3: Componentes Primitivos de UI**
*   **Directorio:** `/components/ui/`
*   **Regla:** These are the base components from `shadcn/ui`. Do not modify them directly. Use them as building blocks for Level 1 and Level 2 components.

**Workflow:** Always create new components at Level 1. Only move a component to Level 2 if you are about to use it in a second, different feature.

---
rule: "feature-scaffolding"
type: "Agent Requested"
description: "A step-by-step workflow for scaffolding a new feature, including the page, service, client component, and types."
---

When asked to create a new page or feature, follow this exact four-step process:

**Step 1: Definir los Tipos de Datos**
*   **Archivo:** `lib/types.ts`
*   **Acción:** Añade las nuevas interfaces o tipos de TypeScript que necesitará la feature.

**Step 2: Crear el Servicio de Datos**
*   **Archivo:** `lib/services/[nombreDeLaFeature]Service.ts`
*   **Acción:** Crea una función asíncrona (e.g., `get[Feature]Data()`).
*   **Lógica:** Por ahora, esta función debe importar y devolver datos desde `lib/mock-data/`. En el futuro, aquí se realizarán las llamadas `fetch` a la API de FastAPI.
*   **Ejemplo de plantilla:** `@lib/services/dashboardService.ts`

**Step 3: Crear el Server Component (Page)**
*   **Archivo:** `app/(main)/[nombreDeLaFeature]/page.tsx`
*   **Acción:** Crea un React Server Component (`async function`).
*   **Lógica:** La única responsabilidad de este componente es llamar a la función del servicio creada en el Paso 2, obtener los datos y pasarlos como props a un Client Component. No debe contener JSX complejo.
*   **Ejemplo de plantilla:** `@app/(main)/dashboard/page.tsx`

**Step 4: Crear el Client Component**
*   **Archivo:** `app/(main)/[nombreDeLaFeature]/components/[NombreDeLaFeature]ClientPage.tsx`
*   **Acción:** Crea un componente de cliente (`'use client'`).
*   **Lógica:** Recibe los datos iniciales como props del Step 3. Contiene toda la lógica de UI, interactividad, estado (hooks) y renderizado del JSX.
*   **Ejemplo de plantilla:** `@app/(main)/dashboard/components/DashboardClientContent.tsx`
