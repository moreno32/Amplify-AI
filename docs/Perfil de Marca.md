# Especificación Detallada: Pantalla de "ADN de Marca"

## A. Concepto: "Tu Marca, Reflejada e Interpretada por la IA"

Esta pantalla es el puente entre el `brand_guide.md` (o la información del onboarding) y la ejecución creativa de la IA. Es un **dashboard de identidad** donde el usuario puede ver, validar y refinar la "conciencia de marca" que Amplify AI ha construido. Cada elemento es editable, permitiendo un bucle de feedback constante que hace a la IA más inteligente con el tiempo.

## B. Estructura General y Layout

-   **Layout Principal:** Utiliza la estructura de la aplicación con la navegación principal a la izquierda. El área de contenido se organiza con pestañas para separar las facetas del ADN de la marca.
-   **Organización del Contenido:** Pestañas (`shadcn/ui Tabs`) para una navegación clara y enfocada.

### 1. Cabecera del Área de Contenido
-   **Título de la Página (H1):** "El ADN de tu Marca: [Nombre de la Marca]"
-   **Subtítulo:** "Aquí puedes ver y refinar cómo nuestra IA entiende y representa tu marca."
-   **Botón de Acción:** `[🔄 Resincronizar desde Guía]` (Vuelve a procesar el `brand_guide.md` si se ha actualizado).

### 2. Pestañas del ADN de Marca
-   **Pestaña 1 (por defecto):** `[🧬 CORE]` - El Genoma Estratégico
-   **Pestaña 2:** `[🗣️ VOICE]` - El Sistema Verbal
-   **Pestaña 3:** `[🎨 VISUAL]` - El Genoma Estético
-   **Pestaña 4:** `[📚 ASSETS]` - La Biblioteca de Activos

---

## C. Contenido de la Pestaña "CORE"

Aquí se visualiza la estrategia pura extraída del `@CORE` y `@EXEC`.

### 1. El Genoma Estratégico
-   **Layout:** Una cuadrícula de 2x2 de `shadcn/ui Card`.
-   **Card 1: Promesa de Marca:** Título `@CORE::Promise::001`, Keyword `I LOVE ME`, y la definición completa.
-   **Card 2: Arquetipos Narrativos:** Título `@CORE::Narrative::001`, muestra los arquetipos `Amante` y `Sabio` con iconos, y un resumen del "Viaje de la Heroína".
-   **Card 3: Pilares de Contenido:** Título `@EXEC::ContentCalendar`, muestra visualmente los temas semanales (`Lunes: Motivación`, `Miércoles: Workout`, etc.) con iconos.
-   **Card 4: Protocolos Reactivos:** Título `@EXEC::ReactiveProtocol`, muestra el "Filtro de Marca" para tendencias como un diagrama de flujo simple.

### 2. ⭐ El Veredicto del Coach IA ⭐
-   **Componente:** Una `Card` de insight al final.
-   **Texto:** "✅ **Validación del Coach:** He asimilado que tu marca es un **'Santuario'** que usa la narrativa del **'Amante'** para guiar a las socias en su viaje de autoaceptación. Mi directiva principal es generar contenido que siempre refuerce el mantra **'#ILoveMe'**."

---

## D. Contenido de la Pestaña "VOICE"

Aquí el usuario "escucha" la personalidad de su marca.

### 1. El Espectro Tonal
-   **Componente:** Una visualización tipo `Progress Bar` apilada.
-   **Título:** "Espectro Tonal (`@VOICE::ToneSpectrum::001`)"
-   **Visualización:** `[ 70% Empoderador ] [ 20% Educativo ] [ 10% Sofisticado ]`

### 2. Léxico de Marca y "Anti-Tono"
-   **Layout:** Dos columnas de `Cards`.
-   **Columna 1: Términos Clave:** Una lista de términos (`Santuario`) con su `rationale`.
-   **Columna 2: Reglas Duras (Anti-Tono):** Una lista en rojo de las palabras/conceptos prohibidos (`no pain no gain`, etc.).

