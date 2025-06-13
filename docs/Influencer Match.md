# Especificación Detallada: Pantalla de "Influencer Matcher"

## A. Concepto: "Tu Casting de Colaboradores, Potenciado por IA"

Esta pantalla no es un simple directorio de influencers. Es un **motor de matchmaking inteligente**. El objetivo es que el usuario encuentre no solo a los influencers con más seguidores, sino a los **colaboradores correctos**: aquellos cuya audiencia y valores se alinean perfectamente con la marca, maximizando el ROI de la colaboración.

## B. Estructura General y Layout

-   **Layout Principal:** Utiliza la estructura de la aplicación con la navegación principal a la izquierda. El área de contenido se divide en dos secciones principales: los controles de búsqueda y el área de resultados.

### 1. Cabecera del Área de Contenido
-   **Título de la Página (H1):** "Encuentra a tus Próximos Colaboradores"
-   **Componente de Búsqueda Principal (`shadcn/ui Input` con icono de lupa):**
    -   **Placeholder:** "Busca por palabra clave, nicho o @usuario..."

### 2. Barra de Filtros
-   **Layout:** Una barra horizontal debajo del buscador con varios `Select` y `Toggle Group`.
-   **Filtro 1: Ubicación (`Select`):** "Ciudad / País" (Ej: Madrid, España, Global).
-   **Filtro 2: Tamaño de Audiencia (`Toggle Group`):**
    -   `Nano (1k-10k)`
    -   `Micro (10k-50k)`
    -   `Medio (50k-500k)`
    -   `Macro (500k+)`
-   **Filtro 3: Categoría (`Select` con tags):** Sugeridas por la IA en base al perfil del usuario (Ej: "Yoga", "Comida Saludable", "Mindfulness").
-   **Botón de Acción:** `[Limpiar Filtros]`

---

## C. Área de Resultados

Esta sección se actualiza dinámicamente a medida que el usuario busca y filtra.

### 1. Pestañas de Descubrimiento
-   **Pestaña 1 (por defecto):** `[⭐ Sugeridos por IA]`
-   **Pestaña 2:** `[🔍 Resultados de Búsqueda]`

### 2. Contenido de la Pestaña "Sugeridos por IA"
-   **Concepto:** La IA analiza el perfil de la marca (tono, sector, audiencia) y los perfiles de los competidores para proponer una lista curada de los colaboradores con mayor potencial de afinidad.
-   **Layout:** Una cuadrícula de **Fichas de Influencer**.

### 3. Contenido de la Pestaña "Resultados de Búsqueda"
-   **Concepto:** Muestra los resultados directos de la búsqueda y filtros aplicados por el usuario.
-   **Layout:** La misma cuadrícula de **Fichas de Influencer**.

## D. El Componente "Ficha de Influencer" (La Tarjeta de Casting)

Este es el elemento visual clave del área de resultados.

-   **Componente:** Una `shadcn/ui Card` con un diseño limpio y visual.
-   **Contenido:**
    -   **Imagen de Perfil:** Grande y circular en la parte superior.
    -   **Nombre y @usuario:** `(Nombre del Influencer)`, `@usuario_de_instagram`.
    -   **Métricas Clave (KPIs):** Una fila con 3-4 métricas esenciales:
        -   `👥 Seguidores`: (ej. "25.4k")
        -   `🔥 Tasa de Engagement`: (ej. "4.2%") - *Un dato crucial que muchos directorios no muestran fácilmente.*
        -   `🎯 Afinidad con tu Marca`: Un score porcentual generado por la IA (ej. "85% Afinidad") - **Nuestra ventaja competitiva.**
    -   **Tags de Nicho:** Pequeños `Badges` con sus temas principales (ej. `Viajes`, `Fotografía`, `Sostenibilidad`).
-   **Acción de Hover/Click:** Al pasar el cursor, la tarjeta se eleva sutilmente. Al hacer clic, se abre una vista detallada.

---

## E. La Vista Detallada del Influencer (El Dossier Completo)

Al hacer clic en una ficha, se abre un **panel lateral deslizable (un "Sheet" de shadcn/ui)** o un modal, mostrando el dossier completo.

### 1. Cabecera del Panel
-   Imagen de perfil, nombre y @usuario.
-   Un botón `[Añadir a Favoritos ⭐]`

### 2. Sección de Estadísticas Avanzadas
-   **Gráfico de Crecimiento de Audiencia:** Un pequeño gráfico de líneas mostrando su crecimiento en los últimos 3 meses.
-   **Demografía de la Audiencia (si la API lo permite):** Gráficos de donut simples para "Distribución por Género" y "Principales Países/Ciudades".

### 3. Posts Más Relevantes
-   **Título:** "Ejemplos de su Contenido"
-   **Layout:** Una pequeña cuadrícula con sus 3-4 posts con mejor rendimiento que son relevantes para el nicho del usuario.

### 4. ⭐ El Pitch del Coach IA ⭐ (La Acción de Contacto)
-   **Componente:** Una `Card` destacada al final del panel.
-   **Título:** "Sugerencia de Contacto del Coach IA"
-   **Contenido:** Un borrador de mensaje de contacto pre-redactado y personalizado.
    -   **Ejemplo:** *"Hola [Nombre del Influencer], soy [Nombre de tu Marca]. Me encanta cómo abordas el tema de [tema en común] en tus posts, especialmente [mencionar un post específico]. Creo que tu audiencia conectaría genial con nuestra filosofía de [valor de tu marca]. ¿Estarías abierto/a a explorar una colaboración? ¡Un saludo!"*
-   **Botones CTA:**
    -   `[📋 Copiar Mensaje]`
    -   `[↗️ Abrir en Instagram]` (Abre un enlace directo a su perfil de Instagram para que el usuario pueda pegar el mensaje).

## F. Prompt para Generador de UI (v0.dev)

> A SaaS screen for an "Influencer Matcher" tool.
>
> **Header:** Contains an H1 title "Encuentra a tus Próximos Colaboradores", a large search bar, and a filter bar below it with dropdowns for "Ubicación", "Tamaño de Audiencia", and "Categoría".
>
> **Main Content Area:** It has two tabs: "Sugeridos por IA" and "Resultados de Búsqueda". The content area is a grid of "Influencer Cards".
>
> **Influencer Card (shadcn/ui Card style):**
> A clean, vertical card. It features a circular profile picture at the top, followed by the influencer's name and @username. Below that, a row with key stats: "Seguidores", "Tasa de Engagement", and a unique "Afinidad con tu Marca" score with a percentage. At the bottom, a few tags for their niche (e.g., "Yoga", "Wellness").
>
> **Detailed View (when a card is clicked):**
> A side panel slides out from the right. It shows more details: an audience growth chart, audience demographics, and a grid of their top-performing posts.
> The most important feature is at the bottom of the panel: a highlighted "AI Coach Suggestion" card that contains a pre-written, personalized outreach message with a "Copy Message" button.
>
> **Overall aesthetic:** Modern, clean, and data-driven, like a casting director's dashboard. Use Inter/Geist font. The design should make discovering and contacting influencers feel strategic and effortless.