import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden -mt-[64px] pt-[64px]">
      <Image
        src="/images/hero-farrer.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/10" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pt-32 pb-24 text-center">
        <h1 className="mx-auto text-[clamp(40px,6.6vw,96px)] font-normal leading-[1.05] tracking-[-0.04em] text-background">
          <span className="bab-pill bab-pill--green mr-2 inline-block -translate-y-3 rotate-[-1deg]">Farrer</span>
          Hey Farrer!
          <br />
          Plan your vote for the
          <br />
          by-election
          <span className="bab-pill bab-pill--purple ml-2 inline-block -translate-y-3 rotate-[2deg]">By-election</span>
        </h1>

        <p className="mx-auto mt-10 max-w-[560px] text-[16px] leading-[1.5] text-background">
          We&apos;ve made it easy to compare where candidates stand on the top issues. Learn where candidates stand, then plan your preferences, ready for election day.
        </p>

        <div className="mt-8 flex justify-center">
          <Link href="#plan" className="bab-btn">
            Plan your vote
          </Link>
        </div>
      </div>
    </section>
  );
}
