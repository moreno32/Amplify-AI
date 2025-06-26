# Guía de Inyección Directa de Datos Mock en Supabase

Esta guía proporciona instrucciones sobre cómo inyectar directamente los datos de maqueta (mock data) del directorio `lib/mock-data/` en las tablas de su base de datos Supabase. Esto es útil para configurar entornos de prueba, demostraciones o para poblar rápidamente la base de datos con un estado conocido.

## Consideraciones Generales Importantes

Antes de inyectar datos:

1.  **IDs de Usuario y Compañía:** Muchos datos están vinculados a un `user_id` y/o `company_id`. Asegúrese de tener a mano los IDs correctos de su usuario de prueba y de la compañía asociada en Supabase.
    *   Puede obtener su `user_id` desde el Dashboard de Supabase > Autenticación > Usuarios.
    *   Puede obtener/establecer un `company_id` después de crear una fila en la tabla `companies`.

2.  **Relaciones y Claves Foráneas:** Respete el orden de inserción. Inserte datos en tablas "padre" antes que en tablas "hijo" que dependan de ellas. Por ejemplo, cree un `user` y una `company` antes de crear un `company_member`.

3.  **Seguridad a Nivel de Fila (RLS):**
    *   RLS está habilitado en la mayoría de las tablas. Para la inserción directa de datos, especialmente si opera en nombre de múltiples usuarios o compañías, puede ser necesario:
        *   **Desactivar temporalmente RLS** para la tabla específica durante la inserción (y volver a activarlo después). Esto se puede hacer en el Dashboard de Supabase > Editor de Tablas > Seleccionar tabla > Desactivar RLS. **Úselo con extrema precaución.**
        *   **Utilizar el rol `service_role`:** Ejecutar sus scripts SQL con el `service_role` (que omite RLS) es una opción más segura si está trabajando desde un entorno de backend o script. En el Editor SQL de Supabase, puede haber configuraciones para ejecutar como `postgres` o `service_role`.
        *   **Asegurarse de que las políticas RLS permitan la inserción:** Si está insertando datos como un usuario específico, asegúrese de que las políticas RLS permitan a ese usuario realizar la acción de escritura.

4.  **Consistencia de Datos:** Los datos en los archivos mock están diseñados para funcionar juntos. Inyectar solo subconjuntos parciales podría llevar a una experiencia de aplicación inconsistente.

## Inyección de Datos por Módulo

A continuación, se detalla cómo inyectar datos para cada conjunto de mocks:

### 1. Perfil de Marca (`brand.ts`)

*   **Archivo Mock:** `lib/mock-data/brand.ts` (variable `mockBrandProfile`)
*   **Tabla Supabase Principal:** `public.companies`
*   **Campos Relevantes en `companies`:**
    *   `id` (UUID, autogenerado o puede especificar uno si es necesario para referencias)
    *   `name` (TEXT, corresponde a `mockBrandProfile.companyName`)
    *   `company_industry` (TEXT, corresponde a `mockBrandProfile.companyIndustry`)
    *   `company_type` (TEXT, corresponde a `mockBrandProfile.companyType`)
    *   `company_size` (TEXT, corresponde a `mockBrandProfile.companySize`)
    *   `company_website` (TEXT, corresponde a `mockBrandProfile.companyWebsite`)
    *   `company_description` (TEXT, corresponde a `mockBrandProfile.companyDescription`)
    *   `target_audience` (TEXT, corresponde a `mockBrandProfile.targetAudience`)
    *   `language` (VARCHAR(10), corresponde a `mockBrandProfile.language`)
    *   `timezone` (VARCHAR(50), corresponde a `mockBrandProfile.timezone`)
    *   `brand_identity` (JSONB, almacena `core`, `voice`, `visual`, `assets` del mock)
    *   `created_at` (TIMESTAMPTZ, autogenerado)

#### Método 1: Usando el Dashboard de Supabase

1.  Navegue a **Dashboard de Supabase > Editor de Tablas > `companies`**.
2.  Haga clic en **"+ Insertar fila"**.
3.  **Rellenar Campos Directos:**
    *   `name`: Ingrese el `companyName` del mock (ej: "O2CW Boutique Gym").
    *   `company_industry`: Ingrese `companyIndustry` (ej: "Salud y Bienestar").
    *   ... y así sucesivamente para los otros campos de texto directos.
