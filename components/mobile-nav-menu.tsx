"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type MobileNavItem = {
  label: string;
  href: string;
};

type MobileNavMenuProps = {
  navItems: readonly MobileNavItem[];
};

function MobileMenuLink({
  children,
  href,
  isActive = false,
  className = "",
  muted = false,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  href: string;
  isActive?: boolean;
  muted?: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      className={`group/mobile-link relative overflow-hidden rounded-xl px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        muted ? "text-muted-foreground" : "text-popover-foreground"
      } ${className}`}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
    >
      <span
        className={`absolute inset-y-2 left-2 w-1 origin-center rounded-full bg-accent transition-transform duration-500 ease-out group-hover/mobile-link:scale-y-100 group-focus-visible/mobile-link:scale-y-100 ${
          isActive ? "scale-y-100" : "scale-y-0"
        }`}
        aria-hidden="true"
      />
      <span
        className={`relative z-10 block transition-transform duration-500 ease-out group-hover/mobile-link:translate-x-2 group-focus-visible/mobile-link:translate-x-2 ${
          isActive ? "translate-x-2" : ""
        }`}
      >
        {children}
      </span>
    </Link>
  );
}

function isActiveRoute(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileNavMenu({ navItems }: MobileNavMenuProps) {
  const pathname = usePathname();

  return (
    <StatefulMobileNavMenu
      key={pathname}
      navItems={navItems}
      pathname={pathname}
    />
  );
}

function StatefulMobileNavMenu({
  navItems,
  pathname,
}: MobileNavMenuProps & { pathname: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = "mobile-navigation-menu";

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target;

      if (target instanceof Node && !menuRef.current?.contains(target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="relative flex justify-end lg:hidden" ref={menuRef}>
      <button
        type="button"
        className="group/menu-button relative flex size-11 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border text-foreground transition-transform duration-500 ease-out hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        aria-controls={menuId}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span
          className="absolute inset-0 origin-bottom-left scale-0 rounded-full bg-accent transition-transform duration-500 ease-out group-hover/menu-button:scale-100 group-focus-visible/menu-button:scale-100"
          aria-hidden="true"
        />
        <span className="relative z-10 flex flex-col gap-1.5" aria-hidden="true">
          <span className="block h-px w-5 bg-current" />
          <span className="block h-px w-5 bg-current" />
        </span>
      </button>

      {isOpen ? (
        <nav
          id={menuId}
          className="absolute right-0 top-14 flex w-[min(18rem,calc(100vw-2.5rem))] flex-col gap-1 rounded-2xl border border-border bg-popover p-3 font-brand text-sm font-semibold shadow-2xl shadow-background/50"
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => (
            <MobileMenuLink
              key={item.label}
              href={item.href}
              isActive={isActiveRoute(pathname, item.href)}
              onClick={closeMenu}
            >
              {item.label}
            </MobileMenuLink>
          ))}
          {/* <MobileMenuLink
            href={loginHref}
            className="md:hidden"
            muted
            onClick={closeMenu}
          >
            Login or Register
          </MobileMenuLink> */}
        </nav>
      ) : null}
    </div>
  );
}
