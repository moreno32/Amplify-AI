# Especificación y Arquitectura: Pantalla de "Strategy Coach"

## A. Concepto: "Tu Reunión Semanal de Estrategia con una IA Experta"

Esta pantalla no es un dashboard. Es una **sesión de consultoría interactiva**. El usuario viene aquí para responder a la pregunta: "¿Qué debería hacer para ganar a mi competencia y crecer de forma inteligente?". El Coach IA no solo presenta datos, sino que los interpreta, extrae lecciones y propone planes de acción concretos.

## B. Estructura General y Layout

-   **Layout Principal:** Utiliza la estructura de la aplicación con la navegación principal a la izquierda.
-   **Organización del Contenido:** Una página de una sola columna, diseñada para ser leída de arriba abajo como un informe ejecutivo. Se utilizan `Cards` y secciones bien definidas para estructurar la narrativa.

### 1. Cabecera del Área de Contenido
-   **Título de la Página (H1):** "Sesión con tu Strategy Coach 🧠"
-   **Selector de Enfoque:** Un `Select` que permite al usuario elegir en qué competidor quiere centrar el análisis de hoy. Por defecto, está en "Visión General del Mercado".
    -   `Visión General del Mercado`
    -   `Análisis de @competidor1`
    -   `Análisis de @competidor2`

---

## C. Contenido de la Vista: "Visión General del Mercado"

Esta es la vista por defecto, que da una perspectiva global.

### 1. Cuadrante Estratégico (Inspirado en el Growth Quadrant)
-   **Componente:** Una gran `Card` con un gráfico de dispersión (`Recharts`).
-   **Título:** "Tu Posición en el Mercado"
-   **Eje X:** "Tasa de Engagement"
-   **Eje Y:** "Crecimiento de Seguidores (%)"
-   **Cuadrantes:**
    -   **Abajo-Izquierda (Emergentes):** Crecimiento y engagement bajos.
    -   **Arriba-Izquierda (Creadores de Comunidad):** Engagement alto, crecimiento bajo.
    -   **Abajo-Derecha (Amplificadores):** Crecimiento alto, engagement bajo.
    -   **Arriba-Derecha (Líderes):** Crecimiento y engagement altos.
-   **Visualización:** El logo del usuario y los de sus competidores aparecen como puntos en el gráfico, permitiendo una autoubicación instantánea.

### 2. ⭐ La Lección del Coach IA ⭐
-   **Componente:** La `Card` de insight destacada.
-   **Ejemplo de Texto:** "💡 **Lección de Hoy:** Actualmente eres un **'Creador de Comunidad'**. Tu audiencia te adora, pero tu crecimiento es más lento que el de los 'Líderes'. La oportunidad clave es **amplificar tu alcance** sin perder la conexión. **Plan de Acción Propuesto:** Una campaña de 'Colaboración con Microinfluencers' para llegar a nuevas audiencias que comparten tus valores."
-   **Botón CTA:** `[Explorar Plan de Acción]` (Lleva a la sección de Influencer Matcher o a crear una campaña específica).

### 3. Temas de Conversación Dominantes
-   **Componente:** Una `Card` con un gráfico de barras o una lista.
-   **Título:** "De qué está hablando el mercado"
-   **Análisis:** La IA agrupa los posts de todos los competidores en 3-5 temas clave (ej. "Sostenibilidad", "Ofertas de Temporada", "Contenido Educativo") y muestra qué porcentaje del total de posts representa cada tema.

---

## D. Contenido de la Vista: "Análisis de [@competidor]"

Cuando el usuario selecciona un competidor específico, la pantalla se reconfigura para un análisis profundo.

### 1. Comparativa de Rendimiento (Head-to-Head)
-   **Componente:** Una `Card` con un gráfico de líneas (`Recharts`).
-   **Título:** "Rendimiento: Tú (Índigo) vs. @competidor (Gris)"
-   **Visualización:** Dos líneas en el mismo gráfico mostrando el crecimiento de seguidores a lo largo del tiempo. Permite ver claramente los puntos de inflexión.

### 2. Desglose de su Estrategia de Contenido (Inspirado en Predis.ai)
-   **Layout:** Una cuadrícula de 2x2 de `Cards`.
-   **Card 1: Tipos de Post:** Un gráfico de donut que muestra su mix de contenido (`60% Reels`, `30% Carruseles`, `10% Imágenes`).
-   **Card 2: Pilares Temáticos:** Un gráfico de barras que muestra sus temas principales (`#recetas: 40%`, `#bienestar: 35%`, etc.).
-   **Card 3: Patrón de Publicación:** Un `heatmap` semanal que muestra sus días y horas más activos.
-   **Card 4: Hashtags de Éxito:** Una nube de tags con los hashtags que les generan más engagement.

### 3. ⭐ La Lección del Coach IA ⭐
-   **Componente:** La `Card` de insight, ahora con un enfoque táctico.
-   **Ejemplo de Texto:** "💡 **Lección Táctica:** `@competidor` basa su crecimiento en **Reels educativos publicados los martes por la mañana**. Su hashtag `#trucosdecocina` es el que más tracción les genera. **Plan de Acción Propuesto:** Podemos 'contraprogramar' publicando un Reel tuyo sobre un tema similar el lunes por la noche, adelantándonos a su audiencia. Usaremos una variación de su hashtag de éxito para captar parte de su tráfico."
-   **Botón CTA:** `[Crear un Reel para el Lunes]`

