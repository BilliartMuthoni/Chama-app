
export function useContributions() {
  return useQuery({
    queryKey: ['contributions'],
    queryFn: async () => {
      const { data } = await api.get('/api/contributions');
      return data;
    },
  });
}

export function useAddContribution() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { amount: number; type?: string; note?: string }) => {
      const { data } = await api.post('/api/contributions', payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contributions'] });
    },
  });
}
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../lib/api';
