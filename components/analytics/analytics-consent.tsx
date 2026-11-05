'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import { usePathname } from 'next/navigation'
import {
  analyticsAvailable, expireConsent, initializeAnalytics, readConsent,
  saveConsent, subscribeConsent, trackLinkClick, trackPageView,
} from '@/lib/analytics'
import { PREFERENCES_EVENT } from '@/lib/analytics-policy'

const serverConsent = () => 'unset' as const
const serverAvailable = () => false
const consentButtonClassName =
  'rounded-lg border border-gray-400 bg-white px-5 py-3 text-sm font-medium text-gray-900 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-900'

export function AnalyticsConsent() {
  const pathname = usePathname()
  const consent = useSyncExternalStore(subscribeConsent, readConsent, serverConsent)
  const available = useSyncExternalStore(subscribeConsent, analyticsAvailable, serverAvailable)
  const [preferencesOpen, setPreferencesOpen] = useState(false)

  useEffect(() => {
    const open = () => setPreferencesOpen(true)
    window.addEventListener(PREFERENCES_EVENT, open)
    return () => window.removeEventListener(PREFERENCES_EVENT, open)
  }, [])

  useEffect(() => {
    if (consent !== 'accepted') { expireConsent(); return }
    initializeAnalytics()
    trackPageView(pathname)
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return
      const anchor = event.target.closest('a[href]')
      if (anchor instanceof HTMLAnchorElement) trackLinkClick(anchor.href)
    }
    document.addEventListener('click', onClick, true)
    const interval = window.setInterval(expireConsent, 60_000)
    return () => {
      document.removeEventListener('click', onClick, true)
      window.clearInterval(interval)
    }
  }, [consent, pathname])

  // Test hosts and unconfigured builds do not show a non-functional banner.
  if (!available || (consent !== 'unset' && !preferencesOpen)) return null

  function choose(choice: 'accepted' | 'rejected') {
    saveConsent(choice)
    setPreferencesOpen(false)
  }

  return (
    <section
      aria-labelledby='analytics-consent-title'
      className='fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white px-5 py-5 text-gray-900 shadow-lg sm:px-8'
    >
      <div className='mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
        <div className='flex max-w-2xl flex-col gap-2'>
          <h2 id='analytics-consent-title' className='text-base font-semibold'>Help us improve PAWEN</h2>
          <p className='text-sm leading-6 text-gray-700'>
            With your permission, we use Google Analytics to understand visits and
            event interest. You can reject analytics and still use the website.
            {' '}<a href='/privacy-policy' className='underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4'>Read our privacy policy</a>.
          </p>
        </div>
        <div className='flex flex-wrap gap-3'>
          <button type='button' onClick={() => choose('accepted')} className={consentButtonClassName}>
            Accept analytics
          </button>
          <button type='button' onClick={() => choose('rejected')} className={consentButtonClassName}>
            Reject analytics
          </button>
          {consent !== 'unset' ? (
            <button
              type='button'
              onClick={() => setPreferencesOpen(false)}
              className='rounded-lg px-3 py-3 text-sm underline underline-offset-4 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4'
            >
              Close
            </button>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export function AnalyticsPreferencesButton() {
  const available = useSyncExternalStore(subscribeConsent, analyticsAvailable, serverAvailable)
  if (!available) return null
  return (
    <button
      type='button'
      onClick={() => window.dispatchEvent(new Event(PREFERENCES_EVENT))}
      className='w-fit text-left text-sm font-medium underline underline-offset-4 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'
    >
      Analytics preferences
    </button>
  )
}
