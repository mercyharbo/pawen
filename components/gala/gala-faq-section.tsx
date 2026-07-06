import { MotionReveal } from "@/components/motion-reveal";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "What is the dress code?",
    answer:
      "The dress code is African Glam: elegant, expressive, and rooted in African heritage.",
  },
  {
    question: "Can anyone attend the Gala, or is it only for finalists?",
    answer:
      "The Gala is open to guests, partners, supporters, nominees, finalists, and members of the PAWEN community.",
  },
  {
    question: "Who can be nominated?",
    answer:
      "African women whose work shows leadership, enterprise, impact, or public service can be nominated.",
  },
  {
    question: "Is travel to Lusaka straightforward?",
    answer:
      "Yes. Guests can travel into Lusaka for the PAWEN Awards & Summit, with the event hosted at InterContinental Hotel, Lusaka.",
  },
  {
    question: "Will the Gala be live-streamed?",
    answer:
      "Live-stream details will be shared closer to the event with registered guests and the wider PAWEN community.",
  },
  {
    question: "What is the Victoria Falls Experience?",
    answer:
      "It is an optional curated group trip after the Gala, designed for PAWEN guests who want to extend their stay and experience Victoria Falls.",
  },
  {
    question: "How does the judging process work?",
    answer:
      "Nominations are reviewed against the award criteria, with finalists and winners selected through PAWEN's judging process.",
  },
] as const;

export function GalaFaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="gala-faq-heading"
      className="bg-pawen-brand-color px-5 py-10 text-primary sm:px-8 lg:px-10 lg:py-16"
    >
      <MotionReveal className="mx-auto flex w-full max-w-3xl flex-col gap-12">
        <h2
          id="gala-faq-heading"
          className="text-center font-melodrama text-4xl font-medium text-accent sm:text-5xl lg:text-6xl"
        >
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col">
          {faqs.map((faq) => (
            <details
              className="group border-b border-primary/10 py-4"
              key={faq.question}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-brand text-sm leading-6 text-primary marker:hidden sm:text-base">
                <span>{faq.question}</span>
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-background transition-transform group-open:rotate-45">
                  <Plus className="size-3.5" aria-hidden="true" />
                </span>
              </summary>
              <p className="max-w-2xl py-4 pr-10 font-brand text-sm leading-6 text-muted-beige">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </MotionReveal>
    </section>
  );
}
