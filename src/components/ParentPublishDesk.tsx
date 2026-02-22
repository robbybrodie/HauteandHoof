"use client";

import { useEffect, useState } from "react";
import {
  type SocialDraft,
  EMPTY_DRAFT,
  formatDraftForPost,
  readStoredDraft,
  storeCurrentDraft
} from "@/lib/socialDraft";

const SOCIAL_URLS: Record<string, string> = {
  TikTok: "https://www.tiktok.com/upload",
  Instagram: "https://www.instagram.com/"
};

export function ParentPublishDesk() {
  const [draft, setDraft] = useState<SocialDraft>(() => {
    if (typeof window === "undefined") return EMPTY_DRAFT;
    return readStoredDraft();
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    storeCurrentDraft(draft);
  }, [draft]);

  const formatted = formatDraftForPost(draft);

  const copy = async () => {
    await navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="stack" style={{ gap: "1.2rem" }}>
      <div>
        <label className="formLabel" htmlFor="platform">
          Platform
        </label>
        <select
          id="platform"
          className="navSelect"
          value={draft.platform}
          onChange={(e) =>
            setDraft((d) => ({ ...d, platform: e.target.value as SocialDraft["platform"] }))
          }
        >
          <option value="TikTok">TikTok</option>
          <option value="Instagram">Instagram</option>
        </select>
      </div>

      <div>
        <label className="formLabel" htmlFor="caption">
          Caption
        </label>
        <textarea
          id="caption"
          className="formTextarea"
          value={draft.caption}
          onChange={(e) => setDraft((d) => ({ ...d, caption: e.target.value }))}
          placeholder="Write your caption here..."
        />
      </div>

      <div>
        <label className="formLabel" htmlFor="hashtags">
          Hashtags
        </label>
        <input
          id="hashtags"
          className="formInput"
          value={draft.hashtags}
          onChange={(e) => setDraft((d) => ({ ...d, hashtags: e.target.value }))}
        />
      </div>

      <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
        <button type="button" className="btn btnPrimary" onClick={copy}>
          {copied ? "Copied!" : "Copy Caption"}
        </button>
        <a
          className="btn"
          href={SOCIAL_URLS[draft.platform]}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open {draft.platform}
        </a>
        <button
          type="button"
          className="btn"
          onClick={() => setDraft(EMPTY_DRAFT)}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
