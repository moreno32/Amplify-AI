# 🔐 Estrategia de Seguridad a Nivel de Fila (RLS) en Supabase

## 1. Resumen Ejecutivo

Este documento describe la implementación de la Seguridad a Nivel de Fila (RLS) en la base de datos de Supabase para el proyecto Amplify AI. La RLS es una característica de PostgreSQL que nos permite controlar qué filas puede consultar o modificar un usuario, basándonos en políticas de seguridad.

**La implementación correcta de RLS es absolutamente crítica.** Sin ella, cualquier usuario autenticado podría, potencialmente, acceder o modificar los datos de cualquier otra empresa en la plataforma.

## 2. Estrategia de Acceso

Nuestra estrategia de seguridad se basa en un principio fundamental: **un usuario solo puede interactuar con los datos asociados a las empresas de las que es miembro.**

Para implementar esto de manera eficiente y centralizada, hemos creado una función de ayuda en la base de datos:

### Función Auxiliar: `is_member_of(company_id)`

Esta función SQL comprueba si el usuario autenticado actualmente (`auth.uid()`) es miembro de una `company_id` específica.

```sql
CREATE OR REPLACE FUNCTION public.is_member_of(p_company_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.company_members
    WHERE company_members.company_id = p_company_id
    AND company_members.user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

**Puntos Clave:**
*   `SECURITY DEFINER`: Permite que la función se ejecute con los permisos del usuario que la definió (el creador de la base deatos), dándole acceso para leer la tabla `company_members` y verificar la membresía en nombre del usuario que realiza la petición.
*   **Centralización:** Usar esta función en nuestras políticas simplifica su creación y mantenimiento. Si la lógica de membresía cambia, solo necesitamos actualizar esta función.

## 3. Políticas RLS por Tabla

A continuación se detallan las políticas aplicadas a cada tabla principal. Habilitamos todas las operaciones (SELECT, INSERT, UPDATE, DELETE) para los miembros de la empresa, asumiendo que roles más específicos se gestionarán a nivel de aplicación en una fase posterior.

### `users`
*   **Política:** Un usuario puede ver y actualizar su propio perfil.
*   **Implementación:** `USING (auth.uid() = id)`

### `companies`
*   **Política:** Un usuario puede ver los detalles de las empresas de las que es miembro.
*   **Implementación:** `USING (public.is_member_of(id))`

### `company_members`
*   **Política:** Un usuario puede ver la lista de miembros de las empresas a las que pertenece.
*   **Implementación:** `USING (public.is_member_of(company_id))`

### `social_accounts`, `campaigns`, `posts`, `brand_assets`, etc.
*   **Política:** Un usuario puede realizar operaciones CRUD completas sobre los recursos que pertenecen a una empresa de la que es miembro.
*   **Implementación:** `USING (public.is_member_of(company_id))`

Esta configuración establece una base de seguridad robusta y multi-tenant, garantizando que los datos de cada cliente permanezcan aislados y seguros. 