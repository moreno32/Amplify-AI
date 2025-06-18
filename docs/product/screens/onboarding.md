# Especificación Detallada: Flujo de Onboarding de Amplify AI

## A. Concepto: "Creando el ADN de tu Marca con IA"

El onboarding no es un formulario, es un **diálogo guiado** entre el usuario y la IA. El objetivo es que el usuario sienta que está co-creando su "perfil de marca inteligente" (`BrandProfiler`) de una forma fácil y gratificante. Cada paso debe sentirse como un progreso tangible hacia la automatización de su marketing.

## B. Estructura General y Layout

-   **Estructura Principal:** Se adopta el layout de dos paneles de la inspiración (`Kustomer`).
    -   **Panel Izquierdo (Progreso y Contexto):** `width: 35%`. Contiene el indicador de progreso vertical (`Stepper`). Este panel es estático durante todo el flujo.
    -   **Panel Derecho (Acción):** `width: 65%`. Contiene el formulario o la acción específica del paso actual. Su contenido cambia en cada paso.
-   **Responsividad:** En pantallas menores a `768px`, el Panel Izquierdo se colapsa en una barra de progreso horizontal en la parte superior, y el Panel Derecho ocupa todo el espacio.

---

## C. Panel Izquierdo (Stepper de Progreso)

Este panel es la "hoja de ruta" visual del usuario.

### 1. Componentes
-   **Contenedor:** Fondo gris muy claro (`hsl(0 0% 98%)` o `#F9F9FA`).
-   **Stepper Vertical:** Una línea vertical conecta los iconos de cada paso.
    -   **Paso Completado:** El icono se muestra en color **Acento Índigo (`#6444F4`)** con un checkmark (✓). El texto es de color oscuro.
    -   **Paso Activo:** El icono y el texto del título están en color **Acento Índigo**. El icono está resaltado.
    -   **Paso Pendiente:** El icono y el texto están en color gris (`hsl(240 2% 46%)` o `#737378`).

### 2. Pasos del Stepper
1.  **`[Icono Cohete 🚀]` Bienvenida:** Empecemos a construir tu estrategia.
2.  **`[Icono Instagram]` Conexión:** Conecta tu cuenta principal.
3.  **`[Icono Pluma ✍️]` Voz de Marca:** Define tu tono y mensajes clave.
4.  **`[Icono Pincel 🎨]` Estilo Visual:** Sube tu logo y paleta de colores.
5.  **`[Icono Lupa 🔍]` Competencia:** Analicemos a tus competidores.
6.  **`[Icono Cerebro IA 🧠]` ¡Listo!** Tu perfil inteligente está completo.

---

## D. Panel Derecho (Formularios de Acción por Pasos)

### Paso 1: Bienvenida
-   **Título (H1):** "Vamos a crear el ADN de tu marca."
-   **Subtítulo (p):** "En 5 pasos rápidos, nuestra IA entenderá tu negocio a fondo para generar contenido que realmente conecte con tu audiencia."
-   **Botón CTA:** `[Empezar ahora →]` (Botón primario, color Acento).

### Paso 2: Conexión
-   **Título (H1):** "Conecta tu cuenta de Instagram."
-   **Subtítulo (p):** "Necesitamos acceso para analizar tu perfil, programar publicaciones y gestionar tus mensajes. Tu información está segura con nosotros."
-   **Componente de Conexión (inspirado en `EasyConnect`):**
    -   Una tarjeta (`Card`) grande y destacada:
        -   `[Icono Instagram]` **Instagram (Cuentas de Empresa)**
        -   `[Conectar con Meta]` (Botón primario, color Acento).
    -   Debajo, una sección opcional "Conectar otros canales" con `Facebook` y `TikTok`, pero con botones secundarios (variante `outline`). La prioridad es Instagram.
-   **Botones de Navegación:** `[Continuar →]` (se activa cuando la conexión es exitosa).

