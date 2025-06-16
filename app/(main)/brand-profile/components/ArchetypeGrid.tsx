'use client';

import { BrandProfile } from "@/lib/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ArchetypeGridProps {
    data: BrandProfile['core']['archetypeMatrix'];
}

export const ArchetypeGrid = ({ data }: ArchetypeGridProps) => {
    const { primary, secondary, tertiary, all } = data;

    const getArchetypeStyle = (name: string) => {
        if (name === primary.name) return { backgroundColor: `hsla(var(--brand-primary-hsl), 1)` };
        if (name === secondary.name) return { backgroundColor: `hsla(var(--brand-primary-hsl), 0.7)` };
        if (tertiary && name === tertiary.name) return { backgroundColor: `hsla(var(--brand-primary-hsl), 0.4)` };
        return {};
    }
    
    const getArchetypeClass = (name: string) => {
        if (name === primary.name || name === secondary.name || (tertiary && name === tertiary.name)) return "text-white";
        return "hover:bg-muted/50";
    }

    return (
        <TooltipProvider delayDuration={100}>
            <div className="grid grid-cols-3 border-t border-l border-border">
                {all.map((archetype) => (
                    <Tooltip key={archetype.name}>
                        <TooltipTrigger asChild>
                            <div 
                                className={cn("border-b border-r border-border p-6 text-center transition-colors duration-200", getArchetypeClass(archetype.name))}
                                style={getArchetypeStyle(archetype.name)}
                            >
                                <h4 className="font-bold text-lg">{archetype.name}</h4>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{archetype.description}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </div>
        </TooltipProvider>
    );
}; 