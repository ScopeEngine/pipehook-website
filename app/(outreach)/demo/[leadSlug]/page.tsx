import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowRight, ImageIcon } from 'lucide-react'
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

    return {
      title: `${lead.companyName} · PipeHook demo`,
      description: `En privat genomgång för ${lead.companyName}.`,
      robots: { index: false, follow: false },
    }
  } catch {
    return { robots: { index: false, follow: false } }
  }
}

const comparisonRows = [
  {
    point: 'Vem får förfrågan',
    other: 'Samma förfrågan går till flera firmor.',
    ours: 'Bara ni, i ert område.',
  },
  {
    point: 'Kvalificering',
    other: 'Alla klick räknas.',
    ours: 'Strikt filter innan hembesök.',
  },
  {
    point: 'Varumärke',
    other: 'Kunden landar på offertsajten.',
    ours: 'Hela tratten körs under ert namn.',
  },
  {
    point: 'Kostnad',
    other: 'Per klick och budgivning.',
    ours: 'En fast månadsavgift.',
  },
  {
    point: 'Bindningstid',
    other: 'Långa avtal och uppsägning.',
    ours: 'Inga tolvmånadersavtal.',
  },
] as const

function whatsappHref(raw: string | undefined) {
  if (!raw) return null
  const digits = raw.replace(/\D/g, '')
  if (!digits) return null
  return `https://wa.me/${digits}`
}

function ImageSlot({ label }: { label: string }) {
  return (
    <div className="image-slot">
      <ImageIcon className="image-slot-icon" strokeWidth={1.5} aria-hidden="true" />
      <p>{label}</p>
    </div>
  )
}

function SectionImage({
  src,
  alt,
  width,
  height,
}: {
  src: string
  alt: string
  width: number
  height: number
}) {
  return (
    <figure className="section-image">
      <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 700px) 100vw, 520px" />
    </figure>
  )
}

