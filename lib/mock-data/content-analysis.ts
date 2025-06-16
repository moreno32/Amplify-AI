import { CompetitorContentAnalysis } from '@/lib/types';

export const mockContentAnalysis: { [key: string]: CompetitorContentAnalysis } = {
    gymbox: {
        id: 'gymbox',
        name: 'Gymbox',
        performanceData: [
            { month: 'Ene', user: 1200, competitor: 1500 },
            { month: 'Feb', user: 1800, competitor: 2000 },
            { month: 'Mar', user: 2200, competitor: 2800 },
            { month: 'Abr', user: 2500, competitor: 3500 },
            { month: 'May', user: 3000, competitor: 4200 },
            { month: 'Jun', user: 3300, competitor: 4800 },
        ],
        postTypes: [
            { name: 'Reels', value: 60, color: '#8884d8' },
            { name: 'Carruseles', value: 30, color: '#82ca9d' },
            { name: 'Imágenes', value: 10, color: '#ffc658' },
        ],
        thematicPillars: [
            { theme: 'Entrenamientos', posts: 45 },
            { theme: 'Motivación', posts: 25 },
            { theme: 'Nutrición', posts: 20 },
            { theme: 'Comunidad', posts: 10 },
        ],
        publishingPattern: {
            // 0: Dom, 1: Lun, etc. value: 0-1
            '1-8': 0.8, // Lunes 8am
            '2-18': 0.9, // Martes 6pm
            '4-18': 0.9, // Jueves 6pm
            '5-12': 0.7, // Viernes 12pm
        },
        successfulHashtags: [
            { text: '#GymLife', value: 1200 },
            { text: '#FitnessMotivation', value: 1100 },
            { text: '#Workout', value: 950 },
            { text: '#LondonFit', value: 800 },
            { text: '#Gymbox', value: 750 },
            { text: '#TrainHard', value: 600 },
            { text: '#NoPainNoGain', value: 500 },
        ],
        aiCoachInsight: {
            title: "Lección Táctica sobre Gymbox",
            lesson: "Gymbox basa su crecimiento en <strong>Reels de alto impacto publicados los martes y jueves por la tarde</strong>. Su hashtag #LondonFit es clave para atraer a una audiencia local muy específica.",
            action: "Podemos 'contraprogramar' publicando un Reel tuyo sobre un tema similar el martes por la mañana, adelantándonos a su audiencia. Usaremos una variación de su hashtag de éxito para captar parte de su tráfico.",
            cta: "Crear un Reel para el Martes"
        }
    },
    thirdspace: {
        id: 'thirdspace',
        name: 'Third Space',
        performanceData: [
            { month: 'Ene', user: 1200, competitor: 1300 },
            { month: 'Feb', user: 1800, competitor: 1900 },
            { month: 'Mar', user: 2200, competitor: 2500 },
            { month: 'Abr', user: 2500, competitor: 3100 },
            { month: 'May', user: 3000, competitor: 3800 },
            { month: 'Jun', user: 3300, competitor: 4500 },
        ],
        postTypes: [
            { name: 'Carruseles', value: 50, color: '#82ca9d' },
            { name: 'Imágenes', value: 40, color: '#ffc658' },
            { name: 'Reels', value: 10, color: '#8884d8' },
        ],
        thematicPillars: [
            { theme: 'Diseño y Espacio', posts: 55 },
            { theme: 'Bienestar Holístico', posts: 30 },
            { theme: 'Clases Exclusivas', posts: 15 },
        ],
        publishingPattern: {
            '1-20': 0.9, 
            '3-20': 0.9, 
            '6-11': 0.8,
        },
        successfulHashtags: [
            { text: '#LuxuryGym', value: 1500 },
            { text: '#ThirdSpace', value: 1400 },
            { text: '#Wellness', value: 1150 },
            { text: '#Design', value: 900 },
        ],
        aiCoachInsight: {
            title: "Lección Táctica sobre Third Space",
            lesson: "Third Space domina con una estética impecable en <strong>Carruseles de imágenes</strong>, enfocados en el diseño y el bienestar. Publican consistentemente por la noche.",
            action: "Podemos crear un Carrusel de alta calidad mostrando los detalles únicos de O2CW y publicarlo en un horario similar para competir directamente por la misma audiencia.",
            cta: "Diseñar Post de Carrusel"
        }
    },
    // Añadir aquí datos para otros competidores...
};

// Se podrían agregar más análisis para 'third-space', 'barrys', etc. 