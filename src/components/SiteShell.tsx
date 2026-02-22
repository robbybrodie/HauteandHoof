import { Children, ReactNode } from "react";
import { CursorMediaTrail } from "@/components/CursorMediaTrail";
import { MotionReveal } from "@/components/MotionReveal";
import { PrimaryNav } from "@/components/PrimaryNav";
import { siteCopy } from "@/lib/siteCopy";

const links = [
  { href: "/", label: "Home" },
  { href: "/journey", label: "Journey" },
  { href: "/horse-picks", label: "Horse Picks" },
  { href: "/fashion-picks", label: "Fashion Picks" },
  { href: "/dad-corner", label: "Dad Corner" },
  { href: "/mums-sewing-table", label: "Mum's Sewing Table" },
  { href: "/social-share", label: "Parent Publish Desk" },
  { href: "/about", label: "About" }
];

export function SiteShell({ children }: { children: ReactNode }) {
  const childNodes = Children.toArray(children);

  return (
    <div className="container">
      <header className="siteHeader siteHeaderTop">
        <div className="siteTopBar">
          <h1 className="brandTitle">{siteCopy.global.brand}</h1>
          <PrimaryNav links={links} />
        </div>
      </header>
      <main className="pageMain">
        <CursorMediaTrail />
        {childNodes.map((block, index) => (
          <MotionReveal key={index} delayMs={Math.min(220, 60 + index * 30)}>
            {block}
          </MotionReveal>
        ))}
      </main>
      <footer className="small siteFooter">
        <p>{siteCopy.global.footerTagline}</p>
        <p>{siteCopy.global.affiliateDisclosure}</p>
        <p>{siteCopy.global.parentManaged}</p>
        <p>{siteCopy.global.privacySafe}</p>
      </footer>
    </div>
  );
}
