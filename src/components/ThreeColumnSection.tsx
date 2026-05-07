import Link from "next/link";
import type { ColumnCard } from "@/types/content";

const columns: ColumnCard[] = [
  {
    title: "Get to know our electoral system",
    body: "Everything you need to know about Australian politics, explained. Get your democracy on and level up your election knowledge before heading to the polls.",
    ctaLabel: "Learn more",
    ctaHref: "#elections-101",
    ctaVariant: "dark",
  },
  {
    title: "Build your ballot",
    body: "Build a Ballot launches a few weeks before every State and Federal election and helps you plan your own preferences, ready for election day.",
    ctaLabel: "Get updates",
    ctaHref: "#get-updates",
    ctaVariant: "dark",
  },
  {
    title: "Help us reach more Aussie voters",
    body: "We might not have big marketing budgets… but we have a secret weapon. You! Help us put Build a Ballot in the hands, feeds and group chats of other voters.",
    ctaLabel: "Learn more",
    ctaHref: "#help",
    ctaVariant: "dark",
  },
];

export function ThreeColumnSection() {
  return (
    <section className="bab-section bg-background">
      <div className="bab-container">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-0">
          {columns.map((col, i) => (
            <div key={col.title} className={`flex flex-col px-2 md:px-8 ${i === 0 ? "md:pl-0" : ""} ${i === columns.length - 1 ? "md:pr-0" : ""} ${i > 0 ? "md:border-l md:border-foreground/40" : ""}`}>
              <h3 className="text-[clamp(22px,2.2vw,32px)] leading-[1.25] tracking-[-0.04em]">{col.title}</h3>
              <p className="mt-5 text-[16px] leading-[1.5] flex-1">{col.body}</p>
              <div className="mt-8">
                <Link href={col.ctaHref} className={`bab-btn bab-btn--${col.ctaVariant}`}>
                  {col.ctaLabel}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
