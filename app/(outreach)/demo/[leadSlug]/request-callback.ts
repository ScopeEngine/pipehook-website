'use server'

export type CallbackFormState =
  | { status: 'idle' }
  | { status: 'error'; message: string }
  | { status: 'success' }

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

  const webhookUrl = process.env.MAKE_WEBHOOK_URL
  if (!webhookUrl) {
    console.error('MAKE_WEBHOOK_URL is not set')
    return {
      status: 'error',
      message: 'Återuppringning är inte konfigurerad ännu. Försök igen senare eller skicka WhatsApp.',
    }
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone,
        note: note || null,
        companyName: companyName || null,
        region: region || null,
        leadSlug: leadSlug || null,
        source: 'demo-callback',
      }),
    })

    if (!response.ok) {
      console.error('Make webhook failed', response.status, await response.text().catch(() => ''))
      return { status: 'error', message: 'Kunde inte skicka förfrågan. Försök igen om en stund.' }
    }
  } catch (error) {
    console.error('Make webhook error', error)
    return { status: 'error', message: 'Kunde inte skicka förfrågan. Försök igen om en stund.' }
  }

  return { status: 'success' }
}
