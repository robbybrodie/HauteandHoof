import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutPage from "@/app/about/page";
import DadCornerPage from "@/app/dad-corner/page";
import FashionPicksPage from "@/app/fashion-picks/page";
import HomePage from "@/app/page";
import HorsePicksPage from "@/app/horse-picks/page";
import JourneyPage from "@/app/journey/page";

describe("smoke route rendering", () => {
  it("renders home page hero", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: "Style, Saddle, and Heart." })).toBeInTheDocument();
  });

  it("renders journey page title", () => {
    render(<JourneyPage />);
    expect(screen.getByRole("heading", { name: "Violet's Journey" })).toBeInTheDocument();
  });

  it("renders horse picks page title", () => {
    render(<HorsePicksPage />);
    expect(screen.getByRole("heading", { name: "Horse Picks We Trust" })).toBeInTheDocument();
  });

  it("renders fashion picks page title", () => {
    render(<FashionPicksPage />);
    expect(screen.getByRole("heading", { name: "Fashion Picks for Barn & Beyond" })).toBeInTheDocument();
  });

  it("renders dad corner page title", () => {
    render(<DadCornerPage />);
    expect(screen.getByRole("heading", { name: "Dad Corner" })).toBeInTheDocument();
  });

  it("renders about page title and contact form", async () => {
    render(await AboutPage({ searchParams: Promise.resolve({}) }));
    expect(screen.getByRole("heading", { name: "About Haute & Hoof" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send a Message to the Parent Team" })).toBeInTheDocument();
  });
});
