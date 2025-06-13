# 📦 Amplify AI – Descripción Integral del Proyecto

> *Contenido que vende, estrategia que enseña, conversación que fideliza.*

## 📋 Índice
- [¿Qué es Amplify AI?](#-qué-es-amplify-ai)
- [¿Cómo funciona?](#-cómo-funciona)
- [¿Para quién es?](#-para-quién-es)
- [Ventajas Competitivas](#-ventajas-competitivas)
- [Features Destacadas](#-features-destacadas)
- [Navegación por Interfaz](#-navegación-por-interfaz)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura](#-arquitectura)
- [Pipeline RAG](#-pipeline-rag)
- [Módulos Funcionales](#-módulos-funcionales)
- [Roadmap](#-roadmap)
- [Modelo de Negocio](#-modelo-de-negocio)
- [Caso de Uso](#-caso-de-uso)

## 🧠 ¿Qué es Amplify AI?

**Amplify AI** es una plataforma SaaS inteligente que automatiza la creación de campañas de Instagram, compara tu estrategia con la competencia y centraliza la comunicación con tus clientes. Combina IA generativa, planificación estratégica, análisis competitivo, influencers y gestión de mensajes en una sola interfaz minimalista.

## ⚙️ ¿Cómo funciona?

1. Onboarding con inputs de marca (web, imágenes, tono)
2. Generación de perfil inteligente de marca
3. Sugerencia de calendario óptimo de publicaciones
4. Generación de imagen + copy IA por post
5. Edición o aprobación y publicación automática
6. Análisis de métricas e insights comparativos
7. Sugerencia de microinfluencers por sector y ciudad
8. Gestión de mensajes entrantes desde Instagram, Facebook y WhatsApp vía **Social Inbox** con respuestas asistidas por IA

## 🎯 ¿Para quién es?

| Segmento          | Necesidad                            |
|-------------------|--------------------------------------|
| Emprendedores     | Hacer marketing sin agencia          |
| Marcas personales | Mantener coherencia y crecer         |
| Negocios locales  | Visibilidad digital fácil y efectiva |
| Startups          | Validar y crecer con bajo presupuesto|
| Agencias pequeñas | Gestionar múltiples marcas desde un solo dashboard |

## 🏆 Ventajas Competitivas

- Generación, planificación y respuesta en un solo lugar
- Coach IA que explica por qué cada recomendación funciona
- Análisis competitivo visual y accionable
- Social Inbox multicanal con IA
- IA local (Ollama) = costes bajos + privacidad alta
- UX inspirada en Apple/OpenAI

## 🌟 Features Destacadas

- 🧠 **BrandProfiler** - Análisis de marca
- 📅 **CampaignPlanner** - Planificación de campañas
- 🎨 **PostGenerator** - Generación de imagen + copy IA
- ✍️ **PostEditor** - Edición de contenido
- 📊 **MetricsTracker** - Seguimiento de métricas
- 🧭 **StrategyCoach** - Asesoramiento estratégico
- 🌍 **InfluencerMatcher** - Matching con influencers
- ✉️ **Social Inbox** - Gestión multicanal con IA

## 🗺️ Navegación por Interfaz

| Pantalla           | Propósito                          | Elementos clave                    |
|--------------------|------------------------------------|-----------------------------------|
| Login / Registro   | Acceso rápido y profesional        | OAuth, animación clean            |
| Onboarding         | Captura de inputs de marca         | Upload guía Markdown + imágenes   |
| Dashboard          | Control total de campañas          | CTA crear, métricas resumen       |
| Crear Campaña      | Brief estratégico simplificado     | Form mini o IA autocompleta       |
| Calendario         | Visualizar y editar planificación  | Vista mensual, drag & drop        |
| Generador de Posts | Revisión y ajuste del contenido    | Imagen + copy + IA Regenerar      |
| Métricas           | Análisis de rendimiento            | Gráficas, KPIs, insights IA       |
| Strategy Coach     | Aprendizaje continuo               | Comparativa + lecciones           |
| Influencer Match   | Ampliar alcance estratégico        | Fichas con data y CTA contacto    |
| Social Inbox       | Comunicación directa desde la app  | Chat multicanal con IA            |
| Perfil de Marca    | Personalización visual y tonal     | Color, tipografía, estilo         |

## 🧱 Stack Tecnológico

### Frontend (MVP)
- **Framework**: Streamlit
- **UI & Estilo**: Tailwind CSS + shadcn/ui
- **Estado**: Zustand
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Animaciones**: Framer Motion
- **Auth**: Supabase / Clerk
- **Deploy**: Vercel

### Backend
- **API**: FastAPI
- **Agente**: LangChain
- **LLMs**: qwen3:8b · qwen3:4b vía Ollama
- **Embeddings**: paraphrase-multilingual-mpnet-base-v2
- **Vector Store**: Chroma (persistente)
- **Clasificación**: Scikit-learn
- **Generación de imagen**: Stable Diffusion
- **Contenedores**: Docker + Docker Compose
- **CI/CD**: GitHub Actions (planificado)

## 🧠 Arquitectura

```text
┌────────────┐        REST              ┌──────────────┐
│ Streamlit  │ ───────────────────────▶ │   FastAPI    │
│  Frontend  │ <──────── WebSocket ──── │  Backend     │
└──────┬─────┘                          └──────┬───────┘
       │ UI Events                             │
       ▼                                       ▼
┌────────────┐        LangChain Agents   ┌──────────────┐
│ PostEditor │◀──────────────────────────│ BrandProfiler│
└────────────┘                           └─────┬────────┘
                Vector Search (Chroma)         │
                         ▲                    RAG
                         │                    │
                  Embeddings HF               ▼
                         │            ┌──────────────┐
               ┌─────────┴─────────┐  │Social Inbox  │
               │ Stable Diffusion  │  └──────────────┘
               └───────────────────┘
```

## 🧪 Pipeline RAG

1. **Carga y Chunking**
   - UnstructuredMarkdownLoader + MarkdownHeaderTextSplitter
   - Chunking jerárquico estructurado por títulos #, ##

2. **Embeddings y Vector Store**
   - Embeddings HF → Chroma (persist_directory=db/chroma)

3. **Retrieval**
   - MultiQueryRetriever genera variantes de query
   - MMR selecciona chunks balanceando diversidad + relevancia

4. **Generación Final**
   - LLM principal qwen3:8b produce contenido
   - Post-procesamiento: tono, CTA, hashtags

## 🧩 Módulos Funcionales

| Módulo           | Entradas              | Salidas           | Tooling                    |
|------------------|----------------------|-------------------|----------------------------|
| BrandProfiler    | Markdown + imágenes  | JSON perfil marca | LangChain + CLIP          |
| CampaignPlanner  | Perfil + objetivos   | Calendario óptimo | Heurística interna        |
| PostGenerator    | Brief + calendario   | Copy + imagen IA  | Stable Diffusion + LLM    |
| PostEditor       | Post generado        | Versión final     | Frontend + LangChain      |
| MetricsTracker   | API Meta            | KPIs             | FastAPI + cache           |
| StrategyCoach    | KPIs + competencia   | Consejos         | LLM + prompt tuning       |
| InfluencerMatcher| Sector + ciudad      | Influencers      | API externa + ranking     |
| Social Inbox     | APIs redes sociales  | Conversaciones   | Meta/TikTok API + LLM     |

## 🛣️ Roadmap

- ✅ **Fase 1**: MVP con RAG avanzado y UI Streamlit
- 🟡 **Fase 2**: Frontend React + Tailwind + deploy en Vercel
- 🟡 **Fase 3**: A/B Testing + análisis visual de posts
- 🔜 **Fase 4**: Evaluador automático + guardrails + trazabilidad
- 🔜 **Fase 5**: Modo Agencia + API pública + Generador de Reels

## 💸 Modelo de Negocio

| Plan     | Precio aprox. | Incluye                                    | Upsells        |
|----------|---------------|--------------------------------------------|----------------|
| Free     | €0            | 10 posts/mes, watermark Amplify, métrica básica | Pack Growth    |
| Growth   | €39/mes       | Multi-canal, métricas avanzadas, Influencer Match | Reels Pack     |
| Pro      | €99/mes       | Social Inbox completo, Strategy Coach completo | Asistencia IA 1-1 |
| Agency   | €249/mes      | Multi-marca, API, white-label             | Integración CRM |

## 👟 Caso de Uso

**Marta, dueña de un estudio de yoga en Madrid:**

1. Completa el onboarding → Amplify AI detecta su tono relajado y paleta natural
2. Lanza una campaña de 3 semanas con Reels de clases, testimonios y promociones
3. Edita dos textos con el PostEditor y publica todo automáticamente
4. Descubre que los domingos a las 18:00 tienen 30% más engagement vs su competencia
5. Contacta a una influencer local sugerida por la app con mensaje IA pre-redactado
6. Responde desde el Inbox un DM de una clienta con solo un clic

**Resultado**: más reservas, más alcance y 0 fricción técnica
