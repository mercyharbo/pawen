import { Hero } from "@/components/hero";
import { externalLinks } from "@/lib/external-links";

export default function Home() {
  return (
    <Hero
      nominationsUrl={externalLinks.nominations}
      ticketsUrl={externalLinks.tickets}
    />
  );
}
