import Link from "next/link";

export function FundedByYouSection() {
  return (
    <section id="donate" className="bg-[var(--surface-grey)] py-24">
      <div className="bab-container px-6 text-center">
        <h2 className="text-[clamp(38px,5vw,64px)] leading-[1.05] tracking-[-0.04em]">For you, funded by you</h2>
        <div className="mx-auto mt-8 max-w-[640px] space-y-5 text-[16px] leading-[1.6]">
          <p>
            We&apos;re not backed by big corporations with hidden agendas. Build a Ballot is literally powered by thousands of everyday Australians — with a little help from our mates at Heaps Normal — who want what we want: a democracy that actually works for people and the planet.
          </p>
          <p>
            If you&apos;re in a position to chip in, a recurring donation is the most powerful way to help us bring Build a Ballot to future elections.
          </p>
        </div>
        <div className="mt-10 flex justify-center">
          <Link href="#donate" className="bab-btn">
            Donate
          </Link>
        </div>
      </div>
    </section>
  );
}
