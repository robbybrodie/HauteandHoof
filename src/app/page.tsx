import Link from "next/link";
import { HeroBanner } from "@/components/HeroBanner";
import { SiteShell } from "@/components/SiteShell";
import { siteCopy } from "@/lib/siteCopy";

export default function HomePage() {
  return (
    <SiteShell>
      <HeroBanner
        title={siteCopy.home.heroTitle}
        subtitle={`${siteCopy.home.heroSubtitle} ${siteCopy.home.intro}`}
        imagePath={`/images/${siteCopy.home.photoSlot}`}
        imageAlt="Violet and Cloudy on a training day"
        slotHint={siteCopy.home.photoSlot}
        cta={
          <>
            <Link className="button buttonPrimary" href="/journey">
              Follow Violet&apos;s Journey
            </Link>
            <Link className="button buttonSecondary" href="/horse-picks">
              Explore Horse &amp; Style Picks
            </Link>
            <Link className="button buttonSecondary" href="/social-share">
              Open Parent Publish Desk
            </Link>
          </>
        }
      />
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
