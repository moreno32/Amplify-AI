# Documentación Viva: Pantalla de Calendario

*Última actualización: Refleja el estado del proyecto al finalizar la implementación del indicador de tiempo real y el encabezado fijo.*

## A. Propósito Estratégico: "Tu Estrategia Visualizada"

El Calendario de Amplify AI es el centro de operaciones para la planificación de contenido. Su objetivo es ofrecer una interfaz visual, intuitiva y potente que permita a los usuarios no solo organizar sus publicaciones, sino también tomar decisiones estratégicas basadas en una visualización clara de su cadencia de contenido.

## B. Arquitectura Técnica Actual

La pantalla del calendario está construida sobre una arquitectura de componentes modulares que separa las responsabilidades, facilitando su mantenimiento y escalabilidad.

### 1. Visión General del Flujo

`CalendarPage` (El Orquestador)
│
├── `CalendarToolbar` (Controles de Navegación)
├── `CalendarGrid` (La Cuadrícula Principal)
│   ├── `PostCard` (Cada publicación)
│   └── `TimeIndicator` (Línea de tiempo real)
└── `PostEditorModal` (Edición de Posts)

### 2. Descripción de Componentes

-   **`app/(main)/calendar/page.tsx`**: El componente principal que actúa como orquestador.
    -   **Responsabilidades:** Gestiona el estado global de la página (la fecha actual, la lista de posts, los estados de carga), maneja la lógica de negocio (handlers para clics, guardado y borrado) y obtiene los datos del `postService`.

-   **`components/calendar/CalendarGrid.tsx`**: Renderiza la cuadrícula de horas y días.
    -   **Responsabilidades:** Dibuja las líneas de la cuadrícula, posiciona los `PostCard` según su fecha/hora y muestra el `TimeIndicator` si corresponde. Es un componente de presentación que recibe los datos ya filtrados.

-   **`components/calendar/PostCard.tsx`**: La tarjeta de post individual.
    -   **Responsabilidades:** Muestra toda la información de un post (hora, categoría, estado, contenido, imagen). Es la unidad visual fundamental del calendario.

-   **`components/calendar/CalendarToolbar.tsx`**: La barra de herramientas de navegación.
    -   **Responsabilidades:** Contiene los controles para navegar entre semanas (`<`, `>`) y el botón `Hoy` para volver a la fecha actual y centrar la vista.

-   **`components/calendar/TimeIndicator.tsx`**: El indicador visual de la hora actual.
    -   **Responsabilidades:** Renderiza una línea roja en la columna del día y la posición de la hora actual. Se actualiza automáticamente cada minuto.

-   **`components/modals/PostEditorModal.tsx`**: El modal para la edición de posts.
    -   **Responsabilidades:** Proporciona una interfaz completa para modificar el contenido de una publicación.

### 3. Flujo de Datos

-   **`lib/services/postService.ts`**: Actúa como una capa de abstracción para el acceso a los datos (actualmente simulados). Su función clave es `getPosts(startDate, endDate)`, que filtra los posts por un rango de fechas, asegurando que solo se cargue la información necesaria para la vista actual.

## C. Funcionalidades Implementadas

-   **Vista Semanal Única:**
    -   **Layout:** Cuadrícula de 7 días (Lunes a Domingo) con una columna lateral para las horas.
    -   **Encabezado Fijo:** El encabezado con los días de la semana permanece siempre visible en la parte superior, mientras que la cuadrícula de horas se desplaza verticalmente.
    -   **Alineación de Columnas:** Las columnas tienen un ancho uniforme garantizado por el uso de `minmax(0, 1fr)` en la definición de la cuadrícula, evitando problemas de alineación causados por el contenido de las tarjetas.

-   **Navegación Intuitiva:**
    -   Navegación por semanas.
    -   Botón `Hoy` que regresa a la semana actual y centra la vista en la hora actual.

-   **Indicador de Tiempo Real:**
    -   Una línea roja visible en la semana actual que marca la hora del día en tiempo real.
    -   Al cargar la página en la semana actual, la vista se desplaza automáticamente a la posición de esta línea.

-   **Gestión de Posts (CRUD Parcial):**
    -   **Visualización:** Los `PostCard` muestran la hora, categoría, estado, contenido e imagen.
    -   **Edición:** Al hacer clic en un post, se abre un modal de edición.
    -   **Eliminación:** Se puede eliminar un post a través de un diálogo de confirmación.

## D. Backlog de Funcionalidades (Visión a Futuro)

Esta sección contiene las características definidas en la especificación inicial que aún no se han implementado.

-   **Vistas Adicionales:**
    -   Vista Mensual.
    -   Vista de Lista.
-   **Interacciones Avanzadas:**
    -   Drag & Drop de `PostCard` para reprogramar fácilmente.
    -   Creación rápida de posts en huecos vacíos de la cuadrícula.
-   **Integración de IA:**
    -   **Heatmap de Horas Óptimas:** Un `toggle` para visualizar las mejores horas para publicar.
    -   **Botón "Generar Ideas":** Para rellenar huecos en el calendario con sugerencias de la IA.
    -   Regeneración de contenido/imagen desde la propia tarjeta.
-   **Mejoras de UI:**
    -   Comentarios en los posts (el icono `MessageCircle` actualmente no tiene función).
    -   Menú de más opciones (el icono `MoreHorizontal` actualmente no tiene función).

---

## E. Estado de Funcionalidades Clave (Checklist)

Este es un resumen del estado actual de las funcionalidades principales solicitadas para tener una referencia rápida.

-   **Botón de Hoy:** `✅ Implementado`
    -   *Detalle: Centra la vista en la fecha y hora actual. La app también carga por defecto en la semana actual.*
-   **Flechas de Desplazamiento:** `✅ Implementado`
    -   *Detalle: Permiten la navegación entre semanas en la vista actual.*
-   **Selector de Vistas (Semanal/Mensual/Lista):** `❌ Pendiente`
    -   *Detalle: Actualmente solo existe la vista semanal.*
-   **Botón de Crear Post (+):** `✅ Implementado`
    -   *Detalle: El botón abre un modal para crear un nuevo post. La funcionalidad está conectada.*
-   **Horas Óptimas (Heatmap):** `✅ Implementado`
    -   *Detalle: El interruptor muestra/oculta un mapa de calor simulado sobre la cuadrícula del calendario.*