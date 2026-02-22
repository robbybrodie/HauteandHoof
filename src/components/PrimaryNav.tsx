"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type NavLink = {
  href: string;
  label: string;
};

export function PrimaryNav({ links }: { links: NavLink[] }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="nav" aria-label="Main Navigation">
      <div className="navDesktop">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} className={isActive ? "navActive" : ""}>
              {link.label}
            </Link>
          );
        })}
      </div>
      <div className="navMobile">
        <label htmlFor="page-nav" className="small">
          Jump to page
        </label>
        <select
          id="page-nav"
          className="navSelect"
          value={pathname}
          onChange={(event) => router.push(event.target.value)}
          aria-label="Jump to page"
        >
          {links.map((link) => (
            <option key={link.href} value={link.href}>
              {link.label}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
}
