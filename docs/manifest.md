# 📜 Manifiesto de Desarrollo: O2CW Boutique Gym (MVE)

> **Para:** Agente de Desarrollo de IA (Cursor)  
> **Asunto:** Contexto Estratégico y Blueprint Técnico del Panel de Contenido de O2CW.
> **Última Actualización:** Basado en el refactor completo y la estabilización de la UI.

---

## 🎯 1. Misión y Principios

### Objetivo Central
Mantener y evolucionar un **panel de control de contenido completamente interactivo, visualmente pulido y funcional** para el gimnasio boutique **O2CW**. La aplicación es una **"Mínima Experiencia Viable" (MVE)** que valida el flujo del producto con datos simulados y sirve como base para futuras implementaciones de backend.

### Principios Rectores
1.  🎨 **La UI es la Historia:** Cada elemento debe servir a la narrativa de una herramienta inteligente, potente y simple para gestionar el marketing de O2CW.
2.  🧱 **`shadcn/ui` es el Canon:** Se utilizan sus componentes como base. La personalización se realiza vía `tailwind.config.js` y clases de utilidad, no reinventando componentes.
3.  ✨ **Interactividad, No Estaticidad:** La aplicación se siente *viva*. Los modales son funcionales, los estados visuales son claros y la navegación es fluida.
4.  📦 **Los Datos Mock son el Rey:** La UI está completamente desacoplada de la lógica de fetching, consumiendo datos desde archivos locales para un desarrollo y testing predecibles.

### ✅ Definición del Estado Actual ("Hecho")
- [x] Todas las pantallas principales (`Dashboard`, `Calendario`, `Inbox`, etc.) son navegables.
- [x] El flujo principal de visualización y edición de posts en el calendario está completo y es funcional.
- [x] La identidad de la marca "O2CW Boutique Gym" ha sido implementada en toda la aplicación.
- [x] La aplicación es completamente responsiva (diseño validado en desktop).
- [x] No existen llamadas a API (`fetch`). Toda la data se consume desde mocks locales en `lib/mock-data/`.
- [x] Se ha creado un documento de contexto (`PROJECT_CONTEXT_AI.md`) para facilitar la continuidad.

---

## 🛠️ 2. Fundación Técnica

### Stack Frontend
-   **Framework:** Next.js 14+ (App Router)
-   **Lenguaje:** TypeScript
-   **Estilos:** Tailwind CSS
-   **Componentes:** shadcn/ui
-   **Gestión de Estado (potencial):** Zustand (definido, pero no implementado activamente)
-   **Formularios (potencial):** React Hook Form + Zod (definido, pero no implementado activamente)

### Estructura de Archivos Clave
```bash
/amplify-ai-frontend/
├── app/
│   ├── (main)/               # Grupo de rutas para la app principal
│   │   ├── calendar/
│   │   │   ├── page.tsx      # Lógica y layout principal del calendario
│   │   │   └── components/
│   │   │       └── PostCard.tsx # Tarjeta de post individual
│   │   ├── ...               # Otras rutas (Dashboard, Inbox, etc.)
│   │   └── layout.tsx        # Layout principal con Sidebar
├── components/
│   ├── modals/               # Modales reutilizables
│   │   └── PostEditorModal.tsx # Modal para editar posts
│   └── ui/                   # Componentes generados por shadcn/ui
├── lib/
│   ├── mock-data/            # Base de datos simulada
│   │   ├── posts.ts
│   │   └── types.ts          # Definiciones de tipos (Post, etc.)
│   └── utils.ts              # Funciones de utilidad (ej. cn)
```

### Estrategia de Datos Mock
-   **Tipado Estricto:** Todos los tipos se definen en `lib/types.ts`.
    ```typescript
    // lib/types.ts
    export type PostStatus = 'published' | 'draft' | 'idea' | 'scheduled';
    
    export interface Post {
      id: string;
      dayOfWeek: string;
      date: string; // Formato: YYYY-MM-DD
      time: string; // Formato: HH:MM
      content: string;
      status: PostStatus;
      // ...
    }
    ```
-   **Centralización:** Los datos se definen y exportan desde los archivos en `lib/mock-data/`.

---

## 🗺️ 3. Resumen de Funcionalidades Implementadas

En lugar de un plan por fases, este es un resumen del estado funcional actual del proyecto.

### Módulo de Calendario:
-   **Vista:** Organizada en 7 días, con 3 bloques por día: "Mañana", "Tarde", y "Noche".
-   **Fechas:** Muestra la fecha numérica junto al día de la semana.
-   **Heatmap ("Horas Óptimas"):** Funcionalidad visual que resalta los días de mayor interacción con una superposición de color sutil.
-   **Tarjetas de Post:** Muestran el estado del post con un borde y una etiqueta de color distintivos.

### Módulo de Edición:
-   **Modal `PostEditorModal`:** Un modal de dos columnas (1/3 para vista previa, 2/3 para edición) completamente funcional.
-   **Vista Previa:** Simula la apariencia del post en una red social, con datos y branding de O2CW.
-   **Programación:** Muestra correctamente la fecha y hora programadas, gracias a la corrección del formato de fecha.

---

## 🚀 4. Siguientes Pasos y Comando de Mantenimiento

**La tarea principal ahora es mantener y evolucionar la MVE existente.**

Cualquier nuevo desarrollo debe partir del entendimiento documentado en `PROJECT_CONTEXT_AI.md` y este manifiesto.

### Posibles Futuras Fases:
-   **Fase de Backend:** Reemplazar los datos mock con llamadas a una API real.
-   **Fase de Analíticas:** Implementar gráficos funcionales en la sección de `Métricas` usando librerías como `Recharts`.
-   **Fase de Formularios:** Desarrollar formularios complejos con validación (ej. `React Hook Form` + `Zod`) para la creación de campañas o perfiles.

¡Continuemos con la evolución del proyecto!