import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  imagePath?: string;
  imageAlt?: string;
  showKicker?: boolean;
  splitLayout?: boolean;
  cta?: ReactNode;
};

export function HeroBanner({
  title,
  subtitle,
  imagePath,
  imageAlt = "",
  showKicker = true,
  splitLayout = false,
  cta
}: Props) {
  const hasImage = !!imagePath;
  const overlayClass = [
    "heroBannerOverlay",
    hasImage ? "hasImage" : "noImage",
    splitLayout ? "splitLayout" : ""
  ]
    .filter(Boolean)
    .join(" ");

  const inner = splitLayout ? (
    <>
      <div>
        <h2 className="heroTitle">{title}</h2>
      </div>
      <div>
        {subtitle && <p className="heroSub">{subtitle}</p>}
        {cta && <div className="heroActions">{cta}</div>}
      </div>
    </>
  ) : (
    <>
      {showKicker && <p className="heroKicker">Barn to Blazer</p>}
      <h2 className="heroTitle">{title}</h2>
      {subtitle && <p className="heroSub">{subtitle}</p>}
      {cta && <div className="heroActions">{cta}</div>}
    </>
  );

  return (
    <section className="heroBanner">
      {hasImage && (
        <Image
          src={imagePath}
          alt={imageAlt}
          fill
          priority
          quality={100}
          sizes="100vw"
          className="heroBannerImg"
        />
      )}
      <div className={overlayClass}>{inner}</div>
    </section>
  );
}
