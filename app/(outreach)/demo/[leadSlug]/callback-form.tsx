'use client'

import Image from 'next/image'
import { useActionState } from 'react'
import { ArrowRight } from 'lucide-react'
import type { DemoCopy } from '@/lib/demo-copy'
import { requestCallback, type CallbackFormState } from './request-callback'

const initialState: CallbackFormState = { status: 'idle' }

type CallbackFormProps = {
  companyName: string
  region: string
  leadSlug: string
  whatsappUrl: string | null
  copy: DemoCopy['callback']
}

export function CallbackForm({
  companyName,
  region,
  leadSlug,
  whatsappUrl,
  copy,
}: CallbackFormProps) {
  const [state, action, pending] = useActionState(requestCallback, initialState)

  if (state.status === 'success') {
    return (
      <div className="callback-success" role="status">
        <strong>{copy.success}</strong>
      </div>
    )
  }

  return (
    <div className="callback-block">
      <form action={action} className="callback-form">
        <input type="hidden" name="companyName" value={companyName} />
        <input type="hidden" name="region" value={region} />
        <input type="hidden" name="leadSlug" value={leadSlug} />

        <label htmlFor="callback-phone">{copy.phoneLabel}</label>
        <input
          id="callback-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder={copy.phonePlaceholder}
        />

        <label htmlFor="callback-note" className="sr-only">
          {copy.notePlaceholder}
        </label>
        <textarea
          id="callback-note"
          name="note"
          rows={3}
          placeholder={copy.notePlaceholder}
        />

        {state.status === 'error' ? <p className="callback-error">{state.message}</p> : null}

        <button className="primary-button" type="submit" disabled={pending}>
          {pending ? copy.submitting : copy.submit} <ArrowRight size={16} />
        </button>
      </form>

      <small>{copy.microcopy}</small>

      {copy.showWhatsApp ? (
        <div className="callback-whatsapp">
          <p className="callback-whatsapp-text">{copy.whatsappPrompt}</p>
          <a
            className="callback-whatsapp-button"
            href={whatsappUrl ?? '#'}
            target={whatsappUrl ? '_blank' : undefined}
            rel="noreferrer"
            aria-label={copy.whatsappButton}
          >
            <Image
              src="/demo/whatsapp-icon.png"
              alt=""
              width={88}
              height={88}
              className="callback-whatsapp-icon"
              priority
            />
            <span>{copy.whatsappButton}</span>
          </a>
        </div>
      ) : null}
    </div>
  )
}
