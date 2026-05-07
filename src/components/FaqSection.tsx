"use client";

import { useState } from "react";
import { PlusIcon, MinusIcon } from "./icons";
import type { FaqItem } from "@/types/content";

const faqs: FaqItem[] = [
  {
    question: "How does it work?",
    answer:
      "First, you'll answer a short series of questions about the big issues impacting you this election — think housing, the cost of energy bills and access to healthcare. Based on your results, Build a Ballot calculates a 'match level' with the candidates in your electorate.\n\nIt's pretty simple: if you strongly support a policy and a candidate does too, that's 1 match point! The overall 'match level' is just a percentage of all the potential 'match points' included in the questionnaire.\n\nYou can view your match level with candidates in your electorate, see how they're approaching key issues and add your own notes based on any other issues that matter to you. You can then drag candidates into your 'voting plan' — putting them in the order of your preference. Importantly, this doesn't have to reflect your 'match levels' — you get to decide your own preferences!\n\nOnce you've built your ballot for the lower and upper house, you can screenshot or email your ballot to yourself, ready to take to the ballot box on election day.",
  },
  {
    question: "Does Build a Ballot only recommend certain parties or candidates?",
    answer:
      "No! The recommendations you receive through the tool are based on how you fill out the questionnaire. If you don't support a policy and a candidate also doesn't support it? That's still 1 match point!\n\nAs long as you head to the ballot box informed, we don't mind how you end up voting!",
  },
  {
    question: "What are you doing with the information you collect?",
    answer:
      "Firstly, you don't need to provide any identifiable, personal information to use Build a Ballot. You will have the option to add an email address to send your ballot to yourself, but you can always take a screenshot if you prefer.\n\nPersonal information we collect (email, postcode and linked political opinions) is only used to tailor voting recommendations specific to your electoral district and to send your ballot. Your personal information will not be shared, sold, or disclosed to any third parties except as required by law.\n\nWe will be sharing summarised, de-identified findings about which issues are most important to the voters that use Build a Ballot. We think it's important to use this information to remind politicians about the issues and policies that we care about most. Only aggregated findings - and no personal information - will be shared.",
  },
  {
    question: "Who's behind Build a Ballot?",
    answer:
      "Build a Ballot is a project by Project Planet Inc. We're a small charity focused on helping Australians better understand climate change, and find themselves in the solutions.\n\nYou might be wondering: What does Build a Ballot have to do with climate?\n\nWell, I'm so glad you asked! We know Australians care deeply about issues like climate change and the energy transition, but translating that concern into informed voting decisions isn't always easy. We also know that there is a lot of dis- and mis-information out there when it comes to the energy transition.\n\nWe created Build a Ballot to help voters cut through the noise and understand where parties and candidates stand on the issues that matter most to them, so they can make their decision based on facts, rather than spin. And, because we know that climate is just one of many issues impacting Aussies, we worked with some trusted partners to ensure the tool is useful to you even if climate isn't your top priority.",
  },
  {
    question: "Who's funding it?",
    answer:
      "Build a Ballot has been generously supported by hundreds of Australians who care about helping voters access non-partisan, reliable information. We're not backed by big corporations with hidden agendas. And we don't take money from any political parties, candidates or associated campaign groups.\n\nAlongside our donors, Build a Ballot has been made possible by an incredible team of volunteers who have generously given their time and expertise.\n\nIf you'd like to support the work we do, you can donate here!",
  },
  {
    question: "How can I help?",
    answer:
      "Everyone can help to put Build a Ballot in the hands, feeds and group chats of Australians across the country. You can head to our campaign page to discover ways you can support Build a Ballot.\n\nIf you can, consider donating. We're a small (mostly volunteer) team so every dollar helps!",
  },
  {
    question: "I'm a candidate, how do I get in touch?",
    answer:
      "If you're a candidate or party, you can get in touch by emailing tool@buildaballot.org.au.\n\nWe're working to email all candidates and parties but if we've missed you, please reach out and we'll send across a questionnaire to ensure Build a Ballot accurately reflects your policies and positions.",
  },
  {
    question: "Which issues are included in the tool?",
    answer:
      "We choose issues by identifying the major challenges impacting Australians — such as housing, cost of living and climate change — that consistently rank as top concerns for voters and are supported by strong evidence as real, material issues. We prioritise issues with significant intergenerational impacts and ensure they fall within the responsibilities of the level of government being considered.",
  },
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faqs" className="bab-section bg-background">
      <div className="bab-container max-w-[1100px] px-6">
        <div className="mb-14 text-center">
          <span className="bab-pill bab-pill--green mb-6 inline-block">FAQs</span>
          <h2 className="text-[clamp(34px,5vw,72px)] leading-[1.05] tracking-[-0.04em]">
            Frequently Asked Questions
          </h2>
          <p className="mt-5 text-[16px] leading-[1.5]">
            Have a question that hasn&apos;t been answered below? Submit a{" "}
            <a href="#contact" className="underline underline-offset-4">
              question here.
            </a>
          </p>
        </div>

        <ul className="border-t border-foreground/30">
          {faqs.map((f, idx) => {
            const isOpen = openIdx === idx;
            return (
              <li key={f.question} className="border-b border-foreground/30">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left text-[18px] font-medium tracking-[-0.02em] hover:opacity-80 md:text-[20px]"
                >
                  <span>{f.question}</span>
                  <span className="shrink-0">
                    {isOpen ? <MinusIcon className="h-6 w-6" /> : <PlusIcon className="h-6 w-6" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-7 pr-12 text-[16px] leading-[1.6] text-foreground/85">
                    {f.answer.split("\n\n").map((para, i) => (
                      <p key={i} className={i > 0 ? "mt-4" : ""}>
                        {para}
                      </p>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
