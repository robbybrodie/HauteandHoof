export type SocialDraft = {
  caption: string;
  hashtags: string;
  platform: "TikTok" | "Instagram";
};

export const EMPTY_DRAFT: SocialDraft = {
  caption: "",
  hashtags: "#HauteAndHoof #VioletAndCloudy",
  platform: "TikTok"
};

export function formatDraftForPost(draft: SocialDraft): string {
  return [draft.caption.trim(), draft.hashtags.trim()].filter(Boolean).join("\n\n");
}

const STORAGE_KEY = "hh_social_draft";

export function readStoredDraft(): SocialDraft {
  if (typeof window === "undefined" || !window.localStorage) return EMPTY_DRAFT;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SocialDraft) : EMPTY_DRAFT;
  } catch {
    return EMPTY_DRAFT;
  }
}

export function storeCurrentDraft(draft: SocialDraft) {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    /* quota exceeded — ignore */
  }
}
