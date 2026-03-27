"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return <nav className="bg-card border-b shadow-sm p-4">Loading...</nav>;
  }

  return (
    <nav className="bg-card border-b shadow-sm p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Chama
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/dashboard" className="hover:text-primary font-medium">Dashboard</Link>
              <Button variant="ghost" size="sm" onClick={logout}>
                <User className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-primary font-medium">Login</Link>
              <Link href="/register" className="hover:text-primary font-medium">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
