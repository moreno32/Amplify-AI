# Especificación Detallada: El Estudio Creativo (Generador y Editor de Posts)

## A. Concepto: "Tu Copiloto Creativo, No un Piloto Automático"

El Estudio Creativo es un modal interactivo donde el usuario tiene el control final, pero la IA actúa como un asistente experto y proactivo. El objetivo es hacer que la creación y el ajuste de contenido sean rápidos, inspiradores y divertidos. El usuario debe sentir que está puliendo una joya, no trabajando en una cadena de montaje.

## B. Estructura General y Layout

-   **Componente Principal:** Un **Modal grande y centrado** (`shadcn/ui Dialog`) que se abre sobre la vista de Calendario. Esto mantiene el contexto y enfoca al usuario en la tarea.
-   **Layout del Modal:** Dos paneles verticales.
    -   **Panel Izquierdo (Vista Previa):** `width: 45%`. Muestra una simulación realista de cómo se verá el post en el feed de Instagram.
    -   **Panel Derecho (Taller de Edición):** `width: 55%`. Contiene todos los controles, editores y herramientas de IA.

---

## C. Panel Izquierdo (Panel de Vista Previa)

Su único propósito es responder a la pregunta: "¿Cómo se verá exactamente?".

### 1. Componentes
-   **Contenedor:** Un `Card` con una sombra sutil, diseñado para parecerse a la interfaz de un smartphone.
-   **Cabecera del Mockup:** Muestra el avatar y el nombre del perfil de Instagram del usuario.
-   **Área de Contenido Visual:** Muestra la imagen o el vídeo generado/subido. Ocupa la mayor parte del espacio.
-   **Área de Texto del Mockup:** Debajo del visual, muestra el texto del `copy` renderizado con saltos de línea y emojis, tal como aparecerá en la publicación final.

---

## D. Panel Derecho (Taller de Edición)

Aquí es donde ocurre toda la acción. Está organizado en secciones claras.

### 1. Cabecera del Taller
-   **Título/Estado:** Muestra el estado actual del post con un `Badge`. Ej: `🟡 En Revisión`, `🔵 Programado`.
-   **Botón de Cerrar:** `[X]` en la esquina superior derecha.

### 2. Sección de Contenido Visual
-   **Título:** "Imagen del Post"
-   **Componente:** Una miniatura de la imagen actual.
-   **Botones de Acción:**
    -   `[🔄 Regenerar con IA]`: Botón secundario. Al hacer clic, puede mostrar un pequeño `Input` para un nuevo prompt de imagen.
    -   `[⬆️ Cambiar Imagen]`: Permite subir una imagen propia desde el ordenador o la `Media Library`.

### 3. Sección de Contenido Escrito
-   **Título:** "Copy del Post"
-   **Componente Principal:** Un `Textarea` (`shadcn/ui Textarea`) de tamaño generoso donde vive el texto del post.
-   **⭐ El AI Toolkit Flotante ⭐:**
    -   **Activador:** Un `Button` circular con el icono `✨` que flota dentro o al lado del `Textarea`.
    -   **Menú (al hacer clic):** Un `DropdownMenu` con las siguientes opciones, cada una con su propio icono:
        -   `[✍️ Asistente de Escritura]`: Abre un submenú con acciones como `Hacer más corto`, `Hacer más largo`, `Cambiar a tono divertido`, `Añadir un CTA`.
        -   `[#️⃣ Generador de Hashtags]`: Analiza el copy y la imagen y sugiere un bloque de hashtags relevantes, que se pueden insertar con un clic.
        -   `[💡 Sugerir Variaciones]`: La IA genera 2-3 versiones completamente nuevas del copy para que el usuario elija.
        -   `[🔄 Empezar de Nuevo]`: Limpia el texto y muestra un `Input` para un nuevo prompt de escritura.

### 4. Sección de Publicación
-   **Título:** "Programación"
-   **Componentes:**
    -   Un `DatePicker` y un selector de hora para definir la fecha y hora de publicación.
    -   Un `Switch` para "Publicar automáticamente al llegar la hora". Si está desactivado, se quedará como borrador final.

### 5. Pie de Página del Modal (Acciones Finales)
-   **Botón Izquierdo (Secundario):** `[Guardar como Borrador]`
-   **Botón Derecho (Primario - Color Acento):**
    -   Si el post está `En Revisión`: `[✅ Aprobar y Programar]`
    -   Si el post ya está `Programado`: `[💾 Guardar Cambios]`
    -   Si se crea desde cero: `[🚀 Programar Post]`

## E. Flujo de Usuario: Creación desde Cero

1.  El usuario hace clic en `[+]` en una celda vacía del Calendario.
2.  Se abre el modal del **Estudio Creativo**, pero está vacío.
3.  El panel derecho muestra un único `Input`: "Describe tu idea para el post de hoy...".
4.  El usuario escribe: "Un post sobre los beneficios del yoga por la mañana".
5.  Debajo aparece un botón `[✨ Generar Post con IA]`.
6.  Al hacer clic, se muestra una animación de carga. En segundos, la IA:
    -   Genera una imagen relevante (ej. una persona haciendo yoga al amanecer) y la muestra en el **Panel de Vista Previa**.
    -   Escribe un `copy` completo con un CTA y lo inserta en el `Textarea` del **Taller de Edición**.
    -   Sugiere hashtags.
    -   Programa el post en la hora óptima para ese día, rellenando el `DatePicker`.
7.  A partir de aquí, el flujo continúa como si fuera una revisión normal. El usuario puede ajustar, regenerar o aprobar.

## F. Prompt para Generador de UI (v0.dev)

> A large modal UI for a "Post Editor" in a SaaS tool. The modal has a two-panel layout.
>
> **Left Panel (45% width):** A realistic, high-fidelity preview of an Instagram post inside a phone mockup. It shows a large image and the post's caption text below it.
>
> **Right Panel (55% width):** The "workshop" area with a light background. It's organized into sections.
> 1.  A section for the **Image**, showing a thumbnail and buttons to "Regenerate with AI" and "Change Image".
> 2.  A section for the **Copy**, with a large `Textarea` for editing. A small, circular floating button with a magic wand icon (✨) is positioned next to the textarea. Clicking this button opens a dropdown menu labeled "AI Toolkit" with options like "Writing Assistant" and "Hashtag Generator".
> 3.  A section for **Scheduling** with date and time pickers.
>
> **Footer:** The modal footer has a secondary "Save Draft" button and a primary, solid indigo (#6444F4) "Approve & Schedule" button.
>
> **Overall aesthetic:** Clean, modern, and highly interactive. The design should feel like a creative cockpit, empowering the user with AI tools. Inspired by the best features of modern AI-powered content editors. Use Inter or Geist font.