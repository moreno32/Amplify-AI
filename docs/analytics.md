# Especificación y Arquitectura: Pantalla de "Análisis de Rendimiento"

## A. Concepto: "De los Datos a las Decisiones en un Instante"

Esta pantalla transforma datos brutos en inteligencia accionable. El objetivo no es que el usuario se pierda en los números, sino que entienda rápidamente su situación, vea cómo se compara con la competencia y reciba recomendaciones claras de la IA para su próximo movimiento estratégico.

## B. Estructura General y Layout

-   **Layout Principal:** Utiliza la estructura de la aplicación con la navegación principal a la izquierda y el área de contenido ocupando el resto del espacio.
-   **Organización del Contenido:** El área de contenido se organiza mediante **pestañas (`shadcn/ui Tabs`)** para separar las diferentes capas de análisis de forma limpia.

### 1. Cabecera del Área de Contenido
-   **Título de la Página (H1):** "Análisis de Rendimiento"
-   **Selector de Rango de Fechas:** Un `DatePicker` que permite al usuario seleccionar el período de análisis (Últimos 7 días, Últimos 30 días, Mes Pasado, Rango Personalizado).
-   **Botón de Acción:** `[⬇️ Exportar Reporte]` (Genera un PDF simple con los datos clave).

### 2. Pestañas de Análisis
-   **Pestaña 1 (por defecto):** `[📊 Mi Rendimiento]`
-   **Pestaña 2:** `[⚔️ Análisis Competitivo]`
-   **Pestaña 3:** `[🏆 Top Posts]`

---

## C. Contenido de la Pestaña 1: "Mi Rendimiento"

Aquí el usuario obtiene una radiografía de su propia cuenta.

### 1. KPIs Principales (Inspirado en SocialBee)
-   **Layout:** Una cuadrícula de 4 `shadcn/ui Card` en la parte superior.
-   **Card 1: Alcance:** Número grande, `+X% vs. período anterior`, y un pequeño icono de gráfico de barras.
-   **Card 2: Tasa de Engagement:** Número en porcentaje, `+X% vs. período anterior`, icono de corazón/comentario.
-   **Card 3: Nuevos Seguidores:** Número grande, `+X% vs. período anterior`, icono de usuario.
-   **Card 4: Posts Publicados:** Número, `+X% vs. período anterior`, icono de cuadrícula.

### 2. Gráfico de Evolución
-   **Componente:** Un gran gráfico de líneas (`Recharts`).
-   **Título:** "Evolución de Seguidores y Engagement"
-   **Visualización:** Muestra dos líneas por defecto: el crecimiento de seguidores y la tasa de engagement a lo largo del tiempo seleccionado. El usuario puede activar/desactivar métricas adicionales (Likes, Comentarios, Alcance).
-   **Interactividad:** Al pasar el cursor sobre el gráfico, un `tooltip` muestra los datos exactos de ese día.

### 3. ⭐ El Insight del Coach IA ⭐
-   **Componente:** Una `Card` destacada, justo debajo del gráfico, con un icono `💡`.
-   **Propósito:** La IA interpreta los datos de esta pestaña y ofrece una conclusión y una acción.
-   **Ejemplo de Texto:** "💡 **Conclusión del Coach:** Tu crecimiento de seguidores se aceleró un 30% después de la campaña 'Promo Verano', pero tu tasa de engagement se ha mantenido estable. **Recomendación:** Lancemos una campaña de 'Interacción' con preguntas y encuestas para activar a tu nueva audiencia."
-   **Botón CTA:** `[Crear Campaña de Interacción]`

---

## D. Contenido de la Pestaña 2: "Análisis Competitivo"

La característica estrella de Amplify AI.

### 1. Layout (Inspirado en ContentStudio - Imagen 3)
-   Una sección con un carrusel o una cuadrícula de `Cards` que se desplaza horizontalmente. La primera tarjeta es siempre "Tu Rendimiento". Las siguientes son cada uno de los competidores que el usuario definió en el onboarding.

### 2. Estructura de la Tarjeta de Competidor
-   **Cabecera:** Logo y nombre del competidor (`@nombrecompetidor`).
-   **Visual:** Una miniatura de su post más reciente o con mejor rendimiento.
-   **KPIs Comparativos:** Una lista de métricas clave donde se compara directamente su número con el del usuario.
    -   `Seguidores:` 115k (vs. **tus 82k**)
    -   `Tasa de Engagement:` 2.1% (vs. **tu 3.5%**) - *El número del usuario se resalta en negrita y se colorea de verde si es mejor, o rojo si es peor.*
    -   `Frecuencia de Posteo:` 4 posts/sem. (vs. **tus 3 posts/sem.**)

### 3. ⭐ El Insight del Coach IA ⭐
-   **Componente:** La misma `Card` de insight, pero con un análisis comparativo.
-   **Ejemplo de Texto:** "💡 **Análisis Competitivo:** Estás superando a todos tus competidores en **Tasa de Engagement**, ¡excelente trabajo! Sin embargo, `@rival1` está creciendo más rápido en seguidores porque publica Reels a diario. **Recomendación:** ¿Probamos a generar un Reel para tu post con más 'Me Gusta' de esta semana?"
-   **Botón CTA:** `[Convertir Top Post en Reel]`

---

## E. Contenido de la Pestaña 3: "Top Posts"

Aquí celebramos las victorias y aprendemos de ellas.