---

## E. Objetivo Final: El Aprendizaje Continuo

El Strategy Coach no es estático. Cada semana, al entrar, el usuario verá un nuevo "insight principal" o "lección de la semana", haciendo que la visita a esta pantalla sea siempre valiosa y diferente. El historial de lecciones se podría guardar en una sección de "Archivo de Lecciones" para consulta posterior.

## F. Prompt para Generador de UI (v0.dev)

> A SaaS strategy screen called "Strategy Coach". The page is designed to look like a high-level executive report.
>
> **Header:** An H1 title "Sesión con tu Strategy Coach 🧠" and a dropdown to select a focus ("Visión General del Mercado" or a specific competitor).
>
> **Default View ("Visión General del Mercado"):**
> 1.  A large card containing a "Growth Quadrant" scatter plot. The X-axis is "Engagement Rate", Y-axis is "Follower Growth". It plots the user's logo and competitor logos as dots in the chart.
> 2.  A highlighted "AI Insight" card below the chart, with a lightbulb icon. It contains a "Lección de Hoy:" section with a strategic takeaway and a "Plan de Acción Propuesto:" with a clear CTA button.
>
> **Competitor Focus View ("Análisis de @competidor"):**
> 1.  A line chart card comparing the user's follower growth (in indigo) versus the competitor's (in grey).
> 2.  A 2x2 grid of cards below, breaking down the competitor's strategy: a donut chart for "Tipos de Post", a bar chart for "Pilares Temáticos", a weekly heatmap for "Patrón de Publicación", and a tag cloud for "Hashtags de Éxito".
> 3.  A dedicated "AI Insight" card with a tactical lesson and a specific, actionable CTA.
>
> **Overall aesthetic:** Clean, strategic, and insightful. Use clear data visualizations from Recharts, spacious cards, and premium typography (Inter/Geist). The design should feel less like a dashboard and more like a personalized strategy briefing.

---
---

## G. Arquitectura Viva y Estado de Implementación

*Última actualización: Refactorización completa para usar los componentes modulares `InsightCard` y `CompetitorGrid`.*

### 1. Arquitectura y Diseño Implementado: Componentes Especializados y Reutilizables

Esta pantalla es un excelente ejemplo de cómo combinar componentes de propósito general con componentes especializados para crear una UI compleja pero consistente.

**Componentes Clave Utilizados:**
-   **`PageHeader.tsx`**: Proporciona el título y subtítulo estándar para toda la página.
-   **`InsightCard.tsx`**: Un nuevo componente compartido y personalizable. Lo hemos creado para mostrar conclusiones o recomendaciones destacadas. Su principal característica es la prop `variant`, que nos permite cambiar su apariencia (ej., `variant="highlight"` para el fondo ámbar), cumpliendo con los requisitos de diseño específicos sin sacrificar la reutilización.
-   **`DashboardSection.tsx`**: Utilizado *dentro* de `CompetitorGrid` para proporcionar un encabezado estándar a la sección de competidores.
-   **`CompetitorGrid.tsx`**: Un nuevo componente que encapsula la lógica para mostrar la parrilla de competidores.

**Flujo de Datos y Estado**
La página maneja un estado local (`useState`) para controlar la pestaña activa y el competidor seleccionado. Esto permite una experiencia interactiva donde la selección de un competidor en la primera pestaña activa y actualiza el contenido de la segunda.

### 2. Desglose de Componentes (Implementación Actual)

**`strategy-coach/page.tsx`**
-   **Estructura**: La página principal gestiona el `PageHeader` y el componente `<Tabs>`. Su rol es principalmente de orquestador de estado y de layout.
-   **Contenido de Pestaña "Visión General"**:
    -   Renderiza el componente `<InsightCard>` con la variante `highlight`.
    -   Renderiza el componente `<CompetitorGrid>`, pasándole los datos y la función `handleCompetitorSelect`.

**`components/shared/InsightCard.tsx`**
-   **Propósito**: Mostrar un bloque de información destacado. Es altamente reutilizable.
-   **Características**: Usa `class-variance-authority` para manejar variantes visuales y acepta `props` para el icono, título, descripción y un objeto `cta` para el botón de acción.

**`components/CompetitorGrid.tsx`**
-   **Propósito**: Encapsular la sección "Competidores Clave".
-   **Estructura**: Utiliza `DashboardSection` para su cabecera y renderiza una parrilla de componentes `StrategyCompetitorCard`.

### 3. Backlog de Arquitectura y Mejoras

-   **(Prioridad Alta) Implementar Vista de Detalle de Competidor**: La pestaña `ContentAnalysisTab` actualmente solo recibe un ID. Se debe desarrollar completamente para mostrar un análisis detallado del competidor seleccionado.
-   **(Prioridad Media) Conectar a API de Mercado**: Reemplazar `mockCompetitors` con una llamada real a la API para obtener los datos de los competidores.
-   **(Prioridad Baja) Refinar Estilos de `InsightCard`**: Añadir más variantes (ej. "error", "success") a `InsightCard` a medida que surjan nuevas necesidades en la aplicación. 