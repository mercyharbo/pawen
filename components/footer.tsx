import { externalLinks } from '@/lib/external-links'
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
  { label: '+2348032006717', href: 'tel:+2348032006717' },
  { label: '+234 809 906 0001', href: 'tel:+2348099060001' },
  { label: 'awards@pawen.org', href: 'mailto:awards@pawen.org' },
  { label: "FAQ's", href: '/gala#faq' },
] as const

const policyLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
] as const

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/pawencommunity',
    icon: LinkedInIcon,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/pawencommunity',
    icon: InstagramIcon,
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@pawencommunity1',
    icon: YouTubeIcon,
  },
] as const

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      aria-hidden='true'
    >
      <path
        d='M6.9 10.1v8.4M6.9 7.2v.1M11 18.5v-8.4M11 13.8c0-2.1 1.2-3.7 3.5-3.7 2.2 0 3.3 1.5 3.3 4v4.4'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
      <rect
        x='3.5'
        y='3.5'
        width='17'
        height='17'
        rx='3'
        stroke='currentColor'
        strokeWidth='2'
      />
    </svg>
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

function FooterSocialLinks() {
  return (
    <nav
      className='flex flex-wrap items-center gap-3'
      aria-label='Social media links'
    >
      {socialLinks.map((item) => {
        const Icon = item.icon

        return (
          <Link
            key={item.label}
            href={item.href}
            aria-label={item.label}
            target='_blank'
            rel='noreferrer'
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
  )
}

export function Footer() {
  return (
    <footer className='relative isolate overflow-hidden bg-background text-primary [--color-background:#050505]'>
      <div className='relative z-10 mx-auto flex w-full max-w-[1905px] flex-col gap-12 px-5 py-14 sm:px-8 lg:px-10 lg:py-20'>
        <div className='grid gap-10 py-10 lg:grid-cols-4 lg:gap-10 xl:gap-14'>
          <nav className='flex flex-col gap-4' aria-labelledby='footer-sitemap'>
            <p
              id='footer-sitemap'
              className='text-sm font-normal opacity-90 leading-5'
            >
              Sitemap
            </p>
            <div className='flex flex-col gap-4'>
              {sitemapLinks.map((item) => (
                <FooterTextLink
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  className='text-sm font-medium leading-5 2xl:text-base 2xl:leading-6'
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
            <div className='flex flex-col gap-4'>
              {galleryLinks.map((item) => (
                <FooterTextLink
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  className='text-sm font-medium leading-5 2xl:text-base 2xl:leading-6'
                />
              ))}
            </div>
          </nav>

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
        </div>
        <hr className='text-muted-foreground bg-muted-foreground' />
        <div className='flex flex-col justify-between gap-5 text-sm font-medium leading-5 md:flex-row md:items-center'>
          <FooterSocialLinks />
          <div className='flex flex-wrap items-center gap-1 text-sm font-normal'>
            <span>&copy; 2026 The PAWEN Award. Created by</span>
            <FooterTextLink href='#' label='Favour Princewill' />
          </div>
        </div>
      </div>
    </footer>
  )
}
