/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS harness loads fresh TypeScript modules to isolate browser-session state. */
const assert = require('node:assert/strict')
const test = require('node:test')
const fs = require('node:fs')
const path = require('node:path')
const Module = require('node:module')
const ts = require('typescript')

const root = path.resolve(__dirname, '..')
const originalResolve = Module._resolveFilename
Module._resolveFilename = function (request, ...args) {
  return originalResolve.call(this, request.startsWith('@/') ? path.join(root, request.slice(2)) : request, ...args)
}
Module._extensions['.ts'] = (mod, filename) => mod._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, filename)

const policy = require('../lib/analytics-policy.ts')

function setup(hostname = 'www.thepawenawards.org') {
  const stored = new Map()
  const scripts = []
  const removedCookies = []
  let reloads = 0
  global.localStorage = { getItem: key => stored.get(key) ?? null, setItem: (key, value) => stored.set(key, value) }
  global.window = {
    location: { hostname, origin: `https://${hostname}`, pathname: '/', search: '?email=person@example.com&utm_source=newsletter', reload: () => reloads++ },
    dispatchEvent() {},
  }
  global.document = {
    referrer: 'https://example.com/private/person@example.com?token=secret',
    get cookie() { return '_ga=old; _ga_TEST=old' },
    set cookie(value) { removedCookies.push(value) },
    createElement: () => ({}),
    getElementById: id => scripts.find(script => script.id === id),
    head: { append: script => scripts.push(script) },
  }
  process.env.NODE_ENV = 'production'
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-TEST123'
  delete require.cache[require.resolve('../lib/analytics.ts')]
  const analytics = require('../lib/analytics.ts')
  const commands = () => (window.dataLayer ?? []).map(command => Array.from(command))
  return { analytics, commands, stored, scripts, removedCookies, reloads: () => reloads }
}

test('consent rejects malformed/expired records and remembers a six-month choice', () => {
  assert.equal(policy.parseConsent('{bad'), 'unset')
  assert.equal(policy.parseConsent(JSON.stringify({ choice: 'accepted', expiresAt: 5 }), 6), 'unset')
  const record = policy.consentRecord('accepted', new Date('2026-11-05T12:00:00Z'))
  assert.equal(new Date(record.expiresAt).toISOString(), '2027-05-05T12:00:00.000Z')
})

test('nothing loads or transmits before acceptance; no past activity is replayed', () => {
  const { analytics: a, scripts, commands } = setup()
  a.initializeAnalytics()
  a.trackPageView('/')
  a.trackFormStart('nomination')
  a.trackFormCompletion('newsletter', { status: 'success', resetKey: 'before-consent' })
  assert.equal(scripts.length, 0)
  assert.equal(commands().length, 0)
  a.saveConsent('accepted')
  a.initializeAnalytics()
  a.initializeAnalytics()
  a.trackFormStart('nomination')
  a.trackFormCompletion('newsletter', { status: 'success', resetKey: 'before-consent' })
  assert.equal(scripts.length, 1)
  assert.equal(commands().filter(c => c[0] === 'event').length, 0)
  assert.equal(commands().find(c => c[0] === 'config')[2].send_page_view, false)
})

test('test hosts and missing measurement IDs remain off even with consent', () => {
  for (const host of ['localhost', 'gleaming-blini-49cb44.netlify.app', 'deploy-preview-1--pawen.netlify.app', 'www.thepawenawards.org.evil.test']) {
    const { analytics: a, scripts } = setup(host)
    a.saveConsent('accepted'); a.initializeAnalytics(); a.trackPageView('/')
    assert.equal(scripts.length, 0)
  }
  const { analytics: a, scripts } = setup()
  delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  a.saveConsent('accepted'); a.initializeAnalytics()
  assert.equal(scripts.length, 0)
})

test('SPA views and successful submissions are counted once; no PII enters parameters', () => {
  const { analytics: a, commands } = setup()
  a.saveConsent('accepted'); a.initializeAnalytics()
  a.trackPageView('/'); a.trackPageView('/'); a.trackPageView('/summit')
  a.trackFormCompletion('summit', { status: 'error', resetKey: 'failed' })
  a.trackFormCompletion('summit', { status: 'success', resetKey: 'one' })
  a.trackFormCompletion('summit', { status: 'success', resetKey: 'one' })
  a.trackFormCompletion('summit', { status: 'success', resetKey: 'two' })
  a.trackEvent('partner_click', { partner: 'dots', email: 'person@example.com', form_type: 'unsafe' })
  a.trackLinkClick('https://selar.com/81eky71031?email=person@example.com')
  const events = commands().filter(c => c[0] === 'event')
  assert.equal(events.filter(c => c[1] === 'page_view').length, 2)
  assert.equal(events.filter(c => c[1] === 'summit_registration_complete').length, 2)
  assert.equal(events.filter(c => c[1] === 'ticket_interest').length, 1)
  assert.ok(!JSON.stringify(commands()).includes('person@example.com'))
  assert.ok(!JSON.stringify(commands()).includes('secret'))
  assert.deepEqual(policy.safeEventParameters({ partner: 'dots', email: 'person@example.com' }), { event_year: '2026', partner: 'dots' })
  assert.deepEqual(policy.campaignParameters('?utm_source=x@example.com&email=private'), {})
})

test('withdrawal and expiry stop tracking, clear accessible GA cookies and reload', () => {
  const { analytics: a, commands, removedCookies, reloads, stored } = setup()
  a.saveConsent('accepted'); a.initializeAnalytics()
  a.saveConsent('rejected'); a.trackEvent('ticket_interest')
  assert.equal(window['ga-disable-G-TEST123'], true)
  assert.equal(reloads(), 1)
  assert.ok(removedCookies.some(cookie => cookie.includes('_ga=; Max-Age=0')))
  assert.equal(commands().length, 0)
  assert.equal(a.readConsent(), 'rejected')
  // Expiry is checked even while the visitor stays on a single page.
  a.saveConsent('accepted'); a.initializeAnalytics()
  assert.equal(window['ga-disable-G-TEST123'], false)
  stored.set(policy.CONSENT_KEY, JSON.stringify({ choice: 'accepted', expiresAt: 1 }))
  a.expireConsent()
  assert.equal(reloads(), 2)
})

test('partner/document/contact clicks use fixed categories and ignore arbitrary URLs', () => {
  const origin = 'https://www.thepawenawards.org'
  assert.equal(policy.classifyLink('https://www.dotsbookings.com/?email=private', origin).parameters.partner, 'dots')
  assert.equal(policy.classifyLink('https://terratrekstravel.com/gallery', origin).parameters.partner, 'terratreks')
  assert.equal(policy.classifyLink('/delegates', origin).parameters.document, 'delegates')
  assert.equal(policy.classifyLink('mailto:someone@example.com', origin).parameters.contact_method, 'email')
  assert.equal(policy.classifyLink('https://evil.test/private?email=person@example.com', origin), null)
})
