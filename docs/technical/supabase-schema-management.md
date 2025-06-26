# Gestión del Esquema de Base de Datos Supabase con Migraciones

Este documento describe cómo utilizar los scripts SQL ubicados en el directorio `supabase/migrations` para inicializar, resetear y actualizar el esquema de tu base de datos Supabase.

## Entendiendo las Migraciones de Supabase

El directorio `supabase/migrations` contiene una serie de archivos SQL. Cada archivo representa un cambio incremental en el esquema de tu base de datos. Supabase utiliza estos archivos para versionar tu esquema, permitiéndote:

*   **Recrear el esquema** desde cero en cualquier entorno (local, staging, producción).
*   **Aplicar cambios** de forma secuencial y controlada.
*   **Colaborar** con otros desarrolladores, asegurando que todos tengan la misma estructura de base de datos.

Los archivos están numerados (ej. `0000_...sql`, `0001_...sql`) para indicar el orden en que deben aplicarse.

## Flujo de Trabajo y Comandos

El Supabase CLI (Command Line Interface) es la herramienta principal para interactuar con tus migraciones y tu base de datos local.

### 1. Desarrollo Local con Supabase

Para el desarrollo local, generalmente seguirás estos pasos:

*   **Iniciar los servicios de Supabase:**
    ```bash
    supabase start
    ```
    Este comando inicia todos los servicios de Supabase (PostgreSQL, Kong, GoTrue, etc.) en contenedores Docker en tu máquina local. Si es la primera vez que lo ejecutas o si has hecho cambios en `config.toml`, también aplicará las migraciones existentes.

### 2. Resetear y Recrear el Esquema Localmente

Si necesitas empezar de nuevo con una base de datos limpia o si has realizado cambios manuales en tu base de datos local que quieres descartar y volver al estado definido por tus migraciones, puedes resetear la base de datos:

*   **Resetear la base de datos local y aplicar todas las migraciones:**
    ```bash
    supabase db reset
    ```
    Este comando:
    1.  Detiene tu instancia de Supabase local si está en ejecución.
    2.  Elimina la base de datos local existente.
    3.  Crea una nueva base de datos limpia.
    4.  Aplica **todos** los scripts de migración secuencialmente desde el directorio `supabase/migrations` a la nueva base de datos.
    5.  Reinicia los servicios de Supabase si los detuvo.

    **¡Importante!** `supabase db reset` **eliminará todos los datos** de tu base de datos local. Úsalo con precaución.

### 3. Aplicar Nuevas Migraciones

Si has creado un nuevo archivo de migración (por ejemplo, después de usar `supabase migration new <nombre_migracion>`), o si has obtenido nuevas migraciones de otros desarrolladores (ej. después de un `git pull`), puedes aplicar las migraciones pendientes:

*   **Aplicar migraciones pendientes:**
    ```bash
    supabase migration up
    ```
    Este comando detecta qué migraciones del directorio `supabase/migrations` aún no se han aplicado a tu base de datos local y las ejecuta en orden.

### 4. Sembrar Datos de Prueba (Opcional pero Recomendado)

Después de resetear y recrear tu esquema, la base de datos estará vacía (a excepción de los datos que puedan estar en `supabase/seed.sql` si lo usas).

En nuestro proyecto Amplify-AI, hemos implementado un mecanismo de siembra de datos a través de una Server Action que puedes activar desde la interfaz de la aplicación (en la sección de "Configuración" -> "Cuenta", bajo "Developer Tools"). Este es el método preferido para poblar tu base de datos local con datos de demostración consistentes después de un `supabase db reset`.

Alternativamente, si tienes un archivo `supabase/seed.sql` (no es nuestro caso principal de siembra, pero es una funcionalidad de Supabase), este se ejecuta automáticamente después de las migraciones cuando usas `supabase db reset`.

## Resumen de los Scripts SQL en `@/supabase/migrations`

Los archivos SQL en el directorio `supabase/migrations` de nuestro proyecto Amplify-AI construyen el esquema de la siguiente manera:

*   **`0000_initial_schema.sql`**: Establece la estructura base de las tablas principales (`companies`, `users`, `posts`, `crm_contacts`, tablas de dimensión iniciales), tipos personalizados y algunas funciones iniciales.
*   **`0001_master_setup.sql`**: Contiene configuraciones adicionales o datos maestros iniciales (no lo hemos modificado significativamente en este proyecto).
*   **`0002_apply_rls_policies.sql`**: Implementa la Seguridad a Nivel de Fila (RLS) para proteger los datos de los usuarios, asegurando que solo puedan acceder a la información de su propia compañía.
*   **`0003_add_company_fields.sql`**: Añade las columnas `company_industry` y `company_description` a la tabla `companies` para enriquecer el perfil de marca.
*   **`0004_add_post_categories.sql`**: Introduce la tabla de dimensión `dim_post_categories` y la columna `category_id` en la tabla `posts` para categorizar el contenido.
*   **`0005_add_post_duration_notes.sql`**: Añade las columnas `duration` y `notes` a la tabla `posts`, y también es cuando comenzamos a utilizar la columna `metrics` (JSONB) para almacenar `likes`, `comments`, y `reach`.
*   **`0006_update_dimension_tables.sql`**: Actualiza los datos dentro de las tablas de dimensión `dim_post_status` y `dim_platforms` para alinearlos con los tipos de la aplicación.

Al ejecutar `supabase db reset`, todos estos scripts se ejecutan en orden, resultando en un esquema de base de datos completamente configurado y listo para ser utilizado por la aplicación Amplify-AI.

## Migraciones en Entornos Remotos (Staging/Producción)

Para aplicar migraciones a tus entornos de Supabase remotos (hosteados en la nube de Supabase):

1.  **Enlaza tu proyecto local con tu proyecto Supabase remoto:**
    ```bash
    supabase link --project-ref <tu-project-ref>
    ```
    (Solo necesitas hacerlo una vez por proyecto).

2.  **Despliega las migraciones pendientes:**
    ```bash
    supabase db push
    ```
    Este comando compara el estado de tus migraciones locales con el estado de la base de datos remota y aplica las migraciones necesarias. **¡Este comando es para entornos remotos y debe usarse con cuidado, especialmente en producción!** Siempre es bueno tener un backup antes de aplicar cambios a producción.

    Para producción, Supabase recomienda un flujo de trabajo donde las migraciones se revisan y se aplican a través de CI/CD o manualmente con más control, en lugar de un `db push` directo desde el entorno local.

Este documento debería proporcionarte una buena base para entender y gestionar tu esquema de Supabase. 