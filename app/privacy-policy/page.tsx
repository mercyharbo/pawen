import type { Metadata } from 'next'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  path: '/privacy-policy',
  title: 'Privacy Policy',
  description:
    'Learn how The PAWEN Awards collects, uses, stores, discloses, and protects personal information.',
})

const policySections = [
  {
    title: '1. Information We Collect',
    body: 'We may collect the following information:',
    items: [
      'Personal information such as your name, email address, telephone number, organization, job title, and country.',
      'Information submitted as part of award nominations.',
      'Registration details for award events and related activities.',
      'Ticket purchase information, including billing details. Payment information is processed securely by our payment service providers and is not stored by PAWEN.',
      'Technical information such as IP address, browser type, device information, and website usage through cookies and analytics tools.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    body: 'We use your information to:',
    items: [
      'Process award nominations.',
      'Manage event registrations and ticket purchases.',
      'Communicate important updates regarding the awards and related events.',
      'Respond to enquiries and provide customer support.',
      'Improve our website, services, and user experience.',
      'Comply with legal and regulatory obligations.',
      'Send newsletters and promotional communications where you have consented or where permitted by law.',
    ],
  },
  {
    title: '3. Legal Basis for Processing',
    body: 'We process personal information where necessary to:',
    items: [
      'Perform our contractual obligations.',
      'Comply with legal obligations.',
      'Pursue our legitimate interests in administering the PAWEN Awards.',
      'Obtain your consent where required.',
    ],
  },
  {
    title: '4. Sharing Your Information',
    body: 'We may share your information with:',
    items: [
      'Event partners and service providers assisting with website hosting, payment processing, communications, and event management.',
      'Award judges solely for the purpose of evaluating nominations.',
      'Regulatory authorities where disclosure is required by law.',
      'We do not sell or rent your personal information to third parties.',
    ],
  },
  {
    title: '5. Data Security',
    body: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, loss, misuse, alteration, or disclosure.',
  },
  {
    title: '6. Data Retention',
    body: 'We retain personal information only for as long as necessary to fulfil the purposes outlined in this Policy, comply with legal obligations, resolve disputes, and enforce our agreements.',
  },
  {
    title: '7. Cookies',
    body: 'Our website uses cookies and similar technologies to improve website functionality, analyze traffic, and enhance user experience. You may adjust your browser settings to refuse cookies, although some features of the website may not function properly.',
  },
  {
    title: '8. Your Rights',
    body: 'Subject to applicable law, you may have the right to:',
    items: [
      'Access your personal information.',
      'Request correction of inaccurate information.',
      'Request deletion of your personal information.',
      'Restrict or object to certain processing.',
      'Withdraw consent where processing is based on consent.',
      'Request a copy of your personal data in a portable format.',
      'Requests may be submitted using the contact details below.',
    ],
  },
  {
    title: '9. Third-Party Links',
    body: 'Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those external websites.',
  },
  {
    title: "10. Children's Privacy",
    body: 'The PAWEN Awards website is not intended for individuals under the age of 18, and we do not knowingly collect personal information from children.',
  },
  {
    title: '11. Changes to this Privacy Policy',
    body: 'We may update this Privacy Policy from time to time. Any changes will be posted on this page with the revised effective date.',
  },
]

const contactDetails = [
  { label: 'PAWEN Awards' },
  {
    label: 'Email: awards@pawen.org',
    href: 'mailto:awards@pawen.org',
  },
  {
    label: 'Telephone: +2348032006717',
    href: 'tel:+2348032006717',
  },
  { label: 'Address: Lagos, Nigeria' },
]

export default function PrivacyPolicyPage() {
  return (
    <section className='bg-pawen-brand-color text-primary'>
      <article className='mx-auto flex w-full max-w-5xl flex-col gap-10 px-5 py-10 sm:px-8 lg:px-10 lg:py-16'>
        <header className='flex flex-col gap-4'>
          <p className='text-sm font-medium text-muted-foreground'>
            Effective Date: 20th October 2025
          </p>
          <h1 className='text-4xl font-bold leading-tight sm:text-5xl'>
            PAWEN Awards Privacy Policy
          </h1>
          <p className='max-w-4xl text-base leading-8 text-muted-foreground'>
            The PAWEN Awards (&quot;PAWEN&quot;, &quot;we&quot;,
            &quot;our&quot;, or &quot;us&quot;) is committed to protecting your
            privacy and safeguarding your personal information. This Privacy
            Policy explains how we collect, use, store, disclose, and protect
            your information when you visit our website, submit nominations,
            register for events, purchase tickets, or otherwise interact with
            us.
          </p>
        </header>

        <div className='flex flex-col gap-8'>
          {policySections.map((section) => (
            <section className='flex flex-col gap-3' key={section.title}>
              <h2 className='text-xl font-semibold leading-8'>
                {section.title}
              </h2>
              <p className='text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8'>
                {section.body}
              </p>
              {section.items ? (
                <ul className='flex list-disc flex-col gap-2 pl-5 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8'>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <section className='flex flex-col gap-3'>
            <h2 className='text-xl font-semibold leading-8'>12. Contact Us</h2>
            <p className='text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8'>
              If you have any questions regarding this Privacy Policy or the
              handling of your personal information, please contact:
            </p>
            <address className='flex flex-col gap-2 text-sm leading-7 text-muted-foreground not-italic sm:text-base sm:leading-8'>
              {contactDetails.map((detail) => (
                <span key={detail.label}>
                  {detail.href ? (
                    <a
                      className='w-fit underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'
                      href={detail.href}
                    >
                      {detail.label}
                    </a>
                  ) : (
                    detail.label
                  )}
                </span>
              ))}
            </address>
          </section>
        </div>
      </article>
    </section>
  )
}
