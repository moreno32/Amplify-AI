import { StatCard } from "@/components/shared/StatCard";
import { mockMetricsData } from "@/lib/mock-data/metrics";
import { BarChart, Lightbulb, LineChart, Users, Heart, Grid } from "lucide-react";
import { InfoCard } from "@/components/shared/InfoCard";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ContentBlock } from "@/components/shared/ContentBlock";
import { AnalyticsData } from "@/lib/types";

interface MiRendimientoTabProps {
  data: AnalyticsData['performance'];
}

export function MiRendimientoTab({ data }: MiRendimientoTabProps) {
  const { kpis, chartData } = data;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockMetricsData.map((kpi) => (
          <StatCard 
            key={kpi.title} 
            title={kpi.title} 
            value={kpi.value} 
            change={`${kpi.change}%`}
            changeType={kpi.changeType} 
            icon={<BarChart className="h-4 w-4 text-muted-foreground" />} 
          />
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

      <InfoCard
        variant="primary"
        icon={<Lightbulb className="h-6 w-6 text-primary" />}
        title="Análisis de IA"
        actionButton={{
          label: "Ver posts relacionados",
        }}
      >
        <p className="text-sm">
          Tu <strong>tasa de engagement</strong> ha subido un <strong>0.8%</strong>. Esto se debe principalmente a tus posts en formato "Reel", que están funcionando un <strong>25% mejor</strong> que las imágenes estáticas.
        </p>
      </InfoCard>
    </div>
  );
} 