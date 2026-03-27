"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LoginPayload } from '@/types/auth'
import { useLoginMutation } from '@/hooks/queries/auth'
import api from '@/lib/api'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const [data, setData] = useState<LoginPayload>({ email: '', password: '' })
  const router = useRouter()
  const { login } = useAuth()
  const mutation = useLoginMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(data)
    } catch {
      // error handled in api interceptor
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login to Chama</CardTitle>
          <CardDescription>Enter your email and password to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Email"
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div>
              <Input
                placeholder="Password"
                type="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <button onClick={() => router.push('/register')} className="text-primary hover:underline font-medium">
                Register here
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
