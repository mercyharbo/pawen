import Image from "next/image";
import Link from "next/link";
import { externalLinks } from "@/lib/external-links";
import { HeaderNavLinks } from "@/components/header-nav-links";
import { MobileNavMenu } from "@/components/mobile-nav-menu";
import type { ReactNode } from "react";

const navItems = [
  { label: "PAWEN Hall", href: "/" },
  { label: "Nominations", href: externalLinks.nominations },
  { label: "SUMMIT", href: "/summit" },
  { label: "Exhibition", href: "/exhibition" },
  { label: "Award GALA", href: "/gala" },
] as const;

function HeaderMotionLink({
  children,
  className = "",
  href,
}: {
  children: ReactNode;
  className?: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className={`group/header-link relative inline-flex overflow-hidden pb-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${className}`}
    >
      <span className="transition-transform duration-500 ease-out group-hover/header-link:-translate-y-0.5 group-focus-visible/header-link:-translate-y-0.5">
        {children}
      </span>
      <span
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover/header-link:scale-x-100 group-focus-visible/header-link:scale-x-100"
        aria-hidden="true"
      />
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background text-foreground">
      <div className="border-b border-border bg-card font-brand text-sm">
        <div className="mx-auto flex min-h-12 w-full max-w-[1905px] items-center justify-center px-5 sm:px-8 lg:px-10">
          <div className="grid w-full grid-cols-1 items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
            <div className="hidden md:block" />
            <div className="flex flex-wrap items-center justify-center gap-3 text-center font-bold">
              <span>Winners announced!</span>
              <HeaderMotionLink
                href="#award-categories"
                className="text-muted-foreground"
              >
                Dive In
              </HeaderMotionLink>
            </div>
            {/* <HeaderMotionLink
              href={externalLinks.nominations}
              className="hidden justify-self-end text-muted-foreground md:inline-flex"
            >
              Login or Register
            </HeaderMotionLink> */}
          </div>
        </div>
      </div>

      <div className="border-b border-border bg-background/96 backdrop-blur-md">
        <div className="mx-auto flex min-h-[4.875rem] w-full max-w-[1905px] items-center justify-between gap-6 px-5 py-3 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="group flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            aria-label="PAWEN home"
          >
            <Image
              src="/Group.svg"
              alt=""
              width={92}
              height={55}
              className="h-14 w-auto"
              aria-hidden="true"
              priority
            />
          </Link>

          <nav
            className="hidden items-center gap-6 font-brand text-sm font-bold text-foreground lg:flex xl:gap-8"
            aria-label="Primary navigation"
          >
            <HeaderNavLinks navItems={navItems} />
          </nav>

          <MobileNavMenu navItems={navItems} />
        </div>
      </div>
    </header>
  );
}
