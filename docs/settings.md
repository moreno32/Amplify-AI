# Pantalla: Ajustes (`/settings`)

## Visión General

La pantalla de "Ajustes" es el centro de control donde el usuario puede gestionar su perfil, personalizar la identidad de su Agente de IA y administrar su suscripción y facturación. La página está organizada en tres pestañas principales para una navegación clara e intuitiva, con una interfaz pulida que utiliza animaciones para una experiencia de usuario fluida.

## Estructura y Componentes Clave

-   **`PageHeader`**: Da la bienvenida con el título "Ajustes", estableciendo el contexto.
-   **Sistema de Pestañas (`Tabs`)**: Organiza el contenido en tres secciones funcionales:
    1.  **Mi Cuenta**: Gestiona la información personal del usuario y los detalles de su empresa.
    2.  **Agente IA**: Configura la personalidad, el contexto y el tono del asistente de inteligencia artificial.
    3.  **Facturación**: Administra el plan de suscripción, los métodos de pago y el historial de facturas.
-   **`DashboardSection`**: Encapsula cada bloque de contenido (ej. "Usuario", "Empresa") en tarjetas visualmente distintas.
-   **`BlockHeader`**: Proporciona un título y un icono para cada `DashboardSection`, mejorando la jerarquía visual.
-   **Interacción y Feedback**:
    -   **`SettingsSaveFooter`**: Un pie de página flotante aparece en "Mi Cuenta" y "Agente IA" cuando hay cambios sin guardar, permitiendo guardar o descartar las modificaciones.
    -   **Notificaciones (`sonner`)**: Se utilizan notificaciones `toast` para confirmar acciones como guardar cambios, actualizar contraseñas o eliminar métodos de pago.
    -   **Diálogos de Confirmación (`AlertDialog`, `Dialog`)**: Se usan para acciones críticas como eliminar una cuenta o para mostrar modales como "Añadir nuevo método de pago".
    -   **Animaciones (`framer-motion`)**: Las transiciones animadas se utilizan para cargar el contenido de forma elegante, mejorando la experiencia de usuario.

---

## Detalle de las Pestañas

### 1. Mi Cuenta

Esta pestaña se divide en dos tarjetas principales: "Usuario" y "Empresa".

-   **Usuario**:
    -   **Campos**: `Nombre`, `Apellido`, `Posición o Rol`, `Fecha de Nacimiento` (con un selector de calendario), `Sexo`, `Idioma`, `Zona Horaria`, `País` y una `Descripción Breve` con contador de caracteres.
    -   Todos los campos son editables y su modificación activa el `SettingsSaveFooter`.
-   **Empresa**:
    -   **Campos**: `Nombre de la Empresa`, `Sector` (con un desplegable que actualiza dinámicamente el `Subsector`), `Subsector`, `Página Web` y una `Descripción de la Empresa` con contador de caracteres.
-   **Seguridad y Zona de Peligro** (en una sección separada):
    -   Permite al usuario cambiar su contraseña a través de un formulario dedicado.
    -   Incluye una "Zona de Peligro" para **Eliminar la Cuenta**, protegida por un diálogo de confirmación que requiere que el usuario escriba una frase de confirmación.

### 2. Agente IA

Anteriormente "Perfil de Marca IA", esta pestaña está rediseñada para configurar la personalidad del asistente de IA en una cuadrícula de 2x2. Aquí se definen los rasgos clave que la IA usará para generar contenido.

> Para una visualización estratégica completa de la identidad de tu marca, incluyendo el Círculo Dorado y los pilares de contenido, consulta el **[Playbook de Marca](/docs/brand-profile.md)**.

-   **Nombre del Agente**: Un campo de texto para darle una identidad al bot (ej. "AmplifyBot").
-   **Contexto Empresarial**: Un área de texto para proporcionar a la IA información clave sobre el negocio, el público y los objetivos.
-   **Personalidad del Agente**:
    -   Una interfaz interactiva para definir **Arquetipos**.
    -   El usuario puede seleccionar arquetipos de una lista de recomendaciones (`Badge`) o añadir los suyos propios en un campo de entrada. Los arquetipos seleccionados se muestran como etiquetas que se pueden eliminar.
-   **Tono de Comunicación**:
    -   Funciona de manera idéntica a la "Personalidad del Agente".
    -   Permite al usuario seleccionar **Tonos** recomendados (ej. "Profesional", "Entusiasta") o añadir tonos personalizados para guiar el estilo de escritura de la IA.

### 3. Facturación

Esta pestaña ha sido completamente rediseñada para ofrecer una gestión clara y completa de la suscripción.

-   **Tu Plan Actual**:
    -   Muestra una comparativa de dos tarjetas:
        1.  **Plan Actual ("Pro")**: Resaltado visualmente, con sus características y detalles de precio/renovación.
        2.  **Plan de Mejora ("Business")**: Muestra las ventajas del siguiente nivel y un botón claro de "Mejorar a Business".
-   **Métodos de Pago**:
    -   Lista las tarjetas guardadas, mostrando el logo de la marca (Visa/Mastercard), los últimos 4 dígitos y la fecha de expiración.
    -   Una de las tarjetas está marcada como "Predeterminado".
    -   Cada tarjeta tiene un menú de acciones (`...`) que permite: `Hacer predeterminado`, `Actualizar` y `Eliminar` (con diálogo de confirmación).
    -   Un botón para **"Añadir nuevo método"** abre un modal de demostración.
-   **Historial de Facturas**:
    -   Presenta una tabla con las facturas anteriores, mostrando `Nº Factura`, `Fecha`, `Importe` y `Estado`.
    -   El **Estado** se resalta con `Badges` de colores según sea `Pagado` (verde), `Pendiente` (ámbar) o `Fallido` (rojo).
    -   La tabla incluye **paginación funcional** para navegar por el historial.
    -   Cada factura tiene un botón para iniciar su descarga. 