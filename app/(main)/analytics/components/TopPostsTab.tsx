import { TopPostCard } from "./TopPostCard";
import { AiInsightCard } from "./AiInsightCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TopPost } from "@/lib/types";

interface TopPostsTabProps {
  data: TopPost[];
}

export function TopPostsTab({ data }: TopPostsTabProps) {
  return (
    <div className="space-y-6 mt-4">
      <div className="flex justify-end">
        <Select defaultValue="alcance">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Ordenar por..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alcance">Más Alcance</SelectItem>
            <SelectItem value="likes">Más Likes</SelectItem>
            <SelectItem value="comentarios">Más Comentarios</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((post) => (
          <TopPostCard key={post.id} post={post} />
        ))}
      </div>

      <AiInsightCard
        title="Patrón de Éxito"
        ctaText="Actualizar Guía de Estilo de IA"
        recommendation={
          <p className="text-muted-foreground">
            Tus 3 posts con más comentarios son aquellos en los que haces una{' '}
            <strong className="text-primary/90">pregunta directa</strong> en la primera línea del copy. ¡A tu audiencia le encanta participar!
            <br/><br/>
            <strong>Recomendación:</strong> La IA puede asegurar que tus futuros posts sigan este patrón.
          </p>
        }
      />
    </div>
  );
} 