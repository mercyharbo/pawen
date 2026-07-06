import { MotionReveal } from "@/components/motion-reveal";
import {
  BadgeDollarSign,
  Bell,
  BellRingIcon,
  Laptop,
  Leaf,
  type LucideIcon,
  Zap,
} from "lucide-react";

type Pillar = {
  body: string;
  Icon: LucideIcon;
  subtitle: string;
  title: string;
};

const pillars: Pillar[] = [
  {
    title: "Entrepreneurship & Enterprise",
    subtitle: "Scaling African Businesses for Growth",
    body: "African women are building resilient, high-growth businesses across every industry. This conversation is about market access, scaling strategy, and what's next for African enterprise.",
    Icon: Zap,
  },
  {
    title: "Leadership & Governance",
    subtitle: "Shaping the Leaders Africa Needs",
    body: "Strong leadership drives Africa's transformation. This conversation is about executive leadership, governance, and building the institutions where women lead and shape policy.",
    Icon: Laptop,
  },
  {
    title: "Innovation, AI & the Future Economy",
    subtitle: "Building Africa's Next Economy",
    body: "AI and emerging technology are reshaping industries at speed. This conversation is about ensuring African women are not just participants in the future economy, but its architects.",
    Icon: BellRingIcon,
  },
  {
    title: "Finance & Investment",
    subtitle: "Unlocking Capital for Growth and Impact",
    body: "Access to finance remains one of the biggest drivers of inclusion. This conversation is about investment, financial innovation, and the funding pathways accelerating women-led enterprise.",
    Icon: BadgeDollarSign,
  },
  {
    title: "Sustainability & Impact",
    subtitle: "Driving Inclusive and Sustainable Growth",
    body: "Sustainable growth demands inclusive leadership and long-term thinking. This conversation is about growing the economy while advancing impact across Africa.",
    Icon: Leaf,
  },
  {
    title: "Policy & Economic Development",
    subtitle: "Advancing Africa Through Collaboration",
    body: "Policy, trade, and regional integration are shaping Africa's future. This conversation is about cross-border collaboration and the partnerships creating room for women to thrive.",
    Icon: Bell,
  },
];

const pillarRows = [
  pillars.slice(0, 3),
  pillars.slice(3, 6),
];

function PillarCard({ pillar }: { pillar: Pillar }) {
  const { body, Icon, subtitle, title } = pillar;

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
          <div className="flex flex-col gap-3">
            <h3 className="max-w-64 text-base font-semibold leading-6 text-primary/82 transition-colors duration-500 ease-out group-hover/pillar-card:text-background group-focus-within/pillar-card:text-background sm:text-lg sm:leading-7">
              {title}
            </h3>
            <p className="max-w-sm text-sm font-medium leading-5 text-primary/72 transition-colors duration-500 ease-out group-hover/pillar-card:text-background/82 group-focus-within/pillar-card:text-background/82">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <p className="max-w-md text-sm leading-5 text-primary transition-colors duration-500 ease-out group-hover/pillar-card:text-background group-focus-within/pillar-card:text-background">
            {body}
          </p>
        </div>
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
