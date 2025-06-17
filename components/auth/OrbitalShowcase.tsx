'use client';

import { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import {
  CalendarDays,
  PenSquare,
  BarChart3,
  TrendingUp,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Mock content components for cards
const PlanCardContent = () => (
  <div className="p-2 h-full flex flex-col text-gray-900">
    <div className="flex justify-between items-center mb-1.5 px-1">
      <p className="font-bold text-xs">Febrero 2024</p>
      <div className="flex gap-1">
        <div className="w-2.5 h-2.5 rounded-full bg-pink-400"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-blue-400"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
      </div>
    </div>
    <div className="grid grid-cols-7 text-[10px] text-center text-gray-500">
      {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d) => (
        <div key={d}>{d}</div>
      ))}
    </div>
    <div className="grid grid-cols-7 text-[10px] text-center mt-1 flex-1">
      {Array.from({ length: 35 }).map((_, i) => {
        const day = i - 3;
        const isToday = day === 12;
        const hasEvent = [8, 15, 22].includes(day);
        return (
          <div
            key={i}
            className={cn(
              'h-6 w-6 rounded-full flex items-center justify-center aspect-square mx-auto',
              day > 0 && day <= 29 ? '' : 'text-gray-300',
              isToday && 'bg-primary text-primary-foreground font-bold',
              hasEvent && 'relative'
            )}
          >
            {day > 0 && day <= 29 ? day : ''}
            {hasEvent && <div className="absolute bottom-1 w-1 h-1 bg-pink-400 rounded-full"></div>}
          </div>
        );
      })}
    </div>
  </div>
);

const CreateCardContent = () => (
    <div className="p-2 h-full flex flex-col text-gray-900">
      <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex-1 flex flex-col">
        {/* Instagram Post Header */}
        <div className="flex items-center gap-2 flex-shrink-0 mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex-shrink-0"></div>
          <div>
            <p className="font-bold text-xs">Sofia Rey</p>
            <p className="text-[10px] text-gray-500">@sofiacreates</p>
          </div>
        </div>
        
        {/* Post Text */}
        <p className="text-xs text-slate-800 flex-shrink-0">
            Desbloquea el potencial de tu marca con IA. 🚀 Lleva tu contenido al siguiente nivel. #MarketingInteligente #AmplifyAI
        </p>

        {/* Action Button */}
        <div className="flex-1 flex items-end mt-2">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-center py-2 rounded-md text-xs font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Visual del Post
            </motion.button>
        </div>
      </div>
    </div>
);


const AnalyzeCardContent = () => (
    <div className="p-3 h-full flex flex-col text-gray-900">
        <div className="flex justify-between items-start mb-2">
            <div>
                <p className="font-semibold text-xs text-gray-600">Impresiones</p>
                <p className="text-xl font-bold">1.2M</p>
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="font-semibold text-xs">+14%</span>
            </div>
        </div>
        <div className="flex-1 flex items-end gap-1">
            {
                [0.4, 0.6, 0.5, 0.7, 0.9, 0.75, 0.8, 0.6, 0.5, 0.85, 0.6].map((h, i) => (
                    <div key={i} className="w-full bg-gradient-to-b from-blue-400 to-blue-500 rounded-t-sm" style={{ height: `${h * 100}%` }}></div>
                ))
            }
        </div>
    </div>
);


const cards = [
  {
    id: 'plan',
    title: 'Planifica',
    description: 'Calendario de Contenidos Inteligente',
    icon: CalendarDays,
    color: 'bg-blue-500',
    tag: 'Calendario',
    content: <PlanCardContent />,
  },
  {
    id: 'create',
    title: 'Crea',
    description: 'Generador de Posts con IA',
    icon: PenSquare,
    color: 'bg-pink-500',
    tag: 'Estudio IA',
    content: <CreateCardContent />,
  },
  {
    id: 'analyze',
    title: 'Analiza',
    description: 'Métricas de Rendimiento Claras',
    icon: BarChart3,
    color: 'bg-green-500',
    tag: 'Métricas',
    content: <AnalyzeCardContent />,
  },
];

export const OrbitalShowcase = () => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (event.clientX - left) / width - 0.5;
    const y = (event.clientY - top) / height - 0.5;
    mouseX.set(x * 20); // Multiplier for rotation effect
    mouseY.set(y * -20);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full"
      style={{ perspective: 1000 }}
    >
        <motion.div
            className="w-full h-full"
            style={{
                transformStyle: 'preserve-3d',
                rotateY: mouseX,
                rotateX: mouseY,
            }}
        >
            {cards.map((card, i) => (
            <AnimatedCard key={card.id} card={card} index={i} total={cards.length} />
            ))}
      </motion.div>
    </div>
  );
};

const AnimatedCard = ({ card, index, total }: { card: (typeof cards)[0], index: number, total: number }) => {
    const t = useMotionValue(0);
    
    useAnimationFrame((time) => {
        const angle = (time / 5000) + (index * (2 * Math.PI) / total);
        t.set(angle);
    });

    const x = useTransform(t, (angle) => `${Math.cos(angle) * 160}px`);
    const y = useTransform(t, (angle) => `${Math.sin(angle) * 40}px`);
    const z = useTransform(t, (angle) => Math.sin(angle + Math.PI / 2) * 120);
    const scale = useTransform(z, [-120, 120], [0.7, 1.1]);
    const opacity = useTransform(z, [-120, 120], [0.3, 1]);

    return (
        <motion.div
            className="absolute top-1/2 left-1/2"
            style={{ 
                x: '-50%',
                y: '-50%',
                translateX: x,
                translateY: y,
                translateZ: z,
                scale,
                opacity,
                zIndex: z.get(),
             }}
        >
            <Card
                className="w-64 h-80 bg-gradient-to-br from-white to-slate-50 shadow-2xl text-gray-900 rounded-2xl border border-white/20"
            >
                <CardContent className="p-0 h-full">
                    <div className="p-4 border-b border-slate-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-md", card.color)}>
                                    <card.icon className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-base ml-3">{card.title}</h3>
                            </div>
                            <Badge className={cn(card.color, "text-white shadow-md text-xs")}>{card.tag}</Badge>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{card.description}</p>
                    </div>
                    <div className="h-[calc(100%-92px)]">
                       {card.content}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
} 