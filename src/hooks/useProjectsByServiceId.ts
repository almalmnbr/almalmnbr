import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Project } from './useProjects';

export const useProjectsByServiceId = (serviceId: string) => {
  return useQuery({
    queryKey: ['projects', serviceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('service_id', serviceId)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as Project[];
    },
    enabled: !!serviceId, // Only run if serviceId is available
  });
};
