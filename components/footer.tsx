import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { externalLinks } from '@/lib/external-links'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const sitemapLinks = [
  { label: 'Home', href: '/' },
  { label: 'Nomination', href: externalLinks.nominations },
  { label: 'Hall of Fame', href: '#award-categories' },
] as const

const galleryLinks = [
  { label: 'Summit', href: '#summit' },
  { label: 'Exhibition', href: '#exhibition' },
  { label: 'Award Gala', href: '#awards-gala' },
] as const

const contactLinks = [
  { label: '+00 1234567890', href: 'tel:+001234567890' },
  { label: 'hello@thepawenaward.com', href: 'mailto:hello@thepawenaward.com' },
  { label: 'Contact us', href: 'mailto:hello@thepawenaward.com' },
  { label: "FAQ's", href: '#faq' },
] as const

const policyLinks = [
  {
    label: 'Eligibility and integrity',
    href: '/policies/eligibility-and-integrity',
  },
  {
    label: 'Data privacy and safety',
    href: '/policies/data-privacy-and-safety',
  },
  { label: 'Anti-harassment', href: '/policies/anti-harassment' },
  {
    label: 'Judging process and conflict of interest',
    href: '/policies/judging-process-and-conflict-of-interest',
  },
  {
    label: 'Nomination transparency and appeals',
    href: '/policies/nomination-transparency-and-appeals',
  },
  {
    label: 'Intellectual property and publicity rights',
    href: '/policies/intellectual-property-and-publicity-rights',
  },
  {
    label: 'Gender and inclusion',
    href: '/policies/gender-and-inclusion',
  },
] as const

const socialLinks = [
  { label: 'Instagram', href: '#', icon: InstagramIcon },
  { label: 'X', href: '#', icon: XIcon },
  { label: 'TikTok', href: '#', icon: TikTokIcon },
  { label: 'YouTube', href: '#', icon: YouTubeIcon },
] as const

function FooterLargeLink({
  href,
  label,
}: {
  href: string
  label: string
}) {
  return (
    <Link
      href={href}
      className='group/footer-large relative flex w-fit items-center gap-3 py-1 text-xl font-medium leading-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:text-lg lg:leading-7 xl:text-xl xl:leading-8 2xl:text-2xl 2xl:leading-10 3xl:text-2xl 3xl:leading-10'
    >
      <span
        className='size-2.5 origin-center rounded-full bg-accent opacity-0 transition-all duration-500 ease-out group-hover/footer-large:opacity-100 group-focus-visible/footer-large:opacity-100'
        aria-hidden='true'
      />
      <span className='-translate-x-5 transition-transform duration-500 ease-out group-hover/footer-large:translate-x-0 group-focus-visible/footer-large:translate-x-0'>
        {label}
      </span>
    </Link>
  )
}

