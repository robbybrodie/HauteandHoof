import { describe, it, expect } from "vitest";
import { formatDraftForPost, EMPTY_DRAFT } from "@/lib/socialDraft";

describe("formatDraftForPost", () => {
  it("joins caption and hashtags", () => {
    const result = formatDraftForPost({
      caption: "Great ride today!",
      hashtags: "#HauteAndHoof",
      platform: "TikTok"
    });
    expect(result).toBe("Great ride today!\n\n#HauteAndHoof");
  });

  it("handles empty caption", () => {
    const result = formatDraftForPost({ ...EMPTY_DRAFT, caption: "" });
    expect(result).toBe(EMPTY_DRAFT.hashtags);
  });

  it("trims whitespace", () => {
    const result = formatDraftForPost({
      caption: "  hello  ",
      hashtags: "  #tag  ",
      platform: "Instagram"
    });
    expect(result).toBe("hello\n\n#tag");
  });
});
