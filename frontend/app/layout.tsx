

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/query-provider";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chama App",
  description: "Community Savings App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <Providers>
          <Navbar />
          <main className="container mx-auto p-4 min-h-[calc(100vh-80px)]">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}


