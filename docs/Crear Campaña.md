# Especificación Detallada: Flujo "Crear Campaña"

## A. Concepto: "El Brief de 1 Minuto"

El objetivo de esta pantalla no es que el usuario escriba un brief de marketing completo. Es darle a la IA la **intención estratégica** con el mínimo esfuerzo posible. El flujo está diseñado para que un usuario pueda lanzar una campaña de alta calidad en menos de 60 segundos si así lo desea, pero también ofrece profundidad para quienes quieren más control.

## B. Punto de Entrada: El Modal "Mago de Campañas"

Al hacer clic en "✨ Crear Nueva Campaña" desde el Dashboard, no se va a una página nueva, sino que se abre un **modal a pantalla completa (Full-screen Modal)**. Esto mantiene al usuario en contexto y hace que la creación se sienta como una tarea rápida y enfocada.

### Estructura del Modal
-   **Layout:** Dos paneles, similar a la inspiración `Your Campaign Wizard`.
    -   **Panel Izquierdo (Visual e Inspiracional):** `width: 40%`. Fondo con el gradiente Índigo de la marca. Contiene una ilustración o animación y texto de apoyo.
    -   **Panel Derecho (Formulario de Acción):** `width: 60%`. Fondo blanco o gris muy claro. Aquí vive el "wizard".

### Panel Izquierdo (Contenido)
-   **Ilustración:** Una ilustración estilizada (similar a la inspiración del megáfono) que representa "ideas en acción" o "estrategia tomando forma".
-   **Título (H2):** "Dale a la IA un objetivo."
-   **Subtítulo (p):** "Nosotros nos encargamos de la estrategia, el copy, las imágenes y el calendario."

---

## C. Panel Derecho: El Asistente de Creación

Este panel presenta al usuario dos opciones iniciales, cumpliendo el requisito de "Form mini o IA autocompleta".

### Paso 1: Elige tu Camino

-   **Título (H1):** "Vamos a crear tu próxima campaña."
-   **Subtítulo (p):** "¿Cómo quieres empezar?"

-   **Opción 1: Creación Rápida (El Form Mini con IA)**
    -   **Componente:** Una `shadcn/ui Card` grande y destacada.
    -   **Icono:** `[Icono Rayo ⚡]`
    -   **Título:** "Campaña Express"
    -   **Descripción:** "Describe tu idea en una frase y deja que nuestra IA haga el resto."
    -   **Acción:** Al hacer clic, se expande para mostrar un único campo de texto.
        -   **Input:** `Textarea` con el placeholder: "Ej: 'Una oferta de 2x1 en cafés para atraer estudiantes esta semana'."
        -   **Botón:** `[✨ Generar Campaña Mágica]` (El CTA final y más rápido).

-   **Opción 2: Creación Guiada (El Brief Estratégico)**
    -   **Componente:** Una `shadcn/ui Card` secundaria (variante `outline`).
    -   **Icono:** `[Icono Mapa 🗺️]`
    -   **Título:** "Campaña Guiada"
    -   **Descripción:** "Define los detalles para una campaña más precisa y personalizada."
    -   **Acción:** Al hacer clic, se inicia un wizard de 2-3 pasos.

---

## D. Flujo del Wizard "Campaña Guiada"

Si el usuario elige esta opción, el contenido del panel derecho cambia a un flujo paso a paso.

### Paso 2.1: El Objetivo (Inspirado en `Create with AI`)

-   **Título del Paso:** "1. ¿Cuál es el objetivo principal?"
-   **Componente:** Una cuadrícula de 2x2 con `Cards` seleccionables.
    -   **Card 1: `[Icono megáfono]` Promocionar:** "Lanzar un producto, oferta o evento."
    -   **Card 2: `[Icono comunidad]` Interactuar:** "Aumentar el engagement y la conversación."
    -   **Card 3: `[Icono libro]` Educar:** "Posicionar tu marca como experta en un tema."
    -   **Card 4: `[Icono cohete]` Crecer:** "Conseguir más seguidores y alcance."

### Paso 2.2: La Materia Prima

-   **Título del Paso:** "2. ¿En qué nos basamos?"
-   **Subtítulo:** "Puedes darnos contexto para que el contenido sea más rico y alineado." (Opcional)
-   **Opción A: Texto Simple**
    -   **Input:** Un `Textarea` para "Mensajes clave o información relevante."
-   **Opción B: Fuente Externa**
    -   **Componente:** Una zona de `drag-and-drop` (como en `Create Campaign`).
    -   **Texto:** "O arrastra un documento (PDF, DOCX) o un enlace a una web."

### Paso 2.3: Detalles Finales

-   **Título del Paso:** "3. Ajustes finales"
-   **Input 1: Nombre de la Campaña (opcional)**
    -   La IA sugerirá uno si se deja en blanco. Placeholder: "Ej: Campaña de Verano 2024".
-   **Input 2: Duración de la Campaña**
    -   **Componente:** Botones de selección (`Toggle Group`).
    -   **Opciones:** `1 semana`, `2 semanas`, `1 mes`, `Continuo`.
-   **Botón CTA Final:** `[✨ Generar Campaña Estratégica]`

---

## E. Estado de Carga y Redirección

-   Al hacer clic en cualquiera de los botones de "Generar Campaña", el modal muestra una animación de carga (similar a la del Onboarding).
-   **Texto de Carga:** "Estamos diseñando tu estrategia... creando los posts... organizando el calendario..."
-   **Redirección:** Una vez completado, el modal se cierra y el usuario es redirigido a la **pantalla de Calendario**, donde podrá ver la campaña recién generada, lista para revisar y aprobar. Un `Toast` de éxito confirma la creación: "✅ ¡Tu campaña '[Nombre de Campaña]' ha sido generada! Revisa los posts en el calendario."

## F. Prompt para Generador de UI (v0.dev)

> A full-screen modal UI for a "Create Campaign" wizard in a SaaS tool called Amplify AI. The modal has two panels.
>
> **Left Panel (40% width, dark mode):** A vibrant indigo gradient background (#6444F4) with a modern illustration of a megaphone and abstract shapes. It has a large H2 title "Dale a la IA un objetivo."
>
> **Right Panel (60% width, light mode #FFFFFF):** This is the wizard.
> **Initial Step:** An H1 title "Vamos a crear tu próxima campaña.". Below, two large, clickable cards.
> - **Card 1 (Primary):** Titled "Campaña Express" with a lightning bolt icon (⚡). When clicked, it reveals a single textarea and a primary button "Generar Campaña Mágica".
> - **Card 2 (Secondary, outline style):** Titled "Campaña Guiada" with a map icon (🗺️).
>
> **If "Campaña Guiada" is clicked, show Step 2 of the wizard:**
> **Step 2:** An H2 title "¿Cuál es el objetivo principal?". Below it, a 2x2 grid of selectable cards with icons for "Promocionar", "Interactuar", "Educar", and "Crecer".
>
> **Overall aesthetic:** Clean, intuitive, and highly guided. Use Inter or Geist font. The design should feel fast and intelligent, inspired by modern AI-native product wizards.