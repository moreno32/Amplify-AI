# Especificación de Módulo: "Login y Autenticación"

*Última actualización: Refleja la implementación de la pantalla de login de dos paneles con showcase de producto animado y el flujo de registro/login alternable.*

## A. Propósito Estratégico: "Una Introducción a la Marca"

Más que una simple puerta de entrada, la pantalla de login es el primer punto de contacto del usuario con la marca Amplify AI. Sus objetivos son:

1.  **Seguridad y Acceso:** Proporcionar un mecanismo de autenticación seguro y sin fricción.
2.  **Comunicación de Valor:** Presentar la propuesta de valor fundamental de la aplicación de una manera visualmente atractiva y memorable desde el primer segundo.
3.  **Establecer un Tono Profesional:** Transmitir una sensación de alta calidad, diseño cuidado y profesionalismo que define la experiencia del producto.

## B. Arquitectura y Diseño Implementado

El sistema se divide en un layout específico, una página orquestadora y un componente visual especializado.

### 1. Layout de Autenticación (`app/(auth)/layout.tsx`)
Un layout minimalista que omite la `Sidebar` y el `Header`, creando un entorno enfocado exclusivamente en el proceso de autenticación.

### 2. Página de Login (`app/(auth)/login/page.tsx`)
La página es un `'use client'` que orquesta la composición y la lógica. Su estructura se divide en un layout de dos paneles:

-   **Panel Izquierdo (Panel de Acción):** Contiene el formulario funcional. Su diseño es limpio y directo.
    -   **Rol:** Facilitar la acción del usuario (iniciar sesión o registrarse).
    -   **Texto:** El copy es directo y contextual ("Bienvenido de vuelta", "Introduce tus credenciales...").
    -   **Componentes Clave:** `Card` para estructurar el formulario, `Input` con visibilidad de contraseña, `Button` de envío y botones para login social (Google/Apple), y un conmutador para alternar entre las vistas de login y registro.

-   **Panel Derecho (Panel de la Promesa):** Un showcase visual inmersivo.
    -   **Rol:** Comunicar la promesa y el valor de la marca de forma aspiracional.
    -   **Composición:** Un fondo de gradiente vibrante sobre el cual se presenta, en la parte superior, el titular de marketing ("Marketing inteligente. Crecimiento exponencial.") y, debajo, la animación.
    -   **Componente Principal:** `OrbitalShowcase`, que renderiza la animación 3D de las tarjetas de características.

### 3. Componente Visual Especializado (`components/auth/OrbitalShowcase.tsx`)
Para mantener la legibilidad, la complejidad de la animación 3D se ha extraído a su propio componente. Su única responsabilidad es gestionar la lógica de `framer-motion` para la coreografía orbital de las tarjetas de alta fidelidad ("Planifica", "Crea", "Analiza").

## C. Flujo de Usuario y Lógica de Negocio

El flujo actual es una **simulación** que maneja dos estados principales:

1.  **Acceso y Vista por Defecto:** El usuario llega a `/login`, que por defecto muestra la vista de "Iniciar Sesión".
2.  **Interacción con el Formulario:**
    -   El usuario introduce sus credenciales.
    -   El usuario puede alternar la vista entre **Login** y **Registro**. Esto cambia dinámicamente el titular de la `Card`, la descripción y el texto del botón principal.
3.  **Lógica de `handleAuthAction`:**
    -   **En vista de Login:** Comprueba si los campos no están vacíos. Si es así, muestra un toast de éxito (`sonner`) y redirige al `/dashboard`. Si no, muestra un toast de error.
    -   **En vista de Registro:** Realiza la misma comprobación. Si es exitosa, muestra un toast de éxito y cambia la vista a "Login", invitando al usuario a iniciar sesión. Si no, muestra un toast de error.
4.  **Cierre de Sesión:** Desde el menú de usuario en el `Header`, la opción "Cerrar Sesión" redirige de vuelta a `/login`.

## D. Backlog de Desarrollo y Mejoras

La interfaz de usuario está en un estado muy avanzado. El enfoque principal ahora es conectar la lógica de backend.

-   **(Prioridad Crítica) Implementar Autenticación Real:** Reemplazar la lógica simulada por una solución robusta (ej. NextAuth.js, Clerk). Esto incluye la gestión de sesiones con tokens, protección de rutas y hashing de contraseñas.
-   **(Prioridad Alta) Conectar Lógica de Backend:** Implementar la lógica de servidor para las siguientes características, cuya UI ya existe:
    -   Funcionalidad de **Registro de Usuario**.
    -   Funcionalidad de **Inicio de Sesión Social (OAuth)** con Google y Apple.
    -   Funcionalidad de **"Recuérdame"** para persistir la sesión.
-   **(Prioridad Media) Crear Flujo de "Olvidé mi Contraseña":** Diseñar e implementar las páginas y la lógica de backend para el restablecimiento de contraseñas.