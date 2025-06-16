'use client'

import { mockContentAnalysis } from '@/lib/mock-data/content-analysis';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useTheme } from 'next-themes';
import { themes } from '@/styles/themes';

const ThematicPillarsChart = ({ data }: { data: { theme: string, posts: number }[] }) => {
    const { theme } = useTheme();
    const colors = themes.light.colors; // Using light theme colors for consistency for now
    
    return (
         <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data} layout="vertical" margin={{ left: 10, right: 20 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="theme" width={100} tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                <Bar dataKey="posts" barSize={30} radius={[0, 4, 4, 0]}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors.indigo[500]} opacity={(index / data.length * 0.5) + 0.5} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}

const PostTypesChart = ({ data }: { data: { name: string; value: number; color: string }[] }) => {
    return (
        <ResponsiveContainer width="100%" height={250}>
            <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                     {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    )
}


const PerformanceChart = ({ data }: { data: { month: string; user: number; competitor: number }[] }) => {
    const { theme } = useTheme();
    const colors = themes.light.colors; // Using light theme colors for consistency

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="user" name="Tú" stroke={colors.indigo[500]} strokeWidth={3} />
                <Line type="monotone" dataKey="competitor" name="Competidor" stroke={colors.slate[400]} strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export const ContentAnalysisTab = ({ competitorId }: { competitorId: string }) => {
    const analysis = mockContentAnalysis[competitorId];

    if (!analysis) {
        return (
            <Card>
                <CardContent className="pt-6">
                    <p>
                        No se encontraron datos de análisis de contenido para este
                        competidor. Haz clic en otro competidor para ver su análisis.
                    </p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-6 pt-4">
            <Card>
                <CardHeader>
                    <CardTitle>Rendimiento: Tú (Azul) vs. {analysis.name} (Gris)</CardTitle>
                </CardHeader>
                <CardContent>
                    <PerformanceChart data={analysis.performanceData} />
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><CardTitle>Tipos de Post</CardTitle></CardHeader>
                    <CardContent>
                        <PostTypesChart data={analysis.postTypes} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Pilares Temáticos</CardTitle></CardHeader>
                    <CardContent>
                        <ThematicPillarsChart data={analysis.thematicPillars} />
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-amber-100/40 border-amber-200/60 dark:bg-amber-950/20 dark:border-amber-900/40">
                <CardHeader className="flex flex-row items-start gap-4">
                    <div className="bg-amber-200/60 dark:bg-amber-950/40 p-2 rounded-full">
                        <Lightbulb className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="flex-1">
                        <CardTitle className="text-amber-900 dark:text-amber-200">{analysis.aiCoachInsight.title}</CardTitle>
                        <p className="text-sm text-amber-800/80 dark:text-amber-400/80 mt-1" dangerouslySetInnerHTML={{ __html: analysis.aiCoachInsight.lesson }}/>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <p className="text-sm flex-1">
                           <strong>Recomendación:</strong> {analysis.aiCoachInsight.action}
                        </p>
                        <Button variant='default' className="bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 dark:text-white flex-shrink-0">
                            {analysis.aiCoachInsight.cta}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 