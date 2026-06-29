import { Button } from "@/components/ui/button";
import Link from "next/link";

type FooterTicketCtaProps = {
  ticketsUrl: string;
};

export function FooterTicketCta({ ticketsUrl }: FooterTicketCtaProps) {
  return (
    <section className="bg-background px-5 py-14 text-primary sm:px-8 lg:px-10 lg:py-20">
      <div className="mx-auto flex w-full max-w-[1905px] justify-center text-center">
        <div className="flex max-w-sm flex-col items-center gap-5">
          <p className="font-sans text-sm font-normal leading-5 opacity-90">
            The PAWEN Awards &amp; Summit 2026
          </p>
          <div className="flex flex-col items-center gap-6">
            <p className="max-w-xs font-sans text-xl font-medium leading-8 lg:text-lg lg:leading-7 xl:text-xl xl:leading-8 2xl:text-2xl 2xl:leading-9 3xl:text-2xl 3xl:leading-9">
              InterContinental Hotel, Lusaka, Zambia.
            </p>
            <Button
              asChild
              className="min-h-14 rounded-full bg-accent px-10 font-sans text-lg font-medium text-primary-foreground"
            >
              <Link href={ticketsUrl}>Get Tickets</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
