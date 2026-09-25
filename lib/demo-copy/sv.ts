import type { DemoCopy } from './types'

export const demoCopySv: DemoCopy = {
  metaDescription: (company) => `En privat genomgång för ${company}.`,
  loomTitle: (company) => `Loom-video till ${company}`,
  control: {
    kicker: 'KONTROLLFÖRLUSTEN',
    headline: 'Problemet är inte att kalendern är tom. Det är vilka jobb som fyller den.',
    intro: 'De flesta VVS- och reliningfirmor känner igen sig i minst en av dessa tre situationer:',
    traps: [
      {
        title: 'Hoppet som strategi:',
        body: 'Ni lever på rekommendationer. Det är bra när det fungerar, men när telefonen är tyst står dyra tekniker stilla.',
      },
      {
        title: 'Auktionen:',
        body: 'Ni köper förfrågningar från offertsajter. Samma kund säljs till flera firmor, och ni tvingas prispressa mot oseriösa aktörer.',
      },
      {
        title: 'Kontrollofferterna:',
        body: 'Husägare ber om gratis offerter enbart för att ha en prisjämförelse. Ni lägger kvällarna på att räkna på jobb ni ändå inte får.',
      },
    ],
    closing: 'Ni gör allt rätt, men förlorar ändå affären.',
    image: {
      src: '/demo/kitchen-table-quotes.jpg',
      alt: 'VVS-tekniker vid köksbordet på kvällen med miniräknare och offerter.',
      width: 1024,
      height: 1024,
    },
    bridge:
      'Många inser detta och försöker ta in egna kunder via sociala medier — bara för att stöta på andra problem…',
  },
  misunderstanding: {
    kicker: 'MISSFÖRSTÅNDET SOM KOSTAR PENGAR',
    headline: 'Vad de allra flesta VVS-firmor gör fel när de annonserar på sociala medier',
    paragraphs: [
      'Att köra egna kampanjer slutar ofta med klick som kostar pengar men inte ger några riktiga jobb. Problemet är att man behandlar Facebook på samma sätt som Google.',
      '**På Google letar kunden aktivt efter en lösning.**',
      'Men när de öppnar Facebook eller Instagram vill de bara **koppla av och se vad som händer i deras vänkrets, möjligtvis bli underhållna av en rolig video, eller upptäcka/lära sig något nytt.**',
      'En annons som säger **"Vi utför relining – begär offert idag!"** försöker sälja ett ingrepp för 150 000 kr till någon som:',
    ],
    negativeItems: [
      'Inte är i rätt sinnesstämning',
      'Troligen inte ens vet om att de har ett rörproblem',
    ],
    image: {
      src: '/demo/ad-compare.png',
      alt: 'Jämförelse av två Facebook-annonser: rördiagnos med grön bock kontra begär-offert-annons med rött kryss.',
      width: 1024,
      height: 688,
    },
    bridge:
      'Det finns ett bättre sätt som smidigt tar husägaren från "Hmm..." → "Aha!" → Bokat hembesök',
  },
  journey: {
    kicker: 'EN NATURLIG KUNDRESA',
    headline: 'Rätt innehåll vid rätt tidpunkt',
    paragraphs: [
      'Eftersom husägaren som scrollar på Facebook inte är i "köpmode" utan bara vill slappna av bli underhållen på måste vi istället hitta sätt att **trigga deras nyfikenhet**.',
      'Istället för att trycka upp en tjänst i ansiktet på dem **ger vi dem en insikt genom en snabb "diagnos"**.',
      '"Har dina gjutjärnsrör passerat sina bäst-före-datum? Gör testet och får svar direkt! (tar 2 minuter)"',
      '**Ett dolt problem har blivit en konkret tanke hos husägaren.**',
    ],
    image: {
      src: '/demo/better-way-steps.png',
      alt: 'Tre steg: fånga uppmärksamhet, filtrera rätt husägare, erbjuda gratis rörinspektion.',
      width: 1024,
      height: 1024,
    },
    bridge: 'Men hur stor är egentligen den här gruppen, jämfört med de som redan aktivt söker?',
  },
  volume: {
    kicker: 'VOLYMTAKET FÖRSVINNER',
    headline: 'Söktrafiken är bara en bråkdel av den totala målgruppen',
    paragraphs: [
      'De flesta rörfirmor konkurrerar om samma smala ström av sökande kunder på Google.',
      'Den stora massan **som ännu inte vet att de har ett problem är många gånger fler**, och det är dem vi når.',
    ],
    image: {
      src: '/demo/reach-discovery.png',
      alt: 'Cirkeldiagram: liten grå Sök (Google)-del kontra stor blå Discovery (Facebook/Instagram)-del.',
      width: 1024,
      height: 688,
    },
    bridge:
      'Det är den här skillnaden som gör att aktörer som VVStrygg kunnat fortsätta växa år efter år.',
  },
  diagnostic: {
    kicker: 'DIAGNOSTISK FÖRSÄLJNING',
    headline: 'Sälj hembesöket, inte rörbytet',
    paragraphs: [
      'När husägaren gjort testet ber vi dem inte att köpa en renovering. Vi erbjuder en kostnadsfri kamerainspektion.',
      'Det är genom offensiv marknadsföring av hembesök aktörer som VVStrygg har vuxit till **81 miljoner kronor i omsättning på nio år**.',
      'Mönstret syns tydligt i hur de marknadsför sig: fokus ligger konsekvent på den kostnadsfria inspektionen, inte på offerter för relining.',
      'När er tekniker står i kundens vardagsrum med kameran är **ni den enda experten på plats**, och priskonkurrensen ser helt annorlunda ut.',
      'Enda problemet? Hembesök kostar pengar, och det gäller att åka hem till rätt kundprospekt.',
      'Det är denna process PipeHook bygger på.',
    ],
    image: {
      src: '/demo/vvstrygg-diagnostic-sales.jpg',
      alt: 'VVStrygg marknadsför kostnadsfri rörinspektion: sajt, omsättningsgraf och Google-annons.',
      width: 1024,
      height: 1024,
    },
    bridge: 'Men gratis hembesök väcker en uppenbar fråga...',
  },
  qualification: {
    kicker: 'STRIKT KVALIFICERING = LÖNSAMMA HEMBESÖK',
    headline: 'Kvalificeringen är nyckeln till lönsamma hembesök. Systemet sköter den åt er.',
    paragraphs: [
      'Ni vinner redan era bästa affärer vid kundens köksbord — det är inte nytt för er.',
      'Det som avgör om hembesöken går ihop ekonomiskt är kvalificeringen: rätt hus, rätt läge i beslutet.',
      'Skickar ni ut en tekniker till en **villa med plaströr**, eller där relining redan gjorts av förra ägaren, **blir det ingen affär**.',
      'Därför fungerar modellen enbart om man har **en strikt, automatisk kvalificering**.',
      'Vårt rörtest fungerar som ett filter i bakgrunden.',
    ],
    image: {
      src: '/demo/qualification-funnel.png',
      alt: 'Kvalificeringstratt: från alla som gör rörtestet ner till bokat hembesök via byggår, bostadstyp, symptom och ålder.',
      width: 800,
      height: 680,
    },
    afterImage:
      'Uppfyller huset inte kriterierna erbjuds inget kostnadsfritt hembesök — det sorteras bort innan det blir en kontakt ni betalar för.',
    bridge: 'De som passerar igenom och anmäler sig? De triggar nästa steg i systemet:',
  },
  sms: {
    kicker: 'DEN SISTA PUSSELBITEN',
    headline: 'En AI-ledd SMS-konversation värmer upp kontakten — innan ni ens ringer',
    paragraphs: [
      'Direkt efter testet inleder en AI-ledd SMS-konversation kontakten — presenterar er och frågar vilka tider som passar.',
      '**Ni ringer** sen aldrig en kall kontakt, utan **någon som redan svarat och väntar på samtalet.**',
    ],
    image: {
      src: '/demo/sms-conversation.jpg',
      alt: 'AI-ledd SMS-konversation som värmer upp kontakten innan ni ringer.',
      width: 612,
      height: 896,
    },
    bridge:
      'Så vad krävs för att bygga ett sånt här system — och hur vet ni att jag faktiskt kan leverera vad jag lovar?',
  },
  authority: {
    kicker: '20 ÅRS DIGITAL MARKNADSFÖRING',
    headline: 'Jag har gjort exakt det här förut — för redovisningsbyråer och tandvårdskliniker',
    paragraphs: [
      'På Ageras hjälpte jag redovisningsbyråer få fler kunder — inkommande förfrågningar växte från ett dussin till över 800 i månaden, på ett år.',
      'Sedan dess har jag gjort samma sak för tandvårdskliniker hos Leadcom — över 70 kliniker i Sverige, Norge och England, med runt 1,5–2 miljoner euro i årlig annonsbudget under förvaltning.',
      'Nu har jag tagit den arkitekturen och byggt PipeHook — helt skräddarsytt för relining och VVS.',
    ],
    image: {
      src: '/demo/authority-ageras-leadcom.png',
      alt: 'Ageras rekommendationsbrev från Martin Hegelund och Leadcom-resultat med klinikfoton och resultatgraf.',
      width: 1024,
      height: 688,
    },
    bridge: 'Och det är inte bara jag som sett mönstret fungera.',
  },
  method: {
    kicker: 'SAMMA METOD, ANDRA BRANSCHER',
    headline: 'Konceptet är redan beprövat i andra branscher',
    intro: 'Samma diagnos --> resultat --> lösning-princip driver redan annonser i flera branscher:',
    examplesLabel: 'Exempel från andra branscher',
    examples: [
      {
        src: '/demo/method-hudguiden.jpg',
        alt: 'Hudtest: Gör hudtestet, få din rutin',
        caption: 'Gör hudtestet, få din rutin',
        width: 448,
        height: 752,
      },
      {
        src: '/demo/method-solkollen.jpg',
        alt: 'Solcellstest: Se hur mycket du kan spara',
        caption: 'Se hur mycket du kan spara',
        width: 448,
        height: 752,
      },
      {
        src: '/demo/method-varmekollen.jpg',
        alt: 'Värmepumpstest: Se om ditt hus passar',
        caption: 'Se om ditt hus passar',
        width: 448,
        height: 752,
      },
    ],
    paragraphs: [
      'Ett tydligare exempel:',
      'För tandimplantat använde jag själv samma princip — "Gör testet och se om du är kandidat för fasta tänder."',
      'Testet sänker tröskeln till ett stort beslut och kvalificerar samtidigt vem som faktiskt passar för behandlingen, innan någon behöver prata pris.',
      'Relining fungerar på samma sätt — ett snabbt test istället för ett stort första steg.',
    ],
    image: {
      src: '/demo/happident-implant-quiz.png',
      alt: 'Happidents implantat-quiz: frågesteg till vänster och personlig analys med bokningsknapp till höger.',
      width: 800,
      height: 680,
    },
  },
  proof: {
    kicker: 'REDAN I DRIFT',
    headline: 'Rörrapporten.se — vårt eget test, redan i drift',
    paragraphs: [
      'Rörrapporten är vår egen sida, och den är redan igång. Kostnaden per kvalificerad kontakt har sjunkit stadigt för varje vecka vi finjusterat annonserna.',
      'Kontakterna är inte bara klick — det är husägare som redan angett rätt åldersspann på huset och gjutjärnsrör i sitt svar, samma kvalificering ni sett i testet ovan.',
    ],
    image: {
      src: '/demo/rorrapporten-collage.jpg',
      alt: 'Rörrapporten i drift: frågeformulär, resultatsida, prospektkort och annonsstatistik.',
      width: 1024,
      height: 1024,
    },
    bridge: (market) => `Så vad betyder allt det här konkret för ${market}?`,
  },
  requirements: {
    headline: 'Våra krav',
    intro: 'För att allt ska fungera optimalt har vi följande krav på de företag vi jobbar med:',
    items: [
      { label: 'Kundbetyg', value: '4,0 eller högre', icon: 'star' },
      { label: 'Bokning', value: 'Kan ringa och boka in tid direkt med prospekt', icon: 'phone' },
      { label: 'Hembesök', value: 'Erbjuder kostnadsfri inspektion', icon: 'home' },
    ],
  },
  exclusivity: {
    kicker: 'EN REGION. EN PARTNER.',
    headline: 'Ni delar aldrig förfrågan med någon annan',
    intro:
      'Vi arbetar strikt med ett företag per geografiskt område. Ingen auktion och ingen budgivning mellan er och grannfirman.',
    bullets: [
      {
        title: 'Bara era kontakter:',
        body: () =>
          'Varje varm, kvalificerad kontakt går direkt till er — aldrig till en konkurrent i området.',
      },
      {
        title: 'Ett företag per område:',
        body: (company, market) => `När ${company} tar ${market} är platsen låst.`,
      },
      {
        title: 'Inga bindningstider:',
        body: () =>
          'Inga tolvmånadersavtal. Ni testar, utvärderar resultatet, och stannar så länge det är lönsamt.',
      },
    ],
    image: {
      src: '/demo/region-exclusivity-map.jpg',
      alt: 'Karta över Sverige indelad i regioner, varje region markerad med ett lås.',
      width: 1024,
      height: 1024,
    },
    bridge: (market) =>
      `${market} har en plats kvar. Vi pratar just nu med några utvalda firmor där.`,
  },
  tryDemo: {
    headline: 'Testa demot själv',
    body: 'Klicka er igenom rörtestet precis som en av era kunder skulle göra.',
    button: 'Testa demot',
  },
  nextStep: {
    kicker: 'NÄSTA STEG',
    headline: (market) => `Redo att ta över ${market}?`,
    body: 'Inget möte att boka i en kalender. Lämna ditt nummer, så ringer vi upp.',
  },
  callback: {
    phoneLabel: 'Telefonnummer',
    phonePlaceholder: '07X XXX XX XX',
    notePlaceholder: 'Något du vill att vi vet innan vi ringer? (valfritt)',
    submit: 'Be oss ringa upp',
    submitting: 'Skickar…',
    success: 'Tack! Vi hör av oss inom kort.',
    microcopy: (market) =>
      `Vi jobbar bara med en partner per område, så vi hör av oss om ${market} fortfarande är ledigt.`,
    showWhatsApp: true,
    whatsappPrompt: 'Vill du inte vänta på ett samtal? Skriv till oss på WhatsApp:',
    whatsappButton: 'Skicka WhatsApp',
  },
}
