'use client';

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ProjectMedia {
  id: number;
  type: string; // e.g. "image", "youtube"
  url: string;
  description?: string;
  created_at: string;
  project_id: string;
}

export interface Project {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar?: string;
  description_en?: string;
  category_ar?: string;
  category_en?: string;
  image_url?: string;
  featured: boolean;
  service_id?: string;
  display_order: number;
  created_at: string;
  updated_at: string;
  project_media?: ProjectMedia[]; // وسائط مرتبطة بالمشروع
}

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_media (
            id,
            type,
            url,
            description,
            created_at,
            project_id
          )
        `)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as Project[];
    },
  });
};
