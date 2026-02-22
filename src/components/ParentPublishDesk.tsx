"use client";

import { useEffect, useMemo, useState } from "react";
import { EMPTY_DRAFT, formatDraftForPost, type SocialDraft } from "@/lib/socialDraft";
import { siteCopy } from "@/lib/siteCopy";

const STORAGE_KEY = "haute-hoof-social-draft-v1";

function readStoredDraft() {
  try {
    if (typeof window === "undefined") return EMPTY_DRAFT;
    if (!window.localStorage || typeof window.localStorage.getItem !== "function") return EMPTY_DRAFT;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_DRAFT;
    const parsed = JSON.parse(raw) as Partial<SocialDraft>;
    return {
      caption: parsed.caption ?? "",
      hashtags: parsed.hashtags ?? "",
      mediaRef: parsed.mediaRef ?? "",
      linkNote: parsed.linkNote ?? ""
    };
  } catch {
    return EMPTY_DRAFT;
  }
}

export function ParentPublishDesk() {
  const [draft, setDraft] = useState<SocialDraft>(() => {
    if (typeof window === "undefined") return EMPTY_DRAFT;
    return readStoredDraft();
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.localStorage || typeof window.localStorage.setItem !== "function") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [draft]);

  const postText = useMemo(() => formatDraftForPost(draft), [draft]);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(postText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="card">
      <h3 className="sectionTitle">{siteCopy.socialShare.title}</h3>
      <p>{siteCopy.socialShare.intro}</p>

      <div className="stack">
        <label className="label" htmlFor="caption">
          {siteCopy.socialShare.fields.caption}
        </label>
        <textarea
          id="caption"
          className="textarea"
          value={draft.caption}
          onChange={(event) => setDraft((prev) => ({ ...prev, caption: event.target.value }))}
          placeholder="Write your post caption..."
        />

        <label className="label" htmlFor="hashtags">
          {siteCopy.socialShare.fields.hashtags}
        </label>
        <input
          id="hashtags"
          className="input"
          value={draft.hashtags}
          onChange={(event) => setDraft((prev) => ({ ...prev, hashtags: event.target.value }))}
          placeholder="#horses #family #fashion"
        />

        <label className="label" htmlFor="mediaRef">
          {siteCopy.socialShare.fields.mediaRef}
        </label>
        <input
          id="mediaRef"
          className="input"
          value={draft.mediaRef}
          onChange={(event) => setDraft((prev) => ({ ...prev, mediaRef: event.target.value }))}
          placeholder="example: 2026-02-ride-highlight.mp4"
        />

        <label className="label" htmlFor="linkNote">
          {siteCopy.socialShare.fields.linkNote}
        </label>
        <input
          id="linkNote"
          className="input"
          value={draft.linkNote}
          onChange={(event) => setDraft((prev) => ({ ...prev, linkNote: event.target.value }))}
          placeholder="Optional: hauteandhoof.com/journey"
        />
      </div>

      <hr className="divider" />

      <div className="card callout">
        <h4 className="sectionTitle">Preview</h4>
        <p style={{ whiteSpace: "pre-wrap" }}>{postText || "Your caption preview appears here."}</p>
        {draft.mediaRef ? <p className="small">Media file to upload: {draft.mediaRef}</p> : null}
      </div>

      <div className="sectionActions">
        <button type="button" className="button buttonPrimary" onClick={onCopy}>
          Copy caption
        </button>
        <a className="button buttonSecondary" href="https://www.instagram.com/create/select/" target="_blank" rel="noreferrer">
          Open Instagram Upload
        </a>
        <a className="button buttonSecondary" href="https://www.tiktok.com/upload?lang=en" target="_blank" rel="noreferrer">
          Open TikTok Upload
        </a>
      </div>

      {copied ? <p className="small">Copied to clipboard. Paste inside Instagram or TikTok.</p> : null}
      <p className="small">Final posting is always parent-managed inside each social platform.</p>
    </section>
  );
}
