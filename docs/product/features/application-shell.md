# Especificación y Arquitectura: "Application Shell"

*Última actualización: Implementación del flujo de autenticación y diálogo de confirmación de cierre de sesión.*

## A. Propósito Estratégico: "El Marco Estable y Predecible"

El "Application Shell" es la estructura persistente que envuelve toda la experiencia del usuario después de iniciar sesión. Su propósito es el siguiente:

1.  **Orientación Constante:** Proporcionar una navegación global (`Sidebar`) que sea siempre visible y predecible.
2.  **Acceso Inmediato:** Ofrecer un conjunto de herramientas y acciones globales (`Header`) que el usuario necesita en cualquier punto de su flujo de trabajo (búsqueda, creación, notificaciones, perfil).
3.  **Contexto y Seguridad:** Servir como el contenedor seguro para el usuario autenticado, proveyendo un punto de salida (`logout`) claro desde el `Header`, mientras que la entrada (`login`) se gestiona en su propio layout dedicado.
4.  **Consistencia Visual:** Crear un marco coherente y profesional que le da a la aplicación una sensación de estabilidad y calidad, sin importar en qué página se encuentre el usuario.

## B. Arquitectura y Diseño Implementado: Layouts Anidados y Componentes de Cliente

El Shell se estructura a través de layouts anidados de Next.js para separar las vistas públicas de las privadas:

1.  **`app/(auth)/layout.tsx`**: Un layout minimalista para las páginas de autenticación (ej. `login`), sin `Sidebar` ni `Header`.
2.  **`app/(main)/layout.tsx`**: El layout principal que envuelve a todas las páginas de la aplicación tras iniciar sesión. Renderiza la `Sidebar` a la izquierda y el `Header` en la parte superior del contenido.

La mayoría de los componentes del Shell son **Componentes de Cliente** (`'use client'`) debido a su alta interactividad (manejo de estado, efectos para atajos de teclado, y el uso de hooks como `usePathname` y `useRouter`).

### Componentes Clave Utilizados:
-   **`Sidebar.tsx`**: La barra de navegación principal, enfocada exclusivamente en la navegación entre secciones.
-   **`Header.tsx`**: La barra de herramientas superior, que funciona como un centro de control de acciones globales y punto de gestión de la sesión de usuario.
-   **`CommandPalette.tsx`**: Un modal global invocado desde el Header para búsqueda y ejecución rápida de comandos.
-   **`NotificationSheet.tsx`**: Un panel lateral que se desliza para mostrar las notificaciones del usuario.

## C. Desglose de Componentes

### 1. `Sidebar.tsx`
-   **Estructura**: Un layout vertical simple y fijo.
-   **Contenido**:
    -   **Logo:** Enlace principal a la página de inicio (`/`).
    -   **Navegación Principal:** Una lista de enlaces (`<NavLink>`) que usan `usePathname` para resaltar el ítem activo (`bg-primary`, `text-primary-foreground`).
    -   **Bloque de Upgrade:** Una `Card` colapsable en la parte inferior para incentivar la actualización del plan, cuyo estado se gestiona con `useState`.

### 2. `Header.tsx`
-   **Estructura**: Un layout `flex` de dos columnas (`justify-between`) para una separación clara entre búsqueda y acciones.
-   **Contenido**:
    -   **Zona Izquierda (Búsqueda):** Contiene el botón que activa la `CommandPalette`. Está diseñado para ser un punto de anclaje visual a la izquierda, ocupando un tercio del ancho en pantallas de escritorio.
    -   **Zona Derecha (Acciones):** Un grupo de controles globales:
        -   `NotificationSheet`: El icono de la campana que, al hacer clic, abre un `Sheet` desde la derecha. Muestra un `Badge` con un contador numérico.
        -   `[+ Crear Nueva Campaña]`: Un botón que abre el modal `CreateCampaignModal`.
        -   **Menú de Usuario:** Un `DropdownMenu` que se activa desde el `Avatar` del usuario. Contiene enlaces a "Ajustes" y la acción "Cerrar Sesión".
        -   **Diálogo de Cierre de Sesión:** La opción "Cerrar Sesión" no es una acción directa, sino que activa un `AlertDialog` para que el usuario confirme su intención, previniendo cierres de sesión accidentales.

## D. Flujo de Datos y Arquitectura

-   **Renderizado de Layouts Anidados:** Next.js renderiza el `(auth)/layout.tsx` para rutas como `/login` y el `(main)/layout.tsx` para las rutas protegidas.
-   **Gestión de Estado (Cliente):** Todo el estado interactivo (apertura de modales, paleta de comandos, estado de la `Card` de upgrade, etc.) se gestiona localmente en cada componente mediante `useState`. El atajo de teclado `⌘K` se registra con `useEffect`.
-   **Navegación y Autenticación:** El hook `useRouter` de `next/navigation` se utiliza para redirigir al usuario.
    -   Al "Cerrar Sesión", el `Header` usa `router.push('/login')` para navegar a la página de login.
    -   En la página de `login`, una lógica de formulario simulada redirige al `/dashboard` en caso de éxito.
-   **Paso de Datos (Props):** Componentes como `NotificationSheet` reciben datos (ej. `newNotificationsCount`) como `props`. En una aplicación real, estos datos vendrían de un proveedor de contexto global o de un hook que realice fetching de datos del lado del cliente.
-   **Notificaciones al Usuario:** Se utiliza la librería `sonner` para mostrar notificaciones flotantes (toasts) que informan al usuario sobre el resultado de acciones, como un inicio de sesión fallido.

## E. Backlog de Arquitectura y Mejoras

-   **(Prioridad Alta) Implementar Autenticación Real:** Reemplazar la lógica de login simulada por una integración real con un proveedor de autenticación (ej. NextAuth.js, Clerk, Supabase Auth).
-   **(Prioridad Alta) Conectar Notificaciones a un Servicio Real:** Implementar la lógica dentro de `NotificationSheet` para que obtenga notificaciones reales de la API, potencialmente usando SWR o React Query para fetching y revalidación.
-   **(Prioridad Media) Lógica de "Crear Campaña":** Implementar el formulario y la lógica de mutación de datos dentro del modal `CreateCampaignModal`.
-   **(Prioridad Baja) Persistir Estado del Usuario:** Guardar el estado de la `Card` de "Upgrade" (colapsada/expandida) en `localStorage` para que la preferencia del usuario se mantenga entre sesiones.
-   **(Prioridad Baja) Expandir Paleta de Comandos:** Añadir más acciones y destinos a la `CommandPalette`, como "Invitar a un miembro del equipo", "Ver facturación" o "Cambiar de tema (claro/oscuro)". 