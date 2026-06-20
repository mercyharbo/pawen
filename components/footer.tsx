import Link from "next/link";
import { externalLinks } from "@/lib/external-links";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Nominations", href: externalLinks.nominations },
  { label: "Community", href: "#community" },
  { label: "Summit", href: "#summit" },
  { label: "Exhibition", href: "#exhibition" },
  { label: "Awards Gala", href: "#awards-gala" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Contact", href: "#contact" },
] as const;

const socialLinks = [
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "X", href: "#" },
] as const;

export function Footer() {
  return (
    <footer className="relative isolate flex justify-center overflow-hidden border-t border-premium-gold/16 bg-soft-black text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(212,175,55,0.08),transparent_28%)]" />
      <div className="relative z-10 flex w-full max-w-7xl flex-col gap-14 px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr_0.82fr] lg:items-start">
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="flex items-center gap-5"
              aria-label="PAWEN home"
            >
              <span className="flex size-16 items-center justify-center border border-champagne-gold/40 bg-premium-gold font-serif text-3xl font-semibold text-background shadow-[0_1rem_2.5rem_rgba(212,175,55,0.16)]">
                P
              </span>
              <span className="flex flex-col gap-1">
                <span className="font-serif text-3xl leading-tight text-foreground">
                  The PAWEN Awards & Summit
                </span>
                <span className="text-sm text-muted-beige">
                  Lusaka, Zambia - 13-14 November 2026
                </span>
              </span>
            </Link>
            <p className="max-w-md text-sm leading-7 text-soft-gray">
              Africa&apos;s largest awards and leadership summit for women in
              business, leadership and impact.
            </p>
          </div>

          <nav
            className="grid grid-cols-2 gap-x-8 gap-y-4 border-y border-premium-gold/12 py-8 text-sm lg:border-y-0 lg:py-0"
            aria-label="Footer navigation"
          >
            {footerLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex items-center gap-3 text-muted-beige transition-colors duration-300 hover:text-champagne-gold"
              >
                <span className="h-px w-5 bg-premium-gold/30 transition-all duration-300 group-hover:w-8 group-hover:bg-champagne-gold" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-6 border border-premium-gold/14 bg-background/48 p-6">
            <div className="grid gap-2">
              <p className="font-serif text-3xl leading-tight text-foreground">
                Join the room.
              </p>
              <p className="text-sm leading-6 text-soft-gray">
                Enter through nomination, partnership or attendance.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={externalLinks.nominations}
                className="border border-premium-gold/45 px-5 py-3 text-sm font-medium text-champagne-gold transition-all duration-300 hover:border-champagne-gold hover:bg-premium-gold hover:text-background"
              >
                Nominate
              </Link>
              <Link
                href={externalLinks.tickets}
                className="bg-premium-gold px-5 py-3 text-sm font-semibold text-background shadow-[0_1rem_2.5rem_rgba(212,175,55,0.14)] transition-all duration-300 hover:bg-champagne-gold hover:shadow-[0_1.25rem_3rem_rgba(212,175,55,0.2)]"
              >
                Tickets
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6 border-t border-premium-gold/12 pt-7 text-xs text-soft-gray sm:flex-row sm:items-center">
          <p>&copy; 2026 PAWEN Awards & Summit. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            {socialLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors duration-300 hover:text-champagne-gold"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
