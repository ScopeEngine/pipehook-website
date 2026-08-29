import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowRight, CalendarCheck, Check, ExternalLink, Play } from 'lucide-react'
import { buildDemoUrl, industryLabels, resolveCopy, resolvedAccent } from '@/lib/lead-demo.config'
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

export default async function LeadDemoPage({ params }: PageProps<'/demo/[leadSlug]'>) {
  const { leadSlug } = await params
  const lead = await getLeadBySlug(leadSlug)
  if (!lead) notFound()

  const copy = resolveCopy(lead)
  const demoUrl = buildDemoUrl(lead)
  const accent = resolvedAccent(lead)

  return (
    <main className="demo-page" style={{ '--lead-accent': accent } as CSSProperties}>
      <header className="demo-nav wrap">
        <a className="logo" href="/se">
          <span className="logo-pipe">P</span> pipehook
        </a>
        <div className="demo-nav-meta">
          {lead.logoUrl ? (
            // External prospect logos are not in next/image remotePatterns.
            // eslint-disable-next-line @next/next/no-img-element
            <img className="demo-company-logo" src={lead.logoUrl} alt={lead.companyName} />
          ) : (
            <strong>{lead.companyName}</strong>
          )}
        </div>
      </header>

      <section className="demo-hero wrap">
        <p className="status-pill font-sans text-sm font-medium tracking-wide">
          <span /> {industryLabels[lead.industry]} · privat sida
        </p>
        <h1 className="leading-tight">
          Hej {lead.contactName.split(' ')[0]}, en kort genomgång för{' '}
          <em>{lead.companyName}</em>.
        </h1>
        <p className="demo-hero-sub">{copy.attention.body}</p>
      </section>

      <section className="demo-video wrap" aria-label="Personlig Loom-video">
        <div className="demo-video-frame">
          <iframe
            src={`https://www.loom.com/embed/${lead.loomVideoId}`}
            title={`Loom-video till ${lead.companyName}`}
            allowFullScreen
          />
        </div>
      </section>

      <section className="demo-cta-band wrap">
        <a className="primary-button demo-demo-button" href={demoUrl} target="_blank" rel="noreferrer">
          <Play size={16} /> {copy.action.demoCta} <ExternalLink size={15} />
        </a>
        <p className="no-card">Brandad demo på funnels.pipehook.co · under två minuter</p>
      </section>

      <section className="demo-letter section-light">
        <div className="wrap demo-letter-inner">
          <article>
            <p className="kicker">{copy.attention.kicker}</p>
            <h2>{copy.attention.headline}</h2>
          </article>

          <article>
            <p className="kicker">Intresse</p>
            <h2>{copy.interest.headline}</h2>
            <p>{copy.interest.body}</p>
          </article>

          <article>
            <p className="kicker">Varför det funkar</p>
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
          </article>

          <article>
            <p className="kicker">Nästa steg</p>
            <h2>{copy.action.headline}</h2>
            <p>{copy.action.body}</p>
            <div className="demo-actions">
              <a className="primary-button" href={demoUrl} target="_blank" rel="noreferrer">
                {copy.action.demoCta} <ArrowRight size={16} />
              </a>
              <a className="demo-booking" href={lead.contactBookingUrl} target="_blank" rel="noreferrer">
                <CalendarCheck size={16} /> {copy.action.bookingCta}
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="demo-faq section-light">
        <div className="wrap">
          <p className="kicker">Vanliga frågor</p>
          <h2>Innan ni tar ett beslut.</h2>
          <dl className="demo-faq-list">
            {copy.faq.map((item) => (
              <div key={item.question}>
                <dt>{item.question}</dt>
                <dd>{item.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="availability demo-close">
        <div className="availability-grid" />
        <div className="wrap availability-inner">
          <p className="kicker blue-kicker">Redo när ni är</p>
          <h2>
            Se tratten.
            <br />
            <em>Sedan pratar vi.</em>
          </h2>
          <p>
            {lead.contactName}, öppna demot eller boka en kort genomgång — vi kollar om{' '}
            {lead.companyName}s region fortfarande är ledig.
          </p>
          <div className="demo-actions demo-actions-center">
            <a className="primary-button" href={demoUrl} target="_blank" rel="noreferrer">
              {copy.action.demoCta} <ArrowRight size={16} />
            </a>
            <a className="demo-booking demo-booking-light" href={lead.contactBookingUrl} target="_blank" rel="noreferrer">
              {copy.action.bookingCta}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
