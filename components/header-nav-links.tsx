'use client'

import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export type NavSubItem = {
  label: string
  href?: string
  isExternal?: boolean
}

export type HeaderNavItem = {
  label: string
  href?: string
  items?: readonly NavSubItem[]
}

type HeaderNavLinksProps = {
  navItems: readonly HeaderNavItem[]
}

function isActiveRoute(pathname: string, href?: string) {
  if (!href) return false
  if (href === '/') {
    return pathname === '/'
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

function NavDropdown({ item }: { item: HeaderNavItem }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  function handleMouseEnter() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsOpen(true)
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 150)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div
      ref={dropdownRef}
      className='relative'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type='button'
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup='true'
        className='group/header-link relative inline-flex items-center gap-1.5 overflow-hidden pb-1 font-brand text-sm font-bold text-foreground cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'
      >
        <span className='transition-transform capitalize duration-500 ease-out group-hover/header-link:-translate-y-0.5 group-focus-visible/header-link:-translate-y-0.5'>
          {item.label}
        </span>
        <ChevronDown
          className={`size-3.5 transition-transform duration-300 ease-out ${
            isOpen ? 'rotate-180 text-accent' : 'text-foreground/70'
          }`}
          aria-hidden='true'
        />
        <span
          className={`absolute inset-x-0 bottom-0 h-px origin-left bg-accent transition-transform duration-500 ease-out ${
            isOpen ? 'scale-x-100' : 'scale-x-0'
          } group-hover/header-link:scale-x-100 group-focus-visible/header-link:scale-x-100`}
          aria-hidden='true'
        />
      </button>

      {isOpen && item.items && (
        <div className='absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50 animate-in fade-in zoom-in-95 duration-200'>
          <div
            className='min-w-48 overflow-hidden rounded-xl border border-border bg-popover p-1.5 font-brand text-sm shadow-2xl shadow-background/80 backdrop-blur-md'
            role='menu'
            aria-orientation='vertical'
          >
            {item.items.map((subItem) =>
              subItem.href ? (
                <a
                  key={subItem.label}
                  href={subItem.href}
                  target='_blank'
                  rel='noreferrer'
                  role='menuitem'
                  onClick={() => setIsOpen(false)}
                  className='flex items-center justify-between rounded-md px-3.5 py-2.5 text-sm font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-none'
                >
                  <span>{subItem.label}</span>
                </a>
              ) : (
                <span
                  key={subItem.label}
                  role='menuitem'
                  className='flex items-center justify-between rounded-md px-3.5 py-2.5 text-sm font-medium text-popover-foreground/60 transition-colors hover:bg-white/5 cursor-default'
                >
                  <span>{subItem.label}</span>
                </span>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export function HeaderNavLinks({ navItems }: HeaderNavLinksProps) {
  const pathname = usePathname()

  return (
    <>
      {navItems.map((item) => {
        if (item.items && item.items.length > 0) {
          return <NavDropdown key={item.label} item={item} />
        }

        const isActive = isActiveRoute(pathname, item.href)

        return (
          <Link
            key={item.label}
            href={item.href ?? '/'}
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
