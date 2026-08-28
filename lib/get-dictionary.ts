import type { Locale } from './i18n'
import type en from './dictionaries/en.json'

export type Dictionary = typeof en

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  se: () => import('./dictionaries/se.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
