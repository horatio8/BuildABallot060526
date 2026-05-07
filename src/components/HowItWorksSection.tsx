import Image from "next/image";

const steps = [
  {
    label: "Step 1",
    text: "Discover how your local candidates and parties stand on the top issues facing our communities",
    image: "/images/mockup-issues.png",
  },
  {
    label: "Step 2",
    text: "Build your ballot with your own preferences. Use our research hub to tailor based on your top issues.",
    image: "/images/mockup-electorate.png",
  },
  {
    label: "Step 3",
    text: "Send and save your how-to-vote card, ready for election day.",
    image: "/images/mockup-summary.png",
  },
];

export function HowItWorksSection() {
  return (
    <section className="bab-section bg-background">
      <div className="bab-container">
        <div className="max-w-[640px]">
          <p className="text-[14px] font-medium tracking-[-0.02em]">How it works</p>
          <h2 className="mt-4 text-[clamp(34px,4vw,52px)] leading-[1.1] tracking-[-0.04em]">
            Build a Ballot makes doing your research easy
          </h2>
          <p className="mt-6 text-[16px] leading-[1.5]">
            Discover how your local candidates and parties are approaching the issues you care about most and plan your own preferences, ready for election day.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((s) => (
            <div key={s.label} className="flex flex-col gap-6">
              <div className="relative h-[260px] w-full overflow-hidden rounded-md border border-foreground/10 bg-white shadow-sm">
                <Image
                  src={s.image}
                  alt={s.label}
                  fill
                  sizes="(max-width: 768px) 90vw, 33vw"
                  className="object-contain p-4"
                />
              </div>
              <div className="flex flex-col gap-3">
                <span className="bab-pill bab-pill--green w-fit">{s.label}</span>
                <p className="text-[16px] leading-[1.5]">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
