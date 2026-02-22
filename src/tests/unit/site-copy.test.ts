import { describe, it, expect } from "vitest";
import { siteCopy } from "@/lib/siteCopy";

describe("siteCopy", () => {
  it("brand uses ampersand", () => {
    expect(siteCopy.global.brand).toBe("Haute & Hoof");
  });

  it("all brand references use ampersand not 'and'", () => {
    const json = JSON.stringify(siteCopy);
    expect(json).not.toContain("Haute and Hoof");
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
