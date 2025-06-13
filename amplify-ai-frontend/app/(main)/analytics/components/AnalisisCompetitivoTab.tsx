import { AiInsightCard } from "./AiInsightCard";
import { CompetitorCard } from "./CompetitorCard";
import { competitiveAnalysisData } from "@/lib/mock-data/metrics";

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