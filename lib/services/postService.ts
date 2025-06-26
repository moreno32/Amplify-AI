import { Post, PostStatus, PostCategory } from '@/lib/types';
import { createClient as createBrowserClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

// Helper function to create appropriate Supabase client
function getSupabaseClient() {
  // Always use browser client for now to avoid server/client conflicts
  return createBrowserClient();
}

// Helper function to get company ID for the current user
async function getCompanyIdForCurrentUser(supabase: ReturnType<typeof createBrowserClient>): Promise<string> {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error('User not authenticated or error fetching user.');
  }

  const { data: memberData, error: memberError } = await supabase
    .from('company_members')
    .select('company_id')
    .eq('user_id', user.id)
    .single();

  if (memberError || !memberData) {
    throw new Error('Could not find company for the current user.');
  }
  return memberData.company_id;
}

// Helper para mapear datos de DB al tipo Post
// Asume que la consulta ya hizo los joins necesarios para obtener los nombres
function mapDbRowToPost(row: any): Post {
  // El tipo Post espera 'instagram', 'facebook', 'twitter'.
  // Asegurémonos de que platform_name sea uno de estos.
  let platform: 'instagram' | 'facebook' | 'twitter' = 'instagram'; // Default
  if (row.platform_name && ['instagram', 'facebook', 'twitter'].includes(row.platform_name.toLowerCase())) {
    platform = row.platform_name.toLowerCase() as 'instagram' | 'facebook' | 'twitter';
  }

  return {
    id: row.id,
    content: row.content || '',
    status: row.status_name as PostStatus || 'draft',
    // category se refiere a la categoría temática
    category: row.category_name as PostCategory || 'Motivación', // Default si no hay category_name
    platform: platform,
    imageUrl: row.media_urls && row.media_urls.length > 0 ? row.media_urls[0] : undefined,
    startTime: new Date(row.scheduled_at),
    duration: row.duration || 60, // DB no tiene duration, usamos un default. Esto se debe mejorar.
    notes: row.notes, // DB no tiene notes. Esto se debe mejorar.
    // contentType: row.content_type_name // Opcional: si queremos pasar el tipo de contenido (formato)
  };
}

// Helper to get ID from a dimension table
async function getDimensionId(
  supabase: ReturnType<typeof createBrowserClient>,
  dimensionTable: 'dim_post_status' | 'dim_post_categories' | 'dim_content_types' | 'dim_platforms',
  name: string
): Promise<number | null> {
  if (!name) return null; // Si no se provee nombre, no se puede buscar ID
  const { data, error } = await supabase
    .from(dimensionTable)
    .select('id')
    .eq('name', name)
    .single();

  if (error) { // No tratar "no rows" como un error fatal aquí, simplemente no se encontró.
    if (error.code !== 'PGRST116') { // PGRST116: No rows found
        console.error(`Error fetching ID for '${name}' from ${dimensionTable}:`, error.message);
    }
    return null;
  }
  return data?.id || null;
}

// Helper to get social_account_id
async function getSocialAccountId(
  supabase: ReturnType<typeof createBrowserClient>,
  platformName: string, // e.g., 'instagram'
  companyId: string
): Promise<string | null> {
  if (!platformName || !companyId) return null;

  // Supabase platform names son capitalizadas en la DB mock (Instagram, Facebook) pero Post type usa minúsculas
  // Aseguramos consistencia al buscar. Asumimos que dim_platforms.name es como 'Instagram'.
  const platformNameInDb = platformName.charAt(0).toUpperCase() + platformName.slice(1);
  const platformId = await getDimensionId(supabase, 'dim_platforms', platformNameInDb);

  if (!platformId) {
    console.error(`Platform ID not found for platform: ${platformNameInDb}`);
    return null;
  }

  const { data, error } = await supabase
    .from('social_accounts')
    .select('id')
    .eq('company_id', companyId)
    .eq('platform_id', platformId)
    .single(); // Asumimos una cuenta por plataforma y compañía

  if (error) {
    if (error.code !== 'PGRST116') {
        console.error(`Error fetching social account for company ${companyId} and platform ${platformNameInDb}:`, error.message);
    }
    return null;
  }
  return data?.id || null;
}

