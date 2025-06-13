# Especificación Detallada: Pantalla de Login / Registro de Amplify AI (Versión Final)

## A. Concepto y Principios de Diseño

Esta pantalla es la primera interacción del usuario con la marca Amplify AI. Debe comunicar **eficiencia, inteligencia y confianza** en un solo vistazo. Se basa en una estructura asimétrica de dos paneles:

-   **Panel Izquierdo (Acción):** Minimalista, funcional y en modo claro para una interacción sin fricción. Su objetivo es llevar al usuario a la acción lo más rápido posible.
-   **Panel Derecho (Promesa):** Inmersivo, aspiracional y visualmente rico. Su objetivo es reforzar la propuesta de valor y generar deseo, mostrando una composición artística de las features clave del producto.

## B. Estructura General y Layout

-   **Desktop (>1024px):** Layout de dos columnas fijas.
    -   **Panel Izquierdo:** `width: 50%`.
    -   **Panel Derecho:** `width: 50%`.
-   **Tablet/Móvil (<1024px):** Layout de una sola columna (apilado).
    -   El **Panel Derecho (Promesa)** se muestra primero.
    -   El **Panel Izquierdo (Acción)** se muestra debajo.

---

## C. Panel Izquierdo (Panel de Acción)

### 1. Paleta de Colores
-   **Fondo:** `hsl(0 0% 99%)` o `#FCFCFC` (Blanco Roto).
-   **Texto de Títulos:** `hsl(240 6% 10%)` o `#1A1A1C` (Casi Negro).
-   **Texto Secundario/Labels:** `hsl(240 2% 46%)` o `#737378` (Gris Neutro).
-   **Borde de Input (por defecto):** `hsl(240 5% 90%)` o `#E5E5E6`.
-   **Borde de Input (foco):** `hsl(256 90% 63%)` o `#6444F4` (Índigo Amplify).
-   **Color de Acento (Botón CTA, Links):** `hsl(256 90% 63%)` o `#6444F4`.

### 2. Tipografía (Familia: `Inter` o `Geist`)
-   **Título Principal (H1):** `font-size: 30px`, `font-weight: 700` (Bold).
-   **Subtítulo (p):** `font-size: 16px`, `font-weight: 400` (Regular).
-   **Labels/Links:** `font-size: 14px`, `font-weight: 500` (Medium).
-   **Texto de Botón:** `font-size: 15px`, `font-weight: 600` (Semibold).

### 3. Componentes (De arriba a abajo)

| Componente                | Especificación                                                                                                                                                             |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Logo**                  | SVG del logo de Amplify AI. `margin-bottom: 64px`.                                                                                                                         |
| **Titulares**             | **H1:** (ver sección `E. Estados`)<br>**p:** (ver sección `E. Estados`)                                                                                                     |
| **Formulario**            | **Campos:** (ver sección `E. Estados`).<br>**Inputs:** Componente `shadcn/ui Input`. Bordes redondeados (`rounded-md`), padding generoso (`py-2 px-3`).                        |
| **Opciones de Formulario**| **Ubicación:** Flexbox entre `checkbox` a la izquierda y `link` a la derecha.<br>**Checkbox:** `shadcn/ui Checkbox` + `Label`.<br>**Link:** `shadcn/ui Link` color Acento. |
| **Botón CTA Principal**   | Componente `shadcn/ui Button` (variante `default`).<br>**Estilo:** `width: 100%`, `height: 44px`, fondo color Acento, texto blanco.                                         |
| **Separador**             | Componente `shadcn/ui Separator` con texto en el medio: "O continúa con".                                                                                                  |
| **Botones Sociales**      | `shadcn/ui Button` (variante `outline`).<br>**Layout:** Dos botones en `flex`, `gap: 16px`.<br>**Contenido:** `[Icono Google/Meta]` + "Google" / "Meta".                        |
| **Enlace de Estado**      | Texto que permite cambiar entre Login y Registro. (ver sección `E. Estados`).                                                                                              |
| **Pie de Página**         | `flex` con `justify-between`. `font-size: 12px`, color `Texto Secundario`.<br>**Izquierda:** `© 2024 Amplify AI`<br>**Derecha:** `Política de Privacidad`.                       |

---

## D. Panel Derecho (Panel de la Promesa)

### 1. Paleta de Colores
-   **Fondo:** Gradiente lineal de 45 grados. `from: hsl(256, 90%, 63%)` (`#6444F4`) `to: hsl(250, 80%, 55%)` (`#4B38D8`).
-   **Texto:** `hsl(0 0% 100%)` (Blanco puro).

