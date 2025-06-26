'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { brandProfileService } from '@/lib/services/brandProfileService';
import { postService } from '@/lib/services/postService';
import { competitorService } from '@/lib/services/competitorService';
import { influencerService } from '@/lib/services/influencerService';
import { mockBrandProfile } from '@/lib/mock-data/brand';
import { mockPosts } from '@/lib/mock-data/posts';
import { BrandProfile } from '@/lib/types';
import { revalidatePath } from 'next/cache';

const brandProfileUpdateSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  companyName: z.string().optional(),
  companyIndustry: z.string().optional(),
  companyType: z.string().optional(),
  companySize: z.string().optional(),
  companyWebsite: z.string().optional(),
  companyDescription: z.string().optional(),
  targetAudience: z.string().optional(),
  language: z.enum(['es', 'en']).optional(),
  timezone: z.string().optional(),
});

export async function updateBrandProfile(payload: Partial<BrandProfile>): Promise<{ success: boolean; message?: string; data?: BrandProfile }> {
  try {
    const serviceResponse = await brandProfileService.updateBrandProfile(payload);

    if (serviceResponse.success) {
      revalidatePath('/settings');
      revalidatePath('/brand-profile');
      const updatedData = await brandProfileService.getBrandProfile();
      return { success: true, data: updatedData, message: "Perfil de marca actualizado con éxito." };
    } else {
      return { success: false, message: serviceResponse.error?.message || "No se pudo actualizar el perfil de marca." };
    }
  } catch (e: any) {
    console.error("Server Action Error - updateBrandProfile:", e.message);
    return { success: false, message: e.message || "Error interno del servidor." };
  }
} 