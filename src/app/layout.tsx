import './globals.css'
import { Inter } from 'next/font/google'
import { PostProvider } from '@/context/PostContext'
import ClientOnly from '@/components/app/components/ClientOnly'
import ToasterProvider from './providers/ToasterProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Lingui',
  description: 'A Language Learning Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} >
      <PostProvider>
        <ClientOnly>
        <ToasterProvider/>
        </ClientOnly>
          <div className=''>
            {children}
          </div>
        </PostProvider>
        </body>
    </html>
  )
}
