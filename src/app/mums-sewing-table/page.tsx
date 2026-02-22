import { HeroBanner } from "@/components/HeroBanner";
import { SiteShell } from "@/components/SiteShell";
import { siteCopy } from "@/lib/siteCopy";

export default function MumsSewingTablePage() {
  const c = siteCopy.mumsSewingTable;

  return (
    <SiteShell>
      <HeroBanner title={c.heroTitle} subtitle={c.heroSubtitle} />

      <div className="grid">
        {c.entries.map((e) => (
          <article key={e.title} className="card">
            <h3>{e.title}</h3>
            <p>{e.text}</p>
          </article>
        ))}
      </div>

      <section className="callout">
        <p>{c.closing}</p>
      </section>
    </SiteShell>
  );
}
