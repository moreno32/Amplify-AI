'use client';

import React, { useState } from "react";
import { BrandProfile } from "@/lib/types";
import { cn } from "@/lib/utils";

interface GoldenCircleProps {
    data: BrandProfile['core']['goldenCircle'];
}

type CircleSection = 'why' | 'how' | 'what';

export const GoldenCircle = ({ data }: GoldenCircleProps) => {
    const [activeCircle, setActiveCircle] = useState<CircleSection>('why');

    const sections: { id: CircleSection; title: string; content: string }[] = [
        { id: 'why', title: data.why.title, content: data.why.content },
        { id: 'how', title: data.how.title, content: data.how.content },
        { id: 'what', title: data.what.title, content: data.what.content },
    ];

    const getCircleStyle = (id: CircleSection, activeId: CircleSection): React.CSSProperties => {
        const style: React.CSSProperties = {
            borderColor: `var(--brand-accent)`,
            borderWidth: '2px',
            transition: 'all 0.3s ease-in-out',
            position: 'absolute',
            borderRadius: '50%',
        };

        if (id === 'what') {
            if (activeId === 'what') {
                style.backgroundColor = `var(--brand-primary)`;
                style.borderStyle = 'solid';
            } else {
                style.backgroundColor = 'transparent';
                style.borderStyle = 'dashed';
            }
        } else { // For WHY and HOW
            if (activeId === 'what') {
                style.backgroundColor = 'hsl(var(--background))';
                style.borderStyle = 'dashed';
            } else if (activeId === id) {
                style.backgroundColor = `var(--brand-primary)`;
                style.borderStyle = 'solid';
            } else {
                style.backgroundColor = 'transparent';
                style.borderStyle = 'dashed';
            }
        }
        return style;
    };

    const getTextStyle = (id: CircleSection, activeId: CircleSection) => {
        if (activeId === id) return 'text-white';
        if (activeId === 'what' && (id === 'why' || id === 'how')) return 'text-primary';
        return 'text-muted-foreground';
    };

    const circlePositions: Record<CircleSection, React.CSSProperties> = {
        what: { width: '85%', height: '85%', top: '7.5%', left: '15%' },
        how: { width: '65%', height: '65%', top: '17.5%', left: '20%' },
        why: { width: '40%', height: '40%', top: '30%', left: '25%' },
    };

    const textPositions: Record<CircleSection, React.CSSProperties> = {
        what: { top: '50%', right: '15%', transform: 'translateY(-50%)' },
        how: { top: '50%', right: '35%', transform: 'translateY(-50%)' },
        why: { top: '50%', left: '45%', transform: 'translate(-50%, -50%)' },
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 py-8 min-h-[350px]">
            <div className="relative w-full max-w-sm mx-auto aspect-square">
                {/* Circles */}
                <div style={{ ...getCircleStyle('what', activeCircle), ...circlePositions.what, zIndex: 1 }} />
                <div style={{ ...getCircleStyle('how', activeCircle), ...circlePositions.how, zIndex: 2 }} />
                <div style={{ ...getCircleStyle('why', activeCircle), ...circlePositions.why, zIndex: 3 }} />

                {/* Text Labels */}
                <div style={{ ...textPositions.what, zIndex: 4 }} className="absolute cursor-pointer" onMouseEnter={() => setActiveCircle('what')}>
                    <span className={cn("font-bold text-lg", getTextStyle('what', activeCircle))}>WHAT</span>
                </div>
                <div style={{ ...textPositions.how, zIndex: 5 }} className="absolute cursor-pointer" onMouseEnter={() => setActiveCircle('how')}>
                    <span className={cn("font-bold text-lg", getTextStyle('how', activeCircle))}>HOW</span>
                </div>
                <div style={{ ...textPositions.why, zIndex: 6 }} className="absolute cursor-pointer" onMouseEnter={() => setActiveCircle('why')}>
                    <span className={cn("font-bold text-lg", getTextStyle('why', activeCircle))}>WHY</span>
                </div>
            </div>
            <div className="space-y-6">
                {sections.map(section => (
                    <div key={section.id} onMouseEnter={() => setActiveCircle(section.id)} className="cursor-pointer">
                        <h4 className={cn("text-xl font-bold transition-colors", activeCircle === section.id ? 'text-[var(--brand-primary)]' : '')}>
                            {section.title} ({section.id.toUpperCase()})
                        </h4>
                        <p className="text-muted-foreground mt-1">{section.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}; 