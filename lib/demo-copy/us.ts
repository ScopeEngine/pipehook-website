import type { DemoCopy } from './types'

export const demoCopyUs: DemoCopy = {
  metaDescription: (company) => `A private walkthrough for ${company}.`,
  loomTitle: (company) => `Loom video for ${company}`,
  control: {
    kicker: 'THE CONTROL PROBLEM',
    headline: "The problem isn't an empty schedule. It's which jobs fill it.",
    intro:
      'Most plumbing and pipe relining companies recognize themselves in at least one of these three situations:',
    traps: [
      {
        title: 'Hope as a strategy:',
        body: "You live on referrals. Great when it works, but when the phone's quiet, expensive technicians sit idle.",
      },
      {
        title: 'The auction:',
        body: 'You buy inquiries from directory sites. The same homeowner gets sold to multiple companies, forcing you to race to the bottom on price.',
      },
      {
        title: 'The control quote:',
        body: "Homeowners ask for free quotes just to comparison shop. You spend your evenings pricing jobs you'll never get.",
      },
    ],
    closing: 'You do everything right, and still lose the job.',
    image: {
      src: '/demo/us/kitchen-table-quotes.jpg',
      alt: 'Plumbing technician at the kitchen table at night with a calculator and quotes.',
      width: 1024,
      height: 1024,
    },
    bridge:
      'Many realize this and try bringing in their own customers through social media — only to run into a different problem…',
  },
  misunderstanding: {
    kicker: 'THE MISUNDERSTANDING THAT COSTS YOU MONEY',
    headline: 'What most plumbing companies get wrong when advertising on social media',
    paragraphs: [
      "Running your own campaigns often means clicks that cost money but don't turn into real jobs. The problem is treating Facebook the same way you treat Google.",
      '**On Google, the customer is actively looking for a solution.**',
      'But when they open Facebook or Instagram, they just want to unwind and see what\'s happening with friends, maybe catch a funny video, or discover something new.',
      'An ad that says **"We do pipe relining — request a quote today!"** tries to sell a **$15,000** job to someone who:',
    ],
    negativeItems: [
      "Isn't in the right headspace",
      "Probably doesn't even know they have a pipe problem",
    ],
    image: {
      src: '/demo/us/ad-compare.png',
      alt: 'Comparison of two Facebook ads — pipe diagnosis with a green checkmark vs. request-a-quote ad with a red X.',
      width: 1024,
      height: 688,
    },
    bridge:
      'There\'s a better way that smoothly takes the homeowner from "Hmm..." → "Aha!" → Booked home visit',
  },
  journey: {
    kicker: 'A NATURAL CUSTOMER JOURNEY',
    headline: 'The right content at the right moment',
    paragraphs: [
      'Since the homeowner scrolling Facebook isn\'t in "buying mode" but just wants to relax and be entertained, we need to spark their curiosity instead.',
      'Instead of pushing a service in their face, we give them an insight through a quick "diagnosis."',
      '"Is your home older than 1980? Cast iron, clay, and Orangeburg pipe don\'t last forever. Take the test and get your answer instantly! (takes 2 minutes)"',
      "A hidden problem just became a concrete thought in the homeowner's mind.",
    ],
    image: {
      src: '/demo/us/better-way-steps.png',
      alt: 'Three steps — capture attention, filter the right homeowners, offer a free pipe inspection.',
      width: 1024,
      height: 1024,
    },
    bridge: 'But how big is this group, really, compared to those already actively searching?',
  },
  volume: {
    kicker: 'THE VOLUME CEILING DISAPPEARS',
    headline: 'Search traffic is just a fraction of the total market',
    paragraphs: [
      'Most plumbing companies compete for the same narrow stream of searching customers on Google.',
      "The much larger group who don't yet know they have a problem is many times bigger — and that's who we reach.",
    ],
    image: {
      src: '/demo/us/reach-discovery.png',
      alt: 'Pie chart — small gray Search (Google) slice vs. large blue Discovery (Facebook/Instagram) slice.',
      width: 1024,
      height: 688,
    },
    bridge:
      'This difference is what lets discovery-based home service companies keep growing year after year — without ever hitting the ceiling search advertising has.',
  },
  diagnostic: {
    kicker: 'DIAGNOSTIC SELLING',
    headline: 'Sell the home visit, not the pipe replacement',
    paragraphs: [
      "Once the homeowner takes the test, we don't ask them to buy a renovation. We offer a free camera inspection.",
      "It's aggressively marketing the free home visit — not the big-ticket service — that lets home service companies win this way consistently, market after market.",
      'The pattern is clear in how they market themselves: the focus is consistently on the free inspection, never on relining quotes.',
      "When your technician is standing in the customer's living room with the camera, you're the only expert in the room, and price competition looks completely different.",
      "The catch? Home visits cost money, and it's essential to only visit the right prospects.",
      'This is the process PipeHook is built on.',
    ],
    // Placeholder until a US-specific free-inspection visual replaces the Swedish comparable.
    image: {
      src: '/demo/us/diagnostic-sales.jpg',
      alt: 'Marketing focused on a free camera inspection rather than quoting the full repair.',
      width: 1024,
      height: 1024,
    },
    bridge: 'But free home visits raise an obvious question...',
  },
  qualification: {
    kicker: 'STRICT QUALIFICATION = PROFITABLE HOME VISITS',
    headline: 'Qualification is the key to profitable home visits. The system handles it for you.',
    paragraphs: [
      "You already win your best deals at the customer's kitchen table — that's nothing new to you.",
      'What determines whether home visits pay off is qualification: the right house, the right stage in the decision.',
      'Send a technician to a house with **PVC pipe**, or one where a previous owner already relined it, and **there\'s no deal**.',
      "That's why this model only works with **strict, automatic qualification**.",
      'Our pipe test acts as a filter in the background.',
    ],
    image: {
      src: '/demo/us/qualification-funnel.png',
      alt: 'Qualification funnel — from everyone who takes the pipe test down to a booked home visit, via build year, home type, symptoms and age.',
      width: 800,
      height: 680,
    },
    afterImage:
      "If the house doesn't meet the criteria, no free home visit is offered — it gets filtered out before it becomes a contact you pay for.",
    bridge: 'Those who make it through and sign up? They trigger the next step in the system:',
  },
  sms: {
    kicker: 'THE LAST PIECE OF THE PUZZLE',
    headline: 'An AI-led text conversation warms up the contact — before you even call',
    paragraphs: [
      'Right after the test, an AI-led text conversation begins with the contact — introduces your company and asks what times work best.',
      "You never call a cold contact — only someone who's already responded and is expecting your call.",
    ],
    image: {
      src: '/demo/us/sms-conversation.jpg',
      alt: 'AI-led text conversation warming up the contact before you call.',
      width: 612,
      height: 896,
    },
    bridge:
      "So what does it take to build a system like this — and how do you know I can actually deliver what I'm promising?",
  },
  authority: {
    kicker: '20 YEARS OF DIGITAL MARKETING',
    headline: "I've done exactly this before — for accounting firms and dental clinics",
    paragraphs: [
      'At Ageras, I helped accounting firms get more clients — inbound inquiries grew from a dozen to over 800 a month, in one year.',
      "Since then, I've done the same for dental clinics at Leadcom — over 70 clinics across Sweden, Norway and the UK, managing roughly $1.5–2 million in annual ad spend.",
      "Now I've taken that same architecture and built PipeHook — built entirely for plumbing and trenchless pipe repair companies.",
    ],
    image: {
      src: '/demo/authority-ageras-leadcom.png',
      alt: 'Ageras recommendation letter and Leadcom results with clinic photos and performance graph.',
      width: 1024,
      height: 688,
    },
    bridge: "And I'm not the only one who's seen this pattern work.",
  },
  method: {
    kicker: 'SAME METHOD, OTHER INDUSTRIES',
    headline: 'This concept is already proven in other industries',
    intro: 'The same diagnosis → result → solution principle already drives ads in several industries:',
    examplesLabel: 'Examples from other industries',
    examples: [
      {
        src: '/demo/method-hudguiden.jpg',
        alt: 'Skin test: Take the skin test, get your routine',
        caption: 'Take the skin test, get your routine',
        width: 448,
        height: 752,
      },
      {
        src: '/demo/method-solkollen.jpg',
        alt: 'Solar test: See how much you could save',
        caption: 'See how much you could save',
        width: 448,
        height: 752,
      },
      {
        src: '/demo/method-varmekollen.jpg',
        alt: 'Heat pump test: See if your home qualifies',
        caption: 'See if your home qualifies',
        width: 448,
        height: 752,
      },
    ],
    paragraphs: [
      'A clearer example:',
      'For dental implants, I used this exact same principle myself — "Take the test and see if you\'re a candidate for a full smile."',
      "The test lowers the barrier to a big decision and qualifies who's actually a fit for the treatment, before anyone has to talk price.",
      'Trenchless pipe repair works the same way — a quick test instead of a big first step.',
    ],
    image: {
      src: '/demo/happident-implant-quiz.png',
      alt: "Happident's implant quiz — question step on the left, personalized results with booking button on the right.",
      width: 800,
      height: 680,
    },
  },
  proof: {
    kicker: 'ALREADY LIVE',
    headline: 'Rörrapporten.se — our own test, already live in Sweden',
    paragraphs: [
      'Rörrapporten is our own site, running the exact same model this page describes — already live and refined in the Swedish market. Cost per qualified contact has dropped steadily every week we\'ve fine-tuned the ads.',
      "These aren't just clicks — they're homeowners who've already indicated the right age range for their home and the right pipe material in their answers, the same qualification you saw in the test above.",
    ],
    image: {
      src: '/demo/us/rorrapporten-collage.jpg',
      alt: 'Rörrapporten live — intake form, results page, prospect card, and ad performance stats (Swedish pilot UI).',
      width: 1024,
      height: 1024,
    },
    bridge: (market) => `So what does all this actually mean for ${market}?`,
  },
  requirements: {
    headline: 'Our Requirements',
    intro: 'For everything to work at its best, we have the following requirements for the companies we work with:',
    items: [
      { label: 'Customer rating', value: '4.0 or higher', icon: 'star' },
      { label: 'Booking', value: 'Able to call and book prospects directly', icon: 'phone' },
      { label: 'Home visits', value: 'Offers a free inspection', icon: 'home' },
    ],
  },
  exclusivity: {
    kicker: 'ONE MARKET. ONE PARTNER.',
    headline: 'You never split a contact with anyone else',
    intro: 'We work with strictly one company per market. No auction, no bidding war with the company down the street.',
    bullets: [
      {
        title: 'Your contacts only:',
        body: () =>
          'Every warm, qualified contact goes straight to you — never to a competitor in your market.',
      },
      {
        title: 'One company per market:',
        body: (company, market) => `Once ${company} claims ${market}, that spot is locked.`,
      },
      {
        title: 'No contracts:',
        body: () =>
          'No 12-month commitments. You test it, you judge the results, and you stay as long as it\'s profitable.',
      },
    ],
    image: {
      src: '/demo/us/market-exclusivity-map.jpg',
      alt: 'Map of the US divided into markets, each market marked with a lock icon.',
      width: 1024,
      height: 1024,
    },
    bridge: (market) =>
      `${market} has one spot left. We're currently talking to a handful of companies there.`,
  },
  tryDemo: {
    headline: 'Try the demo yourself',
    body: 'Click through the pipe test exactly like one of your customers would.',
    button: 'Try the demo',
  },
  nextStep: {
    kicker: 'NEXT STEP',
    headline: (market) => `Ready to take over ${market}?`,
    body: "No meeting to schedule. Leave your number, and we'll call you.",
  },
  callback: {
    phoneLabel: 'Phone number',
    phonePlaceholder: '(XXX) XXX-XXXX',
    notePlaceholder: 'Anything you want us to know before we call? (optional)',
    submit: 'Request a callback',
    submitting: 'Sending…',
    success: "Thanks! We'll be in touch shortly.",
    microcopy:
      "We only work with one partner per market, so we'll confirm whether {{market}} is still open.",
    showWhatsApp: false,
    whatsappPrompt: '',
    whatsappButton: '',
  },
}
