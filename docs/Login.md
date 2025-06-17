# Especificación de Módulo: "Login y Autenticación"

*Última actualización: Refleja la implementación del flujo de autenticación simple y la página de login funcional.*

## A. Propósito Estratégico: "La Puerta de Entrada a la Aplicación"

El flujo de autenticación es el mecanismo de seguridad y personalización que protege la aplicación y da la bienvenida al usuario. Sus objetivos principales son:

1.  **Seguridad:** Asegurar que solo usuarios autorizados puedan acceder a los datos y funcionalidades de la plataforma.
2.  **Identificación:** Reconocer al usuario para cargar su espacio de trabajo, datos y configuraciones específicas.
3.  **Experiencia sin Fricción:** Proporcionar un proceso de inicio de sesión rápido, claro e intuitivo.

## B. Arquitectura y Diseño Implementado

El sistema de autenticación se divide en dos partes principales: la interfaz de usuario (la página de login) y la lógica de navegación (layouts y enrutamiento).

### 1. Layout de Autenticación
Se ha creado un layout específico en `app/(auth)/layout.tsx`. Este layout es minimalista y no incluye los componentes `Sidebar` ni `Header`, proporcionando un entorno limpio y enfocado exclusivamente en el proceso de autenticación.

### 2. Página de Login (`app/(auth)/login/page.tsx`)
-   **Componente de Cliente:** La página es un `'use client'` para poder manejar el estado del formulario y la interacción del usuario (clics, introducción de texto).
-   **Estructura:** Un diseño de una sola columna, centrado vertical y horizontalmente en la página.
-   **Componentes Clave (`shadcn/ui`):**
    -   `Card`: Envuelve el formulario para darle una estructura visual clara.
    -   `CardHeader`, `CardTitle`, `CardDescription`: Presentan el propósito del formulario.
    -   `CardContent`: Contiene los campos del formulario.
    -   `Label` e `Input`: Para los campos de "Email" y "Contraseña".
    -   `Button`: El botón de "Iniciar Sesión" que dispara la lógica de autenticación.
    -   `Toaster`: Utiliza la librería `sonner` para mostrar notificaciones (toasts) sobre el éxito o fracaso del inicio de sesión.

## C. Flujo de Usuario y Lógica de Negocio

El flujo de autenticación actual es una **simulación** diseñada para replicar el comportamiento de un sistema real.

1.  **Acceso a la Página:** El usuario navega (o es redirigido) a `/login`.
2.  **Rellenar Credenciales:** El usuario introduce un email y una contraseña.
3.  **Intento de Login:** Al hacer clic en "Iniciar Sesión", se ejecuta la función `handleLogin`.
4.  **Validación Simulada:**
    -   La función comprueba si los campos de email y contraseña no están vacíos.
    -   **Éxito:** Si ambos campos tienen contenido, se muestra una notificación de éxito con `toast.success()`, y el usuario es redirigido al `/dashboard` usando `router.push()`.
    -   **Fallo:** Si alguno de los campos está vacío, se muestra una notificación de error con `toast.error()` y el usuario permanece en la página de login para corregir los datos.
5.  **Cierre de Sesión:** Desde el `Header` en cualquier parte de la aplicación, la opción "Cerrar Sesión" redirige al usuario de vuelta a `/login` y finaliza su sesión "simulada".

## D. Backlog de Desarrollo y Mejoras

-   **(Prioridad Crítica) Implementar Autenticación Real:** Este es el siguiente paso más importante. Se debe reemplazar la lógica simulada por una solución robusta como `NextAuth.js`, `Clerk`, `Supabase Auth` o similar. Esto implicará:
    -   Gestionar sesiones de usuario reales con tokens (ej. JWT).
    -   Proteger rutas del lado del servidor y del cliente.
    -   Implementar el hash seguro de contraseñas.
-   **(Prioridad Media) Añadir Opción de "Recordarme":** Implementar la funcionalidad para mantener la sesión del usuario activa entre visitas.
-   **(Prioridad Media) Añadir Flujo de "Olvidé mi Contraseña":** Crear la página y la lógica para que los usuarios puedan restablecer su contraseña.
-   **(Prioridad Baja) Añadir Inicio de Sesión Social (OAuth):** Permitir a los usuarios iniciar sesión con cuentas de Google, Meta, etc., para un registro más rápido.
-   **(Prioridad Baja) Implementar Página de Registro:** Crear una página y formulario para que nuevos usuarios puedan crear una cuenta.