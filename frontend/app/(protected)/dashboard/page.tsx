"use client"

import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useMeQuery } from '@/hooks/queries/auth'
import { User } from '@/types/auth'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const { data: me } = useMeQuery()

  if (!user) {
    return null // middleware will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Chama Dashboard
          </h1>
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Welcome back!</CardTitle>
              <CardDescription>{me?.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p><strong>Role:</strong> {me?.role || 'Member'}</p>
              <p><strong>Status:</strong> {me?.isActive ? 'Active' : 'Inactive'}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Members</CardTitle>
              <CardDescription>Manage group members</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Coming soon...</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Savings</CardTitle>
              <CardDescription>View charts and contributions</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Charts coming soon (Recharts ready)</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

