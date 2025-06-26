# 📚 Catálogo de Componentes

Este documento sirve como un inventario y una guía de referencia para los componentes reutilizables de React en el proyecto Amplify AI. El objetivo es proporcionar una visión clara de la biblioteca de UI disponible para promover la reutilización y la coherencia.

## 1. Filosofía de Componentes

Los componentes se organizan siguiendo una filosofía de "colocación":
-   **`components/ui`**: Contiene primitivas de UI de bajo nivel, agnósticas a la lógica de negocio (Botones, Inputs, Tarjetas). Son los "átomos" de nuestro sistema de diseño, basados en `shadcn/ui`.
-   **`components/shared`**: Componentes de propósito general que pueden ser utilizados en múltiples pantallas y contextos.
-   **`components/[feature]`**: Componentes que pertenecen a una funcionalidad específica (ej. `components/calendar`, `components/layout`).

---

## 2. Componentes de UI Primitivos (`components/ui`)

Estos son los bloques de construcción básicos de la interfaz, generados y personalizados a partir de `shadcn/ui`.

-   **`alert-dialog.tsx`**: Un diálogo modal que interrumpe al usuario para confirmar una acción.
-   **`avatar.tsx`**: Muestra una imagen de avatar o un fallback.
-   **`badge.tsx`**: Para mostrar estados o categorías (ej. "Draft", "Published").
-   **`button.tsx`**: El botón estándar con múltiples variantes de estilo.
-   **`calendar.tsx`**: Un componente de calendario para seleccionar fechas.
-   **`card.tsx`**: Un contenedor con estilos para agrupar contenido relacionado.
-   **`checkbox.tsx`**: Un checkbox estándar.
-   **`command.tsx`**: El backend para la paleta de comandos (⌘K).
-   **`dialog.tsx`**: El componente base para modales y diálogos.
-   **`dropdown-menu.tsx`**: Para menús desplegables.
-   **`form.tsx`**: Componentes de ayuda para construir formularios con `react-hook-form`.
-   **`input.tsx`**: El campo de texto estándar.
-   **`label.tsx`**: Etiqueta de texto para campos de formulario.
-   **`popover.tsx`**: Un contenedor flotante que aparece sobre otro contenido.
-   **`progress.tsx`**: Barra de progreso.
-   **`select.tsx`**: Un selector de opciones desplegable.
-   **`separator.tsx`**: Una línea para separar contenido.
-   **`sheet.tsx`**: Un panel que se desliza desde un borde de la pantalla.
-   **`switch.tsx`**: Un interruptor de tipo on/off.
-   **`table.tsx`**: Componentes para construir tablas de datos.
-   **`tabs.tsx`**: Para crear interfaces de pestañas.
-   **`textarea.tsx`**: Un campo de texto de varias líneas.
-   **`tooltip.tsx`**: Muestra información adicional al pasar el cursor sobre un elemento.

## 3. Componentes Compartidos (`components/shared`)

Componentes reutilizables en múltiples características de la aplicación.

-   **`BlockHeader.tsx`**: Un encabezado estandarizado para las tarjetas (`<Card>`), que incluye un icono, un título y una descripción.
-   **`CommandPalette.tsx`**: La interfaz de usuario de la paleta de comandos (⌘K), que permite la navegación y ejecución de acciones rápidas.
-   **`ContentBlock.tsx`**: Un contenedor genérico para secciones de contenido.
-   **`DashboardSection.tsx`**: Un componente de layout para las secciones del Dashboard.
-   **`FormField.tsx`**: Un componente de formulario de alto nivel que combina `Label`, `Input` y mensajes de error.
-   **`InfoCard.tsx`**: (Nuevo) Una tarjeta genérica para mostrar contenido informativo, con variantes de estilo y un botón de acción opcional.
-   **`NotificationSheet.tsx`**: El panel lateral que muestra las notificaciones al usuario.
-   **`SettingsSaveFooter.tsx`**: Un pie de página fijo con botones de "Guardar" y "Cancelar", usado en las páginas de configuración.
-   **`StatCard.tsx`**: (Nuevo) Una tarjeta genérica para mostrar una estadística clave, con un valor principal y un indicador de tendencia.

## 4. Componentes de Layout (`components/layout`)

Definen la estructura principal y la navegación de la aplicación.

-   **`Header.tsx`**: El encabezado global de la aplicación. Contiene el menú de usuario, el acceso a notificaciones y la paleta de comandos.
-   **`PageHeader.tsx`**: Un encabezado específico para cada página, que muestra el título, subtítulo y acciones relevantes para la vista actual.
-   **`Sidebar.tsx`**: La barra de navegación lateral principal, que permite el acceso a todas las secciones principales de la aplicación.