### 3. "Prueba de Sonido" de la IA
-   **Componente:** Una `Card` interactiva.
-   **Título:** "Genera un ejemplo con mi voz"
-   **Input:** Un `Select` con los `use_case` de los blueprints. Ej: `Post de lunes por la mañana`.
-   **Botón:** `[Generar Texto]`
-   **Resultado:** La IA genera un texto usando el `@VOICE::Blueprint::Copy::Motivation::001` para que el usuario valide el resultado en tiempo real.

---

## E. Contenido de la Pestaña "VISUAL"

El look & feel de la marca, decodificado.

### 1. Paleta de Colores (`@VISUAL::Color`)
-   **Componente:** Muestras de color interactivas (como en la Imagen 1).
-   **Visualización:** Cada color primario y secundario se muestra con su HEX, nombre y las `IA Keywords` asociadas. Al hacer clic en un color, se pueden ver más detalles.

### 2. Tipografía (`@VISUAL::Typography`)
-   **Componente:** Muestra las fuentes para títulos y cuerpo de texto con ejemplos.

### 3. "Prueba de Cámara" de la IA
-   **Componente:** Una `Card` interactiva.
-   **Título:** "Genera una imagen con mi estilo"
-   **Input:** Un `Select` con los `use_case` de los blueprints. Ej: `Post motivacional`.
-   **Botón:** `[Generar Imagen]`
-   **Resultado:** La IA genera una imagen usando el `@VISUAL::Blueprint::Image::Empowerment::001` y muestra el prompt completo que utilizó, permitiendo al usuario ver cómo la IA "piensa" visualmente.

---

## F. Contenido de la Pestaña "ASSETS" (Inspirado en Imagen 4)

La biblioteca de recursos aprobados.

-   **Layout:** Una vista de galería con un panel de carpetas a la izquierda.
-   **Carpetas:** `Logos`, `Imágenes de Producto`, `Fotos del Equipo`, `Contenido Aprobado de Socias (UGC)`.
-   **Funcionalidad:**
    -   Permite subir nuevos archivos (`drag-and-drop`).
    -   Cada imagen puede tener `tags` (ej. `#yoga`, `#interior`, `#equipo`).
    -   **Feedback a la IA:** El usuario puede marcar imágenes como `Favoritas ⭐` o `No usar 🚫`. La IA aprenderá de esta selección para priorizar ciertos estilos visuales en futuras generaciones.

## G. Prompt para Generador de UI (v0.dev)

> A SaaS screen called "ADN de Marca". It's a dashboard that visualizes a brand's identity for an AI. The main content area uses tabs.
>
> **Tabs:** "CORE", "VOICE", "VISUAL", and "ASSETS".
>
> **Tab 1 ("CORE"):**
> A 2x2 grid of cards. Each card visualizes a strategic element: "Promesa de Marca", "Arquetipos Narrativos", "Pilares de Contenido", and "Protocolos Reactivos".
>
> **Tab 2 ("VOICE"):**
> - A visual representation of the "Tonal Spectrum" using a stacked progress bar (e.g., 70% Empowering, 20% Educational).
> - An interactive card titled "Prueba de Sonido de la IA" where the user can select a use-case from a dropdown and click "Generate Text" to see an AI-generated copy sample.
>
> **Tab 3 ("VISUAL"):**
> - A color palette section showing brand colors with their HEX codes and descriptive keywords.
> - An interactive card titled "Prueba de Cámara de la IA" where the user can select a use-case and click "Generate Image" to see an AI-generated image and the prompt used to create it.
>
> **Tab 4 ("ASSETS"):**
> A media library view with a folder structure on the left and a grid of images on the right. Users can upload files and mark images as "Favorite" or "Do not use".
>
> **Overall aesthetic:** Clean, structured, and highly visual, like a living brand guideline document. Use Inter/Geist font. The design should feel like a sophisticated control panel for the brand's AI-driven identity.