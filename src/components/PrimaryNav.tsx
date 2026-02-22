"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type NavLink = { href: string; label: string };

export function PrimaryNav({ links }: { links: NavLink[] }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <nav className="navDesktop" aria-label="Main">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={pathname === l.href ? "active" : ""}
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <nav className="navMobile" aria-label="Main">
        <select
          className="navSelect"
          value={pathname}
          onChange={(e) => router.push(e.target.value)}
          aria-label="Navigate to page"
        >
          {links.map((l) => (
            <option key={l.href} value={l.href}>
              {l.label}
            </option>
          ))}
        </select>
      </nav>
    </>
  );
}
