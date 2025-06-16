'use client';

import { BrandProfile } from "@/lib/types";
import { RitualCard } from "./RitualCard";

interface RitualsProps {
    data: BrandProfile['core']['contentPillars'];
}

export const Rituals = ({ data }: RitualsProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.pillars.map((pillar, index) => (
                <RitualCard
                    key={pillar.name}
                    title={pillar.name}
                    description={pillar.description}
                    imageUrl={`https://picsum.photos/400/400?random=${index}`}
                    isPriority={index < 2}
                />
            ))}
        </div>
    );
}; 