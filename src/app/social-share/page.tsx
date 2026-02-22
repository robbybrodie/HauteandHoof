import { HeroBanner } from "@/components/HeroBanner";
import { SiteShell } from "@/components/SiteShell";
import { ParentPublishDesk } from "@/components/ParentPublishDesk";
import { siteCopy } from "@/lib/siteCopy";

export default function SocialSharePage() {
  const c = siteCopy.socialDesk;

  return (
    <SiteShell>
      <HeroBanner title={c.heroTitle} subtitle={c.heroSubtitle} />

      <section>
        <p className="sectionLabel">How It Works</p>
        <p className="sectionBody">{c.disclaimer}</p>
      </section>

      <hr className="divider" />

      <ParentPublishDesk />
    </SiteShell>
  );
}
