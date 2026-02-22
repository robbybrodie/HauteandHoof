import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { redirect } from "next/navigation";

import JourneyPage from "@/app/journey/page";
import HorsePicksPage from "@/app/horse-picks/page";
import FashionPicksPage from "@/app/fashion-picks/page";
import DadCornerPage from "@/app/dad-corner/page";
import MumsSewingTablePage from "@/app/mums-sewing-table/page";
import SocialSharePage from "@/app/social-share/page";

describe("smoke: route rendering", () => {
  it("home page redirects to /journey", async () => {
    const HomePage = (await import("@/app/page")).default;
    HomePage();
    expect(redirect).toHaveBeenCalledWith("/journey");
  });

  it("renders journey page", () => {
    render(<JourneyPage />);
    expect(
      screen.getByRole("heading", { name: /Violet\u2019s Journey/ })
    ).toBeInTheDocument();
  });

  it("renders horse picks page", () => {
    render(<HorsePicksPage />);
    expect(
      screen.getByRole("heading", { name: "Horse Picks" })
    ).toBeInTheDocument();
  });

  it("renders fashion picks page", () => {
    render(<FashionPicksPage />);
    expect(
      screen.getByRole("heading", { name: "Fashion Picks" })
    ).toBeInTheDocument();
  });

  it("renders dad corner page", () => {
    render(<DadCornerPage />);
    expect(
      screen.getByRole("heading", { name: "Dad Corner" })
    ).toBeInTheDocument();
  });

  it("renders mums sewing table page", () => {
    render(<MumsSewingTablePage />);
    expect(
      screen.getByRole("heading", { name: /Mum\u2019s Sewing Table/ })
    ).toBeInTheDocument();
  });

  it("renders social share page", () => {
    render(<SocialSharePage />);
    expect(
      screen.getByRole("heading", { name: "Parent Publish Desk" })
    ).toBeInTheDocument();
  });

  it("renders about page", async () => {
    const AboutPage = (await import("@/app/about/page")).default;
    const result = await AboutPage({
      searchParams: Promise.resolve({})
    });
    render(result);
    expect(
      screen.getByRole("heading", { name: /About Barn to Blazer/ })
    ).toBeInTheDocument();
  });
});
