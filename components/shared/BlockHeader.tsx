import { LucideIcon } from "lucide-react";

interface BlockHeaderProps {
    icon: LucideIcon;
    title: string;
    description?: string;
}

export const BlockHeader = ({ icon: Icon, title, description }: BlockHeaderProps) => {
    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex items-center gap-x-3">
                <Icon className="w-5 h-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            {description && (
                <p className="text-sm text-muted-foreground ml-8">
                    {description}
                </p>
            )}
        </div>
    );
}; 