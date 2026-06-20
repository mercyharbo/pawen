import { AboutSection } from "@/components/about-section";
import { AwardsCategoriesSection } from "@/components/awards-categories-section";
import { CommunitySection } from "@/components/community-section";
import { DocumentarySection } from "@/components/documentary-section";
import { Hero } from "@/components/hero";
import { NominationCtaSection } from "@/components/nomination-cta-section";
import { SponsorsPartnersSection } from "@/components/sponsors-partners-section";
import { StorySection } from "@/components/story-section";
import { WhyThisStageSection } from "@/components/why-this-stage-section";
import { externalLinks } from "@/lib/external-links";

export default function Home() {
  return (
    <>
      <Hero
        nominationsUrl={externalLinks.nominations}
        ticketsUrl={externalLinks.tickets}
      />
      <StorySection supportUrl={externalLinks.supportOurWork} />
      <AboutSection />
      <DocumentarySection
        embedUrl={externalLinks.documentaryEmbed}
        videoUrl={externalLinks.documentaryVideo}
      />
      <CommunitySection subscribeUrl={externalLinks.communitySubscribe} />
      <AwardsCategoriesSection />
      <WhyThisStageSection />
      <SponsorsPartnersSection ticketsUrl={externalLinks.tickets} />
      <NominationCtaSection
        nominationsUrl={externalLinks.nominations}
        ticketsUrl={externalLinks.tickets}
      />
    </>
  );
}
