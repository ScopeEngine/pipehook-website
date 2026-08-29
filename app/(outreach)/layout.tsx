import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { inter } from '@/lib/fonts'
import '../globals.css'

export const metadata: Metadata = {
  title: 'PipeHook',
  generator: 'PipeHook',
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function OutreachLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sv" className={`${inter.variable} ${inter.className}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
