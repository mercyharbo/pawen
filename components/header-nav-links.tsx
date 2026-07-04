'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type HeaderNavItem = {
  label: string
  href: string
}

type HeaderNavLinksProps = {
  navItems: readonly HeaderNavItem[]
}

function isActiveRoute(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/'
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

export function HeaderNavLinks({ navItems }: HeaderNavLinksProps) {
  const pathname = usePathname()

  return (
    <>
      {navItems.map((item) => {
        const isActive = isActiveRoute(pathname, item.href)

        return (
          <Link
            key={item.label}
            href={item.href}
            className='group/header-link relative inline-flex overflow-hidden pb-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'
            aria-current={isActive ? 'page' : undefined}
          >
            <span className='transition-transform capitalize duration-500 ease-out group-hover/header-link:-translate-y-0.5 group-focus-visible/header-link:-translate-y-0.5'>
              {item.label}
            </span>
            <span
              className={`absolute inset-x-0 bottom-0 h-px origin-left bg-accent transition-transform duration-500 ease-out group-hover/header-link:scale-x-100 group-focus-visible/header-link:scale-x-100 ${
                isActive ? 'scale-x-100' : 'scale-x-0'
              }`}
              aria-hidden='true'
            />
          </Link>
        )
      })}
    </>
  )
}
