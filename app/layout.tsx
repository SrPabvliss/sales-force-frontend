import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { ThemeProvider } from '@/core/providers/themes-provider'
import { Toaster } from 'react-hot-toast'

import { TooltipProvider } from '@/components/ui/tooltip'

import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn('flex h-screen max-h-screen w-full gap-4 ', inter.className, {
          'debug-screens': process.env.NODE_ENV === 'development',
        })}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
