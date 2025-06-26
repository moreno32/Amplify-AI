import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface BlockHeaderProps {
    icon: LucideIcon;
    title: string;
    description?: string;
    children?: React.ReactNode;
    titleClassName?: string;
    descriptionClassName?: string;
}

export function BlockHeader({
    icon: Icon,
    title,
    description,
    children,
    titleClassName,
    descriptionClassName,
}: BlockHeaderProps) {
    return (
        <div className="mb-4">
            <div className="flex items-center gap-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                </div>
                <h2 className={cn("text-lg font-semibold tracking-tight", titleClassName)}>{title}</h2>
                {children && <div className="ml-auto">{children}</div>}
            </div>
            {description && (
                <p className={cn("mt-2 text-sm text-muted-foreground", descriptionClassName)}>{description}</p>
            )}
        </div>
    );
} 