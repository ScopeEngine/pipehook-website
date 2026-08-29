export const industries = ['relining', 'dranering', 'enskilt-avlopp'] as const

export type Industry = (typeof industries)[number]

export const industryLabels: Record<Industry, string> = {
  relining: 'Relining',
  dranering: 'Dränering',
  'enskilt-avlopp': 'Enskilt avlopp',
}

export const industryAccents: Record<Industry, string> = {
  relining: '#1785f8',
  dranering: '#0f766e',
  'enskilt-avlopp': '#1d4ed8',
}

export type AidaCopy = {
  attention: { kicker: string; headline: string; body: string }
  interest: { headline: string; body: string }
  desire: { headline: string; intro: string; bullets: string[] }
  action: { headline: string; body: string; demoCta: string; bookingCta: string }
  faq: { question: string; answer: string }[]
}

export type LeadDemoConfig = {
  leadSlug: string
  companyName: string
  logoUrl?: string | null
  accentColor?: string | null
  industry: Industry
  loomVideoId: string
  contactName: string
  contactBookingUrl: string
  copyOverride?: Partial<{
    attention: Partial<AidaCopy['attention']>
    interest: Partial<AidaCopy['interest']>
    desire: Partial<AidaCopy['desire']>
    action: Partial<AidaCopy['action']>
    faq: AidaCopy['faq']
  }> | null
}

export const INDUSTRY_COPY: Record<Industry, AidaCopy> = {
  relining: {
    attention: {
      kicker: 'En sida bara för er',
      headline: 'Ni äger redan förtroendet. Vi fyller kalendern.',
      body: 'De flesta reliningfirmor vi pratar med har samma problem: för få rätt hembesök, för mycket tid på fel samtal, och leads som delas med grannen. Det här är en kort genomgång av hur PipeHook löser det — under ert varumärke.',
    },
    interest: {
      headline: 'En säljtratt som känns som ert eget team',
      body: 'Vi bygger och driftar er kundtratt, AI-uppföljning och bokning. Husägare som redan letar efter en permanent lösning landar i ett diagnostiskt test och bokas in hos era tekniker — utan att ni lär er ett nytt system.',
    },
    desire: {
      headline: 'Det ni faktiskt får',
      intro: 'Inte fler delade portaler. En motor som bara jobbar för er.',
      bullets: [
        'Exklusiva leads — varje förfrågan går till er, aldrig till en konkurrent i samma område.',
        'Aktiv diskvalificering — däcksparkare och oseriösa förfrågningar filtreras bort innan de når kalendern.',
        'En fast månadsavgift — ingen budgivning, inga klickpriser, ingen stress över att betala per lead.',
        'Bokade hembesök dygnet runt — de bästa jobben hamnar rakt i era teknikers kalendrar.',
      ],
    },
    action: {
      headline: 'Klicka er igenom tratten som en husägare skulle gjort',
      body: 'Demot nedan är brandat med ert namn. Det tar under två minuter och visar exakt vad kunden ser — från första frågan till bokat hembesök.',
      demoCta: 'Öppna er klickbara demo',
      bookingCta: 'Boka 20 minuter med oss',
    },
    faq: [
      {
        question: 'Delar ni leads med andra reliningfirmor?',
        answer:
          'Nej. Vi licensierar systemet till max ett företag per geografiskt område. När er region är tagen är den låst för konkurrenterna.',
      },
      {
        question: 'Måste vi lära oss ett nytt verktyg?',
        answer:
          'Nej. Vi driftar tratten, uppföljningen och bokningen. Era tekniker får tider i den kalender ni redan använder.',
      },
      {
        question: 'Hur snabbt kan vi vara igång?',
        answer:
          'När regionen är ledig sätter vi upp er brandade tratt och börjar köra trafik. De flesta partners är live inom ett par veckor.',
      },
    ],
  },
  dranering: {
    attention: {
      kicker: 'En sida bara för er',
      headline: 'Rätt hus, rätt fuktproblem, rätt tid i kalendern.',
      body: 'Dräneringsjobb vinns sällan på volym. De vinns när rätt husägare — de med verkligt vattenproblem — kommer in som bokade platsbesök, inte som anonyma klick i en delad portal.',
    },
    interest: {
      headline: 'Från kalla klick till bokade platsbesök',
      body: 'PipeHook är er tillväxtpartner. Vi tar hand om säljtratten, AI-uppföljningen och bokningen under ert varumärke, så att era tekniker möter husägare som redan vet att de behöver en varaktig lösning.',
    },
    desire: {
      headline: 'Det ni faktiskt får',
      intro: 'En motor som skyddar både kalendern och området ni kör i.',
      bullets: [
        'Exklusiva leads i er geografi — vi säljer inte samma förfrågan till tre firmor.',
        'Aktiv diskvalificering — nyfikna utan akut problem når inte era tekniker.',
        'Förutsägbar kostnad — fast månadsavgift, inga klickpriser.',
        'Bokning dygnet runt — platsbesök landar i kalendern även efter kontorstid.',
      ],
    },
    action: {
      headline: 'Se tratten med ert namn på',
      body: 'Klicka igenom demot som kunden gör. Det är den kortaste vägen att förstå vad vi faktiskt levererar.',
      demoCta: 'Öppna er klickbara demo',
      bookingCta: 'Boka 20 minuter med oss',
    },
    faq: [
      {
        question: 'Är regionen exklusiv?',
        answer:
          'Ja. Ett företag per område. När ni är inne är konkurrenterna ute.',
      },
      {
        question: 'Fungerar det om vi redan kör Google-annonser?',
        answer:
          'Ja. Vi kompletterar det ni redan gör med kvalificering och bokning, så att klicken ni betalar för blir möten ni vill ha.',
      },
      {
        question: 'Vad händer efter demot?',
        answer:
          'Vi går igenom er region, kalender och vilka jobb ni vill ha — sedan sätter vi upp tratten om området fortfarande är ledigt.',
      },
    ],
  },
  'enskilt-avlopp': {
    attention: {
      kicker: 'En sida bara för er',
      headline: 'Husägare med enskilt avlopp letar redan. Vi bokar dem till er.',
      body: 'Marknaden för enskilda avlopp drivs av krav, slamtömning och uttjänta anläggningar. Problemet är sällan efterfrågan — det är att rätt samtal inte når era tekniker först, och inte ensamma.',
    },
    interest: {
      headline: 'En brandad väg från sökning till bokat hembesök',
      body: 'Vi bygger tratten under ert varumärke: lokal räckvidd, ett diagnostiskt test och AI-bokning. Husägaren förstår vad som behöver göras. Ni får en tid i kalendern — inte en lapp i en delad leadlista.',
    },
    desire: {
      headline: 'Det ni faktiskt får',
      intro: 'Kontroll över samtalet, och över området.',
      bullets: [
        'Exklusiva förfrågningar i er kommun eller ert upptagningsområde.',
        'Filter mot oseriösa och för tidiga förfrågningar.',
        'Fast månadskostnad utan att betala per klick eller per lead.',
        'Hembesök inbokade även när kontoret är stängt.',
      ],
    },
    action: {
      headline: 'Gå igenom er tratt på två minuter',
      body: 'Demot är uppsatt med ert företagsnamn. Det är samma flöde vi sätter i produktion om er region är ledig.',
      demoCta: 'Öppna er klickbara demo',
      bookingCta: 'Boka 20 minuter med oss',
    },
    faq: [
      {
        question: 'Kan flera firmor i samma kommun ha PipeHook?',
        answer:
          'Nej. Ett företag per geografiskt område. Det är hela poängen med modellen.',
      },
      {
        question: 'Behöver vi byta bokningssystem?',
        answer:
          'Nej. Vi anpassar bokningen till hur ni redan tar emot jobb.',
      },
      {
        question: 'Är det bindningstid?',
        answer:
          'Vi kör utan säljpitch-cirkus. Om regionen är ledig går vi igenom upplägget rakt av — ni tar beslutet efter att ha sett demot.',
      },
    ],
  },
}

