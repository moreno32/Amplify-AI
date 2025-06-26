// import { competitors, userMetrics } from '@/lib/mock-data/competitors' // Ya no se usa para la lista
import { userMetrics } from '@/lib/mock-data/competitors' // Aún usamos las métricas mock del usuario
import { AnalyticsData, Kpi, Post, TopPost } from '@/lib/types'
import { postService } from './postService'
import { competitorService } from './competitorService' // Importar el servicio de competidores

// Mantenemos los datos mock para lo que aún no podemos calcular
const mockKpiData = [
  {
    title: 'Alcance',
    value: '87,345',
    change: '+12.5%',
    changeType: 'increase' as const,
  },
  {
    title: 'Tasa de Engagement',
    value: '4.1%',
    change: '+0.8%',
    changeType: 'increase' as const,
  },
  {
    title: 'Nuevos Seguidores',
    value: '1,204',
    change: '+20.1%',
    changeType: 'increase' as const,
  },
]

const mockChartData = [
  { name: 'Ene', Seguidores: 4000, Engagement: 2.4 },
  { name: 'Feb', Seguidores: 3000, Engagement: 3.9 },
  { name: 'Mar', Seguidores: 2000, Engagement: 2.8 },
  { name: 'Abr', Seguidores: 2780, Engagement: 3.0 },
  { name: 'May', Seguidores: 1890, Engagement: 4.8 },
  { name: 'Jun', Seguidores: 2390, Engagement: 3.8 },
  { name: 'Jul', Seguidores: 3490, Engagement: 4.3 },
]

// Función para mapear un Post a un TopPost
function mapPostToTopPost(post: Post): TopPost {
  if (!post.metrics) {
    // Esto no debería pasar si filtramos bien, pero es un resguardo
    return {
      id: post.id,
      imageUrl: post.imageUrl || '/placeholder.svg',
      mainStat: { label: 'Likes', value: 'N/A' },
      secondaryStats: { likes: 0, comments: 0 }
    }
  }

  return {
    id: post.id, // El tipo TopPost tiene id: number, pero lo adaptaremos para usar el string id del Post.
    imageUrl: post.imageUrl || '/placeholder.svg', // Proveer un placeholder si no hay imagen
    mainStat: {
      label: 'Likes', // Podríamos hacerlo dinámico, pero por ahora Likes es un buen default
      value: post.metrics.likes.toLocaleString('es-ES'),
    },
    secondaryStats: {
      likes: post.metrics.likes,
      comments: post.metrics.comments,
    },
  };
}

export async function getAnalyticsData(): Promise<AnalyticsData> {
  // Obtenemos los posts y competidores en paralelo para más eficiencia
  const [allCompanyPosts, competitorsList] = await Promise.all([
    postService.getPosts(),
    competitorService.getCompetitors()
  ]);

  // 1. Calcular KPI "Posts Publicados"
  const publishedPostsCount = allCompanyPosts.filter(p => p.status === 'published').length;
  const publishedPostsKpi: Kpi = {
    title: 'Posts Publicados',
    value: publishedPostsCount.toString(),
    change: '', 
    changeType: 'increase',
  };

  const finalKpis = [...mockKpiData, publishedPostsKpi];

  // 2. Calcular Top Posts
  const topPostsData: TopPost[] = allCompanyPosts
    .filter(p => p.status === 'published' && p.metrics && p.metrics.likes > 0)
    .sort((a, b) => (b.metrics?.likes ?? 0) - (a.metrics?.likes ?? 0))
    .slice(0, 4) 
    .map(mapPostToTopPost);
  
  // 3. Ensamblar todos los datos
  return {
    performance: {
      kpis: finalKpis,
      chartData: mockChartData, 
    },
    competitors: {
      user: userMetrics, // Mantenemos las métricas del usuario como mock
      list: competitorsList, // Usamos la lista real de la DB
    },
    topPosts: topPostsData, 
  }
} 