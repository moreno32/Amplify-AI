# 📜 Manifiesto de Desarrollo: Amplify AI (MVE)

> **Para:** Agente de Desarrollo de IA (Cursor)  
> **Asunto:** Contexto Estratégico y Blueprint Técnico para la Construcción del Frontend Interactivo de Amplify AI

---

## 🎯 1. Misión y Principios

### Objetivo Central
Construir un **esqueleto de frontend completamente interactivo, visualmente pulido y navegable**. El resultado no es una maqueta, sino una **"Mínima Experiencia Viable" (MVE)** para validar la **sensación** y el **flujo** del producto con datos simulados antes de conectar el backend.

### Principios Rectores
1.  🎨 **La UI es la Historia:** Cada elemento debe servir a la narrativa de una herramienta inteligente, potente y simple.
2.  🧱 **`shadcn/ui` es el Canon:** Utiliza sus componentes como base. La personalización se hace vía `tailwind.config.js`, no reinventando componentes.
3.  ✨ **Interactividad, No Estaticidad:** La aplicación debe sentirse *viva*. Formularios con validación, botones con estados y modales funcionales son obligatorios.
4.  📦 **Los Datos Mock son el Rey:** La UI estará completamente desacoplada de la lógica de fetching, consumiendo datos desde archivos locales para un desarrollo predecible.

### ✅ Definición de "Hecho"
- [ ] Todas las pantallas definidas están construidas y son accesibles vía navegación.
- [ ] Los flujos de usuario principales (Onboarding, Crear Campaña, etc.) se pueden completar.
- [ ] La aplicación es completamente responsiva (desktop y móvil).
- [ ] No existen llamadas a API (`fetch`). Toda la data se consume desde mocks locales.

---

## 🛠️ 2. Fundación Técnica

### Stack Frontend
-   **Framework:** Next.js 14+ (App Router)
-   **Lenguaje:** TypeScript
-   **Estilos:** Tailwind CSS
-   **Componentes:** shadcn/ui
-   **Estado:** Zustand
-   **Formularios:** React Hook Form + Zod
-   **Gráficos:** Recharts
-   **Animaciones:** Framer Motion

### Estructura de Archivos
```bash
/
├── app/
│   ├── (auth)/               # Grupo de rutas para login/onboarding
│   │   ├── login/
│   │   └── onboarding/
│   ├── (main)/               # Grupo de rutas para la app principal
│   │   ├── dashboard/
│   │   ├── calendar/
│   │   ├── inbox/
│   │   ├── ...
│   │   └── layout.tsx        # Layout principal con Sidebar
│   └── layout.tsx            # Layout raíz
├── components/
│   ├── layout/               # Componentes de layout (Sidebar, Header)
│   ├── modals/               # Modales (CreateCampaign, PostEditor)
│   └── ui/                   # Componentes generados por shadcn/ui
├── lib/
│   ├── mock-data/            # Base de datos simulada
│   │   ├── index.ts
│   │   ├── types.ts          # Definiciones de tipos (Post, User, etc.)
│   │   └── ...
│   └── utils.ts              # Funciones de utilidad (ej. cn)
└── styles/
    └── globals.css
```

### Estrategia de Datos Mock
-   **Tipado Estricto:** Todos los tipos deben definirse en `lib/mock-data/types.ts`.
    ```typescript
    // lib/mock-data/types.ts
    export type PostStatus = 'En Revisión' | 'Programado' | 'Publicado' | 'Error';
    
    export interface Post {
      id: string;
      status: PostStatus;
      scheduledAt: string;
      copy: string;
      imageUrl: string;
      // ...
    }
    ```
-   **Centralización:** Exportar todos los datos mock desde `lib/mock-data/index.ts`.

---

## 🗺️ 3. Plan de Implementación por Fases

### Fase 0: Infraestructura de la UI 🏗️
-   **Objetivo:** Crear el esqueleto navegable de la aplicación.
-   **Tareas:**
    1.  Setup del proyecto (Next.js, `shadcn/ui`).
    2.  Construir layouts principal y de la app.
    3.  Implementar `Sidebar` y `Header`.
    4.  Crear todas las rutas con páginas de placeholder.
    5.  Asegurar que la navegación funcione.

### Fase 1: Flujo de Adquisición ✨
-   **Objetivo:** Implementar la primera impresión del usuario.
-   **Pantallas:** `Login`, `Onboarding`, `Dashboard`.
-   **Interacciones:** Simular el flujo de redirección Login → Onboarding → Dashboard y la apertura del modal "Crear Campaña".

### Fase 2: Taller Creativo 🎨
-   **Objetivo:** Construir el núcleo de creación de contenido.
-   **Componentes:** `Calendario`, Modal `Crear Campaña`, Modal `Editor de Posts`.
-   **Interacciones:** Simular cambio de vistas en calendario, apertura de posts, y uso del "AI Toolkit" en el editor.

### Fase 3: Capa Estratégica 📊
-   **Objetivo:** Dar vida a las herramientas de análisis.
-   **Pantallas:** `Métricas`, `Strategy Coach`, `Influencer Matcher`.
-   **Interacciones:** Simular el cambio de pestañas en gráficos, filtros de competidores y búsqueda de influencers.

### Fase 4: Centros de Comando ✉️
-   **Objetivo:** Completar las herramientas de comunicación e identidad.
-   **Pantallas:** `Social Inbox`, `Perfil de Marca`.
-   **Interacciones:** Simular el layout de 3 paneles del inbox, sugerencias de IA, y pestañas del perfil de marca.

---

## 🚀 4. Comando de Inicio

**Tu tarea inicial es ejecutar la "Fase 0: Infraestructura de la UI".**

Comienza por configurar el proyecto y construir el layout global con la navegación lateral funcional. Una vez que tengas un esqueleto navegable, procede a la Fase 1.

¡Adelante!