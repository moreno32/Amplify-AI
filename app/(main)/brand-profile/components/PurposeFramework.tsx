'use client';

import { BrandProfile } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Target, Skull, Shield, Trophy, Zap } from "lucide-react";

interface PurposeFrameworkProps {
    data: BrandProfile['core']['purposeFramework'];
}

const frameworkItems = (data: PurposeFrameworkProps['data']) => [
    { icon: <HelpCircle />, title: "¿Qué problema resuelve?", content: data.problem },
    { icon: <Target />, title: "¿Por qué importa ese problema?", content: data.importance },
    { icon: <Skull />, title: "¿Quién es el villano o causante?", content: data.villain },
    { icon: <Shield />, title: "¿Qué necesita para vencerlo?", content: data.needs },
    { icon: <Trophy />, title: "¿Qué pasará cuando lo venza?", content: data.victory },
    { icon: <Zap />, title: "Nuestra Superpotencia", content: data.superpower },
]

export const PurposeFramework = ({ data }: PurposeFrameworkProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {frameworkItems(data).map((item, index) => (
                <Card key={index}>
                    <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
                        <div className="p-2 bg-muted rounded-md text-[var(--brand-primary)]">
                            {item.icon}
                        </div>
                        <CardTitle className="text-base font-semibold">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{item.content}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}; 