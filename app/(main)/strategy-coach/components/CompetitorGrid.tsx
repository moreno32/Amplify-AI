import { ContentBlock } from "@/components/shared/ContentBlock";
import { Competitor } from "@/lib/types";
import { Users } from "lucide-react";
import { StrategyCompetitorCard } from "./StrategyCompetitorCard";

interface CompetitorGridProps {
    competitors: Competitor[];
    onCompetitorSelect: (competitor: Competitor) => void;
}

export const CompetitorGrid = ({ competitors, onCompetitorSelect }: CompetitorGridProps) => {
    return (
        <ContentBlock
            icon={Users}
            title="Competidores Clave"
            description="Analiza las estrategias de tus competidores directos."
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {competitors.map((competitor) => (
                <div key={competitor.id} onClick={() => onCompetitorSelect(competitor)} className="cursor-pointer">
                  <StrategyCompetitorCard 
                    name={competitor.name}
                    logoUrl={competitor.logoUrl}
                    postImageUrl={competitor.postImageUrl}
                  />
                </div>
              ))}
            </div>
        </ContentBlock>
    );
}; 