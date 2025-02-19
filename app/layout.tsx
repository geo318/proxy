import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { GlobalContextProvider } from '@/context/global.context'
import { GraphQLProvider } from '@/graphql'
import Link from 'next/link'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Proxied App',
  description: 'A simple e-commerce app with a GraphQL API',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased p-4`}
      >
        <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
          <nav>
            <Link href='/'>Home</Link> | <Link href='/cart'>Cart</Link>
          </nav>
        </header>
        <GraphQLProvider>
          <GlobalContextProvider>{children}</GlobalContextProvider>
        </GraphQLProvider>
      </body>
    </html>
  )
}
