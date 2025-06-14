
  'use client';
  import { useQuery } from '@tanstack/react-query';
  import { supabase } from '@/integrations/supabase/client';

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
  }

  export const useProjects = () => {
    return useQuery({
      queryKey: ['projects'],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('display_order', { ascending: true });
        
        if (error) throw error;
        return data as Project[];
      },
    });
  };