4.  **Rellenar Campo `brand_identity` (JSONB):**
    *   Este campo espera un objeto JSON. La forma más fácil es preparar el JSON. El servicio `brandProfileService.ts` en la función `updateBrandProfile` muestra cómo se estructura el objeto `brand_identity` antes de enviarlo a la base de datos:
        ```javascript
        const brand_identity_data = {
          core: { /* ... datos de mockBrandProfile.core ... */ },
          voice: { /* ... datos de mockBrandProfile.voice ... */ },
          visual: { /* ... datos de mockBrandProfile.visual ... */ },
          assets: { /* ... datos de mockBrandProfile.assets ... */ }
        };
        ```
    *   Copie la estructura relevante de `mockBrandProfile.core`, `mockBrandProfile.voice` (asegúrese de incluir `persona.name` y `persona.archetypes` si los tiene en su mock más reciente), `mockBrandProfile.visual`, y `mockBrandProfile.assets` en un editor de texto y formatéelo como un único objeto JSON.
    *   Pegue este objeto JSON completo en el campo `brand_identity` en el editor de tablas de Supabase.
5.  **Dejar `id` vacío** para que se autogenere un UUID, o especifique uno si ya tiene uno para esta compañía.
6.  Haga clic en **"Guardar"**.

**Nota sobre `company_members`:** Después de crear una compañía, necesitará asociar un usuario a esta compañía en la tabla `company_members`. Inserte una fila allí con:
*   `company_id`: El ID de la compañía que acaba de crear.
*   `user_id`: El ID de su usuario de prueba.
*   `role_id`: El ID del rol (ej: puede buscar el ID para 'Owner' o 'Admin' en `dim_roles`).

#### Método 2: Usando Script SQL

Puede usar una sentencia `INSERT` o `UPDATE`. Para una nueva compañía:

```sql
INSERT INTO public.companies (
    id, -- Opcional, puede dejar que se autogenere
    name,
    company_industry,
    company_type,
    company_size,
    company_website,
    company_description,
    target_audience,
    language,
    timezone,
    brand_identity
) VALUES (
    uuid_generate_v4(), -- Para un nuevo UUID
    'Nombre de Compañía del Mock',
    'Industria del Mock',
    'Tipo del Mock',
    'Tamaño del Mock',
    'Website del Mock',
    'Descripción de Compañía del Mock',
    'Audiencia del Mock',
    'es', -- o 'en'
    'Europe/Madrid', -- o la timezone correspondiente
    '{
        "core": {
            "promise": {
                "id": "CORE::Promise::001",
                "main": "I LOVE ME",
                "slogan": "El catalizador de una profunda transformación interior..."
            }
            // ... resto de la estructura de core ...
        },
        "voice": {
            "persona": {
                "name": "La Mentora Apasionada",
                "description": "Una voz que es a la vez experta y empática...",
                "archetypes": ["El Visionario (Inspirador y vanguardista)", "El Educador (Claro y experto)"]
            },
            "tone": ["Empoderador", "Cercano"],
            "vocabulary": ["Santuario", "Comunidad"],
            "grammar": "Uso de la segunda persona (tú)..."
            // ... resto de la estructura de voice ...
        },
        "visual": {
            "colorPalette": [{
                "color": "#D81B60", "name": "Magenta Vibrante", "role": "Primario", "keywords": "vibrant magenta..."
            }]
            // ... resto de la estructura de visual ...
        },
        "assets": {
            "logos": [{ "name": "Logo Completo O2CW", "url": "/logos/logo-o2cw-full.svg", "type": "Logo" }],
            "photos": [{ "name": "Mujer fuerte y concentrada", "url": "https://images.unsplash.com/...", "type": "Servicio" }]
            // ... resto de la estructura de assets ...
        }
    }'::jsonb
);

-- Ejemplo para asociar un usuario (reemplace con IDs reales):
-- Asuma que el ID de 'Owner' en dim_roles es 1.
-- INSERT INTO public.company_members (company_id, user_id, role_id)
-- VALUES ('ID_DE_COMPAÑÍA_RECIÉN_CREADA', 'ID_DE_SU_USUARIO', 1);
```

**Importante para el JSONB en SQL:**
*   El string completo que representa el JSON debe estar entre comillas simples.
*   Las claves y los strings *dentro* del JSON deben estar entre comillas dobles.
*   Use `::jsonb` al final para castear el string al tipo JSONB de PostgreSQL.
*   Debido a la longitud del JSONB, es recomendable construir el string JSON en un editor de texto, validarlo (usando un linter de JSON online), y luego pegarlo en su script SQL.

---

### 2. Publicaciones de Calendario y Generales (`calendar-posts.ts`, `posts.ts`)

*   **Archivos Mock:**
    *   `lib/mock-data/calendar-posts.ts` (variable `mockCalendarPosts`)
    *   `lib/mock-data/posts.ts` (variable `mockPosts`)
