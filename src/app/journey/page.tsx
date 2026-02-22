import { HeroBanner } from "@/components/HeroBanner";
import { SiteShell } from "@/components/SiteShell";
import { siteCopy } from "@/lib/siteCopy";

export default function JourneyPage() {
  return (
    <SiteShell>
      <HeroBanner
        title={siteCopy.journey.title}
        subtitle={siteCopy.journey.intro}
        imagePath={`/images/${siteCopy.journey.photoSlot}`}
        imageAlt="Violet riding Cloudy during a lesson"
        slotHint={siteCopy.journey.photoSlot}
        showKicker={false}
        splitTitleSubtitle
      />
      {siteCopy.journey.sections.map((section) => (
        <section key={section.heading} className="card">
          <h3 className="sectionTitle">{section.heading}</h3>
          <p>{section.body}</p>
        </section>
      ))}
    </SiteShell>
  );
}
