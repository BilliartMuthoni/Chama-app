"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RegisterPayload } from '@/types/auth'
import { useRegisterMutation } from '@/hooks/queries/auth'
import { useAuth } from '@/hooks/useAuth'

export default function RegisterPage() {
  const [data, setData] = useState<RegisterPayload>({ first_name: '', last_name: '', email: '', password: '' })
  const router = useRouter()
  const { register } = useAuth()
  const mutation = useRegisterMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register(data)
      router.push('/login')
    } catch {
      // error handled in api
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Chama Account</CardTitle>
          <CardDescription>Join the community savings app.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <label htmlFor="register-first-name" className="block mb-1 text-sm font-medium">First Name</label>
                <Input
                  id="register-first-name"
                  name="first_name"
                  placeholder="First Name"
                  autoComplete="given-name"
                  value={data.first_name}
                  onChange={(e) => setData({ ...data, first_name: e.target.value })}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="register-last-name" className="block mb-1 text-sm font-medium">Last Name</label>
                <Input
                  id="register-last-name"
                  name="last_name"
                  placeholder="Last Name"
                  autoComplete="family-name"
                  value={data.last_name}
                  onChange={(e) => setData({ ...data, last_name: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label htmlFor="register-email" className="block mb-1 text-sm font-medium">Email</label>
              <Input
                id="register-email"
                name="email"
                placeholder="Email"
                type="email"
                autoComplete="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="register-password" className="block mb-1 text-sm font-medium">Password</label>
              <Input
                id="register-password"
                name="password"
                placeholder="Password"
                type="password"
                autoComplete="new-password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? 'Creating...' : 'Create Account'}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <button onClick={() => router.push('/login')} className="text-primary hover:underline font-medium">
                Sign in
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