*   **Tabla Supabase Principal:** `public.posts`
*   **Tablas Relacionadas (IDs necesarios de antemano):**
    *   `public.social_accounts`: Necesitará el `id` de una cuenta social existente a la que asociar el post.
    *   `public.campaigns` (opcional): Si el post pertenece a una campaña, necesitará el `id` de la campaña.
    *   `public.dim_content_types`: Necesitará el `id` del tipo de contenido (ej: Imagen, Video).
    *   `public.dim_post_status`: Necesitará el `id` del estado del post (ej: Borrador, Programado).
*   **Campos Relevantes en `posts`:**
    *   `id` (UUID, autogenerado)
    *   `social_account_id` (UUID, FK a `social_accounts.id`)
    *   `campaign_id` (UUID, FK a `campaigns.id`, opcional)
    *   `content_type_id` (INTEGER, FK a `dim_content_types.id`)
    *   `status_id` (INTEGER, FK a `dim_post_status.id`)
    *   `content` (TEXT, cuerpo principal del post)
    *   `media_urls` (TEXT[], array de URLs para imágenes/videos)
    *   `scheduled_at` (TIMESTAMPTZ, fecha y hora de programación)
    *   `published_at` (TIMESTAMPTZ, opcional, fecha de publicación real)
    *   `metrics` (JSONB, opcional, para analíticas del post como likes, comments, etc.)
    *   `created_at` (TIMESTAMPTZ, autogenerado)

**Nota importante sobre los mocks `calendar-posts.ts` y `posts.ts`:**
*   El mock `calendar-posts.ts` (tipo `Post` de `lib/types.ts`) tiene campos como `platform`, `category`, `status`, `startTime`, `duration`. Estos necesitan ser mapeados a los IDs correspondientes de las tablas de dimensión (`dim_platforms` indirectamente a través de `social_accounts`, `dim_post_status`) y a las columnas correctas (`scheduled_at` para `startTime`). La `duration` no tiene un campo directo en la tabla `posts`.
*   El mock `posts.ts` (tipo `DetailedPost` de `lib/types.ts`) es más rico y contiene `platformId` (que sería parte de `social_accounts`), `campaignName`, `statusText`, `type`, `tags`, `image`, `video`, `caption`, `scheduledDate`, `specificMetrics`. La mayoría de estos también necesitarán un mapeo cuidadoso a las columnas y IDs de `posts` y tablas relacionadas.

#### Método 1: Usando el Dashboard de Supabase

1.  **Obtenga IDs de Referencia:** Antes de insertar un post, asegúrese de tener:
    *   Un `social_account_id` válido de la tabla `social_accounts` (que a su vez está vinculado a una `company_id` y `platform_id`).
    *   IDs de `dim_content_types` (ej: buscar el ID para 'Image').
    *   IDs de `dim_post_status` (ej: buscar el ID para 'Scheduled' o 'Draft').
2.  Navegue a **Dashboard de Supabase > Editor de Tablas > `posts`**.
3.  Haga clic en **"+ Insertar fila"**.
4.  **Rellenar Campos:**
    *   `social_account_id`: Ingrese el ID obtenido.
    *   `content_type_id`: Ingrese el ID del tipo de contenido.
    *   `status_id`: Ingrese el ID del estado.
    *   `content`: El texto/caption del post.
    *   `media_urls`: Si es una imagen o video, ingrese la URL como un array de texto. Ejemplo: `{"https://ejemplo.com/imagen.jpg"}`.
    *   `scheduled_at`: La fecha y hora de programación en formato ISO 8601 (ej: `YYYY-MM-DDTHH:MM:SSZ`).
    *   `metrics`: (Opcional) Un objeto JSON con las métricas, ej: `{"likes": 100, "comments": 15}`.
5.  Haga clic en **"Guardar"**.

#### Método 2: Usando Script SQL

```sql
-- Asegúrese de reemplazar los placeholders con IDs y datos reales.
-- Necesitará obtener los IDs de las tablas dim_* y social_accounts previamente.

INSERT INTO public.posts (
    social_account_id,
    campaign_id, -- Opcional
    content_type_id,
    status_id,
    content,
    media_urls,
    scheduled_at,
    metrics
) VALUES (
    'ID_DE_CUENTA_SOCIAL_EXISTENTE', -- UUID de social_accounts.id
    NULL, -- o 'ID_DE_CAMPAÑA_EXISTENTE'
    (SELECT id from public.dim_content_types WHERE name = 'Image'), -- o 'Video', 'Text', etc.
    (SELECT id from public.dim_post_status WHERE name = 'Scheduled'), -- o 'Draft', 'Published', etc.
    'Este es el contenido de mi increíble post desde el mock!',
    ARRAY['https://url.del.mock/imagen.jpg'], -- Opcional, puede ser NULL o un array de URLs
    '2025-12-31T10:00:00Z', -- Fecha de programación
    '{"mockMetric": "valor", "engagement": 123}'::jsonb -- Opcional
);
```

