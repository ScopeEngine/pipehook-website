import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowRight, CalendarCheck, Check, MapPin, Play } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import {
  buildDemoUrl,
  industryLabels,
  resolveCopy,
  resolvedAccent,
  type AidaCopy,
  type LeadDemoConfig,
} from '@/lib/lead-demo.config'
import { getLeadBySlug } from '@/lib/leads'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: PageProps<'/demo/[leadSlug]'>): Promise<Metadata> {
  const { leadSlug } = await params
  try {
    const lead = await getLeadBySlug(leadSlug)
    if (!lead) return { robots: { index: false, follow: false } }

    return {
      title: `${lead.companyName} · PipeHook demo`,
      description: `En privat genomgång för ${lead.companyName}.`,
      robots: { index: false, follow: false },
    }
  } catch {
    return { robots: { index: false, follow: false } }
  }
}

const quizSteps = [
  {
    screen: '',
    label: '01',
    title: 'Byggår',
    prompt: 'När byggdes huset?',
    caption: 'Vi filtrerar bort fastigheter där jobbet inte är värt resan.',
  },
  {
    screen: 'q1',
    label: '02',
    title: 'Symptom',
    prompt: 'Vad har ni märkt i rören?',
    caption: 'Rätt symptom leder till rätt samtal — inte ett generellt offertramsa.',
  },
  {
    screen: 'q2',
    label: '03',
    title: 'Ägande',
    prompt: 'Äger ni fastigheten?',
    caption: 'Hyresgäster och nyfikna diskvalificeras innan de når kalendern.',
  },
  {
    screen: 'q3',
    label: '04',
    title: 'Riskbild',
    prompt: 'Så ser er situation ut.',
    caption: 'Husägaren får en tydlig bild. Ni får ett bokat hembesök.',
  },
] as const

const comparisonRows = [
  {
    point: 'Vem äger leaden?',
    other: 'Samma förfrågan går till tre firmor.',
    ours: 'Bara ni, i ert område.',
  },
  {
    point: 'Kvalificering',
    other: 'Alla klick räknas som leads.',
    ours: 'Aktiv diskvalificering innan bokning.',
  },
  {
    point: 'Varumärke',
    other: 'Kunden landar på offertsajten.',
    ours: 'Hela tratten körs under ert namn.',
  },
  {
    point: 'Kostnad',
    other: 'Per lead, per klick, budgivning.',
    ours: 'En fast månadsavgift.',
  },
  {
    point: 'När bokas jobbet?',
    other: 'När någon hinner ringa tillbaka.',
    ours: 'Dygnet runt, rakt in i kalendern.',
  },
] as const

function firstName(contactName: string) {
  return contactName.trim().split(/\s+/)[0] || contactName
}

function placeLabel(lead: LeadDemoConfig) {
  return lead.city ? `${lead.companyName} i ${lead.city}` : lead.companyName
}

function ProspectMark({ lead }: { lead: LeadDemoConfig }) {
  if (lead.logoUrl) {
    return (
      // External prospect logos are not in next/image remotePatterns.
      // eslint-disable-next-line @next/next/no-img-element
      <img className="demo-company-logo" src={lead.logoUrl} alt={lead.companyName} />
    )
  }

  return <span className="outreach-company">{placeLabel(lead)}</span>
}

function DemoCta({ href }: { href: string }) {
  return (
    <a className="primary-button" href={href} target="_blank" rel="noreferrer">
      Testa demot <ArrowRight size={16} />
    </a>
  )
}

