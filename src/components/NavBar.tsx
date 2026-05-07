"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "./icons";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="bab-container flex items-center justify-between px-6 py-4">
        <Link href="/" aria-label="Build a Ballot" className="font-[var(--font-franklin)] text-[15px] font-bold leading-[1.05] tracking-tight">
          BUILD A
          <br />
          BALLOT
        </Link>

        <nav className="hidden items-center gap-8 text-[15px] font-medium md:flex" aria-label="Primary">
          <Link href="/elections-101" className="hover:opacity-70">
            Elections 101
          </Link>
          <Link href="/support" className="inline-flex items-center gap-1 hover:opacity-70">
            Get involved <ChevronDownIcon className="h-4 w-4" />
          </Link>
          <Link href="/faqs" className="hover:opacity-70">
            FAQs
          </Link>
          <Link href="/sign-up" className="bab-btn">
            Get updates
          </Link>
        </nav>

        <Link href="/sign-up" className="bab-btn md:hidden">
          Get updates
        </Link>
      </div>
    </header>
  );
}
