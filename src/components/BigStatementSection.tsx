import Link from "next/link";

export function BigStatementSection() {
  return (
    <section className="bg-[var(--accent-green)] py-24">
      <div className="bab-container px-6 text-center">
        <p className="text-[14px] font-medium tracking-[-0.02em]">Think your vote doesn&apos;t count?</p>
        <h2 className="mx-auto mt-6 max-w-[1100px] text-balance text-[clamp(40px,7vw,96px)] leading-[1.05] tracking-[-0.04em]">
          <span className="bab-pill bab-pill--purple mr-2 inline-block -translate-y-2 rotate-[-2deg] align-baseline">Get</span>
          Governments shape our future and we get to shape our government
          <span className="bab-pill bab-pill--grey ml-2 inline-block -translate-y-2 rotate-[2deg] align-baseline">Ready</span>
        </h2>
        <div className="mt-10 flex justify-center">
          <Link href="#plan" className="bab-btn">
            Build your ballot
          </Link>
        </div>
      </div>
    </section>
  );
}
