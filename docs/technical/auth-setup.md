# Documentación Técnica Detallada: Flujo de Autenticación y Onboarding

## Visión General

Este documento detalla la arquitectura y el flujo implementado para el registro, autenticación y onboarding automático de nuevos usuarios. El objetivo es conectar de forma atómica y segura el sistema de `auth` de Supabase con nuestro esquema `public`, garantizando que cada nuevo usuario tenga instantáneamente un perfil de datos, una compañía por defecto y los roles necesarios para operar en la aplicación.

Este proceso es de misión crítica, ya que un fallo aquí resulta en un estado de datos inconsistente que impide al usuario utilizar la aplicación.

---

## Arquitectura y Flujo de Datos Transaccional

El sistema se basa en un trigger de base de datos que responde a la creación de nuevos usuarios. Toda la operación se ejecuta como una **única transacción atómica**.

**Componentes Clave:**
1.  **Frontend**: Formulario de registro en Next.js (`app/(auth)/login/page.tsx`).
2.  **Supabase Auth**: Gestiona la tabla `auth.users` y el proceso de signup.
3.  **Supabase Database (PostgreSQL)**: Nuestra base de datos (`public` schema).
4.  **Trigger (`on_auth_user_created`)**: Un trigger `AFTER INSERT` en `auth.users`.
5.  **Función (`handle_new_user`)**: Una función `plpgsql` con privilegios elevados (`SECURITY DEFINER`) que es ejecutada por el trigger.

**Flujo de Ejecución Detallado:**
1.  Un usuario completa el formulario de registro. El cliente llama a `supabase.auth.signUp()`.
2.  **Paso Crucial de Datos**: El `full_name` y `avatar_url` (si está disponible) se pasan dentro del objeto `options.data`. Supabase almacena esta información en la columna `raw_user_meta_data` (un campo `jsonb`) de la tabla `auth.users`.
3.  Supabase Auth inicia una transacción. Intenta crear una nueva fila en `auth.users`.
4.  Tras la inserción exitosa en `auth.users`, el trigger `on_auth_user_created` se dispara **dentro de la misma transacción**.
5.  El trigger invoca la función `public.handle_new_user()`, que no recibe argumentos, pero tiene acceso al registro `NEW`, que representa la fila recién insertada en `auth.users`.
6.  La función `handle_new_user()` ejecuta secuencialmente la siguiente lógica:
    a.  **`INSERT INTO public.users`**: Crea una entrada en nuestra tabla de perfiles. Extrae el `id`, `full_name` y `avatar_url` directamente desde el registro `NEW`.
        -   `id` se toma de `NEW.id`.
        -   `full_name` se extrae de `NEW.raw_user_meta_data->>'full_name'`.
    b.  **Generación de Nombre de Compañía**: Se utiliza `COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1)) || '''s Company'` para asegurar que siempre haya un nombre de compañía válido.
    c.  **`INSERT INTO public.companies`**: Crea la compañía por defecto y usa la cláusula `RETURNING id INTO new_company_id` para capturar el UUID de la nueva compañía en una variable.
    d.  **`SELECT ... INTO`**: Busca en `public.dim_roles` el `id` para el rol 'Owner' y lo almacena en la variable `owner_role_id`.
    e.  **`INSERT INTO public.company_members`**: Vincula al nuevo usuario (`NEW.id`) con la nueva compañía (`new_company_id`) y el rol de propietario (`owner_role_id`).
7.  **Resultado de la Transacción**:
    -   **Éxito**: Si todos los `INSERT` y `SELECT` dentro de la función se completan sin errores, la función devuelve `NEW`. La transacción se confirma (`COMMIT`). El usuario está totalmente provisionado.
    -   **Fallo**: Si cualquier paso dentro de `handle_new_user()` falla (p. ej., una restricción `NOT NULL` violada), la función lanza una excepción. Esto causa que **toda la transacción se revierta (`ROLLBACK`)**. La inserción en `auth.users` se deshace, y la función `signUp()` devuelve un error al frontend. Esto garantiza que no existan usuarios "huérfanos".

---

## Desafíos Técnicos y Soluciones Detalladas

### 1. Desincronización entre `auth` y `public`
-   **Problema**: Inicialmente, un registro exitoso creaba un usuario en `auth.users`, pero no en `public.users`, dejando la aplicación en un estado inconsistente.
-   **Solución**: La implementación del trigger y la función `handle_new_user` dentro de una transacción atómica garantiza que o todo el proceso tiene éxito, o todo se revierte.

### 2. Fallo por Datos Faltantes
-   **Problema**: La función `handle_new_user` fallaba si el `full_name` no se enviaba desde el frontend, ya que intentaba crear un nombre de compañía con un valor `NULL`.
-   **Solución**: Se hizo la función más robusta utilizando `COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1)) || '''s Company'` para asegurar que siempre haya un nombre de compañía válido.

### 3. El Conflicto de Permisos de RLS (SECURITY DEFINER vs INVOKER)
-   **Problema**: El `trigger` en `auth.users` es propiedad de `supabase_auth_admin`, un rol interno. Por defecto, una función de trigger se ejecuta con los permisos del *invocador* (`SECURITY INVOKER`), que en este caso sería `supabase_auth_admin`. Este rol no tiene, ni debe tener, permisos para escribir en nuestro esquema `public`. El error era `permission denied for schema public`.
-   **Solución Arquitectónica**: La solución es definir la función con `SECURITY DEFINER`. Esto instruye a PostgreSQL para que ejecute la función con los permisos del *dueño de la función*, que en nuestro caso es el superusuario `postgres`.
-   **El Segundo Problema de Permisos**: Incluso como `postgres`, el acceso a las tablas puede ser bloqueado si las Políticas de Seguridad a Nivel de Fila (RLS) están activadas y no hay una política que explícitamente permita el acceso para ese rol.
-   **Solución Final**: La solución completa fue doble:
    1.  Definir la función con `SECURITY DEFINER`.
    2.  Crear políticas de RLS explícitas con la cláusula `TO postgres` que le otorgan a este rol los permisos necesarios (`INSERT` en `users`, `companies`, `company_members` y `SELECT` en `dim_roles`) para llevar a cabo la operación de onboarding.

---

## El Master Script de Migración

Para asegurar la reproducibilidad y mantener un entorno de desarrollo limpio, todos los scripts de migración intermedios fueron consolidados en un único archivo:

-   **`supabase/migrations/0001_master_setup.sql`**

Este script es el "único punto de verdad" para la estructura de la base de datos. Es idempotente, lo que significa que se puede ejecutar varias veces sin causar errores. Su lógica incluye:
1.  **DROP**: Elimina todas las tablas existentes en el orden correcto para evitar conflictos de `foreign key`.
2.  **CREATE**: Recrea todo el esquema de tablas.
3.  **SEED**: Puebla las tablas de dimensiones (`dim_...`) con los datos iniciales necesarios para el funcionamiento de la aplicación.
4.  **IMPLEMENT**: Crea la función `handle_new_user`, el trigger `on_auth_user_created` y aplica todas las políticas de RLS necesarias.

Este enfoque simplifica drásticamente la configuración de nuevos entornos de desarrollo y la recuperación de la base de datos a un estado conocido y funcional. 