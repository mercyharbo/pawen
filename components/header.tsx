import { HeaderNavLinks, type HeaderNavItem } from '@/components/header-nav-links'
import { MobileNavMenu } from '@/components/mobile-nav-menu'
import { hasVisibleSpeakers } from '@/lib/contentful'
import Image from 'next/image'
import Link from 'next/link'

const baseNavItems: readonly HeaderNavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Summit', href: '/summit' },
  { label: 'Exhibition', href: '/exhibition' },
  { label: 'Awards Gala', href: '/gala' },
  { label: 'Plan your Trip', href: '/plan-your-trip' },
]

const speakersNavItem: HeaderNavItem = { label: 'Speakers', href: '/speakers' }

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
    <header
      data-site-chrome
      className='sticky top-0 z-50 bg-pawen-brand-color text-foreground'
    >
      <div className='border-b border-border bg-pawen-brand-color'>
        <div className='mx-auto flex min-h-[4.875rem] w-full max-w-[1905px] items-center justify-between gap-6 px-5 py-3 sm:px-8 lg:px-10'>
          <Link prefetch={false}
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
