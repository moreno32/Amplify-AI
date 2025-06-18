# Especificación Detallada: Pantalla de "Social Inbox"

## A. Concepto: "Cada Conversación, una Oportunidad de Fidelización"

El Social Inbox de Amplify AI no es solo un agregador de mensajes. Es un **centro de mando de relaciones con el cliente**, potenciado por una IA que comprende el contexto de la conversación y la personalidad de la marca. El objetivo es permitir al usuario responder más rápido, con mayor calidad y siempre "en marca", convirtiendo cada interacción en una experiencia positiva.

## B. Estructura General y Layout

-   **Layout Principal:** Adopta el clásico y probado layout de 3 paneles.
    -   **Panel 1 (Lista de Conversaciones):** `width: 25%`.
    -   **Panel 2 (Hilo de Conversación):** `width: 50%`.
    -   **Panel 3 (Contexto del Contacto):** `width: 25%`.

---

## C. Panel 1: Lista de Conversaciones

La vista de pájaro de todas las interacciones.

### 1. Cabecera del Panel
-   **Título (H1):** "Social Inbox"
-   **Selector de Bandeja (`Select`):**
    -   `Mi Bandeja` (Conversaciones asignadas a mí)
    -   `Sin Asignar`
    -   `Todo`
-   **Filtro (`Input` con icono de lupa):** "Buscar por nombre o palabra clave..."

### 2. Barra de Canales
-   **Componente:** Una barra vertical estrecha a la izquierda del listado.
-   **Iconos:**
    -   `[Icono Todos]` (Seleccionado por defecto)
    -   `[Icono Instagram]`
    -   `[Icono Facebook Messenger]`
    -   `[Icono WhatsApp]`

### 3. Lista de Conversaciones
-   **Componente:** Una lista de `Items` desplazable.
-   **Item de Conversación (Activo):** Fondo de color Acento suave.
-   **Item de Conversación (Normal):**
    -   **Avatar del Usuario:** Con un pequeño icono del canal superpuesto (Instagram, FB, etc.).
    -   **Nombre del Usuario:** En negrita.
    -   **Último Mensaje:** Un extracto del último mensaje recibido.
    -   **Timestamp:** "hace 5 min", "ayer".
    -   **Indicador de No Leído:** Un punto de color Acento.

---

## D. Panel 2: Hilo de la Conversación

El corazón de la interacción.

### 1. Cabecera del Panel
-   **Avatar y Nombre del Contacto:** Para saber con quién se está hablando.
-   **Acciones:** Botones para `[Marcar como resuelto ✅]`, `[Asignar a... 👤]` (para planes Agency), `[Más Opciones...]`.

### 2. Historial de Mensajes
-   **Diseño:** Burbujas de chat clásicas.
    -   **Mensajes Entrantes:** Alineados a la izquierda, fondo gris claro.
    -   **Mensajes Salientes:** Alineados a la derecha, fondo de color Acento.

### 3. ⭐ El Cuadro de Respuesta Inteligente ⭐
-   **Componente Principal:** Un `Textarea` de `shadcn/ui` para escribir la respuesta.
-   **Botones de Adjuntos:** Iconos para `[Adjuntar archivo]`, `[Insertar Emoji]`, `[Usar Respuesta Rápida]`.
-   **El Botón Mágico de IA (`✨`):**
    -   **Ubicación:** Un botón sutil al lado del `Textarea` o dentro de él.
    -   **Acción al Hacer Clic:** Abre un pequeño menú contextual con las siguientes opciones:
        1.  **"Sugerir 3 Respuestas":** La IA lee el último mensaje del cliente y genera tres respuestas completas con diferentes tonos (ej. una directa, una más empática, una con una pregunta de seguimiento), basadas en el `@VOICE` de la marca. El usuario solo tiene que hacer clic en la que más le guste.
        2.  **"Completar mi Frase":** El usuario empieza a escribir (ej. "Nuestras clases de HIIT son...") y la IA completa la frase de forma coherente y "en marca".
        3.  **"Traducir a Tono de Marca":** El usuario escribe una respuesta rápida y directa (ej. "sí, a las 5pm") y la IA la reescribe siguiendo el espectro tonal de la marca (ej. "¡Claro que sí! Con mucho gusto te confirmo que tu clase está reservada para las 5pm. ¡Qué ganas de verte en el Santuario! 💪").
