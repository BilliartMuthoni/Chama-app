"use client"

import { useMutation, useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import type { User, LoginPayload, RegisterPayload } from '@/types/auth'

export function useMeQuery() {
  return useQuery<User>({
    queryKey: ['me'],
    queryFn: () => api.get('/auth/me').then(res => res.data),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 min
  })
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: (data: LoginPayload) => api.post('/auth/login', data).then(res => res.data),
  })
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: (data: RegisterPayload) => api.post('/auth/register', data).then(res => res.data),
  })
}