export default async function LeadDemoPage({ params }: PageProps<'/demo/[leadSlug]'>) {
  const { leadSlug } = await params
  const lead = await getLeadBySlug(leadSlug)
  if (!lead) notFound()

  const demoUrl = buildDemoUrl(lead)
  const accent = resolvedAccent(lead)
  const region = lead.region
  const company = lead.companyName
  const whatsappUrl = whatsappHref(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER)

  return (
    <main className="outreach-page" style={{ '--lead-accent': accent } as CSSProperties}>
      {/* 1. Hero — endast diskret rad + video */}
      <section className="outreach-hero">
        <div className="wrap outreach-hero-inner">
          <p className="outreach-hero-eyebrow">En personlig genomgång för {company}</p>

          <div className="outreach-video">
            <iframe
              src={`https://www.loom.com/embed/${lead.loomVideoId}?autoplay=1`}
              title={`Loom-video till ${company}`}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* 2. Agitationen */}
      <section className="outreach-section section-light">
        <div className="wrap story-layout">
          <div>
            <p className="kicker">KONTROLLFÖRLUSTEN</p>
            <h2>Problemet är inte att kalendern är tom. Det är vilka jobb som fyller den.</h2>
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
              Många inser detta och försöker ta in egna kunder via sociala medier — bara för att
              stöta på andra problem…
            </p>
          </div>
          <SectionImage
            src="/demo/kitchen-table-quotes.jpg"
            alt="VVS-tekniker vid köksbordet på kvällen med miniräknare och offerter."
            width={1024}
            height={1024}
          />
        </div>
      </section>

      {/* 3. Missförståndet + rätt ingång (sammanslagen) */}
      <section className="outreach-section section-light">
        <div className="wrap">
          <p className="kicker">MISSFÖRSTÅNDET SOM KOSTAR PENGAR</p>
          <h2>Vad de allra flesta VVS-firmor gör fel när de annonserar på sociala medier</h2>
          <p className="section-copy section-copy-flush">
            Att köra egna kampanjer slutar ofta med klick som kostar pengar men inte ger några
            riktiga jobb. Problemet är att man behandlar Facebook på samma sätt som Google.
          </p>
          <p className="section-copy">
            På Google <strong>letar kunden aktivt efter en lösning</strong>. När de öppnar Facebook
            eller Instagram vill de bara koppla av och se vad som händer i deras vänkrets, möjligtvis
            bli underhållna av en rolig video, eller upptäcka/lära sig något nytt.
          </p>
          <p className="section-copy">
            En annons som säger &quot;Vi utför relining – begär offert idag!&quot; försöker sälja ett
            ingrepp för 150 000 kr till någon som:
          </p>
          <ul className="trap-list">
            <li>Inte är i rätt sinnesstämning</li>
            <li>Troligen inte ens vet om att de har ett rörproblem</li>
          </ul>
          <SectionImage
            src="/demo/ad-compare.png"
            alt="Jämförelse av två Facebook-annonser: rördiagnos med grön bock kontra begär-offert-annons med rött kryss."
            width={1024}
            height={688}
          />
          <p className="section-copy">
            Eftersom husägaren rent psykologiskt bara letar efter underhållning måste vi{' '}
            <strong>trigga deras nyfikenhet</strong>.
          </p>
          <p className="section-copy">
            Istället för att trycka upp en tjänst i ansiktet på dem. Vi marknadsför en insikt genom
            ett snabbt test: &quot;Har dina gjutjärnsrör passerat sina bäst-före-datum? Gör testet och
            får svar direkt! (tar 2 minuter)&quot;
          </p>
          <p className="section-copy">
            <strong>Ett dolt problem har blivit en konkret tanke hos husägaren.</strong>
          </p>
          <p className="bridge-line">
            Men hur stor är egentligen den här gruppen, jämfört med de som redan aktivt söker?
          </p>
        </div>
      </section>

      {/* 4. Volymtaket försvinner (kortad) */}
      <section className="outreach-section section-light" id="reach">
        <div className="wrap">
          <div className="story-layout">
            <div>
              <p className="kicker">VOLYMTAKET FÖRSVINNER</p>
              <h2>Söktrafiken är bara en bråkdel av den totala målgruppen</h2>
              <p className="section-copy section-copy-flush">
                De flesta rörfirmor konkurrerar om samma smala ström av sökande kunder på Google —
                den stora massan som ännu inte vet att de har ett problem är många gånger fler, och
                det är dem vi når.
              </p>
            </div>
            <SectionImage
              src="/demo/reach-discovery.png"
              alt="Cirkeldiagram: liten grå Sök (Google)-del kontra stor blå Discovery (Facebook/Instagram)-del."
              width={1024}
              height={688}
            />
          </div>
          <p className="bridge-line">
            Det är den här skillnaden som gör att aktörer som VVStrygg kunnat fortsätta växa år efter
            år.
          </p>
        </div>
      </section>

      {/* 5. Sälj hembesöket */}
      <section className="outreach-section section-light">
        <div className="wrap">
          <div className="story-layout">
            <div>
              <p className="kicker">DIAGNOSTISK FÖRSÄLJNING</p>
              <h2>Sälj hembesöket, inte rörbytet</h2>
              <p className="section-copy section-copy-flush">
                När husägaren gjort testet ber vi dem inte att köpa en renovering. Vi erbjuder en
                kostnadsfri kamerainspektion.
              </p>
              <p className="section-copy">
                Det är genom hembesök aktörer som VVStrygg har vuxit till{' '}
                <strong>81 miljoner kronor i omsättning på nio år</strong>.
              </p>
              <p className="section-copy">
                Mönstret syns tydligt i hur de marknadsför sig: fokus ligger konsekvent på den
                kostnadsfria inspektionen, aldrig på själva reliningen.
              </p>
              <p className="section-copy">
                När er tekniker står i kundens vardagsrum med kameran är{' '}
                <strong>ni den enda experten på plats</strong>, och priskonkurrensen ser helt
                annorlunda ut.
              </p>
              <p className="section-copy">
                Enda problemet? Hembesök kostar pengar, och det gäller att åka hem till rätt
                kundprospekt.
              </p>
            </div>
            <SectionImage
              src="/demo/vvstrygg-diagnostic-sales.jpg"
              alt="VVStrygg marknadsför kostnadsfri rörinspektion: sajt, omsättningsgraf och Google-annons."
              width={1024}
              height={1024}
            />
          </div>
          <p className="bridge-line">
            Det är denna process PipeHook bygger på. Men gratis hembesök väcker en uppenbar fråga.
          </p>
        </div>
      </section>

      {/* 6. Kvalificeringen + demo-knapp */}
      <section className="outreach-section section-light" id="quiz">
        <div className="wrap">
          <p className="kicker">KVALIFICERINGEN</p>
          <h2>Kvalificeringen är nyckeln till lönsamma hembesök. Systemet sköter den åt er.</h2>
          <p className="section-copy section-copy-flush">
            Ni vinner redan era bästa affärer i någons vardagsrum — det är inte nytt för er.
          </p>
          <p className="section-copy">
            Det som avgör om hembesöken går ihop ekonomiskt är kvalificeringen: rätt hus, rätt läge
            i beslutet.
          </p>
          <p className="section-copy">
            Skickar ni ut en tekniker till en villa med plaströr, eller där relining redan gjorts av
            förra ägaren, blir det ingen affär.
          </p>
          <p className="section-copy">
            Därför fungerar modellen enbart om man har{' '}
            <strong>en strikt, automatisk kvalificering</strong>. Vårt rörtest fungerar som ett
            filter i bakgrunden:
          </p>
          <SectionImage
            src="/demo/qualification-funnel.png"
            alt="Kvalificeringstratt: från alla som gör rörtestet ner till bokat hembesök via byggår, bostadstyp, symptom och ålder."
            width={800}
            height={680}
          />
          <p className="section-copy">
            Uppfyller huset inte kriterierna erbjuds inget kostnadsfritt hembesök — det sorteras bort
            innan det blir en kontakt ni betalar för.
          </p>
          <p className="section-copy">
            <strong>En stadig ström av nya hembesök = förutsägbar tillväxt.</strong>
          </p>
          <h3 className="section-subhead">
            För att sammanfatta — här är det vi gör och det du får ut av vårt system:
          </h3>
          <ol className="summary-steps">
            <li>
              Vi når en ny målgrupp genom att &quot;utbilda&quot; de som inte vet att de har ett
              problem
            </li>
            <li>Vi kvalificerar dem strikt innan de når dig</li>
            <li>Vi erbjuder de som är &quot;rätt&quot; prospekt ett gratis hembesök</li>
          </ol>
          <ImageSlot label='En bild som illustrerar hela flödet — från "fånga uppmärksamhet" till "erbjuda hembesök till rätt personer".' />
          <p className="section-copy">
            Resultatet? En jämn ström av högkvalitativa kundprospekt.
          </p>
          <div className="section-demo-cta">
            <a className="primary-button" href={demoUrl} target="_blank" rel="noreferrer">
              Testa demot <ArrowRight size={16} />
            </a>
            <p>Klicka er igenom rörtestet precis som en av era kunder skulle göra.</p>
          </div>
          <p className="bridge-line">
            Så vad krävs för att bygga ett sånt här system — och hur vet ni att jag faktiskt kan
            leverera det?
          </p>
        </div>
      </section>

      {/* 7. Personlig Auktoritet */}
      <section className="outreach-section section-light">
        <div className="wrap">
          <div className="story-layout">
            <div>
              <p className="kicker">20 ÅRS DIGITAL MARKNADSFÖRING</p>
              <h2>
                Jag har gjort exakt det här förut — för redovisningsbyråer och tandvårdskliniker
              </h2>
              <p className="section-copy section-copy-flush">
                På Ageras hjälpte jag redovisningsbyråer få fler kunder — inkommande förfrågningar
                växte från ett dussin till över 800 i månaden, på ett år.
              </p>
              <p className="section-copy">
                Sedan dess har jag gjort samma sak för tandvårdskliniker hos Leadcom — över 70
                kliniker i Sverige, Norge och England, med runt 1,5–2 miljoner euro i årlig
                annonsbudget under förvaltning.
              </p>
              <p className="section-copy">
                Nu har jag tagit den arkitekturen och byggt PipeHook — helt skräddarsytt för
                relining och VVS.
              </p>
            </div>
            <SectionImage
              src="/demo/authority-ageras-leadcom.png"
              alt="Ageras rekommendationsbrev från Martin Hegelund och Leadcom-resultat med klinikfoton och resultatgraf."
              width={1024}
              height={688}
            />
          </div>
          <p className="bridge-line">Och det är inte bara jag som sett mönstret fungera.</p>
        </div>
      </section>

      {/* 8. Metodbeviset */}
      <section className="outreach-section section-light">
        <div className="wrap">
          <p className="kicker">SAMMA METOD, ANDRA BRANSCHER</p>
          <h2>Konceptet är redan beprövat i andra branscher</h2>
          <p className="section-copy section-copy-flush">
            Samma test-först-princip driver redan annonser i flera branscher: solceller (&quot;Se
            hur mycket du kan spara&quot;), hudvård (&quot;Gör hudtestet, få din rutin&quot;) och
            värmepumpar (&quot;Se om ditt hus passar&quot;).
          </p>
          <ImageSlot label="Tre små, generiska ikoner sida vid sida — egen illustration, INTE riktiga företagslogotyper — en per bransch, var och en med sin korta citat-fras under." />
          <p className="section-copy">
            Ett tydligare exempel: för tandimplantat använde jag själv exakt samma princip —
            &quot;Gör testet och se om du är kandidat för fasta tänder.&quot; Ingen vaknar och
            bestämmer sig för att köpa implantat, precis som ingen vaknar och bestämmer sig för
            relining.
          </p>
          <SectionImage
            src="/demo/happident-implant-quiz.png"
            alt="Happidents implantat-quiz: frågesteg till vänster och personlig analys med bokningsknapp till höger."
            width={800}
            height={680}
          />
          <p className="bridge-line">
            Och det är inte första gången den här typen av system bevisat sig fungera — bara första
            gången för rörbranschen.
          </p>
        </div>
      </section>

      {/* 9. Rörrapporten */}
      <section className="outreach-section section-light">
        <div className="wrap">
          <div className="story-layout">
            <div>
              <p className="kicker">REDAN I DRIFT</p>
              <h2>Rörrapporten.se — vårt eget test, redan i drift</h2>
              <p className="section-copy section-copy-flush">
                Rörrapporten är vår egen sida, och den är redan igång. Kostnaden per kvalificerad
                kontakt har sjunkit stadigt för varje vecka vi finjusterat annonserna.
              </p>
              <p className="section-copy">
                Kontakterna är inte bara klick — det är husägare som redan angett rätt åldersspann på
                huset och gjutjärnsrör i sitt svar, samma kvalificering ni sett i testet ovan.
              </p>
            </div>
            <SectionImage
              src="/demo/rorrapporten-collage.jpg"
              alt="Rörrapporten i drift: frågeformulär, resultatsida, prospektkort och annonsstatistik."
              width={1024}
              height={1024}
            />
          </div>
          <p className="bridge-line">Så vad betyder allt det här konkret för {region}?</p>
        </div>
      </section>

      {/* 10. Erbjudandet + jämförelsetabell */}
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
                <b>Bara era kontakter:</b> Varje varm, kvalificerad kontakt går direkt till er —
                aldrig till en konkurrent i området.
              </li>
              <li>
                <b>Ett företag per område:</b> När {company} tar {region} är platsen låst.
              </li>
              <li>
                <b>Inga bindningstider:</b> Inga tolvmånadersavtal. Ni testar, utvärderar resultatet,
                och stannar så länge det är lönsamt.
              </li>
            </ul>
            <p className="bridge-line">
              {region} har en plats kvar. Vi pratar just nu med några utvalda firmor där.
            </p>
          </div>
          <SectionImage
            src="/demo/region-exclusivity-map.jpg"
            alt="Karta över Sverige indelad i regioner, varje region markerad med ett lås."
            width={1024}
            height={1024}
          />
        </div>
      </section>

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
        </div>
      </section>

      {/* 11. Avslut */}
      <section className="outreach-final">
        <div className="wrap">
          <p className="kicker blue-kicker">NÄSTA STEG</p>
          <h2>Redo att ta över {region}?</h2>
          <p>Inget möte att boka i en kalender. Lämna ditt nummer, så ringer vi upp.</p>
          <CallbackForm
            companyName={company}
            region={region}
            leadSlug={lead.leadSlug}
            whatsappUrl={whatsappUrl}
          />
        </div>
      </section>

      {/* 12. FAQ */}
      <section className="outreach-section section-light faq-section">
        <div className="wrap">
          <p className="kicker">VANLIGA FRÅGOR</p>
          <h2>Innan ni bestämmer er</h2>
          <div className="faq-list">
            <details className="faq-item">
              <summary>Vad kostar det?</summary>
              <p className="faq-pending">[FYLL I — väntar på prissättning]</p>
            </details>
            <details className="faq-item">
              <summary>Kör ni annonserna i vårt konto?</summary>
              <p>
                Nej, vi kör allt i våra egna annonskonton. Ni behöver aldrig logga in eller hantera
                något själva.
              </p>
            </details>
            <details className="faq-item">
              <summary>Installerar ni PipeHook-verktyget på vår sida?</summary>
              <p>
                Nej, inget att installera. Testet och sidan ligger på en egen, brandad webbadress
                under ert namn — er befintliga hemsida rörs inte.
              </p>
            </details>
            <details className="faq-item">
              <summary>Hur kommunicerar vi under samarbetet?</summary>
              <p>Via WhatsApp — inget nytt system att logga in i eller lära sig.</p>
            </details>
            <details className="faq-item">
              <summary>Kan vi avsluta när vi vill?</summary>
              <p>Ja. Inga tolvmånadersavtal, ingen uppsägningstid att ta sig igenom.</p>
            </details>
            <details className="faq-item">
              <summary>Måste vi lära oss ett nytt system?</summary>
              <p>
                Nej. Ni svarar på SMS och samtal precis som vanligt — vi sköter testet,
                kvalificeringen och kontakten med husägaren.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                Är det verkligen exklusivt, eller kan ni sälja till någon annan i {region} senare?
              </summary>
              <p>
                Vi arbetar med ett företag per geografiskt område. När {company} tar {region} är
                platsen låst — vi kontaktar ingen konkurrent i samma område så länge samarbetet
                pågår.
              </p>
            </details>
            <details className="faq-item">
              <summary>Hur snabbt kan vi komma igång?</summary>
              <p className="faq-pending">[FYLL I — väntar på onboarding-tid]</p>
            </details>
            <details className="faq-item">
              <summary>Vad räknas som en kontakt vi betalar för?</summary>
              <p className="faq-pending">[FYLL I — väntar på definition]</p>
            </details>
            <details className="faq-item">
              <summary>Vad händer om vi inte hinner ta emot fler just nu?</summary>
              <p className="faq-pending">[FYLL I — väntar på svar]</p>
            </details>
          </div>
        </div>
      </section>
    </main>
  )
}
