import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { defaultLocale, hasLocale, localeCookieName, locales, type Locale } from '@/lib/i18n'

function getCountry(request: NextRequest) {
  const fromQuery = request.nextUrl.searchParams.get('country')
  if (fromQuery) return fromQuery.toUpperCase()

  return (
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry') ||
    request.headers.get('x-country-code') ||
    request.headers.get('cloudfront-viewer-country') ||
    ''
  ).toUpperCase()
}

function prefersSwedish(request: NextRequest) {
  const accept = request.headers.get('accept-language') ?? ''
  return /(^|,|\s)sv\b/i.test(accept)
}

function getLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(localeCookieName)?.value
  if (saved === 'sv') return 'se'
  if (saved && hasLocale(saved)) return saved

  if (getCountry(request) === 'SE' || prefersSwedish(request)) return 'se'

  return defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/sv' || pathname.startsWith('/sv/')) {
    request.nextUrl.pathname = pathname.replace(/^\/sv/, '/se')
    return NextResponse.redirect(request.nextUrl)
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) return

  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
}