function FooterTextLink({
  href,
  label,
  className = '',
}: {
  href: string
  label: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={`group/footer-text relative w-fit overflow-hidden pb-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${className}`}
    >
      <span>{label}</span>
      <span
        className='absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover/footer-text:scale-x-100 group-focus-visible/footer-text:scale-x-100'
        aria-hidden='true'
      />
    </Link>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      aria-hidden='true'
    >
      <rect
        x='4'
        y='4'
        width='16'
        height='16'
        rx='5'
        stroke='currentColor'
        strokeWidth='2'
      />
      <circle cx='12' cy='12' r='3.4' stroke='currentColor' strokeWidth='2' />
      <circle cx='16.8' cy='7.2' r='1' fill='currentColor' />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      aria-hidden='true'
    >
      <path
        d='M4 4L20 20M20 4L4 20'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2.2'
      />
    </svg>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      aria-hidden='true'
    >
      <path
        d='M14.5 4v10.1a4.1 4.1 0 1 1-3.6-4.07'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
      <path
        d='M14.5 4c.7 2.9 2.5 4.6 5.1 5'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </svg>
  )
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      aria-hidden='true'
    >
      <rect
        x='3'
        y='6.5'
        width='18'
        height='11'
        rx='3'
        stroke='currentColor'
        strokeWidth='2'
      />
      <path d='M10.5 9.5L15 12l-4.5 2.5z' fill='currentColor' />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className='relative isolate overflow-hidden bg-background text-primary'>
      <div className='relative z-10 mx-auto flex w-full max-w-[1905px] flex-col gap-12 px-5 py-14 sm:px-8 lg:px-10 lg:py-20'>
        <div className='grid gap-10 border-y border-border py-10 lg:grid-cols-[1.1fr_0.8fr_0.8fr_1fr_1.2fr] lg:gap-10 xl:gap-14'>
          <section
            className='flex flex-col gap-5'
            aria-labelledby='footer-newsletter'
          >
            {/* <Link
              href='/'
              className='group flex w-fit items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'
              aria-label='PAWEN home'
            >
              <Image
                src='/logo.png'
                alt=''
                width={92}
                height={55}
                className='h-14 w-auto'
                aria-hidden='true'
              />
            </Link> */}

            <p id='footer-newsletter' className='max-w-xs text-sm leading-7'>
              Subscribe to our newsletter and bring get updated with The PAWEN
              Award
            </p>

            <div
              className='flex max-w-sm items-center gap-3'
              role='group'
              aria-label='Newsletter signup preview'
            >
              <label className='sr-only' htmlFor='footer-email'>
                Email address
              </label>
              <Input
                id='footer-email'
                type='email'
                placeholder='your@email.com'
                className='min-h-14 min-w-0 flex-1 rounded-full border-input bg-primary/15 px-7 text-sm text-primary placeholder:text-muted-foreground focus-visible:border-accent focus-visible:ring-accent/30'
              />
              <Button
                type='button'
                size='icon-lg'
                className='group/newsletter relative size-16 overflow-hidden rounded-full bg-primary text-2xl text-primary-foreground hover:bg-primary'
                aria-label='Newsletter signup is coming soon'
              >
                <span
                  className='absolute inset-0 origin-bottom-left scale-0 rounded-full bg-accent transition-transform duration-500 ease-out group-hover/newsletter:scale-100 group-focus-visible/newsletter:scale-100'
                  aria-hidden='true'
                />
                <ArrowUpRight
                  className='relative z-10 size-8 transition-transform duration-500 ease-out group-hover/newsletter:-translate-y-0.5 group-hover/newsletter:translate-x-0.5 group-focus-visible/newsletter:-translate-y-0.5 group-focus-visible/newsletter:translate-x-0.5'
                  aria-hidden='true'
                />
              </Button>
            </div>
          </section>

          <nav className='flex flex-col gap-4' aria-labelledby='footer-sitemap'>
            <p
              id='footer-sitemap'
              className='text-sm font-normal opacity-90 leading-5'
            >
              Sitemap
            </p>
            <div className='flex flex-col gap-0'>
              {sitemapLinks.map((item) => (
                <FooterLargeLink
                  key={item.label}
                  href={item.href}
                  label={item.label}
                />
              ))}
            </div>
          </nav>

          <nav className='flex flex-col gap-4' aria-labelledby='footer-gallery'>
            <p
              id='footer-gallery'
              className='text-sm font-normal opacity-90 leading-5'
            >
              Gallery
            </p>
            <div className='flex flex-col gap-0'>
              {galleryLinks.map((item) => (
                <FooterLargeLink
                  key={item.label}
                  href={item.href}
                  label={item.label}
                />
              ))}
            </div>
          </nav>

          <address
            className='flex flex-col gap-4 not-italic'
            aria-labelledby='footer-contact'
          >
            <p
              id='footer-contact'
              className='text-sm opacity-90 font-normal leading-5'
            >
              Contact
            </p>
            <div className='flex flex-col gap-4'>
              {contactLinks.map((item) => (
                <FooterTextLink
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  className='text-sm font-medium leading-5 2xl:text-base 2xl:leading-6'
                />
              ))}
            </div>
          </address>

          <nav
            className='flex flex-col gap-4'
            aria-labelledby='footer-policies'
          >
            <p
              id='footer-policies'
              className='text-sm font-normal opacity-90 leading-5'
            >
              Policies
            </p>
            <div className='flex flex-col gap-4'>
              {policyLinks.map((item) => (
                <FooterTextLink
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  className='text-sm font-medium leading-5 2xl:text-base 2xl:leading-6'
                />
              ))}
            </div>
          </nav>
        </div>

        <div className='flex flex-col justify-between gap-5 text-sm font-medium leading-5 md:flex-row md:items-center'>
          <nav
            className='flex flex-wrap gap-8 text-sm'
            aria-label='Legal navigation'
          >
            {[
              { label: 'Privacy Policy', href: '#privacy' },
              { label: 'Terms & Conditions', href: '#terms' },
            ].map((item) => (
              <FooterTextLink
                key={item.label}
                href={item.href}
                label={item.label}
                className='text-sm font-medium leading-5'
              />
            ))}
          </nav>
          <div className='flex flex-wrap items-center gap-1 text-sm font-normal'>
            <span>&copy; 2026 The PAWEN Award. Created by</span>
            <FooterTextLink href='#' label='Favour Princewill' />
          </div>
        </div>
      </div>

      <div className='relative z-0 px-5 pb-8 sm:px-8 lg:px-10'>
        <nav
          className='mx-auto flex w-full max-w-[1905px] flex-wrap items-center justify-center gap-3'
          aria-label='Social media links'
        >
          {socialLinks.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className='group/social relative flex size-12 items-center justify-center overflow-hidden rounded-full border border-border bg-primary/8 text-primary transition-transform duration-500 ease-out hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'
              >
                <span
                  className='absolute inset-0 origin-bottom-left scale-0 rounded-full bg-accent transition-transform duration-500 ease-out group-hover/social:scale-100 group-focus-visible/social:scale-100'
                  aria-hidden='true'
                />
                <Icon className='relative z-10 size-5 transition-colors duration-500 group-hover/social:text-accent-foreground group-focus-visible/social:text-accent-foreground' />
              </Link>
            )
          })}
        </nav>
      </div>
    </footer>
  )
}