export function resolveCopy(lead: LeadDemoConfig): AidaCopy {
  const base = INDUSTRY_COPY[lead.industry]
  const override = lead.copyOverride
  if (!override) return base

  return {
    attention: { ...base.attention, ...override.attention },
    interest: { ...base.interest, ...override.interest },
    desire: {
      ...base.desire,
      ...override.desire,
      bullets: override.desire?.bullets ?? base.desire.bullets,
    },
    action: { ...base.action, ...override.action },
    faq: override.faq ?? base.faq,
  }
}

export function resolvedAccent(lead: Pick<LeadDemoConfig, 'accentColor' | 'industry'>) {
  return lead.accentColor || industryAccents[lead.industry]
}

export function buildDemoUrl(
  lead: Pick<LeadDemoConfig, 'companyName' | 'logoUrl' | 'accentColor' | 'leadSlug' | 'industry'>,
) {
  const origin = process.env.NEXT_PUBLIC_FUNNEL_ORIGIN ?? 'https://funnels.pipehook.co'
  const url = new URL(origin.endsWith('/') ? origin : `${origin}/`)
  url.searchParams.set('company', lead.companyName)
  url.searchParams.set('industry', lead.industry)
  url.searchParams.set('ref', lead.leadSlug)
  url.searchParams.set('accent', resolvedAccent(lead))
  if (lead.logoUrl) url.searchParams.set('logo', lead.logoUrl)
  return url.toString()
}

export function isIndustry(value: string): value is Industry {
  return industries.includes(value as Industry)
}
