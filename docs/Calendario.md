# Especificación Detallada: Pantalla de Calendario

## A. Concepto: "Tu Estrategia Visualizada e Impulsada por IA"

El Calendario de Amplify AI no es solo un planificador. Es un **lienzo estratégico interactivo**. El usuario no solo ve *qué* se va a publicar, sino *por qué* se publica en un momento determinado. El objetivo es que la planificación se sienta sin esfuerzo, visualmente gratificante y estratégicamente sólida, gracias a la asistencia constante de la IA.

## B. Estructura General y Layout

-   **Layout Principal:** La pantalla utilizará la estructura general de la aplicación.
    -   **Navegación Izquierda:** El menú principal (Centro de Mando, Calendario, etc.) permanece visible.
    -   **Área de Contenido Principal:** Ocupa el resto del espacio. No hay panel derecho fijo para dar el máximo espacio posible al calendario.

### 1. Cabecera del Área de Contenido
-   **Título de la Página (H1):** "Calendario de Contenido"
-   **Selector de Vistas (`shadcn/ui Toggle Group`):**
    -   `[Icono Mes 🗓️] Mensual`
    -   `[Icono Semana  सात] Semanal`
    -   `[Icono Lista ≡] Lista`
-   **Controles de Navegación del Calendario:**
    -   Botón `< Anterior`
    -   Botón `Hoy`
    -   Botón `Siguiente >`
    -   Selector de Mes/Año (ej. "Octubre 2024").
-   **Botón CTA Principal:** `[✨ Generar Ideas]` (Abre una versión mini del wizard de campaña para rellenar huecos).

## C. La Tarjeta de Post (Componente Reutilizable)

Este es el átomo de nuestro calendario. Su diseño varía ligeramente según la vista, pero comparte elementos clave.

-   **Estado Visual:** Un indicador de color sutil (un borde izquierdo o un punto de color).
    -   `🔵 Azul (Índigo)`: **Programado.** Aprobado y listo para salir.
    -   `🟡 Amarillo`: **En Revisión.** Generado por IA, necesita aprobación del usuario.
    -   `🟢 Verde`: **Publicado.** El post ya está en vivo.
    -   `🔴 Rojo`: **Error.** Hubo un problema al publicar.
-   **Contenido:**
    -   **Visual:** Miniatura de la imagen o del primer frame del vídeo.
    -   **Texto:** Primera línea del copy.
    -   **Iconos de Acción (al hacer hover):** `[✏️ Editar]`, `[🗑️ Eliminar]`, `[🔄 Regenerar con IA]`.
    -   **Insight de IA (sutil):** Un pequeño icono `💡` en la esquina si ese post está en un horario óptimo. Al pasar el cursor sobre el icono, un tooltip explica: "Publicado a las 18:00h para maximizar el engagement de tu audiencia."

## D. Vistas del Calendario

### 1. Vista Semanal (Vista por Defecto)
-   **Layout:** Una cuadrícula de 7 columnas (Lunes a Domingo).
-   **Tarjetas de Post:** Grandes y detalladas. Muestran la hora de publicación, la miniatura visual completa y 2-3 líneas del copy. Permite ver claramente el contenido del día.
-   **Funcionalidad Clave:**
    -   **Drag & Drop:** El usuario puede arrastrar una tarjeta de un día/hora a otro. Al soltarla, se recalcula la programación.
    -   **Crear Post en Hueco:** Si un día está vacío, muestra un sutil botón `[+]` que al hacer clic abre el `PostGenerator`.

### 2. Vista Mensual
-   **Layout:** Cuadrícula clásica de calendario de 5x7.
-   **Tarjetas de Post:** Pequeñas y compactas. Muestran solo una pequeña miniatura y la hora. Si hay varios posts en un día, se apilan o se muestra un indicador "+2 más".
-   **Funcionalidad Clave:**
    -   **Vista de Pájaro:** Permite ver la cadencia y el equilibrio de la estrategia a lo largo del mes.
    -   **Navegación Rápida:** Al hacer clic en un día, se puede mostrar una vista "focus" de ese día o cambiar a la vista semanal centrada en esa semana.

### 3. Vista de Lista
-   **Layout:** Una tabla de datos (`shadcn/ui Table`).
-   **Columnas:** `Post (Miniatura + Copy)`, `Estado`, `Fecha Programada`, `Métricas Clave (Likes, Comentarios)`, `Acciones`.
-   **Funcionalidad Clave:**
    -   **Gestión en Masa:** Permite ordenar, filtrar (por estado, por campaña) y realizar acciones en varios posts a la vez (ej. "Aprobar todos los posts en revisión").

## E. Integración Inteligente de IA (La Ventaja de Amplify AI)

Esta es nuestra capa de valor añadido sobre un calendario estándar.

-   **"Heatmap" de Horas Óptimas (Inspirado en Imagen 15):**
    -   **Activación:** Hay un `toggle` en la cabecera llamado `[💡 Mostrar Horas Óptimas]`.
    -   **Efecto:** Al activarlo, el fondo de las celdas del calendario (en vista semanal/mensual) se colorea sutilmente con un gradiente. Los tonos más oscuros del **color Acento Índigo** indican las "horas calientes" con mayor potencial de engagement, según el análisis de la IA. Esto guía visualmente al usuario sobre dónde colocar sus posts.
-   **Botón "Rellenar Huecos con IA" (`[✨ Generar Ideas]`):**
    -   **Función:** La IA analiza el calendario actual y detecta días o franjas horarias con poca actividad.
    -   **Acción:** Al hacer clic, abre un modal que dice: "Hemos notado que tienes poca actividad la próxima semana. ¿Quieres que generemos 3 ideas de posts para rellenar los huecos y mantener la consistencia?". El usuario puede aceptar y la IA añade nuevos borradores (`En Revisión`) al calendario en las horas óptimas.

## F. Flujo de Edición y Aprobación

1.  El usuario ve una tarjeta amarilla (`En Revisión`).
2.  Hace clic en ella. Se abre un modal `PostEditor` (una pantalla que definiremos más adelante) con el contenido generado.
3.  El usuario edita el texto o regenera la imagen si lo desea.
4.  Hace clic en `[Aprobar y Programar]`.
5.  El modal se cierra y la tarjeta en el calendario cambia a color azul (`Programado`).

## G. Prompt para Generador de UI (v0.dev)

> A content calendar screen for a SaaS tool called "Amplify AI".
>
> **Header:** It has a main title "Calendario de Contenido". Next to it, a toggle group button (shadcn/ui style) to switch between "Mensual", "Semanal", and "Lista" views. On the right, navigation controls for the calendar and a primary CTA button "Generar Ideas" with a magic wand icon.
>
> **Calendar View (Weekly as default):** A 7-column grid for the days of the week. Each cell can contain multiple post cards.
>
- **Post Card:** A clean card (shadcn/ui Card) with a status indicator color on the left border (e.g., yellow for "In Review", blue for "Scheduled"). The card shows a visual thumbnail, the first line of the copy, and on-hover action icons for "Edit" and "Delete".
>
> **AI Feature:** There should be a toggle in the header "Mostrar Horas Óptimas". When active, it applies a subtle color heatmap to the calendar background, with darker shades of indigo (#6444F4) indicating the best times to post.
>
> **Overall aesthetic:** Minimalist, highly visual, and clean. The design should feel interactive with clear drag-and-drop affordances. Inspired by the best features of Planable and Social Champ's calendars. Use Inter or Geist font.