export default async function LeadDemoPage({ params }: PageProps<'/demo/[leadSlug]'>) {
  const { leadSlug } = await params
  const lead = await getLeadBySlug(leadSlug)
  if (!lead) notFound()

  const copy = resolveCopy(lead)
  const demoUrl = buildDemoUrl(lead)
  const accent = resolvedAccent(lead)
  const name = firstName(lead.contactName)
  const place = placeLabel(lead)

  return (
    <main className="outreach-page" style={{ '--lead-accent': accent } as CSSProperties}>
      <section className="outreach-hero">
        <nav className="outreach-nav wrap">
          <BrandLogo href="/se" priority />
          <ProspectMark lead={lead} />
          <a className="nav-cta" href={demoUrl} target="_blank" rel="noreferrer">
            Testa demot <ArrowRight size={15} />
          </a>
        </nav>

        <div className="wrap outreach-hero-inner">
          <p className="kicker blue-kicker">
            {copy.attention.kicker} · {industryLabels[lead.industry]}
          </p>
          <h1 className="leading-tight">
            Hej {name}. {copy.attention.headline}
          </h1>
          <p className="outreach-lede">{copy.attention.body}</p>

          <div className="outreach-video">
            <iframe
              src={`https://www.loom.com/embed/${lead.loomVideoId}`}
              title={`Loom-video till ${lead.companyName}`}
              allowFullScreen
            />
          </div>

          <DemoCta href={demoUrl} />
          <small>
            <Play size={12} /> Två minuter · brandad demo för {lead.companyName}
          </small>
        </div>
      </section>

      <AdsSection copy={copy} />
      <TrafficSection />
      <QuizSection demoUrl={demoUrl} />
      <SmsSection companyName={lead.companyName} contactName={name} />
      <ProofSection copy={copy} />
      <ComparisonSection />
      <RegionSection city={lead.city} companyName={lead.companyName} />

      <section className="outreach-final">
        <div className="wrap">
          <p className="kicker blue-kicker">Nästa steg</p>
          <h2>
            {copy.action.headline}
            <br />
            <em>{place}.</em>
          </h2>
          <p>{copy.action.body}</p>
          <DemoCta href={demoUrl} />
          <a className="demo-booking demo-booking-light" href={lead.contactBookingUrl} target="_blank" rel="noreferrer">
            <CalendarCheck size={16} /> {copy.action.bookingCta}
          </a>
          <small>
            {name}, öppna demot eller boka en kort genomgång — vi kollar om regionen fortfarande är
            ledig.
          </small>
        </div>
      </section>
    </main>
  )
}

function AdsSection({ copy }: { copy: AidaCopy }) {
  return (
    <section className="outreach-section section-light">
      <div className="wrap">
        <p className="kicker">Så ser det ut i flödet</p>
        <h2>{copy.interest.headline}</h2>
        <div className="ad-grid">
          <article className="ad-card hook">
            <div className="ad-art">
              <span>META · LOKALT</span>
              <strong>Fuktskadat avlopp? Ta reda på om relining räcker.</strong>
              <button type="button" tabIndex={-1}>
                Starta bedömningen
              </button>
            </div>
            <b>Annonserna pekar mot er tratt — inte mot en offertsajt.</b>
          </article>
          <article className="ad-card">
            <div className="ad-art">
              <span>SÖK · ERT OMRÅDE</span>
              <strong>Husägare som redan letar efter en permanent lösning.</strong>
              <i aria-hidden />
            </div>
            <b>Trafiken landar under ert varumärke, inte under vårt.</b>
          </article>
        </div>
        <p className="section-copy">{copy.interest.body}</p>
      </div>
    </section>
  )
}

function TrafficSection() {
  return (
    <section className="outreach-section traffic-section light-zone">
      <div className="wrap">
        <p className="kicker blue-kicker">Räckvidd</p>
        <h2>Google och Meta, utan att ni sitter i annonskontona.</h2>
        <div className="traffic-grid">
          <article>
            <span>GOOGLE</span>
            <h3>De som redan söker.</h3>
            <p>
              Sökannonser fångar husägare med ett konkret problem — stopp, lukt, fukt eller ett
              uttjänt system — och skickar dem in i den diagnostiska tratten.
            </p>
          </article>
          <article>
            <span>META</span>
            <h3>De som ännu inte har ringt.</h3>
            <p>
              Lokala annonser når villor i ert upptagningsområde innan de går in på en offertsajt
              och blir tre firmors delade lead.
            </p>
          </article>
        </div>
        <p className="section-copy">
          Ni behöver inte lära er Media Manager. Vi sätter upp, styr och justerar trafiken mot de
          jobb ni faktiskt vill ha.
        </p>
      </div>
    </section>
  )
}

