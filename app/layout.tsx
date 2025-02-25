import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { GlobalContextProvider } from '@/context/global.context'
import { GraphQLProvider } from '@/graphql'
import Nav from '@/components/nav'
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased p-4`}
      >
        <GraphQLProvider>
          <GlobalContextProvider>
            <header className='mb-4 flex'>
              <Nav />
            </header>
            {children}
          </GlobalContextProvider>
        </GraphQLProvider>
      </body>
    </html>
  )
}
