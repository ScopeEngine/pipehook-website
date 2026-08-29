import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { defaultLocale, hasLocale, localeCookieName, locales, type Locale } from '@/lib/i18n'
import { requireInternalAuth } from '@/lib/internal-auth'

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

function withoutParallelSlots(pathname: string) {
  const parts = pathname.split('/').filter((part) => part.length > 0 && !part.startsWith('@'))
  return parts.length > 0 ? `/${parts.join('/')}` : '/'
}

function localeFromPath(pathname: string): Locale | undefined {
  const first = pathname.split('/').find(Boolean)
  return first && hasLocale(first) ? first : undefined
}

function isRscRequest(request: NextRequest) {
  return request.headers.get('rsc') === '1' || request.headers.has('next-router-state-tree')
}

function isLocaleExempt(pathname: string) {
  return (
    pathname === '/demo' ||
    pathname.startsWith('/demo/') ||
    pathname === '/internal' ||
    pathname.startsWith('/internal/')
  )
}

function passThrough() {
  return NextResponse.next()
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const cleaned = withoutParallelSlots(pathname)

  if (pathname.startsWith('/internal')) {
    const authError = requireInternalAuth(request)
    if (authError) return authError
  }

  if (isLocaleExempt(pathname) || isLocaleExempt(cleaned)) {
    return passThrough()
  }

  if (pathname !== cleaned) {
    if (isRscRequest(request)) return NextResponse.next()

    const locale = localeFromPath(cleaned) ?? getLocale(request)
    request.nextUrl.pathname = cleaned === '/' ? `/${locale}` : cleaned
    return NextResponse.redirect(request.nextUrl)
  }

  if (pathname === '/sv' || pathname.startsWith('/sv/')) {
    request.nextUrl.pathname = pathname.replace(/^\/sv/, '/se')
    return NextResponse.redirect(request.nextUrl)
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )

  if (pathnameHasLocale) return

  const locale = getLocale(request)
  request.nextUrl.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|icon.svg|.*\\..*).*)'],
}