**Para Mapear Datos de los Mocks Específicos:**

*   **Para `calendar-posts.ts` (`mockCalendarPosts`):**
    *   `platform` en el mock (ej: 'instagram') debe usarse para encontrar el `social_account_id` correcto (buscando en `social_accounts` una cuenta de esa plataforma para la compañía deseada).
    *   `category` en el mock (ej: 'Entrenamiento') no tiene un mapeo directo. Podría ser parte del `content` o una `tag` si se implementa un sistema de tags.
    *   `status` en el mock (ej: 'scheduled') se mapea a `status_id` (buscando el ID en `dim_post_status`).
    *   `startTime` se mapea a `scheduled_at`.
*   **Para `posts.ts` (`mockPosts`):**
    *   `platformId` (ej: 1 para Instagram) se usa para encontrar `social_account_id`.
    *   `statusText` (ej: 'Programado') se mapea a `status_id`.
    *   `type` (ej: 'image') se mapea a `content_type_id`.
    *   `caption` se mapea a `content`.
    *   `image` o `video` se mapea a `media_urls`.
    *   `scheduledDate` se mapea a `scheduled_at`.
    *   `specificMetrics` se mapea a `metrics` JSONB.

---

### 3. Competidores y su Análisis (`competitors.ts`, `content-analysis.ts`)

*   **Archivos Mock:**
    *   `lib/mock-data/competitors.ts` (variable `mockCompetitors`)
    *   `lib/mock-data/content-analysis.ts` (variable `mockContentAnalysis`)
*   **Tabla Supabase Principal:** `public.crm_contacts` (utilizando `contact_type = 'Competitor'`)
*   **Tabla de Vínculo:** `public.company_contacts` (para asociar el competidor de `crm_contacts` a *su* compañía como una entidad rastreada).
*   **Campos Relevantes en `crm_contacts` (para un competidor):**
    *   `id` (UUID, autogenerado)
    *   `name` (TEXT, nombre del competidor)
    *   `email` (TEXT, opcional para competidores, puede ser NULL o un placeholder)
    *   `contact_type` (TEXT, se establecerá en **"Competitor"**)
    *   `details` (JSONB, aquí almacenaremos la información adicional del mock `competitors.ts` como `logoUrl`, `stats`, y también los datos de `content-analysis.ts`).
*   **Campos Relevantes en `company_contacts`:**
    *   `company_id` (UUID, FK a `companies.id` - el ID de *su* compañía)
    *   `contact_id` (UUID, FK a `crm_contacts.id` - el ID del competidor recién creado)
    *   `pipeline_status` (TEXT, puede ser algo como "Trackeando" o "Analizando")

**Estructura del JSONB `details` para un competidor:**

Basado en `competitors.ts` (`Competitor` type) y `content-analysis.ts` (`CompetitorContentAnalysis` type):

```json
{
  "logoUrl": "/path/to/logo.svg",
  "postImageUrl": "/path/to/post_image.jpg",
  "stats": [
    { "label": "Seguidores", "value": "150K", "isBetter": true },
    { "label": "Engagement", "value": "2.5%", "isBetter": false }
  ],
  // Datos de content-analysis.ts para este competidor
  "contentAnalysis": {
    "name": "Nombre del Competidor (debe coincidir con crm_contacts.name)",
    "performanceData": [ { "month": "Ene", "user": 120, "competitor": 150 } ],
    "postTypes": [ { "name": "Imagen", "value": 60, "color": "#FF6384" } ],
    "thematicPillars": [ { "theme": "Educación", "posts": 25 } ],
    "publishingPattern": { "Lunes": 3, "Martes": 2 },
    "successfulHashtags": [ { "text": "#marketing", "value": 1500 } ],
    "aiCoachInsight": {
        "title": "Insight Clave sobre Competidor X",
        "lesson": "Lección aprendida...",
        "action": "Acción recomendada...",
        "cta": "Llamada a la acción..."
    }
  }
}
```

#### Método 1: Usando el Dashboard de Supabase

1.  **Insertar en `crm_contacts`:**
    1.  Navegue a **Dashboard de Supabase > Editor de Tablas > `crm_contacts`**.
    2.  Haga clic en **"+ Insertar fila"**.
    3.  `name`: Nombre del competidor (ej: "BrandX").
    4.  `contact_type`: Escriba exactamente **"Competitor"**.
    5.  `email`: Puede dejarlo vacío o usar un placeholder si es obligatorio.
    6.  `details`: Prepare el objeto JSON como se describió arriba, combinando la información de `competitors.ts` y el objeto de `content-analysis.ts` que corresponda a este competidor. Péguelo aquí.
    7.  Guarde y anote el `id` (UUID) del `crm_contact` recién creado.
