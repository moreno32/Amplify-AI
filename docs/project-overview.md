# 📦 Amplify AI – El Playbook Estratégico de Marca

> *Define tu marca. Domina tu narrativa. Amplifica tu impacto.*

## 📋 Índice
- [¿Qué es Amplify AI?](#-qué-es-amplify-ai)
- [Estado Actual: Application Shell Robusto y Flujo de Autenticación](#-estado-actual-application-shell-robusto-y-flujo-de-autenticación)
- [Funcionalidades Clave Implementadas](#-funcionalidades-clave-implementadas)
- [Features (Actuales y Futuras)](#-features-actuales-y-futuras)
- [Navegación por la Interfaz](#-navegación-por-la-interfaz)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura (Actual y Futura)](#-arquitectura-actual-y-futura)
- [Roadmap de Evolución](#-roadmap-de-evolución)
- [Historial de Desarrollo](#-historial-de-desarrollo)
- [Caso de Uso](#-caso-de-uso)

## 🧠 ¿Qué es Amplify AI?

**Amplify AI** es un panel de control estratégico diseñado para que marcas, agencias y creadores definan, gestionen y auditen su identidad de marca de manera coherente y visual. La herramienta funciona como un "Playbook Estratégico Viviente", traduciendo los conceptos abstractos de la estrategia de marca en componentes visuales e interactivos que guían la creación de contenido y la comunicación.

Actualmente, el proyecto ha consolidado su **Application Shell** (la estructura principal de la aplicación) y cuenta con un **flujo de autenticación funcional**, operando sobre una base de código limpia y datos simulados (`mock data`).

## ✅ Estado Actual: Application Shell Robusto y Flujo de Autenticación

La aplicación cuenta con una estructura de navegación e interacción sólida y un sistema de diseño coherente.
- [x] **Application Shell Refactorizado:** La `Sidebar` y el `Header` son componentes interactivos y funcionales.
- [x] **Experiencia de Login Inmersiva:** Se ha diseñado e implementado una página de `/login` de dos paneles que no solo es funcional sino que comunica el valor de la marca. Incluye un showcase de producto 3D animado.
- [x] **Paleta de Comandos y Notificaciones:** Se han integrado una paleta de comandos global (`⌘K`) y un panel de notificaciones.
- [x] **Base Modular:** La sección de `Brand Profile` y `Calendar` siguen siendo el estandarte de la arquitectura de componentes.
- [x] Toda la data se consume desde mocks locales en `lib/mock-data/`, permitiendo un desarrollo y testing predecible.

## 🌟 Funcionalidades Clave Implementadas

-   **Application Shell Interactivo:**
    -   `Header` global con menú de usuario, notificaciones y un lanzador para la paleta de comandos.
    -   `Sidebar` con navegación principal y estado activo.
    -   `CommandPalette` para búsqueda y navegación rápida.
    -   `AlertDialog` para acciones críticas como "Cerrar Sesión", mejorando la UX.
-   **Flujo de Autenticación Sofisticado:**
    -   Página de `/login` de dos paneles: un panel de acción (formulario) y un panel de promesa (showcase de producto).
    -   El componente `OrbitalShowcase` presenta una animación 3D de las características clave del producto.
    -   Lógica para alternar entre las vistas de "Login" y "Registro".
    -   Sistema de notificaciones (`sonner`) para feedback al usuario.
-   **Playbook de Perfil de Marca:**
    -   Una sección completa y funcional que permite definir el `Core`, `Voice`, `Visual` y `Assets` de la marca.
    -   **Arquitectura Modular:** Cada pieza de información (Promesa, Círculo Dorado, Arquetipos, etc.) se presenta en una `<Card>` estandarizada con un `<BlockHeader>` (icono, título, descripción) para máxima claridad y consistencia.
    -   **Visualizaciones de Datos:** Componentes interactivos como el Círculo Dorado, la Matriz de Arquetipos y la Paleta de Colores dan vida a los datos.
    -   **Indicador de Tiempo Real y Heatmap:** Una línea visual marca la hora del día y un `heatmap` opcional sugiere las horas óptimas para publicar.

## ✨ Features (Actuales y Futuras)

| Feature                         | Estado      | Descripción                                                              |
|---------------------------------|-------------|--------------------------------------------------------------------------|
| **Application Shell**           | ✅ **Hecho**    | Estructura principal de la app (Header, Sidebar, etc.) totalmente funcional. |
| **Perfil de Marca (Playbook)**  | ✅ **Hecho**    | Define y visualiza el ADN completo de la marca de forma modular.         |
| **Calendario de Contenido**     | ✅ **Hecho**    | Planifica y visualiza contenido en una vista semanal.                    |
| **Autenticación de Usuario**    | ✨ **UI Completa** | Flujo de login/registro/social con UI de alta fidelidad. Pendiente de backend. |
| **Dashboard de Métricas**       | 🟡 **En Progreso** | Pantalla de métricas con componentes de UI listos para datos reales.     |
| **Social Inbox**                | 🟡 **En Progreso** | Interfaz de Inbox diseñada, pendiente de integración.                    |
| **Ajustes de Cuenta**           | 🟡 **En Progreso** | Página de `/settings` creada, pendiente de desarrollar formularios.      |
| **Strategy Coach (IA)**         | 🔜 **Próximamente** | Asesoramiento estratégico basado en IA para optimizar la estrategia.     |
| **Análisis de Competencia**     | 🔜 **Próximamente** | Comparación de métricas y contenido con competidores.                    |

## 🗺️ Navegación por la Interfaz

| Pantalla           | Propósito                          | Estado Actual                    |
|--------------------|------------------------------------|----------------------------------|
| Login              | Autenticar al usuario              | Funcional (con lógica simulada)  |
| Dashboard          | Visualizar el rendimiento general  | UI estática, sin datos reales    |
| Calendario         | Planificar y editar contenido      | Funcional (con mock data)        |
| **Perfil de Marca**  | Definir el ADN de la marca         | **Completamente funcional y refactorizado** |
| Inbox              | Gestionar la comunicación          | UI estática, sin API             |
| Analíticas         | Analizar el rendimiento            | UI estática, sin datos reales    |
| Ajustes            | Configurar la cuenta y la marca    | UI estática, sin funcionalidad   |

## 🛠️ Stack Tecnológico

-   **Framework:** Next.js 14+ (App Router)
-   **Lenguaje:** TypeScript
-   **Estilos:** Tailwind CSS
-   **Componentes:** shadcn/ui
-   **Iconos:** lucide-react
-   **Animaciones:** Framer Motion
-   **Fechas:** date-fns
-   **Deploy:** Vercel

## 🏗️ Arquitectura (Actual y Futura)

### Arquitectura Actual (Frontend Modular con Layouts Anidados)
La aplicación opera en una arquitectura de **frontend aislado y modular**, utilizando los **layouts anidados** de Next.js para gestionar los estados de la aplicación.
- **Layouts Separados:** Un layout para rutas de autenticación (`/app/(auth)`) y otro para rutas protegidas (`/app/(main)`), lo que permite tener un shell de aplicación solo para usuarios autenticados.
- **Componentes de Cliente Interactivos:** El `Header` y la `Sidebar`, junto con componentes compartidos como la `CommandPalette`, son Componentes de Cliente (`'use client'`) para gestionar su propio estado e interactividad.

```text
/app
├── (auth)
│   ├── login/page.tsx
│   └── layout.tsx (Layout sin Shell)
└── (main)
    ├── dashboard/page.tsx
    ├── ... (otras rutas)
    └── layout.tsx (Layout CON Shell: Sidebar + Header)
```

Para una descripción detallada, ver **`docs/application-shell.md`** y **`docs/nomenclature-guide.md`**.

```text
┌──────────────────────────┐
│      Next.js Frontend    │
│ (React, shadcn/ui, etc.) │
└────────────┬─────────────┘
             │ Reads from
             ▼
┌──────────────────────────┐
│        Mock Data         │
│ (/lib/brand.ts, etc.)    │
└──────────────────────────┘
```

### Arquitectura Futura
La siguiente fase conectará el frontend a un backend a través de una API REST. El backend se encargará de la lógica de negocio, la interacción con la base de datos y la integración con las APIs de las redes sociales o servicios de IA.

```text
┌────────────────┐      REST API         ┌────────────────┐
│ Next.js        │─────────────────────▶ │    Backend     │
│  Frontend      │ <──────────────────── │   (FastAPI?)   │
└────────────────┘                       └──────┬─────────┘
                                                │
                                                ▼
                                    ┌──────────────────────┐
                                    │ Base de Datos y APIs │
                                    │ (PostgreSQL, OpenAI) │
                                    └──────────────────────┘
```

## 🛣️ Roadmap de Evolución

-   ✅ **Fase 1 (Completada)**: Construcción de la MVE con UI pulida y flujo de calendario funcional.
-   ✅ **Fase 2 (Completada)**: Refactorización masiva de la sección "Perfil de Marca" a una arquitectura modular y escalable.
-   ✅ **Fase 3 (Completada)**: Refactorización del "Application Shell". Implementación de `Header`, `Sidebar`, `CommandPalette` y un flujo de autenticación de alta fidelidad con showcase de producto animado. Creación de documentación exhaustiva.
-   🟡 **Fase 4 (En Progreso)**: Refinamiento del resto de secciones (Dashboard, Inbox) para adoptar la nueva arquitectura. Desarrollo de la sección de `Ajustes`.
-   🔜 **Fase 5 (Siguiente)**: Desarrollo del backend y la base de datos. Reemplazar los datos mock con llamadas a una API real e implementar autenticación real.
-   🔜 **Fase 6 (Futuro)**: Implementación de funcionalidades de IA (Strategy Coach, etc.).

## <details><summary>📜 Historial de Desarrollo</summary>

1.  **Refactorización del Application Shell y Autenticación (Julio 2024):** Se llevó a cabo una refactorización completa de la estructura principal de la aplicación. Se implementó un `Header` global, una `Sidebar` mejorada, una paleta de comandos (`⌘K`), y un panel de notificaciones. Se creó un flujo de autenticación de alta fidelidad, culminando en una página de login de dos paneles con un showcase de producto 3D animado para comunicar el valor de la marca.
2.  **Implementación de Design Tokens (Junio 2024):** Se centralizaron todas las constantes de diseño (colores, tipografía, espaciado) en `tailwind.config.ts`, que a su vez consume variables CSS definidas en `app/globals.css`. Esto establece una única fuente de verdad para el sistema de diseño, mejorando la consistencia y la mantenibilidad del tema claro/oscuro.
3.  **Refactorización Masiva del Perfil de Marca:** Se transformó la página estática de "Perfil de Marca" en un "Playbook Estratégico" completamente interactivo y modular. Se estableció un sistema de diseño basado en `<Card>` y `<BlockHeader>` que ahora sirve como estándar para toda la aplicación. Se crearon componentes complejos como `GoldenCircle` y `ArchetypeGrid` y se depuraron múltiples errores de CSS, tipos y lógica de estado.
4.  **Pivote de Concepto:** La identidad del proyecto evolucionó desde una herramienta de contenido específica para un gimnasio ("O2CW") a la plataforma de estrategia de marca más amplia y potente que es "Amplify AI".
5.  **Estabilización Inicial:** Se solucionaron errores iniciales de ejecución y se estabilizó el proveedor de imágenes, cambiando de `images.unsplash.com` a `picsum.photos`.

</details>

## 👟 Caso de Uso

**Sofía, una Brand Strategist en una agencia de marketing:**

1.  Llega a la impresionante página de `/login` de **Amplify AI**, donde entiende inmediatamente la propuesta de valor gracias al showcase animado. Introduce sus credenciales y accede a la plataforma.
2.  Aterriza en el `Dashboard`. Desde ahí, navega a la sección de **Perfil de Marca** usando la `Sidebar`.
3.  En la pestaña `Core`, define el `Círculo Dorado` (Por qué, Cómo, Qué) y selecciona los `Arquetipos de Personalidad` de la marca en la matriz interactiva.
4.  En la pestaña `Voice`, establece el tono, el vocabulario y la gramática que la marca debe usar.
5.  En `Visual`, define la paleta de colores y las tipografías.
6.  Con el playbook completo, la IA de Amplify (en una futura versión) puede ahora generar borradores de posts para el `Calendario` que son 100% coherentes con la estrategia definida.

**Resultado**: Sofía ha creado una "estrella polar" estratégica en cuestión de minutos. Su equipo y la IA tienen ahora una fuente de verdad única para garantizar que toda la comunicación sea coherente y fiel a la esencia de la marca.
