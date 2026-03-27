import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';

export function useLoans() {
  return useQuery(['loans'], async () => {
    const { data } = await api.get('/api/loans');
    return data;
  });
}

export function useApplyLoan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { amount: number; interest?: number; due_date?: string; note?: string }) => {
      const { data } = await api.post('/api/loans', payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['loans']);
    },
  });
}