2.  **Insertar en `company_contacts`:**
    1.  Navegue a **Dashboard de Supabase > Editor de Tablas > `company_contacts`**.
    2.  Haga clic en **"+ Insertar fila"**.
    3.  `company_id`: El ID de *su* compañía.
    4.  `contact_id`: El `id` del competidor que creó en `crm_contacts`.
    5.  `pipeline_status`: Escriba un estado apropiado, ej: "Trackeando".
    6.  Guarde.

#### Método 2: Usando Script SQL

```sql
-- Paso 1: Insertar el competidor en crm_contacts
-- (Asegúrese de que el JSON en 'details' sea válido)

WITH new_competitor AS (
    INSERT INTO public.crm_contacts (name, contact_type, details)
    VALUES (
        'Nombre del Competidor del Mock', 
        'Competitor',
        '{
            "logoUrl": "/logos/competitor-logo.svg",
            "postImageUrl": "/images/competitor-post.jpg",
            "stats": [
                {"label": "Alcance", "value": "250K", "isBetter": true}
            ],
            "contentAnalysis": {
                "name": "Nombre del Competitor del Mock",
                "performanceData": [],
                "postTypes": [],
                "thematicPillars": [],
                "publishingPattern": {},
                "successfulHashtags": [],
                "aiCoachInsight": {
                    "title": "Insight sobre este competidor",
                    "lesson": "Lección clave",
                    "action": "Acción a tomar",
                    "cta": "Revisar estrategia"
                }
            }
        }'::jsonb
    )
    RETURNING id
)
-- Paso 2: Asociar este competidor a su compañía en company_contacts
INSERT INTO public.company_contacts (company_id, contact_id, pipeline_status)
SELECT
    'ID_DE_SU_COMPAÑÍA_AQUÍ', -- Reemplace con el UUID de su compañía
    id,                       -- ID del competidor recién insertado desde el CTE
    'Trackeando'              -- Estado del pipeline
FROM new_competitor;
```

**Nota:** El script SQL anterior inserta un competidor y luego lo vincula. Deberá adaptar el contenido del JSON `details` con los datos exactos de cada competidor de sus archivos mock. Si tiene múltiples competidores en `mockCompetitors` y `mockContentAnalysis`, necesitará ejecutar bloques `INSERT` similares para cada uno, o construir un script más avanzado si son muchos.

---

### 4. Influencers (`influencers.ts`)

*   **Archivo Mock:** `lib/mock-data/influencers.ts` (variable `mockInfluencers`)
*   **Tabla Supabase Principal:** `public.crm_contacts` (utilizando `contact_type = 'Influencer'`)
*   **Tabla de Vínculo:** `public.company_contacts` (para asociar el influencer de `crm_contacts` a *su* compañía).
*   **Campos Relevantes en `crm_contacts` (para un influencer):**
    *   `id` (UUID, autogenerado)
    *   `name` (TEXT, nombre del influencer)
    *   `email` (TEXT, opcional, puede ser el email del influencer si se tiene)
    *   `contact_type` (TEXT, se establecerá en **"Influencer"**)
    *   `details` (JSONB, aquí almacenaremos la información adicional del mock `influencers.ts` como `username`, `avatarUrl`, `followers`, `engagementRate`, `affinityScore`, `tags`).
*   **Campos Relevantes en `company_contacts`:**
    *   `company_id` (UUID, FK a `companies.id` - el ID de *su* compañía)
    *   `contact_id` (UUID, FK a `crm_contacts.id` - el ID del influencer recién creado)
    *   `pipeline_status` (TEXT, ej: "Descubierto", "Contactado", "Colaborando")

**Estructura del JSONB `details` para un influencer:**

Basado en `influencers.ts` (`Influencer` type):

```json
{
  "username": "@influencerHandle",
  "avatarUrl": "/path/to/avatar.jpg",
  "followers": 125000,
  "engagementRate": 0.035, // 3.5%
  "affinityScore": 0.85, // 85%
  "tags": ["Fitness", "Bienestar", "Vida Saludable"]
}
```

#### Método 1: Usando el Dashboard de Supabase

