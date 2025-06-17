'use client';

import { motion } from 'framer-motion';
import { BarChart, CalendarDays, Sparkles } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line } from 'recharts';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

// --- Tarjetas Narrativas ---
const cardBaseStyle = "absolute flex h-96 w-72 flex-col p-6 text-white shadow-2xl rounded-2xl";
const cardGradient = "bg-gradient-to-br from-white/10 to-transparent";

const PlanCard = () => (
    <Card className={`flex ${cardBaseStyle} ${cardGradient}`}>
        <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2"><CalendarDays className="h-5 w-5" /> <h3 className="text-lg font-semibold">Planifica</h3></div>
            <Badge variant="secondary" className="border-transparent bg-black/20 text-white">Calendario</Badge>
        </div>
        <div className="space-y-3 rounded-lg bg-black/20 p-4">
            <div className="h-5 w-3/4 rounded-full bg-white/25" />
            <div className="h-5 w-1/2 rounded-full bg-white/25" />
            <div className="h-5 w-5/6 rounded-full bg-white/25" />
        </div>
    </Card>
);

const CreateCard = () => (
    <Card className={`flex ${cardBaseStyle} ${cardGradient}`}>
        <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-yellow-300" /> <h3 className="text-lg font-semibold">Crea</h3></div>
            <Badge variant="secondary" className="border-transparent bg-black/20 text-white">Estudio IA</Badge>
        </div>
        <div className="h-52 w-full overflow-hidden rounded-lg bg-black/20">
            <motion.img
                src="https://picsum.photos/seed/amplify-final-static/400/400"
                alt="AI Generated"
                className="h-full w-full object-cover"
            />
        </div>
    </Card>
);

const AnalyzeCard = () => (
    <Card className={`flex ${cardBaseStyle} ${cardGradient}`}>
        <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2"><BarChart className="h-5 w-5 text-green-400" /> <h3 className="text-lg font-semibold">Analiza</h3></div>
            <Badge variant="secondary" className="border-transparent bg-black/20 text-white">Métricas</Badge>
        </div>
        <p className="text-lg text-white/70">Engagement</p>
        <p className="text-5xl font-bold">12.8%</p>
         <div className="mt-2 flex items-center gap-2 text-lg text-green-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v12" /></svg>
            <span>+2.1%</span>
        </div>
    </Card>
);

// --- Contenedor Principal y Coreografía de Carga ---
const containerVariants = {
    initial: {},
    animate: {
        transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
};

const cardVariants = {
    initial: { y: 40, opacity: 0 },
    animate: { y: 0, opacity: 1 },
};

export function VisualMockup() {
    return (
        <div
            className="relative flex h-full w-full items-center justify-center bg-black"
            style={{ perspective: '1200px' }}
            aria-hidden="true"
        >
            <motion.div
                style={{ transformStyle: 'preserve-3d' }}
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="relative h-[450px] w-[550px]"
            >
                {/* Tarjeta de Fondo: Analiza */}
                <motion.div variants={cardVariants} transition={{ duration: 0.8, ease: "easeOut" }} className="absolute inset-0" style={{transform: 'rotateY(25deg) translateX(220px) scale(0.9)', zIndex: 1}}>
                    <AnalyzeCard />
                </motion.div>
                {/* Tarjeta del Medio: Crea */}
                <motion.div variants={cardVariants} transition={{ duration: 0.8, ease: "easeOut" }} className="absolute inset-0" style={{transform: 'rotateY(0deg) scale(0.95)', zIndex: 2}}>
                    <CreateCard />
                </motion.div>
                {/* Tarjeta Frontal: Planifica */}
                <motion.div variants={cardVariants} transition={{ duration: 0.8, ease: "easeOut" }} className="absolute inset-0" style={{transform: 'rotateY(-25deg) translateX(-220px) scale(1)', zIndex: 3}}>
                    <PlanCard />
                </motion.div>
            </motion.div>
        </div>
    );
} 