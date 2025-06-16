# Documentación del Proyecto Amplify AI

Bienvenido al centro de documentación de `amplify-ai-frontend`. Este directorio contiene toda la información funcional y técnica necesaria para entender, desarrollar y mantener la aplicación.

## Filosofía de "Documentación Viva"

Adoptamos un enfoque de "Documentación Viva", lo que significa que la documentación no es un artefacto estático que se crea una vez y se olvida. Es una parte integral del proceso de desarrollo que evoluciona junto con el código.

**El objetivo es que cada documento sea la ÚNICA fuente de verdad para el módulo que describe.**

## Estructura y Organización

Para lograrlo, hemos unificado los documentos de "Especificación Funcional" (los requisitos y el *qué* hace una feature) y los de "Arquitectura" (el *cómo* está implementado) en un único fichero por cada módulo principal de la aplicación.

### Convención de Nombres de Archivo

-   Todos los nombres de archivo están en minúsculas.
-   Se utiliza el formato `kebab-case` (palabras separadas por guiones).
-   El nombre del archivo debe corresponder directamente con el nombre del módulo o la ruta en la aplicación.

**Ejemplos:**
-   La documentación para la pantalla de "Strategy Coach" está en `strategy-coach.md`.
-   La documentación para "Análisis de Rendimiento" está en `analytics.md`.

### Estructura de un Documento de Módulo

Cada documento de módulo (`.md`) sigue una estructura estandarizada:

1.  **`# Especificación y Arquitectura: [Nombre del Módulo]`**: Título principal.
2.  **`## A. Concepto`**: La visión del producto. ¿Qué problema resuelve para el usuario? ¿Cuál es su propósito estratégico?
3.  **`## B. a F. Especificación Funcional`**: El desglose detallado de los requisitos, layout, componentes visuales, interacciones del usuario y prompts de UI. Esta sección define **lo que se debe construir**.
4.  **`## G. Arquitectura Viva y Estado de Implementación`**: Esta es la sección técnica.
    -   Describe la arquitectura implementada, los componentes clave utilizados (`PageHeader`, `DashboardSection`, etc.), el flujo de datos y las decisiones técnicas específicas de ese módulo.
    -   Incluye un **Backlog de Arquitectura y Mejoras**, que actúa como una hoja de ruta para la deuda técnica, refactorizaciones pendientes y los siguientes pasos de implementación.

## Documentos Fundamentales

Además de los documentos de módulo, existen ficheros clave que definen las bases de todo el proyecto:

-   **`architecture.md`**: El Documento de Arquitectura y Decisiones (ADR) maestro. Describe el stack tecnológico, los patrones de diseño globales (BFF, gestión de estado), la estructura de directorios y los principios que gobiernan todo el proyecto. **Lectura obligatoria para cualquier nuevo desarrollador.**
-   **`project-overview.md`**: Una visión general del producto, el mercado objetivo y los objetivos de negocio.
-   **`brand-guide.md`**: Define la identidad visual y de comunicación de Amplify AI.

## Mejores Prácticas y Mantenimiento

1.  **Al iniciar una nueva feature:** Crea el borrador del documento `.md` correspondiente siguiendo la plantilla.
2.  **Durante el desarrollo:** Actualiza la sección de "Arquitectura Viva" para que refleje las decisiones que estás tomando y los componentes que estás creando.
3.  **Al completar una refactorización o una tarea importante:** Asegúrate de que tanto la sección de arquitectura como el backlog estén al día.
4.  **Antes de empezar a programar:** Lee el documento del módulo. Es la forma más rápida de entender el contexto funcional y técnico.

Esta disciplina nos permitirá mantener una base de conocimiento coherente, reducir la dependencia del conocimiento tribal y acelerar la incorporación de nuevos miembros al equipo. 