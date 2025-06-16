# 📦 Amplify AI – El Playbook Estratégico de Marca

> *Define tu marca. Domina tu narrativa. Amplifica tu impacto.*

## 📋 Índice
- [¿Qué es Amplify AI?](#-qué-es-amplify-ai)
- [Estado Actual: Arquitectura Modular Establecida](#-estado-actual-arquitectura-modular-establecida)
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

Actualmente, el proyecto ha alcanzado un estado de **Arquitectura Modular Establecida**, con una base de código limpia y un sistema de diseño coherente que opera con datos simulados (`mock data`).

## ✅ Estado Actual: Arquitectura Modular Establecida

La aplicación es un panel de control estable y visualmente pulido, con una arquitectura de componentes bien definida.
- [x] La sección **Perfil de Marca** ha sido completamente refactorizada y es 100% funcional.
- [x] Se ha establecido un **sistema de diseño modular** basado en `Cards` y un `BlockHeader` reutilizable.
- [x] Todas las pantallas principales (`Dashboard`, `Calendario`, etc.) son navegables.
- [x] La aplicación es completamente responsiva.
- [x] Toda la data se consume desde mocks locales en `lib/mock-data/`, permitiendo un desarrollo y testing predecible.

## 🌟 Funcionalidades Clave Implementadas

-   **Playbook de Perfil de Marca:**
    -   Una sección completa y funcional que permite definir el `Core`, `Voice`, `Visual` y `Assets` de la marca.
    -   **Arquitectura Modular:** Cada pieza de información (Promesa, Círculo Dorado, Arquetipos, etc.) se presenta en una `<Card>` estandarizada con un `<BlockHeader>` (icono, título, descripción) para máxima claridad y consistencia.
    -   **Visualizaciones de Datos:** Componentes interactivos como el Círculo Dorado, la Matriz de Arquetipos y la Paleta de Colores dan vida a los datos.
-   **Planificador de Contenido (Calendario):**
    -   **Vista Semanal Interactiva:** Cuadrícula de 7 días con un encabezado fijo y scroll vertical por horas.
    -   **Gestión de Posts:** Las tarjetas de posts muestran su estado con colores distintivos y permiten edición a través de un modal.
    -   **Navegación Intuitiva:** Controles para moverse entre semanas y un botón `Hoy` que centra la vista en la hora actual.
    -   **Indicador de Tiempo Real y Heatmap:** Una línea visual marca la hora del día y un `heatmap` opcional sugiere las horas óptimas para publicar.

## ✨ Features (Actuales y Futuras)

| Feature                         | Estado      | Descripción                                                              |
|---------------------------------|-------------|--------------------------------------------------------------------------|
| **Perfil de Marca (Playbook)**  | ✅ **Hecho**    | Define y visualiza el ADN completo de la marca de forma modular.         |
| **Calendario de Contenido**     | ✅ **Hecho**    | Planifica y visualiza contenido en una vista semanal.                    |
| **Dashboard de Métricas**       | 🟡 **En Progreso** | Pantalla de métricas con componentes de UI listos para datos reales.     |
| **Social Inbox**                | 🟡 **En Progreso** | Interfaz de Inbox diseñada, pendiente de integración.                    |
| **Strategy Coach (IA)**         | 🔜 **Próximamente** | Asesoramiento estratégico basado en IA para optimizar la estrategia.     |
| **Análisis de Competencia**     | 🔜 **Próximamente** | Comparación de métricas y contenido con competidores.                    |

## 🗺️ Navegación por la Interfaz

| Pantalla           | Propósito                          | Estado Actual                    |
|--------------------|------------------------------------|----------------------------------|
| Dashboard          | Visualizar el rendimiento general  | UI estática, sin datos reales    |
| Calendario         | Planificar y editar contenido      | Funcional (con mock data)        |
| **Perfil de Marca**  | Definir el ADN de la marca         | **Completamente funcional y refactorizado** |
| Inbox              | Gestionar la comunicación          | UI estática, sin API             |
| Analíticas         | Analizar el rendimiento            | UI estática, sin datos reales    |

## 🧱 Stack Tecnológico

-   **Framework:** Next.js 14+ (App Router)
-   **Lenguaje:** TypeScript
-   **Estilos:** Tailwind CSS
-   **Componentes:** shadcn/ui
-   **Iconos:** lucide-react
-   **Animaciones:** Framer Motion
-   **Fechas:** date-fns
-   **Deploy:** Vercel

## 🏗️ Arquitectura (Actual y Futura)

### Arquitectura Actual (Frontend Modular)
La aplicación opera en una arquitectura de **frontend aislado y modular**. La lógica de la interfaz y la interactividad están completamente desacopladas de cualquier servicio externo. El layout principal (`/app/(main)/layout.tsx`) define la navegación lateral y la cabecera, mientras que cada página (p.ej. `/brand-profile/page.tsx`) se encarga de obtener sus datos y pasarlos a componentes de presentación.

Para una descripción detallada, ver **`docs/Arquitectura_General_App.md`**.

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
-   ✅ **Fase 2 (Completada)**: Refactorización masiva de la sección "Perfil de Marca" a una arquitectura modular y escalable. Creación de documentación de arquitectura.
-   🟡 **Fase 3 (En Progreso)**: Refinamiento del resto de secciones (Dashboard, Inbox) para adoptar la nueva arquitectura.
-   🔜 **Fase 4 (Siguiente)**: Desarrollo del backend y la base de datos. Reemplazar los datos mock con llamadas a una API real.
-   🔜 **Fase 5 (Futuro)**: Implementación de funcionalidades de IA (Strategy Coach, etc.).

## <details><summary>📜 Historial de Desarrollo</summary>

1.  **Refactorización Masiva del Perfil de Marca:** Se transformó la página estática de "Perfil de Marca" en un "Playbook Estratégico" completamente interactivo y modular. Se estableció un sistema de diseño basado en `<Card>` y `<BlockHeader>` que ahora sirve como estándar para toda la aplicación. Se crearon componentes complejos como `GoldenCircle` y `ArchetypeGrid` y se depuraron múltiples errores de CSS, tipos y lógica de estado.
2.  **Pivote de Concepto:** La identidad del proyecto evolucionó desde una herramienta de contenido específica para un gimnasio ("O2CW") a la plataforma de estrategia de marca más amplia y potente que es "Amplify AI".
3.  **Estabilización Inicial:** Se solucionaron errores iniciales de ejecución y se estabilizó el proveedor de imágenes, cambiando de `images.unsplash.com` a `picsum.photos`.

</details>

## 👟 Caso de Uso

**Sofía, una Brand Strategist en una agencia de marketing:**

1.  Inicia un nuevo proyecto en **Amplify AI** para un cliente.
2.  Navega a la sección de **Perfil de Marca**. En la pestaña `Core`, define el `Círculo Dorado` (Por qué, Cómo, Qué) y selecciona los `Arquetipos de Personalidad` de la marca en la matriz interactiva.
3.  En la pestaña `Voice`, establece el tono, el vocabulario y la gramática que la marca debe usar.
4.  En `Visual`, define la paleta de colores y las tipografías.
5.  Con el playbook completo, la IA de Amplify (en una futura versión) puede ahora generar borradores de posts para el `Calendario` que son 100% coherentes con la estrategia definida.

**Resultado**: Sofía ha creado una "estrella polar" estratégica en cuestión de minutos. Su equipo y la IA tienen ahora una fuente de verdad única para garantizar que toda la comunicación sea coherente y fiel a la esencia de la marca.
