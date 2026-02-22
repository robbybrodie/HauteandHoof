import Link from "next/link";
import { ReactNode } from "react";
import { siteCopy } from "@/lib/siteCopy";

const links = [
  { href: "/", label: "Home" },
  { href: "/journey", label: "Journey" },
  { href: "/horse-picks", label: "Horse Picks" },
  { href: "/fashion-picks", label: "Fashion Picks" },
  { href: "/dad-corner", label: "Dad Corner" },
  { href: "/about", label: "About" }
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="container">
      <header className="siteHeader">
        <h1 className="brandTitle">{siteCopy.global.brand}</h1>
        <p className="brandTag">Young rider spirit, family teamwork, and everyday style.</p>
        <nav className="nav" aria-label="Main Navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
      <main>{children}</main>
      <footer className="small siteFooter">
        <p>{siteCopy.global.footerTagline}</p>
        <p>{siteCopy.global.affiliateDisclosure}</p>
        <p>{siteCopy.global.parentManaged}</p>
        <p>{siteCopy.global.privacySafe}</p>
      </footer>
    </div>
  );
}
