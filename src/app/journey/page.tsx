import { SiteShell } from "@/components/SiteShell";
import { siteCopy } from "@/lib/siteCopy";

export default function JourneyPage() {
  return (
    <SiteShell>
      <section className="card">
        <h2 className="sectionTitle">{siteCopy.journey.title}</h2>
        <p>{siteCopy.journey.intro}</p>
      </section>
      {siteCopy.journey.sections.map((section) => (
        <section key={section.heading} className="card">
          <h3 className="sectionTitle">{section.heading}</h3>
          <p>{section.body}</p>
        </section>
      ))}
    </SiteShell>
  );
}
