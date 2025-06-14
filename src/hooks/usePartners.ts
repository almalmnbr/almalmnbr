
'use client';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Partner {
  id: string;
  name_ar: string;
  name_en: string;
  logo_url?: string;
  website_url?: string;
  description_ar?: string;
  description_en?: string;
  featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const usePartners = () => {
  return useQuery({
    queryKey: ['partners'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as Partner[];
    },
  });
};
