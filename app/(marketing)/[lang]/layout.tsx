import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { inter } from '@/lib/fonts'
import { getDictionary } from '@/lib/get-dictionary'
import { hasLocale, htmlLang, locales } from '@/lib/i18n'
import '../../globals.css'

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}

  const dict = await getDictionary(lang)

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    generator: 'PipeHook',
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: '/en',
        sv: '/se',
        'sv-SE': '/se',
        'x-default': '/en',
      },
    },
  }
}

export default async function MarketingLayout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  return (
    <html lang={htmlLang[lang]} className={`${inter.variable} ${inter.className}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
