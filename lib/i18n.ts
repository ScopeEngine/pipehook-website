export const locales = ['en', 'se'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeCookieName = 'NEXT_LOCALE'

export const htmlLang: Record<Locale, string> = {
  en: 'en',
  se: 'sv',
}

export function hasLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}
