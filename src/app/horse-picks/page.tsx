import { SiteShell } from "@/components/SiteShell";
import { siteCopy } from "@/lib/siteCopy";

export default function HorsePicksPage() {
  return (
    <SiteShell>
      <section className="card">
        <h2 className="sectionTitle">{siteCopy.horsePicks.title}</h2>
        <p>{siteCopy.horsePicks.intro}</p>
      </section>
      <section className="card">
        <h3 className="sectionTitle">What We Look For</h3>
        <ul>
          {siteCopy.horsePicks.lookFor.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </SiteShell>
  );
}
