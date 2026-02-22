import { describe, expect, it } from "vitest";
import { formatDraftForPost } from "@/lib/socialDraft";

describe("formatDraftForPost", () => {
  it("joins caption hashtags and link with spacing", () => {
    const formatted = formatDraftForPost({
      caption: "Cloudy had a great jumping session today.",
      hashtags: "#horses #family",
      mediaRef: "clip.mp4",
      linkNote: "hauteandhoof.com/journey"
    });

    expect(formatted).toContain("Cloudy had a great jumping session today.");
    expect(formatted).toContain("#horses #family");
    expect(formatted).toContain("hauteandhoof.com/journey");
    expect(formatted).toContain("\n\n");
  });

  it("omits empty blocks", () => {
    const formatted = formatDraftForPost({
      caption: "Only caption",
      hashtags: "",
      mediaRef: "",
      linkNote: ""
    });

    expect(formatted).toBe("Only caption");
  });
});
