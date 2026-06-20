import Link from "next/link";
import { externalLinks } from "@/lib/external-links";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Nominations", href: externalLinks.nominations },
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
    <footer className="flex justify-center border-t border-premium-gold/20 bg-soft-black text-foreground">
      <div className="flex w-full max-w-7xl flex-col gap-12 px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr_0.8fr]">
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-4" aria-label="PAWEN home">
              <span className="flex size-14 items-center justify-center bg-premium-gold font-serif text-2xl font-semibold text-background">
                P
              </span>
              <span className="flex flex-col gap-1">
                <span className="font-serif text-2xl text-foreground">
                  The PAWEN Awards & Summit
                </span>
                <span className="text-sm text-muted-beige">
                  Lusaka, Zambia - 13-14 November 2026
                </span>
              </span>
            </Link>
            <p className="max-w-md text-sm leading-6 text-soft-gray">
              Africa&apos;s largest awards and leadership summit for women in
              business, leadership and impact.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-3 text-sm" aria-label="Footer navigation">
            {footerLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-muted-beige transition-colors duration-300 hover:text-champagne-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-4">
            <p className="font-serif text-2xl text-foreground">Join the room.</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={externalLinks.nominations}
                className="border border-premium-gold/50 px-4 py-2 text-sm text-champagne-gold transition-colors duration-300 hover:border-champagne-gold hover:bg-premium-gold hover:text-background"
              >
                Nominate
              </Link>
              <Link
                href={externalLinks.tickets}
                className="bg-premium-gold px-4 py-2 text-sm font-medium text-background transition-colors duration-300 hover:bg-champagne-gold"
              >
                Tickets
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6 border-t border-premium-gold/15 pt-6 text-xs text-soft-gray sm:flex-row sm:items-center">
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