1.  **Insertar en `crm_contacts`:**
    1.  Navegue a **Dashboard de Supabase > Editor de Tablas > `crm_contacts`**.
    2.  Haga clic en **"+ Insertar fila"**.
    3.  `name`: Nombre del influencer.
    4.  `contact_type`: Escriba exactamente **"Influencer"**.
    5.  `email`: (Opcional) Email del influencer.
    6.  `details`: Prepare el objeto JSON como se describió arriba con los datos del mock `influencers.ts`. Péguelo aquí.
    7.  Guarde y anote el `id` (UUID) del `crm_contact` recién creado.
2.  **Insertar en `company_contacts`:**
    1.  Navegue a **Dashboard de Supabase > Editor de Tablas > `company_contacts`**.
    2.  Haga clic en **"+ Insertar fila"**.
    3.  `company_id`: El ID de *su* compañía.
    4.  `contact_id`: El `id` del influencer que creó en `crm_contacts`.
    5.  `pipeline_status`: Un estado relevante, ej: "Identificado", "Contactado".
    6.  Guarde.

#### Método 2: Usando Script SQL

```sql
-- Paso 1: Insertar el influencer en crm_contacts
WITH new_influencer AS (
    INSERT INTO public.crm_contacts (name, contact_type, email, details)
    VALUES (
        'Nombre del Influencer del Mock', 
        'Influencer',
        'influencer@example.com', -- Opcional, puede ser NULL
        '{
            "username": "@mockinfluencer",
            "avatarUrl": "/avatars/mock.jpg",
            "followers": 55000,
            "engagementRate": 0.042,
            "affinityScore": 0.78,
            "tags": ["Moda", "Viajes"]
        }'::jsonb
    )
    RETURNING id
)
-- Paso 2: Asociar este influencer a su compañía en company_contacts
INSERT INTO public.company_contacts (company_id, contact_id, pipeline_status)
SELECT
    'ID_DE_SU_COMPAÑÍA_AQUÍ', -- Reemplace con el UUID de su compañía
    id,                       -- ID del influencer recién insertado desde el CTE
    'Descubierto'             -- Estado del pipeline
FROM new_influencer;
```

---

### 5. Conversaciones de Inbox (`conversations.ts`)

*   **Archivo Mock:** `lib/mock-data/conversations.ts` (variable `mockConversations`)
*   **Estado Actual del Esquema:** El esquema de base de datos (`0000_initial_schema.sql`) **no incluye actualmente tablas dedicadas para `conversations` o `messages`**. Por lo tanto, no se pueden inyectar directamente estos datos de forma estructurada y eficiente con el esquema actual.

*   **Propuesta de Tablas Necesarias (para desarrollo futuro):**
    Para manejar adecuadamente los datos de conversaciones, se necesitarían al menos dos nuevas tablas:

    ```sql
    -- Tabla para las conversaciones
    CREATE TABLE IF NOT EXISTS public.conversations (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
        contact_id UUID NOT NULL REFERENCES public.crm_contacts(id) ON DELETE CASCADE, -- El contacto con el que es la conversación
        social_account_id UUID REFERENCES public.social_accounts(id) ON DELETE SET NULL, -- La cuenta social específica (ej. tu Instagram) si aplica
        channel TEXT NOT NULL, -- ej: 'instagram_dm', 'whatsapp', 'facebook_messenger', 'web_chat'
        status TEXT NOT NULL DEFAULT 'open', -- ej: 'open', 'resolved', 'pending', 'snoozed'
        last_message_at TIMESTAMPTZ DEFAULT NOW(),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );
    COMMENT ON TABLE public.conversations IS 'Almacena cabeceras de conversaciones del inbox.';

    -- Tabla para los mensajes individuales dentro de cada conversación
    CREATE TABLE IF NOT EXISTS public.messages (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
        sender_id UUID, -- Opcional, el user_id si el emisor es un agente/usuario de la compañía
        sender_type TEXT NOT NULL, -- ej: 'contact', 'user_agent', 'bot_agent'
        content TEXT NOT NULL,
        media_urls TEXT[], -- Opcional, para imágenes/videos en mensajes
        timestamp TIMESTAMPTZ DEFAULT NOW(),
        created_at TIMESTAMPTZ DEFAULT NOW()
    );
    COMMENT ON TABLE public.messages IS 'Almacena cada mensaje dentro de una conversación.';
    ```

*   **Campos del Mock `conversations.ts` (`Conversation` type):**
    *   `id`: Sería el `id` de la tabla `conversations`.
    *   `contactName`, `contactAvatarUrl`: Estos datos pertenecen al `crm_contact` asociado a la conversación.
    *   `lastMessage`, `timestamp` (del último mensaje): Se podría derivar o almacenar en `conversations.last_message_at`.
    *   `status`: Se mapearía a `conversations.status`.
    *   `channel`: Se mapearía a `conversations.channel`.
    *   `messages` (array de `Message` type):
        *   `id`: Sería el `id` de la tabla `messages`.
        *   `sender`: Se mapearía a `messages.sender_type` (y `sender_id` si es un usuario interno).
        *   `content`: Se mapearía a `messages.content`.
        *   `timestamp`: Se mapearía a `messages.timestamp`.

