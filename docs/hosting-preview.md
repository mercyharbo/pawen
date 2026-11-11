# PAWEN hosting preview and usage verification

Prepared November 5, 2026. No hosting transfer, domain change, or preview deployment has been performed by this change.

## Netlify preview setup

1. Import this repository into a separate site on a Netlify Free account. Use the repository root, the committed `netlify.toml`, and Netlify's automatic Next.js adapter. Do not use static export: server actions and route handlers require the adapter. Keep Vercel and all production DNS records in place.
2. Copy the following environment values from the existing authorized environment through Netlify's environment-variable UI. Do not put secret values in Git, build commands, logs, or this document. Enable Build and Functions scopes for server values when available on the account; apply them only to trusted deployment contexts. Do not expose production credentials to untrusted pull requests.

   | Variable | Purpose |
   | --- | --- |
   | `CONTENTFUL_SPACE_ID` | Existing CMS space |
   | `CONTENTFUL_ACCESS_TOKEN` | Server-side CMS delivery access |
   | `CONTENTFUL_ENVIRONMENT` | Existing CMS environment; defaults to `master` |
   | `JOTFORM_API_KEY` | Server-side nomination and event submissions |
   | `JOTFORM_FORM_ID` | Preserve existing nomination form ID if overridden |
   | `JOTFORM_NOMINATIONS_URL` | Preserve existing external nomination link if overridden |
   | `SELAR_TICKETS_URL` | Preserve existing ticket link if overridden |
   | `NEXT_PUBLIC_SITE_URL` | Set to this separate site's HTTPS `.netlify.app` URL for its production context |

3. Deploy from the trusted change branch. Deploy-preview and branch-deploy commands override `NEXT_PUBLIC_SITE_URL` with `DEPLOY_PRIME_URL` so canonical/social metadata points to the actual preview hostname. Rebuild after environment changes. A separate site's initial production deployment can consume deployment credits even though it is only a preview for this migration.
4. Verify the deployed adapter supports the installed Next.js 16.2.9 build, rather than assuming a successful local Next.js build proves adapter compatibility. Do not manually add an old runtime plugin.
5. Check Nviti on `/helpdesk`. The widget ID remains unchanged; the widget owner may need to allow the preview hostname. This cannot be confirmed from this repository. Use available preview protection and verify indexing restrictions before sharing the preview publicly.
6. Stop at a working preview and measured cost estimate. Production cutover is a separate decision. Netlify access is required to provision the site and transfer environment variables; none was available during preparation.

## Browser acceptance checks

Local verification completed during implementation: TypeScript, changed-file ESLint, a production build with public routes prerendered at 15-minute revalidation, and mocked nomination/newsletter/country-lookup checks. All 29 Next.js Link instances were checked for disabled prefetching. Browser/device checks, Netlify adapter execution, real submissions, and post-deployment usage measurements remain pending.

Use a production build, not the development server. Keep the browser cache enabled when checking normal repeat visits, and use a fresh tab/session for the first-load comparison.

- Before opening the nomination form, confirm there is no `/api/countries` request. Opening it should fetch once; closing/reopening, changing pages through client navigation, and switching tabs should reuse the cached result. A full reload may fetch again when the form opens. Offline or failed lookup must still show fallback countries, without an automatic retry loop.
- On fresh mobile and desktop loads, inspect the home hero requests. Mobile selects `IMG-6.png`; desktop selects `hero-bg.jpg` and `hero-overlay.png`. Mobile must not fetch the desktop images. Resizing across 768px may legitimately fetch the newly selected assets. Confirm image positioning, animations, and decorative alt text remain correct.
- Scrolling and hovering internal links must not initiate speculative page requests. Clicking them must still navigate correctly, including mobile menus, footer links, and page calls to action.
- Verify `/`, `/summit`, `/nominations`, `/speakers`, `/winners`, `/sponsors`, `/gala`, `/exhibition`, and `/helpdesk`. Confirm Contentful speakers/winners and fallback states render correctly.
- Publish a controlled CMS change only when authorized. After the 900-second interval, subsequent traffic triggers background regeneration; verify the refreshed content after regeneration completes. This is not an exact 15-minute publishing guarantee.
- Check `/delegates` serves the current PDF with HTTP 200 and `Content-Type: application/pdf`, keeping `/delegates` in the address bar. The exact Netlify rewrite serves `/delegates-information-pack.pdf` directly from the CDN; the Next.js rewrite supports local and other hosting environments. Confirm volunteer/male-allies aliases retain their Google Forms redirects. Keep this Netlify override limited to `/delegates` so other routes continue through the Next.js adapter.
- Verify nomination, newsletter, speaker, exhibition, and summit form validation. Test submission success/failure with mocked upstream responses locally. Do not send real Jotform entries without authorization. On Netlify, separately check multipart upload transport against the existing 4.5 MB validation limit before considering a production move.

## Usage and cost comparison

Record deployment time and compare equivalent pre/post windows (same duration and similar visitor volume): team and PAWEN CDN requests, `/api/countries` requests, CPU time, and cache behavior for Contentful-backed pages. Initial deploy/cache warm-up can temporarily change usage. Server-side caching reduces rendering and CMS calls; cached CDN requests still consume the CDN request allowance. No percentage saving is guaranteed.

Current Netlify credit pricing checked November 5, 2026:

- Free: 300 credits per month with a hard limit.
- Web requests: 2 credits per 10,000 requests.
- Bandwidth: 20 credits per GB.
- Functions compute: 10 credits per GB-hour.
- Production deployments: 15 credits each. Branch/deploy-preview publication has no deployment credit charge; its served traffic and compute still need budgeting.

For these metered resources, estimate monthly credits as `requests / 10000 * 2 + bandwidthGB * 20 + functionGBHours * 10 + productionDeploys * 15`. Include other team usage and any other metered features shown in the dashboard.

At 26,000 requests per 12 hours, a sustained 30-day projection is 1,560,000 requests, or **312 credits for requests alone**. Even a 50% request reduction leaves 156 credits before bandwidth, compute, and deployments. The screenshot is a short observation window, not a reliable monthly forecast; use actual preview measurements before deciding whether Free is sustainable.

## Immediate Vercel limit

These changes do not erase recorded usage or automatically cancel a scheduled pause. Request Vercel's one-time Hobby usage boost through its support agent. Do not assume another Hobby team is an approved way to reset the allowance; confirm any proposed ownership transfer with support.

## Sources

- [Netlify Next.js support](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/)
- [Netlify credit rates and allowance](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/)
- [Vercel one-time Hobby boost](https://community.vercel.com/t/what-to-do-when-your-team-is-paused-or-blocked/45069)
- [Vercel acceptable use policy](https://vercel.com/legal/acceptable-use-policy)
