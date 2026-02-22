import { describe, it, expect } from "vitest";
import { siteCopy } from "@/lib/siteCopy";

describe("siteCopy", () => {
  it("brand is Barn to Blazer", () => {
    expect(siteCopy.global.brand).toBe("Barn to Blazer");
  });

  it("tagline includes everything in between", () => {
    expect(siteCopy.global.brandTag).toContain("everything in between");
  });

  it("home has four pillars", () => {
    expect(siteCopy.home.pillars).toHaveLength(4);
  });

  it("journey has sections", () => {
    expect(siteCopy.journey.sections.length).toBeGreaterThan(0);
  });

  it("mentions Violet and Cloudy", () => {
    const json = JSON.stringify(siteCopy);
    expect(json).toContain("Violet");
    expect(json).toContain("Cloudy");
  });

  it("contains safety language", () => {
    expect(siteCopy.global.parentManaged).toContain("child-safe");
  });
});
