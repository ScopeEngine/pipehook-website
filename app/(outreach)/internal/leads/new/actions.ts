'use server'

import { headers } from 'next/headers'
import { isIndustry } from '@/lib/lead-demo.config'
import { parseAccentColor, parseLoomVideoId, slugifyCompanyName, uniqueLeadSlug } from '@/lib/lead-slug'
import { insertLead, listLeadSlugs } from '@/lib/leads'

export type CreateLeadState =
  | { status: 'idle' }
  | { status: 'error'; message: string }
  | { status: 'success'; slug: string; demoUrl: string }

async function originFromHeaders() {
  const store = await headers()
  const host = store.get('x-forwarded-host') ?? store.get('host')
  const proto = store.get('x-forwarded-proto') ?? 'https'
  return host ? `${proto}://${host}` : 'https://www.pipehook.co'
}

function formatCaughtError(error: unknown) {
  if (error instanceof Error && error.message) return error.message
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const message = String((error as { message: unknown }).message ?? '')
    if (message) return message
  }
  if (typeof error === 'string' && error) return error
  return 'Kunde inte spara leaden.'
}

async function assertInternalAuth() {
  const expected = process.env.INTERNAL_ADMIN_PASSWORD
  if (!expected) throw new Error('INTERNAL_ADMIN_PASSWORD is not configured')

  const header = (await headers()).get('authorization')
  if (!header?.startsWith('Basic ')) throw new Error('Unauthorized')

  const decoded = atob(header.slice(6))
  const separator = decoded.indexOf(':')
  const password = separator === -1 ? decoded : decoded.slice(separator + 1)
  if (password !== expected) throw new Error('Unauthorized')
}

export async function createLead(
  _prev: CreateLeadState,
  formData: FormData,
): Promise<CreateLeadState> {
  try {
    await assertInternalAuth()
  } catch {
    return { status: 'error', message: 'Du är inte inloggad. Ladda om sidan och ange lösenordet.' }
  }

  const companyName = String(formData.get('companyName') ?? '').trim()
  const city = String(formData.get('city') ?? '').trim()
  const logoUrl = String(formData.get('logoUrl') ?? '').trim()
  const industry = String(formData.get('industry') ?? '').trim()
  const loomVideoIdRaw = String(formData.get('loomVideoId') ?? '').trim()
  const contactName = String(formData.get('contactName') ?? '').trim()
  const contactBookingUrl = String(formData.get('contactBookingUrl') ?? '').trim()
  const accentColorRaw = String(formData.get('accentColor') ?? '').trim()

  if (!companyName) return { status: 'error', message: 'Företagsnamn krävs.' }
  if (!city) return { status: 'error', message: 'Ort krävs.' }
  if (!isIndustry(industry)) return { status: 'error', message: 'Välj en giltig bransch.' }
  if (!contactName) return { status: 'error', message: 'Kontaktperson krävs.' }

  const loom = parseLoomVideoId(loomVideoIdRaw)
  if ('error' in loom) return { status: 'error', message: loom.error }

  let bookingUrl: URL
  try {
    bookingUrl = new URL(contactBookingUrl)
    if (bookingUrl.protocol !== 'http:' && bookingUrl.protocol !== 'https:') {
      throw new Error('bad protocol')
    }
  } catch {
    return { status: 'error', message: 'Bokningslänken måste vara en giltig URL.' }
  }

  if (logoUrl) {
    try {
      const parsed = new URL(logoUrl)
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') throw new Error('bad protocol')
    } catch {
      return { status: 'error', message: 'Logotyp måste vara en http(s)-URL, eller lämnas tom.' }
    }
  }

  const accent = parseAccentColor(accentColorRaw)
  if ('error' in accent) return { status: 'error', message: accent.error }

  const baseSlug = slugifyCompanyName(companyName)

  try {
    const slug = await uniqueLeadSlug(baseSlug, await listLeadSlugs())
    await insertLead({
      leadSlug: slug,
      companyName,
      city,
      logoUrl: logoUrl || null,
      accentColor: accent.color,
      industry,
      loomVideoId: loom.id,
      contactName,
      contactBookingUrl: bookingUrl.toString(),
    })

    const origin = await originFromHeaders()
    return {
      status: 'success',
      slug,
      demoUrl: `${origin}/demo/${slug}`,
    }
  } catch (error) {
    console.error('createLead failed', error)
    return { status: 'error', message: formatCaughtError(error) }
  }
}
