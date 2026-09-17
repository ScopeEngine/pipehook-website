'use server'

export type CallbackFormState =
  | { status: 'idle' }
  | { status: 'error'; message: string }
  | { status: 'success' }

const CALLBACK_EMAIL_TO = 'carl.jakob.holmberg@gmail.com'
const CALLBACK_EMAIL_SUBJECT = 'Pipehook - ring upp!'

function buildEmailBody(input: {
  phone: string
  note: string
  companyName: string
  region: string
  leadSlug: string
}) {
  const lines = [
    `Telefon: ${input.phone}`,
    input.note ? `Meddelande: ${input.note}` : null,
    input.companyName ? `Företag: ${input.companyName}` : null,
    input.region ? `Område: ${input.region}` : null,
    input.leadSlug ? `Lead-slug: ${input.leadSlug}` : null,
    `Källa: demo-callback`,
  ].filter(Boolean)

  return lines.join('\n')
}

async function sendViaResend(text: string) {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) return { ok: false as const, reason: 'missing-key' }

  const from = process.env.CALLBACK_EMAIL_FROM?.trim() || 'PipeHook <onboarding@resend.dev>'
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [CALLBACK_EMAIL_TO],
      subject: CALLBACK_EMAIL_SUBJECT,
      text,
    }),
  })

  if (!response.ok) {
    const detail = await response.text().catch(() => '')
    console.error('Resend failed', response.status, detail)
    return { ok: false as const, reason: 'resend-error', status: response.status, detail }
  }

  return { ok: true as const }
}

async function sendViaMakeWebhook(payload: Record<string, unknown>) {
  const webhookUrl = process.env.MAKE_WEBHOOK_URL?.trim()
  if (!webhookUrl) return { ok: false as const, reason: 'missing-webhook' }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const detail = await response.text().catch(() => '')
    console.error('Make webhook failed', response.status, detail)
    return { ok: false as const, reason: 'make-error', status: response.status, detail }
  }

  return { ok: true as const }
}

export async function requestCallback(
  _prev: CallbackFormState,
  formData: FormData,
): Promise<CallbackFormState> {
  const phone = String(formData.get('phone') ?? '').trim()
  const note = String(formData.get('note') ?? '').trim()
  const companyName = String(formData.get('companyName') ?? '').trim()
  const region = String(formData.get('region') ?? '').trim()
  const leadSlug = String(formData.get('leadSlug') ?? '').trim()

  if (!phone) {
    return { status: 'error', message: 'Telefonnummer krävs.' }
  }

  const emailText = buildEmailBody({ phone, note, companyName, region, leadSlug })
  const webhookPayload = {
    to: CALLBACK_EMAIL_TO,
    subject: CALLBACK_EMAIL_SUBJECT,
    phone,
    note: note || null,
    companyName: companyName || null,
    region: region || null,
    leadSlug: leadSlug || null,
    source: 'demo-callback',
    text: emailText,
  }

  try {
    const resendResult = await sendViaResend(emailText)
    if (resendResult.ok) {
      return { status: 'success' }
    }

    const makeResult = await sendViaMakeWebhook(webhookPayload)
    if (makeResult.ok) {
      return { status: 'success' }
    }

    if (resendResult.reason === 'missing-key' && makeResult.reason === 'missing-webhook') {
      console.error('Neither RESEND_API_KEY nor MAKE_WEBHOOK_URL is set')
      return {
        status: 'error',
        message: 'Återuppringning är inte konfigurerad ännu. Försök igen senare eller skicka WhatsApp.',
      }
    }

    console.error('Callback delivery failed', { resendResult, makeResult })
    return { status: 'error', message: 'Kunde inte skicka förfrågan. Försök igen om en stund.' }
  } catch (error) {
    console.error('Callback send error', error)
    return { status: 'error', message: 'Kunde inte skicka förfrågan. Försök igen om en stund.' }
  }
}
