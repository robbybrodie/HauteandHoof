import { HeroBanner } from "@/components/HeroBanner";
import { SiteShell } from "@/components/SiteShell";
import { siteCopy } from "@/lib/siteCopy";

export default function FashionPicksPage() {
  const c = siteCopy.fashionStyle;

  return (
    <SiteShell>
      <HeroBanner title={c.heroTitle} subtitle={c.heroSubtitle} />

      <div className="grid">
        {c.categories.map((cat) => (
          <article key={cat.title} className="card">
            <h3>{cat.title}</h3>
            <p>{cat.text}</p>
          </article>
        ))}
      </div>

      <p className="sectionBody">{c.note}</p>
    </SiteShell>
  );
}
