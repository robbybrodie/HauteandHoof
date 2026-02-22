import Link from "next/link";
import { Children, ReactNode } from "react";
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
        {firstBlock}
        <nav className="nav" aria-label="Main Navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        {remainingBlocks}
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
