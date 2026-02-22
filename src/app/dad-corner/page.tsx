import { SiteShell } from "@/components/SiteShell";
import { siteCopy } from "@/lib/siteCopy";

export default function DadCornerPage() {
  return (
    <SiteShell>
      <section className="card">
        <h2 className="sectionTitle">{siteCopy.dadCorner.title}</h2>
        <p>{siteCopy.dadCorner.intro}</p>
      </section>
      <section className="card callout">
        <h3 className="sectionTitle">Dad Joke Break</h3>
        <p>{siteCopy.dadCorner.joke}</p>
      </section>
    </SiteShell>
  );
}
