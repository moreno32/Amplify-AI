# Arquitectura Viva: Dashboard "Centro de Mando"

*Última actualización: Refactorización de la columna central para usar el componente modular `DashboardSection`.*

## A. Propósito Estratégico: "Tu Vista de Vuelo Estratégica"

El Dashboard es el punto de partida del usuario. Su objetivo es ofrecer una visión clara e inmediata del estado de su marca y guiarlo hacia las acciones más importantes. Debe responder a tres preguntas clave en segundos:
1.  **¿Cómo voy?** (Rendimiento clave)
2.  **¿Qué debería hacer ahora?** (Acciones recomendadas)
3.  **¿Qué está por venir?** (Contexto y futuro)

## B. Arquitectura y Diseño Implementado: Un Mosaico de Tarjetas Modulares

La arquitectura del Dashboard se basa en el principio de **modularidad a través de tarjetas**. Cada bloque de información es un componente `Card` de `shadcn/ui`, lo que permite una disposición flexible y un diseño limpio y consistente.

### Componente Clave: `DashboardSection.tsx`
Para estandarizar la presentación de las secciones principales, hemos creado el componente reutilizable `DashboardSection`. Este componente envuelve una `Card` y utiliza el `BlockHeader` centralizado para asegurar la consistencia visual en toda la aplicación.

**Props de `DashboardSection`:**
- `icon`: Un componente de ícono de `lucide-react`.
- `title`: El título principal de la sección.
- `description?`: Un subtítulo opcional para dar contexto.
- `children`: El contenido de la sección (normalmente, una parrilla de componentes).

### Flujo de Datos
El componente principal de la página (`app/(main)/dashboard/page.tsx`) es responsable de obtener los datos (actualmente de `mockDashboardData`) y distribuirlos a los componentes hijos que se encargan de su renderización.

## C. Desglose de Componentes (Implementación Actual)

El layout se organiza en una parrilla (grid) de dos columnas principales.

### Columna Izquierda (Principal)
Contiene las secciones de acción y rendimiento.

-   **`PageHeader.tsx`**: La cabecera de la página, que da la bienvenida al usuario y contiene la acción principal "Crear Nueva Campaña".

-   **Sección "Tu Rendimiento de un Vistazo"**:
    -   **Contenedor**: `DashboardSection` con el ícono `BarChart`.
    -   **Contenido**: Una parrilla (`grid`) que renderiza un `map` del array `data.performanceMetrics`, mostrando un componente `PerformanceCard.tsx` por cada métrica.

-   **Sección "¿Qué hacemos hoy?"**:
    -   **Contenedor**: `DashboardSection` con el ícono `Sparkles`.
    -   **Contenido**: Una parrilla que renderiza un `map` del array `data.recommendedActions`, mostrando un componente `ActionCard.tsx` por cada acción sugerida.

### Columna Derecha (Contextual)
Proporciona información de apoyo y alertas. *Nota: Esta columna es candidata para ser refactorizada y usar `DashboardSection`.*

-   **Componente `AiCoachFeed.tsx`**:
    -   **Propósito**: Muestra una lista de `insights` o consejos generados por la IA.
    -   **Estructura**: Renderiza una `Card` con su propio título y una lista de los `insights` recibidos.

-   **Componente `UpcomingPosts.tsx`**:
    -   **Propósito**: Muestra un adelanto de las publicaciones programadas.
    -   **Estructura**: Renderiza una `Card` con el título "En la Rampa de Lanzamiento" y una lista de los posts, incluyendo su imagen, contenido y fecha.

## D. Backlog de Arquitectura y Mejoras

-   **Refactorizar Columna Derecha**: Modificar `AiCoachFeed.tsx` y `UpcomingPosts.tsx` para que utilicen el componente `DashboardSection` y así completar la estandarización de la página.
-   **Conexión a Datos Reales**: Reemplazar la importación de `mockDashboardData` por una llamada a la API correspondiente para obtener datos dinámicos.
-   **Implementar Pruebas**: Añadir pruebas unitarias y de integración para los componentes del Dashboard para asegurar su estabilidad.