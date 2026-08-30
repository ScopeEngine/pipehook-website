'use client'

import { useActionState, useState } from 'react'
import { BrandLogo } from '@/components/brand-logo'
import { industries, industryAccents, industryLabels, type Industry } from '@/lib/lead-demo.config'
import { createLead, type CreateLeadState } from './actions'

const initialState: CreateLeadState = { status: 'idle' }

export function NewLeadForm() {
  const [state, action, pending] = useActionState(createLead, initialState)
  const [industry, setIndustry] = useState<Industry>('relining')
  const [accent, setAccent] = useState(industryAccents.relining)
  const [copied, setCopied] = useState(false)

  function onIndustryChange(next: Industry) {
    setIndustry(next)
    setAccent(industryAccents[next])
  }

  async function copyLink(url: string) {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="lead-admin">
      <header className="lead-admin-top">
        <BrandLogo href="/se" />
        <span className="lead-admin-kicker">Internt · inte indexerat</span>
      </header>

      <div className="lead-admin-card">
        <p className="kicker">Ny outreach-sida</p>
        <h1>Skapa en lead-sida</h1>
        <p className="lead-admin-intro">
          Fyll i företaget, ort, Loom-ID och bokningslänk. Sluggen skapas automatiskt. Efter submit
          får du länken att klistra in i mejlet.
        </p>

        {state.status === 'success' && (
          <div className="lead-admin-success">
            <strong>Sidan är live.</strong>
            <code>{state.demoUrl}</code>
            <div className="lead-admin-success-actions">
              <button type="button" className="primary-button" onClick={() => copyLink(state.demoUrl)}>
                {copied ? 'Kopierad' : 'Kopiera länk'}
              </button>
              <a className="lead-admin-secondary" href={state.demoUrl} target="_blank" rel="noreferrer">
                Öppna sidan
              </a>
            </div>
          </div>
        )}

        {state.status === 'error' && <p className="lead-admin-error">{state.message}</p>}

        <form action={action} className="lead-admin-form">
          <label htmlFor="companyName">Företagsnamn</label>
          <input id="companyName" name="companyName" required placeholder="t.ex. Svealands Relining" />

          <label htmlFor="city">Ort</label>
          <input id="city" name="city" required placeholder="t.ex. Västerås" />

          <label htmlFor="logoUrl">Logotyp-URL</label>
          <input id="logoUrl" name="logoUrl" type="url" placeholder="https://…" />

          <label htmlFor="industry">Bransch</label>
          <select
            id="industry"
            name="industry"
            value={industry}
            onChange={(event) => onIndustryChange(event.target.value as Industry)}
          >
            {industries.map((value) => (
              <option key={value} value={value}>
                {industryLabels[value]}
              </option>
            ))}
          </select>

          <label htmlFor="loomVideoId">Loom video-ID</label>
          <input
            id="loomVideoId"
            name="loomVideoId"
            required
            placeholder="bara ID:t efter /share/"
            autoComplete="off"
          />

          <label htmlFor="contactName">Kontaktperson</label>
          <input id="contactName" name="contactName" required placeholder="Förnamn Efternamn" />

          <label htmlFor="contactBookingUrl">Bokningslänk</label>
          <input
            id="contactBookingUrl"
            name="contactBookingUrl"
            type="url"
            required
            placeholder="https://cal.com/…"
          />

          <label htmlFor="accentColor">Accentfärg</label>
          <div className="lead-admin-color">
            <input
              id="accentColor"
              name="accentColor"
              type="text"
              value={accent}
              onChange={(event) => setAccent(event.target.value)}
              placeholder={industryAccents[industry]}
            />
            <input
              type="color"
              aria-label="Välj accentfärg"
              value={/^#([0-9a-fA-F]{6})$/.test(accent) ? accent : industryAccents[industry]}
              onChange={(event) => setAccent(event.target.value)}
            />
          </div>
          <small>Lämna branschens standard om du inte har en egen färg.</small>

          <button className="primary-button" type="submit" disabled={pending}>
            {pending ? 'Sparar…' : 'Publicera lead-sida'}
          </button>
        </form>
      </div>
    </div>
  )
}
