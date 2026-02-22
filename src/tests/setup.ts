import "@testing-library/jest-dom/vitest";
import { createElement, type ReactNode } from "react";
import { vi } from "vitest";

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
Object.defineProperty(globalThis, "IntersectionObserver", {
  value: MockIntersectionObserver
});

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) =>
    createElement("a", { href }, children)
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/journey",
  useRouter: () => ({ push: vi.fn() }),
  redirect: vi.fn()
}));

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) =>
    createElement("img", {
      src: props.src,
      alt: props.alt,
      "data-testid": "next-image"
    })
}));
