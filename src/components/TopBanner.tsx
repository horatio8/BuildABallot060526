import Link from "next/link";

export function TopBanner() {
  return (
    <div className="w-full bg-foreground text-background">
      <div className="bab-container flex items-center justify-between gap-4 px-6 py-2 text-[13px] font-medium">
        <span className="hidden flex-1 sm:block" aria-hidden="true" />
        <p className="flex-1 text-center">Get ready to vote in the Farrer by-election</p>
        <nav className="flex flex-1 items-center justify-end gap-5" aria-label="Utility">
          <Link href="/about" className="hover:opacity-80">
            About
          </Link>
          <Link href="/support" className="hover:opacity-80">
            Donate
          </Link>
          <Link href="/contact" className="hover:opacity-80">
            Contact
          </Link>
        </nav>
      </div>
    </div>
  );
}
