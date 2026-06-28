import Image from "next/image";
import Link from "next/link";
import { externalLinks } from "@/lib/external-links";

const navItems = [
  { label: "PAWEN Hall", href: "/" },
  { label: "Nominations", href: externalLinks.nominations },
  { label: "SUMMIT", href: "/summit" },
  { label: "Exhibition", href: "#exhibition" },
  { label: "Award GALA", href: "#awards-gala" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background text-foreground">
      <div className="border-b border-border bg-card font-brand text-sm">
        <div className="mx-auto flex min-h-12 w-full max-w-[1905px] items-center justify-center px-5 sm:px-8 lg:px-10">
          <div className="grid w-full grid-cols-1 items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
            <div className="hidden md:block" />
            <div className="flex flex-wrap items-center justify-center gap-3 text-center font-bold">
              <span>Winners announced!</span>
              <Link
                href="#award-categories"
                className="text-muted-foreground transition-colors duration-300 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Dive In
              </Link>
            </div>
            <Link
              href={externalLinks.nominations}
              className="hidden justify-self-end text-muted-foreground transition-colors duration-300 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:inline-flex"
            >
              Login or Register
            </Link>
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
              src="/logo.png"
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
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors duration-300 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <details className="group relative flex justify-end lg:hidden">
            <summary
              className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full border border-border text-foreground transition-colors duration-300 marker:hidden hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              aria-label="Open navigation menu"
            >
              <span className="flex flex-col gap-1.5" aria-hidden="true">
                <span className="block h-px w-5 bg-current" />
                <span className="block h-px w-5 bg-current" />
              </span>
            </summary>
            <nav
              className="absolute right-0 top-14 flex w-[min(18rem,calc(100vw-2.5rem))] flex-col gap-1 rounded-2xl border border-border bg-popover p-3 font-brand text-sm font-semibold shadow-2xl shadow-background/50"
              aria-label="Mobile navigation"
            >
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-xl px-4 py-3 text-popover-foreground transition-colors duration-300 hover:bg-muted hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={externalLinks.nominations}
                className="rounded-xl px-4 py-3 text-muted-foreground transition-colors duration-300 hover:bg-muted hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
              >
                Login or Register
              </Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
