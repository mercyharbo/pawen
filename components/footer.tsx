import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { externalLinks } from '@/lib/external-links'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
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

export function Footer() {
  return (
    <footer className='relative isolate overflow-hidden bg-background text-primary'>
      <div className='relative z-10 mx-auto flex w-full max-w-[1905px] flex-col gap-12 px-5 py-14 sm:px-8 lg:px-10 lg:py-20'>
        <div className='flex justify-center text-center'>
          <div className='flex max-w-sm flex-col items-center gap-5'>
            <p className='font-sans text-sm font-normal opacity-90 leading-5'>
              The PAWEN Awards &amp; Summit 2026
            </p>
            <div className='flex flex-col items-center gap-6'>
              <p className='max-w-xs font-sans text-2xl font-medium leading-9'>
                InterContinental Hotel, Lusaka, Zambia.
              </p>
              <Button
                render={<Link href={externalLinks.tickets} />}
                className='min-h-14 rounded-full bg-accent px-10 font-sans text-lg font-medium text-primary-foreground h'
              >
                Get Tickets
              </Button>
            </div>
          </div>
        </div>

        <div className='grid gap-10 border-y border-border py-10 lg:grid-cols-[1.1fr_1fr_1fr_0.7fr] lg:gap-14'>
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
                className='size-16 rounded-full bg-primary text-2xl text-primary-foreground hover:bg-accent'
                aria-label='Newsletter signup is coming soon'
              >
                <ArrowUpRight className='size-8' aria-hidden='true' />
              </Button>
            </div>
          </section>

          <nav className='flex flex-col gap-4' aria-labelledby='footer-sitemap'>
            <p
              id='footer-sitemap'
              className='text-sm font-normal uppercase opacity-90 leading-5'
            >
              Sitemap
            </p>
            <div className='flex flex-col gap-0'>
              {sitemapLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className='w-fit py-1 text-2xl font-medium leading-10 transition-colors duration-300 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'
                >
                  {item.label}
                </Link>
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
                <Link
                  key={item.label}
                  href={item.href}
                  className='w-fit py-1 text-2xl font-medium leading-10 transition-colors duration-300 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <address
            className='flex flex-col gap-4 not-italic'
            aria-labelledby='footer-contact'
          >
            <p
              id='footer-contact'
              className='text-sm opacity-90 uppercase font-normal leading-5'
            >
              Contact
            </p>
            <div className='flex flex-col gap-4'>
              {contactLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className='w-fit text-sm font-medium leading-5 transition-colors duration-300 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </address>
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
              <Link
                key={item.label}
                href={item.href}
                className='border-b border-primary pb-1 transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className='flex flex-wrap items-center gap-1 text-sm font-normal'>
            <span>&copy; 2026 The PAWEN Award. Created by</span>
            <Link href='#' className=''>
              Favour Princewill
            </Link>
          </div>
        </div>
      </div>

      <div className='pointer-events-none relative z-0 px-5 pb-8 sm:px-8 lg:px-10'>
        <Image
          src='/footer-logo.png'
          alt=''
          width={1902}
          height={326}
          className='h-auto w-full'
          aria-hidden='true'
        />
      </div>
    </footer>
  )
}
