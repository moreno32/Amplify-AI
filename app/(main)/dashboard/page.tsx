"use client";

import { useModalStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Activity, ArrowUpRight, Users, MessageSquareWarning, Rocket, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const kpiCards = [
    { title: "Tasa de Engagement", value: "4.5%", change: "+0.5%", icon: Activity },
    { title: "Alcance Total", value: "12,3K", change: "+12%", icon: ArrowUpRight },
    { title: "Posts Programados", value: "8", link: "/calendar", icon: Users },
    { title: "Mensajes Pendientes", value: "3", link: "/inbox", icon: MessageSquareWarning }
]

const recommendedActions = [
    { 
        icon: Rocket,
        title: "Lanzar Campaña de Crecimiento",
        description: "Hemos detectado una oportunidad para aumentar tu visibilidad esta semana. ¿Creamos una campaña optimizada?",
        cta: "Empezar con un clic"
    },
    { 
        icon: CheckCircle2,
        title: "Revisar Contenido Generado",
        description: "Hay 4 nuevos posts listos para tu aprobación.",
        cta: "Revisar ahora"
    }
]

const coachInsights = [
    { insight: "Tu competidor @rival ha bajado su frecuencia de publicación. ¡Es el momento perfecto para destacar!" },
    { insight: "El tema 'mindfulness' está ganando tracción en tu sector. ¿Generamos un post sobre ello?", cta: "Crear Post" },
    { insight: "Hemos aprendido que los domingos a las 18:00h es tu mejor hora para publicar." }
]

const upcomingPosts = [
    { image: "/placeholder.svg", copy: "Empezando la semana con energía positiva...", time: "Lunes, 09:00" },
    { image: "/placeholder.svg", copy: "Nuevas clases de Vinyasa Flow disponibles...", time: "Miércoles, 18:30" }
]


export default function DashboardPage() {
  const { onOpen } = useModalStore();

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
        {/* Columna Central (Área de Trabajo) */}
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Hola de nuevo, Amplify User 👋</h1>
                <Button onClick={() => onOpen('createCampaign')}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Crear Nueva Campaña
                </Button>
            </div>

            {/* Métricas Resumen */}
            <div className="grid gap-4 sm:grid-cols-2">
                {kpiCards.map(card => (
                     <Card key={card.title}>
                        <CardHeader className="pb-2">
                            <CardDescription>{card.title}</CardDescription>
                            <CardTitle className="text-4xl">{card.value}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-muted-foreground">
                                {card.change ? `${card.change} vs. semana pasada` : <Link href={card.link || '#'}>Ver sección</Link>}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Acciones Recomendadas por IA */}
            <div>
                <h2 className="text-2xl font-bold mb-4">¿Qué hacemos hoy?</h2>
                <div className="grid gap-4">
                    {recommendedActions.map(action => (
                         <Card key={action.title}>
                            <CardHeader className="flex flex-row items-center gap-4">
                                <action.icon className="h-8 w-8 text-indigo-500" />
                                <div>
                                    <CardTitle>{action.title}</CardTitle>
                                    <CardDescription>{action.description}</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Button size="sm">{action.cta}</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>

        {/* Columna Derecha (Panel de Contexto y Coach) */}
        <div className="grid items-start gap-4 md:gap-8">
            {/* Perfil de Marca Rápido */}
             <Card>
                <CardHeader>
                    <CardTitle>Perfil de Marca</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm">Tono: <strong>Cercano, Educativo</strong></p>
                </CardContent>
            </Card>

            {/* Insights del Coach IA */}
             <Card>
                <CardHeader>
                    <CardTitle>💡 Insights del Coach IA</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    {coachInsights.map((item, i) =>(
                        <div key={i} className="text-sm">
                            <p>{item.insight}</p>
                            {item.cta && <Button variant="link" className="p-0 h-auto mt-1">{item.cta}</Button>}
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Próximas Publicaciones */}
            <Card>
                <CardHeader>
                    <CardTitle>En la Rampa de Lanzamiento</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                     {upcomingPosts.map((post, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <div className="bg-gray-200 h-16 w-16 rounded-md" />
                            <div>
                                <p className="text-sm font-medium">{post.copy}</p>
                                <p className="text-xs text-muted-foreground">{post.time}</p>
                            </div>
                        </div>
                     ))}
                </CardContent>
            </Card>
        </div>
    </div>
  );
} 