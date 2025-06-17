# Especificación de Módulo: "Ajustes"

*Última actualización: Borrador inicial basado en la estructura de pestañas existente.*

## A. Propósito Estratégico: "El Centro de Control de la Marca"

La sección de "Ajustes" es el centro de control donde los usuarios pueden configurar los aspectos fundamentales y persistentes de su marca y cuenta. Su propósito es:

1.  **Centralización:** Ofrecer un único lugar para que el usuario gestione toda la configuración de su cuenta, perfil y marca.
2.  **Configuración de IA:** Permitir al usuario definir los elementos centrales de su marca (`Core`) y su personalidad (`Voz`) para que los modelos de IA de la plataforma puedan generar contenido y estrategias alineadas.
3.  **Gestión de Cuenta:** Proporcionar acceso a la configuración de perfil, facturación y otros aspectos administrativos.

## B. Arquitectura y Diseño Actual

La página de Ajustes se encuentra en `app/(main)/settings/page.tsx`. Actualmente, es un componente de servidor que renderiza un componente de cliente, `SettingsClientPage`, que contiene la lógica de la interfaz.

La estructura se basa en el componente `<Tabs>` de `shadcn/ui` para organizar las diferentes áreas de configuración de manera clara y accesible.

### Componentes Clave:
-   **`SettingsClientPage.tsx`**: El componente principal que gestiona el estado y la presentación de las pestañas.
-   **`CoreTab.tsx`**: La pestaña dedicada a la configuración de los elementos centrales de la marca (aún por desarrollar).
-   **`VoiceTab.tsx`**: La pestaña para definir la voz y el tono de la marca (aún por desarrollar).

## C. Desglose de Funcionalidades (Visión a Futuro)

### 1. Pestaña "Core" (Núcleo)
-   **Objetivo:** Definir la misión, visión, valores y propósito de la marca.
-   **Componentes:** Formularios para que el usuario ingrese y guarde esta información estratégica.

### 2. Pestaña "Voice" (Voz)
-   **Objetivo:** Establecer el arquetipo de la marca, el tono de voz y otros atributos de personalidad.
-   **Componentes:** Selectores de arquetipos, campos para describir el tono y ejemplos de comunicación.

### 3. Pestaña "Integrations" (Integraciones)
-   **Objetivo:** Conectar las cuentas de redes sociales del usuario (Facebook, Instagram, LinkedIn, etc.).
-   **Componentes:** Botones de "Conectar" que iniciarán flujos de OAuth para cada plataforma.

### 4. Pestaña "Account" (Cuenta)
-   **Objetivo:** Gestionar la información del perfil del usuario (nombre, email, contraseña).
-   **Componentes:** Formularios de edición de perfil.

### 5. Pestaña "Billing" (Facturación)
-   **Objetivo:** Ver el plan actual, el historial de facturas y gestionar los métodos de pago.
-   **Componentes:** Integración con un proveedor de pagos como Stripe.

## D. Backlog de Desarrollo

-   **(Prioridad Alta) Desarrollar `CoreTab.tsx`:** Implementar el formulario para guardar los datos del núcleo de la marca.
-   **(Prioridad Alta) Desarrollar `VoiceTab.tsx`:** Implementar los controles para definir la voz de la marca.
-   **(Prioridad Media) Crear Pestaña de Integraciones:** Añadir la sección para conectar redes sociales.
-   **(Prioridad Baja) Crear Pestaña de Cuenta y Facturación:** Implementar la gestión de perfil y pagos. 