import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { siteCopy } from "@/lib/siteCopy";

export default function HomePage() {
  return (
    <SiteShell>
      <section className="hero">
        <h2>{siteCopy.home.heroTitle}</h2>
        <p>{siteCopy.home.heroSubtitle}</p>
        <p>{siteCopy.home.intro}</p>
        <div className="actions">
          <Link className="button buttonPrimary" href="/journey">
            Follow Violet&apos;s Journey
          </Link>
          <Link className="button buttonSecondary" href="/horse-picks">
            Explore Horse &amp; Style Picks
          </Link>
        </div>
      </section>
      <section className="grid">
        {siteCopy.home.pillars.map((pillar) => (
          <article key={pillar.title} className="card">
            <h3 className="sectionTitle">{pillar.title}</h3>
            <p>{pillar.text}</p>
          </article>
        ))}
      </section>
      <section className="card callout">
        <p>{siteCopy.home.closing}</p>
      </section>
    </SiteShell>
  );
}
