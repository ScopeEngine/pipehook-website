'use client'

import { useState } from 'react'
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Droplets,
  Filter,
  Gauge,
  MapPin,
  Menu,
  MousePointerClick,
  Sparkles,
  Target,
  X,
} from 'lucide-react'
import type { Dictionary } from '@/lib/get-dictionary'
import type { Locale } from '@/lib/i18n'
import { LanguageSwitcher } from './language-switcher'

const benefitIcons = [Droplets, Gauge, Filter]
const stepIcons = [Target, MousePointerClick, CalendarCheck]

function FunnelPreview({
  label,
  url,
  desktop,
  mobile,
}: Dictionary['preview']) {
  return (
    <div className="preview-stage" aria-label={label}>
      <div className="browser-frame">
        <div className="browser-bar">
          <div className="traffic">
            <i />
            <i />
            <i />
          </div>
          <span>{url}</span>
          <span className="browser-menu">•••</span>
        </div>
        <div className="browser-placeholder">
          <span>{desktop}</span>
        </div>
      </div>
      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="phone-placeholder">
          <span>{mobile}</span>
        </div>
      </div>
    </div>
  )
}

export function LandingPage({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [regionOpen, setRegionOpen] = useState(false)

  return (
    <main>
      <section className="hero" id="top">
        <div className="grid-texture" />
        <div className="hero-glow" />

        <nav className="nav wrap">
          <a className="logo" href="#top">
            <span className="logo-pipe">P</span> pipehook
          </a>
          <div className={`nav-links font-sans text-sm font-medium tracking-wide ${menuOpen ? 'is-open' : ''}`}>
            <a href="#difference" onClick={() => setMenuOpen(false)}>
              {dict.nav.why}
            </a>
            <a href="#process" onClick={() => setMenuOpen(false)}>
              {dict.nav.how}
            </a>
            <a href="#regions" onClick={() => setMenuOpen(false)}>
              {dict.nav.regions}
            </a>
          </div>
          <LanguageSwitcher
            lang={lang}
            label={dict.nav.language}
            english={dict.nav.english}
            swedish={dict.nav.swedish}
          />
          <button className="nav-cta font-sans text-sm font-medium tracking-wide" type="button" onClick={() => setRegionOpen(true)}>
            {dict.nav.requestDemo} <ArrowRight size={15} />
          </button>
          <button
            className="menu-button"
            type="button"
            aria-label={dict.nav.toggleMenu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        <div className="hero-copy wrap">
          <div className="status-pill font-sans text-sm font-medium tracking-wide">
            <span /> {dict.hero.pill}
          </div>
          <h1 className="leading-tight">
            {dict.hero.titleBefore}
            <em>{dict.hero.titleHighlight}</em>
            {dict.hero.titleAfter}
          </h1>
          <p className="hero-sub">{dict.hero.sub}</p>
          <div className="hero-actions">
            <button className="primary-button" type="button" onClick={() => setRegionOpen(true)}>
              {dict.nav.requestDemo} <ArrowRight size={17} />
            </button>
            <span className="no-card">
              <Check size={14} /> {dict.hero.noCard}
            </span>
          </div>
        </div>

        <FunnelPreview {...dict.preview} />

        <div className="trust-row wrap">
          <span>{dict.hero.trust}</span>
          <div>
            <b>Meta</b>
            <b>Stripe</b>
            <b>Twilio</b>
            <b>Google</b>
          </div>
        </div>
      </section>

      <section className="difference section-light" id="difference">
        <div className="wrap">
          <div className="section-intro">
            <p className="kicker">{dict.difference.kicker}</p>
            <h2>
              {dict.difference.title}
              <br />
              <span>{dict.difference.titleMuted}</span>
            </h2>
            <p>{dict.difference.body}</p>
          </div>
          <div className="benefit-grid">
            {dict.benefits.map(({ title, text }, index) => {
              const Icon = benefitIcons[index]
              return (
                <article className="benefit-card" key={title}>
                  <div className="icon-box">
                    <Icon size={20} />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="process section-light" id="process">
        <div className="wrap">
          <div className="process-heading">
            <div>
              <p className="kicker">{dict.process.kicker}</p>
              <h2>
                {dict.process.titleLine1}
                <br />
                {dict.process.titleLine2}
              </h2>
            </div>
            <p>{dict.process.body}</p>
          </div>
          <div className="steps">
            {dict.steps.map(({ number, title, text }, index) => {
              const Icon = stepIcons[index]
              return (
                <div className="step" key={number}>
                  <div className="step-top">
                    <span className="step-number">{number}</span>
                    <Icon size={24} />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  {index < dict.steps.length - 1 && (
                    <div className="connector">
                      <ArrowRight size={17} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="regions section-light" id="regions">
        <div className="wrap regions-layout">
          <div className="regions-copy">
            <p className="kicker">{dict.regions.kicker}</p>
            <h2>
              {dict.regions.title}
              <br />
              <span>{dict.regions.titleMuted}</span>
            </h2>
            <p>{dict.regions.body}</p>
            <button className="primary-button" type="button" onClick={() => setRegionOpen(true)}>
              {dict.regions.checkAvailability} <MapPin size={16} />
            </button>
          </div>
          <div className="map-visual" aria-label={dict.regions.mapLabel}>
            <div className="map-grid" />
            <div className="map-route route-one" />
            <div className="map-route route-two" />
            <div className="map-pin">
              <MapPin size={25} />
            </div>
            <span className="map-label">{dict.regions.claimed}</span>
            <span className="map-city">{dict.regions.city}</span>
          </div>
        </div>
      </section>

      <section className="availability" id="availability">
        <div className="availability-grid" />
        <div className="wrap availability-inner">
          <p className="kicker blue-kicker">{dict.availability.kicker}</p>
          <h2>
            {dict.availability.title}
            <br />
            <em>{dict.availability.titleHighlight}</em>
          </h2>
          <p>{dict.availability.body}</p>
          <button className="primary-button" type="button" onClick={() => setRegionOpen(true)}>
            {dict.nav.requestDemo} <MapPin size={16} />
          </button>
          <div className="availability-note">
            <Sparkles size={15} /> {dict.availability.note}
          </div>
        </div>

        <footer className="wrap footer">
          <a className="logo" href="#top">
            <span className="logo-pipe">P</span> pipehook
          </a>
          <span>{dict.footer.copyright}</span>
          <div>
            <a href="#difference">{dict.footer.difference}</a>
            <a href="#process">{dict.footer.process}</a>
            <a href="mailto:hello@pipehook.co">{dict.footer.contact}</a>
          </div>
        </footer>
      </section>

      {regionOpen && (
        <div className="modal-backdrop" role="presentation" onClick={() => setRegionOpen(false)}>
          <div
            className="region-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="region-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="close-modal"
              type="button"
              aria-label={dict.modal.close}
              onClick={() => setRegionOpen(false)}
            >
              <X size={18} />
            </button>
            <p className="kicker">{dict.modal.kicker}</p>
            <h2 id="region-title">{dict.modal.title}</h2>
            <p>{dict.modal.body}</p>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                setRegionOpen(false)
              }}
            >
              <label htmlFor="full-name">{dict.modal.fullName}</label>
              <input id="full-name" name="fullName" required />

              <label htmlFor="company-name">{dict.modal.companyName}</label>
              <input id="company-name" name="companyName" required />

              <label htmlFor="service-region">{dict.modal.serviceRegion}</label>
              <input
                id="service-region"
                name="serviceRegion"
                placeholder={dict.modal.serviceRegionPlaceholder}
                required
              />

              <label htmlFor="phone">{dict.modal.phone}</label>
              <input id="phone" name="phone" type="tel" required />

              <label htmlFor="email">{dict.modal.email}</label>
              <input id="email" name="email" type="email" required />

              <button className="primary-button" type="submit">
                {dict.modal.submit} <ArrowRight size={16} />
              </button>
              <small>{dict.modal.finePrint}</small>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
