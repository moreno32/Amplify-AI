import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard } from "./KpiCard";
import { BarChart, Heart, Users, Grid, LineChart, Lightbulb } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AiInsightCard } from "./AiInsightCard";
import { DashboardSection } from "@/app/(main)/dashboard/components/DashboardSection";

const kpiData = [
    { title: "Alcance", value: "87,345", change: "+12.5%", changeType: 'increase' as const, icon: <BarChart className="h-4 w-4 text-muted-foreground" /> },
    { title: "Tasa de Engagement", value: "4.1%", change: "+0.8%", changeType: 'increase' as const, icon: <Heart className="h-4 w-4 text-muted-foreground" /> },
    { title: "Nuevos Seguidores", value: "1,204", change: "+20.1%", changeType: 'increase' as const, icon: <Users className="h-4 w-4 text-muted-foreground" /> },
    { title: "Posts Publicados", value: "12", change: "-15%", changeType: 'decrease' as const, icon: <Grid className="h-4 w-4 text-muted-foreground" /> },
];

const chartData = [
  { name: 'Ene', Seguidores: 4000, Engagement: 2.4 },
  { name: 'Feb', Seguidores: 3000, Engagement: 3.9 },
  { name: 'Mar', Seguidores: 2000, Engagement: 2.8 },
  { name: 'Abr', Seguidores: 2780, Engagement: 3.0 },
  { name: 'May', Seguidores: 1890, Engagement: 4.8 },
  { name: 'Jun', Seguidores: 2390, Engagement: 3.8 },
  { name: 'Jul', Seguidores: 3490, Engagement: 4.3 },
];

export function MiRendimientoTab() {
  return (
    <div className="space-y-6 mt-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>

      <DashboardSection
        icon={LineChart}
        title="Evolución de Seguidores y Engagement"
      >
        <div className="h-[300px] -ml-4">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorSeguidores" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <Tooltip
                    contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                    }}
                />
                <Area yAxisId="left" type="monotone" dataKey="Seguidores" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorSeguidores)" />
                <Area yAxisId="right" type="monotone" dataKey="Engagement" stroke="hsl(var(--secondary))" fillOpacity={1} fill="url(#colorEngagement)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
      </DashboardSection>

      <DashboardSection
        icon={Lightbulb}
        title="Conclusión del Coach"
      >
        <p className="text-muted-foreground">
            Tu crecimiento de seguidores se aceleró un 30% después de la campaña{' '}
            <strong className="text-primary/90">'Promo Verano'</strong>, 
            pero tu tasa de engagement se ha mantenido estable.
            <br/><br/>
            <strong>Recomendación:</strong> Lancemos una campaña de 'Interacción' con preguntas y encuestas para activar a tu nueva audiencia.
        </p>
      </DashboardSection>
    </div>
  );
} 