### 2. Contenido Visual y Narrativo

| Componente           | Especificación                                                                                                                                                                                                                                                        | Propósito                                                   |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Título de Valor**  | **Texto:** "Contenido que vende,<br>estrategia que enseña."<br>**Estilo:** `font-size: 48px`, `font-weight: 700` (Bold), `line-height: 1.1`.                                                                                                                                 | Capturar la promesa central de Amplify AI.                  |
| **Subtítulo de Valor** | **Texto:** "Tu copiloto de IA para dominar Instagram y centralizar tu comunicación."<br>**Estilo:** `font-size: 18px`, opacidad 80%.                                                                                                                                     | Expandir la propuesta de valor y mencionar el Social Inbox. |
| **Mockup Artístico** | **Concepto:** Composición de tarjetas de UI flotando en un espacio 3D con efecto parallax sutil al mover el ratón.<br>**Tarjeta 1 (Frontal - `PostGenerator`):** Muestra un post generado (imagen + copy).<br>**Tarjeta 2 (Detrás - `StrategyCoach`):** Una "píldora" con `💡 Insight: +25% engagement vs. competencia`.<br>**Tarjeta 3 (Lateral - `Social Inbox`):** Vista previa de un chat con respuesta sugerida por IA. | **Mostrar, no contar.** Visualizar las ventajas competitivas. |

---

## E. Estados y Flujos de Usuario (Login vs. Registro)

El usuario cambia de estado haciendo clic en el **Enlace de Estado** en la parte inferior del Panel Izquierdo.

| Elemento                 | Estado: **LOGIN**                                       | Estado: **REGISTRO**                                                   |
| ------------------------ | ------------------------------------------------------- | ---------------------------------------------------------------------- |
| **Título (H1)**          | "Tu copiloto de IA te espera"                           | "Crea tu cuenta inteligente"                                           |
| **Subtítulo (p)**        | "Accede para planificar, crear y analizar tus campañas." | "Empieza a automatizar tu contenido en menos de 5 minutos."            |
| **Campos de Formulario** | `Email`, `Contraseña`                                   | `Email`, `Contraseña`, `Confirmar Contraseña`                          |
| **Opciones**             | `[x] Recuérdame` y `¿Has olvidado la contraseña?`        | `[x] Acepto los [Términos y Condiciones]`                              |
| **Botón CTA**            | "Entrar"                                                | "Crear Cuenta Gratis"                                                  |
| **Enlace de Estado**     | "¿No tienes cuenta? **Regístrate aquí**"                | "¿Ya tienes una cuenta? **Inicia sesión**"                             |

## F. Especificaciones Técnicas Resumidas

-   **Framework:** React (Next.js) o similar.
-   **UI/Componentes:** `shadcn/ui` (Button, Input, Label, Separator, Checkbox).
-   **Estilos:** `Tailwind CSS`.
-   **Animaciones:** `Framer Motion` para el efecto parallax del panel derecho y transiciones suaves.
-   **Gestión de Formularios:** `React Hook Form` + `Zod` para validación.
-   **Autenticación:** `Supabase Auth` o `Clerk` para gestionar el flujo de OAuth y email/password.

## G. Prompt para Generador de UI (v0.dev)

> A responsive, two-panel SaaS login screen.
>
> **Left Panel (50% width, light mode, #FCFCFC background):**
> Clean and centered content. At the top, a logo. Below it, a bold H1 title "Tu copiloto de IA te espera" and a smaller paragraph "Accede para planificar, crear y analizar tus campañas.". Below that, a form with fields for Email and Password using shadcn/ui Input components. A primary CTA button with a solid indigo background (#6444F4) and white text reading "Entrar". Below the CTA, a separator with text "O continúa con", followed by two outlined buttons for Google and Meta social logins. At the bottom, a link to the register page. The typography is Inter font.
>
> **Right Panel (50% width, dark mode):**
> A vibrant indigo gradient background (from #6444F4 to #4B38D8). A large, bold, white H2 title "Contenido que vende, estrategia que enseña.". Below the title, a floating, artistic composition of UI cards from the app, with soft shadows and a subtle parallax effect. One card shows a generated Instagram post, another shows an analytics insight with an icon.
>
> **Overall aesthetic:** Minimalist, professional, and tech-forward, inspired by modern SaaS design systems.