import Link from "next/link";
import { externalLinks } from "@/lib/external-links";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Nominations", href: externalLinks.nominations },
  { label: "Summit", href: "#summit" },
  { label: "Exhibition", href: "#exhibition" },
  { label: "Awards Gala", href: "#awards-gala" },
  { label: "Sponsors", href: "#sponsors" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex justify-center border-b border-premium-gold/20 bg-background/90 text-foreground backdrop-blur-md">
      <div className="flex min-h-20 w-full max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="PAWEN home">
          <span className="flex size-11 items-center justify-center border border-premium-gold bg-premium-gold text-xl font-semibold text-background">
            P
          </span>
          <span className="flex flex-col gap-1">
            <span className="font-serif text-lg leading-none text-foreground">
              PAWEN
            </span>
            <span className="hidden text-xs leading-none text-muted-beige sm:inline">
              Awards & Summit 2026
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-7 text-sm text-muted-beige lg:flex"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-colors duration-300 hover:text-champagne-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={externalLinks.nominations}
            className="hidden border border-premium-gold/50 px-4 py-2 text-sm text-champagne-gold transition-colors duration-300 hover:border-champagne-gold hover:bg-premium-gold hover:text-background sm:inline-flex"
          >
            Nominate
          </Link>
          <Link
            href={externalLinks.tickets}
            className="bg-premium-gold px-4 py-2 text-sm font-medium text-background transition-colors duration-300 hover:bg-champagne-gold"
          >
            Tickets
          </Link>
          <details className="group relative lg:hidden">
            <summary
              className="flex size-10 cursor-pointer list-none items-center justify-center border border-premium-gold/35 text-champagne-gold marker:hidden"
              aria-label="Open navigation menu"
            >
              <span className="flex flex-col gap-1.5">
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
              </span>
            </summary>
            <nav
              className="absolute right-0 top-12 flex w-64 flex-col gap-1 border border-premium-gold/20 bg-background p-3 shadow-2xl shadow-black/50"
              aria-label="Mobile navigation"
            >
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 text-sm text-muted-beige transition-colors duration-300 hover:bg-charcoal hover:text-champagne-gold"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