## 5. Componentes de Autenticación (`components/auth`)

Usados exclusivamente en el flujo de login y registro.

-   **`OrbitalShowcase.tsx`**: Una animación 3D interactiva que se muestra en la página de login para comunicar la propuesta de valor del producto.
-   **`VisualMockup.tsx`**: Muestra una maqueta visual de la aplicación.

## 6. Componentes de Calendario (`components/calendar`)

Bloques de construcción para la funcionalidad del calendario de contenido.

-   **`CalendarGrid.tsx`**: La cuadrícula principal del calendario que visualiza los días y las horas. Es responsable de posicionar los posts y mostrar el "heatmap" de horas óptimas.
-   **`PostCard.tsx`**: La tarjeta visual que representa un post individual dentro de la cuadrícula del calendario.
-   **`TimeIndicator.tsx`**: Una línea horizontal que se muestra en la semana actual para indicar la hora del día en tiempo real.

## 7. Componentes de Modales (`components/modals`)

Diálogos modales para acciones específicas.

-   **`CreateCampaignModal.tsx`**: Un modal para crear una nueva campaña de marketing.
-   **`PostEditorModal.tsx`**: (Refactorizado) El modal principal y único para crear o editar un post. Incluye vista previa, edición de texto e imagen, y opciones de guardado/eliminación.

---

## 8. Componentes Específicos de Vistas (`app/(main)/*`)

Estos componentes están diseñados para una vista específica y rara vez se reutilizan en otras partes de la aplicación. Se encuentran dentro de las carpetas `components` de cada ruta en `app/(main)`.

### Analytics (`/analytics`)
-   **`AnalyticsClientContent.tsx`**: El componente cliente principal que organiza las pestañas de la página de analíticas.
-   **`MiRendimientoTab.tsx`**: La pestaña que muestra las métricas de rendimiento propias.
-   **`TopPostsTab.tsx`**: La pestaña que muestra una lista de los posts con mejor rendimiento.
-   **`AnalisisCompetitivoTab.tsx`**: La pestaña para comparar el rendimiento con los competidores.
-   **`TopPostCard.tsx`**: La tarjeta que representa un post en la lista de "Top Posts".
-   **`CompetitorCard.tsx`**: La tarjeta que representa a un competidor en el análisis.

### Brand Profile (`/brand-profile`)
-   **`BrandProfileClientContent.tsx`**: Organiza las pestañas de la página de perfil de marca.
-   **`CoreTab.tsx`**, **`VoiceTab.tsx`**, **`VisualTab.tsx`**, **`AssetsTab.tsx`**: Cada una de las pestañas principales que definen el ADN de la marca.
-   **`BrandPromiseHero.tsx`**: Un banner prominente que muestra la promesa de la marca.
-   **`GoldenCircle.tsx`**, **`PurposeFramework.tsx`**, **`ArchetypeGrid.tsx`**: Visualizaciones interactivas de los conceptos de branding (Círculo Dorado, Arquetipos, etc.).
-   **`KairosVerdictCard.tsx`**, **`PillarCard.tsx`**, **`RitualCard.tsx`**, **`AssetCard.tsx`**: Tarjetas especializadas para mostrar diferentes facetas del perfil de marca.
-   **`UpcomingPosts.tsx`**: Un widget que muestra una lista de los próximos posts programados.
-   **`AiCoachFeed.tsx`**: Un feed de consejos y recomendaciones de la IA.

### Dashboard (`/dashboard`)
-   **`DashboardClientContent.tsx`**: El componente principal que ensambla los diferentes widgets del dashboard.
-   **`PerformanceCard.tsx`**: Una tarjeta que muestra una visión general del rendimiento.
-   **`UpcomingPosts.tsx`**: Un widget que muestra una lista de los próximos posts programados.
-   **`AiCoachFeed.tsx`**: Un feed de consejos y recomendaciones de la IA.

### Inbox (`/inbox`)
-   **`InboxClientPage.tsx`**: El componente principal que organiza la vista de la bandeja de entrada.
-   **`ConversationList.tsx`**: La lista de conversaciones o hilos de chat.
-   **`ChatThread.tsx`**: La vista que muestra los mensajes de una conversación específica.
-   **`ContactContext.tsx`**: Muestra información contextual sobre el contacto con el que se está conversando.
-   **`InsightCard.tsx`**: Una tarjeta para mostrar un "insight" o idea específica, con variantes de estilo.
-   **`CompetitorGrid.tsx`**: Una cuadrícula para comparar con competidores.
-   **`StrategyCompetitorCard.tsx`**: Una tarjeta especializada para un competidor dentro de esta vista. 