#### Método de Inyección (SI LAS TABLAS EXISTIERAN):

**Asumiendo que las tablas `conversations` y `messages` propuestas anteriormente existen:**

1.  **Crear/Obtener `crm_contact`:** Asegúrese de que el contacto de la conversación exista en `crm_contacts`. Anote su `id`.
2.  **Insertar en `conversations` (Dashboard):**
    1.  Navegue a `Editor de Tablas > conversations`.
    2.  `company_id`: ID de su compañía.
    3.  `contact_id`: ID del `crm_contact`.
    4.  `channel`: ej: "instagram_dm" (del mock `channel`).
    5.  `status`: ej: "open" (del mock `status`).
    6.  Guarde y anote el `id` de la conversación.
3.  **Insertar en `messages` (Dashboard) - Repetir para cada mensaje del mock:**
    1.  Navegue a `Editor de Tablas > messages`.
    2.  `conversation_id`: ID de la conversación creada arriba.
    3.  `sender_type`: "contact" si `sender === 'contact'`, o "user_agent" si `sender === 'user'`.
    4.  `content`: El `content` del mensaje del mock.
    5.  `timestamp`: El `timestamp` del mensaje del mock.
    6.  Guarde.

#### Método 2: Usando Script SQL (SI LAS TABLAS EXISTIERAN)

```sql
-- Asuma que las tablas conversations y messages existen según la propuesta.
-- Reemplace placeholders con IDs reales (company_id, contact_id).

-- Paso 1: Insertar la conversación
WITH new_conversation AS (
    INSERT INTO public.conversations (company_id, contact_id, channel, status, last_message_at)
    VALUES (
        'ID_DE_SU_COMPAÑÍA_AQUÍ', 
        'ID_DEL_CRM_CONTACT_AQUÍ', 
        'instagram_dm', -- Del mock.channel
        'open',         -- Del mock.status
        '2024-07-20T10:30:00Z' -- Del mock.timestamp (del último mensaje)
    )
    RETURNING id
)
-- Paso 2: Insertar mensajes para esa conversación
-- Repetir este bloque para cada mensaje en el array mockConversation.messages
INSERT INTO public.messages (conversation_id, sender_type, content, timestamp)
SELECT 
    id, -- ID de la conversación recién creada desde el CTE
    'contact', -- o 'user_agent' basado en mockMessage.sender
    'Contenido del primer mensaje del mock...',
    '2024-07-20T10:00:00Z' -- timestamp del mockMessage
FROM new_conversation
;

INSERT INTO public.messages (conversation_id, sender_type, content, timestamp)
SELECT
    id, -- ID de la conversación recién creada desde el CTE
    'user_agent', -- o 'contact' basado en mockMessage.sender
    'Respuesta del agente...',
    '2024-07-20T10:05:00Z' -- timestamp del mockMessage
FROM new_conversation
;
-- ... y así sucesivamente para los demás mensajes.
```

**Conclusión para `conversations.ts`:** La inyección directa de estos datos requiere una extensión del esquema actual de la base de datos. Una vez que las tablas `conversations` y `messages` se creen (probablemente durante la conexión de la sección Inbox de la aplicación), esta guía se podrá aplicar completamente.

---

### 6. Datos del Dashboard, Métricas y Top Posts (`dashboard.ts`, `metrics.ts`, `top-posts.ts`)

*   **Archivos Mock:**
    *   `lib/mock-data/dashboard.ts` (variable `mockDashboardData`)
    *   `lib/mock-data/metrics.ts` (define tipos como `Kpi`, `ChartDataPoint` usados en `AnalyticsData`)
    *   `lib/mock-data/top-posts.ts` (variable `mockTopPosts`, también usado en `AnalyticsData`)
*   **Estado Actual del Esquema y Consideraciones de Mapeo:**
    *   Gran parte de los datos en estos mocks son **agregados, calculados, o derivados** de otras tablas (ej: `posts`, `social_accounts`).
    *   No existen tablas específicas en el esquema `0000_initial_schema.sql` para almacenar directamente cada pieza de los mocks de `dashboard.ts` (como `performanceMetrics`, `recommendedActions`, `aiCoachInsights` tal cual están estructurados).
    *   `upcomingPosts` y `topPosts` se basarían en consultas a la tabla `public.posts`.
    *   `performanceMetrics` o `Kpi`: Podrían ser el resultado de funciones de agregación o vistas materializadas sobre la tabla `posts.metrics` u otras fuentes. Si se quisiera almacenar *snapshots* de KPIs, se necesitaría una tabla como `company_kpi_snapshots`.
    *   `recommendedActions` y `aiCoachInsights`: Si se desea persistir estas recomendaciones/insights específicos, necesitarían sus propias tablas (ej: `company_recommendations`, `company_insights`) vinculadas a `company_id`.

