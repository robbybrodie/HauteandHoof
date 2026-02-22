import { SiteShell } from "@/components/SiteShell";
import { siteCopy } from "@/lib/siteCopy";

export default function FashionPicksPage() {
  return (
    <SiteShell>
      <section className="card">
        <h2 className="sectionTitle">{siteCopy.fashionPicks.title}</h2>
        <p>{siteCopy.fashionPicks.intro}</p>
      </section>
      <section className="card">
        <h3 className="sectionTitle">Violet&apos;s Style Notes</h3>
        <ul>
          {siteCopy.fashionPicks.styleNotes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </SiteShell>
  );
}
