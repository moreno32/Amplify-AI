import { InfoCard } from "@/components/shared/InfoCard";
import { TopPostCard } from "./TopPostCard";
import { mockTopPosts } from "@/lib/mock-data/top-posts";
import { Lightbulb } from "lucide-react";
import { TopPost } from "@/lib/types";

export function TopPostsTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        {mockTopPosts.map((post: TopPost) => (
          <TopPostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="lg:col-span-1">
        <div className="sticky top-6 space-y-6">
          <InfoCard
            variant="primary"
            icon={<Lightbulb className="h-6 w-6 text-primary" />}
            title="Análisis de IA"
            actionButton={{
              label: "Explorar Posts",
            }}
          >
            <p className="text-sm">
              Tu post sobre "Yoga para principiantes" tuvo un <strong>35% más de engagement</strong> que tu media. Considera crear más contenido sobre este tema.
          </p>
          </InfoCard>
        </div>
      </div>
    </div>
  )
} 