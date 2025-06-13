# Contexto del Proyecto para Asistente de IA

## 1. Resumen General del Proyecto

-   **Nombre Original:** Amplify AI
-   **Concepto Original:** Una aplicación SaaS para la gestión de marketing en redes sociales, específicamente para Instagram.
-   **Identidad Actual:** **O2CW Boutique Gym**
-   **Concepto Actual:** La aplicación ha sido completamente refactorizada para servir como el panel de gestión de contenido para un gimnasio boutique ficticio.
-   **Tecnología Principal:** Next.js (App Router), TypeScript, Tailwind CSS, Shadcn/ui.
-   **Estado Actual:** Experiencia Mínima Viable (MVE) funcional, operando con datos simulados (`mock data`).

---

## 2. Estado Actual y Funcionalidades Clave (Última Versión)

La aplicación es un panel de control de contenido funcional y estable.

### Funcionalidades Implementadas:

-   **Vista de Calendario:**
    -   Organizada en bloques de **"Mañana", "Tarde" y "Noche"**.
    -   Muestra el día de la semana y la fecha numérica (ej. "Lunes, 9 jun").
    -   Incluye una funcionalidad de **"Horas Óptimas" (Heatmap)** que superpone un color sutil para indicar los mejores momentos para publicar. El efecto es intencionadamente suave para no afectar la legibilidad.
    -   El diseño es responsivo y se expande para ocupar el ancho de la pantalla.
-   **Gestión de Posts:**
    -   Las tarjetas de los posts en el calendario muestran su estado ("published", "draft", "idea", "scheduled") con un borde y una etiqueta de color distintivo.
-   **Modal de Edición de Posts:**
    -   Se activa al hacer clic en un post.
    -   Presenta un diseño espacioso de dos columnas (1/3 para la vista previa, 2/3 para el editor).
    -   Muestra una vista previa realista del post, alineada con la marca "O2CW Boutique Gym".
    -   Permite editar el texto y ver la imagen asociada.
    -   Muestra la fecha y hora de programación correctamente.
-   **Branding:**
    -   Toda la aplicación (textos, hashtags, avatares, imágenes de ejemplo) ha sido adaptada a la identidad de **O2CW Boutique Gym**.

---

## 3. Historial de Desarrollo y Decisiones Clave

1.  **Análisis Inicial y Limpieza:** El proyecto se recibió en un estado avanzado, pero el directorio raíz contenía archivos de configuración redundantes. Estos fueron movidos a la carpeta `_backup_root/` para limpiar el entorno.
2.  **Depuración Inicial:**
    -   Se solucionaron errores de ejecución (`EADDRINUSE`, comandos no compatibles con PowerShell).
    -   Se estabilizó el proveedor de imágenes, cambiando de `images.unsplash.com` (inestable, daba errores 503) a `picsum.photos` y actualizando `next.config.ts` para autorizar el nuevo dominio.
3.  **Pivote de Marca (Refactorización Mayor):**
    -   La decisión más significativa fue cambiar la identidad de "Amplify AI" a "O2CW Boutique Gym", guiada por el archivo `brand_guide.md`.
    -   Esto implicó una reescritura completa de todos los archivos de datos simulados en `amplify-ai-frontend/lib/mock-data/` para alinear el contenido con la nueva marca.
4.  **Evolución de la Vista del Calendario:**
    -   **V1:** Bloques simples de "Mañana" y "Tarde".
    -   **V2:** Una vista por horas (8:00 a 18:00) con tarjetas compactas para múltiples posts. Descartada por ser demasiado extensa.
    -   **V3 (Actual):** Bloques de "Mañana", "Tarde" y "Noche", con fechas y un diseño más limpio y espacioso.
5.  **Depuración del Modal de Edición:**
    -   Se corrigió un error crítico `Invalid Date` causado por un formato de fecha incorrecto (`DD/MM`) en los datos simulados. Se estandarizó a `YYYY-MM-DD`.
    -   Se rediseñó por completo el layout del modal para solucionar problemas de contenido apretado, mejorando la legibilidad y la experiencia de usuario.
6.  **Refinamiento de UI/UX:** Se han realizado múltiples ajustes iterativos basados en el feedback del usuario para mejorar la separación de elementos, el uso de mayúsculas, la consistencia de iconos y la sutileza de los efectos visuales como el "heatmap".

---

## 4. Archivos y Rutas Relevantes

-   **Código Fuente Principal:** `amplify-ai-frontend/`
-   **Página del Calendario:** `amplify-ai-frontend/app/(main)/calendar/page.tsx`
-   **Componente del Modal de Edición:** `amplify-ai-frontend/components/modals/PostEditorModal.tsx`
-   **Componente de Tarjeta de Post:** `amplify-ai-frontend/app/(main)/calendar/components/PostCard.tsx`
-   **Datos Simulados (Mock Data):** `amplify-ai-frontend/lib/mock-data/` (especialmente `posts.ts`)
-   **Configuración de Next.js:** `amplify-ai-frontend/next.config.ts`
-   **Guía de Marca (Referencia):** `brand_guide.md`
-   **Copia de Seguridad de Archivos Iniciales:** `_backup_root/` 