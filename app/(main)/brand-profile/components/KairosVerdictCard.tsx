'use client';

import { Card, CardContent } from "@/components/ui/card";
import { BlockHeader } from "@/components/shared/BlockHeader";
import { BrainCircuit } from "lucide-react";

interface KairosVerdictCardProps {
    content: string;
}

export const KairosVerdictCard = ({ content }: KairosVerdictCardProps) => {
    return (
        <Card className="text-white flex-1 h-full relative overflow-hidden flex flex-col" style={{ backgroundColor: 'var(--brand-primary)' }}>
            <div className="absolute -top-4 -right-4 text-white/5 text-[12rem] font-serif leading-none" aria-hidden="true">"</div>
            <div className="p-6">
                <BlockHeader
                    icon={BrainCircuit}
                    title="La Voz de Kairos"
                    description="Análisis y recomendación de nuestro coach IA."
                />
            </div>
            <CardContent className="pt-0 px-6 pb-6">
                <blockquote className="relative">
                    <p className="text-lg font-medium leading-relaxed text-white/90">"{content}"</p>
                </blockquote>
            </CardContent>
        </Card>
    );
}; 