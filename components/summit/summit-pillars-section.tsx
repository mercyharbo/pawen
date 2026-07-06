import { MotionReveal } from "@/components/motion-reveal";
import {
  ArrowUpRight,
  BadgeDollarSign,
  Bell,
  BellRingIcon,
  Laptop,
  Leaf,
  type LucideIcon,
  Zap,
} from "lucide-react";

type Pillar = {
  description?: string;
  Icon: LucideIcon;
  title: string;
};

const pillars: Pillar[] = [
  {
    title: "Entrepreneurship & Enterprise",
    description:
      "Scaling African Businesses for Growth African women entrepreneurs are building resilient, innovative, high-growth businesses across every industry. This conversation tackles market access, scaling strategy, and the opportunities shaping the future of African enterprise.",
    Icon: Zap,
  },
  {
    title: "Leadership & Governance",
    Icon: Laptop,
  },
  {
    title: "Innovation, AI & the Future Economy",
    Icon: BellRingIcon,
  },
  {
    title: "Finance & Investment",
    Icon: BadgeDollarSign,
  },
  {
    title: "Sustainability & Impact",
    Icon: Leaf,
  },
  {
    title: "Policy & Economic Development",
    Icon: Bell,
  },
];

const pillarRows = [
  pillars.slice(0, 3),
  pillars.slice(3, 6),
];

function PillarCard({ pillar }: { pillar: Pillar }) {
  const { description, Icon, title } = pillar;

  return (
    <MotionReveal
      as="article"
      className="group/pillar-card flex min-h-64 overflow-hidden rounded-2xl border border-accent bg-transparent text-primary transition-all duration-500 ease-out hover:border-accent hover:bg-accent hover:text-background focus-within:border-accent focus-within:bg-accent focus-within:text-background focus-within:outline focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-accent lg:flex-1 lg:hover:flex-[2] lg:focus-within:flex-[2] xl:min-h-72"
      delay={0.04}
    >
      <div
        className="flex flex-1 flex-col justify-between gap-10 p-5 outline-none sm:p-7"
        tabIndex={0}
        aria-label={title}
      >
        <div className="flex flex-col gap-5">
          <span className="flex size-8 items-center justify-center rounded-full border border-primary/15 bg-primary/3 text-primary transition-colors duration-500 ease-out group-hover/pillar-card:border-background/35 group-hover/pillar-card:bg-background/8 group-hover/pillar-card:text-background group-focus-within/pillar-card:border-background/35 group-focus-within/pillar-card:bg-background/8 group-focus-within/pillar-card:text-background">
            <Icon className="size-4" aria-hidden="true" />
          </span>
          <h3 className="max-w-64 text-base font-semibold leading-6 text-primary/82 transition-colors duration-500 ease-out group-hover/pillar-card:text-background group-focus-within/pillar-card:text-background sm:text-lg sm:leading-7">
            {title}
          </h3>
        </div>

        {description ? (
          <p className="max-w-md text-sm leading-5 text-primary transition-colors duration-500 ease-out group-hover/pillar-card:text-background group-focus-within/pillar-card:text-background">
            {description}
          </p>
        ) : (
          <ArrowUpRight
            className="size-5 text-primary/45 transition-colors duration-500 ease-out group-hover/pillar-card:text-background group-focus-within/pillar-card:text-background"
            aria-hidden="true"
          />
        )}
      </div>
    </MotionReveal>
  );
}

export function SummitPillarsSection() {
  return (
    <section
      className="px-5 py-10 text-primary sm:px-8 lg:px-10 lg:py-16"
      aria-labelledby="summit-pillars-heading"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-9">
        <MotionReveal>
          <h2
            id="summit-pillars-heading"
            className="font-melodrama text-4xl font-semibold leading-[0.98] text-accent sm:text-5xl lg:text-5xl 2xl:text-6xl 3xl:text-6xl"
          >
            Six Pillars. One Future.
          </h2>
        </MotionReveal>

        <div className="flex w-full flex-col gap-3 lg:gap-4">
          {pillarRows.map((row) => (
            <div
              key={row.map((pillar) => pillar.title).join("-")}
              className="grid gap-3 md:grid-cols-2 lg:flex lg:gap-4"
            >
              {row.map((pillar) => (
                <PillarCard key={pillar.title} pillar={pillar} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
