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
  showKicker?: boolean;
  splitTitleSubtitle?: boolean;
};

function hasLocalImage(imagePath?: string) {
  if (!imagePath || !imagePath.startsWith("/")) return false;
  return existsSync(join(process.cwd(), "public", imagePath));
}

export function HeroBanner({
  title,
  subtitle,
  imagePath,
  imageAlt,
  slotHint,
  cta,
  showKicker = true,
  splitTitleSubtitle = false
}: HeroBannerProps) {
  const hasImage = hasLocalImage(imagePath);

  return (
    <section className={`heroBanner ${hasImage ? "heroBannerWithImage" : "heroBannerFallback"}`}>
      {hasImage ? (
        <Image
          src={imagePath as string}
          alt={imageAlt ?? title}
          fill
          priority
          quality={100}
          sizes="100vw"
          className="heroBannerImage"
        />
      ) : null}
      <div
        className={`heroBannerOverlay ${hasImage ? "heroBannerOverlayImage" : "heroBannerOverlayFallback"} ${
          splitTitleSubtitle ? "heroBannerOverlaySplitZones" : ""
        }`}
      >
        <div className={`heroBannerOverlayInner ${splitTitleSubtitle ? "heroBannerOverlaySplit" : ""}`}>
          <div className="heroTop">
            {showKicker ? <p className="heroKicker">Haute &amp; Hoof</p> : null}
            <h2>{title}</h2>
          </div>
          <div className="heroBottom">
            <p className="heroSubtitle">{subtitle}</p>
            {cta ? <div className="actions">{cta}</div> : null}
          </div>
          {!hasImage && slotHint ? (
            <p className="small heroHint">Photo slot: add `{slotHint}` to `/public/images` for this banner.</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
