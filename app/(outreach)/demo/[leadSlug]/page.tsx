import type { CSSProperties, ReactNode } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowRight, Home, Phone, Star } from 'lucide-react'
import { getDemoCopy } from '@/lib/demo-copy'
import type { DemoImage } from '@/lib/demo-copy'
import { buildDemoUrl, resolvedAccent } from '@/lib/lead-demo.config'
import { getLeadBySlug } from '@/lib/leads'
import { CallbackForm } from './callback-form'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: PageProps<'/demo/[leadSlug]'>): Promise<Metadata> {
  const { leadSlug } = await params
  try {
    const lead = await getLeadBySlug(leadSlug)
    if (!lead) return { robots: { index: false, follow: false } }
    const copy = getDemoCopy(lead.locale)

    return {
      title: `${lead.companyName} · PipeHook demo`,
      description: copy.metaDescription(lead.companyName),
      robots: { index: false, follow: false },
    }
  } catch {
    return { robots: { index: false, follow: false } }
  }
}

function whatsappHref(raw: string | undefined) {
  if (!raw) return null
  const digits = raw.replace(/\D/g, '')
  if (!digits) return null
  return `https://wa.me/${digits}`
}

function renderRichText(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }
    return <span key={index}>{part}</span>
  })
}

function SectionImage({ image }: { image: DemoImage }) {
  return (
    <figure className="section-image">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(max-width: 700px) 100vw, 520px"
      />
    </figure>
  )
}

const requirementIcons = {
  star: Star,
  phone: Phone,
  home: Home,
} as const

