"use client";

import { usePathname } from "next/navigation";

import { SiteNav } from "@/components/layout/SiteNav";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className={`site-header${pathname === "/" ? " site-header--home" : ""}`}>
      <div className="shell site-header__inner">
        <SiteNav />
      </div>
    </header>
  );
}