### Paso 3: Voz de Marca (inspirado en `Untitled UI`)
-   **Título (H1):** "¿Cómo suena tu marca?"
-   **Sección 1: Industria**
    -   **Label:** "¿A qué sector pertenece tu negocio?"
    -   **Componente:** Un grupo de botones de selección (`Toggle Group` de shadcn/ui).
    -   **Opciones:** `Emprendedor`, `Marca Personal`, `eCommerce`, `Negocio Local`, `Startup Tecnológica`, `Restaurante/Café`, `Salud y Bienestar`, `Agencia`, `Otro`.
-   **Sección 2: Tono de Voz**
    -   **Label:** "Elige hasta 3 adjetivos que describan tu tono:"
    -   **Componente:** Otro grupo de botones de selección.
    -   **Opciones:** `Profesional`, `Cercano`, `Divertido`, `Inspirador`, `Técnico`, `Relajado`, `Urgente`, `Educativo`.
-   **Sección 3 (Opcional): Mensajes Clave**
    -   **Label:** "Describe en una frase tu producto o servicio principal."
    -   **Componente:** Un `Textarea` con límite de caracteres.
-   **Botones de Navegación:** `[← Volver]` y `[Continuar →]`.

### Paso 4: Estilo Visual
-   **Título (H1):** "Define tu identidad visual."
-   **Sección 1: Logo**
    -   **Componente:** Una zona de `drag-and-drop` para subir el logo.
    -   **Texto:** "Arrastra tu logo aquí o haz clic para seleccionarlo (PNG, JPG, SVG)."
-   **Sección 2 (Avanzado/Opcional): Guía de Estilo**
    -   **Label:** "Para resultados perfectos, sube tu guía de estilo en Markdown."
    -   **Componente:** Un input de subida de archivo secundario. Esto es para el `power-user` o agencia.
-   **Botones de Navegación:** `[← Volver]` y `[Continuar →]`.

### Paso 5: Competencia
-   **Título (H1):** "¿Quiénes son tus referentes o competidores?"
-   **Subtítulo (p):** "Introduce los @usuarios de Instagram. Nuestra IA los analizará para darte una ventaja estratégica."
-   **Componente:** Un `Input` dinámico que convierte el texto en `tags` al presionar enter. El usuario puede añadir hasta 3 competidores.
-   **Botones de Navegación:** `[← Volver]` y `[Finalizar Configuración →]`.

### Paso 6: ¡Listo! (Pantalla de "Procesamiento Mágico")
-   **Layout:** El panel izquierdo desaparece. La pantalla se vuelve de ancho completo.
-   **Animación Central:** El logo de Amplify AI con una animación de pulso o de ondas.
-   **Título (H1):** "Estamos creando tu perfil inteligente..."
-   **Texto Dinámico:** Un texto que rota cada pocos segundos para reforzar el valor y hacer la espera amena:
    -   "Analizando tu tono de voz..."
    -   "Aprendiendo de tu identidad visual..."
    -   "Estudiando las estrategias de tu competencia..."
    -   "Preparando tu primer calendario de contenidos..."
-   **Finalización:** Al terminar, la pantalla redirige automáticamente al **Dashboard principal** con un `Toast` de bienvenida: "🎉 ¡Felicidades! Tu perfil de Amplify AI está listo."

---

## E. Prompt para Generador de UI (v0.dev)

> A multi-step onboarding flow for a SaaS product called Amplify AI. The layout has two panels.
>
> **Left Panel:** A static vertical stepper with icons, showing the 5 steps of the process: Welcome, Connection, Brand Voice, Visual Style, Competitors. The active step is highlighted in a vibrant indigo color (#6444F4).
>
> **Right Panel (Step 3 - "Brand Voice"):** A clean form on a light grey background (#F9F9FA). The H1 title is "What's your brand's voice?". Below, there are two sections with toggle-group buttons for selecting "Industry" (e.g., "eCommerce", "Startup") and "Tone of Voice" (e.g., "Professional", "Fun"). At the bottom, there are two navigation buttons: a secondary "Back" and a primary "Continue" button in indigo.
>
> **Overall aesthetic:** Minimalist, clean, and user-friendly, with generous whitespace. Inspired by Kustomer and Untitled UI's onboarding flows. Use Inter or Geist font.