import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface DashboardSectionProps {
    children: React.ReactNode;
    className?: string;
    title: string;
}

export function DashboardSection({ children, className, title }: DashboardSectionProps) {
    return (
        <fieldset className={cn("flex flex-col h-full", className)}>
            <legend className="sr-only">{title}</legend>
            <Card className="p-6 flex-1 w-full">
                {children}
            </Card>
        </fieldset>
    );
} 