import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowRight, MapPin, Play } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { buildDemoUrl, resolvedAccent, type LeadDemoConfig } from '@/lib/lead-demo.config'
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

const resultPoints = [
  'Varje förfrågan går bara till er. Vi arbetar inte med flera firmor i samma område.',
  'Husägaren har redan svarat på fyra frågor om huset innan ni ser förfrågan.',
  'Ni betalar en fast summa per månad — inte per klick, inte per förfrågan.',
  'Tiden bokas automatiskt i teknikerns kalender. Ingen ringer, ingen mejlar fram och tillbaka.',
] as const

const flowSteps = [
  {
    number: '1',
    title: 'Annonsen visas.',
    text: 'En husägare i ert område ser en annons om gamla rörsystem, antingen för att de sökt efter det eller för att huset matchar rätt ålder.',
  },
  {
    number: '2',
    title: 'Husägaren gör testet.',
    text: 'Fyra frågor om huset — byggår, symptom, ägande, nuvarande skick.',
  },
  {
    number: '3',
    title: 'Systemet sorterar.',
    text: 'Fel fastighetstyp eller fel symptom filtreras bort innan något bokas.',
  },
  {
    number: '4',
    title: 'Tiden bokas.',
    text: 'Husägaren väljer en tid, och den hamnar direkt i teknikerns kalender.',
  },
] as const

const quizCards = [
  { screen: '', title: 'Byggår', text: 'Hus från fel årtal filtreras bort direkt.' },
  { screen: 'q1', title: 'Symptom', text: 'Kluckande ljud, återkommande stopp, lukt.' },
  { screen: 'q2', title: 'Ägande', text: 'Bostadsrätt utan eget mandat sorteras bort.' },
  {
    screen: 'q3',
    title: 'Skick',
    text: 'Husägaren får en preliminär bedömning. Exakt svar kräver en kamerainspektion.',
  },
] as const

const comparisonRows = [
  {
    point: 'Vem får förfrågan',
    other: 'Flera firmor samtidigt',
    ours: 'Bara ni, i ert område',
  },
  {
    point: 'Kvalificering',
    other: 'Ingen — alla klick räknas',
    ours: 'Sker innan ni ser förfrågan',
  },
  {
    point: 'Varumärke',
    other: 'Kunden landar på offertsajten',
    ours: 'Hela flödet går under ert namn',
  },
  {
    point: 'Kostnad',
    other: 'Per klick eller budgivning',
    ours: 'Fast summa per månad',
  },
  {
    point: 'Bindningstid',
    other: 'Ofta 12 månader',
    ours: 'Ingen',
  },
] as const

function firstName(contactName: string) {
  return contactName.trim().split(/\s+/)[0] || contactName
}

function ProspectMark({ lead }: { lead: LeadDemoConfig }) {
  if (lead.logoUrl) {
    return (
      // External prospect logos are not in next/image remotePatterns.
      // eslint-disable-next-line @next/next/no-img-element
      <img className="demo-company-logo" src={lead.logoUrl} alt={lead.companyName} />
    )
  }

  return <span className="outreach-company">{lead.companyName}</span>
}

