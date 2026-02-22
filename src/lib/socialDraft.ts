export type SocialDraft = {
  caption: string;
  hashtags: string;
  mediaRef: string;
  linkNote: string;
};

export const EMPTY_DRAFT: SocialDraft = {
  caption: "",
  hashtags: "",
  mediaRef: "",
  linkNote: ""
};

export function formatDraftForPost(draft: SocialDraft) {
  const blocks = [draft.caption.trim(), draft.hashtags.trim(), draft.linkNote.trim()].filter(Boolean);
  return blocks.join("\n\n");
}
