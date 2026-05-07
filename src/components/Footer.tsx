"use client";

import Link from "next/link";
import { InstagramIcon, TikTokIcon, LinkedInIcon, ChevronDownIcon } from "./icons";

const links = {
  "Elections 101": [
    { label: "What you need to know", href: "/elections-101" },
    { label: "#auspol explained", href: "/auspol-explained" },
  ],
  Support: [
    { label: "How you can help", href: "/support" },
    { label: "Volunteer", href: "/support/volunteer" },
    { label: "Donate", href: "/support" },
    { label: "Downloads", href: "/support/downloads" },
    { label: "Conversation guides", href: "/support/conversation-guide" },
    { label: "Partnerships", href: "/support/partnerships" },
  ],
  About: [
    { label: "FAQs", href: "/faqs" },
    { label: "About Build a Ballot", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[var(--surface-dark)] text-background">
      <div className="bab-container px-6 py-16">
        <div className="flex items-start justify-between gap-6">
          <div className="text-[15px] font-bold leading-[1.05] tracking-tight">
            BUILD A
            <br />
            BALLOT
          </div>
          <nav aria-label="Social" className="flex items-center gap-4">
            <a href="#" aria-label="Instagram" className="text-background hover:opacity-80">
              <InstagramIcon className="h-6 w-6" />
            </a>
            <a href="#" aria-label="TikTok" className="text-background hover:opacity-80">
              <TikTokIcon className="h-6 w-6" />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-background hover:opacity-80">
              <LinkedInIcon className="h-6 w-6" />
            </a>
          </nav>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.2fr)] lg:gap-16">
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h3 className="text-[18px] font-semibold tracking-[-0.02em]">{title}</h3>
              <ul className="mt-5 space-y-3 text-[15px]">
                {items.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:opacity-80">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <FooterForm />
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-background/15 pt-8 text-[13px] md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p>Build a Ballot is a tool by Project Planet (ABN 55666555531).</p>
            <p>Authorised by Tegan Lerm, Project Planet Inc, Collingwood VIC</p>
            <p>
              Have a question? Head to our{" "}
              <a href="#contact" className="underline">
                contact page
              </a>{" "}
              to get in touch.
            </p>
          </div>
          <nav className="flex flex-wrap gap-6">
            <Link href="/privacy-policy" className="hover:opacity-80">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="hover:opacity-80">
              Terms of Use
            </Link>
            <a href="#" className="hover:opacity-80">
              Site by Tilt Studio
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterForm() {
  return (
    <div>
      <h3 className="text-[18px] font-semibold tracking-[-0.02em]">Get updates</h3>
      <form className="mt-5 space-y-5" onSubmit={(e) => e.preventDefault()}>
        <FieldDark label="Your name*" type="text" name="name" />
        <FieldDark label="Your email*" type="email" name="email" />
        <SelectDark label="I'm a..." name="role" options={["Voter", "Organisation", "Business", "Creator or public figure", "None of the above"]} />
        <SelectDark label="I'm based in..." name="state" options={["VIC", "SA", "NSW", "TAS", "ACT", "QLD", "NT", "WA", "Overseas"]} />
        <button type="submit" className="rounded-[6px] bg-background px-6 py-2 text-[15px] font-medium text-foreground hover:opacity-90">
          Submit
        </button>
      </form>
    </div>
  );
}

function FieldDark({ label, type, name }: { label: string; type: string; name: string }) {
  return (
    <label className="block">
      <span className="block text-[14px] text-background/80">{label}</span>
      <input
        type={type}
        name={name}
        required
        className="w-full border-0 border-b border-background/40 bg-transparent py-1.5 text-[15px] text-background outline-none focus:border-background"
      />
    </label>
  );
}

function SelectDark({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="relative block">
      <span className="block text-[14px] text-background/80">{label}</span>
      <select
        name={name}
        defaultValue=""
        className="w-full appearance-none border-0 border-b border-background/40 bg-transparent py-1.5 pr-7 text-[15px] text-background outline-none focus:border-background"
      >
        <option value="" disabled hidden></option>
        {options.map((o) => (
          <option key={o} value={o} className="text-foreground">
            {o}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-1 bottom-2.5 h-4 w-4" />
    </label>
  );
}