**Conclusión para estos mocks:** La "inyección directa" de la totalidad de `mockDashboardData` o `mockAnalyticsData` (que usa `metrics.ts` y `top-posts.ts`) en su forma actual es compleja porque representan una vista procesada de los datos.

**Enfoque Práctico para Inyección (Parcial o Representativa):**

1.  **Asegurar Datos Base:**
    *   Asegúrese de que tiene posts en la tabla `public.posts` con datos en su campo `metrics` (JSONB). Los `topPosts` y algunos `performanceMetrics` podrían derivarse de aquí.
    *   Los `upcomingPosts` se basarán en los `posts` con `status_id` correspondiente a 'Scheduled' o 'Draft' y `scheduled_at` en el futuro.

2.  **Para `performanceMetrics` / `Kpi` (si se desea almacenar snapshots):**
    *   **Propuesta de Tabla (Ejemplo):**
        ```sql
        CREATE TABLE IF NOT EXISTS public.company_kpi_snapshots (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
            kpi_name TEXT NOT NULL, -- ej: "Alcance Total", "Nuevos Seguidores"
            kpi_value TEXT NOT NULL, -- Valor como string para flexibilidad
            kpi_change_details JSONB, -- ej: {"change": "+10%", "changeType": "increase"}
            snapshot_date TIMESTAMPTZ DEFAULT NOW(),
            UNIQUE (company_id, kpi_name, snapshot_date) -- Evitar duplicados para el mismo kpi en el mismo día
        );
        ```
    *   **Inyección (si la tabla existiera):**
        ```sql
        INSERT INTO public.company_kpi_snapshots (company_id, kpi_name, kpi_value, kpi_change_details, snapshot_date)
        VALUES (
            'ID_DE_SU_COMPAÑÍA_AQUÍ',
            'Engagement Rate', -- Del mock Kpi.title
            '4.2%',        -- Del mock Kpi.value
            '{"change": "+0.5%", "changeType": "increase"}'::jsonb, -- Construido desde Kpi.change y Kpi.changeType
            '2024-07-21T00:00:00Z'
        );
        ```

3.  **Para `recommendedActions` o `aiCoachInsights` (si se desea persistir):**
    *   **Propuesta de Tabla (Ejemplo para Acciones):**
        ```sql
        CREATE TABLE IF NOT EXISTS public.company_recommendations (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
            title TEXT NOT NULL,
            description TEXT,
            action_type TEXT, -- ej: 'contenido', 'estrategia', 'comunidad'
            priority INTEGER DEFAULT 3, -- 1=Alta, 2=Media, 3=Baja
            is_completed BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );
        ```
    *   **Inyección (si la tabla existiera):**
        ```sql
        INSERT INTO public.company_recommendations (company_id, title, description, action_type, priority)
        VALUES (
            'ID_DE_SU_COMPAÑÍA_AQUÍ',
            'Título de la Acción del Mock', 
            'Descripción de la Acción del Mock',
            'contenido',
            1
        );
        ```

**En resumen:** Para estos mocks, la inyección directa es menos sobre replicar el mock 1:1 y más sobre asegurar que los datos fundamentales (en `posts`, `companies`, etc.) estén presentes. Para los elementos agregados o generados por IA, si necesita que aparezcan consistentemente para demos, la mejor aproximación a largo plazo es tener los servicios de la aplicación que los generan conectados a la base de datos real, o crear tablas específicas para *snapshots* o *recomendaciones persistentes* si ese es el comportamiento deseado.

El botón de "Poblar Perfil con Datos de Demo" que creamos para `brand.ts` es un ejemplo de cómo la aplicación puede tomar datos mock y escribirlos de forma estructurada. Un enfoque similar podría adoptarse para otros módulos si se requiere un "estado de demo" complejo y consistente más allá de la inserción manual.

---

## Conclusión de la Guía

Esta guía debería proporcionarle las herramientas para poblar su base de datos Supabase con los datos de maqueta. Recuerde siempre verificar los IDs, respetar las relaciones y tener en cuenta las políticas RLS. Para estructuras de datos complejas o datos derivados, la mejor solución a largo plazo es que la propia aplicación los genere o los almacene a través de sus servicios y API. 