# Especificación y Arquitectura: Pantalla de "Perfil de Marca"

*Última actualización: Se alinea la documentación con la refactorización que mueve la configuración de la IA a la sección de Ajustes (`/settings`).*

> **Nota Arquitectónica Importante:** Las funcionalidades para **editar y configurar** la personalidad del Agente de IA (arquetipos, tono, etc.) han sido trasladadas a la pestaña **"Agente IA"** dentro de la página de **Ajustes (`/settings`)**. Esto centraliza toda la configuración del usuario en un único lugar. Esta sección (`/brand-profile`) evoluciona para convertirse en el **Playbook de Marca**: un dashboard estratégico y visual para consultar la identidad de la marca de un vistazo.

## A. Propósito Estratégico: "Tu Playbook de Marca, Vivo e Inteligente"

El objetivo de esta pantalla es que el usuario defina y **visualice** la identidad fundamental de su marca. No es un simple formulario, sino el "cerebro" donde se guardan los arquetipos, el tono de voz, los pilares de contenido y los activos visuales. Toda la IA de la aplicación beberá de esta fuente para generar contenido y estrategias alineadas. La edición de estos elementos se gestiona en `/settings`.

## B. Arquitectura y Diseño Implementado: Pestañas y Componentes Modulares

La página de Perfil de Marca está estructurada en torno a un componente de Pestañas (`Tabs`) para organizar la gran cantidad de información. Cada pestaña carga un componente específico (`CoreTab`, `AudienceTab`, etc.) que es responsable de su propia sección.

### Componentes Clave Utilizados:
-   **`PageHeader.tsx`**: Proporciona el título principal "Tu Playbook Estratégico".
-   **`BlockHeader.tsx`**: **Este es un componente crítico y reutilizable**. Se utiliza dentro de cada sección para crear cabeceras de bloque consistentes, con un icono, un título y una descripción. Lo hemos movido a `components/shared/` para que pueda ser utilizado en todo el proyecto.
-   **Componentes de Sección (Ej: `GoldenCircle.tsx`, `ArchetypeGrid.tsx`)**: Son componentes muy específicos de esta pantalla, que renderizan visualizaciones o cuadrículas de datos particulares del perfil de marca. Residen en `brand-profile/components/`.

### Flujo de Datos
El componente principal (`brand-profile/page.tsx`) obtiene todos los datos necesarios del servicio `brandProfileService` y los pasa a los componentes de pestaña correspondientes. Por ejemplo, `<CoreTab data={brandProfile.core} />`.

## C. Desglose de Componentes por Pestaña

### 1. Pestaña "Core" (`CoreTab.tsx`)
-   **Estructura**: Contiene tres secciones principales, cada una con su `BlockHeader`.
-   **Componentes**:
    -   `GoldenCircle.tsx`: Visualiza el "Círculo Dorado" (Why, How, What).
    -   `ValuesCard.tsx`: Muestra los valores de la marca.
    -   `KairosVerdictCard.tsx`: Presenta el "Veredicto de Kairos", el arquetipo principal. La selección de este arquetipo se realiza en `Ajustes > Agente IA`.

### 2. Pestaña "Audiencia" (`AudienceTab.tsx`)
-   **Estructura**: Similar a la pestaña Core, usa `BlockHeader` para sus secciones.
-   **Componentes**:
    -   `CustomerProfileCard.tsx`: Muestra el perfil del cliente ideal.
    -   `ArchetypeGrid.tsx`: Una cuadrícula que muestra los arquetipos de la audiencia.

### 3. Pestaña "Activos" (`AssetsTab.tsx`)
-   **Estructura**: Gestiona los activos visuales y de texto de la marca.
-   **Componentes**:
    -   `ColorPalette.tsx`: Muestra la paleta de colores.
    -   `FontShowcase.tsx`: Muestra las tipografías.
    -   `LogoManager.tsx`: Permite al usuario subir y gestionar sus logos.

## D. Backlog de Arquitectura y Mejoras

-   **(Prioridad Alta) Consolidar `brandProfileService`**: Asegurar que tanto el Playbook (`/brand-profile`) como la configuración (`/settings`) consuman y muten datos del mismo servicio (`brandProfileService.ts`) para garantizar la consistencia de los datos en toda la aplicación.
-   **(Completado) Refactorizar `BlockHeader` a `DashboardSection`**: Esta refactorización se ha implementado con éxito en la nueva sección de `Ajustes`, que ahora utiliza `DashboardSection` para encapsular el contenido de manera consistente.
-   **(Prioridad Baja) Añadir Funcionalidad de Edición "Inline"**: Explorar cómo el usuario podría editar los campos directamente en la vista sin tener que navegar a un formulario separado, mejorando la experiencia de usuario.

## E. Flujo de Datos y Arquitectura

-   **Carga de Datos:** La página principal (`page.tsx`) es un **Componente de Servidor** que llama al servicio `getBrandProfile()` para obtener todo el perfil de la marca.
-   **Renderizado Interactivo:** Los datos se pasan al **Componente de Cliente** `BrandProfileClientContent.tsx`, que gestiona las pestañas y renderiza el contenido correspondiente, pasando los datos específicos a cada `*Tab`.
-   **Integración y Configuración:** La edición de la personalidad de la marca se gestiona en **Ajustes > Agente IA**. Para más detalles, consulte la documentación `settings.md`. 