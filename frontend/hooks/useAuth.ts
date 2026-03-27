import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import type { User, LoginPayload, RegisterPayload } from '@/types/auth'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      api.get('/auth/me')
        .then((res) => {
          setUser(res.data)
        })
        .catch(() => {
          localStorage.removeItem('access_token')
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (data: LoginPayload) => {
    const res = await api.post('/auth/login', data)
    const token = res.data.access_token
    localStorage.setItem('access_token', token)
    // Set cookie for middleware
    document.cookie = `access_token=${token}; path=/; max-age=86400; SameSite=Strict`
    const meRes = await api.get('/auth/me')
    setUser(meRes.data)
    router.push('/dashboard')
  }

  const register = async (data: RegisterPayload) => {
    await api.post('/auth/register', data)
    router.push('/login')
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    setUser(null)
    router.push('/login')
  }

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }
}

