# PAWEN Analytics

## Ownership and identifiers

- Account: PAWEN Awards, `414874740`.
- Property: PAWEN Awards Website, `562597652`.
- Web stream: PAWEN Website, `16279534475`.
- Public measurement ID: `G-2Y1E9N1EC4`.
- Website: `https://www.thepawenawards.org` (also allows the root hostname).
- Reporting time zone: Nigeria / Africa/Lagos. Reporting currency: NGN.
- Created under the developer's signed-in Google account. Client administrator access remains pending her Google-account email and authorization; no invitation has been sent.
- [Open PAWEN Analytics](https://analytics.google.com/analytics/web/#/a414874740p562597652/reports/intelligenthome).

The measurement ID is public, not a credential. It is configured in the production context of `netlify.toml`; preview and development contexts do not receive it. The Netlify connector's environment-variable write returned 403, so the committed production-context setting is used instead. Never add a service-account key or Google login credential to client code.

## Collection rules

Google's tag is loaded only after Accept analytics on the production custom hostnames. Consent is remembered in local storage for six calendar months. Rejecting analytics does not stop forms, bookings, or other site features. Analytics preferences in the footer reopens the choice. Withdrawing consent stops collection, expires accessible GA cookies, and reloads the page. Consent in another tab and expiry during a long visit are handled too.

There is no pre-consent event replay. Visitors who reject analytics, block scripts, or never load JavaScript do not appear in this collection. GA4 excludes known bots; use Netlify traffic logs to investigate bots, abusive requests, and hosting usage. It is not valid to compare GA4 users directly with CDN requests.

Enhanced measurement is disabled. The integration sends manual page views once per pathname transition. Queries/fragments are stripped. Only `utm_source`, `utm_medium`, and `utm_campaign` identifiers consisting of letters, digits, underscores, and hyphens (up to 80 characters) are admitted for campaign attribution. Use generic campaign codes; never put personal data in campaign names or URLs. External referrers are reduced to their origin, and unknown paths become `/other`.

Optional Google data-sharing, Google Signals and advertising personalization are disabled. Event and user retention is 14 months with reset-on-activity disabled. Standard aggregate reports are not governed by the same event-data retention window.

## Event dictionary

All events include the fixed `event_year` value `2026`. Update that configuration deliberately for a new event edition. No form values, uploaded files, customer IDs, submission IDs, contact addresses, or error messages are sent. Submission reset keys are used only in browser memory for deduplication.

| Event | Meaning | Parameter |
| --- | --- | --- |
| `form_start` | First focus/change in a form during this page session | `form_type` |
| `nomination_complete` | Confirmed successful nomination | `form_type=nomination` |
| `summit_registration_complete` | Confirmed successful summit registration | `form_type=summit` |
| `speaker_application_complete` | Confirmed successful speaker application | `form_type=speaker` |
| `exhibition_enquiry_complete` | Confirmed successful exhibition enquiry | `form_type=exhibition` |
| `newsletter_signup_complete` | Confirmed successful newsletter signup | `form_type=newsletter` |
| `ticket_interest` | Click to the configured Selar ticket path | No purchase/revenue claim |
| `partner_click` | Click to DOTS, Terratreks, or one of the four hotels | `partner` |
| `document_click` | Click to the delegates pack or a brochure PDF | `document` |
| `contact_click` | Email or telephone link click | `contact_method` |
| `helpdesk_visit` | Visit to `/helpdesk` | No chat content collected |

The five event-scoped custom dimensions are Form type (`form_type`), Event year (`event_year`), Travel partner (`partner`), Document (`document`), and Contact method (`contact_method`). Mark the five `_complete` events as key events, counting once per event; clicks remain engagement rather than completed bookings. Event reports and new dimensions may take 24–48 hours to populate. Realtime is the immediate collection check.

## Event planning reports and exports

Use one ongoing property across event years, rather than creating a new property for 2027. Compare equivalent campaign periods, and annotate the analytics launch date: historic traffic cannot be reconstructed.

| Planning question | Report or exploration |
| --- | --- |
| Which campaigns bring engaged visitors and completions? | Reports → Acquisition → Traffic acquisition; Session source/medium or campaign; compare users, engagement and key events |
| Where is the audience and what devices do they use? | Demographic details and Tech details; countries/cities are approximate, not a list of people |
| Which pages support interest? | Pages and screens and Landing page; compare views, engagement and key events |
| Where do potential delegates drop out? | Explore → Funnel exploration; open funnel; step 1 `form_start` and step 2 the corresponding completion event; break down by Form type |
| Which travel partners attract interest? | Events report / free-form exploration filtered to `partner_click`, rows Travel partner, values Event count and Total users |
| Which information is requested? | Events / free-form exploration with Document or Contact method; filter the matching fixed event |

For a monthly export: select the previous calendar month in Lagos time, exclude debug/test traffic where applicable, choose Share/Export → Download file → CSV, and save it in the client's controlled reporting folder. Export the same views immediately after the event and after the final campaign. Record consent limitations alongside every summary. Do not email exports or schedule reports without explicit authorization. For analysis beyond the rolling 14-month detailed window, retain these aggregate exports; there is no paid warehouse integration in this setup.

Interpret ticket clicks and hotel/tour/car clicks as interest only. Confirmed purchases and external bookings require an authorized integration with those providers. Completed forms may outnumber starts if a visitor first interacted before giving consent, or if their form start was in another page session.

## Validation

- `node --test tests/analytics.test.cjs` checks no tag/events before consent, production-host gating, malformed/expired preferences, no replay, duplicate page/submission prevention, parameter redaction, partner classification, and withdrawal.
- Run TypeScript, targeted ESLint, and the production build before publishing.
- On the real domain, inspect consent with a fresh browser state: no Google tag or collect request before acceptance; rejection keeps it off; acceptance sends one page view and the expected consented interactions. Reload and route navigation must not duplicate views. Test-host exclusion is intentional.
- Check Realtime and, when using Tag Assistant's debug session, DebugView. Do not submit actual Jotform entries without authorization; use mocked upstream responses for form success/failure checks.
- Compare traffic, successful forms, referral sources, and partner engagement after sufficient real usage. Consent-based analytics is not a complete visitor census and does not by itself prevent bot traffic or reduce hosting usage.
