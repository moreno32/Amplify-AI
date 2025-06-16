'use client';

import { BrandProfile } from "@/lib/types";

interface HeroJourneyProps {
    data: BrandProfile['core']['heroJourney'];
}

export const HeroJourney = ({ data }: HeroJourneyProps) => {
    return (
        <div className="relative pl-4">
            <div 
                className="absolute left-[23px] top-0 h-full w-1 bg-gradient-to-b from-muted/50 via-[var(--brand-accent)] to-[var(--brand-primary)]"
                aria-hidden="true"
            />
            <ol className="relative space-y-8">
                {data.map((item, index) => (
                    <li
                        key={item.step}
                        className="relative group transition-opacity duration-500 animate-fade-in-up"
                        style={{ animationDelay: `${index * 150}ms` }}
                    >
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-background">
                                    <div className="absolute h-full w-full rounded-full bg-[var(--brand-accent)] opacity-20 group-hover:opacity-30 transition-opacity"></div>
                                    <div className="relative h-5 w-5 rounded-full bg-[var(--brand-accent)] group-hover:scale-110 transition-transform"></div>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="font-semibold text-primary transition-colors group-hover:text-[var(--brand-primary)]">{item.title}</p>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}; 