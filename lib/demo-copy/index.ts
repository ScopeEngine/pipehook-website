import type { LeadLocale } from '@/lib/lead-demo.config'
import { demoCopySv } from './sv'
import { demoCopyUs } from './us'
import type { DemoCopy } from './types'

export type { DemoCopy, DemoImage, DemoRequirement } from './types'

export function getDemoCopy(locale: LeadLocale): DemoCopy {
  return locale === 'us' ? demoCopyUs : demoCopySv
}
