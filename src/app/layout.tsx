import { NotificationProvider } from '@/context/NotificationContext'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Auth Nextjs13',
  description: 'Sistema de Autenticacion con Nextjs 13 (app router)'
}

interface RoutLayoutProps {
  children: React.ReactNode
}

export default function RootLayout ({ children }: RoutLayoutProps) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NotificationProvider>
          <main className='min-h-screen flex flex-col items-center justify-center'>
            {children}
          </main>
        </NotificationProvider>
      </body>
    </html>
  )
}
