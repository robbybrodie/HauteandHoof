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
  const firstBlock = childNodes[0] ?? null;
  const remainingBlocks = childNodes.slice(1);

  return (
    <div className="container">
      <header className="siteHeader">
        <h1 className="brandTitle">{siteCopy.global.brand}</h1>
        <p className="brandTag">{siteCopy.global.brandTag}</p>
      </header>
      <main>
        <CursorMediaTrail />
        {firstBlock}
        <MotionReveal delayMs={30}>
          <PrimaryNav links={links} />
        </MotionReveal>
        {remainingBlocks.map((block, index) => (
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
