import Link from "next/link";
import type { Testimonial } from "@/types/content";

const rowOne: Testimonial[] = [
  { quote: "I normally feel really dumb come election time so I laugh off not knowing who I'm voting for. I'm grateful for your tool as its really shown me my values and I can have a say in who I vote for. It's helped me take back my power in the election.", name: "Jay" },
  { quote: "I just used my Build a Ballot to vote early and it made it so easy. I think the easiest polling experience I have ever had. Thank you.", name: "Ellen" },
  { quote: "THANK YOU! I voted early yesterday and went in armed with my Build a Ballot responses. You've built such a useful tool, which helps everyone from first time voters to busy Millennials and GenZ's.", name: "Mon" },
  { quote: "OMG! Thank you so much, this was so so useful! I consider myself someone who is politically engaged and aware but at the last election I was so overwhelmed by the amount of minor parties. I experience anxiety and being able to to build a ballot in a calm and informed environment made me feel very confident and secure.", name: "Kelly" },
  { quote: "Oh my god, you guys have done a spectacular job. Build a Ballot is such an amazing tool.", name: "Clare" },
  { quote: "Thank you for your hard work, Build a Ballot was so easy to use, both online and at the booth. My children in their early 20's feel very despondent about the future but your efforts to make the future seem a little brighter for their generation is giving them a little more power.", name: "Gill" },
  { quote: "I used the Build a Ballot website before voting yesterday and I was so glad I did! I was pretty overwhelmed by the massive white ballot and all the parties, so I whipped out my guide that I had made earlier and just copied the numbers down, so easy!", name: "Anon" },
  { quote: "Thank you so much! I was able to help so many people, younger and older, make informed voting decisions through your site.", name: "Danielle" },
  { quote: "It's such a great tool, very very helpful for political overwhelm and last minute stress voters who leave it til the last minute (which is usually me but not this year)", name: "Kendela" },
  { quote: "I loved Build a Ballot, so good and accessible too (especially for those of us with hidden disabilities) - took a lot of work out of the research and let me target my energy.", name: "Michelle" },
];

const rowTwo: Testimonial[] = [
  { quote: "I'm 62 and have never found a way to vote that aligned so well with my values!! Thank you so much.", name: "Sue" },
  { quote: "I shared your brilliance with all my green Z babies and their mates to help educate them in this first time at the booths, and they made me so proud! So careful and considered they were with their vote. We are in good hands for the future.", name: "Anon" },
  { quote: "This process helped me so much!!! I've never fully understood the voting system or how to work out my preferences correctly in alignment with my values. It felt so empowering.", name: "Amber" },
  { quote: "So impressed with what you've created. I was able to have great conversations with my family and help them really see who they aligned with!", name: "Anon" },
  { quote: "While handing out how to vote cards in regional NSW, I saw an older couple with their printed out Build a Ballot, stapled A4 pages and everything! So cool to see!", name: "Sarah" },
  { quote: "Build a Ballot just helped one of my friends overcome their voting anxiety and get to the polls 1 hour before they closed.", name: "Imogen" },
  { quote: "Thank you so much for this tool! It makes voting by POLICY so easy!", name: "Kate" },
  { quote: "I've never felt so informed before an election and it was an incredible feeling! I'm so excited to see what comes next and just as excited to keep recommending you to everyone I know.", name: "Nicola" },
  { quote: "Build a Ballot is the best thing about this election! Made it SO EASY for my two young adult kids to plan their vote, and generated great political chat in our house.", name: "Chelsea" },
  { quote: "Build a Ballot is a game changer. I was in and out of that pre-polling booth in 5 minutes. It definitely took away all the overwhelm especially with that senate paper.", name: "Emma" },
];

function Card({ t }: { t: Testimonial }) {
  return (
    <article className="flex h-[300px] w-[320px] shrink-0 flex-col justify-between rounded-md border border-foreground/15 bg-background p-5">
      <p className="overflow-hidden text-[14px] leading-[1.45] text-foreground" style={{ display: "-webkit-box", WebkitLineClamp: 9, WebkitBoxOrient: "vertical" }}>
        {t.quote}
      </p>
      <span className="bab-pill bab-pill--green mt-4 w-fit">{t.name}</span>
    </article>
  );
}

function Row({ items, direction }: { items: Testimonial[]; direction: "left" | "right" }) {
  // Duplicate to enable seamless loop
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div className={`flex w-max gap-4 ${direction === "left" ? "bab-marquee-left" : "bab-marquee-right"}`}>
        {doubled.map((t, i) => (
          <Card key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="bg-[var(--surface-grey)] py-24">
      <div className="bab-container px-6 text-center">
        <h2 className="text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-[-0.04em]">Trusted by 600,000+ Australians</h2>
        <div className="mt-7 flex justify-center">
          <Link href="#get-updates" className="bab-btn bab-btn--purple">
            Get updates
          </Link>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-4">
        <Row items={rowOne} direction="left" />
        <Row items={rowTwo} direction="right" />
      </div>
    </section>
  );
}