export default async function LeadDemoPage({ params }: PageProps<'/demo/[leadSlug]'>) {
  const { leadSlug } = await params
  const lead = await getLeadBySlug(leadSlug)
  if (!lead) notFound()

  const copy = getDemoCopy(lead.locale)
  const demoUrl = buildDemoUrl(lead)
  const accent = resolvedAccent(lead)
  const market = lead.region
  const company = lead.companyName
  const whatsappUrl =
    copy.callback.showWhatsApp
      ? whatsappHref(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+46735161225')
      : null

  return (
    <main className="outreach-page" style={{ '--lead-accent': accent } as CSSProperties}>
      <section className="outreach-hero">
        <div className="outreach-video">
          <iframe
            src={`https://www.loom.com/embed/${lead.loomVideoId}?autoplay=1`}
            title={copy.loomTitle(company)}
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
      </section>

      <section className="outreach-section section-light">
        <div className="wrap story-layout">
          <div>
            <p className="kicker">{copy.control.kicker}</p>
            <h2>{copy.control.headline}</h2>
            <p className="section-copy section-copy-flush">{copy.control.intro}</p>
            <ul className="trap-list">
              {copy.control.traps.map((trap) => (
                <li key={trap.title}>
                  <b>{trap.title}</b> {trap.body}
                </li>
              ))}
            </ul>
            <p className="section-copy">
              <strong>{copy.control.closing}</strong>
            </p>
          </div>
          <SectionImage image={copy.control.image} />
          <p className="bridge-line">{copy.control.bridge}</p>
        </div>
      </section>

      <section className="outreach-section section-light">
        <div className="wrap">
          <div className="story-layout">
            <div>
              <p className="kicker">{copy.misunderstanding.kicker}</p>
              <h2>{copy.misunderstanding.headline}</h2>
              {copy.misunderstanding.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={index === 0 ? 'section-copy section-copy-flush' : 'section-copy'}
                >
                  {renderRichText(paragraph)}
                </p>
              ))}
              <ul className="negative-list">
                {copy.misunderstanding.negativeItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <SectionImage image={copy.misunderstanding.image} />
            <p className="bridge-line">{copy.misunderstanding.bridge}</p>
          </div>
        </div>
      </section>

      <section className="outreach-section section-light">
        <div className="wrap">
          <div className="story-layout">
            <div>
              <p className="kicker">{copy.journey.kicker}</p>
              <h2>{copy.journey.headline}</h2>
              {copy.journey.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={index === 0 ? 'section-copy section-copy-flush' : 'section-copy'}
                >
                  {renderRichText(paragraph)}
                </p>
              ))}
            </div>
            <SectionImage image={copy.journey.image} />
            <p className="bridge-line">{copy.journey.bridge}</p>
          </div>
        </div>
      </section>

      <section className="outreach-section section-light" id="reach">
        <div className="wrap">
          <div className="story-layout">
            <div>
              <p className="kicker">{copy.volume.kicker}</p>
              <h2>{copy.volume.headline}</h2>
              {copy.volume.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={index === 0 ? 'section-copy section-copy-flush' : 'section-copy'}
                >
                  {renderRichText(paragraph)}
                </p>
              ))}
            </div>
            <SectionImage image={copy.volume.image} />
            <p className="bridge-line">{copy.volume.bridge}</p>
          </div>
        </div>
      </section>

      <section className="outreach-section section-light">
        <div className="wrap">
          <div className="story-layout">
            <div>
              <p className="kicker">{copy.diagnostic.kicker}</p>
              <h2>{copy.diagnostic.headline}</h2>
              {copy.diagnostic.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={index === 0 ? 'section-copy section-copy-flush' : 'section-copy'}
                >
                  {renderRichText(paragraph)}
                </p>
              ))}
            </div>
            {copy.diagnostic.image ? <SectionImage image={copy.diagnostic.image} /> : null}
            <p className="bridge-line">{copy.diagnostic.bridge}</p>
          </div>
        </div>
      </section>

      <section className="outreach-section section-light" id="quiz">
        <div className="wrap">
          <div className="story-layout">
            <div>
              <p className="kicker">{copy.qualification.kicker}</p>
              <h2>{copy.qualification.headline}</h2>
              {copy.qualification.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={index === 0 ? 'section-copy section-copy-flush' : 'section-copy'}
                >
                  {renderRichText(paragraph)}
                </p>
              ))}
            </div>
            <SectionImage image={copy.qualification.image} />
          </div>
          <p className="section-copy">{copy.qualification.afterImage}</p>
          <p className="bridge-line">{copy.qualification.bridge}</p>
        </div>
      </section>

      <section className="outreach-section section-light">
        <div className="wrap">
          <div className="story-layout">
            <div>
              <p className="kicker">{copy.sms.kicker}</p>
              <h2>{copy.sms.headline}</h2>
              {copy.sms.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={index === 0 ? 'section-copy section-copy-flush' : 'section-copy'}
                >
                  {renderRichText(paragraph)}
                </p>
              ))}
            </div>
            <SectionImage image={copy.sms.image} />
            <p className="bridge-line">{copy.sms.bridge}</p>
          </div>
        </div>
      </section>

      <section className="outreach-section section-light">
        <div className="wrap">
          <div className="story-layout">
            <div>
              <p className="kicker">{copy.authority.kicker}</p>
              <h2>{copy.authority.headline}</h2>
              {copy.authority.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={index === 0 ? 'section-copy section-copy-flush' : 'section-copy'}
                >
                  {renderRichText(paragraph)}
                </p>
              ))}
            </div>
            <SectionImage image={copy.authority.image} />
            <p className="bridge-line">{copy.authority.bridge}</p>
          </div>
        </div>
      </section>

      <section className="outreach-section section-light">
        <div className="wrap">
          <div className="story-layout">
            <div>
              <p className="kicker">{copy.method.kicker}</p>
              <h2>{copy.method.headline}</h2>
              <p className="section-copy section-copy-flush">{copy.method.intro}</p>
              <div className="method-examples" aria-label={copy.method.examplesLabel}>
                {copy.method.examples.map((example) => (
                  <figure key={example.src}>
                    <Image
                      src={example.src}
                      alt={example.alt}
                      width={example.width}
                      height={example.height}
                      sizes="(max-width: 700px) 30vw, 160px"
                    />
                    <figcaption>{example.caption}</figcaption>
                  </figure>
                ))}
              </div>
              {copy.method.paragraphs.map((paragraph) => (
                <p key={paragraph} className="section-copy">
                  {renderRichText(paragraph)}
                </p>
              ))}
            </div>
            <SectionImage image={copy.method.image} />
          </div>
        </div>
      </section>

      <section className="outreach-section section-light">
        <div className="wrap">
          <div className="story-layout">
            <div>
              <p className="kicker">{copy.proof.kicker}</p>
              <h2>{copy.proof.headline}</h2>
              {copy.proof.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={index === 0 ? 'section-copy section-copy-flush' : 'section-copy'}
                >
                  {renderRichText(paragraph)}
                </p>
              ))}
            </div>
            <SectionImage image={copy.proof.image} />
            <p className="bridge-line">{copy.proof.bridge(market)}</p>
          </div>
        </div>
      </section>

      <section className="outreach-section section-light requirements-section">
        <div className="wrap">
          <h2>{copy.requirements.headline}</h2>
          <p className="section-copy section-copy-flush requirements-intro">
            {copy.requirements.intro}
          </p>
          <div className="requirements-grid">
            {copy.requirements.items.map((item) => {
              const Icon = requirementIcons[item.icon]
              return (
                <article className="requirements-card" key={item.label}>
                  <div className="icon-box" aria-hidden="true">
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <p className="requirements-label">{item.label}</p>
                  <p className="requirements-value">{item.value}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="outreach-section section-light region-section">
        <div className="wrap story-layout">
          <div>
            <p className="kicker">{copy.exclusivity.kicker}</p>
            <h2>{copy.exclusivity.headline}</h2>
            <p className="section-copy section-copy-flush">{copy.exclusivity.intro}</p>
            <ul className="trap-list">
              {copy.exclusivity.bullets.map((bullet) => (
                <li key={bullet.title}>
                  <b>{bullet.title}</b> {bullet.body(company, market)}
                </li>
              ))}
            </ul>
          </div>
          <SectionImage image={copy.exclusivity.image} />
          <p className="bridge-line">{copy.exclusivity.bridge(market)}</p>
        </div>
      </section>

      <section className="outreach-section section-light demo-try-section">
        <div className="wrap">
          <div className="section-demo-cta section-demo-cta-centered">
            <h2>{copy.tryDemo.headline}</h2>
            <p>{copy.tryDemo.body}</p>
            <a
              className="primary-button demo-try-button"
              href={demoUrl}
              target="_blank"
              rel="noreferrer"
            >
              {copy.tryDemo.button} <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="outreach-final">
        <div className="wrap">
          <p className="kicker blue-kicker">{copy.nextStep.kicker}</p>
          <h2>{copy.nextStep.headline(market)}</h2>
          <p>{copy.nextStep.body}</p>
          <CallbackForm
            companyName={company}
            region={market}
            leadSlug={lead.leadSlug}
            whatsappUrl={whatsappUrl}
            copy={copy.callback}
          />
        </div>
      </section>
    </main>
  )
}
