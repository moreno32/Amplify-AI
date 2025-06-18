# Especificación Detallada: Pantalla de "Dashboard"

## A. Concepto: "Tu Centro de Mando Inteligente"

El Dashboard es la primera pantalla que ve el usuario al entrar. No debe ser un volcado de datos, sino un **resumen ejecutivo y accionable** de lo que está pasando en su ecosistema digital. Debe responder a tres preguntas clave de un vistazo:
1.  **¿Qué ha pasado?** (Resumen de actividad reciente)
2.  **¿Qué está por venir?** (Próximas publicaciones)
3.  **¿Qué debería hacer ahora?** (Sugerencias de la IA)

## B. Estructura General y Layout

-   **Layout Principal:** Una cuadrícula flexible (`grid`) que se adapta bien a diferentes tamaños de pantalla. Se divide conceptualmente en tres columnas o áreas temáticas.
-   **Componente Clave:** `DashboardSection`. Este es un componente de layout reutilizable que encapsula una `Card` de `shadcn/ui` y un `BlockHeader`. Su propósito es estandarizar la apariencia de cada bloque o "widget" del dashboard, proporcionando un título, un icono y opcionalmente un botón de acción en la cabecera del bloque.

### 1. Columna Izquierda (o sección superior en móvil): El Pulso de la Actividad
-   **Componente 1: Métricas Clave (`KeyMetrics.tsx`)**
    -   **Layout:** Una serie de `Card` pequeñas.
    -   **Contenido:** Muestra 3-4 KPIs vitales (ej. Nuevos Seguidores, Tasa de Engagement, Alcance Total) con un indicador de tendencia (`+X%` o `-Y%`).
-   **Componente 2: Publicaciones Recientes (`RecentPosts.tsx`)**
    -   **Layout:** Una `Card` que contiene una lista o un carrusel.
    -   **Contenido:** Muestra los últimos 3-4 posts publicados, con su imagen en miniatura y la métrica de rendimiento principal (ej. Likes o Alcance).

### 2. Columna Central: El Foco en la Acción Inmediata
-   **Componente 3: Próximas Publicaciones (`UpcomingPosts.tsx`)**
    -   **Layout:** Una `Card` con una vista de agenda o lista.
    -   **Contenido:** Muestra los posts programados para los próximos 3-5 días. Cada elemento debe mostrar la fecha/hora, una miniatura del contenido y el estado (ej. "Programado", "En Revisión").
    -   **Acción:** Un botón `[Ver Calendario Completo]` que navega a la pantalla de Calendario.

### 3. Columna Derecha: La Guía de la IA
-   **Componente 4: Sugerencias del Coach IA (`AiCoachSuggestions.tsx`)**
    -   **Layout:** Una `Card` destacada, quizás con un estilo visual ligeramente diferente.
    -   **Contenido:** Muestra 2-3 "tarjetas de acción" generadas por la IA.
    -   **Ejemplos de Sugerencias:**
        -   "💡 **Oportunidad de Engagement:** Tu post sobre 'Yoga Matutino' tuvo un 50% más de comentarios. ¿Creamos una serie sobre este tema?" `[Crear Serie]`
        -   "📈 **Tendencia de Mercado:** Tu competidor `@rivalzen` está teniendo éxito con Reels sobre 'Meditación Guiada'. ¿Analizamos su estrategia?" `[Analizar Competidor]`
        -   "✍️ **Contenido por Reutilizar:** Tu artículo de blog '5 Beneficios del Té Verde' puede convertirse en un carrusel para Instagram." `[Generar Carrusel]`

## C. Arquitectura y Componentes Implementados

-   `dashboard/page.tsx`: Es el componente principal de la página. Orquesta el layout y renderiza los diferentes componentes de sección (`KeyMetrics`, `UpcomingPosts`, etc.), pasándoles los datos necesarios como `props`.
-   `components/shared/DashboardSection.tsx`: Componente de layout reutilizable que renderiza una `Card` con un `BlockHeader` estandarizado. Se usa para envolver cada sección del dashboard.
-   `components/shared/BlockHeader.tsx`: Componente que muestra el título, icono, descripción y acciones opcionales de una sección. Es utilizado por `DashboardSection`.

## D. Flujo de Datos y Arquitectura

- **Carga de Datos del Lado del Servidor:** La página (`page.tsx`) es un Componente de Servidor (`async function`). Su responsabilidad es llamar al servicio `getDashboardData()` desde `@/lib/services/dashboardService.ts` para obtener todos los datos necesarios para el dashboard de una sola vez.
- **Renderizado en el Cliente:** Los datos obtenidos se pasan como `props` a un único Componente de Cliente (`DashboardClientContent.tsx`). Este componente se encarga de toda la lógica de renderizado y de pasar los datos específicos a cada widget (como `PerformanceCard`, `UpcomingPosts`, etc.).
- **Preparado para Backend:** La integración con la API de FastAPI solo requerirá modificar la función `getDashboardData()` para que haga una llamada `fetch` en lugar de leer datos locales, sin necesidad de alterar ningún componente de la interfaz.

## E. Backlog y Mejoras

-   **(Prioridad Alta) Conectar el Servicio a la API:** Implementar la llamada `fetch` dentro de `dashboardService.ts` al endpoint `GET /api/v1/dashboard` del backend de FastAPI.
-   **(Prioridad Media) Hacer el Dashboard Personalizable:** Permitir al usuario reorganizar (arrastrar y soltar) los bloques del dashboard para priorizar la información que más le importa.
-   **(Prioridad Baja) Implementar Funcionalidad de "Ver Más"**: En secciones como "Publicaciones Recientes", añadir un enlace o botón para expandir la vista o navegar a la sección correspondiente para ver el historial completo.