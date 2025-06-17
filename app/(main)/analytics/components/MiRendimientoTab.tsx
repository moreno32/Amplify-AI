import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard } from "./KpiCard";
import { BarChart, Heart, Users, Grid, LineChart, Lightbulb } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AiInsightCard } from "./AiInsightCard";
import { ContentBlock } from "@/components/shared/ContentBlock";
import { AnalyticsData } from "@/lib/types";

interface MiRendimientoTabProps {
  data: AnalyticsData['performance'];
}

export function MiRendimientoTab({ data }: MiRendimientoTabProps) {
  const { kpis, chartData } = data;

  return (
    <div className="space-y-6 mt-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.title} title={kpi.title} value={kpi.value} change={kpi.change} changeType={kpi.changeType} icon={<BarChart className="h-4 w-4 text-muted-foreground" />} />
        ))}
      </div>

      <ContentBlock
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
      </ContentBlock>

      <ContentBlock
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
      </ContentBlock>
    </div>
  );
} 