import { HeroBanner } from "@/components/HeroBanner";
import { SiteShell } from "@/components/SiteShell";
import { siteCopy } from "@/lib/siteCopy";

export default function JourneyPage() {
  const c = siteCopy.journey;

  return (
    <SiteShell>
      <HeroBanner
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
        imagePath={`/images/${c.photoSlot}`}
        imageAlt="Violet riding Cloudy"
        showKicker={false}
        splitLayout
      />

      <div className="grid">
        {c.sections.map((s) => (
          <article key={s.title} className="card">
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </article>
        ))}
      </div>
    </SiteShell>
  );
}
