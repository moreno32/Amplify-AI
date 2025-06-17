# Guía de Nomenclatura y Arquitectura del Frontend

*Última actualización: Reflejo de la refactorización del App Shell, flujo de autenticación y adición de la sección de Ajustes.*

## 1. Propósito

Este documento establece una guía de referencia sobre la arquitectura del layout y la nomenclatura de componentes dentro del proyecto Amplify-AI. El objetivo es crear un lenguaje común para que todo el equipo (desarrolladores, diseñadores, product managers) pueda comunicarse de manera clara y eficiente.

---

## 2. El "Application Shell" (La Estructura Principal)

La estructura visual persistente de la aplicación, también conocida como "App Shell", se define a través de layouts anidados:

-   **`app/(main)/layout.tsx`**: La plantilla principal que envuelve el contenido de todas las páginas después de que el usuario ha iniciado sesión. Define un layout con la `Sidebar` a la izquierda y el `Header` más el contenido de la página a la derecha.
-   **`app/(auth)/layout.tsx`**: Un layout minimalista sin `Sidebar` ni `Header`, utilizado para las páginas de autenticación como el Login.

---

## 3. Componentes del Layout (`@/components/layout`)

Estos son los componentes de alto nivel que construyen el "App Shell".

| Componente | Archivo | Descripción | Nomenclatura |
| :--- | :--- | :--- | :--- |
| **Sidebar** | `Sidebar.tsx` | La barra de navegación vertical y persistente a la izquierda. Contiene los enlaces a las secciones principales de la aplicación y el bloque de "Upgrade". | `Sidebar` |
| **Header** | `Header.tsx` | La barra superior global. Funciona como un centro de control con acceso a la paleta de comandos (`⌘K`), notificaciones, creación de campañas y el menú de usuario (Ajustes, Cerrar Sesión). | `Header` |
| **PageHeader** | `PageHeader.tsx` | Un componente reutilizable que se muestra al inicio del contenido de una página para presentar su título y acciones contextuales (ej. selectores de fecha). | `PageHeader` |

---

## 4. Estructura de Secciones y Páginas (`@/app/(main)`)

Cada sección principal de la aplicación corresponde a una carpeta dentro de `app/(main)/`. La estructura para cada sección es consistente:

```
app/(main)/
└── [nombre-de-la-seccion]/
    ├── components/
    │   ├── ComponenteEspecificoA.tsx
    │   └── ComponenteEspecificoB.tsx
    └── page.tsx
```

*   **`page.tsx`**: Es el punto de entrada de la ruta y el contenedor principal del contenido de la página.
*   **`components/`**: Este directorio contiene todos los componentes complejos y personalizados que se utilizan exclusivamente en esa sección.

### Glosario de Secciones y sus Componentes Clave

| Sección | Ruta | Componente Orquestador | Componentes Clave |
| :--- | :--- | :--- | :--- |
| **Dashboard** | `/dashboard` | `DashboardClientContent.tsx` | `PerformanceCard`, `UpcomingPosts`, `AiCoachFeed` |
| **Analytics** | `/analytics` | `AnalyticsClientContent.tsx` | `MiRendimientoTab`, `TopPostsTab`, `KpiCard` |
| **Calendar** | `/calendar` | `CalendarClientPage.tsx` | `CalendarGrid`, `PostCard` |
| **Inbox** | `/inbox` | `InboxClientPage.tsx` | `ConversationList`, `ChatThread`, `ContactContext` |
| **Brand Profile** | `/brand-profile`| `BrandProfileClientContent.tsx` | `CoreTab`, `VisualTab`, `VoiceTab`, `GoldenCircle` |
| **Influencers**| `/influencers` | `InfluencerClientPage.tsx` | `InfluencerCard`, `InfluencerFilters` |
| **Strategy Coach**|`/strategy-coach`|`StrategyCoachClientPage.tsx`|`ContentAnalysisTab`, `InsightCard`, `CompetitorGrid`|
| **Settings** | `/settings` | `SettingsClientPage.tsx` | `CoreTab`, `VoiceTab` |

---

## 5. Componentes de UI Reutilizables (`@/components/ui`)

El directorio `@/components/ui` contiene los componentes atómicos y de bajo nivel del sistema de diseño, basados en `shadcn/ui`. Estos son los bloques de construcción fundamentales para el resto de la interfaz.

**Ejemplos:** `Button`, `Card`, `Input`, `Dialog`, `Select`, `Tabs`.

Cuando hablemos de estos elementos, nos referiremos a ellos por su nombre de componente (ej. "el componente `Card`", "el `Dialog` modal").

---

## 6. Componentes Compartidos (`@/components/shared`)

El directorio `@/components/shared` contiene componentes más complejos que son reutilizables en varias secciones de la aplicación, pero que no forman parte del layout principal.

| Componente          | Archivo                 | Descripción                                                                            |
| :------------------ | :---------------------- | :------------------------------------------------------------------------------------- |
| **CommandPalette**  | `CommandPalette.tsx`    | El modal de búsqueda global (`⌘K`) que permite navegar y ejecutar acciones rápidamente. |
| **NotificationSheet**| `NotificationSheet.tsx` | El panel lateral que se desliza desde la derecha para mostrar las notificaciones.     |
| **ContentBlock**    | `ContentBlock.tsx`      | Un contenedor estandarizado para las principales secciones de contenido de una página. |

</rewritten_file> 