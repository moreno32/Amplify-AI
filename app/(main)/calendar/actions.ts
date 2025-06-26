'use server'

import { postService } from '@/lib/services/postService'
import { Post } from '@/lib/types'
import { revalidatePath } from 'next/cache'

export async function createCalendarPostAction(postData: Partial<Post>): Promise<{ data?: Post; error?: string }> {
  try {
    // Asegurarnos que startTime es un objeto Date si viene como string (JSON)
    if (postData.startTime && typeof postData.startTime === 'string') {
      postData.startTime = new Date(postData.startTime);
    }

    const newPost = await postService.createPost(postData)
    revalidatePath('/calendar') // Revalida la página del calendario
    revalidatePath('/dashboard') // También revalidar dashboard si muestra posts recientes
    return { data: newPost }
  } catch (error: any) {
    console.error('Server Action Error - createCalendarPostAction:', error.message)
    return { error: error.message || 'Failed to create post.' }
  }
}

export async function updateCalendarPostAction(postId: string, updates: Partial<Post>): Promise<{ data?: Post | null; error?: string }> {
  try {
    // Asegurarnos que startTime es un objeto Date si viene como string (JSON)
    if (updates.startTime && typeof updates.startTime === 'string') {
      updates.startTime = new Date(updates.startTime);
    }

    const updatedPost = await postService.updatePost(postId, updates)
    
    // postService.updatePost devuelve null si el post no se encontró o no hubo cambios efectivos.
    // Solo revalidamos si hubo una actualización real.
    if (updatedPost && updates && Object.keys(updates).length > 0) {
        // Podríamos incluso comparar el updatedPost con el original si es necesario para ser más precisos con la revalidación
        revalidatePath('/calendar')
        revalidatePath('/dashboard')
    }
    return { data: updatedPost }
  } catch (error: any) {
    console.error('Server Action Error - updateCalendarPostAction:', error.message)
    return { error: error.message || 'Failed to update post.' }
  }
}

export async function deleteCalendarPostAction(postId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const success = await postService.deletePost(postId)
    if (success) {
      revalidatePath('/calendar')
      revalidatePath('/dashboard')
    }
    return { success }
  } catch (error: any) {
    console.error('Server Action Error - deleteCalendarPostAction:', error.message)
    return { success: false, error: error.message || 'Failed to delete post.' }
  }
} 