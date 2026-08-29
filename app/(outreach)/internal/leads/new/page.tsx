import type { Metadata } from 'next'
import { NewLeadForm } from './new-lead-form'

export const metadata: Metadata = {
  title: 'Ny lead-sida · PipeHook intern',
  robots: { index: false, follow: false },
}

export default function NewLeadPage() {
  return <NewLeadForm />
}
