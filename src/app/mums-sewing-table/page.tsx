import { HeroBanner } from "@/components/HeroBanner";
import { SiteShell } from "@/components/SiteShell";
import { siteCopy } from "@/lib/siteCopy";

export default function MumsSewingTablePage() {
  return (
    <SiteShell>
      <HeroBanner
        title={siteCopy.mumsSewingTable.title}
        subtitle={siteCopy.mumsSewingTable.intro}
        imagePath="/images/mums-sewing-table-banner.jpg"
        imageAlt="Sewing table with fabric, pattern notes, and tack-friendly textures"
        slotHint="mums-sewing-table-banner.jpg"
      />

      <section className="card">
        <h3 className="sectionTitle">Project Highlights</h3>
        <ul>
          {siteCopy.mumsSewingTable.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h3 className="sectionTitle">What We&apos;re Making</h3>
        <ul>
          {siteCopy.mumsSewingTable.makingNow.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>{siteCopy.mumsSewingTable.supportNote}</p>
      </section>
    </SiteShell>
  );
}
