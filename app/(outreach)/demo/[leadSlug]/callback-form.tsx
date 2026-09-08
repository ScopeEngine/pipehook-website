'use client'

import { useActionState } from 'react'
import { ArrowRight } from 'lucide-react'
import { requestCallback, type CallbackFormState } from './request-callback'

const initialState: CallbackFormState = { status: 'idle' }

type CallbackFormProps = {
  companyName: string
  region: string
  leadSlug: string
  whatsappUrl: string | null
}

export function CallbackForm({ companyName, region, leadSlug, whatsappUrl }: CallbackFormProps) {
  const [state, action, pending] = useActionState(requestCallback, initialState)

  if (state.status === 'success') {
    return (
      <div className="callback-success" role="status">
        <strong>Tack! Vi hör av oss inom kort.</strong>
      </div>
    )
  }

  return (
    <div className="callback-block">
      <form action={action} className="callback-form">
        <input type="hidden" name="companyName" value={companyName} />
        <input type="hidden" name="region" value={region} />
        <input type="hidden" name="leadSlug" value={leadSlug} />

        <label htmlFor="callback-phone">Telefonnummer</label>
        <input
          id="callback-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="07X XXX XX XX"
        />

        <label htmlFor="callback-note" className="sr-only">
          Något du vill att vi vet innan vi ringer? (valfritt)
        </label>
        <textarea
          id="callback-note"
          name="note"
          rows={3}
          placeholder="Något du vill att vi vet innan vi ringer? (valfritt)"
        />

        {state.status === 'error' ? <p className="callback-error">{state.message}</p> : null}

        <button className="primary-button" type="submit" disabled={pending}>
          {pending ? 'Skickar…' : 'Be oss ringa upp'} <ArrowRight size={16} />
        </button>
      </form>

      <small>
        Vi jobbar bara med en partner per område, så vi hör av oss om {region} fortfarande är
        ledigt.
      </small>

      {whatsappUrl ? (
        <p className="callback-whatsapp">
          Har du en fråga innan dess, eller vill du hellre inte vänta på ett samtal?{' '}
          <a href={whatsappUrl} target="_blank" rel="noreferrer">
            Skicka WhatsApp →
          </a>
        </p>
      ) : null}
    </div>
  )
}
