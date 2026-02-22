import { describe, expect, it } from "vitest";
import { siteCopy } from "@/lib/siteCopy";

describe("siteCopy brand requirements", () => {
  it("uses ampersand in brand name", () => {
    expect(siteCopy.global.brand).toBe("Haute & Hoof");
    expect(siteCopy.global.brand.includes("and")).toBe(false);
  });

  it("includes child-safety privacy copy", () => {
    expect(siteCopy.global.privacySafe.toLowerCase()).toContain("child safety");
  });
});