function QuizSection({ demoUrl }: { demoUrl: string }) {
  return (
    <section className="outreach-section section-light" id="quiz">
      <div className="wrap">
        <p className="kicker">Den interaktiva kroken</p>
        <h2>Fyra frågor. Sen är det antingen ett jobb — eller inte.</h2>
        <div className="quiz-strip">
          {quizSteps.map((step) => (
            <article key={step.title}>
              <div className={`quiz-screen ${step.screen}`.trim()}>
                <span>{step.label}</span>
                <strong>{step.prompt}</strong>
                <div className="quiz-line" />
              </div>
              <b>{step.title}</b>
              <p>{step.caption}</p>
            </article>
          ))}
        </div>
        <a className="back-demo" href={demoUrl} target="_blank" rel="noreferrer">
          Testa demot och klicka igenom frågorna <ArrowRight size={14} />
        </a>
      </div>
    </section>
  )
}

function SmsSection({ companyName, contactName }: { companyName: string; contactName: string }) {
  return (
    <section className="outreach-section sms-section light-zone">
      <div className="wrap sms-layout">
        <div>
          <p className="kicker">Uppföljning som inte släpper</p>
          <h2>AI:n tar samtalet vidare. Era tekniker tar jobbet.</h2>
          <p className="section-copy">
            {contactName}, det här är vad husägaren ser efter testet. Inget CRM att lära sig — ni
            får en tid, inte en lapp i inkorgen.
          </p>
        </div>
        <div className="sms-thread" aria-label="Exempel på SMS-uppföljning">
          <div className="sms-bubble">
            <small>{companyName}</small>
            <p>Hej! Vi såg att du gick igenom bedömningen. Vill du ha en tid för inspektion i veckan?</p>
          </div>
          <div className="sms-bubble from-customer">
            <small>Husägare</small>
            <p>Ja, gärna torsdag förmiddag om det går.</p>
          </div>
          <div className="sms-bubble">
            <small>{companyName}</small>
            <p>Klart. Torsdag 10:00 är bokat. Ni får en bekräftelse i kalendern.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProofSection({ copy }: { copy: AidaCopy }) {
  return (
    <section className="outreach-section section-light">
      <div className="wrap proof-grid">
        <div className="proof-copy">
          <p className="kicker">Det ni faktiskt får</p>
          <h2>{copy.desire.headline}</h2>
          <p>{copy.desire.intro}</p>
          <ul className="demo-bullets">
            {copy.desire.bullets.map((bullet) => (
              <li key={bullet}>
                <Check size={16} />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
        <aside className="growth-card">
          <span className="chart-label">KALENDER, INTE KLICK</span>
          <div className="bars" aria-hidden>
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <strong>Fler rätt jobb</strong>
          <p>Volym utan filter fyller inte veckan. Kvalificerade bokningar gör det.</p>
        </aside>
      </div>
    </section>
  )
}

function ComparisonSection() {
  return (
    <section className="outreach-section comparison-section" id="comparison">
      <div className="wrap">
        <p className="kicker blue-kicker">Varför inte offertsajterna</p>
        <h2>Samma husägare. Helt annan affär.</h2>
        <div className="comparison-table">
          <div className="table-head">
            <span>Jämförelsepunkt</span>
            <span>Offertsajter</span>
            <span>PipeHook</span>
          </div>
          {comparisonRows.map((row) => (
            <div className="table-row" key={row.point}>
              <b>{row.point}</b>
              <span data-label="Offertsajter">{row.other}</span>
              <strong data-label="PipeHook">{row.ours}</strong>
            </div>
          ))}
        </div>
        <p className="section-copy">
          Offertsajter säljer samma förfrågan flera gånger. PipeHook licensierar tratten till ett
          företag per geografi — så att samtalet ni får faktiskt är ert.
        </p>
      </div>
    </section>
  )
}

function RegionSection({ city, companyName }: { city: string; companyName: string }) {
  return (
    <section className="outreach-section region-section">
      <div className="wrap region-layout">
        <div>
          <p className="kicker">Regionexklusivitet</p>
          <h2>
            Ett område.
            <br />
            <em>En partner.</em>
          </h2>
          <p className="section-copy">
            För att leadkvaliteten ska hålla släpper vi inte in en konkurrent i samma geografi. När{' '}
            {companyName} tar regionen är den låst.
          </p>
        </div>
        <div className="territory-card" aria-label="Område">
          <div className="map-grid" />
          <MapPin size={28} />
          <span>TERRITORIUM</span>
          <b>{city || companyName}</b>
        </div>
      </div>
    </section>
  )
}
