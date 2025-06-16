import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cva, VariantProps } from 'class-variance-authority';
import { BlockHeader } from "./BlockHeader";
import React from "react";

const insightCardVariants = cva(
  "border",
  {
    variants: {
      variant: {
        default: "bg-background border-border",
        highlight: "bg-amber-50 border-amber-200 text-amber-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface InsightCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof insightCardVariants> {
  icon: LucideIcon;
  title: string;
  description?: React.ReactNode;
  cta?: {
    text: string;
    props?: React.ComponentProps<typeof Button>;
  }
}

export const InsightCard = ({ variant, icon, title, description, cta, className, ...props }: InsightCardProps) => {
  return (
    <Card className={insightCardVariants({ variant, className })} {...props}>
      <div className="p-6">
        <BlockHeader icon={icon} title={title} />
        {description && (
            <div className="pt-4 text-sm">
                {description}
            </div>
        )}
        {cta && (
            <Button {...cta.props} className="mt-4">
                {cta.text}
            </Button>
        )}
      </div>
    </Card>
  );
}; 