import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
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

const quizCards = [
  { screen: '', title: 'Byggår', text: 'Filtrerar bort fel årtionde' },
  { screen: 'q1', title: 'Ägande', text: 'Kräver mandat' },
  {
    screen: 'q2',
    title: 'Symptom eller ålder som motiverar en inspektion',
    text: '',
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

function ImageSlot({ label }: { label: string }) {
  return (
    <div className="image-slot">
      <p>{label}</p>
    </div>
  )
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
          <p className="kicker blue-kicker">EN PERSONLIG GENOMGÅNG FÖR {company} · RELINING</p>
          <h1 className="leading-tight">
            Hej {name}. Ni står för yrkeskunnandet. Vi ser till att ni sitter ensamma med kunden i
            deras vardagsrum.
          </h1>
          <p className="outreach-lede">
            Två minuter. Sen vet ni exakt varför vissa reliningfirmor{' '}
            <strong>aldrig behöver jaga en enda kund</strong>, medan andra tvingas sänka sina
            priser för att få in jobb.
          </p>

          <div className="outreach-video">
            <iframe
              src={`https://www.loom.com/embed/${lead.loomVideoId}?autoplay=1`}
              title={`Loom-video till ${company}`}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>

          <a className="primary-button" href={demoUrl} target="_blank" rel="noreferrer">
            Testa demot <ArrowRight size={16} />
          </a>
          <p className="bridge-line">
            Men för att förstå hur de stora aktörerna gör, måste vi först titta på hur systemet är
            uppbyggt idag.
          </p>
        </div>
      </section>

      <section className="outreach-section section-light">
        <div className="wrap story-layout">
          <div>
            <p className="kicker">KONTROLLFÖRLUSTEN</p>
            <h2>Varför kalendern ekar tom – eller fylls med helt fel kunder</h2>
            <p className="section-copy section-copy-flush">
              De flesta VVS- och reliningfirmor känner igen sig i minst en av dessa tre situationer:
            </p>
            <ul className="trap-list">
              <li>
                <b>Hoppet som strategi:</b> Ni lever på rekommendationer. Det är bra när det
                fungerar, men när telefonen är tyst står dyra tekniker stilla.
              </li>
              <li>
                <b>Auktionen:</b> Ni köper förfrågningar från offertsajter. Samma kund säljs till
                flera firmor, och ni tvingas prispressa mot oseriösa aktörer.
              </li>
              <li>
                <b>Kontrollofferterna:</b> Husägare ber om gratis offerter enbart för att ha en
                prisjämförelse. Ni lägger kvällarna på att räkna på jobb ni ändå inte får.
              </li>
            </ul>
            <p className="section-copy">
              <strong>Ni gör allt rätt, men förlorar ändå affären.</strong>
            </p>
            <p className="bridge-line">
              Många inser detta och försöker ta in egna kunder via sociala medier – bara för att gå
              rakt in i nästa fälla.
            </p>
          </div>
          <ImageSlot label="Fotografi i mörk belysning. Ett köksbord på kvällen med miniräknare och papper." />
        </div>
      </section>

      <section className="outreach-section section-light">
        <div className="wrap story-layout">
          <div>
            <p className="kicker">MISSFÖRSTÅNDET SOM KOSTAR PENGAR</p>
            <h2>Varför vanliga VVS-annonser på Facebook sällan fungerar</h2>
            <p className="section-copy section-copy-flush">
              Att köra egna kampanjer slutar ofta med klick som kostar pengar men inte ger några
              riktiga jobb. Problemet är att man behandlar Facebook på samma sätt som Google.
            </p>
            <p className="section-copy">
              På Google <strong>letar kunden aktivt efter en lösning</strong>. När de öppnar
              Facebook eller Instagram vill de bara koppla av och se vad som händer.
            </p>
            <p className="section-copy">
              En annons som bryter av och säger &quot;Vi utför relining – begär offert idag!&quot;
              försöker sälja ett ingrepp för 150 000 kr till{' '}
              <strong>någon som inte ens visste att de hade ett rörproblem</strong>.
            </p>
            <p className="bridge-line">
              För att plattformar som Facebook och Instagram ska fungera krävs en helt annan
              ingång.
            </p>
          </div>
          <ImageSlot label="Tvådelad illustration. Google-sökfält (akut rörläcka) vs Facebook-scrollande." />
        </div>
      </section>

      <section className="outreach-section section-light">
        <div className="wrap story-layout">
          <div>
            <p className="kicker">RÄTT INGÅNG</p>
            <h2>Fånga intresset istället för att kräva ett köp</h2>
            <p className="section-copy section-copy-flush">
              Eftersom husägaren som är inne på Facebook befinner sig i ett läge där de vill koppla
              av, bli underhållen eller upptäcka saker, måste vi{' '}
              <strong>
                trigga deras nyfikenhet istället för att trycka upp en tjänst i ansiktet på dem
              </strong>
              .
            </p>
            <p className="section-copy">
              Vi marknadsför en insikt genom ett snabbt test: &quot;Har dina gjutjärnsrör passerat
              sina bäst-före-datum? Gör testet och får svar direkt! (tar 2 minuter)”
            </p>
            <p className="section-copy">
              Plötsligt har vi fångat uppmärksamheten på plattformens egna villkor.{' '}
              <strong>Ett dolt problem har blivit en konkret tanke hos husägaren.</strong>
            </p>
            <p className="bridge-line">
              Men ett klick betalar inga löner. Frågan är hur man förvandlar det till ett vunnet
              jobb.
            </p>
          </div>
          <ImageSlot label={'Skärmdump av en Facebook-annons för "Rörtestet".'} />
        </div>
      </section>

      <section className="outreach-section section-light">
        <div className="wrap story-layout">
          <div>
            <p className="kicker">DIAGNOSTISK FÖRSÄLJNING</p>
            <h2>Sälj hembesöket, inte rörbytet</h2>
            <p className="section-copy section-copy-flush">
              När husägaren gjort testet ber vi dem inte att köpa en renovering. Vi erbjuder en
              kostnadsfri kamerainspektion.
            </p>
            <p className="section-copy">
              Det är så här aktörer som VVStrygg har vuxit till{' '}
              <strong>81 miljoner kronor i omsättning på nio år</strong>. De marknadsför den
              fysiska diagnosen.
            </p>
            <p className="section-copy">
              När er tekniker står i kundens vardagsrum med kameran är{' '}
              <strong>ni den enda experten på plats</strong>, och priskonkurrensen ser helt
              annorlunda ut.
            </p>
            <p className="bridge-line">
              Det är denna process PipeHook bygger på. Men gratis hembesök väcker en uppenbar
              fråga.
            </p>
          </div>
          <ImageSlot label="Allabolag-graf som pekar kraftigt uppåt till 81 miljoner." />
        </div>
      </section>

      <section className="outreach-section section-light" id="quiz">
        <div className="wrap">
          <p className="kicker">KVALIFICERINGEN</p>
          <h2>&quot;Att åka på gratis hembesök bränner ju onödig tid?&quot;</h2>
          <p className="section-copy section-copy-flush">
            Helt rätt. Att skicka ut en tekniker till fel hus kostar lön och bensin.
          </p>
          <p className="section-copy">
            Om kunden bara vill ha en prisjämförelse är ni tillbaka vid köksbordet med
            miniräknaren.
          </p>
          <p className="section-copy">
            Därför fungerar modellen enbart om man har{' '}
            <strong>en strikt, automatisk kvalificering</strong>. Vårt rörtest fungerar som ett
            filter i bakgrunden:
          </p>
          <div className="quiz-strip">
            {quizCards.map((card) => (
              <article key={card.title}>
                <div className={`quiz-screen ${card.screen}`.trim()}>
                  <strong>{card.title}</strong>
                </div>
                <b>{card.title}</b>
                {card.text ? <p>{card.text}</p> : null}
              </article>
            ))}
          </div>
          <p className="bridge-line">
            Husägaren kvalificerar sig alltså själv. Men hur ser det ut när mötet faktiskt hamnar i
            er kalender?
          </p>
        </div>
      </section>

      <section className="outreach-section sms-section light-zone">
        <div className="wrap">
          <div className="sms-layout">
            <div>
              <p className="kicker">SISTA PUSSELBITEN</p>
              <h2>Systemet bokar tiden. Er tekniker gör jobbet.</h2>
            </div>
            <div className="sms-thread" aria-label="Exempel på SMS-uppföljning">
              <div className="sms-bubble">
                <small>{company}</small>
                <p>
                  Hej Anders! Du gjorde rörtestet för huset på Bergsvägen. Utifrån byggår och det du
                  beskrev ser vi anledning att titta närmare med kamera. Kostnadsfritt, tar ca 45
                  min.
                </p>
              </div>
              <div className="sms-bubble from-customer">
                <small>Anders</small>
                <p>Ja det låter bra. När kan ni?</p>
              </div>
              <div className="sms-bubble">
                <small>{company}</small>
                <p>Vi har tisdag 14:00 eller torsdag 09:00 den här veckan. Vilket passar bäst?</p>
              </div>
              <div className="sms-bubble from-customer">
                <small>Anders</small>
                <p>Tisdag funkar</p>
              </div>
              <div className="sms-bubble">
                <small>{company}</small>
                <p>Klart. Tisdag 14:00, Bergsvägen 12. {company} hör av sig om något ändras.</p>
              </div>
            </div>
          </div>
          <p className="bridge-line">
            Detta maskineri hanterar det tunga lyftet helt automatiskt. Och logiken bakom är faktiskt
            hämtad från en helt annan bransch.
          </p>
        </div>
      </section>

      <section className="outreach-section section-light">
        <div className="wrap story-layout">
          <div>
            <p className="kicker">SAMMA METOD, ANDRA BRANSCHER</p>
            <h2>Samma psykologi driver miljonaffärer i andra branscher</h2>
            <p className="section-copy section-copy-flush">
              Denna modell är inte ett experiment. Den används konsekvent i branscher med höga
              ordervärden.
            </p>
            <p className="section-copy">
              För tandimplantat används exakt samma logik: &quot;Gör testet och se om du är
              kandidat för fasta tänder.&quot;
            </p>
            <p className="section-copy">
              Psykologin är identisk. Fånga intresset tidigt, erbjuda en professionell diagnos och{' '}
              <strong>få in avtalet utan mellanhänder</strong>.
            </p>
            <p className="bridge-line">
              Och det är exakt detta system jag har byggt för er bransch.
            </p>
          </div>
          <ImageSlot label="Skärmdumpar från en tandimplantats-funnel (t.ex. Happident)." />
        </div>
      </section>

      <section className="outreach-section section-light">
        <div className="wrap story-layout">
          <div>
            <p className="kicker">20 ÅRS DIGITAL MARKNADSFÖRING</p>
            <h2>Jag har byggt det här förut — bara inte för rör</h2>
            <p className="section-copy section-copy-flush">
              Jag var med och byggde ett av Danmarks snabbast växande techbolag, där inkommande
              partnerförfrågningar växte <strong>från ett dussin till över 800 i månaden</strong>.
            </p>
            <p className="section-copy">
              Sedan dess har jag skött marknadsföringen åt över 80 kliniker i Nordeuropa.
            </p>
            <p className="section-copy">
              Nu har jag tagit den arkitekturen och byggt PipeHook — helt skräddarsytt för relining
              och VVS.
            </p>
            <p className="bridge-line">Så vad betyder allt det här konkret för {city}?</p>
          </div>
          <ImageSlot label="Skärmdump av LinkedIn-rekommendation / Bolagsloggor." />
        </div>
      </section>

      <section className="outreach-section section-light region-section">
        <div className="wrap story-layout">
          <div>
            <p className="kicker">EN REGION. EN PARTNER.</p>
            <h2>Ni delar aldrig förfrågan med någon annan</h2>
            <p className="section-copy section-copy-flush">
              Vi arbetar strikt med ett företag per geografiskt område. Ingen auktion och ingen
              budgivning mellan er och grannfirman.
            </p>
            <ul className="trap-list">
              <li>
                <b>Bara era bokningar:</b> Varje bokat hembesök går direkt in i er kalender. Vi
                säljer aldrig samma kund till konkurrenter.
              </li>
              <li>
                <b>Ett företag per område:</b> När {company} tar {city} är platsen låst.
              </li>
              <li>
                <b>Inga bindningstider:</b> Inga tolvmånadersavtal. Ni testar, utvärderar resultatet,
                och stannar så länge det är lönsamt.
              </li>
            </ul>
            <p className="bridge-line">
              {city} har en plats kvar. Vi pratar just nu med ett fåtal firmor där.
            </p>
          </div>
          <ImageSlot label={`Mörk, snygg grafisk karta över ${city} med en lås-ikon.`} />
        </div>
      </section>

      <section className="outreach-final">
        <div className="wrap">
          <p className="kicker blue-kicker">NÄSTA STEG</p>
          <h2>Redo att ta över {city}?</h2>
          <p>
            Vi tar <strong>15 minuter, utan säljpitch</strong>. Vi kikar på söktrafiken i ert
            område och räknar på matematiken.
          </p>
          <p>Är det inte lönsamt för er, så säger vi det direkt.</p>
          <p>
            <strong>Ingen mer torsdagkväll vid köksbordet för ett jobb ni ändå inte får.</strong>
          </p>
          <p>
            Bara <strong>en fylld kalender</strong> med jobb där ni kan hålla era riktiga
            marginaler, och tid att göra det ni är bra på.
          </p>
          <ImageSlot label="Mockup av en digital kalender fylld med bokade hembesök." />
          <a
            className="primary-button"
            href={lead.contactBookingUrl}
            target="_blank"
            rel="noreferrer"
          >
            Lås {city} — boka en teknisk genomgång <ArrowRight size={16} />
          </a>
          <small>
            Observera: Eftersom vi endast arbetar med en partner per region, kontaktar vi för
            närvarande ett fåtal utvalda firmor i {city}.
          </small>
        </div>
      </section>
    </main>
  )
}
