import Image from "next/image";
import { existsSync } from "node:fs";
import { join } from "node:path";
import type { ReactNode } from "react";

type HeroBannerProps = {
  title: string;
  subtitle: string;
  imagePath?: string;
  imageAlt?: string;
  slotHint?: string;
  cta?: ReactNode;
};

function hasLocalImage(imagePath?: string) {
  if (!imagePath || !imagePath.startsWith("/")) return false;
  return existsSync(join(process.cwd(), "public", imagePath));
}

export function HeroBanner({ title, subtitle, imagePath, imageAlt, slotHint, cta }: HeroBannerProps) {
  const hasImage = hasLocalImage(imagePath);

  return (
    <section className="heroBanner">
      {hasImage ? (
        <Image
          src={imagePath as string}
          alt={imageAlt ?? title}
          fill
          priority
          sizes="(max-width: 900px) 100vw, 1040px"
          className="heroBannerImage"
        />
      ) : null}
      <div className="heroBannerOverlay">
        <p className="heroKicker">Haute &amp; Hoof</p>
        <h2>{title}</h2>
        <p className="heroSubtitle">{subtitle}</p>
        {cta ? <div className="actions">{cta}</div> : null}
        {!hasImage && slotHint ? (
          <p className="small heroHint">Photo slot: add `{slotHint}` to `/public/images` for this banner.</p>
        ) : null}
      </div>
    </section>
  );
}
