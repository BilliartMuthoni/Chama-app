import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Users, PiggyBank } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-8 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-6 animate-pulse">
          Welcome to Chama
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
          Join your community savings group. Secure, transparent, and easy to use for everyone.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button size="lg" className="text-lg px-8">Get Started</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg" className="text-lg px-8">Sign In</Button>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mt-24">
        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <CardHeader>
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors mb-4">
              <Users className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <CardTitle>Community First</CardTitle>
            <CardDescription>Connect with your group members seamlessly.</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <CardHeader>
            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center group-hover:bg-secondary/20 transition-colors mb-4">
              <PiggyBank className="w-8 h-8 text-secondary group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <CardTitle>Secure Savings</CardTitle>
            <CardDescription>Track contributions and balances with confidence.</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <CardHeader>
            <div className="w-16 h-16 bg-muted/10 rounded-2xl flex items-center justify-center group-hover:bg-muted/20 transition-colors mb-4">
              <Globe className="w-8 h-8 text-foreground group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <CardTitle>Easy Access</CardTitle>
            <CardDescription>Modern interface on any device, anywhere.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}

