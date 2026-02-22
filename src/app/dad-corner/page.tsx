import { HeroBanner } from "@/components/HeroBanner";
import { SiteShell } from "@/components/SiteShell";
import { siteCopy } from "@/lib/siteCopy";

export default function DadCornerPage() {
  return (
    <SiteShell>
      <HeroBanner
        title={siteCopy.dadCorner.title}
        subtitle={siteCopy.dadCorner.intro}
        imagePath={`/images/${siteCopy.dadCorner.photoSlot}`}
        imageAlt="Father and daughter laugh near horse paddock"
        slotHint={siteCopy.dadCorner.photoSlot}
      />
      <section className="card callout">
        <h3 className="sectionTitle">Dad Joke Break</h3>
        <p>{siteCopy.dadCorner.joke}</p>
      </section>
    </SiteShell>
  );
}
