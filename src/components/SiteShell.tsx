import { Children, type ReactNode } from "react";
import { CursorMediaTrail } from "@/components/CursorMediaTrail";
import { MotionReveal } from "@/components/MotionReveal";
import { PrimaryNav } from "@/components/PrimaryNav";
import { siteCopy } from "@/lib/siteCopy";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/journey", label: "Journey" },
  { href: "/horse-picks", label: "Horse Picks" },
  { href: "/fashion-picks", label: "Fashion Picks" },
  { href: "/dad-corner", label: "Dad Corner" },
  { href: "/mums-sewing-table", label: "Mum\u2019s Sewing Table" },
  { href: "/social-share", label: "Publish Desk" },
  { href: "/about", label: "About" }
];

export function SiteShell({ children }: { children: ReactNode }) {
  const blocks = Children.toArray(children);

  return (
    <div className="site">
      <header className="siteHeader">
        <span className="brand">{siteCopy.global.brand}</span>
        <PrimaryNav links={NAV} />
      </header>

      <main className="siteMain">
        <CursorMediaTrail />
        <div className="pageContent">
          {blocks.map((block, i) => (
            <MotionReveal key={i} delayMs={Math.min(260, 40 + i * 50)}>
              {block}
            </MotionReveal>
          ))}
        </div>
      </main>

      <footer className="siteFooter">
        <p>{siteCopy.global.footerTagline}</p>
        <p>{siteCopy.global.affiliateDisclosure}</p>
        <p>{siteCopy.global.parentManaged}</p>
      </footer>
    </div>
  );
}
