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

function PillarCard({
  pillar,
  featured = false,
  spanClass,
}: {
  featured?: boolean;
  pillar: Pillar;
  spanClass: string;
}) {
  const { description, Icon, title } = pillar;

  if (featured) {
    return (
      <MotionReveal
        as="article"
        className={`flex min-h-64 flex-col justify-between gap-10 rounded-2xl bg-champagne-gold p-5 text-background sm:p-7 ${spanClass}`}
        delay={0.02}
      >
        <div className="flex flex-col gap-5">
          <span className="flex size-8 items-center justify-center rounded-full border border-background/35 bg-background/8 text-background">
            <Icon className="size-4" aria-hidden="true" />
          </span>
          <h3 className="text-xl font-medium leading-7">{title}</h3>
        </div>

        <p className="max-w-md text-sm leading-5 text-background">
          {description}
        </p>
      </MotionReveal>
    );
  }

  return (
    <MotionReveal
      as="article"
      className={`group flex min-h-64 flex-col justify-between gap-10 rounded-2xl border border-champagne-gold/12 bg-background p-5 text-primary transition-colors hover:border-champagne-gold/35 sm:p-7 xl:min-h-72 ${spanClass}`}
      delay={0.04}
    >
      <div className="flex flex-col gap-5">
        <span className="flex size-8 items-center justify-center rounded-full border border-primary/15 bg-primary/3 text-primary">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <h3 className="max-w-64 text-base font-normal leading-6 text-primary/82 sm:text-lg sm:leading-7">
          {title}
        </h3>
      </div>

      <ArrowUpRight
        className="size-5 text-primary/45 transition-colors group-hover:text-champagne-gold"
        aria-hidden="true"
      />
    </MotionReveal>
  );
}

export function SummitPillarsSection() {
  return (
    <section
      className="bg-background px-5 py-20 text-primary sm:px-8 lg:px-10 lg:py-28"
      aria-labelledby="summit-pillars-heading"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-9">
        <MotionReveal>
          <h2
            id="summit-pillars-heading"
            className="font-melodrama text-4xl font-semibold leading-[0.98] text-champagne-gold sm:text-5xl lg:text-5xl 2xl:text-6xl 3xl:text-6xl"
          >
            Six Pillars. One Future.
          </h2>
        </MotionReveal>

        <div className="grid w-full gap-3 md:grid-cols-2 lg:grid-cols-12 lg:gap-4">
          {pillars.map((pillar, index) => (
            <PillarCard
              key={pillar.title}
              pillar={pillar}
              featured={index === 0}
              spanClass={
                index === 0
                  ? "lg:col-span-6"
                  : index < 3
                    ? "lg:col-span-3"
                    : "lg:col-span-4"
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