export default async function LeadDemoPage({ params }: PageProps<'/demo/[leadSlug]'>) {
  const { leadSlug } = await params
  const lead = await getLeadBySlug(leadSlug)
  if (!lead) notFound()

  const demoUrl = buildDemoUrl(lead)
  const accent = resolvedAccent(lead)
  const name = firstName(lead.contactName)
  const city = lead.city
  const company = lead.companyName

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
          <p className="kicker blue-kicker">EN SIDA BARA FÖR {company} · RELINING</p>
          <h1 className="leading-tight">
            Hej {name}. Ni äger redan förtroendet. Vi fyller kalendern.
          </h1>
          <p className="outreach-lede">
            De flesta reliningfirmor vi pratar med har samma problem: rätt hembesök tar för lång tid
            att hitta, och mycket tid går åt till samtal som ändå inte blir en affär. Det här är en
            kort genomgång av hur PipeHook löser det — under ert varumärke.
          </p>

          <div className="outreach-video">
            <iframe
              src={`https://www.loom.com/embed/${lead.loomVideoId}`}
              title={`Loom-video till ${company}`}
              allowFullScreen
            />
          </div>

          <a className="primary-button" href={demoUrl} target="_blank" rel="noreferrer">
            Testa demot <ArrowRight size={16} />
          </a>
          <small>
            <Play size={12} /> Två minuter · brandad demo för {company}
          </small>
        </div>
      </section>

      <section className="outreach-section section-light">
        <div className="wrap">
          <p className="kicker">RESULTATET</p>
          <h2>Bokade rörinspektioner i kalendern. Inget annat.</h2>
          <ul className="result-points">
            {resultPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="outreach-section section-light">
        <div className="wrap">
          <p className="kicker">HUR DET FUNGERAR</p>
          <h2>Från annons till bokad tid, i fyra steg</h2>
          <div className="flow-steps">
            {flowSteps.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
          <a className="back-demo" href={demoUrl} target="_blank" rel="noreferrer">
            Klicka er igenom hela flödet ovanför så ser ni exakt vad husägaren ser.
          </a>
        </div>
      </section>

      <section className="outreach-section traffic-section light-zone">
        <div className="wrap">
          <p className="kicker blue-kicker">VAR HUSÄGAREN HITTAR ER</p>
          <h2>Vi sköter annonserna i Google och Meta åt er</h2>
          <div className="traffic-grid">
            <article>
              <h3>Google — de som redan söker</h3>
              <p>
                Husägare som söker på relining eller stambyte i ert område ser er annons, inte en
                offertsajt.
              </p>
            </article>
            <article>
              <h3>Meta — de som inte sökt än</h3>
              <p>
                Villaägare i rätt ålderssegment ser en annons om rörtestet, innan de hunnit fram till
                en offertsajt.
              </p>
            </article>
          </div>
          <p className="section-copy">
            Ni loggar aldrig in i ett annonskonto. Vi bygger annonserna, betalar för dem, och
            justerar dem löpande.
          </p>
        </div>
      </section>

      <section className="outreach-section section-light" id="quiz">
        <div className="wrap">
          <p className="kicker">KVALIFICERINGEN</p>
          <h2>Fyra frågor. Sen är det antingen ett jobb — eller inte.</h2>
          <div className="quiz-strip">
            {quizCards.map((card) => (
              <article key={card.title}>
                <div className={`quiz-screen ${card.screen}`.trim()}>
                  <strong>{card.title}</strong>
                </div>
                <b>{card.title}</b>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="outreach-section sms-section light-zone">
        <div className="wrap sms-layout">
          <div>
            <p className="kicker">UPPFÖLJNINGEN</p>
            <h2>Systemet bokar tiden. Er tekniker gör jobbet.</h2>
            <p className="section-copy">
              {name}, det här är vad husägaren ser efter testet. Inget nytt system att lära sig — ni
              får en tid i kalendern, inte ett meddelande att besvara.
            </p>
          </div>
          <div className="sms-thread" aria-label="Exempel på SMS-uppföljning">
            <div className="sms-bubble">
              <small>19:42 — {company}</small>
              <p>
                Hej Anders! Du gjorde rörtestet för huset på Bergsvägen. Utifrån byggår och det du
                beskrev om stoppen ser vi anledning att titta närmare med kamera. Kostnadsfritt, tar
                ca 45 min.
              </p>
            </div>
            <div className="sms-bubble from-customer">
              <small>19:44 — Anders</small>
              <p>Ja det låter bra. När kan ni?</p>
            </div>
            <div className="sms-bubble">
              <small>19:44 — {company}</small>
              <p>Vi har tisdag 14:00 eller torsdag 09:00 den här veckan. Vilket passar bäst?</p>
            </div>
            <div className="sms-bubble from-customer">
              <small>19:51 — Anders</small>
              <p>Tisdag funkar</p>
            </div>
            <div className="sms-bubble">
              <small>19:51 — {company}</small>
              <p>Klart. Tisdag 14:00, Bergsvägen 12. {company} hör av sig om något ändras.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="outreach-section section-light">
        <div className="wrap proof-grid">
          <div className="proof-copy">
            <p className="kicker">DET HÄR ÄR INGEN TEORI</p>
            <h2>Det här är samma arbetssätt som branschens snabbast växande firmor</h2>
            <p>
              VVStrygg startade 2017 och omsatte 81 miljoner kronor 2025. De säljer aldrig relining
              i sin marknadsföring — de säljer den kostnadsfria rörinspektionen, och stänger affären
              på plats.
            </p>
          </div>
          <div className="proof-copy">
            <p>
              Samma arbetssätt har jag byggt i andra branscher med höga ordervärden: Ageras (ett av
              Danmarks snabbast växande techbolag), 80+ tandvårdskliniker hos Leadcom, och
              implantatfunnlar med samma testbaserade princip. PipeHook är samma metod, byggd enbart
              för rör och relining.
            </p>
          </div>
        </div>
      </section>

      <section className="outreach-section comparison-section" id="comparison">
        <div className="wrap">
          <p className="kicker blue-kicker">SKILLNADEN MOT OFFERTSAJTER</p>
          <h2>Så skiljer sig PipeHook från offertsajter</h2>
          <div className="comparison-table">
            <div className="table-head">
              <span />
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
            Offertsajter säljer samma förfrågan till flera firmor samtidigt. Vi arbetar med ett
            företag per område, så förfrågan ni får är faktiskt bara er.
          </p>
        </div>
      </section>

      <section className="outreach-section region-section">
        <div className="wrap region-layout">
          <div>
            <p className="kicker">EN REGION, ETT FÖRETAG</p>
            <h2>Vi arbetar bara med ett företag i {city}</h2>
            <p className="section-copy">
              Om vi tog in flera firmor i samma område skulle vi konkurrera med oss själva om samma
              husägare — och då vore vi lika värdelösa som en offertsajt. När {company} tar {city} är
              platsen låst för konkurrenterna där.
            </p>
          </div>
          <div className="territory-card" aria-label={city}>
            <div className="map-grid" />
            <MapPin size={28} />
            <span>TERRITORIUM</span>
            <b>{city}</b>
          </div>
        </div>
      </section>

      <section className="outreach-final">
        <div className="wrap">
          <p className="kicker blue-kicker">NÄSTA STEG</p>
          <h2>15 minuter. Ingen pitch. Bara siffrorna för {city}.</h2>
          <p>
            Vi går igenom hur många hushåll i rätt ålderssegment som finns i ert område, vad ett
            bokat hembesök skulle kosta er, och vad det behöver ge i stängd affär för att gå ihop.
            Håller inte matematiken säger vi det på samtalet.
          </p>
          <a className="primary-button" href={lead.contactBookingUrl} target="_blank" rel="noreferrer">
            Lås platsen för {city} <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </main>
  )
}
