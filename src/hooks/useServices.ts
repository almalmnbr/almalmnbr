'use client';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Service {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  short_description_ar?: string;
  short_description_en?: string;
  icon_name: string;
  image_url?: string;
  featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      console.log("Fetching services from Supabase...");
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error("Error fetching services:", error);
        throw error;
      }

      console.log("Fetched services:", data);
      return data as Service[];
    },
    staleTime: 1000 * 60, // Cache data for 1 minute
    refetchOnWindowFocus: true,  // Refetch when tab/window is focused
  });
};
