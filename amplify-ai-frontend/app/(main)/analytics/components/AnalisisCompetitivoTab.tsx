import { AiInsightCard } from "./AiInsightCard";
import { CompetitorCard } from "./CompetitorCard";
import { competitiveAnalysisData } from "@/lib/mock-data/metrics";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export function AnalisisCompetitivoTab() {
  const { user, competitors } = competitiveAnalysisData;

  return (
    <div className="space-y-6 mt-4">
      <div className="flex space-x-4 overflow-x-auto pb-4">
        <CompetitorCard
          isUser
          name="Tu Rendimiento"
          logoUrl={user.logoUrl}
          postImageUrl={user.postImageUrl}
          stats={user.stats.map(s => ({...s, userValue: ''}))}
        />
        {competitors.map((competitor) => (
          <CompetitorCard
            key={competitor.name}
            name={competitor.name}
            logoUrl={competitor.logoUrl}
            postImageUrl={competitor.postImageUrl}
            stats={competitor.stats.map(stat => ({ ...stat, userValue: user.stats.find(s => s.label === stat.label)?.value || '' }))}
          />
        ))}
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Análisis de Oportunidades</h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Basado en el análisis de tus competidores, hemos identificado
            que su contenido más exitoso se centra en videos cortos (Reels)
            que muestran &apos;un día en la vida&apos; de sus clientes y tutoriales
            rápidos sobre el uso de equipamiento.
          </p>
        </CardContent>
      </Card>

      <AiInsightCard
        title="Análisis Competitivo"
        ctaText="Convertir Top Post en Reel"
        recommendation={
          <p className="text-muted-foreground">
            Estás superando a todos tus competidores en{' '}
            <strong className="text-primary/90">Tasa de Engagement</strong>, ¡excelente trabajo! Sin embargo,{' '}
            <strong className="text-primary/90">@rival1</strong> está creciendo más rápido en seguidores porque publica Reels a diario.
            <br/><br/>
            <strong>Recomendación:</strong> ¿Probamos a generar un Reel para tu post con más 'Me Gusta' de esta semana?
          </p>
        }
      />
    </div>
  );
}