import { HeaderNavLinks, type HeaderNavItem } from '@/components/header-nav-links'
import { MobileNavMenu } from '@/components/mobile-nav-menu'
import { hasVisibleSpeakers } from '@/lib/contentful'
import { externalLinks } from '@/lib/external-links'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

const baseNavItems: readonly HeaderNavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Nominations', href: externalLinks.nominations },
  {
    label: 'Book Hotel',
    items: [
      {
        label: 'Grandpalace Hotel',
        href: externalLinks.hotelBooking,
        isExternal: true,
      },
      {
        label: 'Holiday Inn',
      },
    ],
  },
  { label: 'Summit', href: '/summit' },
  { label: 'Exhibition', href: '/exhibition' },
  { label: 'Award Gala', href: '/gala' },
]

const speakersNavItem: HeaderNavItem = { label: 'Speakers', href: '/speakers' }

function HeaderMotionLink({
  children,
  className = '',
  href,
}: {
  children: ReactNode
  className?: string
  href: string
}) {
  return (
    <Link
      href={href}
      className={`group/header-link relative inline-flex items-center overflow-hidden leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${className}`}
    >
      <span className='transition-transform duration-500 ease-out group-hover/header-link:-translate-y-0.5 group-focus-visible/header-link:-translate-y-0.5'>
        {children}
      </span>
      <span
        className='absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover/header-link:scale-x-100 group-focus-visible/header-link:scale-x-100'
        aria-hidden='true'
      />
    </Link>
  )
}

export async function Header() {
  let showSpeakers = false
  try {
    showSpeakers = await hasVisibleSpeakers()
  } catch (error: unknown) {
    if (
      error &&
      typeof error === 'object' &&
      (('digest' in error && error.digest === 'DYNAMIC_SERVER_USAGE') ||
        ('message' in error &&
          typeof error.message === 'string' &&
          error.message.includes('Dynamic server usage')))
    ) {
      throw error
    }
    console.error('Failed to check visible speakers:', error)
  }

  const navItems = showSpeakers
    ? [
        ...baseNavItems.slice(0, 4),
        speakersNavItem,
        ...baseNavItems.slice(4),
      ]
    : baseNavItems

  return (
    <header className='sticky top-0 z-50 bg-pawen-brand-color text-foreground'>
      <div className='border-b border-border bg-pawen-brand-color h-10 flex justify-center items-center font-brand text-sm'>
        <div className='flex flex-wrap items-center justify-center gap-3 text-center font-medium'>
          <span>Nominations Open!</span>
          <HeaderMotionLink
            href='/nominations#award-categories'
            className='text-muted-foreground'
          >
            Dive In
          </HeaderMotionLink>
        </div>
      </div>

      <div className='border-b border-border bg-pawen-brand-color'>
        <div className='mx-auto flex min-h-[4.875rem] w-full max-w-[1905px] items-center justify-between gap-6 px-5 py-3 sm:px-8 lg:px-10'>
          <Link
            href='/'
            className='group flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'
            aria-label='PAWEN home'
          >
            <Image
              src='/Group.svg'
              alt=''
              width={92}
              height={55}
              className='h-14 w-auto'
              aria-hidden='true'
              priority
            />
          </Link>

          <nav
            className='hidden items-center gap-6 font-brand text-sm font-bold text-foreground lg:flex xl:gap-8'
            aria-label='Primary navigation'
          >
            <HeaderNavLinks navItems={navItems} />
          </nav>

          <MobileNavMenu navItems={navItems} />
        </div>
      </div>
    </header>
  )
}
