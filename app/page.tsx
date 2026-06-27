import { Hero } from "@/components/hero";
import { StorySection } from "@/components/story-section";
import { externalLinks } from "@/lib/external-links";

export default function Home() {
  return (
    <>
      <Hero
        nominationsUrl={externalLinks.nominations}
        ticketsUrl={externalLinks.tickets}
      />
      <StorySection supportUrl={externalLinks.supportOurWork} />
    </>
  );
}
