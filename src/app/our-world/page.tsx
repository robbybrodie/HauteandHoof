import { HeroBanner } from "@/components/HeroBanner";
import { SiteShell } from "@/components/SiteShell";
import { siteCopy } from "@/lib/siteCopy";

export default function OurWorldPage() {
  const c = siteCopy.home;

  return (
    <SiteShell>
      <HeroBanner
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
        imagePath={`/images/${c.photoSlot}`}
        imageAlt="Violet and Cloudy on a training day"
      />

      <section>
        <p className="sectionLabel">What We&apos;re About</p>
        <p className="sectionBody">{c.intro}</p>
      </section>

      <div className="grid">
        {c.pillars.map((p) => (
          <article key={p.title} className="card">
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </article>
        ))}
      </div>

      <section className="callout">
        <p>{c.closing}</p>
      </section>
    </SiteShell>
  );
}
