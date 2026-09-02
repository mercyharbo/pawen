"use client";

import type { HeaderNavItem } from "@/components/header-nav-links";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type MobileNavMenuProps = {
  navItems: readonly HeaderNavItem[];
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

function isActiveRoute(pathname: string, href?: string) {
  if (!href) return false;
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
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = "mobile-navigation-menu";

  function toggleDropdown(label: string) {
    setOpenDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  }

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
          {navItems.map((item) => {
            if (item.items && item.items.length > 0) {
              const isDropdownOpen = !!openDropdowns[item.label];

              return (
                <div key={item.label} className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => toggleDropdown(item.label)}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-popover-foreground transition-colors hover:bg-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`size-4 transition-transform duration-300 ${
                        isDropdownOpen ? "rotate-180 text-accent" : ""
                      }`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="ml-3 flex flex-col gap-1 border-l border-border/60 pl-3 py-1">
                      {item.items.map((subItem) =>
                        subItem.href ? (
                          <a
                            key={subItem.label}
                            href={subItem.href}
                            target="_blank"
                            rel="noreferrer"
                            onClick={closeMenu}
                            className="rounded-md px-3 py-2 text-xs font-medium text-popover-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                          >
                            {subItem.label}
                          </a>
                        ) : (
                          <span
                            key={subItem.label}
                            className="rounded-md px-3 py-2 text-xs font-medium text-popover-foreground/60 transition-colors hover:bg-white/5 cursor-default"
                          >
                            {subItem.label}
                          </span>
                        ),
                      )}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <MobileMenuLink
                key={item.label}
                href={item.href ?? "/"}
                isActive={isActiveRoute(pathname, item.href)}
                onClick={closeMenu}
              >
                {item.label}
              </MobileMenuLink>
            );
          })}
        </nav>
      ) : null}
    </div>
  );
}
