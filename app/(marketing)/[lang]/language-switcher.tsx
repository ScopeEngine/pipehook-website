'use client'

import Link from 'next/link'
import { localeCookieName, type Locale } from '@/lib/i18n'

type LanguageSwitcherProps = {
  lang: Locale
  label: string
  english: string
  swedish: string
}

function persistLocale(next: Locale) {
  document.cookie = `${localeCookieName}=${next}; path=/; max-age=31536000; SameSite=Lax`
}

export function LanguageSwitcher({ lang, label, english, swedish }: LanguageSwitcherProps) {
  return (
    <div className="lang-switch font-sans text-sm font-medium tracking-wide" aria-label={label}>
      <Link
        href="/en"
        hrefLang="en"
        className={lang === 'en' ? 'is-active' : undefined}
        aria-current={lang === 'en' ? 'true' : undefined}
        onClick={() => persistLocale('en')}
      >
        {english}
      </Link>
      <span aria-hidden="true">/</span>
      <Link
        href="/se"
        hrefLang="sv"
        className={lang === 'se' ? 'is-active' : undefined}
        aria-current={lang === 'se' ? 'true' : undefined}
        onClick={() => persistLocale('se')}
      >
        {swedish}
      </Link>
    </div>
  )
}
