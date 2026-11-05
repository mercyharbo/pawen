'use client'

import {
  analyticsPath, campaignParameters, classifyLink, CONSENT_EVENT, CONSENT_KEY,
  consentRecord, type ConsentChoice, type AnalyticsEvent, completionEvents,
  type FormType, isProductionHost, parseConsent, safeEventParameters, safeReferrer,
} from '@/lib/analytics-policy'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

let activeId: string | null = null
let lastPage: string | null = null
const seenCompletions = new Set<string>()
const seenStarts = new Set<FormType>()

export function readConsent(): ConsentChoice {
  if (typeof window === 'undefined') return 'unset'
  try { return parseConsent(localStorage.getItem(CONSENT_KEY)) } catch { return 'unset' }
}

export function subscribeConsent(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback)
  window.addEventListener('storage', callback)
  window.addEventListener('focus', callback)
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback)
    window.removeEventListener('storage', callback)
    window.removeEventListener('focus', callback)
  }
}

export function analyticsAvailable() {
  return process.env.NODE_ENV === 'production' && typeof window !== 'undefined' &&
    isProductionHost(window.location.hostname) &&
    /^G-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '')
}

function canTrack() {
  return analyticsAvailable() && readConsent() === 'accepted' && activeId !== null
}

function disableAnalytics() {
  const id = activeId ?? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  if (id) (window as unknown as Record<string, unknown>)[`ga-disable-${id}`] = true
  window.gtag?.('consent', 'update', { analytics_storage: 'denied' })
  activeId = null
  lastPage = null
  window.dataLayer = []
  const host = window.location.hostname.split('.')
  const domains = ['', ...host.map((_, index) => `.${host.slice(index).join('.')}`)]
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim()
    if (name !== '_ga' && !name.startsWith('_ga_') && name !== '_gid' && !name.startsWith('_gat')) continue
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ''} SameSite=Lax; Secure`
    }
  }
}

export function saveConsent(choice: Exclude<ConsentChoice, 'unset'>) {
  const wasActive = activeId !== null
  if (choice === 'rejected') disableAnalytics()
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify(consentRecord(choice))) } catch {
    // If preferences cannot be saved, keep analytics off.
    disableAnalytics()
  }
  window.dispatchEvent(new Event(CONSENT_EVENT))
  if (wasActive && choice === 'rejected') window.location.reload()
}

export function initializeAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  if (!analyticsAvailable() || readConsent() !== 'accepted' || !id || activeId === id) return
  activeId = id
  ;(window as unknown as Record<string, unknown>)[`ga-disable-${id}`] = false
  window.dataLayer = window.dataLayer ?? []
  window.gtag = function () {
    // Google’s tag command format uses the arguments object.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments)
  }
  window.gtag('consent', 'default', {
    analytics_storage: 'granted', ad_storage: 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied',
  })
  window.gtag('js', new Date())
  window.gtag('config', id, {
    send_page_view: false, allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: `${window.location.origin}${analyticsPath(window.location.pathname)}`,
    page_referrer: safeReferrer(document.referrer),
    ...campaignParameters(window.location.search),
  })
  if (!document.getElementById('pawen-google-tag')) {
    const script = document.createElement('script')
    script.id = 'pawen-google-tag'
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
    document.head.append(script)
  }
}

export function trackPageView(pathname: string) {
  if (!canTrack()) return
  const path = analyticsPath(pathname)
  if (lastPage === path) return
  const previous = lastPage
  lastPage = path
  const page = {
    page_location: `${window.location.origin}${path}`,
    page_referrer: previous ? `${window.location.origin}${previous}` : safeReferrer(document.referrer),
    page_title: path === '/' ? 'PAWEN Awards' : `PAWEN: ${path.slice(1)}`,
  }
  window.gtag?.('set', page)
  window.gtag?.('event', 'page_view', { ...page, event_year: '2026' })
  if (path === '/helpdesk') trackEvent('helpdesk_visit')
}

export function trackEvent(event: AnalyticsEvent, parameters: Record<string, unknown> = {}) {
  if (!canTrack()) return
  window.gtag?.('event', event, safeEventParameters(parameters))
}

export function trackFormStart(form: FormType) {
  if (seenStarts.has(form)) return
  // Mark even without consent: accepting later must not replay past interactions.
  seenStarts.add(form)
  trackEvent('form_start', { form_type: form })
}

export function trackFormCompletion(form: FormType, result: { status: string; resetKey?: string }) {
  if (result.status !== 'success' || !result.resetKey) return
  const key = `${form}:${result.resetKey}`
  if (seenCompletions.has(key)) return
  seenCompletions.add(key)
  trackEvent(completionEvents[form], { form_type: form })
}

export function trackLinkClick(href: string) {
  if (!canTrack()) return
  const link = classifyLink(href, window.location.origin)
  if (link) trackEvent(link.event, link.parameters)
}

export function expireConsent() {
  if (activeId && readConsent() !== 'accepted') {
    disableAnalytics()
    window.location.reload()
  }
  window.dispatchEvent(new Event(CONSENT_EVENT))
}
