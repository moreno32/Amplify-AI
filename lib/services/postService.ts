import { Post } from '@/lib/types';
import { mockPosts } from '@/lib/mock-data/calendar-posts';
import { startOfDay, endOfDay } from 'date-fns';

// En un backend real, esta sería una base de datos en memoria o una conexión a BD.
let posts: Post[] = [...mockPosts];

// Simular la latencia de la red
const simulateLatency = (ms: number = 50) => new Promise(resolve => setTimeout(resolve, ms));

export const postService = {
  /**
   * Obtiene los posts para un rango de fechas.
   * En esta simulación, simplemente devolvemos todos los posts.
   * En una implementación real, se usarían startDate y endDate para filtrar en el backend.
   */
  async getPosts(startDate?: Date, endDate?: Date): Promise<Post[]> {
    await simulateLatency();
    
    if (!startDate || !endDate) {
      // Devuelve todos si no hay rango, o maneja el error como prefieras.
      return [...posts];
    }

    const filteredPosts = posts.filter(post => {
      return post.startTime >= startDate && post.startTime <= endDate;
    });

    return filteredPosts;
  },

  /**
   * Actualiza campos específicos de un post.
   */
  async updatePostDetails(postId: string, updates: { content: string }): Promise<Post | null> {
    await simulateLatency();
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex === -1) {
      return null;
    }

    const updatedPost = { ...posts[postIndex], content: updates.content };
    posts[postIndex] = updatedPost;

    console.log("Servicio: Detalles del post actualizados", updatedPost);
    return updatedPost;
  },

  /**
   * Actualiza un post existente, principalmente su fecha de inicio.
   */
  async updatePost(postId: string, updates: Partial<Post>): Promise<Post | null> {
    await simulateLatency();
    
    let updatedPost: Post | null = null;
    
    posts = posts.map(post => {
      if (post.id === postId) {
        updatedPost = { ...post, ...updates };
        return updatedPost;
      }
      return post;
    });

    if (updatedPost) {
      console.log("Servicio: Post actualizado", updatedPost);
    } else {
      console.error("Servicio: No se encontró el post con ID", postId);
    }

    return updatedPost;
  },

  /**
   * Crea un nuevo post.
   */
  async createPost(postData: Partial<Post>): Promise<Post> {
    await simulateLatency();
    const newPost: Post = {
      id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: 'idea',
      category: 'Motivación',
      platform: 'instagram',
      duration: 60,
      ...postData,
      content: postData.content || 'Nuevo borrador de post',
      startTime: postData.startTime || new Date(),
    };
    posts.push(newPost);
    return newPost;
  },

  /**
   * Obtiene un solo post por su ID.
   */
  async getPostById(postId: string): Promise<Post | null> {
    await simulateLatency();
    const post = posts.find(p => p.id === postId);
    return post || null;
  },

  async deletePost(postId: string): Promise<boolean> {
    const initialLength = posts.length;
    const index = posts.findIndex(p => p.id === postId);
    if (index > -1) {
      posts.splice(index, 1);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }
}; 