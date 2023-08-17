import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Auth Nextjs13',
  description: 'Autenticacion con Nextjs 13'
}

interface RoutLayoutProps {
  children: React.ReactNode
}

export default function RootLayout ({ children }: RoutLayoutProps) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className='h-screen flex flex-col items-center justify-center'>
          {children}
        </main>
      </body>
    </html>
  )
}
