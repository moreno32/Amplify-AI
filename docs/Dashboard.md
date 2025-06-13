# Especificación Detallada: Dashboard "Centro de Mando" de Amplify AI

## A. Concepto: "Tu Vista de Vuelo Estratégica"

El Dashboard no es una simple colección de métricas. Es un **espacio de trabajo proactivo** que responde tres preguntas clave para el usuario en menos de 5 segundos:
1.  **¿Cómo voy?** (Métricas de resumen vitales)
2.  **¿Qué debería hacer ahora?** (Sugerencias y CTAs inteligentes)
3.  **¿Qué está por venir?** (Próximas publicaciones y alertas)

Se inspira en la estructura de 3 columnas de `Omoskollo` para una organización impecable y en el uso de tarjetas de `Topic Explorer` para un contenido dinámico y atractivo.

## B. Estructura General y Layout

-   **Estructura Principal:** Layout de 3 columnas.
    -   **Columna Izquierda (Navegación Principal):** `width: 20%` (o colapsable a iconos). `Dark Mode`.
    -   **Columna Central (Área de Trabajo):** `width: 50%`. `Light Mode`.
    -   **Columna Derecha (Panel de Contexto y Coach):** `width: 30%`. `Light Mode`.
-   **Fondo General:** Un gris muy claro (`hsl(0 0% 98%)` o `#F9F9FA`).

---

## C. Columna Izquierda (Navegación Principal)

Este es el esqueleto de la aplicación, siempre presente.

### 1. Estética
-   **Fondo:** `hsl(240 6% 10%)` o `#1A1A1C` (Casi Negro, como en `Omoskollo`).
-   **Color de Texto/Icono (Activo):** Blanco (`#FFFFFF`).
-   **Color de Texto/Icono (Inactivo):** Gris (`hsl(240 2% 46%)` o `#737378`).

### 2. Componentes (De arriba a abajo)
-   **Logo Amplify AI:** En la parte superior.
-   **Menú de Navegación (`shadcn/ui Nav`):**
    -   `[Icono Dashboard 📊]` **Centro de Mando** (Activo en esta vista)
    -   `[Icono Calendario 📅]` **Calendario**
    -   `[Icono IA ✨]` **Generador de Contenido**
    -   `[Icono Inbox ✉️]` **Social Inbox**
    -   `[Icono Influencer 🌍]` **Buscador de Influencers**
-   **Sección Inferior:**
    -   `[Icono Ayuda ❓]` **Ayuda y Soporte**
    -   **Avatar de Usuario:** Con menú desplegable para `Perfil`, `Facturación` y `Cerrar Sesión`.

---

## D. Columna Central (Área de Trabajo Principal)

Aquí es donde el usuario "vive" y toma acción.

### 1. Cabecera
-   **Saludo Personalizado:** "Hola de nuevo, [Nombre del Usuario] 👋"
-   **Botón CTA Primario:** Un botón grande y prominente de `shadcn/ui Button`.
    -   **Texto:** `[✨ Crear Nueva Campaña]`
    -   **Color:** Acento Índigo (`#6444F4`).

### 2. Sección de Métricas Resumen
-   **Título:** "Tu Rendimiento de un Vistazo"
-   **Layout:** Una cuadrícula de 2x2 con `shadcn/ui Card`.
    -   **Card 1 (Engagement):** Título "Tasa de Engagement", un número grande (ej. "4.5%"), una pequeña gráfica de tendencia (sparkline) y un indicador de cambio (ej. "▲ 0.5% vs. semana pasada").
    -   **Card 2 (Alcance):** Título "Alcance Total", número grande, sparkline, indicador de cambio.
    -   **Card 3 (Actividad):** Título "Posts Programados", número grande (ej. "12 posts este mes") y un link `[Ver Calendario]`.
    -   **Card 4 (Inbox):** Título "Mensajes Pendientes", número grande (ej. "3") y un link `[Ir al Inbox]`.

### 3. Sección "Acciones Recomendadas por IA"
-   **Título:** "¿Qué hacemos hoy?"
-   **Layout:** Una lista de 2-3 tarjetas de acción (`Card`).
    -   **Tarjeta de Acción 1 (La más importante):**
        -   **Icono:** `[Icono Cohete 🚀]`
        -   **Título:** "Lanzar Campaña de Crecimiento"
        -   **Descripción:** "Hemos detectado una oportunidad para aumentar tu visibilidad esta semana. ¿Creamos una campaña optimizada?"
        -   **Botón:** `[Empezar con un clic]`
    -   **Tarjeta de Acción 2 (Revisión):**
        -   **Icono:** `[Icono Check ✅]`
        -   **Título:** "Revisar Contenido Generado"
        -   **Descripción:** "Hay 4 nuevos posts listos para tu aprobación."
        -   **Botón:** `[Revisar ahora]`

---

## E. Columna Derecha (Panel de Contexto y Coach)

Este panel es el "cerebro" visible de Amplify AI, siempre dando consejos.

### 1. Perfil de Marca Rápido
-   **Componente:** Una pequeña `Card` en la parte superior.
-   **Contenido:** El logo del usuario, su nombre de marca, y `tags` con el tono definido en el onboarding (ej. `Tono: Cercano`, `Educativo`).

### 2. Feed del "Strategy Coach"
-   **Título:** "💡 Insights del Coach IA"
-   **Layout:** Una lista vertical de pequeñas alertas o notificaciones.
    -   **Insight 1 (Competitivo):** "Tu competidor `@rival` ha bajado su frecuencia de publicación. ¡Es el momento perfecto para destacar!"
    -   **Insight 2 (Oportunidad):** "El tema `[tendencia detectada]` está ganando tracción en tu sector. ¿Generamos un post sobre ello?" `[Crear Post]`
    -   **Insight 3 (Optimización):** "Hemos aprendido que los domingos a las 18:00h es tu mejor hora para publicar. Tu calendario ya está actualizado."

### 3. Próximas Publicaciones
-   **Título:** "En la Rampa de Lanzamiento"
-   **Layout:** Una lista simple con los próximos 2-3 posts.
    -   **Elemento de lista:** Pequeña miniatura de la imagen, primera línea del copy y la fecha/hora programada. `Hover` muestra un botón para `[Editar]`.

## F. Prompt para Generador de UI (v0.dev)

> A modern SaaS dashboard UI for a tool called "Amplify AI". Use a 3-column layout.
>
> **Left Column (20% width, dark mode #1A1A1C):** A vertical navigation bar with icons and text for "Centro de Mando", "Calendario", "Social Inbox". The active item is white.
>
> **Center Column (50% width, light mode #F9F9FA):** This is the main workspace. At the top, a welcome message and a large primary button in vibrant indigo (#6444F4) that says "Crear Nueva Campaña". Below, a 2x2 grid of stat cards (shadcn/ui style) for "Engagement", "Alcance", etc., each with a large number and a small trend line. Below that, a section titled "¿Qué hacemos hoy?" with large, clickable cards suggesting actions like "Lanzar Campaña de Crecimiento".
>
> **Right Column (30% width, light mode):** This is a context panel. At the top, a small card with the user's brand profile. Below, a feed of "Insights del Coach IA" with a lightbulb icon, showing short, actionable tips. At the bottom, a list of "Próximas Publicaciones".
>
> **Overall aesthetic:** Clean, spacious, and data-driven, with a professional and friendly feel. Inspired by the layouts of Omoskollo and ContentStudio. Use Inter or Geist font.