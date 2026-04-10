"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { primaryNavItems } from "@/content/site";

const MOBILE_NAV_MEDIA_QUERY = "(max-width: 540px)";

function navIconFor(href: string): ReactNode {
  if (href === "/") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 22V12h6v10" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (href === "/about") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    );
  }

  if (href === "/portfolio") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="1.75" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 13h20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 17V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 7l10 7 10-7" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SiteNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const mediaQuery = window.matchMedia(MOBILE_NAV_MEDIA_QUERY);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const handleMediaChange = (event: MediaQueryListEvent) => {
      if (!event.matches) {
        setIsMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, [isMenuOpen]);

  return (
    <nav aria-label="Primary" className={`site-nav${isMenuOpen ? " site-nav--open" : ""}`}>
      <button
        type="button"
        className="site-nav__toggle"
        aria-expanded={isMenuOpen}
        aria-controls="site-nav-menu"
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span className="site-nav__toggle-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            {isMenuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
            ) : (
              <>
                <path d="M4 7h16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
                <path d="M4 12h16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
                <path d="M4 17h16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
              </>
            )}
          </svg>
        </span>
        <span className="site-nav__toggle-label">{isMenuOpen ? "Close" : "Menu"}</span>
      </button>
      <button
        type="button"
        className="site-nav__backdrop"
        aria-hidden="true"
        tabIndex={-1}
        onClick={() => setIsMenuOpen(false)}
      />
      <div id="site-nav-menu" className="site-nav__panel">
        {primaryNavItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`site-nav__link${isActive ? " site-nav__link--active" : ""}`}
              aria-current={isActive ? "page" : undefined}
              aria-label={item.label}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="site-nav__icon">{navIconFor(item.href)}</span>
              <span className="site-nav__text">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
