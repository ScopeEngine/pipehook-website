import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { AidaCopy, Industry, LeadDemoConfig } from '@/lib/lead-demo.config'
import { isIndustry } from '@/lib/lead-demo.config'

export type LeadRow = {
  id: string
  lead_slug: string
  company_name: string
  city: string
  logo_url: string | null
  accent_color: string | null
  industry: Industry
  loom_video_id: string
  contact_name: string
  contact_booking_url: string
  copy_override: LeadDemoConfig['copyOverride']
  created_at: string
  og_image_url: string | null
  viewed_at: string | null
  demo_clicked_at: string | null
}

function requireEnv(name: string) {
  const value = process.env[name]
  if (!value) throw new Error(`${name} is not set`)
  return value
}

function throwQueryError(error: { message: string; details?: string; hint?: string; code?: string } | null) {
  if (!error) return

  const cityMissing =
    error.code === 'PGRST204' || /['"]city['"].*(does not exist|schema cache)/i.test(error.message)

  if (cityMissing) {
    throw new Error(
      'Kolumnen city saknas i databasen. Kör supabase/migrations/20260830140000_leads_city.sql i Supabase SQL Editor och försök igen.',
    )
  }

  const parts = [error.message, error.details, error.hint].filter(Boolean)
  throw new Error(parts.join(' — ') || 'Kunde inte spara leaden.')
}

export function createServiceClient(): SupabaseClient {
  return createClient(requireEnv('NEXT_PUBLIC_SUPABASE_URL'), requireEnv('SUPABASE_SERVICE_ROLE_KEY'), {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export function leadFromRow(row: LeadRow): LeadDemoConfig {
  return {
    leadSlug: row.lead_slug,
    companyName: row.company_name,
    city: row.city,
    logoUrl: row.logo_url,
    accentColor: row.accent_color,
    industry: row.industry,
    loomVideoId: row.loom_video_id,
    contactName: row.contact_name,
    contactBookingUrl: row.contact_booking_url,
    copyOverride: row.copy_override,
  }
}

export async function getLeadBySlug(leadSlug: string): Promise<LeadDemoConfig | null> {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('leads')
    .select(
      'id, lead_slug, company_name, city, logo_url, accent_color, industry, loom_video_id, contact_name, contact_booking_url, copy_override, created_at, og_image_url, viewed_at, demo_clicked_at',
    )
    .eq('lead_slug', leadSlug)
    .maybeSingle()

  if (error) throwQueryError(error)
  if (!data) return null

  const row = data as LeadRow
  if (!isIndustry(row.industry)) return null
  return leadFromRow(row)
}

export async function listLeadSlugs() {
  const supabase = createServiceClient()
  const { data, error } = await supabase.from('leads').select('lead_slug')
  if (error) throwQueryError(error)
  return (data ?? []).map((row) => row.lead_slug as string)
}

export async function insertLead(input: {
  leadSlug: string
  companyName: string
  city: string
  logoUrl: string | null
  accentColor: string | null
  industry: Industry
  loomVideoId: string
  contactName: string
  contactBookingUrl: string
  copyOverride?: AidaCopy | null
}) {
  const supabase = createServiceClient()
  const { error } = await supabase.from('leads').insert({
    lead_slug: input.leadSlug,
    company_name: input.companyName,
    city: input.city,
    logo_url: input.logoUrl,
    accent_color: input.accentColor,
    industry: input.industry,
    loom_video_id: input.loomVideoId,
    contact_name: input.contactName,
    contact_booking_url: input.contactBookingUrl,
    copy_override: input.copyOverride ?? null,
  })

  if (error) throwQueryError(error)
  return input.leadSlug
}
