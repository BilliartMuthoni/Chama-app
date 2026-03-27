import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';

export function useNotifications() {
  return useQuery(['notifications'], async () => {
    const { data } = await api.get('/api/notifications');
    return data;
  });
}

export function useAddNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { message: string; type?: string; user_id?: number }) => {
      const { data } = await api.post('/api/notifications', payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
    },
  });
}
