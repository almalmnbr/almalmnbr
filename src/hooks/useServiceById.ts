import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Service } from './useServices';

export const useServiceById = (id: string) => {
  return useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error("Error fetching service:", error);
        throw error;
      }

      return data as Service;
    },
    enabled: !!id,
  });
};
