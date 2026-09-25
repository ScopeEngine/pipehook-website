export type DemoImage = {
  src: string
  alt: string
  width: number
  height: number
}

export type DemoMethodExample = {
  src: string
  alt: string
  caption: string
  width: number
  height: number
}

export type DemoRequirement = {
  label: string
  value: string
  icon: 'star' | 'phone' | 'home'
}

/** Paragraph text may include **bold** markers. */
export type DemoCopy = {
  metaDescription: (company: string) => string
  loomTitle: (company: string) => string
  control: {
    kicker: string
    headline: string
    intro: string
    traps: { title: string; body: string }[]
    closing: string
    image: DemoImage
    bridge: string
  }
  misunderstanding: {
    kicker: string
    headline: string
    paragraphs: string[]
    negativeItems: string[]
    image: DemoImage
    bridge: string
  }
  journey: {
    kicker: string
    headline: string
    paragraphs: string[]
    image: DemoImage
    bridge: string
  }
  volume: {
    kicker: string
    headline: string
    paragraphs: string[]
    image: DemoImage
    bridge: string
  }
  diagnostic: {
    kicker: string
    headline: string
    paragraphs: string[]
    image: DemoImage | null
    bridge: string
  }
  qualification: {
    kicker: string
    headline: string
    paragraphs: string[]
    image: DemoImage
    afterImage: string
    bridge: string
  }
  sms: {
    kicker: string
    headline: string
    paragraphs: string[]
    image: DemoImage
    bridge: string
  }
  authority: {
    kicker: string
    headline: string
    paragraphs: string[]
    image: DemoImage
    bridge: string
  }
  method: {
    kicker: string
    headline: string
    intro: string
    examplesLabel: string
    examples: DemoMethodExample[]
    paragraphs: string[]
    image: DemoImage
  }
  proof: {
    kicker: string
    headline: string
    paragraphs: string[]
    image: DemoImage
    bridge: (market: string) => string
  }
  requirements: {
    headline: string
    intro: string
    items: DemoRequirement[]
  }
  exclusivity: {
    kicker: string
    headline: string
    intro: string
    bullets: { title: string; body: (company: string, market: string) => string }[]
    image: DemoImage
    bridge: (market: string) => string
  }
  tryDemo: {
    headline: string
    body: string
    button: string
  }
  nextStep: {
    kicker: string
    headline: (market: string) => string
    body: string
  }
  callback: {
    phoneLabel: string
    phonePlaceholder: string
    notePlaceholder: string
    submit: string
    submitting: string
    success: string
    microcopy: (market: string) => string
    showWhatsApp: boolean
    whatsappPrompt: string
    whatsappButton: string
  }
}
