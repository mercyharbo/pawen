export const CONSENT_KEY = 'pawen-analytics-consent-v1'
export const CONSENT_EVENT = 'pawen-analytics-consent-change'
export const PREFERENCES_EVENT = 'pawen-analytics-preferences'
export const EVENT_YEAR = '2026'

export type ConsentChoice = 'accepted' | 'rejected' | 'unset'
export type FormType = 'nomination' | 'summit' | 'speaker' | 'exhibition' | 'newsletter'
export type AnalyticsEvent =
  | 'form_start'
  | 'nomination_complete'
  | 'summit_registration_complete'
  | 'speaker_application_complete'
  | 'exhibition_enquiry_complete'
  | 'newsletter_signup_complete'
  | 'ticket_interest'
  | 'partner_click'
  | 'document_click'
  | 'contact_click'
  | 'helpdesk_visit'

const paths = new Set([
  '/', '/summit', '/gala', '/exhibition', '/nominations', '/speakers',
  '/winners', '/sponsors', '/plan-your-trip', '/helpdesk',
  '/privacy-policy', '/terms-and-conditions',
])

export function isProductionHost(hostname: string) {
  return hostname === 'thepawenawards.org' || hostname === 'www.thepawenawards.org'
}

export function analyticsPath(pathname: string) {
  const path = pathname.replace(/\/$/, '') || '/'
  return paths.has(path) ? path : '/other'
}

export function parseConsent(value: string | null, now = Date.now()): ConsentChoice {
  try {
    const stored = JSON.parse(value ?? 'null')
    return stored && Number.isFinite(stored.expiresAt) && stored.expiresAt > now &&
      (stored.choice === 'accepted' || stored.choice === 'rejected')
      ? stored.choice : 'unset'
  } catch {
    return 'unset'
  }
}

export function consentRecord(choice: Exclude<ConsentChoice, 'unset'>, now = new Date()) {
  const expiry = new Date(now)
  expiry.setMonth(expiry.getMonth() + 6)
  return { choice, expiresAt: expiry.getTime() }
}

// Only campaign identifiers, never arbitrary URL queries or fragment contents.
export function campaignParameters(search: string) {
  const query = new URLSearchParams(search)
  const result: Record<string, string> = {}
  for (const [source, target] of [
    ['utm_source', 'campaign_source'], ['utm_medium', 'campaign_medium'],
    ['utm_campaign', 'campaign_name'],
  ]) {
    const value = query.get(source)
    if (value && /^[a-zA-Z0-9_-]{1,80}$/.test(value)) result[target] = value
  }
  return result
}

export function safeReferrer(referrer: string) {
  try {
    const url = new URL(referrer)
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return ''
    return isProductionHost(url.hostname)
      ? `${url.origin}${analyticsPath(url.pathname)}` : url.origin
  } catch {
    return ''
  }
}

const allowedValues: Record<string, readonly string[]> = {
  form_type: ['nomination', 'summit', 'speaker', 'exhibition', 'newsletter'],
  partner: ['dots', 'terratreks', 'grand_palace', 'holiday_inn', 'protea', 'southern_sun'],
  document: ['delegates', 'brochure'],
  contact_method: ['email', 'phone'],
}

export function safeEventParameters(parameters: Record<string, unknown>) {
  const result: Record<string, string> = { event_year: EVENT_YEAR }
  for (const [key, values] of Object.entries(allowedValues)) {
    const value = parameters[key]
    if (typeof value === 'string' && values.includes(value)) result[key] = value
  }
  return result
}

export const completionEvents: Record<FormType, AnalyticsEvent> = {
  nomination: 'nomination_complete', summit: 'summit_registration_complete',
  speaker: 'speaker_application_complete', exhibition: 'exhibition_enquiry_complete',
  newsletter: 'newsletter_signup_complete',
}

export function classifyLink(href: string, origin: string): {
  event: AnalyticsEvent; parameters: Record<string, string>
} | null {
  try {
    const url = new URL(href, origin)
    if (url.protocol === 'mailto:') return { event: 'contact_click', parameters: { contact_method: 'email' } }
    if (url.protocol === 'tel:') return { event: 'contact_click', parameters: { contact_method: 'phone' } }
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null
    if (url.hostname === 'selar.com') return url.pathname === '/81eky71031'
      ? { event: 'ticket_interest', parameters: {} } : null
    const partners: Record<string, string> = {
      'www.dotsbookings.com': 'dots', 'dotsbookings.com': 'dots',
      'terratrekstravel.com': 'terratreks', 'www.terratrekstravel.com': 'terratreks',
      'www.ideaform.app': 'grand_palace', 'grandpalace.co.zm': 'grand_palace',
      'www.ihg.com': 'holiday_inn', 'www.marriott.com': 'protea',
      'www.southernsun.com': 'southern_sun',
    }
    if (partners[url.hostname]) return { event: 'partner_click', parameters: { partner: partners[url.hostname] } }
    if (url.origin === origin) {
      const path = decodeURIComponent(url.pathname).toLowerCase()
      if (path === '/delegates' || path.includes('delegate information pack')) return { event: 'document_click', parameters: { document: 'delegates' } }
      if (path.endsWith('.pdf')) return { event: 'document_click', parameters: { document: 'brochure' } }
    }
    return null
  } catch {
    return null
  }
}
