"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDownIcon, CheckIcon } from "./icons";

export function SignupSection() {
  const [interests, setInterests] = useState<{ launch: boolean; support: boolean }>({
    launch: true,
    support: false,
  });

  return (
    <section id="get-updates" className="bg-[var(--surface-grey)] pt-24">
      <div className="bab-container grid grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)]">
        <div>
          <h2 className="text-[clamp(34px,4vw,56px)] leading-[1.1] tracking-[-0.04em]">
            It&apos;s your vote, make sure it reflects{" "}
            <em className="italic">your</em> values
          </h2>
          <p className="mt-6 max-w-[480px] text-[16px] leading-[1.5]">
            Build a Ballot launches a few weeks before every State and Federal election. Fill out the form, and we&apos;ll let you know when the tool is live.
          </p>

          <form className="mt-10 max-w-[520px] space-y-6" onSubmit={(e) => e.preventDefault()}>
            <FormField label="Your name*">
              <input
                type="text"
                required
                name="name"
                className="w-full border-0 border-b border-foreground/40 bg-transparent py-2 text-[16px] outline-none placeholder:text-foreground/50 focus:border-foreground"
              />
            </FormField>
            <FormField label="Your email*">
              <input
                type="email"
                required
                name="email"
                className="w-full border-0 border-b border-foreground/40 bg-transparent py-2 text-[16px] outline-none placeholder:text-foreground/50 focus:border-foreground"
              />
            </FormField>
            <FormSelect label="I'm a..." name="role" options={["Voter", "Organisation", "Business", "Creator or public figure", "None of the above"]} />
            <FormSelect label="I'm based in..." name="state" options={["VIC", "SA", "NSW", "TAS", "ACT", "QLD", "NT", "WA", "Overseas"]} />

            <fieldset>
              <legend className="text-[15px] font-medium">I&apos;d like to know...</legend>
              <div className="mt-4 space-y-3">
                <Checkbox
                  checked={interests.launch}
                  onChange={(v) => setInterests((p) => ({ ...p, launch: v }))}
                  label="When Build a Ballot launches"
                />
                <Checkbox
                  checked={interests.support}
                  onChange={(v) => setInterests((p) => ({ ...p, support: v }))}
                  label="What else I can do to support Build a Ballot"
                />
              </div>
            </fieldset>

            <button type="submit" className="bab-btn bab-btn--dark">
              Submit
            </button>
          </form>
        </div>

        <div className="relative -mb-px aspect-[3/4] w-full max-w-[520px] justify-self-end overflow-hidden lg:aspect-auto lg:h-[700px]">
          <Image
            src="/images/hand-holding-phone.png"
            alt="A hand holds a phone showing the Build a Ballot app with a candidate ranking"
            fill
            sizes="(max-width: 1024px) 90vw, 520px"
            className="object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[15px] text-foreground/80">{label}</span>
      {children}
    </label>
  );
}

function FormSelect({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="relative block">
      <span className="block text-[15px] text-foreground/80">{label}</span>
      <select
        name={name}
        defaultValue=""
        className="w-full appearance-none border-0 border-b border-foreground/40 bg-transparent py-2 pr-8 text-[16px] outline-none focus:border-foreground"
      >
        <option value="" disabled hidden></option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-1 bottom-3 h-4 w-4" />
    </label>
  );
}

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 text-left"
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px] border border-foreground transition-colors ${
          checked ? "bg-[var(--accent-green)]" : "bg-background"
        }`}
        aria-checked={checked}
        role="checkbox"
      >
        {checked && <CheckIcon className="h-3.5 w-3.5" />}
      </span>
      <span className="text-[15px]">{label}</span>
    </button>
  );
}
