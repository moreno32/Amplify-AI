# Especificación y Arquitectura: Pantalla de "Perfil de Marca"

*Última actualización: Refactorización inicial para usar `BlockHeader` y componentes modulares.*

## A. Propósito Estratégico: "Tu Playbook de Marca, Vivo e Inteligente"

El objetivo de esta pantalla es que el usuario defina y visualice la **identidad fundamental de su marca**. No es un simple formulario, sino el "cerebro" donde se guardan los arquetipos, el tono de voz, los pilares de contenido y los activos visuales. Toda la IA de la aplicación beberá de esta fuente para generar contenido y estrategias alineadas.

## B. Arquitectura y Diseño Implementado: Pestañas y Componentes Modulares

La página de Perfil de Marca está estructurada en torno a un componente de Pestañas (`Tabs`) para organizar la gran cantidad de información. Cada pestaña carga un componente específico (`CoreTab`, `AudienceTab`, etc.) que es responsable de su propia sección.

### Componentes Clave Utilizados:
-   **`PageHeader.tsx`**: Proporciona el título principal "Tu Playbook Estratégico".
-   **`BlockHeader.tsx`**: **Este es un componente crítico y reutilizable**. Se utiliza dentro de cada sección para crear cabeceras de bloque consistentes, con un icono, un título y una descripción. Lo hemos movido a `components/shared/` para que pueda ser utilizado en todo el proyecto (como ya se ha hecho en el Dashboard).
-   **Componentes de Sección (Ej: `GoldenCircle.tsx`, `ArchetypeGrid.tsx`)**: Son componentes muy específicos de esta pantalla, que renderizan visualizaciones o cuadrículas de datos particulares del perfil de marca. Residen en `brand-profile/components/`.

### Flujo de Datos
El componente principal (`brand-profile/page.tsx`) obtiene todos los datos necesarios del mock `brandProfileData` y los pasa a los componentes de pestaña correspondientes. Por ejemplo, `<CoreTab data={brandProfile.core} />`.

## C. Desglose de Componentes por Pestaña

### 1. Pestaña "Core" (`CoreTab.tsx`)
-   **Estructura**: Contiene tres secciones principales, cada una con su `BlockHeader`.
-   **Componentes**:
    -   `GoldenCircle.tsx`: Visualiza el "Círculo Dorado" (Why, How, What).
    -   `ValuesCard.tsx`: Muestra los valores de la marca.
    -   `KairosVerdictCard.tsx`: Presenta el "Veredicto de Kairos", el arquetipo principal.

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

-   **(Prioridad Alta) Conectar a API**: Reemplazar `brandProfileData` con llamadas reales a una API para obtener y **guardar** la información del perfil de marca. Esto implicará añadir formularios y lógica de mutación de datos.
-   **(Prioridad Media) Refactorizar `BlockHeader` a `DashboardSection`**: Para una consistencia aún mayor, evaluar si las secciones que usan `BlockHeader` pueden ser envueltas en el componente `DashboardSection`, que ya encapsula una `<Card>` y el `BlockHeader`. Esto simplificaría el layout de cada pestaña.
-   **(Prioridad Baja) Añadir Funcionalidad de Edición "Inline"**: Explorar cómo el usuario podría editar los campos directamente en la vista sin tener que navegar a un formulario separado, mejorando la experiencia de usuario. 