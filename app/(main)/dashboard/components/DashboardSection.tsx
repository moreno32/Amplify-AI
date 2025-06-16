import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BlockHeader } from "@/components/shared/BlockHeader";
import { LucideIcon } from "lucide-react";
import React from "react";

interface DashboardSectionProps {
    icon: LucideIcon;
    title: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
}

export const DashboardSection = ({ icon, title, description, children, className }: DashboardSectionProps) => {
    return (
        <Card className={className}>
            <CardHeader>
                <BlockHeader icon={icon} title={title} description={description} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}; 