-   **Botón de Envío:** `[Enviar Mensaje]`

---

## E. Panel 3: Contexto del Contacto

Aquí es donde la IA muestra que "recuerda" al cliente.

### 1. Perfil Básico
-   Avatar, Nombre, Email, y otros detalles de contacto.

### 2. Historial de Interacción con la IA
-   **Componente:** Una `Card` titulada "Historial con [Nombre de la Marca]".
-   **Contenido:** Una lista de eventos clave.
    -   `[✅ Reservó clase]` - "Yoga Vinyasa - 15 de Oct"
    -   `[💬 Comentó en Post]` - "Reel sobre nutrición"
    -   `[🛒 Compró]` - "Pack de Bienvenida" (si hay integración con ecommerce).
    -   `[❤️ Es un cliente 'Leal']` - Un tag asignado por la IA basado en su frecuencia de interacción.

### 3. ⭐ Insights del Coach IA para la Conversación ⭐
-   **Componente:** La `Card` de insight destacada.
-   **Título:** "💡 Consejos del Coach para esta conversación"
-   **Contenido Dinámico:**
    -   **Si es un cliente nuevo:** "Esta es su primera conversación. Usa un tono especialmente acogedor. ¡Una gran primera impresión es clave!"
    -   **Si es un cliente leal:** "¡[Nombre] es uno de tus clientes más fieles! Agradécele su lealtad y quizás ofrécele un pequeño extra, como un pase para un amigo."
    -   **Si ha comentado sobre un producto:** "Mencionó que le interesaban los batidos de proteína en un post reciente. Es una buena oportunidad para preguntarle si tiene alguna duda al respecto."

## F. Prompt para Generador de UI (v0.dev)

> A SaaS "Social Inbox" screen using a classic 3-panel layout.
>
> **Left Panel (25% width):** A list of conversations. Each item shows a user's avatar, name, and a snippet of the last message. There's a vertical bar on the far left with icons to filter by social channel (Instagram, Facebook, WhatsApp).
>
> **Center Panel (50% width):** The main chat thread with classic speech bubbles. The key feature is the "Smart Reply Box" at the bottom. It's a `Textarea` with a small, subtle magic wand icon (✨) next to it. Clicking this icon opens a menu with AI actions like "Suggest 3 Replies" and "Rewrite in Brand Tone".
>
> **Right Panel (25% width):** A context panel for the selected contact. It shows their basic profile info. Below that, a crucial "AI Coach Insights" card. This card has a lightbulb icon and gives real-time, context-aware advice for the current conversation, like "This is a new customer, be extra welcoming!" or "This customer is loyal, thank them!".
>
> **Overall aesthetic:** Clean, responsive, and highly functional, inspired by modern messaging apps like Intercom and ContentStudio's inbox. The design should feel familiar but smarter, with the AI assistance seamlessly integrated. Use Inter/Geist font.

## C. Flujo de Datos y Arquitectura

-   **Carga Inicial de Datos (Servidor):** `inbox/page.tsx` es un **Componente de Servidor** que obtiene la lista inicial de conversaciones llamando al servicio `getInboxData()`.
-   **Renderizado y Estado (Cliente):** Los datos se pasan a `InboxClientPage.tsx`. Este **Componente de Cliente** maneja todo el estado, incluyendo cuál es la conversación seleccionada, y orquesta los tres paneles.
-   **Integración con API:** Para conectar con el backend, solo será necesario modificar `inboxService.ts` para que obtenga las conversaciones desde la API de FastAPI. Las interacciones futuras (enviar un mensaje, resolver una conversación) llamarán a funciones específicas en este servicio.