import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/get-dictionary'
import { hasLocale } from '@/lib/i18n'
import { LandingPage } from './landing-page'

export default async function Page({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)
  return <LandingPage lang={lang} dict={dict} />
}