### 1. Layout
-   Una cuadrícula de 2x3 con los 6 posts de mejor rendimiento en el período seleccionado.
-   **Controles de Filtro:** Un `Select` para ordenar por: `Más Alcance`, `Más Likes`, `Más Comentarios`, `Más Guardados`.

### 2. Estructura de la Tarjeta "Top Post"
-   La imagen o vídeo del post.
-   El KPI principal por el que es "Top" (ej. "**25.3k** de Alcance").
-   Estadísticas secundarias (Likes, Comentarios).
-   Un botón `[Reutilizar Post]`

### 3. ⭐ El Insight del Coach IA ⭐
-   **Componente:** La `Card` de insight, enfocada en la detección de patrones.
-   **Ejemplo de Texto:** "💡 **Patrón de Éxito:** Tus 3 posts con más comentarios son aquellos en los que haces una pregunta directa en la primera línea del copy. ¡A tu audiencia le encanta participar! **Recomendación:** La IA puede asegurar que tus futuros posts sigan este patrón."
-   **Botón CTA:** `[Actualizar Guía de Estilo de IA]`

## F. Prompt para Generador de UI (v0.dev)

> A SaaS analytics dashboard screen named "Análisis de Rendimiento". The main content area uses a tabbed interface.
>
> **Header:** Contains an H1 title, a date range picker, and an "Export" button.
> **Tabs:** Three tabs: "Mi Rendimiento", "Análisis Competitivo", "Top Posts".
>
> **Tab 1 ("Mi Rendimiento"):**
> At the top, a 4-card grid of main KPIs like "Alcance" and "Engagement Rate", each with a big number and a trend indicator. Below, a large, interactive line chart from Recharts showing follower growth over time. Below the chart, a highlighted "AI Insight" card with a lightbulb icon, actionable text, and a CTA button.
>
> **Tab 2 ("Análisis Competitivo"):**
> Features a horizontally scrollable section of cards. The first card is "Tu Rendimiento". Subsequent cards are for competitors, showing their logo, a recent post, and a list of comparative KPIs where the user's number is highlighted in green or red. Includes a dedicated "AI Insight" card below.
>
> **Overall aesthetic:** Data-rich but extremely clean and readable. Use spacious cards (shadcn/ui style), clear typography (Inter/Geist), and vibrant but accessible chart colors. The design should feel insightful and strategic, not just a data dump.

---
---

## G. Arquitectura Viva y Estado de Implementación

*Última actualización: Refactorización de la pestaña "Mi Rendimiento" para usar el componente modular `DashboardSection`.*

### 1. Arquitectura y Diseño Implementado: Pestañas Modulares y Componentes Reutilizables

La arquitectura de la página de Análisis es un excelente ejemplo de nuestra estrategia de Componentes de Orden Superior. La página principal (`AnalyticsPage`) actúa como un controlador de alto nivel que gestiona la cabecera y la navegación por pestañas, mientras que la lógica y la presentación de cada vista se delegan a componentes hijos.

**Componentes Clave Utilizados:**
-   **`PageHeader.tsx`**: Se utiliza para el título principal y las acciones globales de la página (selector de fecha y exportación).
-   **`DashboardSection.tsx`**: Este componente, creado para el Dashboard, se ha reutilizado aquí con éxito para encapsular las secciones principales de la pestaña "Mi Rendimiento", asegurando una cabecera y estructura consistentes.
-   **`KpiCard.tsx`**: Un componente específico de esta sección para mostrar las métricas clave (KPIs) en un formato de tarjeta uniforme.

**Flujo de Datos:**
La página principal delega la responsabilidad de obtener y manejar los datos a cada componente de pestaña (`MiRendimientoTab`, `AnalisisCompetitivoTab`, etc.). Actualmente, estos datos provienen de mocks, y el siguiente paso es conectarlos a un endpoint de API.

### 2. Desglose de Componentes (Implementación Actual en `MiRendimientoTab`)

**`analytics/page.tsx`**
-   **Estructura**: Renderiza el `PageHeader` y un componente `<Tabs>` de `shadcn/ui`.
-   **Lógica**: La lógica de cada pestaña está completamente contenida en sus respectivos componentes.

**`components/MiRendimientoTab.tsx`**
-   **KPIs**: Renderiza una parrilla de componentes `KpiCard`.
-   **Gráfico de Evolución**: Esta sección está ahora envuelta en un `<DashboardSection>`, que le proporciona el título estandarizado "Evolución de Seguidores y Engagement" a través del `BlockHeader`.
-   **Conclusión del Coach**: Esta sección también utiliza `<DashboardSection>` para su cabecera, reemplazando la necesidad de un componente `AiInsightCard` personalizado y unificando el diseño.

### 3. Backlog de Arquitectura y Mejoras

-   **(Prioridad Alta) Refactorizar Pestañas Restantes**: Aplicar el patrón `DashboardSection` a las pestañas `AnalisisCompetitivoTab` y `TopPostsTab` para completar la estandarización de la pantalla.
-   **(Prioridad Media) Conectar a la API de Analíticas**: Reemplazar todos los datos mock por llamadas reales a la API, incluyendo la lógica para que el selector de fechas (`DatePickerWithRange`) dispare nuevas peticiones.
-   **(Prioridad Baja) Optimizar Gráficos con `recharts`**: Investigar la carga perezosa (lazy loading) de los componentes de gráficos, ya que `recharts` puede ser una librería pesada. 