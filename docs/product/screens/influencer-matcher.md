# Especificación y Arquitectura: Pantalla de "Influencer Matcher"

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

---
---

## G. Arquitectura Viva y Estado de Implementación

*Última actualización: Implementación inicial de la página con `PageHeader` estandarizado y tarjetas de influencer.*

### 1. Arquitectura y Diseño Implementado: Cabecera Estándar y Parrilla de Resultados

La arquitectura de esta página sigue el patrón de diseño modular establecido en el resto de la aplicación.

**Componente Clave: `PageHeader.tsx`**
La página utiliza el componente reutilizable `PageHeader` para presentar el título principal y la descripción. Lo más importante es que la sección de acciones (`actions`) del `PageHeader` se ha utilizado de forma creativa para alojar toda la barra de búsqueda y filtros, manteniendo la página principal limpia y organizada.

**Flujo de Datos**
Actualmente, la página obtiene los datos de un archivo de mock: `mockInfluencers` desde `@/lib/mock-data`. El siguiente paso en el backlog es conectar esto a una API real que ejecute la lógica de búsqueda y filtrado en el backend.

### 2. Desglose de Componentes (Implementación Actual)

**`influencers/page.tsx` (Componente Principal)**
-   **Estructura**: El componente renderiza `PageHeader` en la parte superior. El cuerpo principal está gestionado por un componente `<Tabs>` de `shadcn/ui` para separar los "Sugeridos por IA" de los "Resultados de Búsqueda".
-   **Contenido de Pestañas**: Cada pestaña (`<TabsContent>`) contiene una parrilla (`grid`) que mapea los datos de los influencers y renderiza un componente `InfluencerCard` para cada uno.

**`components/InfluencerCard.tsx` (La Ficha de Casting)**
-   **Propósito**: Este es el componente visual más importante de la sección. Muestra un resumen conciso y atractivo de un influencer.
-   **Estructura**: Es una `<Card>` de `shadcn/ui` que contiene:
    -   Un `Avatar` para la imagen de perfil.
    -   El nombre y el @usuario.
    -   Las métricas clave (Seguidores, Engagement, Afinidad).
    -   Una serie de `Badge` para los tags o nichos.

### 3. Backlog de Arquitectura y Mejoras

-   **(Prioridad Alta) Implementar Vista de Detalle**: Crear el panel lateral (`Sheet`) que se abre al hacer clic en una `InfluencerCard`. Este panel debe contener las secciones de "Estadísticas Avanzadas" y "Posts Relevantes", y cada una de ellas debe usar el componente `BlockHeader` para sus títulos.
-   **(Prioridad Alta) Implementar el "Pitch del Coach IA"**: Dentro del panel de detalle, desarrollar el componente que genera y presenta un mensaje de contacto personalizado.
-   **(Prioridad Media) Conectar Filtros a la Lógica de Datos**: Actualmente los filtros son solo visuales. Se necesita implementar la lógica (probablemente usando `useState` y `useEffect`) para que los cambios en los filtros disparen una nueva petición de datos.
-   **(Prioridad Baja) Separar Barra de Filtros a su Propio Componente**: Para mejorar la legibilidad del `page.tsx`, la barra de búsqueda y filtros podría extraerse a su propio componente, `InfluencerFilters.tsx`. 