export const postService = {
  /**
   * Obtiene los posts para un rango de fechas.
   * En esta simulación, simplemente devolvemos todos los posts.
   * En una implementación real, se usarían startDate y endDate para filtrar en el backend.
   */
  async getPosts(startDate?: Date, endDate?: Date): Promise<Post[]> {
    const supabase = getSupabaseClient();
    const company_id = await getCompanyIdForCurrentUser(supabase);

    let query = supabase
      .from('posts')
      .select(`
        id,
        content,
        scheduled_at,
        media_urls,
        duration, 
        notes,    
        status:dim_post_status(name),
        category:dim_post_categories(name),
        content_type:dim_content_types(name),
        social_account:social_accounts!inner(
          platform:dim_platforms(name),
          company_id
        )
      `)
      .eq('social_accounts.company_id', company_id);

    if (startDate) {
      query = query.gte('scheduled_at', startDate.toISOString());
    }
    if (endDate) {
      query = query.lte('scheduled_at', endDate.toISOString());
    }

    query = query.order('scheduled_at', { ascending: false });

    const { data: postRows, error } = await query;

    if (error) {
      console.error('Error fetching posts:', error);
      throw new Error('Failed to fetch posts.');
    }

    if (!postRows) {
      return [];
    }
    
    // Mapeo mejorado
    return postRows.map((row: any) => ({
        id: row.id,
        content: row.content || '',
        status: row.status?.[0]?.name as PostStatus || 'draft',
        category: row.category?.[0]?.name as PostCategory || 'Motivación',
        platform: row.social_account?.[0]?.platform?.[0]?.name.toLowerCase() as 'instagram' | 'facebook' | 'twitter' || 'instagram',
        imageUrl: row.media_urls && row.media_urls.length > 0 ? row.media_urls[0] : undefined,
        startTime: new Date(row.scheduled_at),
        duration: row.duration || 60, // Usar valor de DB o default si es null
        notes: row.notes || undefined, // Usar valor de DB o undefined si es null
    }));
  },

  /**
   * Actualiza campos específicos de un post.
   */
  async updatePostDetails(postId: string, updates: { content: string }): Promise<Post | null> {
    console.log('updatePostDetails called for:', postId, 'with updates:', updates);
    // Esta función podría considerarse un subconjunto de updatePost.
    // Por ahora, lanzará error o devolverá null para cumplir el contrato.
    // throw new Error('updatePostDetails Not implemented yet'); 
    return null; // Cumple con el tipo Promise<Post | null>
  },

  /**
   * Actualiza un post existente, principalmente su fecha de inicio.
   */
  async updatePost(postId: string, updates: Partial<Post>): Promise<Post | null> {
    const supabase = getSupabaseClient();
    const company_id = await getCompanyIdForCurrentUser(supabase);

    // Primero, verificar que el post existe y pertenece a la compañía
    const existingPost = await this.getPostById(postId); // getPostById ya filtra por compañía
    if (!existingPost) {
      console.warn(`Update failed: Post with ID ${postId} not found or doesn't belong to company ${company_id}.`);
      return null;
    }

    const updatePayload: any = {
        // Solo actualizamos campos que pueden cambiar y están en la tabla 'posts'
        content: updates.content,
        scheduled_at: updates.startTime ? updates.startTime.toISOString() : undefined,
        media_urls: typeof updates.imageUrl !== 'undefined' ? (updates.imageUrl ? [updates.imageUrl] : []) : undefined, // Permite borrar imageUrl con null/undefined
        duration: updates.duration,
        notes: updates.notes,
    };
    
    // Si se actualiza el status, category, platform, o contentTypeName implícito por imageUrl, obtener nuevos IDs
    if (updates.status) {
        const status_id = await getDimensionId(supabase, 'dim_post_status', updates.status);
        if (!status_id) throw new Error(`Invalid status: ${updates.status}`);
        updatePayload.status_id = status_id;
    }
    if (updates.category) {
        const category_id = await getDimensionId(supabase, 'dim_post_categories', updates.category);
        if (!category_id) throw new Error(`Invalid category: ${updates.category}`);
        updatePayload.category_id = category_id;
    }
    if (updates.platform) {
        const social_account_id = await getSocialAccountId(supabase, updates.platform, company_id);
        if (!social_account_id) throw new Error(`Invalid platform or social account not found for: ${updates.platform}`);
        updatePayload.social_account_id = social_account_id;
    }

    // Ajuste aquí para content_type_id
    if (typeof updates.imageUrl !== 'undefined') {
        const contentTypeName = updates.imageUrl ? 'Image Post' : 'Text Post';
        const content_type_id = await getDimensionId(supabase, 'dim_content_types', contentTypeName);
        // Si no se encuentra, podría ser un error o podríamos decidir no actualizar content_type_id
        // Por consistencia, lanzaremos error si los nombres estándar no se encuentran.
        if (!content_type_id) throw new Error(`Invalid content type name for update: ${contentTypeName}. Check dim_content_types.`);
        updatePayload.content_type_id = content_type_id;
    }

    // Filtrar undefined para no sobreescribir campos con undefined si no se proveen en 'updates'
    const filteredUpdatePayload = Object.entries(updatePayload).reduce((acc, [key, value]) => {
        if (value !== undefined) {
            acc[key] = value;
        }
        return acc;
    }, {} as any);

    if (Object.keys(filteredUpdatePayload).length === 0) {
        console.warn("UpdatePost called with no actual changes for post:", postId);
        return existingPost; // No hay nada que actualizar
    }
    
    const { error: updateError } = await supabase
      .from('posts')
      .update(filteredUpdatePayload)
      .eq('id', postId);

    if (updateError) {
      console.error(`Error updating post ${postId}:`, updateError);
      throw new Error(`Failed to update post ${postId}.`);
    }

    return this.getPostById(postId); // Devolver el post actualizado
  },

  /**
   * Crea un nuevo post.
   */
  async createPost(postData: Partial<Post>): Promise<Post> {
    const supabase = getSupabaseClient();
    const company_id = await getCompanyIdForCurrentUser(supabase);

    if (!postData.platform || !postData.status || !postData.category || !postData.startTime || !postData.content) {
        throw new Error('Missing required fields for post creation (platform, status, category, startTime, content).');
    }
    
    const social_account_id = await getSocialAccountId(supabase, postData.platform, company_id);
    if (!social_account_id) {
      throw new Error(`Failed to find social account for platform ${postData.platform} and company ${company_id}.`);
    }

    const status_id = await getDimensionId(supabase, 'dim_post_status', postData.status);
    if (!status_id) {
      throw new Error(`Failed to find status ID for status: ${postData.status}.`);
    }

    const category_id = await getDimensionId(supabase, 'dim_post_categories', postData.category);
    if (!category_id) {
      throw new Error(`Failed to find category ID for category: ${postData.category}.`);
    }
    
    // Ajuste aquí: usar 'Image Post' y 'Text Post' según dim_content_types
    const contentTypeName = postData.imageUrl ? 'Image Post' : 'Text Post'; 
    const content_type_id = await getDimensionId(supabase, 'dim_content_types', contentTypeName);
    if (!content_type_id) {
        // Esto no debería ocurrir si 'Image Post' y 'Text Post' existen en dim_content_types
        throw new Error(`Failed to find content type ID for: ${contentTypeName}.`);
    }

    const newPostDbData = {
      social_account_id,
      status_id,
      category_id,
      content_type_id,
      content: postData.content,
      scheduled_at: postData.startTime.toISOString(),
      media_urls: postData.imageUrl ? [postData.imageUrl] : undefined,
      duration: postData.duration,
      notes: postData.notes,
      // campaign_id: postData.campaignId // Si se añade campaignId a Post type
    };

    const { data: createdPostRow, error: insertError } = await supabase
      .from('posts')
      .insert(newPostDbData)
      .select('id') // Solo necesitamos el ID para luego llamar a getPostById
      .single();

    if (insertError || !createdPostRow) {
      console.error('Error creating post:', insertError);
      throw new Error('Failed to create post.');
    }

    const newPost = await this.getPostById(createdPostRow.id);
    if (!newPost) {
        // Esto sería muy raro si la inserción fue exitosa y getPostById está bien
        console.error('Failed to retrieve newly created post with id:', createdPostRow.id);
        throw new Error('Post created but failed to retrieve it.');
    }
    return newPost;
  },

  /**
   * Obtiene un solo post por su ID.
   */
  async getPostById(postId: string): Promise<Post | null> {
    const supabase = getSupabaseClient();
    const company_id = await getCompanyIdForCurrentUser(supabase);

    const selectQuery = `
      id,
      content,
      scheduled_at,
      media_urls,
      duration,
      notes,
      status:dim_post_status(name),
      category:dim_post_categories(name),
      content_type:dim_content_types(name),
      social_account:social_accounts!inner(
        platform:dim_platforms(name),
        company_id
      )
    `;

    const { data: postRow, error } = await supabase
      .from('posts')
      .select(selectQuery)
      .eq('id', postId)
      .eq('social_accounts.company_id', company_id) 
      .single();

    if (error) {
      console.error('Error fetching post by ID:', error);
      if (error.code === 'PGRST116') { 
        return null;
      }
      throw new Error(`Failed to fetch post with id ${postId}.`);
    }

    if (!postRow) {
      return null;
    }
    
    return {
        id: postRow.id,
        content: postRow.content || '',
        status: postRow.status?.[0]?.name as PostStatus || 'draft',
        category: postRow.category?.[0]?.name as PostCategory || 'Motivación',
        platform: postRow.social_account?.[0]?.platform?.[0]?.name.toLowerCase() as 'instagram' | 'facebook' | 'twitter' || 'instagram',
        imageUrl: postRow.media_urls && postRow.media_urls.length > 0 ? postRow.media_urls[0] : undefined,
        startTime: new Date(postRow.scheduled_at),
        duration: postRow.duration || 60, // Usar valor de DB o default si es null
        notes: postRow.notes || undefined, // Usar valor de DB o undefined si es null
    };
  },

  async deletePost(postId: string): Promise<boolean> {
    const supabase = getSupabaseClient();
    const company_id = await getCompanyIdForCurrentUser(supabase);

    // Verificar que el post pertenece a la compañía antes de borrar
    // Hacemos una consulta para obtener el social_account_id del post
    const { data: postOwnerData, error: ownerCheckError } = await supabase
        .from('posts')
        .select('social_account_id, sa:social_accounts!inner(company_id)')
        .eq('id', postId)
        .single();

    if (ownerCheckError || !postOwnerData || (postOwnerData as any).sa.company_id !== company_id) {
        console.warn(`Delete failed: Post ${postId} not found or does not belong to company ${company_id}.`);
        if (ownerCheckError && ownerCheckError.code !== 'PGRST116') console.error('Error checking post ownership:', ownerCheckError);
        return false;
    }

    const { error: deleteError } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId);

    if (deleteError) {
      console.error(`Error deleting post ${postId}:`, deleteError);
      // Podríamos querer lanzar un error aquí en lugar de solo devolver false
      // dependiendo de cómo la UI/Server Action lo maneje.
      // throw new Error(`Failed to delete post ${postId}.`);
      return false;
    }
    return true;
  },

  async seedPostsForCompany(companyId: string, postsToSeed: Post[]): Promise<{ seeded: number; errors: any[] }> {
    const supabase = getSupabaseClient();
    let seededCount = 0;
    const errorDetails: any[] = [];

    if (!companyId) {
      throw new Error('Company ID is required to seed posts.');
    }

    for (const post of postsToSeed) {
      try {
        const social_account_id = await getSocialAccountId(supabase, post.platform, companyId);
        if (!social_account_id) {
          errorDetails.push({ postId: post.id || 'unknown', error: `Social account not found for platform ${post.platform}` });
          continue;
        }

        const status_id = await getDimensionId(supabase, 'dim_post_status', post.status);
        if (!status_id) {
          errorDetails.push({ postId: post.id || 'unknown', error: `Status ID not found for: ${post.status}` });
          continue;
        }

        const category_id = await getDimensionId(supabase, 'dim_post_categories', post.category);
        if (!category_id) {
          errorDetails.push({ postId: post.id || 'unknown', error: `Category ID not found for: ${post.category}` });
          continue;
        }

        const contentTypeName = post.imageUrl ? 'Image Post' : 'Text Post';
        const content_type_id = await getDimensionId(supabase, 'dim_content_types', contentTypeName);
        if (!content_type_id) {
          errorDetails.push({ postId: post.id || 'unknown', error: `Content type ID not found for: ${contentTypeName}` });
          continue;
        }

        const postDbData = {
          id: post.id,
          social_account_id,
          status_id,
          category_id,
          content_type_id,
          content: post.content,
          scheduled_at: new Date(post.startTime).toISOString(),
          media_urls: post.imageUrl ? [post.imageUrl] : undefined,
          duration: post.duration,
          notes: post.notes,
          metrics: post.metrics
        };
        
        const { error: upsertError } = await supabase.from('posts').upsert(postDbData);

        if (upsertError) {
          errorDetails.push({ postId: post.id || 'unknown', error: upsertError.message });
        } else {
          seededCount++;
        }
      } catch (e: any) {
        errorDetails.push({ postId: post.id || 'unknown', error: e.message });
      }
    }
    return { seeded: seededCount, errors: errorDetails };
  }
}; 